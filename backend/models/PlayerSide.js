let BoardField = require("./BoardField");
let Deck = require("./Deck");
let Hand = require("./Hand");
const api = globalThis.api;

class PlayerSide {
  constructor(player, side, board) {
    this.board = board;
    this.side = side;
    this.player = player;
    this.deck = new Deck(this.side, 1);
    this.hand = new Hand();

    this.fields = {};
    this.fields.infantry = new BoardField(this);
    this.fields.ranged = new BoardField(this);
    this.fields.siege = new BoardField(this);
    this.discardPile = [];

    this.score = 0;
    this.lives = 2;
    this.isWaiting = false;
    this.passed = false;

    this.opponent = null;

    this.ready = false;

    globalThis.io.sockets.connected[this.player.socketId].on(
      "playCard",
      (card) => {
        this.playCard(card);
      }
    );

    globalThis.io.sockets.connected[this.player.socketId].on("passing", () => {
      this.pass();
      this.board.updateBoard();
    });

    globalThis.io.sockets.connected[this.player.socketId].on("ready", () => {
      this.setReady();

      if (this.board.bothReady()) {
        this.board.send("startGame");
        this.board.fetchDecks();
        this.board.start();
      }
    });
  }

  /** EVENT HANDLERS */
  send(event, message, isPrivate) {
    message = message || {};
    isPrivate = isPrivate ? false : true;
    message.side = this.side;

    if (isPrivate)
      return globalThis.io.to(this.player.socketId).emit(event, message);

    this.board.send(event, message);
  }

  // receive(event, cb) {
  //   globalThis.io.to(player.room.id).on(event, cb);
  // }
  /** ************** */

  draw() {
    for (let i = 0; i < 10; i++) {
      let card = this.deck.draw();
      this.hand.addCard(card);
    }
  }

  async initializeDeck() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    await this.deck.fetchCards();

    while (!this.deck.getDeckLength()) {
      await delay(500);
    }

    this.initializeHand();
    this.board.updateBoard();
  }

  initializeHand() {
    for (let i = 0; i < 12; i++) {
      let card = this.deck.deck[Math.floor(Math.random() * this.deck.length())];
      this.hand.addCard(card);
      this.deck.removeCard(card);
    }
  }

  isWaiting() {
    return this.isWaiting;
  }

  setReady() {
    this.isWaiting = true;
  }

  pass() {
    console.log("PASSED CALLED");
    this.passed = true;
    this.isWaiting = true;
    this.board.switchTurn();
    this.send("passed", { passed: this.passed });
  }

  getFieldCards() {
    return [
      ...this.fields[0].getCards(),
      ...this.fields[1].getCards(),
      ...this.fields[2].getCards(),
    ];
  }

  getName() {
    return this.player.getName();
  }

  calculateScore() {
    let total = 0;
    for (let key in this.fields) {
      total += this.fields[key].calculateScore();
    }

    this.score = total;
    return this.score;
  }

  getScore() {
    return +this.calculateScore();
  }

  getLives() {
    return this.lives;
  }

  removeLife() {
    this.lives--;
  }

  playCard(card) {
    if (!card || card === -1) return;
    if (this.isWaiting) return;
    if (this.passed) return;

    card = this.hand.removeCard(card.id);

    this.placeCard(card);

    if (!this.hand.length()) {
      console.log("NO CARDS");
      this.pass();
    }

    this.board.switchTurn();
  }

  placeCard(card) {
    this.fields[card.getType()].addCard(card);
    return 1;
  }

  clearFields() {
    for (let key in this.fields) {
      this.discardPile = this.discardPile.concat(this.fields[key].reset());
    }
  }

  addToDiscard(card) {
    this.discardPile.push(card);
  }

  removeFromDiscard(card) {
    for (let i = 0; this.discardPile.length; i++) {
      if (this.discardPile[i] == card) {
        this.discardPile.splice(i, 1);
        break;
      }
    }
  }

  getDiscard() {
    return this.discardPile;
  }

  getInfo() {
    return {
      name: this.getName(),
      lives: this.lives,
      score: this.calculateScore(),
      hand: this.hand.getCards(),
      deck: this.deck.getDeck(),
      faction: this.deck.getFaction(),
      discard: this.getDiscard(),
      passed: this.passed,
      isWaiting: this.isWaiting,
    };
  }

  getInfoFoe() {
    return {
      name: this.getName(),
      lives: this.lives,
      score: this.calculateScore(),
      hand: this.hand.length(),
      deck: this.deck.length(),
      faction: this.deck.getFaction(),
      discard: this.getDiscard(),
      passed: this.passed,
      isWaiting: this.isWaiting,
      fields: this.fields,
    };
  }

  reset() {
    this.clearFields();
    this.passed = false;
  }
}

module.exports = PlayerSide;
