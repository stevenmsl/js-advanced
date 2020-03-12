//import "../assets/css/style.css";

const app = document.getElementById("app");
app.innerHTML = "<h1>Advanced JavaScript</h1>";

/* oop : classical inheritance */
/*
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.fullName_base = function() {
  return `${this.firstName} ${this.lastName}`;
};

function Employee(firstName, lastName, jobTitle) {
  Person.call(this, firstName, lastName);
  this.jobTitle = jobTitle;
}

// Don’t treat Employee or Person as the same concept of classes in the classical inheritance.
// Employee is not a subclass of Person per se. There are merely functions that define the logic
// to add properties to "this". You want to construct a chain so that the new objects
// can search up the chain to find the methods defined both in the Employee and Person’s prototype property,
// and to be both an instance of Employee and Person.
// Note that when you use ‘new’ keyword to create an object from Employee,
// the new object’s _proto__ will point to Employee’s prototype.
Employee.prototype = Object.create(Person); // wrong, won’t achieve inheritance
var arloFake = new Employee("Arlo", "Lin", "CEO");
console.log("arloFake is an instance of Person:", arloFake instanceof Person); // false
console.log(typeof arloFake.fullName === "undefined"); // false,
console.log(typeof arloFake.fullName_base === "undefined"); // true

// This is the key to achieve classical inheritance
Employee.prototype = Object.create(Person.prototype);
var arloReal = new Employee("Arlo", "Lin", "CEO");
console.log("arloReal is an instance of Person:", arloReal instanceof Person); // true
// You can’t see any functions or properties added directly to Person,
// and therefore you can’t treat it like a class.
console.log(typeof arloReal.fullName === "undefined"); // true,
//
console.log(typeof arloReal.fullName_base === "undefined"); // false

Employee.prototype.nameAndTitle = function() {
  return `${this.firstName} ${this.lastName} ${this.jobTitle}`;
};

// arlo is an instance of employee
//
var arlo = new Employee("Arlo", "Lin", "Owner");

console.log(arlo instanceof Employee); // true
console.log(arlo instanceof Person); // true
console.log(arlo.nameAndTitle()); // Arlo Lin Owner

*/
/* end - oop: classical inheritance */

/* oop : new keyword */
/*
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.isWizard = false; // not visible to subclasses (arlo)

Person.prototype.isWizard_base = true; // visible to subclasses (arlo)

Person.__proto__.isWizard_proto = true;

// you can think of the new keyword is performing the following tasks:
// - create a new object and set its properties by calling Person function
// - point the new object’s __proto_ to Person’s prototype property
// - return the new object

var arlo = new Person("Arlo", "Lin");
// from base class perspective

// isWizard_base is not visible to Person
console.log(typeof Person.isWizard_base === "undefined"); //true
console.log(Person.isWizard_proto); //true

// from subclass perspective
console.log(arlo.__proto__ === Person.prototype); // true
console.log(typeof arlo.isWizard === "undefined"); // true
console.log(arlo.isWizard_base); // true
*/
/* end - oop */

/* this */
/* need to revisit */
/*
console.log(this);
this.level = 0;

var wizard = {
  level: 100,
  reportLevel: function() {
    console.log(this.level);
  },
  reportLevelArrowFunc: () => {
    console.log(this.level);
  }
};

var firstOrderWizard = {
  level: 1000
};

wizard.reportLevel(); // 100
wizard.reportLevelArrowFunc(); // 0
var reportLevel = wizard.reportLevel;
var reportLevelArrowFunc = wizard.reportLevelArrowFunc;
reportLevel(); // undefined – which is weird. I am expecting it’s 0
reportLevelArrowFunc(); // 0
//this.reportLevel = wizard.reportLevel;
// this.reportLevel(); // 0
firstOrderWizard.myLevel = wizard.reportLevel;
firstOrderWizard.myLevelArrowFunc = wizard.reportLevelArrowFunc;
firstOrderWizard.myLevel(); // 1000
firstOrderWizard.myLevelArrowFunc(); // 0
*/
/* end this */

/* closure */
/*
const countries = ["Canada", "US", "Mexico"];
var funcs = [];
var funcs2 = [];

function trackLocs() {
  let loc = "";
  for (let i = 0; i < countries.length; i++) {
    loc = countries[i];
    console.log("in trackLocs: ", loc); // Canada, US, Mexico
    funcs.push(function() {
      // just a reference back to the variable
      // loc declared in this function
      console.log(loc);
    });

    funcs2.push(
      (loc => {
        return function() {
          console.log(loc);
        };
      })(loc) // call the anonymous function right away
      // to introduce another scope that is visible to the function, which will be push to the array, returned by it
    );
  }
}
// The loc is set to ‘Mexico” before the function exits.
// Since there are still functions in the funcs array
// referencing the ‘loc’ variable will not be destroyed as it still being referenced.
trackLocs();
console.log(funcs); // pay attention to the scopes
funcs[0](); // Mexico
funcs[1](); // Mexico
funcs[2](); // Mexico
console.log(funcs2); // pay attention to the scopes
funcs2[0](); // Canada
funcs2[1](); // US
funcs2[2](); // Mexico

*/
/* End - closure */

/* scopes */

/*
// scope and window properties
var x = 10;
console.log(x);
console.log(window.x); // not works as expected – it prints out undefined. webpack?

// function and global scopes

var currentLoc = "World"; // global
var kmTraveled = 0; //global

function toContinent(continent) {
  var currentLoc = continent; // function
  kmTraveled += 1000; // global
  var continent_specific = "10 days";

  console.log(currentLoc, kmTraveled, continent_specific);
}
// You can’t see continent_specific (local scope defined in the toContinent function) in the global scope
console.log(currentLoc, kmTraveled, typeof continent_specific); // World, 0, undefined
toContinent("America"); // America, 1000, 10 days
console.log(currentLoc, kmTraveled); // World, 1000

// block scope
console.log("--- block scope ---");
var countries = ["Canada", "US", "Mexico"];
for (var i = 0; i < countries.length; i++) {
  console.log(countries[i]);
}
console.log(i);
for (let j = 0; j < countries.length; j++) {
  console.log(countries[j]);
}
console.log(typeof j === "undefined"); //true, as j only exists in the for loop block
*/

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
