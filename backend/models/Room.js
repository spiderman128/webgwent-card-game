const Board = require("./Board");
const shortid = require("shortid");

class Room {
  constructor() {
    this.id = shortid.generate();
    this.players = [];

    this.max_players = 2;
    this.board = null;
  }

  getId() {
    return this.id;
  }

  join(player) {
    this.players.push(player);
    player.setRoom(this);
    player.join(this.id);

    if (this.players.length === 2) {
      this.initializeBoard();
    }
  }

  initializeBoard() {
    this.board = new Board(this.getId(), this.players[0], this.players[1]);
  }

  leave(user) {
    let idx = this.players.indexOf(user);
    let player = idx ? "player2" : "player1";

    this.players.splice(idx, 1);

    if (this.board) {
      this.board.playerLeft(player);
    }

    if (!this.hasUser()) {
      delete connections.rooms[this.getId()];
    }
  }

  hasUser() {
    return this.players.length;
  }

  getPlayer(uid) {
    return this.players[0].uid === uid ? this.players[0] : this.players[1];
  }

  destroy() {
    if (this.players.length > 1) {
      this.players[0].leaveRoom(this.getId())
      this.players[0].setRoom(null)
      this.players[1].leaveRoom(this.getId())
      this.players[1].setRoom(null)
    } else if (this.players.length === 1) {
      this.players[0].leaveRoom(this.getId())
      this.players[0].setRoom(null)
    }
    
    globalThis.connections.removeRoom(this);

  }
}

module.exports = Room;
