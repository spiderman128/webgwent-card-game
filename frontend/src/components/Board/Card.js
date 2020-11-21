import React from "react";
import "../../css/Card.css";

function Card({ card, onClick }) {
  return (
    <div className={`Card hand-card`} onClick={onClick ? onClick : undefined}>
      <img src={card.pic} alt={card.name} />
    </div>
  );
}

export default Card;
