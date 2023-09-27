let whoPlayNow; // Who is playing now?
let turnDisplay = document.querySelector("#turnDisplay");
let oScoreDisplay = document.getElementById("oScore");
let xScoreDisplay = document.getElementById("xScore");
oScoreDisplay.innerHTML = "0";
xScoreDisplay.innerHTML = "0";
// Function to disable cell click event listeners
const disableCellClick = () => {
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  for (let cell of cells) {
    cell.removeEventListener("click", handleClickXO);
  }
};

// Function to enable cell click event listeners
const enableCellClick = () => {
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  for (let cell of cells) {
    cell.addEventListener("click", handleClickXO);
  }
};

let popup = document.querySelector("#popup");

// Function to check if the game has ended
const ifEndGame = () => {
  let whoWonTheGame;

  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  if (!cells || cells.length !== 9) {
    return;
  }
  //check vertical win
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i + 3].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML
    ) {
      //the first column is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  // Check for horizontal wins
  for (let i = 0; i < 9; i += 3) {
    // i += 3 => i = i + 3
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i + 1].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML
    ) {
      //the first column is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  // Check for diagonal wins
  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i + 4].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }
  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i + 2].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML
  ) {
    //the first column is equal
    whoWonTheGame = cells[i].innerHTML;
  }
  // Check if the game has ended and someone won or it's a tie

  if (whoWonTheGame) {
    popup.style.display = "block";
    popup.innerHTML = `${whoWonTheGame} won the game`;
    if (whoPlayNow == "x") {
      xScore.innerHTML++;
    } else if (whoPlayNow == "o") {
      oScore.innerHTML++;
    }
    disableCellClick();
  } else {
    for (let cell of cells) {
      if (!cell.innerHTML) {
        return; //stop here and continue the game
      }
    }
    popup.style.display = "block";
    popup.innerHTML = "no one won the game";
  }
};
// Function to handle cell clicks

const handleClickXO = (myE) => {
  if (myE.target.innerHTML != "") {
    return;
  }
  //the div is empty and I can put in this div x or o
  myE.target.innerHTML = whoPlayNow;
  whoPlayNow == "x" ? (whoPlayNow = "o") : (whoPlayNow = "x");
  turnDisplay.textContent = ` ${whoPlayNow.toUpperCase()} is playing`;

  ifEndGame();
};
// Function to initialize the page on load

const initPageLoad = () => {
  // Set click event listeners on every cell
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  for (let myDiv of cells) {
    myDiv.addEventListener("click", handleClickXO);
  }
};
// Function to start a new game

const newGame = () => {
  whoPlayNow = "x"; // x start first
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  for (let cell of cells) {
    cell.innerHTML = "";
    //clear all cells
  }
  popup.style.display = "none";
  enableCellClick();
  turnDisplay.textContent = ` ${whoPlayNow.toUpperCase()} is playing`;
};
// Initialize the game on page load

window.addEventListener("load", () => {
  initPageLoad();
  newGame();
  document.querySelector("#playAgainBtn").addEventListener("click", () => {
    newGame();
  });
});
