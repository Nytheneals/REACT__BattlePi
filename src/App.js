import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: ['M', 'E', 'R', 'N'],
    };
  }
  render() {
    return (
      <div>
        {this.state.name.map((n, i) => <h2 key={i}>{n}</h2>)}
        {this.state.name.reduce((prev, next) => prev + next, [])}
        <h1>Welcome to React</h1>
      </div>
    );
  }
}

export default App;
