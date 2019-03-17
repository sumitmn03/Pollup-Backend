import React, { Component } from "react";
import { follow } from "../../../actions/users";

export class ProfileList extends Component {
  render() {
    let follow_or_following_value = "follow",
      following_id = 0;
    const { host_user, following_user_array } = this.props;

    // check if the current user is following the other user
    following_user_array.map(following => {
      // if host user id(following.following) found in the following list of current user, show the "following" text and set the following id
      if (host_user.id == following.following) {
        follow_or_following_value = "following";
        following_id = following.id;
      }
    });

    return (
      <div>
        {/* host user detail view */}
        <a
          onClick={() => {
            this.props.getSingleUser(host_user.id);
            return true;
          }}
          href="#/profile"
          className="nounderline"
        >
          {host_user.username}
        </a>

        {/* follow or unfollow button */}
        <button
          onClick={() => {
            follow_or_following_value == "follow"
              ? this.props.follow(host_user.id)
              : this.props.unfollow(following_id);
          }}
          className="btn btn-success float-right"
        >
          {follow_or_following_value}
        </button>
      </div>
    );
  }
}

export default ProfileList;
