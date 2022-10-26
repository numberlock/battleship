import { Player } from "./player";
import {
  endGame,
  Gameboard,
  createRotationButton,
  createShipSelector,
} from "./gameboard";
import { randomShot } from "./randomShot";

(function startGame() {
  const startBtn = document.querySelector(".start-game");
  const getInput = document.querySelector("#player-name");
  const getInputContainer = document.querySelector(".input-container");
  const boardContainer = document.querySelector(".board-container");

  startBtn.addEventListener("click", () => {
    if (getInput.value !== "") {
      getInputContainer.classList.toggle("hidden");
      boardContainer.classList.toggle("hidden");
      game = gameFunction(getInput.value);
      createRotationButton();
      createShipSelector();
    }
  });
})();

function gameFunction(input) {
  const pushPlayer0 = document.querySelector(".player0-name");
  const pushPlayer1 = document.querySelector(".player1-name");

  const player0 = Player(input);
  const player0Gameboard = Gameboard("player0");
  pushPlayer0.textContent = player0.playerName;

  const player1 = Player("Computer");
  const player1Gameboard = Gameboard("player1");
  pushPlayer1.textContent = player1.playerName;

  let activePlayer = "player0";
  let gameStatus = 0;

  function gameLoop() {
    game.activePlayer = "player1";
    setTimeout(randomShot, 1000);
    setTimeout(() => {
      game.activePlayer = "player0";
    }, 1000);
  }

  return {
    player0,
    player1,
    player0Gameboard,
    player1Gameboard,
    gameStatus,
    activePlayer,
    gameLoop,
  };
}

export let game;
