import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../../actions/users";
export class FindPeoples extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="list-group">
        {this.props.users.map(userProfile => {
          return (
            <a
              key={userProfile.id}
              href="#"
              className="list-group-item list-group-item-action"
            >
              {userProfile.username}
            </a>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(FindPeoples);
