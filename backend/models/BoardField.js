class BoardField {
  constructor(side) {
    this.cards = [];
    this.score = 0;
  }

  addCard(card) {
    this.cards.push(card);
    this.calculateScore();
  }

  getCards() {
    return this.cards;
  }

  getCard(card) {
    for (let c of this.cards) {
      if (c == card) return c;
    }
    return -1;
  }

  getScore() {
    this.calculateScore();
    return this.score;
  }

  calculateScore() {
    this.score = this.cards.reduce((acc, card) => (acc += card.power), 0);
    return this.score;
  }

  reset() {
    let _cards = this.cards.slice();
    this.cards = [];
    this.score = 0;

    return _cards;
  }

  removeCard(card) {
    let idx = this.getPosition(card);
    let c = this.cards[idx];
    this.cards.splice(idx, 1);

    return c;
  }

  getInfo() {
    return {
      cards: this.cards,
      score: this.score,
    };
  }

  getPosition(card) {
    return this.cards.indexOf(card);
  }
}

module.exports = BoardField;
