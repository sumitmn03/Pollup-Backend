import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import users from "./users";

export default combineReducers({
  posts,
  auth,
  errors,
  messages,
  users
});
