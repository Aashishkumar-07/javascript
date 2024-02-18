// NAMED EXPORT

/*
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
addToCart('milk', 5);
console.log(price, tq);

import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 3);
*/

//////////////////////////////////////////////////////////////////////////
// DEFAULT EXPORT

/*
import add from './shoppingCart.js';
add('biscuits', 10);

console.log('IMPORTING FINISHED');
*/

/////////////////////////////////////////////////////////////////////////
//LIVE CONNECTION b/w IMPORT & EXPORT
//❗imports are not copies of export

/*
import add, { cart } from './shoppingCart.js';
add('biscuits', 10);
add('banana', 6);
add('apple', 1);

console.log(cart);
*

/////////////////////////////////////////////////////////////////////////////
// TOP LEVEL AWAIT

/*
console.log('start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('finished fetching');
*/

/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

//❌ Not clean
const lastPost = getLastPost();
lastPost.then(last => console.log(last));

//✅ top-level await
const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

////////////////////////////////////////////////////////////////////////////
// MODULE PATTERN

/*
const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  return { addToCart, cart, totalPrice, totalQuantity };
})();

shoppingCart2.addToCart('banana', 3);
console.log(shoppingCart2);
*/

////////////////////////////////////////////////////////////////////
// INTRO TO NPM

// import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

// If we use module bundler(parcel) we can run the below code(1 line)
import cloneDeep from 'lodash-es';

const state = {
  cart: [{ product: 'bread' }, { product: 'pizza' }],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);
////////////////////////////////////////////////////////////////////
// HOT RELOAD - ONLY PARCEL PACKAGE UNDERSTANDS THIS CODE
if (module.hot) {
  module.hot.accept();
}
////////////////////////////////////////////////////////////////////
// BABEL - POLYFILL LIBRARY
// npm install core-js in terminal before running the below code
import 'core-js/stable';
import 'regenerator-runtime/runtime';
