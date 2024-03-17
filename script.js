const gameContainer = document.getElementById("game");

let cardOne = null;

let cardTwo = null;

let noClicking = false;

let currentScore = 0;

//saved game in local storage when one refreshes

const savedScore = JSON.parse(localStorage.getItem('currentScore'));

const savedTimeElapsed = JSON.parse(localStorage.getItem('timeElapsed'))

const savedFlippedCards = JSON.parse(localStorage.getItem('flippedCards'))

//game will continue if there is time and score

if ((savedScore !== null) && (savedElapsedTime !== null) && (savedFlippedCards !== null)) {
  currentScore = savedScore;
  timeElapsed = savedTimeElapsed;
  cardsFlipped = savedFlippedCards;

  displayTimer()
  setScore(currentScore)
}

//restoring flippedCards

const savedFlippedCardsElements = document.querySelectorAll('.flipped');

for (let card of savedFlippedCardsElements) {
  card.style.backgroundColor = card.classList[0]
}

menuScreen.style.display = 'none';
gameScreen.style.display = 'block';

if (cardsFlipped === COLORS.length) {
  startTimer();
}

//saving game to local storage

function saveGameState() {
  updateLocalStorage('currentScore', currentScore)
  updateLocalStorage('timeElapsed', timeElapsed)
  updateLocalStorage('flippedCards', cardsFlipped)
}

//calling save game state when there is a change in game state

function handleCardClick(event) {
  // Your existing code here

  // Call saveGameState after handling card click
  saveGameState();
}



// function to update local storage

function updateLocalStorage(item, val) {
  localStorage.setItem(item, JSON.stringify(val));
}

//keeping track of hhow
let cardsFlipped = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}






// TODO: Implement this function!
function handleCardClick(event) {
  console.log(noClicking);
  console.log(cardsFlipped)
  if (noClicking) return;
  if (event.target.classList.contains("flipped")){
    return;
  }
  //variable assigns what color is clicked on
   let currentCard = event.target;
  
  //add boolean if card is clicked on
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!cardOne || !cardTwo ) {

    if (!currentCard.classList.add('flipped')){
      setScore(currentScore + 1)
    }
    cardOne = cardOne || currentCard;
    cardTwo = currentCard === cardOne ? null : currentCard;
    
  }
  //console.log(currentCard.classList[0])
  //cards stay flipped if matched
  if (cardOne && cardTwo) {
    //console.log(cardOne.className);
    noClicking = true;
    let gif1 = cardOne.className;
    let gif2 = cardTwo.className;
    if (gif1 === gif2) {
      cardOne.removeEventListener('click', handleCardClick);
      cardTwo.removeEventListener('click', handleCardClick);
      cardOne = null;
      cardTwo = null;
      noClicking = false
      cardsFlipped += 2
    } else { //switching card back after two seconds if cards do not match
      setTimeout(function () {
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
        console.log(cardOne);
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = ""; 
        cardOne = null;
        cardTwo = null;
        noClicking = false;
      }, 1000);
    }
  }
  //restart button appears when all colors are matched
  if (cardsFlipped === COLORS.length && cardsFlipped > 0) {
    //getting #restart from html
    let restart = document.getElementById('restart');
    //creating button
    let restartButton = document.createElement('button');
    //what the same of the botton the user will see
    restartButton.innerText = "Restart";
    //clears previous content
    restart.innerHTML = ''
    alert('Game Over your score is ' + currentScore)
    //connected HTML ID element to new button
    restart = restart.appendChild(restartButton)
    //completed button that restarts the game
    restart.addEventListener('click', function(event) {
      //this is how game restarts
      currentScore = 0;
      timeElapsed = 0;
      cardsFlipped = 0;
      setScore(currentScore);
      displayTimer();
      stopTimer();
      localStorage.clear(); // clearing saved game state
      initializeGame()
    })
    // Stop the timer when the game ends
    stopTimer();
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

function setScore(newScore) {
  currentScore = newScore;
  document.getElementById("current-score").innerText = currentScore;
  // Update local storage with the new score
  updateLocalStorage('currentScore', currentScore);
}


// Start of Timer Code

let timeInterval

let timeElapsed = 0

function startTimer () {
  timeInterval = setInterval(function() {
    timeElapsed += 1
    displayTimer()
  }, 1000)
}

function displayTimer() {
  const minutes = Math.floor(timeElapsed/60)
  const seconds = timeElapsed % 60
  const timeDislay = `${ minutes.toString().padStart(2, '0')
  }:${ seconds.toString().padStart(2, '0') }`
  document.getElementById('timer').innerText = timeDislay
}

function stopTimer () {
  clearInterval(timeInterval)
}

//end timer code


//Start of Menu code

//getting menu div node from html
const menuScreen = document.getElementById("menu-screen");

// getting start button div node from html
const start = document.getElementById("start");

const startButton = document.createElement('button');

//defining start button

startButton.innerText = 'Start Game';

//adding function to button

startButton.addEventListener('click', startGame)

//getting game screen div node from html

const gameScreen = document.getElementById("game-screen")

// Adding button to menu

start.appendChild(startButton)

function startGame() {
  menuScreen.style.display = 'none';
  gameScreen.style.display = "block";
  initializeGame()
  startTimer()
}



//end of menu code



function initializeGame() {
  //when DOM loads
  createDivsForColors(shuffle(COLORS))
}
