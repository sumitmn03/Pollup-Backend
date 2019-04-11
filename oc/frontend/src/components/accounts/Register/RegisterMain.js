import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import RegisterForm from "./RegisterForm";
import RegisterOtp from "./RegisterOtp";

export class RegisterMain extends Component {
  state = {
    otp_sent: false
  };

  handleOtpSent = () => {
    this.setState({ otp_sent: true });
  };

  render() {
    const { otp_sent } = this.state;
    return (
      <Fragment>
        {otp_sent ? (
          <RegisterOtp />
        ) : (
          <RegisterForm handleOtpSent={this.handleOtpSent} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(RegisterMain);
