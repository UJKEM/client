import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Scrapper from "./components/Scrapper";
import Details from "./components/Details";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Scrapper} />
            <Route exact path="/details" component={Details} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
