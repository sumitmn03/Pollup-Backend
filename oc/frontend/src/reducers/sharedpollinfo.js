import { SHAREDPOLL } from "../actions/types";

const initialState = {
  shared_poll_data: {}
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case SHAREDPOLL:
      return {
        ...state,
        shared_poll_data: action.payload
      };

    default:
      return state;
  }
}
