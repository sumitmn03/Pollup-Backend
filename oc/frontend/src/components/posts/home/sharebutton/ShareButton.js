import React, { Component, Fragment } from "react";
import ConfirmShareOnTimeline from "./ConfirmShareOnTimeline";

export class ShareButton extends Component {
  state = {
    postToTimelineCaption: false
  };
  redirectToConfirmationPage = () => {
    this.setState({ postToTimelineCaption: true });
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
          <button
            onClick={this.redirectToConfirmationPage}
            className="dropdown-menu nounderline"
          >
            On your timeline
          </button>
          {this.state.postToTimelineCaption ? (
            <ConfirmShareOnTimeline {...this.props} />
          ) : (
            <Fragment />
          )}
        </div>
      </Fragment>
    );
  }
}

export default ShareButton;
