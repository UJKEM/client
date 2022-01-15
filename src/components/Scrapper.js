import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { dataAPI } from "../Data/DataAPI";

class Scrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: dataAPI,
      search: "",
      rs: [],
    };
    this.onSearchInput = this.onSearchInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:4000/home");
    if (data) {
      this.setState({ content: data.fr });
    }

    const result = await axios.get("http://localhost:4000/recentSearch");
    if (result) {
      this.setState({ rs: result.data.rs });
    }
  }

  onSearchInput(e) {
    this.setState({ search: e.target.value });
  }

  onDetailClick(item) {
    this.props.history.push({
      pathname: "/details",
      state: { detail: item },
    });
  }

  onTitleClick(t) {
    this.setState({ content: dataAPI });
    axios
      .post("http://localhost:4000/search", { title: t })
      .then(({ data }) => {
        this.setState({ content: data.fr, rs: data.rs });
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  onSubmit() {
    if (this.state.search && this.state.search !== "") {
      this.setState({ content: dataAPI });
      axios
        .post("http://localhost:4000/search", { title: this.state.search })
        .then(({ data }) => {
          if (data) {
            this.setState({ content: data.fr, rs: data.rs });
          }
        });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row sticky-top">
          <div className="col-4 mx-auto">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-white text-primary"
                placeholder="Type here..."
                onChange={this.onSearchInput}
              ></input>
              <span className="input-group-btn">
                <button
                  className="btn btn-primary text-white"
                  type="button"
                  onClick={() => this.onSubmit()}
                >
                  Go!
                </button>
              </span>
            </div>
          </div>
        </div>
        <br></br>
        <div className="row" style={{ height: "1000px" }}>
          <div className="col-9 card-columns">
            {this.state.content?.slice(0, 11).map((item, index) => (
              <div className="card bg-primary text-white border-light">
                <h5 className="card-header bg-info text-left">Featured</h5>
                <div className="card-body text-left">
                  <h5 className="card-title text-truncate">
                    Role: {item.title}
                  </h5>
                  <h6 className="card-subtitle text-white text-truncate">
                    Company: {item.company}
                  </h6>
                  <p className="card-text">
                    Rating: {item.rating ? item.rating : "NA"}
                  </p>
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => this.onDetailClick(item)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-3">
            <div className="card ml-2 mr-2 h-50 overflow-auto">
              <div className="text-center card-header bg-primary text-white font-weight-bold">
                Recently Searched
              </div>
              {this.state.rs?.map((t, index) => (
                <ul className="list-group list-group-flush">
                  <li
                    className="list-group-item list-group-item-action"
                    onClick={() => this.onTitleClick(t.title)}
                  >
                    {t.title}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Scrapper);
