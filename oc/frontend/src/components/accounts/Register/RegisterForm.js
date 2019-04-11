import React, { Component } from "react";
import { Link } from "react-router-dom";

export class RegisterForm extends Component {
  state = {
    date_or_text: "text"
  };

  send_otp = e => {
    e.preventDefault();
    this.props.handleOtpSent();
  };

  render() {
    const { date_or_text } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <form onSubmit={this.send_otp} className="ms-form">
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
            type="submit"
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
  }
}

export default RegisterForm;
