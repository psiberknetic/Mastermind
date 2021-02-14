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

  var sum = Array.from(playerGuess).reduce(function(p, c) {
    var prevValue = parseInt(p);
    var currValue = parseInt(c);
    return prevValue + currValue;
  });
  alert(sum);


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
  gameData.numberToGuess = getNumberToGuess();
}

function getNumberToGuess() {
  var number = Math.floor(Math.random() * 10000);
  return getPaddedNumber(number);
}

function getPaddedNumber(number) {
  const paddedNumber = '0000' + number;
  return paddedNumber.substr(paddedNumber.length - 4);
}

