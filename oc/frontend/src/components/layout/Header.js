import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";
import { get_notifications } from "../../actions/notification";

import NotificationButton from "../notification/NotificationButton";

export class Header extends Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    get_notifications: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { current_user } = this.props;

    const authLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/myprofile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <NotificationButton get_notifications={this.props.get_notifications} />
        <li className="nav-item">
          <Link to="/findpeoples" className="nav-link">
            Peoples
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/post" className="nav-link">
            Post
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/setting" className="nav-link">
            Setting
          </Link>
        </li>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {isAuthenticated ? (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="#">
                <strong>Welcome {current_user.first_name}</strong>
              </a>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="#">
                <strong />
              </a>
            </div>
          )}

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, get_notifications }
)(Header);
