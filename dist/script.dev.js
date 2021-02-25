"use strict";

var wordEl = document.getElementById('word');
var wrongLettersEl = document.getElementById('wrong-letters');
var playAgainBtn = document.getElementById('play-button');
var popup = document.getElementById('popup-container');
var notification = document.getElementById('notification-container');
var finalMessage = document.getElementById('final-message');
var finalMessageRevealWord = document.getElementById('final-message-reveal-word');
var figureParts = document.querySelectorAll('.figure-part');
var words = ['combination', 'restaurant', 'supplementary', 'deprivation', 'nonremittal', 'appreciate', 'reservoir', 'offensive', 'authorise', 'appointment', 'adventure', 'rehabilitation', 'fireplace', 'temperature', 'demonstration', 'preference', 'recommend', 'countryside', 'economics', 'conviction', 'registration', 'repetition', 'essential', 'acquaintance', 'engagement', 'photocopy', 'provincial', 'apparatus', 'marketing', 'miserable', 'foreigner', 'integrity', 'eavesdrop', 'opposition', 'accountant', 'commitment', 'experiment', 'guarantee', 'waterfall', 'absorption', 'astonishing', 'unfortunate', 'defendant', 'functional', 'reduction', 'broadcast', 'represent', 'allowance', 'orientation', 'manufacturer', 'professional', 'dictionary', 'available', 'architect', 'mechanism', 'nightmare', 'discourage', 'conviction', 'conversation', 'conservative', 'difference', 'atmosphere', 'beautiful', 'firefighter', 'satisfied', 'strikebreaker'];
var selectedWord = words[Math.floor(Math.random() * words.length)];
var playable = true;
var correctLetters = [];
var wrongLetters = []; // Show hidden word

function displayWord() {
  wordEl.innerHTML = "\n    ".concat(selectedWord.split('').map(function (letter) {
    return "\n          <span class=\"letter\">\n            ".concat(correctLetters.includes(letter) ? letter : '', "\n          </span>\n        ");
  }).join(''), "\n  ");
  var innerWord = wordEl.innerText.replace(/[ \n]/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    finalMessageRevealWord.innerText = "";
    popup.style.display = 'flex';
    playable = false;
  }
} // Update the wrong letters


function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = "\n    ".concat(wrongLetters.length > 0 ? '<p>Wrong</p>' : '', "\n    ").concat(wrongLetters.map(function (letter) {
    return "<span>".concat(letter, "</span>");
  }), "\n  "); // Display parts

  figureParts.forEach(function (part, index) {
    var errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  }); // Check if lost

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    finalMessageRevealWord.innerText = "...the word was: ".concat(selectedWord);
    popup.style.display = 'flex';
    playable = false;
  }
} // Show notification


function showNotification() {
  notification.classList.add('show');
  setTimeout(function () {
    notification.classList.remove('show');
  }, 2000);
} // Keydown letter press


window.addEventListener('keydown', function (e) {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      var letter = e.key.toLowerCase();

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
}); // Restart game and play again

playAgainBtn.addEventListener('click', function () {
  playable = true; //  Empty arrays

  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});
displayWord();