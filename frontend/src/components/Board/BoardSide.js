import React, { useState } from "react";
import "../../css/BoardSide.css";
import Player from "./Player";
import WeatherField from "./WeatherField";
import BoardField from "./BoardField";
import Hand from "./Hand";
import Discard from "./Discard";
import Deck from "./Deck";
import CardDetails from "./CardDetails";

function BoardSide({ player, PLAYER, sideInfo, isWaiting }) {
  const [currentCard, setCurrentCard] = useState();

  console.log(sideInfo);

  return (
    <div className={`BoardSide ${PLAYER} ${isWaiting ? "waiting" : ""}`}>
      <div className={`side-fields ${PLAYER}-side-fields`}>
        {PLAYER === "you" ? <WeatherField /> : <></>}
        <Player side={PLAYER} user={player} info={sideInfo} />
      </div>

      <div className={`fields ${PLAYER}-fields`}>
        <BoardField
          side={PLAYER}
          type="infantry"
          cards={sideInfo.fields.infantry}
          score={sideInfo.fields.infantry.score}
        />

        <BoardField
          side={PLAYER}
          type="ranged"
          cards={sideInfo.fields.ranged}
          score={sideInfo.fields.ranged.score}
        />

        <BoardField
          side={PLAYER}
          type="siege"
          cards={sideInfo.fields.siege}
          score={sideInfo.fields.siege.score}
        />

        {PLAYER === "you" ? (
          <Hand
            player="you"
            cards={sideInfo.hand}
            setCurrentCard={setCurrentCard}
          />
        ) : (
          <></>
        )}
      </div>
      <div className={`cards-fields ${PLAYER}-cards-fields`}>
        <Discard side={PLAYER} user={player} cards={sideInfo.discard} />
        <Deck side={PLAYER} user={player} cards={sideInfo.deck} />
        <CardDetails card={currentCard} setCurrentCard={setCurrentCard} />
      </div>
    </div>
  );
}

export default BoardSide;
