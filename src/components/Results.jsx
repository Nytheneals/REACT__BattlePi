import React, {Component} from "react";
// const PropTypes = require('prop-types');
import queryString from "query-string";
import api from "../utils/api"; // FOR OUR AJAX CALLS

class Results extends Component {
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api
      .battle([players.playerOneName, players.playerTwoName])
      .then(function (results) {
        console.log(results)
      })
  }

  render() {

    console.log(playerOneName, playerTwoName);
    return (
      <div>Results</div>
    )
  }
}

export default Results;