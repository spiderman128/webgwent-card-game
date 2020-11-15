const PlayerSide = require("./PlayerSide");

class Board {
  constructor(id, player1, player2) {
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
    this.turn = 0;
    this.state = null;

    this.initialize();
  }

  initialize() {
    globalThis.io.sockets.connected[this.player1.socketId].on(
      "refresh",
      this.refreshBoard.bind(this)
    );
    globalThis.io.sockets.connected[this.player2.socketId].on(
      "refresh",
      this.refreshBoard.bind(this)
    );

    globalThis.io.sockets.connected[this.player1.socketId].on(
      "disconnect",
      () => this.playerLeft(this.player1)
    );

    globalThis.io.sockets.connected[this.player2.socketId].on(
      "disconnect",
      () => this.playerLeft(this.player2)
    );

    this.side1 = new PlayerSide(this.player1, "player1", this);
    this.side2 = new PlayerSide(this.player2, "player2", this);
    this.side1.opponent = this.player2;
    this.side2.opponent = this.player1;

    this.start();
  }

  start() {
    this.chooseFirstPlayer();
    this.refreshBoard();
  }

  /** EVENT HANDLERS */
  send(event, data) {
    globalThis.io.in(this.id).emit(event, data);
  }

  // runEvent(evtId, ctx, args, id) {
  //   ctx = ctx || this;
  //   id = id || null;
  //   args = args || [];

  //   let event = "on" + evtId;

  //   if (!this.events[event]) return;

  //   if (id) {
  //     let obj = this.events[event][id];
  //     obj.cb = obj.cb.bind(ctx);
  //     obj.cb.apply(ctx, obj.onArgs.concat(args));
  //   } else {
  //     for (let _id in this.events[event]) {
  //       let obj = this.event[event][_id];
  //       obj.cb = obj.cb.bind(ctx);
  //       obj.cb.apply(ctx, obj.onArgs.concat(args));
  //     }
  //   }
  // }

  // on(evtId, cb, ctx, args) {
  //   ctx = ctx || this;
  //   id = id || null;
  //   args = args || [];

  //   let event = "on" + evtId;
  //   let uid = shortid.generate();

  //   let obj = {};

  //   if (!ctx) obj.cb = cb;
  //   else obj.cb = cb.bind(ctx);

  //   obj.onArgs = args;

  //   if (!(event in this.events)) {
  //     this.events[event] = {};
  //   }

  //   this.events[event][uid] = obj;

  //   return uid;
  // }

  // off(evtId, id) {
  //   id = id || null;

  //   let event = "on" + evtId;

  //   if (!this.events[event]) return;

  //   if (id) {
  //     this.events[event][id] = null;
  //     delete this.events[event][uid];
  //     return;
  //   }

  //   for (let uid in this.events[event]) {
  //     this.events[event][uid] = null;
  //     delete this.events[event][uid];
  //   }
  // }

  /** ************** */

  /** UPDATING BOARD  */
  updateBoard(side, isPrivate) {
    isPrivate = isPrivate || false;
    console.log(`SENDING FOR ${side.player.uid}`);

    let foe = side === this.side1 ? this.side2 : this.side1;

    let response = {
      info: side.getInfo(),
      opponent: foe.getInfoFoe(),
    };

    response.info.fields = {
      infantry: side.fields.infantry.getInfo(),
      ranged: side.fields.ranged.getInfo(),
      siege: side.fields.siege.getInfo(),
    };

    if (this.isRoundOver()) {
      response.results = this.startNextRound();
    }

    side.send("updateBoard", response, isPrivate);
  }

  switchTurn() {
    if (this.side1.passed) this.side2.isWaiting = false;
    else if (this.side2.passed) this.side1.isWaiting = false;
    else {
      console.log("SWITCHING");
      this.side1.isWaiting = !this.side1.isWaiting;
      this.side2.isWaiting = !this.side2.isWaiting;
    }

    this.refreshBoard();
  }

  chooseFirstPlayer() {
    console.log("CHOOSING FIRST");
    Math.random() >= 0.5
      ? (this.side1.isWaiting = false)
      : (this.side2.isWaiting = false);
  }

  refreshPlayer(side) {
    this.updateBoard(side);
  }

  refreshBoard() {
    this.refreshPlayer(this.side1);
    this.refreshPlayer(this.side2);
    console.log("Board refreshed!");
  }
  /** ****************** */

  isRoundOver() {
    return this.side1.passed && this.side2.passed;
  }

  isOver() {
    return !(this.side1.getLives() && this.side2.getLives());
  }

  checkScores() {
    let scorePlayer1 = this.side1.calculateScore();
    let scorePlayer2 = this.side2.calculateScore();
    console.log("Checking scores");

    if (scorePlayer1 > scorePlayer2) {
      this.side2.removeLife();
      return { loser: "player2", isTie: false };
    } else if (scorePlayer2 > scorePlayer1) {
      this.side1.removeLife();
      return { loser: "player1", isTie: false };
    } else {
      this.side1.removeLife();
      this.side2.removeLife();
      return { loser: null, isTie: true };
    }
  }

  gameOver(winner) {
    this.send("gameover", {
      winnner: winner,
    });
  }

  getWinner() {
    if (!this.side1.getLives() && !this.side2.getLives()) {
      return null; //tie
    }

    return this.side1.getLives() ? this.side1 : this.side2;
  }

  startNextRound() {
    let prevRound = this.checkScores();
    let loser = prevRound.loser;
    let winner = loser === "player1" ? "player2" : loser ? "player1" : null;

    if (this.isOver()) {
      console.log("IS OVER?");
      winner = this.getWinner();
      this.gameOver(winner);
      this.refreshBoard();
      return;
    }

    this.side1.reset();
    this.side2.reset();
    this.refreshBoard();

    this.start();
  }

  playerLeft(player) {
    let p = this.player1 === player ? this.side2 : this.side1;
    console.log(p);

    let message = { message: "Opponent left" };

    p.send("playerLeft", message);

    console.log("Player left");
  }
}

module.exports = Board;
