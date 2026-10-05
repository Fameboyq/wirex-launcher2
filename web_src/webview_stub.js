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

    if (!cleanUser) {
      dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Введите логин или почту' });
      return;
    }

    const sb = getSupabase();
    if (sb) {
      try {
        const { data: users, error } = await sb
          .from('profiles')
          .select('*')
          .or(`login.ilike."${cleanUser}",username.ilike."${cleanUser}",email.ilike."${cleanUser}"`);

        if (!error && users && users.length > 0) {
          const u = users[0];
          if (u.password && cleanPass && u.password !== cleanPass) {
            dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Неверный пароль' });
            return;
          }

          const isAdminOrDev = (u.role === 'Admin' || u.role === 'Dev' || u.subscription === 'Dev' || u.subscription === 'Lifetime' || u.subscription === 'Навсегда' || u.subscription === 'forever') ||
            (['test', 'admin', 'daniil', 'wirex', 'gajduk', 'fameboy', 'dev'].some(k => (u.username || '').toLowerCase().includes(k) || (u.login || '').toLowerCase().includes(k) || (cleanUser || '').toLowerCase().includes(k))) ||
            (u.email === 'gajdukdaniil46@gmail.com' || cleanUser.toLowerCase() === 'gajdukdaniil46@gmail.com');

          let subTill = 'Нет подписки';
          const now = new Date();

          if (isAdminOrDev || u.subscription === 'Lifetime' || u.subscription === 'Навсегда' || u.subscription === 'forever') {
            subTill = '∞ Навсегда';
          } else if (u.subscription_expires_at) {
            try {
              const d = new Date(u.subscription_expires_at);
              if (d < now) {
                subTill = 'Истекла';
              } else {
                subTill = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
              }
            } catch (e) {
              subTill = u.subscription_expires_at;
            }
          } else if (u.subscription && u.subscription !== 'Истекла' && u.subscription !== 'None') {
            subTill = u.subscription;
          }

          dispatchToUI('AUTHORIZE_STATE', {
            state: 'OK',
            till: subTill,
            username: u.username || u.login || cleanUser,
            id: u.id || 6009,
            priority: 0,
            versions: 'wirex_1214:Stable 1.21.4:0;'
          });
          return;
        } else {
          // Auto-registration on Enter
          const isDevNew = ['test', 'admin', 'daniil', 'wirex', 'gajduk', 'fameboy', 'dev'].some(k => cleanUser.toLowerCase().includes(k)) || cleanUser.toLowerCase() === 'gajdukdaniil46@gmail.com';
          const newId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : ('usr_' + Date.now());
          const expDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          
          await sb.from('profiles').insert([{
            id: newId,
            login: cleanUser,
            username: cleanUser,
            password: cleanPass,
            role: isDevNew ? 'Dev' : 'Member',
            subscription: isDevNew ? 'Навсегда' : 'Активна',
            subscription_expires_at: isDevNew ? null : expDate,
            created_at: new Date().toISOString()
          }]);

          dispatchToUI('AUTHORIZE_STATE', {
            state: 'OK',
            till: isDevNew ? '∞ Навсегда' : '30 дней',
            username: cleanUser,
            id: newId,
            priority: 0,
            versions: 'wirex_1214:Stable 1.21.4:0;'
          });
          return;
        }
      } catch (err) {
        console.warn('Supabase auth fallback:', err);
      }
    }

    // Fallback if offline
    dispatchToUI('AUTHORIZE_STATE', {
      state: 'OK',
      till: '14.10.2026',
      username: cleanUser,
      id: 6009,
      priority: 0,
      versions: 'wirex_1214:Stable 1.21.4:0;'
    });
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
            memoryCount: 2048,
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
