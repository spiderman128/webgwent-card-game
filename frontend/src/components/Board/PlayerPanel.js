import React, { useState, useContext, useEffect } from "react";
import SocketContext from "../../SocketContext";
import "../../css/PlayerPanel.css";

function PlayerPanel() {
  const [ready, setReady] = useState(false);
  const [game, setGame] = useState(false);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("startGame", () => {
      setGame(true);
    });
  }, []);

  const _setReady = () => {
    socket.emit("ready");
    setReady(true);
  };

  const pass = () => {
    socket.emit("passing");
  };

  return (
    <div className="PlayerPanel">
      {!game ? (
        <button
          className={ready ? "btn ready-btn ready" : "btn ready-btn"}
          onClick={_setReady}
          disabled={ready ? "true" : ""}
        >
          READY
        </button>
      ) : (
        <button className="btn pass-btn" onClick={pass}>
          PASS
        </button>
      )}
    </div>
  );
}

export default PlayerPanel;
