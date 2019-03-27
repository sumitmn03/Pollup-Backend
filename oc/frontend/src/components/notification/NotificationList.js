import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SingleNotificationElement from "./SingleNotificationElement";

export class NotificationList extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired
  };

  render() {
    return (
      <Fragment>
        {this.props.notifications.map((notification, index) => {
          return (
            <Fragment key={index}>
              <SingleNotificationElement notification={notification} />
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications.notifications
});

export default connect(
  mapStateToProps,
  {}
)(NotificationList);
