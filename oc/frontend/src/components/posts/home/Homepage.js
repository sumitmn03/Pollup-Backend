import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getPosts,
  incrementOption,
  decrementOption,
  decrement_then_increment,
  addComment
} from "../../../actions/posts";
import Timeline from "./Timeline";

export class Homepage extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
    incrementOption: PropTypes.func.isRequired,
    decrementOption: PropTypes.func.isRequired,
    decrement_then_increment: PropTypes.func.isRequired
  };
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className=" row">
            <nav className="col-md-3 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-home"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-users"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Peoples
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-file-text"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      Current month
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="col-md-9 d-none d-md-block bg-secondary">
              <div className="container">
                {" "}
                <div>
                  <center>
                    {" "}
                    <h1>Posts</h1>
                  </center>
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
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  {
    getPosts,
    incrementOption,
    decrementOption,
    decrement_then_increment,
    addComment
  }
)(Homepage);
