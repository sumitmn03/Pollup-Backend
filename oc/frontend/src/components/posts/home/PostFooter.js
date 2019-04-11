import React, { Component, Fragment } from "react";
import Comment from "./comment/Comment";
import ReportButton from "../home/reportbutton/ReportButton";
import StateButton from "../../stats/statbutton";

export class PostFooter extends Component {
  render() {
    let footer;
    if (this.props.post.post_type == 1) {
      footer = (
        <Fragment>
          <Comment {...this.props} />
          <ReportButton {...this.props} />
          <StateButton {...this.props} />
        </Fragment>
      );
    } else if (this.props.post.post_type == 2) {
      footer = (
        <Fragment>
          <Comment {...this.props} />
          <ReportButton {...this.props} />
        </Fragment>
      );
    }

    return <Fragment>{footer}</Fragment>;
  }
}

export default PostFooter;
