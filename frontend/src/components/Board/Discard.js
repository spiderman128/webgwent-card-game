import React, { useState } from "react";
import "../../css/Discard.css";

function Discard({ side, player, cards }) {
  console.log(cards);

  return (
    <div className={`Discard ${side}-discard`}>
      <div className="Discard-cards">
        {cards.map((card) => (
          <img key={card.id} src={card.pic}></img>
        ))}
      </div>
      <div className="Discard-quantity">{cards.length}</div>
    </div>
  );
}

export default Discard;
