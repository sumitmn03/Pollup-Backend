import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_CURRENT_USER } from "./types";

// GET CURRENT USER

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

// update current user profile

export const udpatecurrentuser = ({
  first_name,
  middle_name,
  last_name,
  date_of_birth,
  contact_no,
  current_city,
  hometown,
  occupation
}) => (dispatch, getState) => {
  let body1 = JSON.stringify({
      first_name,
      date_of_birth
    }),
    body2 = JSON.stringify({
      middle_name: middle_name == "" ? null : middle_name,
      last_name: last_name == "" ? null : last_name,
      contact_no: contact_no == "" ? null : contact_no,
      current_city: current_city == "" ? null : current_city,
      hometown: hometown == "" ? null : hometown,
      occupation: occupation == "" ? null : occupation
    });
  axios
    .post("api/editusermainpro", body1, tokenConfig(getState))
    .then(
      axios
        .post("api/editusersecpro", body2, tokenConfig(getState))
        .then(dispatch(getCurrentUser()))
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
