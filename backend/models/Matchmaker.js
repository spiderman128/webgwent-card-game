const Deque = require("collections/deque");
const Room = require("./Room");

class Matchmaker {
  constructor(connections) {
    this.connections = connections;
    this.queue = new Deque([]);
  }

  checkForOpponent(user) {
    if (!this.queue.peek() || this.queue.peek() === user) return null;

    let opponent = this.queue.shift();
    opponent.inQueue = false;

    return opponent;
  }

  findOpponent(user) {
    let found = this.checkForOpponent(user);

    if (found) {
      console.log(`FOUND OPPONENT: ${found.uid}`);
      let room = new Room();
      let roomId = room.getId();

      globalThis.connections.rooms[roomId] = room;

      user.opponent = {
        uid: found.uid,
        socketId: found.socketId,
        name: found.name,
        rating: found.rating,
        wins: found.wins,
        losses: found.losses,
        ratio: found.ratio,
      };
      found.opponent = {
        uid: user.uid,
        socketId: user.socketId,
        name: user.name,
        rating: user.rating,
        wins: user.wins,
        losses: user.losses,
        ratio: user.ratio,
      };

      room.join(user);
      room.join(found);

      user.inQueue = false;
      found.inQueue = false;

      return room;
    }

    this.placeInQueue(user);
  }

  placeInQueue(user) {
    this.queue.push(user);
    user.inQueue = true;
  }

  removeFromQueue(user) {
    const idx = this.queue.indexOf(user);
    this.queue = new Deque(this.queue.filter((index) => index !== idx));
    user.inQueue = false;
  }
}

module.exports = Matchmaker;