import axios from "axios";
import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_NOTIFICATIONS, NOTIFY } from "./types";

// GET NOTIFICATIONS

export const get_notifications = () => (dispatch, getState) => {
  axios
    .get("api/mynotification", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: {
          notifications: res.data
        }
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// NOTIFY

export const notify = (
  notification_id,
  notification_for,
  owner_user,
  current_user,
  type_id,
  count,
  previous_count
) => (dispatch, getState) => {
  // notify for post votes
  if (notification_for == 1) {
    if (count == 1 && previous_count == 0 && count > previous_count) {
      let notification = `${count} person voted in your post`;

      axios
        .post(
          "api/notification/",
          JSON.stringify({
            notification_for,
            user: owner_user,
            type_id,
            count,
            notification
          }),
          tokenConfig(getState)
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    } else if (count == 0 && previous_count == 1 && count < previous_count) {
      axios
        .delete(`api/notification/${notification_id}/`, tokenConfig(getState))
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    } else if (count > previous_count && count != 1 && previous_count != 0) {
      let notification = `${count} people voted in your post`;

      axios
        .patch(
          `api/notification/${notification_id}/`,
          JSON.stringify({
            count,
            notification
          }),
          tokenConfig(getState)
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    } else if (count < previous_count && count != 0 && previous_count != 1) {
      let notification = `${count} people voted your post`;

      axios
        .patch(
          `api/notification/${notification_id}/`,
          JSON.stringify({
            count,
            notification
          }),
          tokenConfig(getState)
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    }
  }
  // notify for comment replies
  else if (notification_for == 3) {
    if (count == 1 && previous_count == 0) {
      let notification = `There is ${count} reply on your comment`;

      axios
        .post(
          "api/notification/",
          JSON.stringify({
            notification_for,
            user: owner_user,
            type_id,
            count,
            notification
          }),
          tokenConfig(getState)
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    } else if (count > previous_count) {
      let notification = `There are ${count} replies to your comment`;

      axios
        .patch(
          `api/notification/${notification_id}/`,
          JSON.stringify({
            count,
            notification
          }),
          tokenConfig(getState)
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    }
  } else if (notification_for == 4) {
    if (count == 1 && previous_count == 0) {
      let notification = `There is ${count} comment on your post`;

      axios
        .post(
          "api/notification/",
          JSON.stringify({
            notification_for,
            user: owner_user,
            type_id,
            count,
            notification
          }),
          tokenConfig(getState)
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    } else if (count > previous_count) {
      let notification = `There are ${count} comments on your post`;

      axios
        .patch(
          `api/notification/${notification_id}/`,
          JSON.stringify({
            count,
            notification
          }),
          tokenConfig(getState)
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    }
  }
};
