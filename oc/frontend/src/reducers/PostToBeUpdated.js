import { POSTTOBEUPDATED } from "../actions/types";

const initialState = {
  post_to_be_updated: []
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case POSTTOBEUPDATED:
      return {
        ...state,
        post_to_be_updated: action.payload
      };
    default:
      return state;
  }
}
