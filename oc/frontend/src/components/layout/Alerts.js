import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.detail) alert.error(error.msg.detail);
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors);
      if (error.msg.password) alert.error(`Password:${error.msg.password}`);
      if (error.msg.username) alert.error(`Username:${error.msg.username}`);
    }

    if (message !== prevProps.message) {
      if (message.msg.userRegistered) alert.success(message.msg.userRegistered);
      if (message.msg.userLogin) alert.success(message.msg.userLogin);
      if (message.msg.passwordNotMatch)
        alert.error(message.msg.passwordNotMatch);
      if (message.msg.addPost) alert.success(message.msg.addPost);
      if (message.msg.addOptions) alert.success(message.msg.addOptions);
      if (message.msg.addComment) alert.success(message.msg.addComment);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert(Alerts));
