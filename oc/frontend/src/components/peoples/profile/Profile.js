import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { follow, unfollow } from "../../../actions/users";

export class Profile extends Component {
  static propTypes = {
    following_user_array: PropTypes.array.isRequired,
    host_user: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired
  };

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
      <center className="bg-light">
        <br />
        {host_user.username} <br /> <br />
        {host_user.email} <br /> <br />
        {/* follow or unfollow button */}
        <button
          onClick={() => {
            follow_or_following_value == "follow"
              ? this.props.follow(host_user.id)
              : this.props.unfollow(following_id);
          }}
          className="btn btn-success"
        >
          {follow_or_following_value}
        </button>
        <br /> <br />
      </center>
    );
  }
}

const mapStateToProps = state => ({
  host_user: state.users.host_user,
  following_user_array: state.users.following
});

export default connect(
  mapStateToProps,
  { follow, unfollow }
)(Profile);
