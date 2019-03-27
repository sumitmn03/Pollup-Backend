import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class NotificationButton extends Component {
  render() {
    return (
      <Fragment>
        <li className="nav-item" onClick={this.props.get_notifications}>
          <Link to="/notifications" className="nav-link">
            Notification
          </Link>
        </li>
      </Fragment>
    );
  }
}

export default NotificationButton;
