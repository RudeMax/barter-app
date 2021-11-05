import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_USER } from "../redux/auth/actions";

function Header() {
  const history = useHistory();
  const currentUser = useSelector((state) => state.login.currentUser);

  function handleClick(link) {
    history.push(link);
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: LOGOUT_USER,
      payload: currentUser,
    });
  };
  return (
    <div>
      {!currentUser && (
        <div>
          <button
            className="button"
            onClick={() => handleClick("/registration")}
          >
            REGISTRATION
          </button>
          <button className="button" onClick={() => handleClick("/login")}>
            LOGIN
          </button>
        </div>
      )}
      {currentUser && (
        <button className="button" onClick={handleLogout}>
          LOGOUT
        </button>
      )}
    </div>
  );
}

export default Header;
