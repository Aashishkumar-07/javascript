'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  // registerNewAnswer : function(){}
  registerNewAnswer() {
    // console.log(this);
    const userInput = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    if (!isNaN(userInput) && userInput >= 0 && userInput < 4) {
      this.answers[userInput]++;
    } else {
      alert('Enter a valid Number');
    }
    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else {
      console.log('Poll results are ', ...this.answers.join(','));
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const arr1 = {
  answers: [5, 2, 3],
};

const displayResultsCmn = poll.displayResults;
displayResultsCmn.call(arr1);
displayResultsCmn.call(arr1, 'string');
displayResultsCmn.call({ answers: [1, 5, 3, 9, 6, 1] });
displayResultsCmn.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
