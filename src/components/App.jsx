import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "../App.css";
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Popular from "./Popular";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/battle" component={Battle}/>
            <Route path="/popular" component={Popular}/>
            <Route
              render={function () {
              return <p>Page Not Found...</p>;
            }}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
