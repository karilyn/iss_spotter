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
      // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
      // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    let ip = JSON.parse(body).ip;

    callback(null, ip);

  })
};

const fetchCoordsByIP = function(ip, callback) {
  // inputs are the ip address string, and a callback to either pass back error or data
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
  // print an error if something is not successful
  if (error) {
      callback(error, null);
      return
    }
    // turn it into an object
    const parsedBody = JSON.parse(body);
    // looking for success, otherwise print the error message
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const { latitude, longitude } = parsedBody;
    callback(null, {latitude, longitude});

  })
}


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};
