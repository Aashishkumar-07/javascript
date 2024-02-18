'use strict';
///////////////////////////////////////
/*

// constructor function
const Person = function (firstName, birthYear) {
  //properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const jonas = new Person('Jonas', 2000);
const Matilda = new Person('Matilda', 1980);
console.log(jonas);
console.log(jonas instanceof Person);

// Prototype
console.log('------PROTOTYPE-------');

Person.prototype.calAge = function () {
  console.log(2023 - this.birthYear);
};
Person.prototype.familyName = 'cooper';
console.log(Person.prototype);
jonas.calAge();
console.log(jonas);
console.log(jonas.familyName, Matilda.familyName);
console.log(jonas.hasOwnProperty('familyName'));
console.log(jonas.hasOwnProperty('firstName'));
// new keyword links { } to prototype
console.log(Person.prototype === jonas.__proto__);
// prototype property also has reference to the function
console.log(Person.prototype.constructor === Person);

// Prototypal Inheritance on Built-In Objects
const a = function () {};
console.log(Array.prototype, a.prototype);

// Adding a new method to Array prortotype
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log([1, 1, 1, 2, 3, 45, 45, 45, 3].unique());

///////////////////////////////////////
// ES6 Class

// class expression
// const PersonCl = class{};

// class declarartion
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype
  calAge() {
    console.log(2023 - this.birthYear);
  }

  get info() {
    console.log(`${this.firstName} was born in ${this.birthYear} `);
  }
  // Setting and getting properties that already exist
  set firstName(name) {
    if (typeof name === 'string') this._firstName = name;
    else alert(`${name} is not a full name`);
  }

  get firstName() {
    return this._firstName;
  }

  // Static methods
  static hello() {
    return 'hello';
  }
}

const adam = new PersonCl('Adam', 1980);
adam.calAge();
//We can access class methods as class properties
adam.info;
console.log(PersonCl.prototype === adam.__proto__);
//✅Static method
console.log(PersonCl.hello());
//❌Static method can be called only on class & not on objects
// console.log(adam.hello());

///////////////////////////////////////
// object.create
const personProto = {
  calAge() {
    console.log(2023 - this.birthYear);
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const sarah = Object.create(personProto);
sarah.init('sarah', 1997);
sarah.calAge();
*/

///////////////////////////////////////
// INHERITANCE BETWEEN CLASSES

/*

// constructor function-class inheritance
// parent class
const Person = function (firstName, birthYear) {
  //properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calAge = function () {
  console.log(2023 - this.birthYear);
};
// children class
const Student = function (firstName, birthYear, course) {
  //In a regular function , this keyword is set to undefined
  Person.call(this, firstName, birthYear);
  this.course = course;
};
// inheritance
//  A new empty object is created with the Object.create() method, and assigned to the Student.prototype property.
//  This new object inherits from the Person.prototype.
// That is why we have Student.prototype.display after Object.create() to avoid overwrite
Student.prototype = Object.create(Person.prototype);

Student.prototype.display = function () {
  console.log(
    `${this.firstName} born on ${this.birthYear} has taken ${this.course}`
  );
};

const mike = new Student('Mike', 1999, 'science');
mike.display();
console.log(mike.__proto__.__proto__ === Person.prototype);
// works because of inheritance
mike.calAge();

console.log(mike instanceof Student);
console.log(mike instanceof Person);

console.dir(Student.prototype.constructor);
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
////////////////////////////////////
// ES6 Class-class inheritance
// class declarartion
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype
  calAge() {
    console.log(2023 - this.birthYear);
  }

  get info() {
    console.log(`${this.firstName} was born in ${this.birthYear} `);
  }
  // Setting and getting properties that already exist
  set firstName(name) {
    if (typeof name === 'string') this._firstName = name;
    else alert(`${name} is not a full name`);
  }

  get firstName() {
    return this._firstName;
  }

  // Static methods
  static hello() {
    return 'hello';
  }
}
// class inheritance
class StudentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear); // Always need to happen first
    this.course = course;
    // super is the parent class constructor and it set the this keyword value
    // If no new parameter is given we don't need to use super
  }
  displaCourse() {
    console.log(`${this.firstName} has taken ${this.course}`);
  }
}

const martha = new StudentCl('Martha', 1989, 'CSE');

martha.displaCourse();
martha.info;
martha.calAge();
///////////////////////////////////////
// object.create-class inheritance
const personProto = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
  calAge() {
    console.log(2023 - this.birthYear);
  },
};
// class inheritance
const studentProto = Object.create(personProto);
studentProto.init = function (firstName, birthYear, course) {
  personProto.init.call(this, firstName, birthYear);
  this.course = course;
};
const jay = Object.create(studentProto);
jay.init('Jay', 2000, 'CSE');
console.log(jay);
jay.calAge();
*/

////////////////////////////////////////////
// private and public fields
// private and public methods
// ENCAPSULATION
class Account {
  // 1)Public fields - present on all instances/objects and not on prototype
  locale = navigator.language;

  // 2)Private fields - present on all instances/objects
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this.#movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // 3)Public methods - method added to prototype
  getMovements() {
    return this.#movements;
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
    return this;
  }

  // 4)Private methods
  #approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('Satish', 'USD', 111);
console.log(acc1);
acc1.deposit(200);
acc1.deposit(120);
acc1.withdraw(100);
acc1.requestLoan(100);
console.log(acc1.getMovements());

// Gives error bcz movements,pin is private
// NOTE : # private is not supported in all browsers
// console.log(acc1.#movements);
// console.log(acc1.#pin);

// console.log(#approveLoan(10));

//CHAINING CLASS METHODS
// We return this keyword(object) for this to work
// Without returning anything we get undefined and chaining methods on undefined throws error
acc1.deposit(100).deposit(200).withdraw(120).requestLoan(1000);
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// CODING CHALLENGE

/*
// 1
const Car = function (name, speed) {
  this.name = name;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`speed of ${this.name} after acceleration : ${this.speed}Km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`speed of ${this.name} after applying break : ${this.speed}Km/h`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);
car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();

// 2
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);
console.log(car1.speedUS);
car1.speedUS = 50;
console.log(car1.speed);


// 3
const Car = function (name, speed) {
  this.name = name;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`speed of ${this.name} after acceleration : ${this.speed}Km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`speed of ${this.name} after applying break : ${this.speed}Km/h`);
};

const EV = function (name, speed, charge) {
  Car.call(this, name, speed);
  this.charge = charge;
};
// class inheritance
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
// Polymorphism
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `Tesla going at ${this.speed} Km/h , with a charge of ${this.charge}%`
  );
};

const Tesla = new EV('Tesla', 120, 23);
Tesla.chargeBattery(90);
Tesla.brake();
Tesla.accelerate();
*/

// 4
class CarCl {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`speed of ${this.name} after acceleration : ${this.speed}Km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(
      `speed of ${this.name} after applying break : ${this.speed}Km/h`
    );
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(name, speed, charge) {
    super(name, speed);
    this.#charge = charge;
  }

  display() {
    console.log(
      `${this.name} going at ${this.speed} Km/h, with a charge of ${
        this.#charge
      }%`
    );
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `Rivan going at ${this.speed} Km/h , with a charge of ${this.#charge}%`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}
const car1 = new EVCl('Rivan', 120, 23);
car1.display();
car1.accelerate();
car1.brake();
car1.display();
console.log(car1);
car1.chargeBattery(90).accelerate().brake();
