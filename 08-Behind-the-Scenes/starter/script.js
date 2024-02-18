'use strict';

/*
// PRIMITIVE TYPES
let lastName = 'williams';
let oldName = lastName;
lastName = 'Davis';
console.log(lastName, oldName);

// REFERENCE TYPES
const jessica = {
  age: 19,
  firstName: 'jessica',
  lastName: 'williams',
  favColor: ['white', 'black', 'brown'],
};

// SHALLOW COPY
const jessicaShallowCopy = jessica;
jessicaShallowCopy.lastName = 'James';
console.log(jessica, jessicaShallowCopy);

// DEEP COPY //
// ✅ OBJECT COPY WITHOUT NESTED OBJECTS
const jessicaDeepCopy = Object.assign({}, jessica);
jessicaDeepCopy.lastName = 'simson';

//❌ OBJECT COPY WITH NESTED OBJECT
jessicaDeepCopy.favColor.push('red');
console.log(jessica, jessicaDeepCopy);

// ✅OBJECT COPY WITH NESTED OBJECT
const jessicaDeepCopyNestedObj = structuredClone(jessica);
jessicaDeepCopyNestedObj.lastName = 'simson';
jessicaDeepCopyNestedObj.favColor.push('green');
console.log(jessica, jessicaDeepCopyNestedObj);
*/

////////////////////////////////////////////////////////////////////
// SCOPING

/*
const printAge = function (first_name) {
  let greeting = 'hi';
  if (true) {
    // redeclaring and creating a new first_name that is block scoped(if-block scope)
    let first_name = 'ravi';
    // let greeting = 'hey';
    console.log(`${greeting} ${first_name}`);
    // reassigning the greeeting that is outside if block
    greeting = 'vanakkam';
    console.log(`${greeting} ${first_name}`);
  }

  console.log(`${greeting} ${first_name}`);
};

let first_name = 'charan';
printAge(first_name);
*/

////////////////////////////////////////////////////////////////////
// HOISTING

/*
// variables
console.log(a);
console.log(b);
console.log(c);
var a = 'python';
let b = 'java';
const c = 'javascript';

// functions
console.log(funcDecl(2, 3));
console.log(funcExpr);
console.log(funcExpr(2, 3));
console.log(funcArrow(2, 3));
// hoisted
function funcDecl(a, b) {
  return a + b;
}
// hoisted(bcz of var) but funcExpr will be undefined and hence it is not a function
var funcExpr = function (a, b) {
  return a + b;
};
// not hoisted hence funcArrow is uninitailized
const funcArrow = (a, b) => a + b;

// Why not use var for variable declaration
console.log(numProduct);
if (!numProduct) deleteProduct();
var numProduct = 10;
function deleteProduct() {
  console.log(`all products deleted`);
}
*/

////////////////////////////////////////////////////////////////////
// THIS KEYWORD

/*
// object method and arrow function
const jonas = {
  name: 'ram',
  prop: function () {
    console.log(this);
    (() => console.log(this))();
  },
};
jonas.prop();
// Arrow function pointing to this keyword of parent (Window object)
(() => console.log(this))();
// function
const fnc = function () {
  console.log(this);
};
fnc();
*/

////////////////////////////////////////////////////////////////////
// ARROW FUNCTIONS VS REGULAR FUNCTION THIS KEYWORD PITFALLS

/*
var year = 2003;
const jonas = {
  year: 1991,
  calAge: function () {
    console.log(this);
    const age = 2023 - this.year;
    console.log(age);

    // Nested Function
    // Solution 1
    const self = this;
    const childFunc = function () {
      console.log(self);
      console.log(self.year);
    };
    childFunc();

    // Solution 2 - Arrow function
    const childFunc2 = () => {
      console.log('Arrow function\n');
      console.log(this, this.year);
    };
    childFunc2();
  },
  greet: () => console.log(this, this.year),
};
jonas.calAge();
jonas.greet();

// ARGUMENT KEYWORD
// Argument keyowrd  defined for regular function
const addFunc = function (a, b) {
  console.log(arguments);
  return a + b;
};
addFunc(1, 23);
addFunc(2, 4, 5, 6);
// Argument keyowrd not defined for arrow function
const arrFunc = (a, b) => {
  console.log(arguments);
  return a + b;
};
console.log(arrFunc(2, 4));
*/

///////////////////////////////////////////////////////////////////

let age = 30;
let oldAge = age;
age = 31;
console.log(ag);
