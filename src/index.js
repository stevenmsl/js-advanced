import "../assets/css/style.css";

const app = document.getElementById("app");
app.innerHTML = "<h1>Advanced JavaScript</h1>";

/* 
  Rest and spread operators        
*/

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
// that what you intend to do
login("fb", opts); // fb, [[1,2,3]]

// use the spread operator to fix the above problem
login("fb", ...opts); // fb, [1,2,3]

/* 
  End - Rest and spread operators        
*/
