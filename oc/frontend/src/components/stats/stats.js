import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import StatsBody from "./StatsBody";

export class Stats extends Component {
  state = {
    total_votes: 0
  };
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    let total_votes = 0;
    this.props.post.options.map(option => {
      total_votes += option.count;
    });
    this.setState({ total_votes });
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Option</th>
              <th scope="col">Votes (in number)</th>
              <th scope="col">Votes (in percentage)</th>
            </tr>
          </thead>
          <tbody>
            {post.options.map((option, option_index) => {
              let votes_in_percentage =
                (option.count * 100) / this.state.total_votes;
              if (this.state.total_votes == 0) votes_in_percentage = 0;
              votes_in_percentage = votes_in_percentage.toFixed(2);
              return (
                <StatsBody
                  key={option.id}
                  option_index={option_index}
                  option={option}
                  votes_in_percentage={votes_in_percentage}
                />
              );
            })}
          </tbody>
          <thead className="thead-light">
            <tr>
              <th scope="col">Total</th>
              <th scope="col">{post.options.length}</th>
              <th scope="col">{this.state.total_votes}</th>
              {this.state.total_votes > 0 ? (
                <th scope="col">100 %</th>
              ) : (
                <th scope="col">0 %</th>
              )}
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post_stats.post_stats
});

export default connect(
  mapStateToProps,
  {}
)(Stats);
