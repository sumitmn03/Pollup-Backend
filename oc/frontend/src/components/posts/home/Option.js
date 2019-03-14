import React, { Component, Fragment } from "react";

export class Option extends Component {
  render() {
    const { post_index, option_index, post_id } = this.props;
    const { value, id, count } = this.props.option;
    return (
      <Fragment>
        <span
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
          {count}
        </span>{" "}
      </Fragment>
    );
  }
}

export default Option;
