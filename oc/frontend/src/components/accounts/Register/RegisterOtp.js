import React, { Component } from "react";

export class RegisterOtp extends Component {
  check_otp = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="col-md-6 m-auto">
        <form onSubmit={this.check_otp} className="ms-form">
          <input placeholder="OTP" type="password" className="ms-form-input" />
          <br /> <br /> <br />
          <input value="Submit" type="submit" className="ms-form-button" />{" "}
          <br /> <br />
          <p>
            {" "}
            <strong>Didn't received OTP?</strong>{" "}
            <span className="text-primary">Re-send OTP</span>
          </p>
        </form>
      </div>
    );
  }
}

export default RegisterOtp;
