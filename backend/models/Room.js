const Board = require("./Board");
const shortid = require("shortid");

class Room {
  constructor() {
    this.id = shortid.generate();
    this.players = [];
    this.ready = {};

    this.max_players = 2;
    this.board = null;
  }

  getId() {
    return this.id;
  }

  join(player) {
    if (this.players.length >= 2) return;

    this.players.push(player);
    player.setRoom(this);
    player.join(this.id);

    if (this.players.length === 2) {
      this.initializeBoard();
    }
  }

  initializeBoard() {
    this.board = new Board(this.id, this.players[0], this.players[1]);

    this.players[0].send("init:battle", {
      side: "player1",
      opponent: "player2",
    });

    this.players[1].send("init:battle", {
      side: "player2",
      opponent: "player1",
    });
  }

  setReady(user, r) {
    let ready = r ? true : false;
    this.ready[user.getId()] = ready;

    if (this.bothReady()) {
      this.board.init();
    }
  }

  bothReady() {
    return this.ready[this.players[0]] && this.ready[this.players[1]];
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
}

module.exports = Room;
