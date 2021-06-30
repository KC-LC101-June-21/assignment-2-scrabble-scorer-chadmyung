// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelBonusStructure = {
  3: ['A', 'E', 'I', 'O', 'U'],
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  // let letterPoints = "";
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        //  console.log(pointValue)
        // letterPoints += `Points for '${word[i]}': ${pointValue}\n`
        letterPoints += Number(pointValue);
      }

    }

  }
  return letterPoints;
}

function newScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  let ltr;
  for (let i = 0; i < word.length; i++) {
    ltr = word[i].toLowerCase()
    letterPoints += Number(newPointStructure[ltr]);

  }
  return letterPoints;
}

function simpleScoreCalc(word) {
  let letterPoints = word.length;
  return letterPoints;
}

function vowelBonusScoreCalc(word) {
  word = word.toUpperCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {

    for (const pointValue in vowelBonusStructure) {

      if (vowelBonusStructure[pointValue].includes(word[i])) {
        letterPoints += Number(pointValue);
      }

    }

  }
  return letterPoints;
}
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble! \n Enter a word to score:");
  let word = input.question();
  //  let letterPts = oldScrabbleScorer(word);
  //  console.log(letterPts)
  return word
};

let simpleScore = { name: 'Simple Score', description: 'Each letter is worth 1 point.', scoringFunction: simpleScoreCalc };

let vowelBonusScore = { name: 'Bonus Vowels', description: 'Vowels are 3 pts, consonants are 1 pt.', scoringFunction: vowelBonusScoreCalc };

let scrabbleScore = { name: 'Scrabble', description: 'The traditional scoring algorithm.', scoringFunction: newScrabbleScorer };



const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt(word) {
  console.log("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2:");
  let method = input.question();
  while(method != '0' & method != '1' & method != '2'){
    console.log("Invalid input. Please enter again.");
    method = input.question();
  }
  // console.log(typeof method)
  console.log("algorithm name: ", scoringAlgorithms[method].name);
  console.log(`Score for '${word}': ${scoringAlgorithms[method].scoringFunction(word)}`);
  return scoringAlgorithms[method];
}

function transform(oldObject) {
  let newObject={};
  for (const pointValue in oldObject) {
    for (let i = 0; i < oldObject[pointValue].length; i++){
      newObject[oldObject[pointValue][i].toLowerCase()] = pointValue;
    }
  }
  newObject[" "]='0'
  return newObject;
}

  let newPointStructure = transform(oldPointStructure);

  function runProgram() {
    let word = initialPrompt();
    let score = scorerPrompt(word);
    //  console.log(score);

  }

  // Don't write any code below this line //
  // And don't change these or your program will not run as expected //
  module.exports = {
    initialPrompt: initialPrompt,
    transform: transform,
    oldPointStructure: oldPointStructure,
    simpleScore: simpleScore,
    vowelBonusScore: vowelBonusScore,
    scrabbleScore: scrabbleScore,
    scoringAlgorithms: scoringAlgorithms,
    newPointStructure: newPointStructure,
    runProgram: runProgram,
    scorerPrompt: scorerPrompt
  };

