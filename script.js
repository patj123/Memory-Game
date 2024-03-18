const gameContainer = document.getElementById("game");

let cardOne = null;

let cardTwo = null;

let noClicking = false;

let currentScore = 0;




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
  if (event.target.classList.contains("flipped")) {
    return;
  }
  //variable assigns what color is clicked on
  let currentCard = event.target;

  //add boolean if card is clicked on
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!cardOne || !cardTwo) {

    if (!currentCard.classList.add('flipped')) {
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
    restart.addEventListener('click', function (event) {
      //this is how game reloads
      location.reload(true)
    })
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

function setScore(newScore) {
  currentScore = newScore;
  document.getElementById("current-score").innerText = currentScore;

}

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
}


//end of menu code



function initializeGame() {
  //when DOM loads
  createDivsForColors(shuffle(COLORS))
}