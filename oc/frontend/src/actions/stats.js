import { STATSPOST } from "./types";

// GET POSTS

export const set_stat_post = post => dispatch => {
  dispatch({
    type: STATSPOST,
    payload: {
      post
    }
  });
};
