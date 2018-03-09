import axios from "axios";

// SIGNED UP API
const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = "?client_id=" + id + "&client_secret=" + sec;

// GET A PROFILE
function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username)
    .then(function (user) {
      return user.data;
    });
}
// GET THEIR REPOS AND RETURN 100 REPOS PER PAGE.
function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

// GET THEIR STARS TOTAL PER REPO
function getStarCount(repos) {
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count
  }, 0);
}

// ALGORITHM CALCULATES THE TOTAL SCORES.
function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}

// ERROR HANDLER
function handleError(error) {
  console.warn(error);
  return null;
}

// MEGA API
function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

// SORTING PLAYERS
function sortPlayers(players) {
  return players.sort(function (a, b) {
    return b.score - a.score;
  });
}

export default {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  }
};