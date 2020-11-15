class Connections {
  constructor() {
    this.connections = {};
    this.rooms = {};
  }

  add(user) {
    this.connections[user.getId()] = user;
  }

  remove(user) {
    delete this.connections[user.getId()];
  }

  listConnections() {
    return this.connections;
  }

  hasUser(user) {
    return !!this.connections[user.getId()];
  }
}

module.exports = Connections;
