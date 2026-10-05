class UserSession {
  username;
  uid;
  subtill;
  priority = 0;
}

class ClientType {
  gameVersion;
  clientType;
  id;
  constructor(gameVersion, clientType, id) {
    this.gameVersion = gameVersion;
    this.clientType = clientType;
    this.id = id;
  }
}

class LauncherVersion {
  id;
  display;
  gameVersion;
  priority = 0;
}
