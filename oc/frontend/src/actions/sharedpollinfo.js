import { SHAREDPOLL } from "./types";

// GET POSTS

export const share_poll_info = shared_poll_data => dispatch => {
  dispatch({
    type: SHAREDPOLL,
    payload: shared_poll_data
  });
};
