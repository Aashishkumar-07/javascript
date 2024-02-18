// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
*/

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...players) {
    for ([idx, playerName] of players.entries()) {
      console.log(`${playerName} : ${players.length}`);
    }
  },
};
/*
// Q1
const [players1, players2] = game.players;
console.log(players1, players2);

// Q2
const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);

// Q3
const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// Q4
const substitutePlayers = ["Thiago", "Coutinho", "Perisic"];
const players1Final = [...players1, ...substitutePlayers];
console.log(players1Final);

// Q5
// const { team1, team2, x: draw } = game.odds;
const {
  odds: { team1, team2, x: draw },
} = game;
console.log(team1, team2, draw);

// Q6
game.printGoals(...game.scored);
game.printGoals("Davies", "Muller", "Lewandowski", "Kimmich");

// Q7
let result = team1 <= team2;
result &&= "team1 wins";
result ||= "team2 wins";
console.log(result);

team1 > team2 && console.log("team2 wins");
team1 < team2 && console.log("team1 wins");
*/

// Coding Challenge #2

// Q1
for (const [idx, player] of game.scored.entries()) {
  console.log(`Goal ${idx + 1}: ${player}`);
}

// Q2
let sumOfNums = 0;
for (const item of Object.values(game.odds)) {
  sumOfNums += item;
}
console.log(sumOfNums / 3);

// Q3
for (const [teamName, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${teamName !== "x" ? `victory ${game[teamName]}` : "draw"} : ${odd}`
  );
}

// BONUS
const playerGoals = new Object();
for (const [idx, player] of game.scored.entries()) {
  if (playerGoals.hasOwnProperty(player)) {
    playerGoals[player] += 1;
  } else {
    playerGoals[player] = 1;
  }
}
console.log(playerGoals);
