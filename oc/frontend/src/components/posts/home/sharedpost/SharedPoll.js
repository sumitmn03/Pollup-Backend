import React, { Component, Fragment } from "react";

import SharedPostContent from "./SharedPostContent";

export class SharedPoll extends Component {
  render() {
    return (
      <Fragment>
        <SharedPostContent {...this.props} />
      </Fragment>
    );
  }
}

export default SharedPoll;
