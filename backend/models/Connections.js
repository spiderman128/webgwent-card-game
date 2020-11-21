class Connections {
  constructor() {
    this.connections = {};
    this.rooms = {};
  }

  add(user) {
    this.connections[user.getName()] = user;
  }

  remove(user) {
    delete this.connections[user.getName()];
  }

  listConnections() {
    return this.connections;
  }

  hasUser(user) {
    return !!this.connections[user];
  }

  getUser(user) {
    return this.connections[user];
  }
}

module.exports = Connections;
