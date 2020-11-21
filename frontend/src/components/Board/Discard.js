import React from "react";
import "../../css/Discard.css";

function Discard({ side, player, cards }) {
  const _cards = [];
  let right = 0;
  let bottom = 0;

  for (let card of cards) {
    _cards.push(
      <img
        key={card.name}
        style={{ right: right + "px", bottom: bottom + "px" }}
        src={card.pic}
        alt={card.name}
      ></img>
    );
    if (right <= 12) {
      bottom += 3;
      right += 3;
    }
  }

  return (
    <div className={`Discard ${side}-discard`}>
      <div className="Discard-cards">{_cards}</div>
      <div className="Discard-quantity">{cards.length}</div>
    </div>
  );
}

export default Discard;
