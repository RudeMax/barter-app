const initState = {
  loginError: "",
  isAuthenticating: false,
  isAuthenticated: false,
  currentUser: null,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_LOGIN_REQUEST":
      return {
        ...state,
        isAuthenticating: true,
        loginError: "",
      };
    case "FETCH_LOGIN_SUCCESS":
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        currentUser: action.payload,
      };
    case "FETCH_LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticating: false,
        loginError: action.error,
      };
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "LOGOUT_USER":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
