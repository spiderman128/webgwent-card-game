import React, { useContext } from "react";
import SocketContext from "../../SocketContext";
import "../../css/CardDetails.css";

function CardDetails({ card, setCurrentCard }) {
  const { socket } = useContext(SocketContext);

  const playCard = (e) => {
    socket.emit("playCard", card);
    socket.emit("refresh");
    setCurrentCard("");
  };

  return card ? (
    <div className="CardDetails">
      <img src={card.pic} alt={card.name} />
      <button className="btn play-btn" onClick={playCard}>
        PLAY
      </button>
    </div>
  ) : (
    <></>
  );
}

export default CardDetails;
