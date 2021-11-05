import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

function Registration() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameDirty, setNameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);

  const [nameError, setNameError] = useState("Name field can't be empty!");
  const [passwordError, setPasswordError] = useState(
    "Password field can't be empty!"
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    "Password field can't be empty!"
  );

  const [formValid, setFormValid] = useState(false);

  const [registerError, setRegisterError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (nameError || passwordError || confirmPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, passwordError, confirmPasswordError]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "confirmPassword":
        setConfirmPasswordDirty(true);
        break;
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameError("Name field can't be empty!");
    } else {
      setNameError("");
    }
  };

  const passwordHandler = (e) => {
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

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError("Passwords don't match! Please double check.");
      if (!e.target.value) {
        setConfirmPasswordError("Password field can't be empty!");
      }
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
      redirect: "follow",
    };

    setRegisterError("");

    fetch("http://localhost:4000/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code && result.code >= 400 && result.message) {
          throw new Error(result.message);
        }

        setCurrentUser(result);
      })
      .catch((error) => {
        setRegisterError(error.message);
      });

    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  if (currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {registerError && <p className="error">{registerError}</p>}
      <form
        onSubmit={handleSubmit}
        className="registaration-form input-form"
        action=""
      >
        <h2>Please register</h2>
        <label htmlFor="name" className="label">
          User Name:
        </label>
        <input
          onChange={(e) => nameHandler(e)}
          value={name}
          onBlur={(e) => blurHandler(e)}
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
          onChange={(e) => passwordHandler(e)}
          value={password}
          onBlur={(e) => blurHandler(e)}
          placeholder="Create at least a 6 character password..."
          name="password"
          className="reg-password-input reg-input"
          type="password"
        />

        {passwordDirty && passwordError && (
          <div className="input-empty">{passwordError}</div>
        )}
        <br />

        <label className="label" htmlFor="confirm-password">
          Confirm Password:
        </label>
        <input
          onChange={(e) => confirmPasswordHandler(e)}
          value={confirmPassword}
          onBlur={(e) => blurHandler(e)}
          placeholder="Please confirm your password..."
          name="confirmPassword"
          className="reg-confirm-password-input reg-input"
          type="password"
        />

        {confirmPasswordDirty && confirmPasswordError && (
          <div className="input-empty">{confirmPasswordError}</div>
        )}
        <br />

        <button disabled={!formValid} className="button register-button">
          REGISTER
        </button>
      </form>
    </div>
  );
}

export default Registration;
