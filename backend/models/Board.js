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

  events() {
    globalThis.io.sockets.connected[this.player1.socketId].on(
      "refresh",
      this.updateBoard.bind(this)
    );
    globalThis.io.sockets.connected[this.player2.socketId].on(
      "refresh",
      this.updateBoard.bind(this)
    );

    globalThis.io.sockets.connected[this.player1.socketId].on(
      "disconnect",
      () => this.playerLeft(this.player1)
    );

    globalThis.io.sockets.connected[this.player2.socketId].on(
      "disconnect",
      () => this.playerLeft(this.player2)
    );
  }

  initialize() {
    this.events();
    this.side1 = new PlayerSide(this.player1, "player1", this);
    this.side2 = new PlayerSide(this.player2, "player2", this);
    this.side1.opponent = this.player2;
    this.side2.opponent = this.player1;
  }

  start() {
    this.chooseFirstPlayer();
    this.updateBoard();
  }

  /** EVENT HANDLER */
  send(event, data, side) {
    side
      ? globalThis.io.to(side.player.socketId).emit(event, data)
      : globalThis.io.to(this.id).emit(event, data);
  }

  /** UPDATING BOARD  */
  updateBoard() {
    console.log("REFRESHING!");
    if (this.isRoundOver()) {
      this.startNextRound();
      return;
    }

    let p1 = this.refreshPlayer(this.side1);
    let p2 = this.refreshPlayer(this.side2);

    this.send("updateBoard", p1, this.side1);
    this.send("updateBoard", p2, this.side2);
  }

  bothReady() {
    return this.side1.ready && this.side2.ready;
  }

  fetchDecks() {
    this.side1.initializeDeck();
    this.side2.initializeDeck();
  }

  switchTurn() {
    let current;
    if (this.side1.passed) {
      this.side2.isWaiting = false;
    } else if (this.side2.passed) {
      this.side1.isWaiting = false;
    } else {
      this.side1.isWaiting = !this.side1.isWaiting;
      this.side2.isWaiting = !this.side2.isWaiting;
    }

    current = this.side1.isWaiting
      ? this.side2.player.getName()
      : this.side1.player.getName();

    this.send("currentTurn", { currentTurn: current });

    this.updateBoard();
  }

  chooseFirstPlayer() {
    console.log("CHOOSING FIRST");
    let chosen = Math.random() >= 0.5 ? this.side1 : this.side2;

    this.send("firstPlayer", { firstPlayer: chosen.player.getName() });

    chosen === this.side1
      ? (this.side1.isWaiting = false)
      : (this.side2.isWaiting = false);
  }

  refreshPlayer(side, isPrivate) {
    // consider adding events for one player only (isPrivate)

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

    return response;
  }

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
    } else if (scorePlayer2 > scorePlayer1) {
      this.side1.removeLife();
    } else {
      this.side1.removeLife();
      this.side2.removeLife();
    }
  }

  gameOver(winner) {
    console.log("GAME OVER");

    this.side1.passed = false;
    this.side2.passed = false;

    this.send("gameover", {
      winner:
        winner === this.side1
          ? this.side1.player.getName()
          : this.side2.player.getName(),
    });
  }

  getWinner() {
    if (!this.side1.getLives() && !this.side2.getLives()) {
      return null; //tie
    }

    return this.side1.getLives() ? this.side1 : this.side2;
  }

  startNextRound() {
    this.checkScores();

    if (this.isOver()) {
      let winner = this.getWinner();
      console.log("IS OVER?");
      this.gameOver(winner);
      this.updateBoard();
      return;
    }

    this.side1.reset();
    this.side2.reset();

    this.start();
  }

  playerLeft(player) {
    let p = this.player1 === player ? this.side2 : this.side1;

    let message = { message: "Opponent left" };

    p.send("playerLeft", message);

    console.log("Player left");
  }
}

module.exports = Board;
