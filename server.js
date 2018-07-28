//first we require the express package installed as a dependency in this project dir and create an instance app by invoking express
const express = require('express');
const app = express();

//when routed to root URL express responds with Hello World!
app.get('/', function(req, res){
  res.send('Hello World!');
})

//creating a server listening in on port 3000
app.listen(3000, function(){
  console.log('Listening in on port 3000...');
})
