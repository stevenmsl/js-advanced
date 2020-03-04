import "../assets/css/style.css";

const app = document.getElementById("app");
app.innerHTML = "<h1>Advanced JavaScript</h1>";

/* scopes */

var x = 10;
console.log(x);
console.log(window.x);

// local and global

var currentLoc = "World"; // global
var kmTraveled = 0; //global

function toContinent(continent) {
  var currentLoc = continent; // local
  kmTraveled += 1000; // global
  var continent_specific = "10 days";

  console.log(currentLoc, kmTraveled, continent_specific);
}
// You can’t see continent_specific (local scope defined in the toContinent function) in the global scope
console.log(currentLoc, kmTraveled, typeof continent_specific); // World, 0, undefined
toContinent("America"); // America, 1000, 10 days
console.log(currentLoc, kmTraveled); // World, 1000

// block scope
// var countries =

/* End - scopes */

/*  tagged templates.
    tags allow you to parse template literals with a function */

/*
var name = "steve";
var place = "van";
var greeting = "Welcome";
// h1 is a tag function
function h1(strings, ...values) {
  // the ‘strings’ parameter is an array consisting of the following elements
  // 0: ""
  // 1: " "
  // 2: "! You are in "
  // 3: ""
  console.log(strings);
  // rest operator is used so the values
  // can be treated as an array
  // ["Welcome", "steve", "van"]
  console.log(values);
  let result = "<h1>";
  const count = strings.length;
  for (var i = 0; i < count; i++) {
    result += strings[i];
    // assumption here is that strings.length -1  === values.length
    // is always true
    if (i !== count - 1) {
      result += values[i];
    }
  }
  result += "</h1>";
  return result;
}

// this is just a function call - only the syntax is a bit different
// There are 3 placeholders in the template: ${greeting}, ${name}, and ${place}, and
// they will be used as delimiter to break down the template into an
// array of strings.
// So in this case the template will be broken down to 4 pieces of
// string, which will be packed in an array passing in as the first
// parameter to the h1 function.

console.log(h1`${greeting} ${name}! You are in ${place}`);
*/
/* End - tagged templates */

/* 
  Rest and spread operators        
*/

/*
// rest operator (...) : put the remaining parameters into an array
function login(method, ...options) {
  console.log(arguments); // looks like an array but it isn’t, so you can’t use slice method on it
  console.log(method);
  console.log(options);
}

login("fb", 1, 2, 3); // fb, [1,2,3]

var opts = [1, 2, 3];

// opts, which is an array itself, will be put into an array
// as the first element by the rest operator - this is probably
// not what you intend to do
login("fb", opts); // fb, [[1,2,3]]

// use the spread operator to fix the above problem
login("fb", ...opts); // fb, [1,2,3]

*/

/* 
  End - Rest and spread operators        
*/
