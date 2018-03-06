import axios from "axios";

// SIGNED UP API
const id = "YOUR_CLIENT_ID"
const sec = "YOUR_CLIENT_SECRET"
const params = " ? client_id=" + id + "&client_secret=" + sec;

// GET A PROFILE
function getProfile(username) {
  return axios
    .get('https://api.github.com/users/' + username + params)
    .then(function (user) {
      return user.data
    })
}
// GET THEIR REPOS AND RETURN 100 REPOS PER PAGE.
function getRepos(username) {
  return axios
    .get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
    .then(function (user) {
      return user.data
    })
}

// GET THEIR STARS TOTAL PER REPO
function getStarCount(repos) {
  return repos
    .data
    .reduce(function (count, repo) {
      return count + repos.stargazers_count;
    }, 0);
}

// ALGORITHM CALCULATES THE TOTAL SCORES.
function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}

// ERROR HANDLER
function handleError(error) {
  console.warn(error);
  return null;
}

// MEGA API
function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)])
    .then(function (data) {
      const profile = data[0];
      const repos = data[1];
      return {
        profile: profile,
        score: calculateScore(profile, repos)
      }

    })
}

// SORTING PLAYERS
function sortPlayers(players) {
  return players.sort(function (a, b) {
    return b.score - a.score
  })
}

export default {

  battle : function (players) {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos : function (language) {
    //
    const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
    // THIS GET REQUEST RETURNS A PROMISE, THATS WHY WE TACK ON THE .THEN METHOD TO
    // PARSE THE RESPONSE
    return axios
      .get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  }
};