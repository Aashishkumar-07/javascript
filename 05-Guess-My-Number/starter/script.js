'use strict';
/*
console.log(document.querySelector(`.message`).textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔ No Number');
  }

  // When player wins
  else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) highscore = score;
    document.querySelector('.highscore').textContent = highscore;
    // Making the button to not work after winning to prevent score reduction
    document.querySelector('.check').disabled = true;
  }

  // When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈Too high!' : '📉Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥You lost the game !');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  document.querySelector('.check').disabled = false;
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = null;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = '20';
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  1;
});
