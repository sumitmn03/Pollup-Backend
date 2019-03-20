import React, { Component, Fragment } from "react";

import Post from "./Post";
import SharedPoll from "./sharedpost/SharedPoll";

export class Timeline extends Component {
  render() {
    const { posts } = this.props;

    return (
      <Fragment>
        {posts.map((post, post_index) => (
          <Fragment key={post_index}>
            {!post.shared_by ? (
              <Fragment>
                <Post
                  post={post}
                  post_index={post_index}
                  incrementOption={this.props.incrementOption}
                  decrementOption={this.props.decrementOption}
                  {...this.props}
                />
                <br />{" "}
              </Fragment>
            ) : (
              <Fragment>
                <SharedPoll
                  post={post}
                  post_index={post_index}
                  shared_poll_data={this.props.posts[post_index]}
                  {...this.props}
                />{" "}
                <br />
              </Fragment>
            )}
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

export default Timeline;
