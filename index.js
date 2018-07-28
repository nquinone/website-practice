/*NOTE: when referring to variables in string we use template literal syntax i.e. back-ticks (``) instead of single or double quotes e.g.
`String text ${a+b}`
NOTE: Const used for identifiers that are not reassignable (however this does not mean that is immutable as an object of this type can have its
properties mutated), let is for variables that are reassignable, var may or may not be reassignable and may or may not be used for an entire function
generally the weakest in ES6 standards and should be avoided as let can be used in virtually every situation that var can be used
 */
const request = require('request');
//yargs is a cli that allows us to define variables from the command line
const argv = require('yargs').argv;

let apiKey = '20d447ef9d36ac60ad37caf70f512fac';
let city = argv.c || 'portland';
//syntax for query parameters: ? followed by key/value pairs separated by &'s
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

request(url, function (err, response, body) {
  if(err){
    console.log('error:', err);
  } else {
    //body of response is JSON (JavaScript Object Notation) so we can parse it and store in object
    let weather = JSON.parse(body);
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
});
