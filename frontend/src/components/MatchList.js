import React, { useContext, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
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
  }, []);

  return (
    <Animated className="MatchList" animationIn="fadeInUp" isVisible={true}>
      <div class="MatchList-heading">
        <h1>Match History</h1>
      </div>
      <div class="MatchList-container">
        <div class="MatchList-list">
          {matches.map((match) => (
            <Match match={match} />
          ))}
        </div>
      </div>
    </Animated>
  );
}

export default MatchList;
