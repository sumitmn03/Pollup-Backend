import React, { Component, Fragment } from "react";

export class CommentForm extends Component {
  state = {
    comment_content: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let post_type = this.props.post.post_type,
      post = this.props.post.id,
      author = this.props.current_user.id,
      parent_comment =
        this.props.comment == undefined ? null : this.props.comment.id,
      parent_comment_index =
        this.props.comment_index == undefined ? null : this.props.comment_index,
      post_index = this.props.post_index;

    let { comment_content } = this.state;

    this.props.addComment(
      post_type,
      post,
      author,
      parent_comment,
      parent_comment_index,
      comment_content,
      post_index
    );

    // need to make this happen

    if (this.props.comment != undefined) {
      const { comment, current_user, total_replies_count } = this.props;
      this.props.notify(
        comment.comment_reply_notification.id,
        3,
        comment.author,
        current_user.id,
        comment.id,
        total_replies_count + 1,
        total_replies_count
      );
    } else {
      const { current_user, post, total_comment_count } = this.props;
      this.props.notify(
        post.post_comment_notification.id,
        4,
        post.author_id,
        current_user.id,
        post.id,
        total_comment_count + 1,
        total_comment_count
      );
    }

    this.setState({ comment_content: "" });
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.comment_content}
            onChange={this.onChange}
            name="comment_content"
          />
          <button type="submit" className="btn btn-dark">
            >
          </button>{" "}
        </form>
      </Fragment>
    );
  }
}

export default CommentForm;
