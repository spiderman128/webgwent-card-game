import React from "react";
import Card from "./Card";
import "../../css/Hand.css";

function Hand({ player, cards, setCurrentCard }) {
  const selectCard = (e, card) => {
    setCurrentCard(card);
  };

  return (
    <div className={`Hand`}>
      {cards.map((card, idx) => (
        <Card
          key={`${player}-${card.name}-${idx}`}
          id={card.id}
          card={card}
          onClick={(e) => selectCard(e, card)}
        />
      ))}
    </div>
  );
}

export default Hand;
