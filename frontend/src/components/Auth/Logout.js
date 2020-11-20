import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoggedInContext } from "../../LoggedInContext";
import "../../css/Logout.css";

function Logout() {
  const { logout } = useContext(LoggedInContext);
  const history = useHistory();

  const confirmLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div className="Logout">
      <div className="Logout-text">
        <h2>Please confirm your action</h2>
      </div>
      <button onClick={confirmLogout}>Logout</button>
    </div>
  );
}

export default Logout;
