import axios from "axios";
import { createMessage } from "./messages";
import { returnErrors } from "./messages";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL
} from "./types";

// SEND OTP TO NEW USER VERIFICATION
export const send_otp = email => dispatch => {
  // HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request Body
  const body = JSON.stringify({
    email
  });
  axios
    .post("api/requestotp", body, config)
    .then(res => {
      if (res.data["error"]) {
        dispatch(
          createMessage({
            email_exists: "This email already exists !!!"
          })
        );
      }
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/currentuser", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// LOGIN USER
export const login = (email, password) => dispatch => {
  // HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body

  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch(createMessage({ userLogin: "Logged in" }));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ userLogin: "Logged out" }));

      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// REGISTER USER
export const register = ({
  first_name,
  email,
  date_of_birth,
  password,
  otp
}) => dispatch => {
  // check whether the otp is correct or not

  // HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body

  const body = JSON.stringify({
    first_name,
    email,
    date_of_birth,
    password,
    otp
  });

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      if (res.data["error"]) {
        dispatch(createMessage({ error: res.data["error"] }));
        dispatch({
          type: REGISTER_FAIL
        });
      } else {
        dispatch(createMessage({ userRegistered: "Registered" }));
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;

  // HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["authorization"] = `Token ${token}`;
  }
  return config;
};
