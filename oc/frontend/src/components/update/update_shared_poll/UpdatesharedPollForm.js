import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updatePost } from "../../../actions/posts";

export class UpdatesharedPollForm extends Component {
  state = {
    caption: "",
    isSubmitted: false
  };

  componentDidMount() {
    this.setState({
      caption: this.props.post.posts
    });
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { caption } = this.state;
    const { post_type, id } = this.props.post;

    this.props.updatePost(post_type, id, caption);
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
            <label htmlFor="UpdatesharedPollForm">
              <h2 className="text-light">Update Post</h2>
            </label>
            <textarea
              id="UpdatesharedPollForm"
              className="form-control"
              type="text"
              name="caption"
              onChange={this.onChange}
              value={caption}
            />
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
)(UpdatesharedPollForm);
