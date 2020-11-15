class Card {
  constructor(id, card) {
    this.id = id;
    this.name = card.name;
    this.type = card.type;
    this.power = card.power;
    this.ability = card.ability;
    this.faction = card.faction;
    this.pic = card.img;
  }

  getPower() {
    return this.power;
  }

  getName() {
    return this.name;
  }

  getImage() {
    return this.pic;
  }

  getFaction() {
    return this.faction;
  }

  getType() {
    return this.type;
  }

  reset() {}
}

module.exports = Card;
