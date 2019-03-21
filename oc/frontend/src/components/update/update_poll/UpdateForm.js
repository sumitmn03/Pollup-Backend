import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import UpdateOption from "./UpdateOption";

import { updatePost } from "../../../actions/posts";

export class UpdateForm extends Component {
  state = {
    caption: "",
    isSubmitted: false,
    noOfOptions: 0,
    options: []
  };

  componentDidMount() {
    let options = [];
    this.props.post.options.map(option => {
      options.push(option.option);
    });
    this.setState({
      caption: this.props.post.posts,
      noOfOptions: this.props.post.options.length,
      options
    });
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOptionValue = (option_index, new_value) => {
    let options = [...this.state.options];

    options[option_index] = new_value;
    this.setState({ options });
  };

  handleOPtionsBeforesubmit = (original_options, updated_options) => {
    let options = [];
    original_options.map((original_option, index) => {
      options.push({
        count: original_option.count,
        id: original_option.id,
        option: updated_options[index],
        posts: original_option.posts
      });
    });
    return options;
  };

  onSubmit = e => {
    e.preventDefault();
    const { caption } = this.state;
    const { post_type, id } = this.props.post;
    const options = this.handleOPtionsBeforesubmit(
      this.props.post.options,
      this.state.options
    );
    this.props.updatePost(post_type, id, caption, options);
    this.setState({
      caption: "",
      isSubmitted: true
    });
  };

  render() {
    if (this.state.isSubmitted) {
      return <Redirect to="/" />;
    }
    const { caption, options } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="updateform">
              <h2 className="text-light">Update Post</h2>
            </label>
            <textarea
              id="updateform"
              className="form-control"
              type="text"
              name="caption"
              onChange={this.onChange}
              value={caption}
            />
          </div>
          <div>
            {options.map((option, option_index) => {
              return (
                <UpdateOption
                  key={option_index}
                  option={option}
                  handleOptionValue={this.handleOptionValue}
                  option_index={option_index}
                />
              );
            })}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Update
            </button>{" "}
            <button className="btn btn-danger">
              <Link to="/" className="nounderline text-light">
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.PostToBeUpdated.post_to_be_updated
});

export default connect(
  mapStateToProps,
  { updatePost }
)(UpdateForm);
