import Axios from "axios";

import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_BARTERS_REQUEST,
  FETCH_BARTERS_SUCCESS,
  FETCH_BARTERS_FAILURE,
  CREATE_BARTER_REQUEST,
  CREATE_BARTER_SUCCESS,
  CREATE_BARTER_FAILURE,
  UPDATE_BARTER_REQUEST,
  UPDATE_BARTER_SUCCESS,
  UPDATE_BARTER_FAILURE,
  DELETE_BARTER_REQUEST,
  DELETE_BARTER_SUCCESS,
  DELETE_BARTER_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "./actions-types";

export const fetchLogin = (username, password) => async (dispatch) => {
  dispatch({ type: FETCH_LOGIN_REQUEST });

  try {
    const response = await Axios.post("http://localhost:4000/login", {
      username,
      password,
    });

    dispatch({ type: FETCH_LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: FETCH_LOGIN_FAILURE, error: error.message });
  }
};

export const fetchBarters = () => async (dispatch) => {
  dispatch({ type: FETCH_BARTERS_REQUEST });

  try {
    const response = await Axios.get("http://localhost:4000/api/barter?");
    dispatch({ type: FETCH_BARTERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BARTERS_FAILURE, error: error.message });
  }
};

export const createBarter = (barter, learn, teach) => async (dispatch) => {
  dispatch({ type: CREATE_BARTER_REQUEST });
  const token = localStorage.getItem("token");
  try {
    const response = await Axios.post(
      "http://localhost:4000/api/barter",
      {
        barter,
        learn,
        teach,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: CREATE_BARTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_BARTER_FAILURE, error: error.message });
  }
};

export const updateBarter = (barter, learn, teach, id) => async (dispatch) => {
  dispatch({ type: UPDATE_BARTER_REQUEST });
  const token = localStorage.getItem("token");
  try {
    const response = await Axios.put(
      `http://localhost:4000/api/barter/${id}`,
      {
        barter,
        learn,
        teach,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: UPDATE_BARTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_BARTER_FAILURE, error: error.message });
  }
};

export const deleteBarter = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BARTER_REQUEST });
  const token = localStorage.getItem("token");
  try {
    const response = await Axios.delete(
      `http://localhost:4000/api/barter/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: DELETE_BARTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DELETE_BARTER_FAILURE, error: error.message });
  }
};

export const addComment = (id, comment) => async (dispatch) => {
  dispatch({ type: ADD_COMMENT_REQUEST });
  const token = localStorage.getItem("token");
  try {
    const response = await Axios.post(
      `http://localhost:4000/api/comment/barter/${id}`,
      {
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADD_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_COMMENT_FAILURE, error: error.message });
  }
};

export const deleteComment = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENT_REQUEST });
  const token = localStorage.getItem("token");
  try {
    const response = await Axios.delete(
      `http://localhost:4000/api/comment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DELETE_COMMENT_FAILURE, error: error.message });
  }
};
