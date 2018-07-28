//first we require the express package installed as a dependency in this project dir and create an instance app by invoking express
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const apiKey = '20d447ef9d36ac60ad37caf70f512fac';

//SET UP:
/*----------------------------------------------------------------------------------------------------------------------------------------------------*/
//allows us to access all of the static files inside of the public folder
app.use(express.static('public'));
//allows us to gain access to req.body object
app.use(bodyParser.urlencoded({extended: true}));
/*using ejs (embedded javascript) as template engine so that we can use static template files that at runtime resolves variables with actual
values*/
app.set('view engine', 'ejs');
/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

//ROUTING && SERVER CREATION
/*----------------------------------------------------------------------------------------------------------------------------------------------------*/
//when routed to root URL express responds with Hello World!
app.get('/', function(req, res){
  //render allows us to render our view
  res.render('index', {weather: null, error: null});
})

//posting from the form in our html, we will use middleware here (allows us to access information stored in req and res)
//NOTE: after we post we will use EJS in our index.ejs view to handle the situations with variables we are passing to it
app.post('/', function(req, res){
  let city = req.body.city;
  //syntax for query parameters: ? followed by key/value pairs separated by &'s
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, function (err, response, body) {
    if(err){
      res.render('index',{weather:null, error:'Error, please try again.'});
    } else {
      //body of response is JSON (JavaScript Object Notation) so we can parse it and store in object
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        res.render('index', {weather:null, error: 'Error, please try again'});
      } else {
        let weatherText= `It's ${weather.main.temp} degrees in ${weather.name}!`
        res.render('index', {weather:weatherText, error:null})
      }
    }
  });
  console.log(req.body.city);
})
//creating a server listening in on port 3000
app.listen(3000, function(){
  console.log('Listening in on port 3000...');
})
/*----------------------------------------------------------------------------------------------------------------------------------------------------*/
