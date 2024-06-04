const gridContainer = document.querySelector('.grid-container');
const colorBoxes = document.querySelectorAll('.color-box');
const score = document.querySelector('.score');

let letters = '0123456789ABCDEF';
let gameCounter = 0;
let correctGuesses = 0;

function allColorGenerator() {
  let randomColor = colorGenerator();
  let differentColorShade = colorShader(randomColor);
  let selectedBoxIndex = Math.floor(Math.random() * colorBoxes.length); // 1 - 16

  return {
    randomColor,
    differentColorShade,
    selectedBoxIndex,
  };
}

function colorGenerator() {
  let generatedColor = '#';
  for (let i = 0; i < 6; i++) {
    generatedColor += letters[Math.floor(Math.random() * 16)];
  }
  return generatedColor;
}

function colorShader(color) {
  let lastDigit1 =
    letters[letters.indexOf(color.slice(5, 6))] === 'F'
      ? 'F'
      : letters[letters.indexOf(color.slice(5, 6)) + 1];

  let lastDigit2 =
    letters[letters.indexOf(color.slice(6, 7))] === 'F'
      ? 'F'
      : letters[letters.indexOf(color.slice(6, 7)) + 1];

  return `${color.slice(0, 5)}${lastDigit1}${lastDigit2}`;
}

function gameChecker() {
  if (gameCounter === 10) {
    if (correctGuesses > 5) {
      alert('You won!');
    } else {
      alert('You lose!');
    }
    return false;
  }
  return true;
}

function selectionChecker(event) {
  const isSelectionTrue = event.target.id === 'selected-box';
  if (isSelectionTrue) {
    alert('Correct!');
    correctGuesses += 1;
    gameCounter += 1;
    score.textContent = `Your Score: ${correctGuesses} / ${gameCounter}`;
    gameIteration();
  } else {
    alert('Wrong!');
    gameCounter += 1;
    score.textContent = `Your Score: ${correctGuesses} / ${gameCounter}`;
    gameIteration();
  }
}

function gameIteration() {
  if (gameCounter === 10) {
    if (correctGuesses >= 5) {
      alert('You won! Congrats.');
      score.textContent = 'Game over. You won! Pick one to start a new game.';
      colorFiller();
    } else {
      alert('You lose! Try again.');
      score.textContent = 'Game over. You lose! Pick one to start a new game.';
      colorFiller();
    }
    gameCounter = 0;
    correctGuesses = 0;
    return;
  } else if (gameCounter < 10) {
    colorFiller();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  gameIteration();
});

function colorFiller() {
  let { randomColor, differentColorShade, selectedBoxIndex } =
    allColorGenerator();

  colorBoxes.forEach((colorBox, index) => {
    if (index === selectedBoxIndex) {
      colorBox.style.backgroundColor = differentColorShade;
      colorBox.setAttribute('id', 'selected-box');
    } else {
      colorBox.style.backgroundColor = randomColor;
    }

    colorBox.addEventListener('click', selectionChecker);
  });
}
