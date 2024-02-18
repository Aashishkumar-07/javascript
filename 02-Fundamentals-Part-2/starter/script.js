"use strict";

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("i can drive");

const private = "";
*/

// FUNCTION DECLARATION
console.log(ageCalc1(2003));
function ageCalc1(birthYear) {
  return 2023 - birthYear;
}

// FUNCTION EXPRESSION
const ageCalc2 = function (birthYear) {
  return 2023 - birthYear;
};
console.log(ageCalc2(2003));

// ARROW FUNCTION
// one parameter and one line of code
const ageCalc3 = (birthYear) => 2023 - birthYear;
console.log(ageCalc3(2003));

// multiple parameter and multiple line of code
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2023 - birthYear;
  const retirementAge = 65 - age;
  return `${firstName} will retire in ${retirementAge} years`;
};
console.log(yearsUntilRetirement(2003, "aashish"));

// ARRAYS

/*const arr1 = new Array("micheal", "raj", "david");
const arr2 = ["micheal", 120, 98 - 10, arr1];
console.log(arr1, arr2);
console.log(arr2[0]);
console.log(arr2.length);*/

// ARRAY METHODS

// Add
/*
const friends = ["micheal", "joe", "sid"];
const newLen = friends.unshift("amrith"); // First
console.log(friends);
console.log(newLen);
friends.push("zoe"); // Last
console.log(friends);

//Remove
const removedElm = friends.pop(); // Last
console.log(removedElm);
console.log(friends);
friends.shift(); // First
console.log(friends);

// others
console.log(friends.indexOf("mic"), friends.indexOf("sid"));
console.log(friends.includes("mic"), friends.includes("sid"));
*/

// Dictionaries or objects
/*
const personInfo = {
  firstName: "aashish",
  lastName: "kumar",
  age: 2023 - 2003,
  friends: ["ram", "micheal", "joe"],
};

console.log(personInfo);
console.log(personInfo["age"], personInfo.firstName);
personInfo["lastName"] = "Srinivasan";
personInfo.firstName = "Aashishkumar";

personInfo["location"] = "Chennai";
console.log(personInfo);

// BRACKET NOTATION VS DOT NOTATION
// improper result for dot notation (undefined)
const interestedIn = prompt(
  "select one from firstName, lastName, age, friends, location"
);
console.log(personInfo[interestedIn]);
console.log(personInfo.interestedIn);

const nameKey = "Name";
console.log(personInfo["first" + nameKey]);
console.log(personInfo.first + nameKey);

console.log(
  personInfo.firstName + ` has ` + personInfo.friends.length,
  `friends, and his best friend is called`,
  personInfo.friends[0]
);
*/

// OBJECT METHODS --> this keyword
/*
const personInfo = {
  firstName: "aashish",
  lastName: "kumar",
  birthYear: 2003,
  friends: ["ram", "micheal", "joe"],
  hasDriversLicense: true,
  calAge: function (birthYear) {
    return 2023 - birthYear;
  },

  calAge1: function () {
    console.log(this);
    return 2023 - this.birthYear;
  },

  calAge2: function () {
    this.age = 2023 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    this.summary = `${
      this.firstName
    } is a ${this.calAge2()} yaer old student, and he has ${
      this.hasDriversLicense ? `a ` : `no `
    }driver's license`;
    return this.summary;
  },
};

console.log(personInfo.calAge(personInfo.birthYear));
console.log(personInfo.calAge1());
console.log(personInfo.calAge2());
console.log(personInfo.age);
console.log(personInfo.getSummary());
console.log(personInfo.summary);
// shows the object in table form
console.table(personInfo);
*/

// LOOPS
/*
for (let i = 0; i < 10; i++) {
  console.log(`The number is ${i}`);
}

let i = 1;
while (i < 10) {
  console.log(`using WHILE LOOP The number is ${i}`);
  i = i * 2;
}
*/

const printForecast = function (arr) {
  let outputStr = " ";
  outputStr += "...";
  for (let i = 0; i < arr.length; i++) {
    outputStr += `${arr[i]}C in ${i + 1} days...`;
  }
  return outputStr;
};

console.log(printForecast([17, 21, 23]));
