(function() {
  const listeners = [];
  const nativePostMessage = (window.chrome && window.chrome.webview && typeof window.chrome.webview.postMessage === 'function')
    ? window.chrome.webview.postMessage.bind(window.chrome.webview)
    : null;

  const SB_URL = 'https://wsuahpdnqstzcoipzymp.supabase.co';
  const SB_KEY = 'sb_publishable_2HTaqYc8efRIeZJV3n_gUg_GGhrbYCI';
  let sbClient = null;

  function getSupabase() {
    if (!sbClient && typeof supabase !== 'undefined' && supabase.createClient) {
      try {
        sbClient = supabase.createClient(SB_URL, SB_KEY);
      } catch (e) {
        console.error('Supabase init error:', e);
      }
    }
    return sbClient;
  }

  function dispatchToUI(action, value) {
    const msg = {
      data: {
        action: action,
        value: value
      }
    };
    listeners.forEach(cb => {
      try { cb(msg); } catch (e) { console.error(e); }
    });
  }

  async function handleAuth(userName, authKey) {
    const cleanUser = (userName || '').trim();
    const cleanPass = (authKey || '').trim();

    if (!cleanUser || !cleanPass) {
      dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Введите логин и пароль' });
      return;
    }

    const sb = getSupabase();
    if (!sb) {
      dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Ошибка сети. Нет связи с сервером.' });
      return;
    }

    try {
      const lowerUser = cleanUser.toLowerCase();
      const isEmail = cleanUser.includes('@');
      let matchedProfile = null;
      let candidateEmails = [];

      if (isEmail) {
        candidateEmails.push(cleanUser);
      } else {
        // 1. Look up profile case-insensitively
        try {
          const { data: profs } = await sb
            .from('profiles')
            .select('*')
            .ilike('login', cleanUser);

          if (profs && profs.length > 0) {
            matchedProfile = profs[0];
          }
        } catch (e) {
          console.warn('Profile search error:', e);
        }

        // 2. Resolve email via RPC function using exact DB casing
        const loginToLookup = (matchedProfile && matchedProfile.login) || cleanUser;
        try {
          const { data: rpcEmail } = await sb.rpc('get_email_by_login', {
            p_login: loginToLookup
          });
          if (rpcEmail && typeof rpcEmail === 'string' && rpcEmail.includes('@')) {
            candidateEmails.push(rpcEmail.trim());
          }
        } catch (e) {
          console.warn('RPC get_email_by_login error:', e);
        }
      }

      // 3. For developer/admin aliases, add all associated developer emails
      const isDevKeyword = ['fameboy', 'zapoi', 'daniil', 'wirex', 'dev', 'admin'].some(k => lowerUser.includes(k));
      if (isDevKeyword) {
        const devPool = [
          'clod24977@gmail.com',
          'gajdukdaniiil46@gmail.com',
          'gajdukdaniil46@gmail.com'
        ];
        devPool.forEach(em => {
          if (!candidateEmails.includes(em)) {
            candidateEmails.push(em);
          }
        });
      }

      if (candidateEmails.length === 0) {
        dispatchToUI('AUTHORIZE_STATE', {
          state: 'ERROR',
          message: 'Пользователь не найден. Проверьте логин или зарегистрируйтесь.'
        });
        return;
      }

      // 4. Authenticate against Supabase Auth (tries candidates)
      let authUser = null;
      let authData = null;
      let lastAuthError = null;

      for (const em of candidateEmails) {
        try {
          const res = await sb.auth.signInWithPassword({
            email: em,
            password: cleanPass
          });
          if (res.data && res.data.user) {
            authData = res.data;
            authUser = res.data.user;
            lastAuthError = null;
            break;
          } else if (res.error) {
            lastAuthError = res.error;
          }
        } catch (err) {
          lastAuthError = err;
        }
      }

      if (!authUser) {
        console.warn('Supabase Auth error:', lastAuthError);
        dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Неверный логин или пароль' });
        return;
      }

      let u = matchedProfile;
      if (!u) {
        try {
          const { data: pById } = await sb.from('profiles').select('*').eq('id', authUser.id).maybeSingle();
          if (pById) u = pById;
        } catch (e) {}
      }
      if (!u) {
        try {
          const { data: pByLogin } = await sb.from('profiles').select('*').ilike('login', cleanUser).maybeSingle();
          if (pByLogin) u = pByLogin;
        } catch (e) {}
      }

      const authEmail = (authUser.email || '').toLowerCase();
      const usernameCandidate = (u && u.login) || authUser.user_metadata?.username || cleanUser;
      const unameLower = usernameCandidate.toLowerCase();

      const isAdminOrDev = (u && (u.role === 'Admin' || u.role === 'Dev' || u.subscription === 'Dev' || u.subscription === 'Lifetime' || u.subscription === 'Навсегда' || u.subscription === 'forever')) ||
        authUser.user_metadata?.role === 'Admin' || authUser.user_metadata?.is_admin === true ||
        authEmail === 'gajdukdaniil46@gmail.com' || authEmail === 'gajdukdaniiil46@gmail.com' || authEmail === 'clod24977@gmail.com' ||
        ['fameboy', 'zapoi', 'daniil', 'wirex'].some(k => unameLower.includes(k) || authEmail.includes(k));

      // HWID Hardware binding & check
      const clientHwid = window.WIREX_HWID || '';
      if (!isAdminOrDev && u) {
        if (!u.hwid && clientHwid) {
          try {
            await sb.from('profiles').update({ hwid: clientHwid }).eq('id', u.id);
            u.hwid = clientHwid;
          } catch(e) {}
        } else if (u.hwid && clientHwid && u.hwid !== clientHwid) {
          dispatchToUI('AUTHORIZE_STATE', {
            state: 'ERROR',
            message: 'Неверный HWID! Аккаунт привязан к другому компьютеру. Сброс через Discord.'
          });
          return;
        }
      }

      let subTill = 'Нет подписки';
      let isExpired = false;
      const now = new Date();

      if (isAdminOrDev || (u && (u.subscription === 'Lifetime' || u.subscription === 'Навсегда' || u.subscription === 'forever'))) {
        subTill = '∞ Навсегда';
      } else if (u && u.subscription_expires_at) {
        try {
          const d = new Date(u.subscription_expires_at);
          if (d < now) {
            subTill = 'Истекла';
            isExpired = true;
          } else {
            subTill = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
          }
        } catch (e) {
          subTill = u.subscription_expires_at;
        }
      } else if (u && u.subscription && (u.subscription === 'Активна' || u.subscription.toLowerCase().includes('актив'))) {
        subTill = 'Активна';
      } else {
        isExpired = true;
      }

      if (!isAdminOrDev && (isExpired || subTill === 'Истекла' || subTill === 'Нет подписки')) {
        dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Ваша подписка истекла или не активна.' });
        return;
      }

      dispatchToUI('AUTHORIZE_STATE', {
        state: 'OK',
        till: subTill,
        username: usernameCandidate,
        id: (u && u.id) || authUser.id || 6009,
        priority: 0,
        versions: 'wirex_1214:Stable 1.21.4:0;'
      });
    } catch (err) {
      console.warn('Auth error:', err);
      dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Ошибка сети. Проверьте подключение к интернету.' });
    }
  }

  function handleStartClient(payload) {
    const steps = [
      { pct: 15, txt: 'Проверка папки C:\\WirexClient...' },
      { pct: 40, txt: 'Загрузка библиотек 1.21.4...' },
      { pct: 75, txt: 'Инициализация Wirex Client...' },
      { pct: 100, txt: 'Запуск клиента 1.21.4...' }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        dispatchToUI('CHANGE_LOADER_TEXT_WITH_PERCENT', {
          status: step.txt,
          percent: step.pct
        });
      }, (idx + 1) * 450);
    });
  }

  window.chrome = window.chrome || {};
  window.chrome.webview = {
    postMessage: function(raw) {
      try {
        const m = typeof raw === 'string' ? JSON.parse(raw) : raw;
        
        // Forward native messages to C# if available
        if (nativePostMessage) {
          try { nativePostMessage(typeof raw === 'string' ? raw : JSON.stringify(raw)); } catch(e) {}
        }

        if (m.action === 'AUTHORIZE_USER') {
          handleAuth(m.userName, m.authKey);
        } else if (m.action === 'START_CLIENT') {
          handleStartClient(m);
        }
      } catch (e) {
        console.error('postMessage handling error:', e);
      }
    },
    addEventListener: function(event, cb) {
      if (event === 'message') {
        listeners.push(cb);
        setTimeout(() => {
          dispatchToUI('INITIALIZE_CLIENT_INFORMATION', {
            memoryCount: 4096,
            maxMemoryCount: 16000,
            clientName: 'Wirex Client',
            userName: 'WirexUser',
            clientColor: '#7b7bf0'
          });
        }, 50);
      }
    },
    removeEventListener: function(event, cb) {
      if (event === 'message') {
        const idx = listeners.indexOf(cb);
        if (idx !== -1) listeners.splice(idx, 1);
      }
    }
  };
})();
