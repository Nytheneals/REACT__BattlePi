import React, { Component } from "react";
import { PropTypes } from "prop-types";
import "./App.css";

class ShowList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.names.map(name => {
            return <li>{name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    var name = "Tyler McGinnis";
    var friends = ["Ean Platter", "Murphy Randall", "Merrick Christensen"];
    return (
      <div>
        <h3> Name: {name} </h3>
        <ShowList names={friends} />
      </div>
    );
  }
}

ShowList.propTypes = {
  names: PropTypes.arrayOf(PropTypes.shape([PropTypes.string]))
};

export default App;
