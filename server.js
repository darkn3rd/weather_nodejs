const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = process.env.APIKEY;
const appPort = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        //let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name} and the min temperature is ${weather.main.temp_min} degrees and the max temperature is ${weather.main.temp_max} degress.`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(appPort, function () {
  console.log(`Example app listening on port ${appPort}!`)
})