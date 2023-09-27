const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomOperation = () => {
  // Define getRandomOperation function before using it
  const operations = ["+", "-", "*", "/"];
  const randomIndex = getRandomIntInclusive(0, operations.length - 1);
  return operations[randomIndex];
};

let n1, n2, operation; // Declare the variables here

const generateNewQuestion = () => {
  n1 = getRandomIntInclusive(1, 10); // get Random number
  n2 = getRandomIntInclusive(1, 10); // get Random number
  operation = getRandomOperation(); // get Random Operation

  // Set the values of n1, n2, and operation here
  document.getElementById("quest").innerText = `${n1} ${operation} ${n2} = `;
  document.getElementById("answer").value = "";
  // document.body.style.backgroundColor = "white"; // Reset background color
};
window.addEventListener("load", () => {
  document.getElementById("refreshButton").addEventListener("click", () => {
    document.body.classList.add("bg-transition");
    document.body.style.backgroundColor = "rgba(108, 159, 225, 0.164)";
    generateNewQuestion();
  });
  generateNewQuestion();

  document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    let answer = parseFloat(document.getElementById("answer").value); // Parse the answer as a float
    let correctAnswer;

    switch (operation) {
      case "+":
        correctAnswer = n1 + n2;
        break;
      case "-":
        correctAnswer = n1 - n2;
        break;
      case "*":
        correctAnswer = n1 * n2;
        break;
      case "/":
        correctAnswer = n1 / n2;
        break;
    }

    if (answer === correctAnswer) {
      // if the client is correct
      document.body.style.backgroundColor = "green";
    } else if (!isNaN(answer)) {
      // if the client is incorrect
      document.body.style.backgroundColor = "red";
    }
  });
});
