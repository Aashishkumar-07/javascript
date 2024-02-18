'use strict';

//////////////////////////////////////////////////////////////////
// DEFAULT PARAMETERS

/*
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  //   numPassengers = numPassengers || 1;
  //   price ||= 199 * numPassengers;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH921');
createBooking('LH921', 5, 100);
createBooking('LH921', 5);
createBooking('LH921', 2);
createBooking('LH921', undefined, 1000);
*/

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// FUNCTIONS ACCEPTING CALLBACK FUNCTION

/*
// CALLBACK FUNCTIONS
const oneWord = function (word) {
  return word.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (word) {
  const [firstWord, ...other] = word.split(' ');
  return [firstWord.toUpperCase(), ...other].join(' ');
};
//HIGHER ORDER FUNCTION
const transform = function (str, fn) {
  console.log(`Original string : ${str}`);
  console.log(`String after callback :${fn(str)}`);
  console.log(`Function name : ${fn.name} `);
};
transform('Javascript is the best ', oneWord);
transform('Javascript is the best', upperFirstWord);
// JS uses callback all the time due to abstraction
const highFive = () => console.log('The page got clicked ✋');
document.body.addEventListener('click', highFive);
[1, 2, 3].forEach(highFive);
*/

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// FUNCTIONS RETURNING FUNCTIONS

/*
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name} !!`);
  };
};

const greeterHey = greet('Hey');
greeterHey('James');
greet('Hey')('Mathew');
// CHALLENGE
const greetUsingArrow = greeting => name => console.log(`${greeting} ${name}`);
greetUsingArrow('Hey')('Jack');
*/

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// CALL AND APPLY AND BIND

/*
const airIndia = {
  plane: 'AirIndia',
  iataCode: 'AI',
  booking: [],
  book: function (name, planeNum) {
    this.booking.push(
      `Thankyou ${name} for booking ${this.iataCode}${planeNum} in ${this.plane}`
    );
  },
};

const emirates = {
  plane: 'Emirates',
  iataCode: 'EA',
  booking: [],
};

const singaporeAirlines = {
  plane: 'SingaporeAirlines',
  iataCode: 'SA',
  booking: [],
};

airIndia.book('Cam', 312);
// Call
const toBook = airIndia.book;
toBook.call(airIndia, 'James', 125);
toBook.call(emirates, 'Abdul', 451);
const passengerDetail = ['John', 191];
toBook.call(singaporeAirlines, ...passengerDetail);
// Apply
toBook.apply(emirates, passengerDetail);
//Bind
const toBookSA = toBook.bind(singaporeAirlines);
toBookSA('Sam', 986);
// Partial application
const toBookEACooper = toBook.bind(emirates, 'Cooper');
toBookEACooper(222);
toBookEACooper(111);
console.log(airIndia, emirates, singaporeAirlines);
// With event listners
const lufthansa = {
  plane: 300,
  buyPlane: function () {
    console.log(this);
    this.plane++;
    console.log(this.plane);
  },
};
// lufthansa.buyPlane();
// On clicking Buy new plane
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// Partial application
const fees = (feesAmt, name) => console.log(`${name} paid ${feesAmt}`);
fees(350000, 'raju');
const fees35L = fees.bind(null, 350000);
fees35L('sam');
*/

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// IMMEDIATELY INVOKED FUNCTION EXPRESSION

/*
//Functions to be executed / called only once
(function () {
  console.log('This will not run again');
  const isPrivate = 23;
})();
// arrow method
(() => console.log('This will not run again'))();
// data protection - cannot access isPrivate
// console.log(isPrivate);
// ES6 - can implement data protection using let/const
{
  let isPrivate_1 = 1;
  const isPrivate_2 = 10;
  var isNotPrivate = 100;
}
// console.log(isPrivate_1);
// console.log(isPrivate_2);
console.log(isNotPrivate);
*/

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// CLOSURE

/*
// Example-1
let f;
const g = function () {
  const a = 22;
  f = function () {
    console.log(a * 2);
  };
};
// Re-assigning function f
const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
// Re-assigning function f
h();
f();
console.dir(f);

// Example-2
const privateCounter = function () {
  let count = 0;
  console.log(`Initial value : ${count}`);
  return function () {
    count++;
    console.log(count);
  };
};
const incrementCount = privateCounter();
incrementCount();
incrementCount();
incrementCount();

// Example-3
const credit = (num => {
  let credits = num;
  console.log(`Initial credit : ${credits}`);
  return () => {
    credits--;
    if (credits > 0) console.log(`Credit score ${credits}..playing game`);
    else console.log('Credit not enough');
  };
})(3);

credit();
credit();
credit();
*/

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// CHALLENGE

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

//////////////////////////////////////////////////////////////////
