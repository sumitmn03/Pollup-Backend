import React, { Component } from "react";

export class DropdownOptions extends Component {
  state = {
    no_of_options: 8,
    ddItems: [2, 3, 4, 5, 6, 7, 8, 9]
  };

  onClick = e => {
    this.props.onClick(e.target.value);
  };

  render() {
    return (
      <div className="btn-group">
        <br />
        <span className="btn btn-secondary">No of options</span>
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          {this.state.ddItems.map(sNumber => {
            return (
              <button
                key={sNumber}
                type="button"
                className="dropdown-item"
                onClick={this.onClick}
                value={sNumber}
              >
                {sNumber}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DropdownOptions;
