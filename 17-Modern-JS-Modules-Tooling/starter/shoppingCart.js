console.log('IMPORTING FILE ACCESSED');

// BLOCKING CODE
// console.log('start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('finished fetching users');

const shippingCost = 10;
export const cart = [];

// NAMED EXPORT
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity as tq };

// DEFAULT EXPORT
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
