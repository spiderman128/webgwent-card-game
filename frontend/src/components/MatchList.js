import React, { useContext, useEffect, useState } from "react";
import Api from "../Api";
import Match from "./Match";
import "../css/MatchList.css";
import { LoggedInContext } from "../LoggedInContext";

function MatchList() {
  const { user } = useContext(LoggedInContext);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await Api.getMatches(user.username);
      setMatches(res);
    };

    fetchMatches();
  }, [user]);

  return (
    <div className="MatchList">
      <div className="MatchList-heading">
        <h1>Match History</h1>
      </div>
      <div className="MatchList-container">
        <div className="MatchList-list">
          {matches.map((match, idx) => (
            <Match
              key={match.id}
              match={match}
              order={idx + 1}
              user={user.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchList;
