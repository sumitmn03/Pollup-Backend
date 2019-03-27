import React, { Component, Fragment } from "react";

export class StatsBody extends Component {
  render() {
    const { option, option_index, votes_in_percentage } = this.props;
    return (
      <Fragment>
        <tr>
          <th scope="row">{option_index + 1}</th>
          <td>{option.option}</td>
          <td>{option.count}</td>
          <td>{votes_in_percentage} %</td>
        </tr>
      </Fragment>
    );
  }
}

export default StatsBody;
