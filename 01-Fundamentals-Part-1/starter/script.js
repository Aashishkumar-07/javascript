let js = "amazing";
// if (js === "amazing") alert("js is fun!!");
// console.log(20 + 12);

// mathematical operator
const birthYear = 2003;
let age = new Date().getFullYear() - birthYear;
console.log(age);
console.log(age * 2, age / 2, 10 ** 2);

// Concatenation
const firstName = "Aashish";
const lastName = "kumar";
const fullName = firstName + lastName;
console.log(fullName);

console.log(typeof birthYear);

//Assignment operator
let x = 10;
console.log(x);
x += 1;
console.log(x);
x *= 2;
x++;
--x;
console.log(x);

// TEMPLATE LITERALS

console.log(`i'm "Aashish"`);
console.log(`this 
is 
a
multiline 
string`);
console.log(`the value of x is ${x}`);

// conditional statements

const currAge = 8;
if (currAge >= 18) {
  console.log("Eligible");
} else {
  console.log(`Eligible for license in ${18 - currAge} year`);
}

// TYPE CONVERSION
const year = "1991";
console.log(Number(year));
console.log(year);
const demoName = "jonas";
console.log(Number(demoName));
// NaN is a number but it is an illegal number
console.log(typeof NaN);
console.log(String(123));

// TYPE COERCION
console.log("I am " + 34);
console.log("23" - 10);
console.log("23" * "2");
console.log("23" * 2);

// == vs ===

// alert("heloo");
/*const favNumber = String(prompt("How old are you ?"));
console.log(typeof favNumber);
if (favNumber == 18) console.log(`loose equality`);
if (Number(favNumber) === 18) console.log(`strict eqaulity`);
if (favNumber != 18) console.log("loose inequality");
if (favNumber !== 18) console.log("strict inequality");
*/
// SWITCH STATEMENT

const currDay = "thursday";
switch (currDay) {
  case "monday":
    console.log("monday");
    break;
  case "tuesday":
    console.log("tuesday");
    break;
  case "wednesday":
  case "thursday":
    console.log("wednesday or thursday");
    break;
  case "friday":
    console.log("friday");
    break;
  default:
    console.log("default");
    break;
}

// TERNARY OPERATOR
const result = 15 > 12 ? `Greater` : `Smaller`;
console.log(result);
