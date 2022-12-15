const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  // URL for retrieving IPv4 IP address in JSON format
  // https://api.ipify.org?format=json
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // print error if one occured
    let ip;
    if (!error) {
      ip = JSON.parse(body).ip;
    }

    callback(error, ip)
  })
};

// const { fetchMyIP } = require('./iss');

let callbackFn = function(error, ip){
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
};

fetchMyIP(callbackFn);

module.exports = { fetchMyIP };
