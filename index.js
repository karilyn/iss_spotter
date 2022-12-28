// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// let ip = '173.181.44.80';
// fetchCoordsByIP(ip, (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(data);
// });

// const coords = { latitude: 50.998115, longitude: -118.195672 }
// fetchISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     console.log("Didn't work!", error);
//     return;
//   }
//   console.log('Success! ISS flyover times: ', data);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work: ", error);
  }
  // if success, here we go
  printPassTimes(passTimes);
});


module.exports = { printPassTimes };