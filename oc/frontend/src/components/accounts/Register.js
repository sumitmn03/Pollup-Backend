import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { send_otp } from "../../actions/auth";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class Register extends Component {
  state = {
    first_name: "",
    email: "",
    date_of_birth: "",
    password: "",
    password2: "",
    otp_sent: false,
    otp: "",
    otp_verified: false,
    date_or_text: "text"
  };

  static propTypes = {
    send_otp: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    createMessage: PropTypes.func.isRequired
  };

  // otp verification before registering any new user
  send_otp = e => {
    e.preventDefault();

    const { email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({
        passwordNotMatch: "passwords do not match"
      });
    } else {
      this.props.send_otp(email);
      this.setState({ otp_sent: true });
    }
  };

  // register the new user after otp verification
  register = e => {
    e.preventDefault();

    const { first_name, email, date_of_birth, password, otp } = this.state;

    const newUser = {
      first_name,
      email,
      date_of_birth,
      password,
      otp
    };
    this.props.register(newUser);
    this.setState({ otp_verified: true });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const {
      first_name,
      email,
      date_of_birth,
      password,
      password2,
      otp,
      date_or_text
    } = this.state;

    return (
      <div className="col-md-6 m-auto">
        <form className="ms-form">
          <div className="form-header">
            {" "}
            <strong>Poll up</strong>{" "}
          </div>{" "}
          <br />
          <input
            placeholder="First name"
            type="text"
            className="ms-form-input"
          />
          <input placeholder="Email" type="email" className="ms-form-input" />
          <input
            placeholder="Date of birth"
            type={date_or_text}
            onFocus={() => {
              this.setState({ date_or_text: "date" });
            }}
            onBlur={() => {
              this.setState({ date_or_text: "text" });
            }}
            className="ms-form-input"
          />
          <input
            placeholder="Password"
            type="password"
            className="ms-form-input"
          />
          <input
            placeholder="Re-enter Password"
            type="password"
            className="ms-form-input"
          />
          <br /> <br /> <br />
          <input
            value="Sign up"
            type="button"
            className="ms-form-button"
          />{" "}
          <br /> <br />
          <p>
            {" "}
            <strong>Already have an account?</strong>{" "}
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
    {
      /*<div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.register}>
            <div className="form-group">
              <input
                placeholder="First name"
                type="text"
                className="form-control ms-form-input"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Email"
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Date of birth"
                type="date"
                className="form-control"
                name="date_of_birth"
                onChange={this.onChange}
                value={date_of_birth}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Password"
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Re-enter password"
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>{" "}
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary col-md-12 m-auto"
                onClick={this.send_otp}
              >
                {this.state.otp_sent ? "Resend OTP" : "Submit"}
              </button>
            </div> */
    }
    {
      /* if otp sent to user, we display this field and button */
    }
    {
      /* {this.state.otp_sent ? (
              <Fragment>
                <div className="from-group">
                  {this.state.otp_verified ? (
                    <label>Please enter the correct OTP</label>
                  ) : (
                    <label>
                      Enter the OTP that we sent to your email address
                    </label>
                  )}
                  <input
                    type="number"
                    className="form-control"
                    name="otp"
                    onChange={this.onChange}
                    value={otp}
                  />
                </div>
                <br />

                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                  />
                </div>
              </Fragment>
            ) : (
              <Fragment />
            )}
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div> */
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { send_otp, register, createMessage }
)(Register);
