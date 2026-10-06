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
      dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Введите логин' });
      return;
    }

    const sb = getSupabase();
    if (!sb) {
      dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Ошибка сети. Нет связи с сервером.' });
      return;
    }

    try {
      const { data: users, error } = await sb
        .from('profiles')
        .select('*')
        .ilike('login', cleanUser);

      if (error) {
        console.error('Supabase query error:', error);
        dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Ошибка связи с базой данных' });
        return;
      }

      if (!users || users.length === 0) {
        dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Пользователь не найден. Доступ только по подписке.' });
        return;
      }

      const u = users[0];
      if (u.password && u.password !== cleanPass) {
        dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Неверный пароль' });
        return;
      }

      const isAdminOrDev = (u.role === 'Admin' || u.role === 'Dev' || u.subscription === 'Dev' || u.subscription === 'Lifetime' || u.subscription === 'Навсегда' || u.subscription === 'forever') ||
        (['daniil', 'wirex', 'gajduk', 'fameboy', 'dev'].some(k => (u.username || '').toLowerCase().includes(k) || (u.login || '').toLowerCase().includes(k) || (cleanUser || '').toLowerCase().includes(k))) ||
        (u.email === 'gajdukdaniil46@gmail.com' || cleanUser.toLowerCase() === 'gajdukdaniil46@gmail.com');

      // HWID Hardware binding & check
      const clientHwid = window.WIREX_HWID || '';
      if (!isAdminOrDev) {
        if (!u.hwid && clientHwid) {
          try {
            await sb.from('profiles').update({ hwid: clientHwid }).eq('id', u.id);
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

      if (isAdminOrDev || u.subscription === 'Lifetime' || u.subscription === 'Навсегда' || u.subscription === 'forever') {
        subTill = '∞ Навсегда';
      } else if (u.subscription_expires_at) {
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
      } else if (u.subscription && u.subscription !== 'Истекла' && u.subscription !== 'None') {
        subTill = u.subscription;
      } else {
        isExpired = true;
      }

      if (isExpired || subTill === 'Истекла' || subTill === 'Нет подписки') {
        dispatchToUI('AUTHORIZE_STATE', { state: 'ERROR', message: 'Ваша подписка истекла или не активна.' });
        return;
      }

      dispatchToUI('AUTHORIZE_STATE', {
        state: 'OK',
        till: subTill,
        username: u.username || u.login || cleanUser,
        id: u.id || 6009,
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
