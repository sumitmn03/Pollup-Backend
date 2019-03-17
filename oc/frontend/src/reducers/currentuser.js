import { GET_CURRENT_USER } from "../actions/types";

const initialState = {
  current_user: {}
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        current_user: { ...action.payload }
      };

    default:
      return state;
  }
}
