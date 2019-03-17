import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getAllUsers,
  getSingleUser,
  follow,
  unfollow
} from "../../../actions/users";

import ProfileList from "./ProfileList";

export class FindPeoples extends Component {
  static propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    getSingleUser: PropTypes.func.isRequired,
    all_users: PropTypes.array.isRequired,
    following_user_array: PropTypes.array.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    return (
      <div className="list-group w-50">
        {this.props.all_users.map(host_user => {
          return (
            <li
              key={host_user.id}
              className="list-group-item list-group-item-action"
            >
              <ProfileList host_user={host_user} {...this.props} />
            </li>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  all_users: state.users.all_users,
  following_user_array: state.users.following
});

export default connect(
  mapStateToProps,
  { getAllUsers, getSingleUser, follow, unfollow }
)(FindPeoples);
