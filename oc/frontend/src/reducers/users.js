import {
  GET_ALL_USERS,
  GET_SINGLE_USER,
  FOLLOWING,
  FOLLOW,
  UNFOLLOW
} from "../actions/types";

const initialState = {
  following: [],
  all_users: [],
  host_user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        all_users: [...action.payload]
      };

    case GET_SINGLE_USER:
      return {
        ...state,
        host_user: { ...action.payload }
      };

    case FOLLOWING:
      return {
        ...state,
        following: [...action.payload]
      };

    case FOLLOW:
      return {
        ...state,
        following: [...state.following, action.payload]
      };

    case UNFOLLOW:
      return {
        ...state,
        following: [
          ...state.following.slice(0, action.payload.following_index),
          ...state.following.slice(action.payload.following_index + 1)
        ]
      };

    default:
      return state;
  }
}
