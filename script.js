const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const clue = document.getElementById("pc-clue");
let selectedIndex;
let selectedWord;
let selectedClue;
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "homeless",
  "insane",
  "perverted",
  "prostitute",
  "stupid",
  "dishonest",
  "insult",
  "bisexualprostitute",
  "poor",
  "illegalimmigrant",
  "riot",
  "protest",
  "drunk",
  "criminal",
  "fat",
  "slum",
  "housewife",
  "unemployed",
  "fascist",
  "robbery",
  "blackboard",
  "lies",
  "shoplifting",
  "manhole",
  "blacklisted",
  "murder",
  "uneducated",
  "ugly",
  "lazy",
  "unemployed",
  "smelly",
  "failure",
];

const clues = [
  "Outdoor urban dwellers",
  "Reality challenged",
  "Sexually dysfunctional",
  "Sex care provider",
  "Intellectually impaired",
  "Ethically disorientated",
  "Emotional rape",
  "Equal opportunity sex care provider",
  "Economically marginalised",
  "undocumented worker",
  "Right wing protest",
  "Left wing riot",
  "chemically inconvenienced",
  "Behaviourally challenged",
  "Metabolic overachiever",
  "Economically deprived area",
  "Domestic engineer",
  "Economically inactive",
  "Someone who disagrees with the left",
  "Wealth redistribution",
  "Chalkboard",
  "Alternative facts",
  "Irregular shopping",
  "Utility hole",
  "Banned",
  "Unauthorised termination of life",
  "Lacking a liberal education",
  "Visually unfavourable",
  "Motivationally deficient",
  "Unintentionally at leisure",
  "Nasally disturbing",
  "Non-traditional success",
];

let playable = true;
updateAll();

const correctLetters = [];
const wrongLetters = [];

function updateAll() {
  selectedIndex = Math.floor(Math.random() * words.length);

  selectedWord = words[selectedIndex];

  selectedClue = clues[selectedIndex];
  clue.innerText = `PC_Clue: ${selectedClue}`;
}

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/[ \n]/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = ``;
    popup.style.display = "flex";

    playable = false;
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";

    playable = false;
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  playable = true;

  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // selectedWord = words[Math.floor(Math.random() * words.length)];
  updateAll();

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
