import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

// NAVLINK IS USED TO DYNAMICALLY CHANGE THE STYLE BASED ON IF THAT STYLE IS
// ACTIVE.. ACTUALLY COMPOSES IN LINK AND GIVES IT EXTRA PROPERTIES..

class Nav extends Component {
  render() {
    return (

      <ul className="nav">
        <li>
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/battle">Battle</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/popular">Popular</NavLink>
        </li>
      </ul>
    );
  }
}

export default Nav;
