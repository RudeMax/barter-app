const initState = {
  bartersError: "",
  isFetching: false,
  isFetched: false,
  barters: [],
};

const bartersReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_BARTERS_REQUEST":
      return {
        ...state,
        isFetching: true,
        bartersError: "",
      };
    case "FETCH_BARTERS_SUCCESS":
      console.log(action.payload.items);
      return {
        ...state,
        isFetched: true,
        isFetching: false,
        barters: action.payload.items,
      };
    case "FETCH_BARTERS_FAILURE":
      return {
        ...state,
        isFetching: false,
        bartersError: action.error,
      };
    default:
      return state;
  }
};

export default bartersReducer;
