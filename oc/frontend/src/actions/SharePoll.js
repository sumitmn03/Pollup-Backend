import axios from "axios";
import { tokenConfig } from "./auth";

import { AddSharePoll } from "./types";

// GET POSTS

export const share_poll = (shared_by, caption, shared_post) => (
  dispatch,
  getState
) => {
  axios
    .post(
      "api/sharedpoll/",
      JSON.stringify({ shared_by, caption, shared_post }),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: AddSharePoll,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
