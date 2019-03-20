import React, { Component, Fragment } from "react";
import CommentForm from "./CommentForm";
import MainComment from "./MainComment";

export class Comment extends Component {
  state = {
    value_of_id: "comment_id"
  };

  componentDidMount() {
    let value_of_id =
      "comment" + this.props.post.id + this.props.post.post_type;
    this.setState({ value_of_id });
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="panel-group">
            <div className="panel panel-default">
              <div className="panel-heading">
                <span className="panel-title ">
                  <a
                    data-toggle="collapse"
                    href={"#" + this.state.value_of_id}
                    className="text-dark nounderline"
                  >
                    <strong>Comments</strong>
                  </a>
                </span>
              </div>
              <div
                id={this.state.value_of_id}
                className="panel-collapse collapse"
              >
                <ul className="list-group">
                  {this.props.post.comments.map((comment, index) => (
                    <li key={comment.id} className="list-group-item">
                      <MainComment
                        comment={comment}
                        {...this.props}
                        comment_index={index}
                      />{" "}
                    </li>
                  ))}
                </ul>
                <div className="panel-footer">
                  <CommentForm {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Comment;
