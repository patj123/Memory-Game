// Get the game container element
const gameContainer = document.getElementById("game");

// Initialize variables for tracking clicked cards, current score, and game state
let cardOne = null;
let cardTwo = null;
let noClicking = false;
let currentScore = 0;
let cardsFlipped = 0;

// Define an array of colors for the cards
const COLORS = [
  "red", "blue", "green", "orange", "purple", "yellow",
  "red", "blue", "green", "orange", "purple", "yellow"
];

// Shuffle the array of colors
let shuffledColors = shuffle(COLORS);

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// Function to create divs for each color and set up event listeners
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// Function to remove all card divs from the game container
function removeDivsForColors() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
}

// Function to handle card clicks
function handleCardClick(event) {
  if (noClicking || event.target.classList.contains("flipped")) return;

  let currentCard = event.target;

  // Flip animation
  currentCard.classList.add('flipped');

  // Delay to let the flip animation play
  setTimeout(() => {
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!cardOne || !cardTwo) {
      setScore(currentScore + 1);
      cardOne = cardOne || currentCard;
      cardTwo = currentCard === cardOne ? null : currentCard;
    }

    if (cardOne && cardTwo) {
      noClicking = true;
      let gif1 = cardOne.className;
      let gif2 = cardTwo.className;
      if (gif1 === gif2) {
        cardOne.removeEventListener('click', handleCardClick);
        cardTwo.removeEventListener('click', handleCardClick);
        cardOne = null;
        cardTwo = null;
        noClicking = false;
        cardsFlipped += 2;
      } else {
        setTimeout(function () {
          cardOne.classList.remove("flipped");
          cardTwo.classList.remove("flipped");
          cardOne.style.backgroundColor = "";
          cardTwo.style.backgroundColor = "";
          cardOne = null;
          cardTwo = null;
          noClicking = false;
        }, 1000);
      }
    }

    if (cardsFlipped === COLORS.length && cardsFlipped > 0) {
      handleGameOver();
    }
  }, 200); // Adjust this value as needed to match your CSS animation duration
}

// Function to handle game over
function handleGameOver() {
  let gameOverScreen = document.getElementById("game-over-screen");
  let gameOverMessage = document.getElementById("game-over-message");
  let restartButton = document.createElement('button');
  restartButton.innerText = "Restart";
  restartButton.addEventListener('click', restartGame);

  // Update or set the lowest score in localStorage
  

  let storedLowestScore = localStorage.getItem('lowestScore');
  if (storedLowestScore !== null) {
    lowestScore();
    if (currentScore < parseInt(storedLowestScore)) {
      gameOverMessage.innerText = `Congratulations! Your score is ${currentScore}. You are the lowest scorer.`;
    } else if (currentScore === parseInt(storedLowestScore)) {
      gameOverMessage.innerText = `Congratulations! Your score is ${currentScore}. You tied the lowest score.`;
    } else {
      gameOverMessage.innerText = `Game over, your score is ${currentScore}. That is ${currentScore - parseInt(storedLowestScore)} points higher than the lowest score. Better luck next time.`;
    }
  } else {
    gameOverMessage.innerText = `Congratulations! Your score is ${currentScore}.`;
    lowestScore();
  }

  if (currentScore === COLORS.length) {
    gameOverMessage.innerText = "YOU ARE A CHAMPION!!!!!!!";
  }

  // Clear previous content of game-over-screen
  gameOverScreen.innerHTML = '';

  // Append game over message and restart button to the game-over-screen
  gameOverScreen.appendChild(gameOverMessage);
  gameOverScreen.appendChild(restartButton);
  gameOverScreen.style.display = "block";

  // Center Restart button
  restartButton.style.position = "absolute";
  restartButton.style.top = "50%";
  restartButton.style.left = "50%";
  restartButton.style.transform = "translate(-50%, -50%)";

  // Hide game screen
  document.getElementById("game-screen").style.display = "none";
}

// Function to restart the game
function restartGame() {
  setScore(0);
  cardsFlipped = 0;
  removeDivsForColors(); // Remove existing cards
  shuffledColors = shuffle(COLORS); // Shuffle the colors again
  initializeGame(); // Initialize the game again
  displayLowestScore();
  let gameOverScreen = document.getElementById("game-over-screen");
  gameOverScreen.style.display = "none"; // Hide game over screen
  document.getElementById("game-screen").style.display = "block";

  // Set the style of the restart button to match the start button
  const restartButton = document.querySelector('#restart button');
  restartButton.classList = "start";
}

// Function to set the current score
function setScore(newScore) {
  currentScore = newScore;
  const scoreElement = document.getElementById("current-score");
  scoreElement.innerText = `Current Score: ${currentScore}`;
  scoreElement.classList.add("score-label");
}

// Function to update or set the lowest score in localStorage
function lowestScore() {
  let storedLowestScore = localStorage.getItem('lowestScore');

  if (storedLowestScore === null || currentScore < parseInt(storedLowestScore)) {
    localStorage.setItem('lowestScore', currentScore);
  }
}

// Function to display the lowest score
function displayLowestScore() {
  let lowestScoreValue = localStorage.getItem('lowestScore');
  let lowestScoreContainer = document.getElementById("lowest-score");
  if (lowestScoreValue !== null) {
    lowestScoreContainer.innerText = `Lowest Score: ${lowestScoreValue}`;
  } else {
    lowestScoreContainer.innerText = "N/A";
  }
}

// Function to initialize the game
function initializeGame() {
  createDivsForColors(shuffledColors);
}

// Start Button Click Event
let startButton = document.createElement('button');
startButton.innerText = 'Start Game';
startButton.addEventListener('click', startGame);
document.getElementById('start').appendChild(startButton);

// Function to start the game
function startGame() {
  let menuScreen = document.getElementById("menu-screen");
  let gameScreen = document.getElementById("game-screen");
  menuScreen.style.display = 'none';
  gameScreen.style.display = "block";
  displayLowestScore();
  initializeGame();
}
