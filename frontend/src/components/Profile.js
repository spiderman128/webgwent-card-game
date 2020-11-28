import React, { useContext } from "react";
import "../css/Profile.css";
import { Animated } from "react-animated-css";
import NavBar from "./NavBar";
import { LoggedInContext } from "../LoggedInContext";
import profile from "../img/profile.jpg";
import MatchList from "./MatchList";

function Profile() {
  const { user } = useContext(LoggedInContext);

  return user ? (
    <Animated className="Profile" animationIn="fadeInUp" isVisible={true}>
      <NavBar />
      <div className="Profile-container">
        <div className="profile-card js-profile-card">
          <div className="profile-card__img">
            <img src={profile} alt="profile card" />
          </div>

          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">{user.username}</div>

            <div className="profile-card-loc">
              <div className="profile-card-inf">
                <div className="profile-card-inf__item">
                  <div className="profile-card-inf__title">{user.rating}</div>
                  <div className="profile-card-inf__txt">Rating</div>
                </div>

                <div className="profile-card-inf__item">
                  <div className="profile-card-inf__title">{user.wins}</div>
                  <div className="profile-card-inf__txt">Wins</div>
                </div>

                <div className="profile-card-inf__item">
                  <div className="profile-card-inf__title">{user.losses}</div>
                  <div className="profile-card-inf__txt">Losses</div>
                </div>

                <div className="profile-card-inf__item">
                  <div className="profile-card-inf__title">{user.ratio}</div>
                  <div className="profile-card-inf__txt">Ratio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <MatchList />
      </div>
    </Animated>
  ) : (
    <></>
  );
}

export default Profile;
