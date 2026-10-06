// --- Authorization View ---
const AuthorizationView = () => {
  const { addNotification } = useNotification();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isAuthorizing, setIsAuthorizing] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const navigateTo = useTransitionNavigate();
  const notificationHelper = useNotification();

  React.useState(() => {
    LauncherController.navigate = navigateTo;
    LauncherController.notification = notificationHelper.addNotification;
    LauncherController.subscribeSpinnerStop((isLoading) => setIsAuthorizing(isLoading));
  });

  const [clientTitle, setClientTitle] = React.useState(LauncherController.clientName);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setClientTitle(LauncherController.clientName || "Wirex Client");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 20 },
    exit: { opacity: 0, y: 20 },
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const slides = [
    {
      icon: "A",
      title: "Wirex Client",
      desc: "Топовый чит-клиент для Minecraft 1.21.4",
      overlay: AUTH_IMAGE_1,
    },
    {
      icon: "p",
      title: "Speed & FPS",
      desc: "Максимальная оптимизация и мгновенный отклик модулей",
      overlay: AUTH_IMAGE_2,
    },
    {
      icon: "I",
      title: "Visuals & Bypass",
      desc: "Плавные визуалы, мощные обходы античитов и кастомизация",
      overlay: AUTH_IMAGE_3,
    },
  ];

  return JSX.jsxs(React.Fragment, {
    children: [
      JSX.jsx("div", {
        className: Ct.headerRight,
        children: JSX.jsx("div", {
          className: `${Ct.actionsClose} ${Ct.action}`,
          onClick: () => LauncherController.sendWindowState(true),
          children: JSX.jsx("i", { className: "bi bi-x-lg" }),
        }),
      }),
      JSX.jsxs("div", {
        className: Ct.authorization,
        children: [
          JSX.jsxs("div", {
            className: Ct.authorizationLeft,
            children: [
              JSX.jsxs("div", {
                className: Ct.authorizationTitle,
                children: [
                  JSX.jsx("div", {
                    className: Ct.titleClientname,
                    children: clientTitle,
                  }),
                  JSX.jsx("div", {
                    className: Ct.titleVersion,
                    children: "Welcome back!",
                  }),
                ],
              }),
              JSX.jsxs("form", {
                onSubmit: LauncherController.authorize,
                method: "post",
                autoComplete: "off",
                children: [
                  JSX.jsxs("div", {
                    className: Ct.authorizationForm,
                    children: [
                      JSX.jsxs("div", {
                        className: Ct.formInput,
                        children: [
                          JSX.jsx("label", { children: "Username" }),
                          JSX.jsx(InputField, {
                            name: "username",
                            placeholder: "Enter your Name",
                            icon: "V",
                          }),
                        ],
                      }),
                      JSX.jsxs("div", {
                        className: Ct.formInput,
                        children: [
                          JSX.jsx("label", { children: "Password" }),
                          JSX.jsx(InputField, {
                            name: "password",
                            placeholder: "Enter your Password",
                            icon: "h",
                            remover: false,
                            type: showPassword ? "text" : "password",
                          }),
                          JSX.jsx("div", {
                            className: Ct.inputEye,
                            onClick: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowPassword((prev) => !prev);
                            },
                            style: {
                              zIndex: 50,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              userSelect: "none",
                            },
                            children: JSX.jsx("i", {
                              className: showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill",
                              style: {
                                fontSize: "16px",
                                color: showPassword ? "#7b7bf0" : "rgba(255, 255, 255, 0.45)",
                                transition: "all 0.2s ease",
                              },
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  JSX.jsxs("div", {
                    className: Ct.formButtons,
                    children: [
                      JSX.jsx(Button, {
                        type: "submit",
                        buttonType: "fill",
                        description: "Sign In",
                        loading: isAuthorizing,
                        icon: "m",
                      }),
                      JSX.jsxs("div", {
                        className: Ct.buttonsChoose,
                        children: [
                          JSX.jsx("div", { className: Ct.line }),
                          JSX.jsx("span", { children: "OR" }),
                          JSX.jsx("div", { className: Ct.line }),
                        ],
                      }),
                      JSX.jsx(Button, {
                        type: "button",
                        buttonType: "outline",
                        description: "Sign In",
                        icon: "H",
                        onClick: () => addNotification("This method is not yet available for registration..."),
                      }),
                    ],
                  }),
                ],
              }),
              JSX.jsx("div", {
                className: Ct.authorizationForgot,
                onClick: () => LauncherController.sendActionMessage("OPEN_FORGOT_URL", {}),
                children: "Forgot Password?",
              }),
            ],
          }),
          JSX.jsxs("div", {
            className: Ct.authorizationRight,
            children: [
              JSX.jsx("div", {
                className: Ct.rightOverlay,
                children: JSX.jsx(AnimatePresence, {
                  mode: "wait",
                  children: JSX.jsx(
                    motion.div,
                    {
                      variants: imageVariants,
                      initial: "initial",
                      animate: "animate",
                      exit: "exit",
                      transition: { duration: 0.4 },
                      children: JSX.jsx(Po, { src: slides[slideIndex].overlay }),
                    },
                    slideIndex
                  ),
                }),
              }),
              JSX.jsx("div", {
                className: Ct.rightOverlayText,
                children: JSX.jsx(AnimatePresence, {
                  mode: "wait",
                  children: JSX.jsxs(
                    motion.div,
                    {
                      variants: textVariants,
                      initial: "initial",
                      animate: "animate",
                      exit: "exit",
                      transition: { duration: 0.4 },
                      className: `${Ct.text} ${Ct.textCenter}`,
                      children: [
                        JSX.jsx("div", {
                          className: Ct.textIcon,
                          style: { fontFamily: "Icons" },
                          children: slides[slideIndex].icon,
                        }),
                        JSX.jsx("div", {
                          className: Ct.textTitle,
                          children: slides[slideIndex].title,
                        }),
                        JSX.jsx("div", {
                          className: Ct.textDescription,
                          children: slides[slideIndex].desc,
                        }),
                      ],
                    },
                    slideIndex
                  ),
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

// --- // --- Home / Dashboard View ---
const HomeView = () => {
  const [isLaunching, setIsLaunching] = React.useState(false);
  const [loadPercent, setLoadPercent] = React.useState(0);
  const [loadText, setLoadText] = React.useState("");

  const versionsList = (LauncherController.versions && LauncherController.versions.length > 0)
    ? LauncherController.versions
    : [
        {
          id: "wirex_1214",
          display: "Wirex 1.0 Beta",
          gameVersion: "1.21.4",
          priority: 0,
        },
      ];

  React.useEffect(() => {
    const onPreloader = (text, percent) => {
      setLoadText(text);
      setLoadPercent(percent);
      if (percent >= 100) {
        setTimeout(() => setIsLaunching(false), 3000);
      }
    };
    LauncherController.subscribePreloader(onPreloader);
    return () => LauncherController.unsubscribePreloader(onPreloader);
  }, []);

  const handleLaunchGame = (version) => {
    if (isLaunching) return;

    const sub = LauncherController.user?.subtill;
    if (sub === "Истекла" || sub === "Нет подписки") {
      LauncherController.notification("У вас нет активной подписки!");
      return;
    }

    setIsLaunching(true);
    setLoadPercent(10);
    setLoadText("Запуск Minecraft 1.21.4 (Wirex)...");

    const vId = (version && version.id) ? version.id : "wirex_1214";
    LauncherController.starterInformation = new ClientType(
      (version && version.gameVersion) || "1.21.4",
      (version && version.display) || "Stable",
      vId
    );

    LauncherController.startClient();
  };

  return JSX.jsx("div", {
    className: Ve.home,
    children: JSX.jsx("div", {
      className: Ve.homeVersions,
      children: versionsList.map((version, idx) => {
        return JSX.jsxs(
          "div",
          {
            className: `${Ve.version}${isLaunching ? ` ${Ve.loading}` : ""}`,
            style: { cursor: isLaunching ? "default" : "pointer" },
            onClick: () => {
              if (!isLaunching) handleLaunchGame(version);
            },
            "data-aos": "start-blur-left",
            "data-aos-delay": 50 * idx,
            children: [
              JSX.jsx("img", {
                src: VERSION_IMAGE_PATHS[idx % VERSION_IMAGE_PATHS.length],
                alt: "Version",
                style: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" },
              }),
              JSX.jsxs("div", {
                className: Ve.versionContent,
                children: [
                  JSX.jsx("div", {
                    className: Ve.contentDisplay,
                    children: JSX.jsxs("div", {
                      className: Ve.displayText,
                      children: ["Minecraft ", version.gameVersion],
                    }),
                  }),
                  JSX.jsx("div", {
                    className: Ve.contentGameVersion,
                    children: version.display,
                  }),
                ],
              }),
              JSX.jsx("div", {
                className: Ve.contentButtonStart,
                onClick: (e) => {
                  e.stopPropagation();
                  if (!isLaunching) handleLaunchGame(version);
                },
                children: isLaunching
                  ? JSX.jsx("i", {
                      className: "bi bi-arrow-repeat",
                      style: {
                        color: "#fff",
                        fontSize: "14px",
                        animation: "spin 1s linear infinite",
                        display: "inline-block",
                      },
                    })
                  : JSX.jsx(PlayIcon, { width: 10, height: 10 }),
              }),
              isLaunching &&
                JSX.jsxs("div", {
                  className: Ve.preloaderOverlay,
                  children: [
                    JSX.jsxs("div", {
                      className: Ve.circularLoader,
                      style: { "--progress": loadPercent },
                      children: [
                        JSX.jsxs("svg", {
                          viewBox: "0 0 80 80",
                          children: [
                            JSX.jsx("circle", {
                              className: Ve.bg,
                              cx: 40,
                              cy: 40,
                              r: 36,
                            }),
                            JSX.jsx("circle", {
                              className: Ve.fill,
                              cx: 40,
                              cy: 40,
                              r: 36,
                            }),
                          ],
                        }),
                        JSX.jsxs("div", {
                          className: Ve.percentage,
                          children: [`${loadPercent}%`],
                        }),
                      ],
                    }),
                    JSX.jsx("div", {
                      className: Ve.loaderText,
                      children: loadText,
                    }),
                  ],
                }),
            ],
          },
          version.id
        );
      }),
    }),
  });
};

// --- Settings View ---
const SettingsView = () => {
  const [, forceUpdate] = React.useState(LauncherController.ram || 1500);

  const handleRamChange = (event) => {
    const value = Number(event.target.value);
    forceUpdate(value);
    LauncherController.ram = value;
  };

  return JSX.jsx(React.Fragment, {
    children: JSX.jsxs("div", {
      className: ga.settings,
      children: [
        JSX.jsxs("div", {
          className: `${ga.setting} ${ga.settingRam}`,
          children: [
            JSX.jsxs("label", {
              children: [
                JSX.jsx("div", {
                  className: ga.ramTitle,
                  children: "RAM",
                }),
                JSX.jsxs("div", {
                  className: ga.ramTitle,
                  children: [
                    LauncherController.ram ?? 0,
                    JSX.jsx("span", { children: "mb" }),
                  ],
                }),
              ],
            }),
            JSX.jsx(RangeSlider, {
              min: 1500,
              max: LauncherController.maxRam,
              value: LauncherController.ram,
              onChange: handleRamChange,
            }),
          ],
        }),
        JSX.jsxs("div", {
          className: ga.settingDouble,
          children: [
            JSX.jsx("div", {
              className: `${ga.setting}`,
              children: JSX.jsx("label", {
                children: "Client Resources",
              }),
            }),
            JSX.jsx(Button, {
              buttonType: "fill",
              icon: "P",
              description: "Open Folder",
              onClick: () => LauncherController.sendActionMessage("OPEN_CLIENT_RESOURCES", {}),
            }),
          ],
        }),
      ],
    }),
  });
};

// --- Header View ---
const HeaderView = () => {
  const { addNotification } = useNotification();
  const location = usePresence();
  const [username] = React.useState(String(LauncherController.user?.username || "WirexUser"));
  const [subExpiry] = React.useState(String(LauncherController.user?.subtill || "∞ Навсегда"));
  const [gameUsername, setGameUsername] = React.useState(
    LauncherController.user?.username || LauncherController.userName || "WirexUser"
  );

  const handleUsernameBlur = () => {
    if (!LauncherController.isStarting()) {
      if (!gameUsername) {
        addNotification("Nickname cannot be empty");
        return;
      }
      LauncherController.userName = gameUsername;
    }
  };

  const isHeaderActive = location.pathname === "/home" || location.pathname === "/settings";

  return JSX.jsx(React.Fragment, {
    children: JSX.jsxs("div", {
      className: `${de.header} ${isHeaderActive ? de.active : ""}`,
      children: [
        JSX.jsxs("div", {
          className: de.headerLeft,
          children: [
            JSX.jsxs("div", {
              className: de.headerAccount,
              children: [
                JSX.jsx("div", {
                  className: de.accountAvatar,
                  style: { width: "30px", height: "30px", minWidth: "30px", minHeight: "30px", maxWidth: "30px", maxHeight: "30px", borderRadius: "8px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
                  children: JSX.jsx("img", {
                    src: AVATAR_IMAGE_PATH,
                    alt: "Avatar",
                    style: { width: "30px", height: "30px", maxWidth: "30px", maxHeight: "30px", objectFit: "cover", borderRadius: "8px", display: "block" },
                  }),
                }),
                JSX.jsxs("div", {
                  className: de.accountInfo,
                  children: [
                    JSX.jsx("div", {
                      className: de.infoName,
                      children: username.length > 11 ? username.substring(0, 8) + "..." : username,
                    }),
                    JSX.jsx("div", {
                      className: de.infoSubscribe,
                      children: (subExpiry && (subExpiry.includes("Навсегда") || subExpiry.includes("∞") || subExpiry === "Истекла" || subExpiry === "Нет подписки")) 
                        ? subExpiry 
                        : ("До: " + (subExpiry || "Активна")),
                    }),
                  ],
                }),
              ],
            }),
            JSX.jsx("div", {
              className: `${de.headerNickname} ${location.pathname === "/home" ? de.active : ""}`,
              children: JSX.jsx(InputField, {
                remover: false,
                icon: "V",
                placeholder: "Game username...",
                value: gameUsername,
                onBlur: handleUsernameBlur,
                onChange: (e) => {
                  const val = e.currentTarget.value;
                  setGameUsername(val);
                  LauncherController.userName = val;
                },
                maxLength: 15,
              }),
            }),
          ],
        }),
        JSX.jsxs("div", {
          className: de.headerRight,
          children: [
            JSX.jsx("div", {
              className: `${de.actionsRollup} ${de.action}`,
              onClick: () => LauncherController.sendWindowState(false),
              children: JSX.jsx("i", { className: "bi bi-dash-lg" }),
            }),
            JSX.jsx("div", {
              className: `${de.actionsClose} ${de.action}`,
              onClick: () => LauncherController.sendWindowState(true),
              children: JSX.jsx("i", { className: "bi bi-x-lg" }),
            }),
          ],
        }),
      ],
    }),
  });
};

// --- Navigation View ---
const NAVIGATION_ITEMS = [
  { icon: "e", path: "/home" },
  { icon: "F", path: "/settings" },
];

const NavigationView = () => {
  const navigateTo = useTransitionNavigate();
  const location = usePresence();
  const [isNavigating, setIsNavigating] = React.useState(false);

  const handleNavigate = (path) => {
    if (location.pathname !== path && !isNavigating) {
      setIsNavigating(true);
      navigateTo(path);
      setTimeout(() => {
        setIsNavigating(false);
      }, 350);
    }
  };

  const handleLogout = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      LauncherController.logout();
      setTimeout(() => {
        setIsNavigating(false);
      }, 350);
    }
  };

  const isNavActive = location.pathname === "/home" || location.pathname === "/settings";

  return JSX.jsx(React.Fragment, {
    children: JSX.jsxs("div", {
      className: `
        ${Le.navigation} 
        ${isNavActive ? Le.active : ""}
        ${isNavigating ? Le.navigationBlocked : ""}
      `,
      children: [
        JSX.jsxs("div", {
          className: Le.navigationHeader,
          children: [
            JSX.jsx("div", {
              id: "catch",
              className: Le.headerIcon,
              style: { fontFamily: "Icons" },
              children: "H",
            }),
            NAVIGATION_ITEMS.map((item, idx) =>
              JSX.jsx(
                "div",
                {
                  id: "catch",
                  className: `
                    ${Le.path} 
                    ${location.pathname === item.path ? Le.current : ""}
                    ${isNavigating ? Le.pathBlocked : ""}
                  `,
                  style: { fontFamily: "Icons" },
                  onClick: () => {
                    if (!LauncherController.isStarting()) {
                      handleNavigate(item.path);
                    }
                  },
                  children: item.icon,
                },
                idx
              )
            ),
          ],
        }),
        JSX.jsx("div", {
          className: Le.navigationFooter,
          children: JSX.jsx("div", {
            id: "catch",
            className: `
              ${Le.footerIcon}
              ${isNavigating ? Le.iconBlocked : ""}
            `,
            style: { fontFamily: "Icons" },
            onClick: () => {
              if (!LauncherController.isStarting()) {
                handleLogout();
              }
            },
            children: "n",
          }),
        }),
      ],
    }),
  });
};
