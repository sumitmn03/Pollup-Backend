import React, { Component, Fragment } from "react";

export class PostHeader extends Component {
  render() {
    const { author_name, timestamp } = this.props;
    return (
      <Fragment>
        <span>
          <h2>{author_name}</h2>
        </span>{" "}
        <span>
          <small>-{timestamp}</small>
        </span>{" "}
        <br />
      </Fragment>
    );
  }
}

export default PostHeader;
