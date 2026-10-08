class LauncherController {
  static navigate;
  static notification;
  static user = null;
  static versions = [];
  static starterInformation = null;
  static ram = 2048;
  static maxRam = 16000;
  static clientName = "Wirex Client";
  static userName = "WirexUser";
  static preLoaderPercent = 0;
  static preLoaderText = "";
  
  static preloaderListeners = new Set();
  static spinnerStopListeners = new Set();

  static isStarting = () => {
    return LauncherController.starterInformation != null;
  };

  static sendActionMessage = (action, payload = {}) => {
    payload.action = action;
    if (window.chrome && window.chrome.webview) {
      window.chrome.webview.postMessage(JSON.stringify(payload));
    }
  };

  static sendToRoute = async (route = "/") => {
    if (this.navigate) {
      this.navigate(route);
    }
  };

  static subscribePreloader(listener) {
    this.preloaderListeners.add(listener);
  }

  static subscribeSpinnerStop(listener) {
    this.spinnerStopListeners.add(listener);
  }

  static unsubscribePreloader(listener) {
    this.preloaderListeners.delete(listener);
  }

  static notifyPreloaderListeners() {
    for (const listener of this.preloaderListeners) {
      listener(this.preLoaderText, this.preLoaderPercent);
    }
  }

  static notifySpinnerStopListeners(isLoading) {
    for (const listener of this.spinnerStopListeners) {
      listener(isLoading);
    }
  }

  static setPreLoaderText = (text, percent) => {
    this.preLoaderText = text;
    this.preLoaderPercent = percent;
    this.notifyPreloaderListeners();
  };

  static authorize = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const credentials = {};
    formData.formData = formData.forEach((value, key) => {
      credentials[key] = value.toString();
    });

    const username = credentials.username;
    const password = credentials.password;

    if (username && password) {
      const payload = {
        authKey: password,
        userName: username
      };
      LauncherController.notifySpinnerStopListeners(true);
      this.sendActionMessage("AUTHORIZE_USER", payload);
    } else {
      this.notification("Some fields are empty");
    }
  };

  static logout = async () => {
    if (this.user != null) {
      this.user = null;
      this.sendToRoute();
    }
  };

  static startClient = async () => {
    this.setPreLoaderText("Please wait...", 0);
    const resolvedUser = LauncherController.user?.username || LauncherController.userName || "WirexUser";
    const resolvedUid = LauncherController.user?.uid || LauncherController.user?.id || (window.localStorage ? localStorage.getItem('wirex_current_uid') : null) || 777;
    const payload = {
      memoryCount: String(LauncherController.ram),
      userName: String(resolvedUser),
      uid: String(resolvedUid),
      id: String(resolvedUid)
    };
    LauncherController.sendActionMessage("START_CLIENT", payload);
  };

  static sendWindowState = async (isClose) => {
    const action = isClose ? "WINDOW_EXIT" : "WINDOW_MINIMIZE";
    LauncherController.sendActionMessage(action, {});
  };

  static handleLauncherActionMessage = async (action, value) => {
    switch (action) {
      case "AUTHORIZE_STATE": {
        if (value.state === "OK") {
          this.user = new UserSession();
          this.user.subtill = value.till;
          this.user.username = value.username;
          this.user.uid = value.id;
          this.user.priority = value.priority;
          this.versions = [];

          const rawVersions = value.versions.split(";");
          for (let i = 0; i < rawVersions.length && rawVersions[i] !== ""; i++) {
            const versionObj = new LauncherVersion();
            const parts = rawVersions[i].split(":");
            const id = parts[0];
            const displayStr = parts[1];
            const priority = Number(parts[2]);

            versionObj.id = id;
            versionObj.display = displayStr.split(" ")[0];
            versionObj.gameVersion = displayStr.split(" ")[1];
            versionObj.priority = priority;
            
            this.versions.push(versionObj);
          }
          this.sendToRoute("/home");
        } else {
          LauncherController.notification(value.message);
        }
        LauncherController.notifySpinnerStopListeners(false);
        break;
      }
      case "INITIALIZE_CLIENT_INFORMATION": {
        this.ram = value.memoryCount;
        this.maxRam = value.maxMemoryCount;
        this.clientName = value.clientName;
        this.userName = value.userName;
        document.documentElement.style.setProperty(
          "--accent-color",
          value.clientColor
        );
        break;
      }
      case "CHANGE_LOADING_TEXT": {
        this.setPreLoaderText(value, 100);
        break;
      }
      case "CHANGE_LOADER_TEXT_WITH_PERCENT": {
        this.setPreLoaderText(value.status, value.percent);
        break;
      }
    }
  };
}

window.chrome.webview.addEventListener("message", (event) =>
  LauncherController.handleLauncherActionMessage(event.data.action, event.data.value)
);
