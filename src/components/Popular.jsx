import React, {Component} from "react";
import {PropTypes} from "prop-types";
import api from "../utils/api"; // FOR OUR AJAX CALLS

// RENDERS OUR NAV LANGUAGES VIEW
function SelectedLanguage(props) {
  const languages = [
    "All",
    "JavaScript",
    "Ruby",
    "Java",
    "CSS",
    "Python"
  ];
  return (
    <div className="languages">
      {languages.map(lang => (
        <li
          style={lang === props.select
          ? {
            color: "red"
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

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props
        .repos
        .map(function (repo, index) {
          return (
            <li key={repo.name} className="popular-item">
              <div className="popular-rank">#{index + 1}</div>
              <ul className="space-list-items">
                <li>
                  <img
                    className="avatar"
                    src={repo.owner.avatar_url}
                    alt={"Avatar for " + repo.owner.login}/>
                </li>
                <li>
                  <a href={repo.html_url}>{repo.name}</a>
                </li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count}
                  stars</li>
              </ul>
            </li>
          );
        })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

// MAIN COMPONENT
class Popular extends Component {
  constructor() {
    super();
    this.state = {
      selectedLanguage: "All",
      repos: null
    };

    this.updateLanguage = this
      .updateLanguage
      .bind(this);
  }
  // LIFE CYCLE HOOK FOR OUR ONCLICK AJAX REQUEST
  componentDidMount() {
    // AJAX REQUEST, SINCE THE COMPONENT HAS BEEN MOUNTED SET STATE.
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this
      .setState(function () {
        return {selectedLanguage: lang, repos: null};
      });

    // THIS AJAX REQUEST IS RETURNING A PROMISE
    api
      .fetchPopularRepos(lang)
      .then(function (repos) {
        this
          .setState(function () {
            return {repos: repos};
          });
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectedLanguage
          select={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/> {!this.state.repos
          ? (
            <p>LOADING!</p>
          )
          : (<RepoGrid repos={this.state.repos}/>)}
      </div>
    );
  }
}

// PROPTYPES

SelectedLanguage.propTypes = {
  select: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Popular;
