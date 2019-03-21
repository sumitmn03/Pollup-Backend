import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import users from "./users";
import current_user from "./currentuser";
import sharedpollinfo from "./sharedpollinfo";
import PostToBeUpdated from "./PostToBeUpdated";

export default combineReducers({
  current_user,
  posts,
  auth,
  errors,
  messages,
  users,
  sharedpollinfo,
  PostToBeUpdated
});
