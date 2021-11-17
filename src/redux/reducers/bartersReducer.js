import {
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
} from "../auth/actions-types";

const initState = {
  bartersError: "",
  isFetching: false,
  isFetched: false,
  barters: [],
  isBarterCreating: false,
  createBarterError: "",
  updateBarterError: "",
  isBarterUpdating: false,
  deleteBarterError: "",
  isBarterDeleting: false,
  addCommentError: "",
  isCommentAdding: false,
  deleteCommentError: "",
  isCommentDeleting: false,
};

const bartersReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_BARTERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        bartersError: "",
      };
    case FETCH_BARTERS_SUCCESS:
      console.log(action.payload.items);
      return {
        ...state,
        isFetched: true,
        isFetching: false,
        barters: action.payload.items,
      };
    case FETCH_BARTERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        bartersError: action.error,
      };
    case CREATE_BARTER_REQUEST:
      return {
        ...state,
        isBarterCreating: true,
        createBarterError: "",
      };

    case CREATE_BARTER_SUCCESS:
      console.log("PAYLOAD:", action.payload);
      return {
        ...state,
        isBarterCreating: false,
        barters: [action.payload, ...state.barters],
      };

    case CREATE_BARTER_FAILURE:
      return {
        ...state,
        isBarterCreating: false,
        createBarterError: action.error,
      };

    case UPDATE_BARTER_REQUEST:
      return {
        ...state,
        isBarterUpdating: true,
        updateBarterError: "",
      };

    case UPDATE_BARTER_SUCCESS:
      return {
        ...state,
        isBarterUpdating: false,
        barters: state.barters.map((barter) =>
          barter.id === action.payload.id ? action.payload : barter
        ),
      };

    case UPDATE_BARTER_FAILURE:
      return {
        ...state,
        isBarterUpdating: false,
        updateBarterError: action.error,
      };

    case DELETE_BARTER_REQUEST:
      return {
        ...state,
        isBarterDeleting: true,
        deleteBarterError: "",
      };

    case DELETE_BARTER_SUCCESS:
      return {
        ...state,
        isBarterDeleting: false,
        barters: state.barters.filter(
          (barter) => barter.id !== action.payload.id
        ),
      };

    case DELETE_BARTER_FAILURE:
      return {
        ...state,
        isBarterDeleting: false,
        deleteBarterError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isCommentAdding: true,
        addCommentError: "",
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentAdding: false,
        barters: state.barters.map((barter) =>
          barter.id === action.payload.barter.id
            ? { ...barter, comments: [action.payload, ...barter.comments] }
            : barter
        ),
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isBarterAdding: false,
        addBarterError: action.error,
      };

    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        isCommentDeleting: true,
        deleteCommentError: "",
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentDeleting: false,
        barters: state.barters.map((barter) => ({
          ...barter,
          comments: barter.comments.filter(
            (comment) => comment.id !== action.payload.id
          ),
        })),
      };

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        isBarterDeleting: false,
        deleteBarterError: action.error,
      };

    default:
      return state;
  }
};

export default bartersReducer;

// barter.comments.push(action.payload.filter(barter))

// return {
//     ...state,
//     isCommentDeleting: false,
//     barters: state.barters.map((barter) =>
//       barter.id === action.payload.barter.id
//         ? {
//             ...barter,
//             comments: barter.comments.filter(
//               (comment) => comment.id !== action.payload.id
//             ),
//           }
//         : barter
//     ),
//   };
