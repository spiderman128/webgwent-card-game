import React, { useContext, useState, useEffect } from "react";
import "../../css/Board.css";
import SocketContext from "../../SocketContext";
import BoardSide from "./BoardSide";

function Board() {
  const { user, socket } = useContext(SocketContext);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [sideInfo, setSideInfo] = useState({
    info: {
      username: undefined,
      lives: 0,
      score: 0,
      hand: [],
      deck: [],
      discard: [],
      passing: false,
      fields: {
        infantry: { cards: [], score: 0 },
        ranged: { cards: [], score: 0 },
        siege: { cards: [], score: 0 },
      },
    },
    opponent: {
      username: undefined,
      lives: 0,
      score: 0,
      hand: 0,
      deck: 0,
      discard: [],
      passing: false,
      isWaiting: false,
      fields: {
        infantry: { cards: [], score: 0 },
        ranged: { cards: [], score: 0 },
        siege: { cards: [], score: 0 },
      },
    },
  });

  console.log(sideInfo);

  useEffect(() => {
    // socket.on("playerLeft", (message) => {
    //   setOpponentLeft(true);
    //   console.log(message);
    // });
    socket.on("updateBoard", (data) => {
      console.log("REFRESHING");
      setSideInfo(data);
      setIsWaiting(data.info.isWaiting);
    });
    socket.on("passed", (message) => {
      console.log("I PASSED!");
      setIsWaiting(message.passed);
    });
    socket.on("gameover", (message) => {
      console.log("WE HAVE A WINNER");
      console.log(message.winner);
    });
    socket.emit("refresh");
  }, []);

  return (
    <div className="Board">
      {opponentLeft ? (
        <div id="open-modal" className="modal-window">
          <div>
            <h1>Warning</h1>
            <div>
              You opponent has disconnected. You will be redirected to the main
              page in a couple of seconds.
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <BoardSide
        player={user.opponent}
        PLAYER="opponent"
        sideInfo={sideInfo.opponent}
        isWaiting={sideInfo.opponent.isWaiting}
      />
      <BoardSide
        player={user}
        PLAYER="you"
        sideInfo={sideInfo.info}
        isWaiting={isWaiting}
      />
    </div>
  );
}

export default Board;
