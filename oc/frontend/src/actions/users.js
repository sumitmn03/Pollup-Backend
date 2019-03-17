import axios from "axios";
import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_ALL_USERS,
  GET_SINGLE_USER,
  FOLLOWING,
  FOLLOW,
  UNFOLLOW
} from "./types";

// GET ALL USERS

export const getAllUsers = () => (dispatch, getState) => {
  axios
    .get("api/getusers", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// GET A SINGLE USER

export const getSingleUser = user_id => (dispatch, getState) => {
  axios
    .get(`api/getusers/${user_id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SINGLE_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all the following users

export const following = () => (dispatch, getState) => {
  axios
    .get("api/following", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: FOLLOWING,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// follow

export const follow = following_user_id => (dispatch, getState) => {
  axios
    .post(
      `api/follow/`,
      JSON.stringify({ following: following_user_id }),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: FOLLOW,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// unfollow

export const unfollow = (following_id, following_index) => (
  dispatch,
  getState
) => {
  axios
    .delete(`api/follow/${following_id}`, tokenConfig(getState))
    .then(
      dispatch({
        type: UNFOLLOW,
        payload: { following_index }
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
