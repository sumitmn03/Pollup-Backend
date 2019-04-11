import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// UPDATE PASSWORD

export const updatepassword = (old_password, new_password) => (
  dispatch,
  getState
) => {
  let body = JSON.stringify({ old_password, new_password });
  axios.post("/api/updatepassword", body, tokenConfig(getState)).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  });
};
