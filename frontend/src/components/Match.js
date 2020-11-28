import React from "react";
import { useHistory } from "react-router-dom";
import "../css/Match.css";

function Match({ match, order, user }) {
  const history = useHistory()
  const redirectToMatch = () => {
    history.push(`matches/${match.id}`)
  }

  return (
    <div className="Match" onClick={redirectToMatch}>
      <span className="Match-order">{order}.</span>
      <span className="Match-id">ID: {match.id}</span>
      <span classname="Match-date">{match.date}</span>
      <div className={`Match-winner ${match.winner_name === user ? "you" : ""}`}>
        <span className="Match-winner-name">Winner: {match.winner_name}</span>
        <span className="Match-winner-rating">{match.winner_rating} <span className="added">(+25)</span></span>
      </div>
      <div className={`Match-loser ${match.loser_name === user ? "you" : ""}`}>
        <span className="Match-loser-name">Loser: {match.loser_name}</span>
        <span className="Match-loser-rating">{match.loser_rating} <span className="removed">(-25)</span></span>
      </div>
    </div>
  );
}

export default Match;
