import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchLogin } from "../redux/auth/actions";
import { Redirect } from "react-router";

function Login({
  loginError,
  isAuthenticating,
  isAuthenticated,
  currentUser,
  onSubmitLogin,
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [nameDirty, setNameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nameError, setNameError] = useState("Name field can't be empty!");
  const [passwordError, setPasswordError] = useState(
    "Password field can't be empty!"
  );

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, passwordError]);

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameError("Name field can't be empty!");
    } else {
      setNameError("");
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError(
        "Password is too short! Should consist of at least 6 characters."
      );
      if (!e.target.value) {
        setPasswordError("Password field can't be empty!");
      }
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitLogin(name, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/barterList" />;
  }

  return (
    <div>
      {isAuthenticating && <p>Submiting...</p>}
      {loginError && <p className="error">{loginError}</p>}
      <form
        onSubmit={handleSubmit}
        className="registaration-form input-form"
        action=""
      >
        <h2>Please login</h2>
        <label htmlFor="name" className="label">
          User Name:
        </label>
        <input
          onChange={(e) => handleName(e)}
          value={name}
          onBlur={(e) => handleBlur(e)}
          placeholder="Enter your name..."
          name="name"
          className="reg-user-name-input reg-input"
          type="text"
        />

        {nameDirty && nameError && (
          <div className="input-empty">{nameError}</div>
        )}
        <br />

        <label className="label" htmlFor="password">
          Password:
        </label>
        <input
          onChange={(e) => handlePassword(e)}
          value={password}
          onBlur={(e) => handleBlur(e)}
          placeholder="Enter your password..."
          name="password"
          className="reg-password-input reg-input"
          type="password"
        />

        {passwordDirty && passwordError && (
          <div className="input-empty">{passwordError}</div>
        )}
        <br />

        <button disabled={!formValid} className="button register-button">
          LOGIN
        </button>
      </form>
      {currentUser && <p>{currentUser.username}</p>}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { loginError, isAuthenticating, isAuthenticated, currentUser } =
    state.login;
  return {
    loginError,
    isAuthenticating,
    isAuthenticated,
    currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitLogin: (username, password) =>
      dispatch(fetchLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
