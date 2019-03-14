import React, { Component, Fragment } from "react";

export class Option extends Component {
  state = {
    option: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange({
      newOption: e.target.value,
      id: this.props.id
    });
  };

  render() {
    return (
      <Fragment>
        <div className="form-check form-check-inline">
          <input
            type="text"
            placeholder="option"
            name="option"
            value={this.state.option}
            onChange={this.onChange}
            className="form-control form-control-sm"
          />
        </div>
      </Fragment>
    );
  }
}

export default Option;
