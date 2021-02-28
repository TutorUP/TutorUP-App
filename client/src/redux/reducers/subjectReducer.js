import {
  GET_SUBJECTS,
  SUBJECTS_LOADING,
  DELETE_SUBJECTS,
} from "../actions/types";

const initialState = {
  subjects: null,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        loading: false,
      };
    case DELETE_SUBJECTS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
