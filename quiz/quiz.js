// array of questions and answers
const questions = [
  {
    question: "What  is my name?",
    answers: [
      { text: "Omer", correct: false },
      { text: "Shani", correct: true },
      { text: "Noy", correct: false },
      { text: "Michal", correct: false },
    ],
  },
  {
    question: "How old am I?",
    answers: [
      { text: "19", correct: false },
      { text: "25", correct: false },
      { text: "23", correct: true },
      { text: "27", correct: false },
    ],
  },
  {
    question: "What city do I live in?",
    answers: [
      { text: "Ness-Zionna", correct: true },
      { text: "Tel-Aviv", correct: false },
      { text: "Rehovot", correct: false },
      { text: "Jerusalem", correct: false },
    ],
  },
  {
    question: "Which campus do I study?",
    answers: [
      { text: "HackerU", correct: true },
      { text: "Udemy", correct: false },
      { text: "John brycee", correct: false },
      { text: "INT collage", correct: false },
    ],
  },
  {
    question: "What am I learning?",
    answers: [
      { text: "UI UX", correct: false },
      { text: "QA", correct: false },
      { text: "FullStack", correct: true },
      { text: "Data Analyst", correct: false },
    ],
  },
  {
    question: "What program language do I know?",
    answers: [
      { text: "C#", correct: false },
      { text: "Java", correct: false },
      { text: "SQL", correct: false },
      { text: "Java Script", correct: true },
    ],
  },
];

const quest = document.getElementById("question");
const answerButton = document.getElementById("answerBtn");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  const buttonText = "Next";

  nextButton.innerHTML = buttonText;
  showQuestion();
};

const showQuestion = () => {
  resetS();
  let currentQuestion = questions[currentQuestionIndex];
  let questionN = currentQuestionIndex + 1;
  quest.innerHTML = questionN + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
};

const resetS = () => {
  nextButton.style.display = "none";
  const answerButtonChildren = answerButton.children;

  for (let i = answerButtonChildren.length - 1; i >= 0; i--) {
    answerButton.removeChild(answerButtonChildren[i]);
  }
};
// what happend when click the answer
const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    selectedBtn.style.backgroundColor = "#9aeabc";
  } else {
    selectedBtn.classList.add("incorrect");
    selectedBtn.style.backgroundColor = "#ff9393";
  }
  // the answerButtons will be disabled after i choose answer
  const answerButtons = answerButton.children;
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].disabled = true;
  }
  document.querySelector('[data-correct="true"]').style.backgroundColor =
    "#9aeabc";
  // the nextButton will appear
  nextButton.style.display = "block";
};
// the end of the game
const showScore = () => {
  resetS();
  quest.innerHTML = ` ${score} out of ${questions.length} correct answers`;
  nextButton.innerHTML = "play again";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
