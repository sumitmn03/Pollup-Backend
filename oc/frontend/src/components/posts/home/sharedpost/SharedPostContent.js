import React, { Component, Fragment } from "react";

import PostHeader from "../PostHeader";
import Comment from "../comment/Comment";

export class SharedPostContent extends Component {
  render() {
    const { shared_poll_data } = this.props;
    return (
      <div className="bg-info">
        <PostHeader
          author_name={shared_poll_data.author_name}
          timestamp={shared_poll_data.timestamp}
        />
        <span>{shared_poll_data.caption}</span>
        <div className="border">
          <PostHeader
            author_name={shared_poll_data.original_post.author_name}
            timestamp={shared_poll_data.original_post.created_at}
          />
          <p className="text-light">{shared_poll_data.original_post.posts}</p>
          <br />
          <br />
        </div>
        <div>
          <Comment {...this.props} />
        </div>{" "}
        <br />
      </div>
    );
  }
}

export default SharedPostContent;
