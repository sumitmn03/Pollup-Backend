import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { share_poll } from "../../../../actions/SharePoll";

export class ConfirmShareOnTimeline extends Component {
  state = {
    caption: "",
    isSubmitted: false
  };

  static propTypes = {
    current_user: PropTypes.object.isRequired,
    shared_poll_data: PropTypes.object.isRequired,
    share_poll: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    const { current_user, shared_poll_data } = this.props;
    this.props.share_poll(
      current_user.id,
      this.state.caption,
      shared_poll_data.id
    );
    this.setState({ caption: "", isSubmitted: true });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.state.isSubmitted) {
      return <Redirect to="/" />;
    }
    const { caption } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <form onSubmit={this.onSubmit}>
            <div className="from-group">
              <label>Caption</label>
              <input
                type="text"
                className="form-control"
                name="caption"
                onChange={this.onChange}
                value={caption}
              />
            </div>

            <div className="form-group">
              {/* share the poll post if user click share */}
              <button type="submit" className="btn btn-primary">
                {" "}
                Share
              </button>{" "}
              {/* back to timeline if user click the cancel button */}
              <button className="btn btn-danger">
                <Link to="/" className="text-light nounderline">
                  Cancel{" "}
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  current_user: state.current_user.current_user,
  shared_poll_data: state.sharedpollinfo.shared_poll_data
});

export default connect(
  mapStateToProps,
  { share_poll }
)(ConfirmShareOnTimeline);
