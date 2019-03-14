import React, { Component, Fragment } from "react";

export class MainComment extends Component {
  render() {
    return (
      <Fragment>
        <div className="bg-light border border-dark">
          {this.props.reply.comment}
        </div>
      </Fragment>
    );
  }
}

export default MainComment;
