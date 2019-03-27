import React, { Component, Fragment } from "react";
import CommentReply from "./CommentReply";
import CommentForm from "./CommentForm";

export class MainComment extends Component {
  state = {
    value_of_id: "comment_reply_id",
    total_replies_count: 0
  };

  componentDidMount() {
    let value_of_id = "commentreply" + this.props.comment.id,
      total_replies_count = this.props.comment.replies.length;
    this.setState({ value_of_id, total_replies_count });
  }

  handle_reply_notification = () => {};

  render() {
    return (
      <Fragment>
        <div className="text-success">
          {this.props.comment.author_name} -{" "}
          <span className="text-dark">
            <small>{this.props.comment.timestamp}</small>
          </span>
        </div>
        <div>{this.props.comment.comment}</div>

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
                    <strong>Replies</strong>
                  </a>
                </span>
              </div>
              <div
                id={this.state.value_of_id}
                className="panel-collapse collapse"
              >
                <ul className="list-group">
                  {this.props.comment.replies.map(reply => (
                    <li key={reply.id} className="list-group-item">
                      <CommentReply reply={reply} />
                    </li>
                  ))}
                </ul>
                <div className="panel-footer">
                  <CommentForm
                    {...this.props}
                    total_replies_count={this.state.total_replies_count}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MainComment;
