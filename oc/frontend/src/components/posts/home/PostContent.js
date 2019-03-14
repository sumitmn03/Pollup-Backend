import React, { Component, Fragment } from "react";

export class PostContent extends Component {
  render() {
    const { post } = this.props;
    return (
      <Fragment>
        <span>
          <h2>{post.author_name}</h2>
        </span>{" "}
        <span>
          <small>-{post.created_at}</small>
        </span>{" "}
        <br />
        <p className="text-light">{post.posts}</p>
      </Fragment>
    );
  }
}

export default PostContent;
