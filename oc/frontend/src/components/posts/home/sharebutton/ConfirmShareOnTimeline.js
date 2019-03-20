import React, { Component, Fragment } from "react";

export class ConfirmShareOnTimeline extends Component {
  state = {
    caption: ""
  };

  share_button_handler = e => {
    this.props.share_poll(
      this.props.current_user.id,
      this.state.caption,
      this.props.post.id
    );
    this.setState({ caption: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { caption } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.share_button_handler}>
          <input
            placeholder="Add a caption..."
            type="text"
            name="caption"
            value={caption}
            onChange={this.onChange}
          />
          <button type="submit" className="btn btn-primary">
            >
          </button>
        </form>
      </Fragment>
    );
  }
}

export default ConfirmShareOnTimeline;
