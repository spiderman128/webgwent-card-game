class Hand {
  constructor() {
    this.cards = [];
  }

  length() {
    return this.cards.length;
  }

  getCards() {
    return this.cards;
  }

  getCard(id) {
    for (let card of cards) {
      if (card.id == id) return card;
    }

    return -1;
  }

  removeCard(id) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id == id) return this.cards.splice(i, 1)[0];
    }

    return -1;
  }

  getRandomCard() {
    if (!this.cards.length) return -1;

    return this.cards[Math.floor(Math.random() * this.cards.length)];
  }

  addCard(card) {
    this.cards.push(card);
  }
}

module.exports = Hand;
