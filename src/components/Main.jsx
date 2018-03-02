import React, { Component } from "react";
// import { PropTypes } from 'prop-types';
import "../App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Popular from "./_Popular";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{/* <Link to="/about">About</Link> */}</li>
            <li>{/* <Link to="/topics">Topics</Link> */}</li>
          </ul>

          <hr />

          <Route exact path="/" component={Popular} />
          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/topics" component={Topics} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
