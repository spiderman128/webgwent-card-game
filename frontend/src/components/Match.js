import React from "react";
import "../css/Match.css";

function Match({ match }) {
  return (
    <div className="Match">
      <div className="Match-winner">
        Winner: {match.winner_name}
        {match.winner_rating} +25
      </div>
      <div className="Match-loser">
        Loser: {match.loser_name}
        {match.loser_rating} -25
      </div>
    </div>
  );
}

export default Match;
