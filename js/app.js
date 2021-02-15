var gameData = {
  "NumberOfGuesses": 0,
}

function GuessResults(guess, picas, centros) {
  this.guess = guess;
  this.picas = picas;
  this.centros = centros;
}

GuessResults.prototype.render = function () {
  return `<div class='resultDiv'>${this.guess} - ${this.picas}P: ${this.centros}C</div>`;
}

$(function () {
  initializeGameData();
});

$('#makeGuessButton').on('click', function (event) {
  gameData.currentGuess = getUserGuess();

  const compareResults = compareNumbers(gameData.numberToGuess, gameData.currentGuess);
  $('#guessResults').append(compareResults.render());
});

function compareNumbers(numToGuess, playerGuess) {
  var picas = 0;
  var centros = 0;

  for (var i = 0; i < numToGuess.length; i++) {
    for (var j = 0; j < numToGuess.length; j++) {
      if (numToGuess[i] === playerGuess[j]) {
        if (i === j) {
          centros++;
        }
        else {
          picas++;
        }
      }
    }
  }
  return new GuessResults(playerGuess, picas, centros);
}

function getUserGuess() {
  const currentGuess = parseInt($('#playerGuess').val());
  if (Number.isNaN(currentGuess)) {
    alert('Not a valid number');
    return;
  }
  if (currentGuess > 9999) {
    alert('Your guess must be a number between 0 and 9999');
    return;
  }

  return getPaddedNumber(currentGuess);
}

function initializeGameData() {
  gameData.NumberOfGuesses = 0;
  gameData.numberToGuess = getNumberToGuess(4);
}

function getNumberToGuess(numberOfDigits) {
  var valueAsArray = [];
  var numbers = [0,1,2,3,4,5,6,7,8,9];
  for(let i = 0; i < numberOfDigits; i++){
    let index = getRandomNumberBetween(0, numbers.length);
    valueAsArray.push(numbers[index]);
    numbers.splice(index, 1);
  }

  var value = valueAsArray.reduce((prev, curr) =>{
    return prev.toString() + curr;
  });

  return value;
}

function getRandomNumberBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}