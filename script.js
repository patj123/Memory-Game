document.addEventListener("DOMContentLoaded", function () {
  // Global variables
  const gameContainer = document.getElementById("game");
  let cardOne = null;
  let cardTwo = null;
  let noClicking = false;
  let currentScore = 0;
  let timeElapsed = 0;
  let cardsFlipped = 0;
  let gameComplete = false; // Flag to track if the game is complete

  // Array of colors for the game
  const COLORS = [
    "red", "blue", "green", "orange", "purple",
    "red", "blue", "green", "orange", "purple"
  ];

  // Function to create the "Start Game" button
  function createStartButton() {
    const start = document.getElementById("start");
    const startButton = document.createElement('button');
    startButton.innerText = 'Start Game';
    startButton.addEventListener('click', startGame);
    start.appendChild(startButton);
  }

  // Create the "Start Game" button
  createStartButton();

  // Function to create divs for colors
  function createDivsForColors(colorArray) {
    console.log("Creating divs for colors:", colorArray);
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add("card", color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);

      console.log("Added div with color:", color);
    }

  }

  // Function to shuffle array
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

  // Function to handle card click
  function handleCardClick(event) {
    console.log("Clicked on card");

    // Check if clicking is disabled
    if (noClicking) {
      console.log("Clicking is disabled");
      return;
    }

    if (event.target.classList.contains("flipped")) return;

    const clickedCard = event.target;
    console.log("Clicked card:", clickedCard);

    // Check if cardOne is null (first card) or already set (second card)
    if (!cardOne || cardTwo) {
      console.log("Setting cardOne:", clickedCard);
      cardOne = clickedCard;
      cardTwo = null;
      return;
    }

    // Check if the clicked card is already flipped or is the same card
    if (clickedCard.classList.contains('flipped') || clickedCard === cardOne) {
      console.log("Card already flipped or same card");
      return;
    }

    // Add flipped class to show the color
    console.log("Flipping card");
    clickedCard.classList.add('flipped');

    // Increment current score
    currentScore++;

    

    // If second card is flipped, check for match
    if (cardOne && cardTwo) {
      console.log("Second card clicked:", clickedCard);
      cardTwo = clickedCard;
console.log("cardOne.className" , cardOne.className);
console.log("cardTwo.className", cardTwo.className);
      // Check for match
      if (cardOne.className === cardTwo.className) {
        console.log("Match found!");
        //cardsFlipped += 2;
        currentScore++;
        // If cards match, remove event listener and reset card variables
        cardOne.removeEventListener('click', handleCardClick);
        cardTwo.removeEventListener('click', handleCardClick);
        cardOne = null;
        cardTwo = null;
      } else {
        console.log("No match, flipping back...");
        // If cards don't match, disable clicking temporarily and flip cards back
        noClicking = true;
        setTimeout(() => {
          cardOne.classList.remove('flipped');
          cardTwo.classList.remove('flipped');
          cardOne = null;
          cardTwo = null;
          noClicking = false;
        }, 1000);
      }
    }
  }

  // Function to display the restart button
  function displayRestartButton() {
    const restartButton = document.getElementById('restart');
    restartButton.style.display = 'block';
  }

  // Start game function
  function startGame() {
    // Hide menu screen and show game screen
    const menuScreen = document.getElementById("menu-screen");
    const gameScreen = document.getElementById("game-screen");
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    // Initialize game
    currentScore = 0;
    timeElapsed = 0;
    cardsFlipped = 0;
    gameComplete = false; // Reset game complete flag
    setScore(currentScore);
    displayTimer();
    initializeGame();
    startTimer();
  }

  // Function to set score
  function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("current-score").innerText = currentScore;
  }

  // Timer functions
  let timeInterval;

  function startTimer() {
    timeInterval = setInterval(function () {
      timeElapsed += 1;
      displayTimer();
    }, 1000);
  }

  function displayTimer() {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').innerText = timeDisplay;
  }

  function stopTimer() {
    clearInterval(timeInterval);
  }

  // Restart button event listener
  const restartButton = document.getElementById('restart');
  restartButton.addEventListener('click', function (event) {
    // Restart game logic
    currentScore = 0;
    timeElapsed = 0;
    cardsFlipped = 0;
    gameComplete = false; // Reset game complete flag
    setScore(currentScore);
    displayTimer();
    restartButton.style.display = 'none'; // Hide restart button
    initializeGame(); // Restart game
  });

  // Function to initialize game
  function initializeGame() {
    gameContainer.innerHTML = ''; // Clear existing cards
    const shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    startTimer(); // Start the timer when initializing the game
  }
});