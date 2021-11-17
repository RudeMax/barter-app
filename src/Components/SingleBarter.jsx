import React, { useEffect, useState } from "react";
import {
  updateBarter,
  deleteBarter,
  deleteComment,
  addComment,
} from "../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function SingleBarter({ barter }) {
  const dispatch = useDispatch();

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

  const [formValid, setFormValid] = useState(true);

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

  const [isEditing, setIsEditing] = useState(false);
  const [currentBarter, setCurrentBarter] = useState("");

  const user = useSelector((state) => state.login.currentUser);

  const handleEdit = (barter, learn, teach, id) => {
    setIsEditing(true);
    setCurrentBarter(id);
    setDescription(barter);
    setLearn(learn);
    setTeach(teach);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateBarter(description, learn, teach, currentBarter));
    setIsEditing(false);

    setLearn("");
    setTeach("");
    setDescription("");
  };

  const [newComment, setNewComment] = useState("");

  const handleNewCommentChange = (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e, id) => {
    e.preventDefault();
    dispatch(addComment(id, newComment));
    setNewComment("");
  };
  return (
    <div className="barter" key={barter.id}>
      {isEditing && currentBarter === barter.id ? (
        <div>
          <form className="edit-barter-form" action="">
            <div className="edit-head">
              <h2>Please edit your barter</h2>
            </div>
            <label htmlFor="learn" className="label">
              I want to learn:
            </label>
            <input
              onChange={(e) => learnHandler(e)}
              defaultValue={barter.learn}
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
              defaultValue={barter.teach}
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
              Description:
            </label>
            <input
              onChange={(e) => descriptionHandler(e)}
              defaultValue={barter.barter}
              onBlur={(e) => blurHandler(e)}
              name="description"
              className="barter-description-input reg-input"
              type="text"
            />

            {descriptionDirty && descriptionError && (
              <div className="input-empty">{descriptionError}</div>
            )}
            <br />

            <button
              onClick={handleUpdate}
              disabled={!formValid}
              className="button barter-submit-button"
            >
              SAVE CHANGES
            </button>
            <button
              onClick={handleCancel}
              className="button barter-submit-button"
            >
              CANCEL
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="barter-description">
            <div>
              <h2>{barter.barter}</h2>
              <p>By: {barter.author.username}</p>
            </div>
          </div>
          <div className="barter-offer">
            <div className="barter-learn">
              <h3>I want to learn:</h3>
              <h1>{barter.learn}</h1>
            </div>
            <div className="barter-teach">
              <h3>I can teach:</h3>
              <h1>{barter.teach}</h1>
            </div>
            <div>
              {barter.author.username === user.username && (
                <div>
                  <button
                    key={barter.id}
                    className="button"
                    onClick={() =>
                      handleEdit(
                        barter.barter,
                        barter.learn,
                        barter.teach,
                        barter.id
                      )
                    }
                  >
                    EDIT
                  </button>
                  <br />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteBarter(barter.id));
                    }}
                    className="button"
                  >
                    DELETE
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="barter-comments">
            <h3>Add your comment:</h3>
            <form className="add-comment">
              <textarea
                value={newComment}
                name="commentInput"
                id=""
                onChange={handleNewCommentChange}
              ></textarea>
              <button
                onClick={(e) => handleCommentSubmit(e, barter.id)}
                className="button"
              >
                Comment
              </button>
            </form>
            <h3>Comments:</h3>
            {barter.comments ? (
              <div className="comments">
                {barter.comments.map((comment) => (
                  <div key={comment.id} className="comments-list">
                    <div>
                      <p className="date-created">
                        {moment(comment.created).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </p>
                      <p className="comment-author">
                        {comment.author.username}:
                      </p>
                      <h2>{comment.comment}</h2>
                    </div>
                    {user.username === comment.author.username && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteComment(comment.id));
                        }}
                        className="button"
                      >
                        DELETE COMMENT
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>Your comment will be the first...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleBarter;
