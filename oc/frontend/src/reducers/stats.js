import { STATSPOST } from "../actions/types";

const initialState = {
  post_stats: {}
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case STATSPOST:
      return {
        ...state,
        post_stats: action.payload.post
      };
    default:
      return state;
  }
}
