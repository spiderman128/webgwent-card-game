import React, { useState, useContext, useEffect } from "react";
import SocketContext from "../../SocketContext";
import "../../css/PlayerPanel.css";

function PlayerPanel({ _ready, _inGame }) {
  const [ready, setReady] = useState(_ready);
  const [game, setGame] = useState(_inGame);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("startGame", () => {
      setGame(true);
    });
  }, [socket]);

  useEffect(() => {
    setReady(_ready);
    setGame(_inGame);
  }, [_ready, _inGame]);

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
          disabled={ready ? true : ""}
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
