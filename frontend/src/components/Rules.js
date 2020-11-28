import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "../css/Rules.css";

function Rules() {
  return (
    <ScrollAnimation
      className="Rules"
      offset={0}
      animateIn="fadeIn"
      durationIn={1}
    >
      <h1 className="Rules-title">Rules</h1>
      <div className="Rules-inner">
        <a
          className="Rules-link"
          href="https://gwent.fandom.com/wiki/GWENT:_The_Witcher_Card_Game"
        >
          Gwent
        </a>{" "}
        game is about the clash of two armies locked in mortal struggle on a
        battlefield where the players are the leaders and the cards their
        forces. With four different factions offering unique combat styles and
        endless paths to victory, Gwent is every adventurer's first choice when
        it comes to one-on-one card-based dueling.
      </div>

      <div className="Rules-description">
        <p>
          In the actual game, there are 4 decks to choose from,{" "}
          <b>however the current version provides only one (Northern).</b> There
          are also neutral cards that, while not a deck onto itself, can be used
          with any of the main decks to boost their abilities.{" "}
        </p>
      </div>

      <div className="Rules-detailed">
        <ul>
          <li>
            To begin a match, the game selects the starting player with a coin
            toss.
          </li>
          <li>Each player receives 10 random cards pulled from their decks.</li>
          <li>
            Players place a Unit Card on the Gwent board in the dedicated combat
            row. Each player may play one card per turn unless a special ability
            enables them to do otherwise. Players may also utilize Weather Cards
            from the Neutral Deck.{" "}
            <b>(Abilities are not implemented in the current version)</b>
          </li>
          <li>
            Each unit Card has Strength points that are added for each player's
            total. A player will win a round of Gwent when the player has more
            points than the other and both players no longer have cards to play
            or the other player passes their turn.
          </li>
          <li>
            Matches are set with 2 wins out of 3 rounds. This is represented by
            the Round Points, or red gems, next to each player's name. Losing a
            round loses you one of the points, if you lose both you lose the
            match. A draw makes both players lose a point.
          </li>
        </ul>
      </div>
    </ScrollAnimation>
  );
}

export default Rules;
