import React, { Component, Fragment } from "react";

import PostHeader from "../PostHeader";

import PostFooter from "../PostFooter";

export class SharedPostContent extends Component {
  render() {
    const { shared_poll_data, current_user, post } = this.props;
    return (
      <div className="bg-info">
        <PostHeader {...this.props} />
        <span>{shared_poll_data.caption}</span>
        <div className="border">
          <span>
            <h2>{shared_poll_data.original_post.author_name}</h2>
          </span>{" "}
          <span>
            <small>-{shared_poll_data.original_post.created_at}</small>
          </span>
          <p className="text-light">{shared_poll_data.original_post.posts}</p>
          <br />
          <br />
        </div>
        <div>
          <PostFooter {...this.props} />
        </div>{" "}
        <br />
      </div>
    );
  }
}

export default SharedPostContent;
