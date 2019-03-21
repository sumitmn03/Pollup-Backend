import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class ShareButton extends Component {
  setSharedPollData = () => {
    this.props.share_poll_info(this.props.post);
    return true;
  };
  render() {
    return (
      <Fragment>
        <div className="btn-group">
          <span
            className="dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {" "}
            <strong>Share</strong>
          </span>
          <div
            className="dropdown-menu nounderline"
            aria-labelledby="dropdownMenuButton"
            onClick={this.setSharedPollData}
          >
            <span className="dropdown-item" href="#">
              <Link to="/confirmshareontimeline" className="nounderline">
                On your timeline
              </Link>
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ShareButton;
