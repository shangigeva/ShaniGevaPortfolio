const cards = document.querySelectorAll(".memoryCard");
let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
// const flipCard = () => {
//   this.classList.toggle("flip");
// };
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; //unavailible double click on the card
  this.classList.add("flip");
  if (!flippedCard) {
    //first click
    flippedCard = true;
    firstCard = this;
  }
  //second click
  else {
    flippedCard = false;
    secondCard = this;
    checkMatch();
  }
}
const checkMatch = () => {
  // its a match
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards();
  }
  // dont match
  else {
    unflip();
  }
};
// match- unclick the card
const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
};
// match- unFlip the card
const unflip = () => {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }, 1200);
};
const resetBoard = () => {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};
// suffle the cards every game
const shuffle = () => {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
};
shuffle();
const resetButton = document.querySelector(".resetBtn");
cards.forEach((card) => card.addEventListener("click", flipCard));

resetButton.addEventListener("click", () => {
  resetGame();
});

const resetGame = () => {
  // Unflip all cards
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  shuffle();
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};
