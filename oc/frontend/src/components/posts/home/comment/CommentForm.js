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
    let post = this.props.post.id,
      author = this.props.post.current_user.id,
      parent_comment =
        this.props.comment == undefined ? null : this.props.comment.id,
      parent_comment_index =
        this.props.comment_index == undefined ? null : this.props.comment_index,
      post_index = this.props.post_index;

    console.log(parent_comment);

    let { comment_content } = this.state;

    this.props.addComment(
      post,
      author,
      parent_comment,
      parent_comment_index,
      comment_content,
      post_index
    );

    this.setState({ comment_content: "" });
  };

  componentDidMount() {
    // console.log(this.props.comment == undefined);
  }

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
            post comment
          </button>{" "}
        </form>
      </Fragment>
    );
  }
}

export default CommentForm;
