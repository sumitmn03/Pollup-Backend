import React, { Component, Fragment } from "react";

export class Option extends Component {
  render() {
    const { post_index, option_index, post_id } = this.props;
    const { option, id, count } = this.props.option;
    return (
      <Fragment>
        <div
          href="#"
          className="btn btn-success"
          onClick={() =>
            this.props.handle_option_opted(
              id,
              post_id,
              count,
              post_index,
              option_index
            )
          }
        >
          {" "}
          <span className="btn">{option}</span>
          <span className="btn btn-primary">{count}</span>
        </div>{" "}
      </Fragment>
    );
  }
}

export default Option;
