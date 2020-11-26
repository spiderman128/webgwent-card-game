import React, { useContext } from "react";
import "../../css/Overlay.css";
import SocketContext from "../../SocketContext";

function Overlay({ action, currPlayer }) {
  const { user } = useContext(SocketContext);

  return currPlayer && action !== "gameOver" ? (
    <div
      className={`Board-firstPlayer-overlay ${
        currPlayer === user.username ? "overlay-you" : "overlay-opponent"
      }`}
    >
      <div>
        {action === "firstPlayer" ? `First Turn: ${currPlayer}` : <></>}
        {action === "currentTurn" ? `${currPlayer}'s Turn` : <></>}
      </div>
    </div>
  ) : (
    <div className="Board-winner-overlay">
      <div>{`Winner: ${currPlayer}`}</div>
    </div>
  );
}

export default Overlay;
