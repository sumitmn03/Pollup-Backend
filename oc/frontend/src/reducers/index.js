import { combineReducers } from "redux";
import posts from "../../../../../oc/oc/frontend/src/reducers/posts";
import auth from "../../../../../oc/oc/frontend/src/reducers/auth";
import errors from "../../../../../oc/oc/frontend/src/reducers/errors";
import messages from "../../../../../oc/oc/frontend/src/reducers/messages";
import users from "../../../../../oc/oc/frontend/src/reducers/users";
import current_user from "../../../../../oc/oc/frontend/src/reducers/currentuser";
import PostToBeUpdated from "../../../../../oc/oc/frontend/src/reducers/PostToBeUpdated";
import post_stats from "../../../../../oc/oc/frontend/src/reducers/stats";
import notifications from "../../../../../oc/oc/frontend/src/reducers/notification";

export default combineReducers({
  current_user,
  posts,
  auth,
  errors,
  messages,
  users,
  PostToBeUpdated,
  post_stats,
  notifications
});
