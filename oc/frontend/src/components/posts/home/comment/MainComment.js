import React, { Component, Fragment } from "react";
import CommentReply from "./CommentReply";
import CommentForm from "./CommentForm";

export class MainComment extends Component {
  state = {
    value_of_id: "comment_reply_id"
  };

  componentDidMount() {
    let value_of_id = "commentreply" + this.props.comment.id;
    this.setState({ value_of_id });
  }

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

export default MainComment;
