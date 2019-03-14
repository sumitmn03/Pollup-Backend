import React, { Component, Fragment } from "react";
import CommentReply from "./CommentReply";
import CommentForm from "./CommentForm";

export class MainComment extends Component {
  render() {
    return (
      <Fragment>
        <div className="bg-warning">{this.props.comment.comment}</div>

        {this.props.comment.replies.map(reply => (
          <CommentReply key={reply.id} reply={reply} />
        ))}

        <CommentForm {...this.props} />
      </Fragment>
    );
  }
}

export default MainComment;
