import axios from "axios";

export default {
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