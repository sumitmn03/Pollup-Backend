import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class Setting extends Component {
  render() {
    return (
      <Fragment>
        <center className="container">
          <div className="btn btn-primary">
            <Link to="/editmyprofile" className="nav-link text-light">
              Edit profile
            </Link>
          </div>{" "}
          <br /> <br />
          <div className="btn btn-primary">
            <Link to="/updatepassword" className="nav-link text-light">
              Update password
            </Link>
          </div>{" "}
          <br /> <br />
          <div className="btn btn-primary">
            <Link to="/updateemail" className="nav-link text-light">
              Update email
            </Link>
          </div>
        </center>
      </Fragment>
    );
  }
}

export default Setting;
