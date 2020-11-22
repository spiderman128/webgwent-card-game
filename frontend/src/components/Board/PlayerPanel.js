import React, { useState, useContext, useEffect, useCallback } from "react";
import SocketContext from "../../SocketContext";
import "../../css/PlayerPanel.css";

function PlayerPanel({ _ready, _inGame }) {
  const [ready, setReady] = useState(_ready);
  const [game, setGame] = useState(_inGame);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    let mounted = true;

    socket.on("startGame", () => {
      if (mounted) setGame(true);
    });

    return function cleanup() {
      mounted = false;
    };
  }, [socket]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setReady(_ready);
      setGame(_inGame);

      return function cleanup() {
        mounted = false;
      };
    }
  }, [_ready, _inGame]);

  const _setReady = () => {
    socket.emit("ready");
    setReady(true);
  };

  const testRefresh = useCallback(() => {
    socket.emit("refresh");
  }, [socket]);

  const pass = useCallback(() => {
    socket.emit("passing");
  }, [socket]);

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
        <div className="PlayerPanel-menu">
          <input type="checkbox" defaultChecked={true} />
          <div className="PlayerPanel-hamburger">
            <div className="PlayerPanel-dots">
              <span className="first"></span>
              <span className="second"></span>
              <span className="third"></span>
            </div>
          </div>
          <div className="PlayerPanel-action-items-bar">
            <div className="PlayerPanel-action-items">
              <button
                className="btn panel-btn first_item"
                onClick={testRefresh}
              >
                REFRESH
              </button>
              <button className="btn panel-btn second_item" onClick={pass}>
                PASS
              </button>
              <button className="btn panel-btn third_item" onClick={pass}>
                LEAVE
              </button>
            </div>
          </div>
        </div>
        // <button className="btn pass-btn" onClick={pass}>
        //   PASS
        // </button>
      )}
    </div>
  );
}

export default PlayerPanel;
