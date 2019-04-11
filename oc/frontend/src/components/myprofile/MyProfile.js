import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class MyProfile extends Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired
  };

  render() {
    const { current_user } = this.props;
    return (
      <center>
        <span className="btn btn-primary">
          <Link to="/editmyprofile" className="text-light nounderline">
            Edit Profile
          </Link>
        </span>
        <div className="pc-card">
          {/* <img src="img.jpg" alt="John" style="width:100%" /> */}
          <h3>
            {current_user.first_name}{" "}
            {current_user.middle_name != null ? current_user.middle_name : ""}{" "}
            {current_user.last_name != null ? current_user.last_name : ""}
          </h3>{" "}
          <br />
          {current_user.date_of_birth != null ? (
            <Fragment>
              <div>Date of birth: {current_user.date_of_birth}</div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.occupation != null ? (
            <Fragment>
              <div>Occupation: {current_user.occupation}</div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.contact_no != null ? (
            <Fragment>
              <div>Contact number: {current_user.contact_no}</div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.email != null ? (
            <Fragment>
              <div>Email address: {current_user.email}</div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.current_city != null ? (
            <Fragment>
              <div>current city: {current_user.current_city}</div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.hometown != null ? (
            <Fragment>
              <div>Hometown: {current_user.hometown}</div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </center>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user
});

export default connect(
  mapStateToProps,
  {}
)(MyProfile);
