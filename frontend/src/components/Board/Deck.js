import React from "react";
import "../../css/Deck.css";
import flipped from "../../img/flipped.png";

function Deck({ side, player, cards }) {
  const _cards = [];
  const len = Array.isArray(cards) ? cards.length : cards;
  let right = 0;
  let bottom = 0;

  for (let i = 0; i < len; i++) {
    _cards.push(
      <img
        key={i}
        style={{ right: right + "px", bottom: bottom + "px" }}
        src={flipped}
      ></img>
    );
    if (right <= 12) {
      bottom += 3;
      right += 3;
    }
  }

  return (
    <div className={`Deck ${side}-deck`}>
      <div className="Deck-cards">{_cards}</div>
      <div className="Deck-quantity">{len}</div>
    </div>
  );
}

export default Deck;
