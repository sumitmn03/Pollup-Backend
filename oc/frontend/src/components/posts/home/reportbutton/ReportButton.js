import React, { Component, Fragment } from "react";

export class ReportButton extends Component {
  send_report = e => {
    let { post_type, id } = this.props.post,
      reported_user = this.props.current_user.id,
      post_index = this.props.post_index;
    this.props.report(post_type, id, e.target.value, reported_user, post_index);
  };
  render() {
    return (
      <div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="reportButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Report
          </button>
          <div className="dropdown-menu" aria-labelledby="reportButton">
            <button
              className="dropdown-item"
              value="1"
              onClick={this.send_report}
            >
              Sexual content
            </button>
            <button
              className="dropdown-item"
              value="2"
              onClick={this.send_report}
            >
              Violent or repulsive content
            </button>
            <button
              className="dropdown-item"
              value="3"
              onClick={this.send_report}
            >
              Hateful or abusive content
            </button>
            <button
              className="dropdown-item"
              value="4"
              onClick={this.send_report}
            >
              Harmful or dangerous acts
            </button>
            <button
              className="dropdown-item"
              value="5"
              onClick={this.send_report}
            >
              Spam or misleading
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportButton;
