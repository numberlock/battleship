import { Player } from "./player";
import {
  Gameboard,
  createRotationButton,
  createShipSelector,
} from "./gameboard";

(function startGame() {
  const startBtn = document.querySelector(".start-game");
  const getInput = document.querySelector("#player-name");
  const getInputContainer = document.querySelector(".input-container");
  const boardContainer = document.querySelector(".board-container");

  startBtn.addEventListener("click", () => {
    if (getInput.value !== "") {
      getInputContainer.classList.toggle("hidden");
      boardContainer.classList.toggle("hidden");
      game = gameLoop(getInput.value);
      createRotationButton();
      createShipSelector();
    }
  });
})();

function gameLoop(input) {
  const pushPlayer0 = document.querySelector(".player0-name");
  const pushPlayer1 = document.querySelector(".player1-name");

  const player0 = Player(input);
  const player0Gameboard = Gameboard("player0");
  pushPlayer0.textContent = input;

  const player1 = Player("AI");
  const player1Gameboard = Gameboard("player1");
  pushPlayer1.textContent = player1.playerName;

  let activePlayer = "player0";
  let gameStatus = 0;
  //while (player0 ships are not all sunk || p1 ships are not all sunk )
  //check which player is active
  // if activeplayer === x add event listener to other board
  // -> hit oponent
  // -> remove event listener
  // -> check if all ships are sunk
  // -> change active player
  return { player0Gameboard, player1Gameboard, gameStatus, activePlayer };
}

export let game;

/* 

The game loop should set up a new game by creating Players and Gameboards.



but you should display both the player’s boards and render them using information from the Gameboard class.

You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.

The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.

Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.

*/
