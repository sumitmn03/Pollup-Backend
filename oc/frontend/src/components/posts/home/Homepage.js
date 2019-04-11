import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getPosts,
  incrementOption,
  decrementOption,
  decrement_then_increment,
  addComment,
  deletePost
} from "../../../actions/posts";
import { following } from "../../../actions/users";
import { getCurrentUser } from "../../../actions/currentuser";
import { set_post_to_be_update } from "../../../actions/PostToBeUpdated";
import { report } from "../../../actions/report";
import { set_stat_post } from "../../../actions/stats";
import { notify } from "../../../actions/notification";

import Timeline from "./Timeline";

export class Homepage extends Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
    incrementOption: PropTypes.func.isRequired,
    decrementOption: PropTypes.func.isRequired,
    following: PropTypes.func.isRequired,
    decrement_then_increment: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    set_post_to_be_update: PropTypes.func.isRequired,
    report: PropTypes.func.isRequired,
    set_stat_post: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.following();
    this.props.getPosts();
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className=" row">
            <div className="col-md-12 d-none d-md-block bg-secondary">
              <div className="container">
                {" "}
                <div>
                  <br />
                  <br />
                  <Timeline {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user,
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  {
    getPosts,
    incrementOption,
    decrementOption,
    decrement_then_increment,
    addComment,
    following,
    getCurrentUser,
    deletePost,
    set_post_to_be_update,
    report,
    set_stat_post,
    notify
  }
)(Homepage);
