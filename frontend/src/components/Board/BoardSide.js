import React from "react";
import "../../css/BoardSide.css";
import Player from "./Player";
import WeatherField from "./WeatherField";
import BoardField from "./BoardField";
import Hand from "./Hand";
import Discard from "./Discard";
import Deck from "./Deck";

function BoardSide({ player, PLAYER, sideInfo, isWaiting }) {
  // const { user, socket } = useContext(SocketContext);
  // const [isWaiting, setIsWaiting] = useState(false);
  // const [sideInfo, setSideInfo] = useState({
  //   info: {
  //     name: undefined,
  //     lives: 0,
  //     score: 0,
  //     hand: [],
  //     deck: [],
  //     discard: [],
  //     passing: false,
  //   },
  //   opponent: {
  //     name: undefined,
  //     lives: 0,
  //     score: 0,
  //     hand: 0,
  //     deck: 0,
  //     discard: [],
  //     passing: false,
  //     isWaiting: false,
  //     fields: {
  //       infantry: { cards: [], score: 0 },
  //       ranged: { cards: [], score: 0 },
  //       siege: { cards: [], score: 0 },
  //     },
  //   },
  //   infantry: { cards: [], score: 0 },
  //   ranged: { cards: [], score: 0 },
  //   siege: { cards: [], score: 0 },
  // });

  // let PLAYER = player.uid === user.uid ? "you" : "opponent";

  // useEffect(() => {
  //   socket.on("updateBoard", (data) => {
  //     setSideInfo(data);
  //     setIsWaiting(data.info.isWaiting);
  //   });
  // }, []);

  console.log(sideInfo);

  return (
    <div className={`BoardSide ${PLAYER} ${isWaiting ? "waiting" : ""}`}>
      <div className={`side-fields ${PLAYER}-side-fields`}>
        {PLAYER === "you" ? <WeatherField /> : <></>}
        <Player side={PLAYER} user={player} info={sideInfo} />
      </div>

      <div className={`fields ${PLAYER}-fields`}>
        <BoardField
          side={PLAYER}
          type="infantry"
          cards={sideInfo.fields.infantry}
          score={sideInfo.fields.infantry.score}
        />

        <BoardField
          side={PLAYER}
          type="ranged"
          cards={sideInfo.fields.ranged}
          score={sideInfo.fields.ranged.score}
        />

        <BoardField
          side={PLAYER}
          type="siege"
          cards={sideInfo.fields.siege}
          score={sideInfo.fields.siege.score}
        />

        {PLAYER === "you" ? <Hand player="you" cards={sideInfo.hand} /> : <></>}
      </div>
      <div className={`cards-fields ${PLAYER}-cards-fields`}>
        <Discard side={PLAYER} user={player} cards={sideInfo.discard} />
        <Deck side={PLAYER} user={player} cards={sideInfo.deck} />
      </div>
    </div>
  );
}

export default BoardSide;
