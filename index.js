const request = require('request');
const argv = require('yargs').argv;

let city = argv.c || 'portland';
let apiKey = process.env.APIKEY;
let url = `http://api.openweathermap.org/data/2.5/weather?&units=imperial&q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    //console.log(body); // Debugging
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name} and the min temperature is ${weather.main.temp_min} degrees and the max temperature is ${weather.main.temp_max} degress.`;
    console.log(message);
  }
});

