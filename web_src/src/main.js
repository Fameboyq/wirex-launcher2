// ==========================================
// SECTION: Layouts & Core Routing
// ==========================================

const RouteTransition = ({ children }) => {
  return JSX.jsx(motion.div, {
    initial: { opacity: 0, filter: "blur(1.5px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(1.5px)" },
    transition: { duration: 0.35, ease: "easeInOut" },
    children: children,
  });
};

const AppBackground = ({ children }) => {
  return JSX.jsx("div", { className: Wo.background, children: children });
};

const AppLayout = () => {
  const location = usePresence();

  React.useEffect(() => {
    // Disable right-click context menu
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    // Disable F5 and reload shortcuts
    const blockedKeys = ["F5"];
    document.addEventListener("keydown", (e) => {
      blockedKeys.forEach((key) => {
        if (
          e.key === key ||
          (e.ctrlKey && e.shiftKey && e.key === key) ||
          (e.ctrlKey && e.key === key)
        ) {
          e.preventDefault();
        }
      });
    });

    // Disable middle/right clicks
    document.addEventListener("auxclick", (e) => {
      if (e.button === 1 || e.button === 2) {
        e.preventDefault();
      }
    });
  }, []);

  React.useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", preventBack);
    window.history.pushState(null, "", window.location.href);
    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, []);

  const rawPath = location.pathname || "/";
  const normalizedPath = (rawPath === "/index.html" || rawPath.endsWith("index.html") || rawPath === "") ? "/" : rawPath;

  const noNavRoutes = ["/", "/index.html"];
  const isAuthPage = normalizedPath === "/" || noNavRoutes.includes(rawPath);
  const shouldShowNavAndHeader = !isAuthPage;

  return JSX.jsxs("div", {
    className: Wo.appContainer,
    children: [
      shouldShowNavAndHeader &&
        JSX.jsx("div", {
          className: Wo.containerNavigation,
          children: JSX.jsx(NavigationView, {}),
        }),
      JSX.jsxs("div", {
        className: Wo.containerContent,
        children: [
          shouldShowNavAndHeader &&
            JSX.jsx(React.Fragment, { children: JSX.jsx(HeaderView, {}) }),
          JSX.jsx(React.Fragment, {
            children: JSX.jsxs(
              Routes,
              {
                location: { ...location, pathname: normalizedPath },
                children: [
                  JSX.jsx(Route, {
                    path: "/",
                    element: JSX.jsx(RouteTransition, { children: JSX.jsx(AuthorizationView, {}) }),
                  }),
                  JSX.jsx(Route, {
                    path: "/index.html",
                    element: JSX.jsx(RouteTransition, { children: JSX.jsx(AuthorizationView, {}) }),
                  }),
                  JSX.jsx(Route, {
                    path: "/home",
                    element: JSX.jsx(RouteTransition, { children: JSX.jsx(HomeView, {}) }),
                  }),
                  JSX.jsx(Route, {
                    path: "/settings",
                    element: JSX.jsx(RouteTransition, { children: JSX.jsx(SettingsView, {}) }),
                  }),
                ],
              },
              normalizedPath
            ),
          }),
        ],
      }),
    ],
  });
};

const App = () => {
  return JSX.jsx(AppBackground, {
    children: JSX.jsx(NotificationProvider, { children: JSX.jsx(AppLayout, {}) }),
  });
};

// ==========================================
// SECTION: App Bootstrap / Entrypoint
// ==========================================

// Drag and drop window controls (Native bridge)
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

document.addEventListener("mousedown", function (e) {
  if (e.button !== 0) return;
  const target = e.target;
  
  const isInteractive =
    target.closest("input") ||
    target.closest("button") ||
    target.closest("a") ||
    target.closest("i") ||
    target.closest("svg") ||
    target.closest("label") ||
    target.closest("[onclick]") ||
    target.closest("[data-clickable]") ||
    target.closest(".client-launch-page") ||
    target.closest(".client-launch-back-btn") ||
    target.closest(".client-launch-big-btn") ||
    target.closest(".client-hero-card") ||
    target.closest("._version_w0vsm_10") ||
    target.closest("._contentButtonStart_w0vsm_101") ||
    target.closest("._inputEye_wxni4_75") ||
    target.closest("._actionsClose_wxni4_1") ||
    target.closest("._actionsMinimize_wxni4_1") ||
    target.closest("._authorizationForgot_wxni4_106") ||
    target.closest("._account_a9vqm_1") ||
    target.closest("._nav_1twi2_1") ||
    target.closest("._navigation_1twi2_1") ||
    target.closest(".notification") ||
    target.closest("[class*='version']") ||
    target.closest("[class*='button']") ||
    target.closest("[class*='Button']") ||
    target.closest("[class*='action']") ||
    target.closest("[class*='Icon']") ||
    target.closest("[class*='icon']");

  if (!isInteractive && (e.clientY < 45 || target.closest("[data-drag-handle]"))) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    if (window.chrome && window.chrome.webview) {
      window.chrome.webview.postMessage(
        JSON.stringify({ type: "start_drag", x: dragStartX, y: dragStartY })
      );
    }
  }
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    if (window.chrome && window.chrome.webview) {
      window.chrome.webview.postMessage(
        JSON.stringify({ type: "dragging", deltaX: deltaX, deltaY: deltaY })
      );
    }
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  }
});

document.addEventListener("mouseup", function () {
  if (isDragging) {
    isDragging = false;
    if (window.chrome && window.chrome.webview) {
      window.chrome.webview.postMessage(
        JSON.stringify({ type: "end_drag" })
      );
    }
  }
});

// Initialize AOS & Render React App
const aosLib = JX();
const aosInstance = _V(aosLib);

LauncherController.sendActionMessage("INITIALIZE_LAUNCHER", {});
LauncherController.sendActionMessage("TRYING_AUTHORIZATION", {});
// document.documentElement.style.zoom = (1 / window.devicePixelRatio).toString();

G1.createRoot(document.getElementById("root")).render(
  JSX.jsx(Router, { children: JSX.jsx(App, {}) })
);
