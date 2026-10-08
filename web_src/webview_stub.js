(function() {
  const listeners = [];
  const realWebview = (window.chrome && window.chrome.webview) ? window.chrome.webview : null;
  const nativePostMessage = (realWebview && typeof realWebview.postMessage === 'function')
    ? realWebview.postMessage.bind(realWebview)
    : null;

  if (realWebview && typeof realWebview.addEventListener === 'function') {
    realWebview.addEventListener('message', function(event) {
      try {
        let payload = event.data;
        if (typeof payload === 'string') {
          try { payload = JSON.parse(payload); } catch(e) {}
        }
        if (payload && payload.action) {
          dispatchToUI(payload.action, payload.value);
        }
      } catch (e) {
        console.error('Error forwarding native C# message:', e);
      }
    });
  }

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
      let targetEmail = null;
      let matchedProfile = null;
      let authUser = null;
      let isDev = false;
      const lowerUser = cleanUser.toLowerCase();

      if (lowerUser === 'fameboydev' || lowerUser === 'gajdukdaniil46@gmail.com') {
        targetEmail = 'gajdukdaniil46@gmail.com';
        isDev = true;
      } else if (lowerUser === 'fameboyq' || lowerUser === 'gajdukdaniiil46@gmail.com') {
        targetEmail = 'gajdukdaniiil46@gmail.com';
        isDev = true;
      } else if (cleanUser.includes('@')) {
        targetEmail = cleanUser;
      } else {
        // Regular user: find profile in DB
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

        const loginToLookup = (matchedProfile && matchedProfile.login) || cleanUser;
        try {
          const { data: rpcEmail } = await sb.rpc('get_email_by_login', {
            p_login: loginToLookup
          });
          if (rpcEmail && typeof rpcEmail === 'string' && rpcEmail.includes('@')) {
            targetEmail = rpcEmail.trim();
          }
        } catch (e) {
          console.warn('RPC get_email_by_login error:', e);
        }
      }

      if (!authUser) {
        if (!targetEmail || !targetEmail.includes('@')) {
          dispatchToUI('AUTHORIZE_STATE', {
            state: 'ERROR',
            message: 'Пользователь не найден. Проверьте правильность логина.'
          });
          return;
        }

        // Strict Supabase Auth check for regular users
        const { data: authData, error: authError } = await sb.auth.signInWithPassword({
          email: targetEmail,
          password: cleanPass
        });

        if (authError || !authData || !authData.user) {
          console.warn('Supabase Auth error:', authError);
          dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Неверный логин или пароль' });
          return;
        }

        authUser = authData.user;
        const authEmail = (authUser.email || targetEmail || '').toLowerCase();
        const checkUname = (cleanUser || '').toLowerCase();
        isDev = (
          authEmail === 'gajdukdaniil46@gmail.com' ||
          authEmail === 'gajdukdaniiil46@gmail.com' ||
          authEmail === 'kanadarespect@gmail.com' ||
          checkUname === 'fameboydev'
        );
      }

      // Fetch profile
      let u = matchedProfile;
      if (!u && authUser) {
        try {
          const { data: pById } = await sb.from('profiles').select('*').eq('id', authUser.id).maybeSingle();
          if (pById) u = pById;
        } catch (e) {}
      }

      // Calculate sequential registration ID immediately
      let regSeqNumber = 777;
      try {
        const userCreatedAt = (u && u.created_at) || (authUser && authUser.created_at);
        if (userCreatedAt) {
          const cRes = await fetch(SB_URL + '/rest/v1/profiles?created_at=lte.' + encodeURIComponent(userCreatedAt) + '&select=id', {
            headers: {
              apikey: SB_KEY,
              Authorization: 'Bearer ' + SB_KEY
            }
          });
          if (cRes.ok) {
            const arr = await cRes.json();
            if (Array.isArray(arr) && arr.length > 0) {
              regSeqNumber = arr.length;
            }
          }
        }
      } catch (e) {
        console.warn('Seq ID calculation error:', e);
      }

      try {
        localStorage.setItem('wirex_current_uid', String(regSeqNumber));
      } catch (e) {}

      // HWID check
      const clientHwid = window.WIREX_HWID || '';
      if (u) {
        try {
          localStorage.setItem('wirex_current_user_id', String(u.id));
        } catch (e) {}

        if (!u.hwid && clientHwid) {
          if (nativePostMessage) {
            try {
              nativePostMessage(JSON.stringify({
                action: 'BIND_HWID',
                userId: u.id,
                hwid: clientHwid
              }));
            } catch (e) {}
          }
          u.hwid = clientHwid;
        } else if (!isDev && u.hwid && clientHwid && u.hwid !== clientHwid) {
          dispatchToUI('AUTHORIZE_STATE', {
            state: 'ERROR',
            message: 'Неверный HWID! Аккаунт привязан к другому компьютеру. Сброс через Discord.'
          });
          return;
        }
      }

      // Subscription check
      let subTill = 'Нет подписки';
      let isExpired = false;
      const now = new Date();

      if (isDev) {
        subTill = '∞ Навсегда';
      } else if (u && (u.subscription === 'Lifetime' || u.subscription === 'Навсегда' || u.subscription === 'forever')) {
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

      if (!isDev && (isExpired || subTill === 'Истекла' || subTill === 'Нет подписки')) {
        dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Ваша подписка истекла или не активна.' });
        return;
      }

      dispatchToUI('AUTHORIZE_STATE', {
        state: 'OK',
        till: subTill,
        username: ((u && u.login) || cleanUser),
        id: regSeqNumber,
        uid: regSeqNumber,
        priority: isDev ? 1 : 0,
        versions: 'wirex_1214:Stable 1.21.4:0;'
      });
    } catch (err) {
      console.warn('Auth error:', err);
      dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Ошибка сети. Проверьте подключение к интернету.' });
    }
  }

  function handleStartClient(payload) {
    dispatchToUI('CHANGE_LOADER_TEXT_WITH_PERCENT', {
      status: 'Подключение к серверу загрузки...',
      percent: 8
    });
  }

  window.chrome = window.chrome || {};
  window.chrome.webview = {
    postMessage: function(raw) {
      try {
        const m = typeof raw === 'string' ? JSON.parse(raw) : raw;
        
        // Ensure UID and HWID are forwarded to native C#
        if (m && m.action === 'START_CLIENT') {
          try {
            const savedUid = localStorage.getItem('wirex_current_uid');
            if (savedUid && savedUid !== '777') {
              m.uid = savedUid;
              m.id = savedUid;
            }
            const savedUserId = localStorage.getItem('wirex_current_user_id');
            if (savedUserId) {
              m.userId = savedUserId;
            }
            const currentHwid = window.WIREX_HWID || '';
            if (currentHwid) {
              m.hwid = currentHwid;
            }
          } catch(e) {}
        }

        // Forward native messages to C# if available
        if (nativePostMessage) {
          try { nativePostMessage(typeof raw === 'string' ? JSON.stringify(m) : raw); } catch(e) {}
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
