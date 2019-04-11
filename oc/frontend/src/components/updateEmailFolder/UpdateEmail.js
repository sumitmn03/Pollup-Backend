import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateemail } from "../../actions/updateemail";
import { checkotptoupdateemail } from "../../actions/updateemail";

export class UpdateEmail extends Component {
  static propTypes = {
    updateemail: PropTypes.func.isRequired,
    checkotptoupdateemail: PropTypes.func.isRequired
  };
  state = {
    new_email: "",
    password: "",
    otp_sent: false,
    otp: "",
    error: false
  };

  submit_otp = e => {
    e.preventDefault();
    const { new_email, otp } = this.state;
    this.props.checkotptoupdateemail(new_email, otp);
    this.setState({
      new_email: "",
      password: "",
      otp_sent: false,
      otp: "",
      error: false
    });
  };

  send_otp = e => {
    e.preventDefault();
    const { new_email, password, otp_sent, otp } = this.state;
    this.props.updateemail(password, new_email);
    this.setState({
      otp_sent: true
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { new_email, password, otp_sent, otp, error } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <form onSubmit={this.send_otp}>
            <div className="form-group">
              <input
                placeholder="New email address"
                type="email"
                className="form-control"
                name="new_email"
                onChange={this.onChange}
                value={new_email}
              />
            </div>{" "}
            <div className="form-group">
              <input
                placeholder="Password"
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>{" "}
            <center>
              <div className="form-group">
                <input
                  type="submit"
                  className="form-control"
                  value={otp_sent ? "Resend OTP" : "Send OTP"}
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
            {otp_sent ? (
              <Fragment>
                <div className="form-group">
                  <input
                    placeholder="Enter the otp here"
                    type="number"
                    className="form-control"
                    name="otp"
                    onChange={this.onChange}
                    value={otp}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="button"
                    className="form-control"
                    value="Submit"
                    className="btn btn-primary"
                    onClick={this.submit_otp}
                  />
                </div>
              </Fragment>
            ) : (
              <Fragment />
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateemail, checkotptoupdateemail }
)(UpdateEmail);
