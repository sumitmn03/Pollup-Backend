import React, { Component, Fragment } from "react";

export class SingleNotificationElement extends Component {
  render() {
    return (
      <Fragment>
        <center className="alert alert-light border" role="alert">
          {this.props.notification.notification}{" "}
        </center>
      </Fragment>
    );
  }
}

export default SingleNotificationElement;
