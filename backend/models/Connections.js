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

  removeRoom(room) {
    delete this.rooms[room.getId()]
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

  addRoom(room) {
    this.rooms[room.getId()] = room
  }

  getRoom(room) {
    return this.rooms[room]
  }
}

module.exports = Connections;
