import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBarter } from "../redux/auth/actions";

function AddBarter() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [learn, setLearn] = useState("");
  const [teach, setTeach] = useState("");
  const [description, setDescription] = useState("");

  const [learnDirty, setLearnDirty] = useState(false);
  const [teachDirty, setTeachDirty] = useState(false);
  const [descriptionDirty, setDescriptionDirty] = useState(false);

  const [learnError, setLearnError] = useState("This field can't be empty");
  const [teachError, setTeachError] = useState("This field can't be empty");
  const [descriptionError, setDescriptionError] = useState(
    "This field can't be empty"
  );

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (learnError || teachError || descriptionError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [learnError, teachError, descriptionError]);

  const learnHandler = (e) => {
    setLearn(e.target.value);
    if (!e.target.value) {
      setLearnError("Learn field can't be empty!");
    } else {
      setLearnError("");
    }
  };

  const teachHandler = (e) => {
    setTeach(e.target.value);
    if (!e.target.value) {
      setTeachError("Teach field can't be empty!");
    } else {
      setTeachError("");
    }
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
    if (!e.target.value) {
      setDescriptionError("Description field can't be empty!");
    } else {
      setDescriptionError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "learn":
        setLearnDirty(true);
        break;
      case "teach":
        setTeachDirty(true);
        break;
      case "description":
        setDescriptionDirty(true);
        break;
      default:
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createBarter(description, learn, teach));

    setLearn("");
    setTeach("");
    setDescription("");
    history.push("/barterList");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="add-barter-form input-form"
        action=""
      >
        <h2>Please create your barter</h2>
        <label htmlFor="learn" className="label">
          I want to learn:
        </label>
        <input
          onChange={(e) => learnHandler(e)}
          value={learn}
          onBlur={(e) => blurHandler(e)}
          name="learn"
          className="barter-learn-input reg-input"
          type="text"
        />

        {learnDirty && learnError && (
          <div className="input-empty">{learnError}</div>
        )}
        <br />

        <label className="label" htmlFor="teach">
          I can teach:
        </label>
        <input
          onChange={(e) => teachHandler(e)}
          value={teach}
          onBlur={(e) => blurHandler(e)}
          name="teach"
          className="batrer-teach-input reg-input"
          type="text"
        />

        {teachDirty && teachError && (
          <div className="input-empty">{teachError}</div>
        )}
        <br />

        <label className="label" htmlFor="description">
          Write a description:
        </label>
        <input
          onChange={(e) => descriptionHandler(e)}
          value={description}
          onBlur={(e) => blurHandler(e)}
          name="description"
          className="barter-description-input reg-input"
          type="text"
        />

        {descriptionDirty && descriptionError && (
          <div className="input-empty">{descriptionError}</div>
        )}
        <br />

        <button disabled={!formValid} className="button barter-submit-button">
          SUBMIT BARTER
        </button>
      </form>
    </div>
  );
}

export default AddBarter;
