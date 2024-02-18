'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, idx) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      idx + 1
    }  ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov, idx, arr) => acc + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = balance;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    console.log(acc.username);
  });
};
createUserNames(accounts);

const calcDsiplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // for every deposit the bank pays an interest of 1.2% only if interest amount>=1
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// REFACTORING
const updateUI = function (acc) {
  // Display movement
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDsiplaySummary(acc);
};

// USER LOGIN
// Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent from submitting
  e.preventDefault();
  // To avoid bug when sort button is clicked
  // If you login for an account, then sort and login to another account, sorting will not happen when you click on the sort button for the 1st time (It will work from 2nd click onwards).
  // This is because the variable 'sorted' remains unchanged (true) when logged in to another account. So for the 1st click, displayMovements will be called with sorted = false
  sorted = false;

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  }

  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  // input field loose focus
  inputLoginPin.blur();

  updateUI(currentAccount);
});

// OPERATION: TRANSFERS
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

// OPERATION: LOAN
// grants loan if there is 1 deposit which is atleast 10% of loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// OPERATION: CLOSE
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const enteredPin = Number(inputClosePin.value);

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === enteredPin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
});

// SORTING MOVEMENT
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

/////////////////////////////////////////////////
// FOR LOOPS
/////////////////////////////////////////////////

/*
console.log(`---Map Iteration---`);
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${value} : ${key}`);
});

console.log(`---Set Iteration---`);
const currenciesUnique = new Set([
  'USD',
  'GBP',
  'GBP',
  'EUR',
  'USD',
  'USD',
  'EUR',
]);

// Sets neither have key or index
currenciesUnique.forEach(function (value, _, sets) {
  console.log(`${value} : ${_}`);
});

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(`---for of---`);
for (let [idx, mov] of movements.entries()) {
  if (mov > 0) {
    console.log(`movement ${idx + 1} : deposited ${mov}`);
  } else {
    console.log(`movement ${idx + 1} : withdrawn ${Math.abs(mov)}`);
  }
}

console.log(`---forEach---`);
movements.forEach(function (mov, idx, arr) {
  if (mov > 0) {
    console.log(`movement ${idx + 1} : deposited ${mov}`);
  } else {
    console.log(`movement ${idx + 1} : withdrawn ${Math.abs(mov)}`);
  }
});
*/

/////////////////////////////////////////////////
// ARRAY METHODS
/////////////////////////////////////////////////

/*
// SLICE
console.log('---SLICE---');
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log([...arr]);

// SPLICE
console.log('----SPLICE----');
console.log(arr.splice(-1));
console.log(arr);
arr.splice(1, 0, 'q', 'z');
console.log(arr);
arr.splice(1, 1);
console.log(arr);
arr.splice(1, 1, 'B');
console.log(arr);

// REVERSE
console.log('---REVERSE---');
console.log(arr.reverse());
console.log(arr);

// CONCATENATION
console.log('---CONCATENATION---');
const arr2 = ['f', 'g', 'h'];
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join('-'));


// AT
let arr = [1, 2, 3];
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/

/////////////////////////////////////////////////
// map, reduce, filter, find
/////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
// MAP
const movementToINR = movements.map(function (mov) {
  return mov * 80;
});
// const movementToINR = movements.map(mov => mov * 80);
console.log(movementToINR);
const movementDescription = movements.map(
  (mov, idx, arr) =>
    `Movement ${idx + 1} : You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementDescription);

// FILTER
const deposits = movements.filter(function (mov, idx, arr) {
  return mov > 0;
});

const withdrawal = movements.filter(mov => mov < 0);
console.log(deposits);
console.log(withdrawal);

// REDUCE
const balance = movements.reduce(function (acc, curr, idx, arr) {
  return acc + curr;
}, 0);
console.log(balance);

const balanceArrw = movements.reduce((acc, curr, idx, arr) => acc + curr, 0);
console.log(balanceArrw);

const maxValue = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(maxValue);

// all methods in one line
const usdToInr = 81;
const totalDepositsInr = movements
  .filter(mov => mov > 0)
  .map(mov => mov * usdToInr)
  // .map((mov, idx, arr) => {
  //   console.log(`mov`, mov);
  //   return mov * usdToInr;
  // })
  .reduce((acc, mov) => acc + mov);
console.log(`Total deposit in INR : ${totalDepositsInr}`);

// FIND
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const accountRetrieval = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(accountRetrieval);

// SOME & EVERY

console.log(movements);
// equality
console.log(movements.includes(-130));
// condition : some
console.log(movements.some(mov => mov === -130));
console.log(movements.some(mov => mov > 1500));
// condition : every
console.log(movements.every(mov => mov > 0));
console.log(`account4 : ${account4.movements}`);
console.log(account4.movements.every(mov => mov > 0));
// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));


// flat and flatMap
const arr = [1, 2, [3, 4, 5], 6, 7, [8, 9]];
const arrDeep = [1, 2, [3, [4, 5]], 6, 7, [8, 9]];
// default depthness of flat method 1
console.log(arr.flat());
console.log(arrDeep.flat(), arrDeep.flat(2));

// flat wrt to Bankist app
const allMovements = accounts.map(acc => acc.movements).flat();
console.log(allMovements);
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const allMovements1 = accounts.flatMap(acc => acc.movements);
console.log(allMovements);
const overalBalance1 = allMovements1.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance1);

// SORTING
// strings
const owners = ['jonas', 'zach', 'adam', 'martha'];
console.log(owners.sort());
// Numbers
// Getting wrong answer
console.log(movements.sort());
// Getting correct answer
// a>b return positive (swap order)
// a<b return negative (keep order)
// ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);
// descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
// movements.sort((a, b) => b - a);
console.log(movements);


// Fill
console.log([1, 2, 3, 4, 5], new Array(10, 20, 30));
const x = new Array(10);
console.log(x);
x.fill(1, 2, 5);
console.log(x);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);
const z = Array.from({ length: 10 }, (_, idx) => idx + 1);
console.log(z);

labelBalance.addEventListener('click', function (e) {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log(movementsUI);
  console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
});
*/

//////////////////////////////////////////////////////////////
// Array methods practice

/*
// 1.
const totalBankDeposit = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalBankDeposit);

// 2.
const depositGreater1000Count = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000)
  .reduce((acc, mov) => ++acc, 0);
// const depositGreater1000Count = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
console.log(depositGreater1000Count);

// 3
const sum = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, mov) => {
      acc[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
      return acc;
    },
    {
      deposits: 0,
      withdrawals: 0,
    }
  );
console.log(sum);

// 4
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:*/

/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// Refactoring
const correctFoodRange = function (dog) {
  return (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  );
};

// 1
const recommendedFoodPortion = function (dogs) {
  dogs.forEach(function (dog) {
    return (dog.recommendedFood = (dog.weight ** 0.75 * 28).toFixed(2));
  });
};
recommendedFoodPortion(dogs);
console.log(dogs);

// 2
const findSarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
const SarahDogConsumption = correctFoodRange(findSarahDog)
  ? 'Eating correct'
  : findSarahDog.curFood > findSarahDog.recommendedFood
  ? 'Eating too much'
  : 'Eating too little';
console.log(SarahDogConsumption);

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4
console.log(
  `${ownersEatTooMuch
    .map(owner => `${owner} and`)
    .join(' ')
    .slice(0, -3)
    .trimEnd()}'s dogs eat too much`
);
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);

console.log(
  `${ownersEatTooLittle
    .map(owner => `${owner} and`)
    .join(' ')
    .slice(0, -3)
    .trimEnd()}'s dogs eat too little`
);

// 5
const exactFood = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(exactFood);

// 6
const okFood = dogs.some(dog => correctFoodRange(dog));
console.log(okFood);

// 7
const okFoodDogs = dogs.filter(dog => correctFoodRange(dog));
console.log(okFoodDogs);

// 8
const dogshallowCopy = dogs;
console.log(dogshallowCopy.sort(compareRecommendedFood));

function compareRecommendedFood(a, b) {
  return a.recommendedFood - b.recommendedFood;
}
*/

//////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const dogsOlder = humanAge.filter(age => age > 18);
  const averageAge =
    // dogsOlder.reduce((acc, age) => acc + age, 0) / dogsOlder.length;
    dogsOlder.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(humanAge, dogsOlder, averageAge);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const checkDogs = function (julia, kate) {
  const juliaSC = julia.slice(1, julia.length - 2);
  console.log(juliaSC);
  const arr = [...juliaSC, ...kate];
  const print = arr.forEach(function (age, idx) {
    console.log(
      `Dog number ${idx + 1} is an ${
        age >= 3 ? `adult, and is ${age} old` : 'puppy'
      }`
    );
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/
