import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Animated } from "react-animated-css";
import SocketContext from "../SocketContext";
import NavBar from "./NavBar";
import "../css/Queue.css";
import q1 from "../img/queue1.jpg";
import q2 from "../img/queue2.jpg";
import q3 from "../img/queue3.jpg";
import q4 from "../img/queue4.jpg";

function Queue() {
  const { user, socket, room, setUser } = useContext(SocketContext);
  const [inQueue, setInQueue] = useState(user.inQueue);
  const [currentBg, setCurrentBg] = useState({ background: "" });
  const history = useHistory();

  useEffect(() => {
    const bg = [q1, q2, q3, q4];
    const bgImage = bg[Math.floor(Math.random() * bg.length)];
    setCurrentBg({ background: `url(${bgImage})` });

    socket.on("update", (resp) => {
      setUser(resp);
    });

    socket.on("matchmaking:found", (roomId) => {
      console.log("WE FOUND YOU A ROOM!");
      history.push(`/room/${roomId}`);
    });
  }, [history, setUser, socket]);

  const queue = () => {
    socket.emit("request:matchmaking");
    setInQueue(true);
  };

  const cancelQueue = () => {
    socket.emit("request:cancelMatchmaking");
    setInQueue(false);
  };

  const reconnect = () => {
    socket.emit("rejoin");
    history.push(`/room/${user.room}`);
  };

  const abandon = () => {
    socket.emit("abandon");
  };

  return (
    <div className="Queue" style={currentBg}>
      <NavBar />
      <Animated
        className="Queue-container"
        animationIn="fadeInUp"
        isVisible={true}
      >
        {room ? (
          <div className="Queue-inGame">
            <p className="Queue-inGame-text">
              You are in a game in progress (room id: {user.room})
            </p>
            <div className="Queue-inGame-buttons">
              <button
                className="Queue-inGame-button reconnect"
                onClick={reconnect}
              >
                Reconnect
              </button>
              <button className="Queue-inGame-button abandon" onClick={abandon}>
                Abandon
              </button>
            </div>
          </div>
        ) : inQueue ? (
          <div className="Queue-searching">
            <div className="Queue-loading">
              <div></div>
              <div></div>
            </div>

            <p>Looking for an opponent</p>

            <button
              className="Queue-button Queue-button-cancel"
              onClick={cancelQueue}
            >
              <p className="Queue-button-text-main">CANCEL</p>
            </button>
          </div>
        ) : (
          <button className="Queue-button Queue-button-start" onClick={queue}>
            <p className="Queue-button-text-main">SEARCH</p>
          </button>
        )}
      </Animated>
    </div>
  );
}

export default Queue;
