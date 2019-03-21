import React, { Component, Fragment } from "react";

export class Option extends Component {
  state = {
    option: ""
  };

  componentDidMount() {
    this.setState({ option: this.props.option });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.handleOptionValue(this.props.option_index, e.target.value);
  };

  render() {
    return (
      <Fragment>
        <div className="btn btn-success">
          <input
            type="text"
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
