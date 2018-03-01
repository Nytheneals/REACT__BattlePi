import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';

function SelectedLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <div className="languages">
      {languages.map(lang => (
        <li
          style={lang === props.select ? { color: 'red' } : null}
          onClick={props.onSelect}
          key={lang}
        >
          {lang}
        </li>
      ))}
    </div>
  );
}

class Popular extends Component {
  constructor() {
    super();
    this.state = {
      selectedLanguage: 'All',
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(e) {
    const clicked = e.target.textContent;
    this.setState({
      selectedLanguage: clicked,
    });
  }

  render() {
    // console.log(this.state);
    return (
      <div className="languages">
        <SelectedLanguage select={this.state.selectedLanguage} onSelect={this.updateLanguage} />
      </div>
    );
  }
}

export default Popular;
