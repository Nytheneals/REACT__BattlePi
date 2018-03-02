import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
//ADDED LIFECYCLE HOOKS COMPONENT ONE
function SelectedLanguage(props) {
  const languages = [
    'All',
    'JavaScript',
    'Ruby',
    'Java',
    'CSS',
    'Python'
  ];
  return (
    <div className="languages">
      {languages.map(lang => (
        <li
          style={lang === props.select
          ? {
            color: 'red'
          }
          : null}
          onClick={props.onSelect}
          key={lang}>
          {lang}
        </li>
      ))}
    </div>
  );
}

// COMPONENT TWO
class Popular extends Component {
  constructor() {
    super();
    this.state = {
      selectedLanguage: 'All'
    };

    this.updateLanguage = this
      .updateLanguage
      .bind(this);
  }

  updateLanguage(e) {
    const clicked = e.target.textContent;
    this.setState({selectedLanguage: clicked});
  }

  render() {
    // console.log(this.state);
    return (
      <div className="languages">
        <SelectedLanguage
          select={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
      </div>
    );
  }
}

//PROPTYPES
SelectedLanguage.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.func.isRequired
}

export default Popular;
