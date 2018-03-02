import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import '../App.css';

import Popular from './_Popular';

class App extends Component {
  render() {
    return (
      <div className="popular">
        <Popular />
      </div>
    );
  }
}

export default App;
