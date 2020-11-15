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
        <h3>Room header; Room: {room}</h3>
        <button onClick={testRefresh}>Emit refresh!</button>
        <button onClick={pass}>Pass</button>
      </div>
      <Board />
    </div>
  ) : (
    "LOADING"
  );
}

export default Room;
