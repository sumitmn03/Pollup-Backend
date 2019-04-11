import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updatepassword } from "../../actions/updatepassword";

export class UpdatePassword extends Component {
  static propTypes = {
    updatepassword: PropTypes.func.isRequired
  };

  state = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
    error: false
  };

  onSubmit = e => {
    e.preventDefault();
    const { old_password, new_password, confirm_new_password } = this.state;

    if (new_password == null || new_password == "") {
      this.setState({
        error: "Password must contain atleast 8 characters"
      });
    } else if (new_password != confirm_new_password) {
      this.setState({
        error: "You must enter the same new password twice to confirm it"
      });
    } else {
      this.props.updatepassword(old_password, new_password);
      this.setState({
        // old_password: "",
        // new_password: "",
        // confirm_new_password: "",
        error: false
      });
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      old_password,
      new_password,
      confirm_new_password,
      error
    } = this.state;

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <form onSubmit={this.onSubmit}>
            {error != false ? (
              <Fragment>
                <div className="form-group">
                  {" "}
                  <strong className="text-danger">{error}</strong>
                </div>
              </Fragment>
            ) : (
              ""
            )}
            <div className="form-group">
              <input
                placeholder="Current password"
                type="password"
                className="form-control"
                name="old_password"
                onChange={this.onChange}
                value={old_password}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="New password"
                type="password"
                className="form-control"
                name="new_password"
                onChange={this.onChange}
                value={new_password}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Re=enter new password"
                type="password"
                className="form-control"
                name="confirm_new_password"
                onChange={this.onChange}
                value={confirm_new_password}
              />
            </div>{" "}
            <br />
            <center>
              <div className="form-group">
                <input
                  type="submit"
                  className="form-control"
                  value="Save Changes"
                  className="btn btn-primary"
                />
              </div>{" "}
              <div className="form-group">
                <span className="form-control" className="btn btn-danger">
                  <Link to="/setting" className="text-light nounderline">
                    Cancel
                  </Link>
                </span>
              </div>
            </center>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updatepassword }
)(UpdatePassword);
