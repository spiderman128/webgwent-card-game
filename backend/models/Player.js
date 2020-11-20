const shortid = require("shortid");

class Player {
  constructor(socket, user = {}) {
    this.socketId = socket.id;

    this.uid = shortid.generate();
    this.username = user.username;
    this.email = user.email;
    this.rating = user.rating;
    this.wins = user.wins;
    this.losses = user.losses;
    this.ratio = user.ratio;
    this.personal_deck = user.personal_deck;

    this.inQueue = false;
    this.room = null;
    this.events(socket);
  }

  getId() {
    return this.uid;
  }

  setName(username) {
    this.username = username;
  }

  getName() {
    return this.username;
  }

  setDeck(deck) {
    this.deck = deck;
  }

  getDeck() {
    return this.deck;
  }

  setHand(hand) {
    this.hand = hand;
  }

  getHand() {
    return this.hand;
  }

  setRoom(room) {
    this.room = room.id;
  }

  reconnect(socket) {
    this.events(socket);
  }

  disconnect() {
    globalThis.matchmaker.removeFromQueue(this);
    console.log("I AM DISCONNECTING");
  }

  events(socket) {
    const self = this;

    this.join = (room) => {
      socket.join(room);
      socket.emit("update", self);
    };

    this.send = (event, data, room) => {
      room = room || null;
      data = data || null;

      if (!room) {
        socket.emit(event, data);
      } else {
        socket.to(room).emit(event, data);
      }
    };

    socket.on("request:cancelMatchmaking", function () {
      console.log("CANCELLING MATCHMAKING");
      globalThis.matchmaker.removeFromQueue(self);
      socket.emit("update", self);
    });

    socket.on("request:matchmaking", function () {
      console.log("REQUESTED MATCHMAKING");
      if (self.inQueue) return;

      let room = globalThis.matchmaker.findOpponent(self);

      if (room) {
        globalThis.io.to(self.socketId).emit("matchmaking:found", room.getId());
        globalThis.io
          .to(self.opponent.socketId)
          .emit("matchmaking:found", room.getId());
        globalThis.io.to(room.getId()).emit("checkRoom");
      }
      socket.emit("update", self);
    });
  }
}

module.exports = Player;
