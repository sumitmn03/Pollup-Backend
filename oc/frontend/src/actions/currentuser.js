import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_CURRENT_USER } from "./types";

// GET POSTS

export const getCurrentUser = () => (dispatch, getState) => {
  axios
    .get("api/currentuser", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
