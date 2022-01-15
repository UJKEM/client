import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.state.detail.title,
      company: this.props.location.state.detail.company,
      location: this.props.location.state.detail.location,
      rating: this.props.location.state.detail.rating,
      requirements: this.props.location.state.detail.requirements,
    };
  }
  render() {
    return (
      <div className="jumbotron">
        <h2 className="display-3">Role: {this.state.title}</h2>
        <p className="lead">Company: {this.state.company}</p>
        <p className="lead">Location: {this.state.location}</p>
        <p className="lead">
          Rating: {this.state.rating ? this.state.rating : "NA"}
        </p>
        <hr className="my-4"></hr>
        <p>Requirements: {this.state.requirements}</p>
      </div>
    );
  }
}

export default withRouter(Details);
