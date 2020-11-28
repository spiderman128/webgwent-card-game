import React, { useContext, useState, useEffect, useRef } from "react";
import "../../css/Board.css";
import SocketContext from "../../SocketContext";
import BoardSide from "./BoardSide";
import Overlay from "./Overlay";
import MatchDetails from "./MatchDetails";

function Board() {
  const DEFAULT_STATE = {
    info: {
      username: undefined,
      lives: 0,
      score: 0,
      hand: [],
      deck: [],
      discard: [],
      passing: false,
      ready: false,
      inGame: false,
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
  };

  const { user, socket, setRoom } = useContext(SocketContext);
  // const [opponentLeft, setOpponentLeft] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [sideInfo, setSideInfo] = useState(DEFAULT_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [matchDetails, setMatchDetails] = useState({});

  const action = useRef("");

  useEffect(() => {
    let mounted = true;
    // socket.on("playerLeft", (message) => {
    //   setOpponentLeft(true);
    //   console.log(message);
    // });
    socket.on("updateBoard", (data) => {
      if (mounted) {
        setSideInfo(data);
        setIsWaiting(data.info.isWaiting);
      }
    });
    socket.on("passed", (message) => {
      if (mounted) {
        setIsWaiting(message.passed);
      }
    });
    socket.on("gameover", (message) => {
      action.current = "gameOver";
      setMatchDetails(message.matchInfo);
      setCurrentPlayer(message.winner);
      setRoom(null);
      socket.emit("update");
    });

    socket.on("firstPlayer", (message) => {
      setCurrentPlayer(message.firstPlayer);
      action.current = "firstPlayer";
    });

    socket.on("currentTurn", (message) => {
      setCurrentPlayer(message.currentTurn);
      action.current = "currentTurn";
    });

    socket.emit("refresh");

    return function cleanup() {
      mounted = false;
    };
  }, [socket, setRoom]);

  return (
    <div className="Board">
      {action.current === "gameOver" ? (
        <MatchDetails match={matchDetails} />
      ) : (
        <></>
      )}
      {currentPlayer ? (
        <Overlay
          key={Math.random()}
          action={action.current}
          currPlayer={currentPlayer}
        />
      ) : (
        <></>
      )}

      {/* This modal will be used when the user disconnection functionality will be implemented */}

      {/* {opponentLeft ? (
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
      )} */}

      {/*  */}

      <BoardSide
        player={user.opponent}
        PLAYER="opponent"
        sideInfo={sideInfo.opponent}
        isWaiting={sideInfo.opponent.isWaiting}
        currentPlayer={currentPlayer}
      />
      <BoardSide
        player={user}
        PLAYER="you"
        sideInfo={sideInfo.info}
        isWaiting={isWaiting}
        currentPlayer={currentPlayer}
      />
    </div>
  );
}

export default Board;
