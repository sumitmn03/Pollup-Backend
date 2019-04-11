import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { udpatecurrentuser } from "../../actions/currentuser";

export class EditMyProfile extends Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired,
    udpatecurrentuser: PropTypes.func.isRequired
  };

  state = {
    first_name: "",
    date_of_birth: "",
    middle_name: "",
    last_name: "",
    contact_no: "",
    current_city: "",
    hometown: "",
    occupation: "",
    submitted: false
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      contact_no,
      current_city,
      hometown,
      occupation
    } = this.state;

    this.props.udpatecurrentuser({
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      contact_no,
      current_city,
      hometown,
      occupation
    });
    this.setState({ submitted: true });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    const { current_user } = this.props;
    this.setState({
      first_name:
        current_user.first_name != null ? current_user.first_name : "",
      date_of_birth:
        current_user.date_of_birth != null ? current_user.date_of_birth : "",
      middle_name:
        current_user.middle_name != null ? current_user.middle_name : "",
      last_name: current_user.last_name != null ? current_user.last_name : "",
      contact_no:
        current_user.contact_no != null ? current_user.contact_no : "",
      current_city:
        current_user.current_city != null ? current_user.current_city : "",
      hometown: current_user.hometown != null ? current_user.hometown : "",
      occupation: current_user.occupation != null ? current_user.occupation : ""
    });
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to="/myprofile" />;
    }
    const {
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      contact_no,
      current_city,
      hometown,
      occupation
    } = this.state;

    // const {current_user}
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Edit Profile</h2>
          <form onSubmit={this.onSubmit}>
            <div className="from-group">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
            </div>
            <div className="from-group">
              <label>Middle name</label>
              <input
                type="text"
                className="form-control"
                name="middle_name"
                onChange={this.onChange}
                value={middle_name}
              />
            </div>
            <div className="from-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                onChange={this.onChange}
                value={last_name}
              />
            </div>
            <div className="from-group">
              <label>Date of birth</label>
              <input
                type="text"
                className="form-control"
                name="date_of_birth"
                onChange={this.onChange}
                value={date_of_birth}
              />
            </div>
            <div className="from-group">
              <label>contact number</label>
              <input
                type="number"
                className="form-control"
                name="contact_no"
                onChange={this.onChange}
                value={contact_no}
              />
            </div>
            <div className="from-group">
              <label>Current city</label>
              <input
                type="text"
                className="form-control"
                name="current_city"
                onChange={this.onChange}
                value={current_city}
              />
            </div>
            <div className="from-group">
              <label>Hometown</label>
              <input
                type="text"
                className="form-control"
                name="hometown"
                onChange={this.onChange}
                value={hometown}
              />
            </div>
            <div className="from-group">
              <label>occupation</label>
              <input
                type="text"
                className="form-control"
                name="occupation"
                onChange={this.onChange}
                value={occupation}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user
});

export default connect(
  mapStateToProps,
  { udpatecurrentuser }
)(EditMyProfile);
