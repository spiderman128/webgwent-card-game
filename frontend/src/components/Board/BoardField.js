import React from "react";
import Card from "./Card";
import "../../css/BoardField.css";

function BoardField({ side, type, cards, score }) {
  return (
    <div className={`BoardField ${type}`}>
      <div className="BoardField-score">{score}</div>
      <div className="BoardField-horn"></div>
      <div className="BoardField-cards">
        {cards ? (
          cards.cards.map((card, idx) => (
            <Card
              key={`${side}-${card.name}-${idx}`}
              card={card}
              className="field-card"
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BoardField;
