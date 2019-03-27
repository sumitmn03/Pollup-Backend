import React, { Component, Fragment } from "react";

export class Option extends Component {
  handle_option = e => {
    e.preventDefault();
    const { post_index, option_index, post_id } = this.props;
    const { id, count } = this.props.option;

    this.props.handle_option_opted(
      id,
      post_id,
      count,
      post_index,
      option_index
    );
  };
  render() {
    const { option, count } = this.props.option;
    return (
      <Fragment>
        <div href="#" className="btn btn-success" onClick={this.handle_option}>
          {" "}
          <span className="btn">{option}</span>
          <span className="btn btn-primary">{count}</span>
        </div>{" "}
      </Fragment>
    );
  }
}

export default Option;
