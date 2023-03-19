setTimeout(() => {
  document.body.classList.remove("preloading");
}, 500);

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceBtn = document.querySelectorAll(".choice-btn");
const game = document.querySelector(".game");
const resultsDivision = document.querySelector(".results");
const resultDivision = document.querySelectorAll(".results-division");
const resultWinner = document.querySelector(".results-winner");
const resultText = document.querySelector(".results-text");
const playAgain = document.querySelector(".play-again");
const yourScoreNumber = document.querySelector(".your-score-number");
const computerScoreNumber = document.querySelector(".computer-score-number");

let yScore = 0;
let cScore = 0; 

// Game Logic
choiceBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const computerchoice = computerChoose();
  displayResults([choice, computerchoice]);
  displayWinner([choice, computerchoice]);
}

function computerChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivision.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>`;
    }, idx );
  });

  game.classList.toggle("hidden");
  resultsDivision.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const computerWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "  YOU WIN AGAINST PC";
      resultDivision[0].classList.toggle("winner");
      yourScore(1);
      document.getElementById("replay").textContent="PLAY AGAIN";
      document.getElementById("next-display").style.display = "flex"; 
    } else if (computerWins) {
      resultText.innerText = "YOU LOST AGAINST PC";
      resultDivision[1].classList.toggle("winner");
      computerScore(1);
      document.getElementById("replay").textContent="PLAY AGAIN";
      document.getElementById("next-display").style.display = "none";
    } else {
      resultText.innerText = "TIE UP";
      document.getElementById("replay").textContent="REPLAY";
      document.getElementById("next-display").style.display = "none";
    }

    resultWinner.classList.toggle("hidden");
    resultsDivision.classList.toggle("show-winner");
  }, );
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

document.getElementById("a").style.display = "flex";
function yourScore(point) {
  yScore += point;
  localStorage.setItem('yourScoreNumber', yScore); 
  yourScoreNumber.innerHTML = yScore;
}
let getYourScore = localStorage.getItem('yourScoreNumber');
if (getYourScore !== null) {
  yScore = parseInt(getYourScore);
  yourScoreNumber.innerHTML = yScore;
}

function computerScore(point) {
  cScore += point;
  localStorage.setItem('computerScoreNumber', cScore);
  computerScoreNumber.innerHTML = cScore;
}
let getComputerScore = localStorage.getItem('computerScoreNumber');
if (getComputerScore !== null) {
  cScore = parseInt(getComputerScore);
  computerScoreNumber.innerHTML = cScore;
}

// Play Again
playAgain.addEventListener("click", () => {
  game.classList.toggle("hidden");
  resultsDivision.classList.toggle("hidden");
  
  resultDivision.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDivision.classList.toggle("show-winner");

  document.getElementById("next-display").style.display = "none";
});

// Show/Hide Rules
function openPopUp() {
  document.getElementById("popup").style.display = "block";
}
function closePopUp() {
  document.getElementById("popup").style.display = "none";
}


