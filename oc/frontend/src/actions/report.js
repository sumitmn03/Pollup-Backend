import axios from "axios";
import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { POSTREPORTED } from "./types";

// REPORT POST

export const report = (
  post_type,
  post_id,
  report,
  reported_user,
  post_index
) => (dispatch, getState) => {
  axios
    .post(
      "api/report/",
      JSON.stringify({
        post_type,
        post_id,
        report,
        reported_user
      }),
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: POSTREPORTED,
        payload: {
          post_index_for_handling_report: post_index
        }
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
