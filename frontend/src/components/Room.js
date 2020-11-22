import React, { useEffect, useContext } from "react";
import SocketContext from "../SocketContext";
import { useParams } from "react-router-dom";
import Board from "./Board/Board";
import "../css/Room.css";

function Room() {
  const { room } = useParams();
  const { user, setRoom } = useContext(SocketContext);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setRoom(room);
    }

    window.scrollTo({ top: 9999, behavior: "smooth" });

    return function cleanup() {
      mounted = false;
    };
  }, [room, setRoom]);

  return user.uid ? (
    <div className="Room">
      <Board />
    </div>
  ) : (
    "LOADING"
  );
}

export default Room;
