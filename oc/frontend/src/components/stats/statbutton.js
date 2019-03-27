import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Statbutton extends Component {
  set_stat_post = () => {
    this.props.set_stat_post(this.props.post);
  };
  render() {
    return (
      <div>
        <Link
          onClick={this.set_stat_post}
          to="/stats"
          className="btn btn-success nounderline"
        >
          Stats
        </Link>
      </div>
    );
  }
}

export default Statbutton;
