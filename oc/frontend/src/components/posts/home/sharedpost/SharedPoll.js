import React, { Component, Fragment } from "react";

import SharedPostContent from "./SharedPostContent";

export class SharedPoll extends Component {
  render() {
    const { shared_poll_data, post_index } = this.props;
    return (
      <Fragment>
        <SharedPostContent {...this.props} />
      </Fragment>
    );
  }
}

export default SharedPoll;
