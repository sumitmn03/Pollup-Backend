import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class PostHeader extends Component {
  deleteHandler = () => {
    this.props.deletePoll(this.props.post.post_type, this.props.post.id);
  };

  updateHandler = () => {
    this.props.set_post_to_be_update(this.props.post);
  };

  render() {
    const { post, current_user } = this.props;
    return (
      <Fragment>
        <span>
          <h2>{post.author_name}</h2>
        </span>{" "}
        <span>
          <small>-{post.created_at}</small>
        </span>{" "}
        {post.author_id == current_user.id ? (
          <Fragment>
            <div className="btn-group">
              <span
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <strong>...</strong>
              </span>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <span
                  onClick={this.deleteHandler}
                  className="dropdown-item nounderline"
                >
                  Delete
                </span>
                <span
                  onClick={this.updateHandler}
                  className="dropdown-item nounderline"
                >
                  <Link
                    to={
                      post.post_type == 1
                        ? "/updatepost"
                        : "/updatesharedpollform"
                    }
                    className="nounderline"
                  >
                    Update
                  </Link>
                </span>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment />
        )}
      </Fragment>
    );
  }
}

export default PostHeader;
