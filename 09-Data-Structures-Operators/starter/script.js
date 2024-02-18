'use strict';

const weekday = ['sat'];
const hours = {
  mon: {
    open: 12,
    close: 22,
  },
  tue: {
    open: 11,
    close: 23,
  },
  wed: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (startIndex, endIndex) {
    return [this.starterMenu[startIndex], this.starterMenu[endIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 1,
    time = '00:00',
    address,
  }) {
    // console.log(obj.address);
    console.log(`Destructuring Function displays`);
    console.log(address);
    console.log(time);
    console.log(this.mainMenu[starterIndex]);
    console.log(this.mainMenu[mainIndex]);
  },

  // After ES6 (Enhanced Object literal)
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },
  // Before ES6
  orderPizza: function (mainIngredient, ...otheIngredients) {
    console.log(mainIngredient, otheIngredients);
  },

  openingHours: {
    [`day - ${0}`]: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    [weekday[0]]: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  // Before ES6 to include outside objects (object literal)
  // hours: hours,

  // After ES6 (Enhanced Object literal)
  hours,
};

/////////////////////////////////
//  DESTRUCTURING ARRAYS
/*
const arr = [0, 1, 2];

const [x, y, z] = arr;
console.log(x, y, z);

let [first, , third] = restaurant.categories;
console.log(first, third);
// Swapping
[first, third] = [third, first];
console.log(first, third);
// Receive 2 return values from a function
const [startCourse, endCourse] = restaurant.order(0, 1);
console.log(startCourse, endCourse);
// nested
const nested = [2, 4, [5, 6]];
const [i, , [k, j]] = nested;
console.log(k, j);
// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
/////////////////////////////////////

/////////////////////////////////////
// DESTRUCTURING OBJECTS
/*
const { name, categories, mainMenu } = restaurant;
console.log(name, categories, mainMenu);
// Renaming
const {
  name: restaurantName,
  categories: tags,
  mainMenu: restaurantMenu,
} = restaurant;
console.log(restaurantName, tags, restaurantMenu);
// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
// Mutating variables
let a = 111;
let b = 222;
const obj = { a: 23, b: 12, c: 11 };
({ a, b } = obj);
console.log(a, b);
// Nested Objects
const { fri } = restaurant.openingHours;
console.log(fri);

const {
  fri: { open: o, close: c },
} = restaurant.openingHours;
console.log(o, c);

// Destructuring in function
restaurant.orderDelivery({
  time: '22:30',
  address: 'via del sole. 21',
  mainIndex: 2,
  starterIndex: 1,
});

restaurant.orderDelivery({
  address: 'via del sole. 21',
});
*/
/////////////////////////////////////

/////////////////////////////////////
//SPREAD OPERATOR
/*
const arr1 = [11, 12, 13];
const newArr1 = [1, 2, 3, ...arr1];
console.log(newArr1);
console.log(...newArr1);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);
// copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);
// Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);
//Iterables : array, string, map, set . (NOT Objects)
const str = 'Aashish';
const letter = [...str, ' ', ' S'];
console.log(letter);
// calling function & adding argument using spread operator
const ingredients = [
  prompt(`Let's make pasta! Ingredient 1 ?`),
  prompt(`Ingredient 2 ?`),
  prompt(`Ingredient 3?`),
];
restaurant.orderPasta(...ingredients);
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// Creating a new object with additional & existing properties
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);
// Object copy
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Roma restaurant';
console.log(restaurantCopy);
console.log(restaurant);
*/
/////////////////////////////////////

/////////////////////////////////////
// SPREAD VS REST

// Spread, because on RIGHT side of '='
/*
const arr = [1, 2, ...[3, 4]];
console.log(arr);
// Rest, because on LEFT side of '='
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);
// arrays
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
// Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
const x = [11, 12, 13, 14];
add(...x);

restaurant.orderPizza('mushroom', 'onion', 'olives', 'panner');
*/
/////////////////////////////////////

/////////////////////////////////////
// NULLISH COALESCING OPERATOR(??)

// Nullish : Undefined and null (not 0 or ' ')
/*
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/
/////////////////////////////////////

/////////////////////////////////////
// LOGICAL ASSIGNMENT
/*
const guest1 = {
  name: 'radha',
  numGuests: 20,
};

const guest2 = {
  name: 'capri',
  owner: 'Giovanni',
};

// OR ASSIGNMENT
guest1.numGuests = 0;
guest1.numGuests ||= 10;
guest2.numGuests ||= 10;
console.log(guest1, guest2);
// NULLISH ASSIGNMENT (null and undefined ->FALSY)
guest1.numGuests = 0;
guest1.numGuests ??= 10;
guest2.numGuests ??= 10;
console.log(guest1, guest2);
// AND ASSIGNMENT (To reassign a truthy value)
guest1.owner &&= '<anonymous>';
guest2.owner &&= '<anonymous>';
console.log(guest1, guest2);
*/
/////////////////////////////////////

/////////////////////////////////////

//FOR-OF-LOOP
/*
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
for (const item of menu) {
  console.log(item);
}
// To get index
for (const item of menu.entries()) {
  console.log(item);
}
// Destructuring
for (const [i, el] of menu.entries()) {
  console.log(`${i} : ${el}`);
}
*/

/////////////////////////////////////

/////////////////////////////////////
//OPTIONAL CHAINING

/*
// objects
console.log(
  restaurant.openingHours.mon?.open ?? restaurant.openingHours.fri?.open
);
//methods
console.log(restaurant.order?.(0, 1) ?? `no method exists`);
console.log(restaurant.orderJam?.(0, 1) ?? `no method exists`);
// arrays
let user = ['aashish', 'bob'];
user = [];
console.log(user?.[0] ?? `user array empty`);
*/

/////////////////////////////////////

/////////////////////////////////////
//OBJECT -Keys, values, objects

/*
const key = Object.keys(restaurant.openingHours);
// console.log(key);
const value = Object.values(restaurant.openingHours);
// console.log(value);
const entry = Object.entries(restaurant.openingHours);
for (const [key, { open, close }] of entry) {
  console.log(`On ${key} restaurant opens at ${open} and closes at ${close}`);
}
*/

/////////////////////////////////////

/////////////////////////////////////
// SETS

/*
let orderSets = new Set(['pizza', 'pizza', 'pasta', 'pizza', 'pasta']);
console.log(orderSets);
orderSets.add('ice cream');
console.log(orderSets);
console.log(orderSets.size);
orderSets.delete('pizza');
console.log(orderSets.has('pasta'));
// orderSets.clear();
console.log(orderSets);

const staff = ['waiter', 'chef', 'manager', 'waiter', 'manager', 'waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
*/

/////////////////////////////////////

/////////////////////////////////////
// MAPS

/*
const rest = new Map();
rest.set('name', 'classico italiano');
rest.set(1, 'Lisbon, Portugal');
rest.set(2, 'Chennai,India');

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', '00:00')
  .set('close', '10:00')
  .set(true, 'We are open');
console.log(rest);
console.log(rest.get(1));
console.log(rest.get('name'));
console.log(rest.has(2));
rest.delete(2);
console.log(rest.has(2));
console.log(rest.size);
// rest.clear();
const demoArr = [1, 2];
rest.set(demoArr, 'test');
console.log(rest.get(demoArr));
rest.set(document.querySelector('h1'), 'Heading');

//Another way of creating map
const question = new Map([
  ['question', 'What is the most voted favourite language'],
  [1, 'C'],
  [2, 'python'],
  [3, 'C++'],
  ['correct', 2],
  [true, 'Correct'],
  [false, 'Try again!!'],
]);
// convert object to map
console.log(new Map(Object.entries(restaurant.openingHours)));
console.log(question);
// Maps:Iteration
// Quiz APP
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key == 'number') console.log(`Answer ${key} : ${value}`);
}
const yourAnswer = Number(prompt('Your Answer'));
console.log(yourAnswer);
if (yourAnswer === question.get('correct')) console.log(question.get(true));
else console.log(question.get(false));
// Convert map to arr
console.log([...question]);
*/
/////////////////////////////////////

/////////////////////////////////////
// STRINGS

/*
const airline = 'TAP Air Portugal';
const plane = 'B737';

console.log(plane[0]);
console.log('A320'[0]);
console.log(airline.length);
console.log(airline.indexOf('Portugal'));
console.log(airline.slice(1, 7));
console.log(airline.slice(airline.indexOf(' ') + 1));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
//Fix capitalization in name (joNaS = Jonas)
const FixingCapitalization = function (name) {
  const lowerCaseName = name.toLowerCase();
  const correctName = lowerCaseName[0].toUpperCase() + lowerCaseName.slice(1);
  console.log(correctName);
};
FixingCapitalization('AasHIshKuMAr');
FixingCapitalization('joNaS');
// To remove whitespaces
console.log(' Excess white space to be removed   '.trim());
// Replace
const myErrorName = 'aashishkumar';
console.log(myErrorName);
const myNameCorrected = myErrorName.replace('kumar', ' S').replace('a', 'A');
console.log(myNameCorrected);
const announcement = 'All come to door 23 , door 23!!';
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));
// Booleans
const planeName = 'A320Neo';
console.log(planeName.includes('A320'));
console.log(planeName.includes('Air '));
console.log(planeName.endsWith('Neo'));
// split
console.log('this+is+concatenation'.split('+'));
const [first_name, last_name] = 'aashish kumar'.split(' ');
console.log(first_name, last_name);
// join
console.log(['this', 'is', 'fascinating'].join('-'));
// padding
console.log('jonas'.padStart(10, '+').padEnd(20, '+'));

const mask = function (code) {
  const pincode = String(code);
  const visiblePin = pincode.slice(-4);
  return visiblePin.padStart(pincode.length, '*');
};
console.log(mask(1234567890123));
// Repeat
const weatherMsg = 'Bad weather... All depatures delayed !!';
console.log(weatherMsg.repeat(5));
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CHALLENGE

// STRING METHOD PRACTICE

// Data needed for a later exercise
/*
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const lines = flights.split('+_');
for (const line of lines) {
  let word = line.split(';');
  let startingKey = word[0].split('_').join(' ').trim();
  let startPoint = word[1].toUpperCase().slice(0, 3);
  let EndPoint = word[2].toUpperCase().slice(0, 3);
  let time = word[3].replace(':', 'h');

  if (
    startingKey === 'Delayed Departure' ||
    startingKey === 'Delayed Arrival'
  ) {
    console.log(
      `🔴 ${startingKey} from ${startPoint} to ${EndPoint} (${time})`
    );
    console.log();
  } else {
    console.log(
      `${startingKey} from ${startPoint} to ${EndPoint} (${time})`.padStart(
        44,
        ' '
      )
    );
  }
}
*/
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
// 🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// CHALLENGE 4

// camel_notation;
// first_name;
// some_variable;
// calculate_AGE;
// delayed_departure;
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const textArray = String(new Array(text));
  const splitArray = textArray.split('\n');
  for (let [idx, item] of splitArray.entries()) {
    const [first_l, second_l] = item.split('_');
    const finalLetter =
      first_l.toLowerCase() +
      second_l[0].toUpperCase() +
      second_l.slice(1).toLowerCase();
    const final = finalLetter.padEnd(20, ' ') + '✅'.repeat(idx + 1);
    console.log(final);
  }
});
*/

// CHALLENGE-3

/*
const gameEvents = new Map([
  [17, 'Goal'],
  [36, 'Substitution'],
  [47, 'Goal'],
  [61, 'Substitution'],
  [64, 'Yellow card'],
  [69, 'Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, 'Goal'],
  [80, 'Goal'],
  [92, 'Yellow card'],
]);

const gameArr = [...new Set(gameEvents.values())];
console.log(gameArr);
gameEvents.delete(64);
console.log(gameEvents);
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
for (const [time, event] of gameEvents) {
  console.log(
    `${time < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${time} :${event}`
  );
}
*/
