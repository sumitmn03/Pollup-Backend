import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// UPDATE EMAIL

// this action is used to send otp to the new email and store it in database

export const updateemail = (password, new_email) => (dispatch, getState) => {
  let body = JSON.stringify({ password, email: new_email });
  axios.post("/api/updateemail", body, tokenConfig(getState)).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  });
};

// this action is used to check whether the otp entered by the user matches the one in the database or not

export const checkotptoupdateemail = (email, otp) => (dispatch, getState) => {
  let body = JSON.stringify({ email, otp });
  axios
    .post("/api/checkemailupdateotp", body, tokenConfig(getState))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
