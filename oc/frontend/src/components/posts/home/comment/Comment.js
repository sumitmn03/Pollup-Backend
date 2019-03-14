import React, { Component, Fragment } from "react";
import CommentForm from "./CommentForm";
import MainComment from "./MainComment";

export class Comment extends Component {
  render() {
    return (
      <Fragment>
        <div className="border border-dark bg-dark">
          {" "}
          <br />
          {this.props.post.comments.map((comment, index) => (
            <Fragment key={comment.id}>
              <MainComment
                comment={comment}
                {...this.props}
                comment_index={index}
              />{" "}
              <br />
            </Fragment>
          ))}
        </div>

        <br />
        <CommentForm {...this.props} />
        <br />
      </Fragment>
    );
  }
}

export default Comment;
