import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import queryString from "query-string";
import api from "../utils/api"; // FOR OUR AJAX CALLS
import PlayerPreview from './PlayerPreview';

// RESULTS PLAYER

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{
        textAlign: 'center'
      }}>Score: {props.score}</h3>
      <Profile info={props.profile}/>
    </div>
  )
}
Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

function Profile(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{
        textAlign: 'center'
      }}>Score: {props.score}</h3>

      <PlayerPreview info={props.profile}/>
    </div>
  )
}

// RESULTS COMPONENT

class Results extends Component {
  constructor() {
    super();
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  // API REQUEST IN COMPONENT DID MOUNT HOOK
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api
      .battle([players.playerOneName, players.playerTwoName])
      .then(function (results) {
        if (results === null) {
          return this.setState({error: "Looks like ther was an error, Check that both user exist on GITHUB", loading: false});
        }
        this.setState({error: null, winner: results[0], loser: results[1], loading: false});
      }.bind(this));
  }

  render() {
    const winner = this.state.winner;
    const loser = this.state.loser;
    const error = this.state.error;
    const loading = this.state.loading;
    if (loading === true) {
      return (
        <p>Loading</p>
      );
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    return (
      <div className='row'>
        <Player label='Winner' score={winner.score} profile={winner.profile}/>
        <Player label='Loser' score={loser.score} profile={loser.profile}/>
      </div>
    )
  }
}
export default Results;