let Card = require("./Card");

class CardManager {
  constructor() {
    this.id = 0;
    this.cards = {};
  }

  create(key) {
    this.cards[this.id] = Card(this.id, key);
    this.cards++;
    return this.cards[this.id - 1];
  }
}

module.exports = CardManager;
