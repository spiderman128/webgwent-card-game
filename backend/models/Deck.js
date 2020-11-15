let Card = require("./Card");
const api = globalThis.api;

class Deck {
  constructor(side, factionId) {
    this.side = side;
    this.deck = [];
    this.faction = 1;
  }

  async fetchCards() {
    const response = await api.getDeck(this.faction);
    this.deck = response.cards.map((card, idx) => new Card(idx, card));
    this.faction = response.faction;
  }

  length() {
    return this.deck.length;
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  getFaction() {
    return this.faction;
  }

  getDeck() {
    return this.deck;
  }

  getDeckLength() {
    return this.deck.length;
  }

  draw() {
    if (this.deck.length) {
      let card = this.deck.pop();
      return card;
    }

    return 0;
  }

  addCard(card) {
    this.deck.push(card);
  }

  removeCard(card) {
    for (let c of this.deck) {
      if (c.name == card.name) {
        this.deck.splice(this.deck.indexOf(c), 1);
        break;
      }
    }
  }
}

module.exports = Deck;
