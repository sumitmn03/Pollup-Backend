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
