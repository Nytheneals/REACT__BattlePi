import React, { Component } from "react";
import "../App.css";

import Popular from "./_Popular";

class Nav extends Component {
  render() {
    return (
      <div className="popular">
        <Popular />
      </div>
    );
  }
}

export default Nav;
