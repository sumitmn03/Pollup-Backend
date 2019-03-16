import React, { Component, Fragment } from "react";

export class MainComment extends Component {
  render() {
    return (
      <Fragment>
        <div className="text-success">
          {this.props.reply.author_name} -{" "}
          <span className="text-dark">
            <small>{this.props.reply.timestamp}</small>
          </span>
        </div>
        <div>{this.props.reply.comment}</div>
      </Fragment>
    );
  }
}

export default MainComment;
