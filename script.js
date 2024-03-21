// Get the game container element
const gameContainer = document.getElementById("game");

// Initialize variables for tracking clicked cards, current score, and game state
let cardOne = null;
let cardTwo = null;
let noClicking = false;
let currentScore = 0;
let cardsFlipped = 0;

// Get the restart button element and create a restart button
let restart = document.getElementById('restart');
let restartButton = document.createElement('button');
restartButton.innerText = "Restart";

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
      restart.innerHTML = '';
      lowestScore();
      restart = restart.appendChild(restartButton);
    }
  }, 200); // Adjust this value as needed to match your CSS animation duration
}

// Function to restart the game
restart.addEventListener('click', function (event) {
  setScore(0);
  cardsFlipped = 0;
  removeDivsForColors();
  initializeGame();
  displayLowestScore();
});

// Function to set the current score
function setScore(newScore) {
  currentScore = newScore;
  document.getElementById("current-score").innerText = currentScore;
}

// Function to update or set the lowest score in localStorage
function lowestScore() {
  if (localStorage.getItem('lowestScore') === null) {
    localStorage.setItem('lowestScore', currentScore);
  } else if (currentScore < localStorage.getItem('lowestScore')) {
    localStorage.setItem('lowestScore', currentScore);
  }
}

// Function to display the lowest score
function displayLowestScore() {
  let lowestScore = localStorage.getItem('lowestScore');
  document.getElementById("lowest-score").innerText = lowestScore;
}

// Function to initialize the game
function initializeGame() {
  createDivsForColors(shuffle(COLORS));
}

// Start of Menu code

// Get menu screen and start button elements
const menuScreen = document.getElementById("menu-screen");
const start = document.getElementById("start");

// Create a start button
const startButton = document.createElement('button');
startButton.innerText = 'Start Game';
startButton.addEventListener('click', startGame);

// Get game screen element
const gameScreen = document.getElementById("game-screen");

// Add start button to the menu
start.appendChild(startButton);

// Function to start the game
function startGame() {
  menuScreen.style.display = 'none';
  gameScreen.style.display = "block";
  displayLowestScore();
  initializeGame();
}
// End of Menu code
