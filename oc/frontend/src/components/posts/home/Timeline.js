import React, { Component, Fragment } from "react";

import Post from "./Post";

export class Timeline extends Component {
  render() {
    const { posts } = this.props;

    return (
      <Fragment>
        {posts.map((post, post_index) => (
          <Fragment key={post.id}>
            <Post
              post={post}
              post_index={post_index}
              incrementOption={this.props.incrementOption}
              decrementOption={this.props.decrementOption}
              {...this.props}
            />{" "}
            <br />
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

export default Timeline;
