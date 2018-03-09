import React, {Component} from "react";
// const PropTypes = require('prop-types');
import {Link} from "react-router-dom";
import PlayerPreview from './PlayerPreview';

class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState(function () {
      return {username: value}
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this
      .props
      .onSubmit(this.props.id, this.state.username);
  }
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder='Github username'
          value={this.state.username}
          type="text"
          autoComplete='off'
          onChange={this.handleChange}/>
        <button className='button' type="submit" disabled={!this.state.username}>Submit</button>
      </form>

    )
  }
}

// MAIN BATTLE COMPONENT / PARENT COMPONENT

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this
      .handleSubmit
      .bind(this);

    this.handleReset = this
      .handleReset
      .bind(this);
  }
  // IN THIS CONTEXT ID = PLAYERONE/PLAYERTWO ,  USERNAME = USERNAME VALUE. THIS
  // HANDELSUBMIT FUNCTION WILL ONLY UPDATE THE THE PARENT STATE. ITS MORE LIKE AN
  // IF STATEMENT ONLY UPDATING THE VALUES THAT WE NEED

  handleSubmit(id, username) {
    this
      .setState(function () {
        const newState = {};
        newState[id + 'Name'] = username;
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
        return newState;
      });
  }

  handleReset(id) {
    this
      .setState(function () {
        var newState = {};
        newState[id + 'Name'] = '';
        newState[id + 'Image'] = null;
        return newState;
      })
  }
  render() {
    const match = this.props.match;
    const playerOneName = this.state.playerOneName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoName = this.state.playerTwoName;
    const playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className='row'>

          {/* PLAYER ONE */}

          {!playerOneName && <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit}/>}
          {playerOneImage !== null && <PlayerPreview avatar={playerOneImage} username={playerOneName}>
            <button
              className='reset'
              onClick={this
              .handleReset
              .bind(null, 'playerOne')}>
              Reset
            </button>
          </PlayerPreview>}

          {/* PLAYER TWO */}

          {!playerTwoName && <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit}/>}
          {playerTwoImage !== null && <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
            <button
              className='reset'
              onClick={this
              .handleReset
              .bind(null, 'playerTwo')}>
              Reset
            </button>
          </PlayerPreview>}
        </div>

        {/* PLAYER ONE && PLAYER TWO CHECKER */}

        {playerOneImage && playerTwoImage && <Link
          className='button'
          to={{
          pathname: match.url + '/results',
          search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
        }}>
          Battle
        </Link>}

      </div>
    )
  }
}

export default Battle;