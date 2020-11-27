import React, { useContext, useRef } from "react";
import SocketContext from "../../SocketContext";
import { useHistory } from 'react-router-dom'
import "../../css/MatchDetails.css"
import defeat from "../../img/defeat.jpg"
import victory from "../../img/victory.jpg"

function MatchDetails({ match }) {
    const { user } = useContext(SocketContext)
    const won = useRef(user.username === match.winner.username ? true : false)
    const history = useHistory()

    const returnToLobby = () => {
        history.push("/queue")
    }

  return (
    <div className="MatchDetails">
        <div className="MatchDetails-container">
            <button className="MatchDetails-button btn" onClick={returnToLobby}>Return to Lobby</button>

            <div className="MatchDetails-details-container">
                <img src={won.current ? victory : defeat} />
                <div className="MatchDetails-details-text">
                    <div className="MatchDetails-title">
                        <h2 className={`title ${won.current ? `win` : `lose`}`}>{won.current ? "Victory" : "Defeat"}</h2>
                        <div className="date"><span>{match.date}</span></div>
                    </div>
                    <div className="MatchDetails-expanded">
                        <div className="MatchDetails-expanded-player expanded-winner">
                            <h3>{match.winner.username}</h3>
                            <span>{match.winner.rating} <span className="added">(+25)</span></span>
                            <span>{match.winner.faction}</span>
                            <span>Lives Remainig: {2 - match.winner.lives}</span> 
                            <span>Round Score: {match.winner.score}</span>      
                        </div>
                        <div className="MatchDetails-expanded-player expanded-loser">
                            <h3>{match.loser.username}</h3>
                            <span>{match.loser.rating} <span className="removed">(-25)</span></span>
                            <span>{match.loser.faction}</span>
                            <span>Lives Remainig: {2 - match.loser.lives}</span> 
                            <span>Round Score: {match.loser.score}</span>                       
                        </div>
                    </div>
                </div>
                </div>
        </div>
    </div>)
}

export default MatchDetails;
