'use strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freentryancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
console.log(budget);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// You will get an error bcz of Object.freeze() on spendingLimits
// spendingLimits.jay = 200;

const getLimit = (limits, user) => (limits[user] ? limits[user] : 0);

// Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'Jonas'
) {
  const cleanUser = user.toLowerCase();
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 100, 'Pizza 🍕');
console.log(newBudget1);
//prettier-ignore
const newBudget2 = addExpense(newBudget1, spendingLimits,100,'Going to movies 🍿','Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  return state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => `${entry.description.slice(-2)} `)
    .join('/ ');
};

console.log(logBigExpenses(newBudget3, 500));
