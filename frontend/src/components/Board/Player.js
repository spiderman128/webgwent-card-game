import React from "react";
import icon from "../../img/player.png";
import handIcon from "../../img/hand-icon.png";
import rubyActive from "../../img/ruby-active.png";
import rubyDisabled from "../../img/ruby-disabled.png";
import "../../css/Player.css";

function Player({ side, user, info }) {
  console.log(user);
  const lives = [];

  for (let i = 0; i < info.lives; i++) {
    lives.push(
      <img className="Player-stats-lives-ruby-active" src={rubyActive}></img>
    );
  }

  for (let i = 0; i < 2 - info.lives; i++) {
    lives.push(
      <img
        key={i}
        className="Player-stats-lives-ruby-disabled"
        src={rubyDisabled}
      ></img>
    );
  }

  return (
    <div className={`Player Player-${side}`}>
      <img className="Player-icon" src={icon}></img>
      <div className="Player-info-section">
        <div className="Player-info">
          <span className="Player-info-username">{user.username}</span>
          <span className="Player-info-faction">{info.faction}</span>
        </div>
        <div className="Player-stats">
          <span className="Player-stats-hand">
            <img className="Player-hand-icon" src={handIcon}></img>
            {Array.isArray(info.hand) ? info.hand.length : info.hand}
          </span>
          <div className="Player-stats-lives">{lives}</div>
        </div>
        <div className="Player-score">
          <span>{info.score}</span>
        </div>
      </div>
    </div>
  );
}

export default Player;
