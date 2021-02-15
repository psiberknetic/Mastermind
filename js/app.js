const greenDot = '<span class="greenDot"></span>';
const orangeDot = '<span class="orangeDot"></span>';

var gameData = {
  "numberOfGuesses": 0,
  "playingGame": true
}

function GuessResults(guess, picas, centros) {
  this.guess = guess;
  this.picas = picas;
  this.centros = centros;
}

GuessResults.prototype.render = function () {
  return `<div>Guess ${gameData.numberOfGuesses} (${this.guess}): ${greenDot} - ${this.centros}, ${orangeDot} - ${this.picas}</div>`;
}

$(function () {
  startNewGame();
  $('#startNewGameButton').on('click', startNewGame);
});

function startNewGame(){
  initializeGameData();
  initializeGameBoard();
  $('#makeGuessButton').on('click', handleGuessSubmit);
}

function initializeGameBoard(){
  $('#guessResults').html('');
}

function handleGuessSubmit() {
  gameData.currentGuess = getUserGuess();
  if (gameData.currentGuess) {
    $('#totalGuesses').text(`Total guesses: ${++gameData.numberOfGuesses}`);

    const compareResults = compareNumbers(gameData.numberToGuess, gameData.currentGuess);
    $('#guessResults').append(compareResults.render());
    if (compareResults.centros == 4) {
      $('#makeGuessButton').off('click');
      $('#winModal').modal({
        keyboard: false,
        focus: true
      });
    }
  }
}

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
  var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < numberOfDigits; i++) {
    let index = getRandomNumberBetween(0, numbers.length - 1);
    valueAsArray.push(numbers[index]);
    numbers.splice(index, 1);
  }

  var value = valueAsArray.reduce((prev, curr) => {
    return prev.toString() + curr;
  });

  return value;
}

function getPaddedNumber(number) {
  const paddedNumber = '0000' + number;
  return paddedNumber.substr(paddedNumber.length - 4);
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}