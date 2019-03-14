import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Option from "./Option";
import DropdownOptions from "./DropdownOptions";

import { addPost } from "../../../actions/posts";
import { logout } from "../../../actions/auth";

export class Form extends Component {
  state = {
    post: "",
    no_of_options: 0,
    optionArray: [],
    options: []
  };

  static propTypes = {
    logout: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOptions = ({ newOption, id }) => {
    let options = [...this.state.options];
    options[id] = newOption;
    this.setState({ options });
  };

  handle_no_of_options = no_of_options => {
    let optionArray = [],
      options = [];

    for (let i = 0; i < no_of_options; i++) {
      options.push("");
      optionArray.push(
        <Option key={i} id={i} {...this.state} onChange={this.handleOptions} />
      );
    }
    this.setState({ no_of_options, optionArray, options });
  };

  componentDidMount() {
    this.handle_no_of_options(2);
  }

  option_handler_before_submit = (no_of_options, options) => {
    let temp_option_array = [];
    for (let i = 0; i < no_of_options; i++) {
      temp_option_array.push(options[i]);
    }
    return temp_option_array;
  };

  onSubmit = e => {
    e.preventDefault();
    const { post, no_of_options, options } = this.state;
    const options_data = this.option_handler_before_submit(
      no_of_options,
      options
    );
    this.props.addPost([{ posts: post, no_of_options }, options_data]);
    this.setState({
      post: "",
      no_of_options: 0,
      optionArray: [],
      options: []
    });
  };

  render() {
    const { post, optionArray } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="post">
              <h2>Add Post</h2>
            </label>
            <textarea
              id="post"
              className="form-control"
              type="text"
              name="post"
              onChange={this.onChange}
              value={post}
            />
          </div>
          <DropdownOptions onClick={this.handle_no_of_options} />
          <br />
          {optionArray}
          <br />
          <br />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { logout, addPost }
)(Form);
