import React, { useEffect, useContext } from "react";
import SocketContext from "../SocketContext";
import { useParams } from "react-router-dom";
import Board from "./Board/Board";
import "../css/Room.css";

function Room() {
  const { room } = useParams();
  const { user, socket, setRoom } = useContext(SocketContext);
  console.log(user);

  useEffect(() => {
    setRoom(room);
    testRefresh();
    window.scrollTo({ top: 9999, behavior: "smooth" });
  }, [room]);

  const testRefresh = () => {
    socket.emit("refresh");
  };

  const pass = () => {
    socket.emit("passing");
  };

  return user.uid ? (
    <div className="Room">
      <div className="Room-header">
        <div class="Room-menu">
          <input type="checkbox" />
          <div class="Room-hamburger">
            <div class="Room-dots">
              <span class="first"></span>
              <span class="second"></span>
              <span class="third"></span>
            </div>
          </div>
          <div class="Room-action-items-bar">
            <div class="Room-action-items">
              <span class="first_item">
                <button onClick={testRefresh}>REFRESH</button>
                <i class="material-icons">favorite</i>
              </span>
              <span class="second_item">
                <button onClick={pass}>PASS</button>
                <i class="material-icons">chat</i>
              </span>
              <span class="third_item">
                <i class="material-icons">get_app</i>
              </span>
              <span class="fourth_item">
                <i class="material-icons">share</i>
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
