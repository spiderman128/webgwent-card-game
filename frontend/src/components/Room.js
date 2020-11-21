import React, { useEffect, useContext, useCallback } from "react";
import SocketContext from "../SocketContext";
import { useParams } from "react-router-dom";
import Board from "./Board/Board";
import "../css/Room.css";

function Room() {
  const { room } = useParams();
  const { user, socket, setRoom } = useContext(SocketContext);

  const testRefresh = useCallback(() => {
    socket.emit("refresh");
  }, [socket]);

  const pass = useCallback(() => {
    socket.emit("passing");
  }, [socket]);

  useEffect(() => {
    setRoom(room);
    testRefresh();
    window.scrollTo({ top: 9999, behavior: "smooth" });
  }, [room, setRoom, testRefresh]);

  return user.uid ? (
    <div className="Room">
      <div className="Room-header">
        <div className="Room-menu">
          <input type="checkbox" />
          <div className="Room-hamburger">
            <div className="Room-dots">
              <span className="first"></span>
              <span className="second"></span>
              <span className="third"></span>
            </div>
          </div>
          <div className="Room-action-items-bar">
            <div className="Room-action-items">
              <span className="first_item">
                <button onClick={testRefresh}>REFRESH</button>
                <i className="material-icons">favorite</i>
              </span>
              <span className="second_item">
                <button onClick={pass}>PASS</button>
                <i className="material-icons">chat</i>
              </span>
              <span className="third_item">
                <i className="material-icons">get_app</i>
              </span>
              <span className="fourth_item">
                <i className="material-icons">share</i>
              </span>
            </div>
          </div>
        </div>

        {/* <h3>Room header; Room: {room}</h3>
        <button onClick={testRefresh}>Emit refresh!</button>
        <button onClick={pass}>Pass</button> */}
      </div>
      <Board />
    </div>
  ) : (
    "LOADING"
  );
}

export default Room;
