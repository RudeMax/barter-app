import Axios from "axios";

const FETCH_LOGIN_REQUEST = "FETCH_LOGIN_REQUEST";
const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
const FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE";

const FETCH_BARTERS_REQUEST = "FETCH_BARTERS_REQUEST";
const FETCH_BARTERS_SUCCESS = "FETCH_BARTERS_SUCCESS";
const FETCH_BARTERS_FAILURE = "FETCH_BARTERS_FAILURE";

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const fetchLogin = (username, password) => async (dispatch) => {
  dispatch({ type: FETCH_LOGIN_REQUEST });

  try {
    const response = await Axios.post("http://localhost:4000/login", {
      username,
      password,
    });
    console.log("RESPONSE:", response.data);

    dispatch({ type: FETCH_LOGIN_SUCCESS, payload: response.data });
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
