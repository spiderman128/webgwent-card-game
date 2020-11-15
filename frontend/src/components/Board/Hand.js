import React, { useEffect, useContext } from "react";
import Card from "./Card";
import "../../css/Hand.css";
import SocketContext from "../../SocketContext";

function Hand({ player, cards }) {
  const { socket } = useContext(SocketContext);

  const playCard = (e, card) => {
    socket.emit("playCard", card);
    socket.emit("refresh");
  };

  return (
    <div className={`Hand`}>
      {cards.map((card, idx) => (
        <Card
          key={`${player}-${card.name}-${idx}`}
          id={card.id}
          card={card}
          onClick={(e) => playCard(e, card)}
        />
      ))}
    </div>
  );
}

export default Hand;
