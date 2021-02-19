'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

function init() {
  //Starting Conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();

function switchPlayer() {
  document.getElementById('current--' + activePlayer).textContent = 0;
  currentScore = 0;
  if (activePlayer == 0) {
    activePlayer = 1;
  } else activePlayer = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating Dice Roll

    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice

    diceEl.classList.remove('hidden');
    diceEl.src = 'dice-' + dice + '.png';

    // 3. Check for rolled 1 if true switch the next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        'current--' + activePlayer
      ).textContent = currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player

    scores[activePlayer] += currentScore;
    document.getElementById('score--' + activePlayer).textContent =
      scores[activePlayer];

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      diceEl.classList.toggle('hidden');
      playing = false;
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active ');
    } else {
      // Switch to next player

      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
