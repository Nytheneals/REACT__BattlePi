import React, {Component} from 'react';
// import {PropTypes} from 'prop-types';
import api from '../utils/api';
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
          onClick={props
          .onSelect
          .bind(null, lang)}
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
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this
      .updateLanguage
      .bind(this);
  }
  // LIFE CYCLE HOOK
  componentDidMount() {
    // AJAX REQUEST, SINCE THE COMPONENT HAS BEEN MOUNTED SET STATE.
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({selectedLanguage: lang});
    api
      .fetchPopularRepos(lang)
      .then((res) => {
        console.table(res.map((da) => {
          return da.name
        }))
      })
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

// PROPTYPES SelectedLanguage.propTypes = {   onClick:
// PropTypes.func.isRequired,   style: PropTypes.func.isRequired }

export default Popular;
