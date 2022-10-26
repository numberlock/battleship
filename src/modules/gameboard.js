import { shipInventory } from "./ship-inventory";
import { Ship } from "./ship";
import { game } from "./game";
import { populateInventory } from "./populateInventory";

let selectedShip;
let alreadyPlaced = [];
export let endGame;

function createGameBoard(player) {
  const playerContainer = document.querySelector(`.${player}`);

  for (let x = 0; x < 10; x++) {
    const createX = document.createElement("div");
    for (let y = 9; y >= 0; y--) {
      const createY = document.createElement("div");
      createY.dataset.cord = `${x},${y}`;
      createY.classList.add("board-square", `${player}-square`);
      createY.textContent = `${x},${y}`;

      createY.addEventListener("mouseover", () => {
        removeHover();
        createY.classList.add("hover");
        let current = seperateCoordinates(createY.dataset.cord);
        checkSquareValidity(current.x, current.y);
      });

      createY.addEventListener("click", () => {
        if (game.gameStatus === 0) {
          let current = seperateCoordinates(createY.dataset.cord);
          checkSquareValidity(current.x, current.y);
          if (
            selectedShip !== undefined &&
            checkSquareValidity(current.x, current.y) !== false
          )
            game.player0Gameboard.placeShip(x, y);
        }
        if (
          game.gameStatus === 1 &&
          game.activePlayer === "player0" &&
          createY.classList.contains("player1-square")
        ) {
          if (
            !game.player1Gameboard.shotsHit.includes(`${x},${y}`) &&
            !game.player1Gameboard.shotsMissed.includes(`${x},${y}`)
          ) {
            game.player1Gameboard.receiveAttack(`${x},${y}`);
            game.gameLoop();
          }
        }
      });

      createX.appendChild(createY);
    }
    playerContainer.appendChild(createX);
  }
}

function removeHover() {
  const allHoverClasses = document.querySelectorAll(".hover");
  allHoverClasses.forEach((element) => {
    element.classList.remove("hover");
  });
}

function seperateCoordinates(coord) {
  let coordSplit = coord.split(",");
  let coordNumbers = coordSplit.map((num) => Number(num));
  let x = coordNumbers[0];
  let y = coordNumbers[1];
  return { x, y };
}

function checkSquareValidity(x, y) {
  const buttonSelector = document.querySelector(".rotation-button");
  let selected = selectedShip;
  let isValid = "";
  for (let i = 0; i < shipInventory.length; i++) {
    if (selected === shipInventory[i].name) {
      if (buttonSelector.textContent === "Vertical") {
        for (let j = 0; j < shipInventory[i].size; j++) {
          let btnVer = document.querySelector(`[data-cord='${x},${y - j}']`);
          btnVer.classList.add("hover");
          if (btnVer.classList.contains("placed")) isValid = false;
        }
      } else {
        for (let k = 0; k < shipInventory[i].size; k++) {
          let btnHor = document.querySelector(`[data-cord='${x + k},${y}']`);
          btnHor.classList.add("hover");
          if (btnHor.classList.contains("placed")) isValid = false;
        }
      }
    }
  }
  return isValid;
}

export function createShipSelector() {
  const htmlSelector = document.querySelector(".ship-selector");
  if (htmlSelector.hasChildNodes()) return;
  for (let i = 0; i < shipInventory.length; i++) {
    const shipContainer = document.createElement("div");
    shipContainer.dataset.ship = `${shipInventory[i].name}`;

    const shipName = document.createElement("div");
    shipName.textContent = `${shipInventory[i].name}`;

    const shipSize = document.createElement("div");
    shipSize.classList.add("ship-size-container");
    for (let j = 0; j < shipInventory[i].size; j++) {
      const sizeSquare = document.createElement("div");
      sizeSquare.classList.add(
        "shipSizeSquare",
        `${shipContainer.dataset.ship}-shipSizeSquare`
      );
      shipSize.appendChild(sizeSquare);
    }
    shipContainer.append(shipName, shipSize);
    /* EVENT LISTENER */
    shipContainer.addEventListener("click", oneAtTheTimeListener);

    function oneAtTheTimeListener() {
      const findActiveSelector = document.querySelector(".selected");
      if (findActiveSelector !== null) {
        const findActiveSelectorSquares = document.querySelectorAll(
          `.${findActiveSelector.dataset.ship}-shipSizeSquare`
        );
        findActiveSelectorSquares.forEach((square) => {
          square.classList.remove("selected-square");
        });
        findActiveSelector.classList.remove("selected");
      }
      /* only one ship of the same type can be placed at a time */
      if (!alreadyPlaced.includes(shipContainer.dataset.ship)) {
        shipContainer.classList.add("selected");
        selectedShip = shipContainer.dataset.ship;
        const findNewActiveSquares = document.querySelectorAll(
          `.${shipContainer.dataset.ship}-shipSizeSquare`
        );
        findNewActiveSquares.forEach((square) => {
          square.classList.add("selected-square");
        });
      }
    }
    htmlSelector.appendChild(shipContainer);
  }
}

export function createRotationButton() {
  const buttonSelector = document.querySelector(".rotation-button");
  buttonSelector.addEventListener("click", () => {
    buttonSelector.textContent === "Vertical"
      ? (buttonSelector.textContent = "Horizontal")
      : (buttonSelector.textContent = "Vertical");
  });
}

function checkNumPlaced() {
  const getRotationButton = document.querySelector(".rotation-button");
  const getShipSelector = document.querySelector(".ship-selector");
  const getPlayer1Container = document.querySelector(".player1-container");
  const getDisplay = document.querySelector(".display");
  if (alreadyPlaced.length === 1) {
    getRotationButton.classList.toggle("hidden");
    getShipSelector.classList.toggle("hidden");
    getPlayer1Container.classList.toggle("hidden");
    getDisplay.classList.toggle("hidden");
    populateInventory();
    game.gameStatus = 1;
  }
}

export function Gameboard(player) {
  let boardOwner = player;
  let shotsHit = [];
  let shotsMissed = [];
  let sunkCounter = 0;

  createGameBoard(boardOwner);

  let inventory = [];

  function placeShip(x, y) {
    removeHover();
    let selected = selectedShip;
    /* looks for ship size of selectedShip */
    for (let i = 0; i < shipInventory.length; i++) {
      if (selected === shipInventory[i].name) {
        let newShip = Ship(shipInventory[i].size);
        newShip.name = selected;
        newShip.pos = [];

        /* loop iterates through ships size and adds coordinates into ship array */
        const buttonSelector = document.querySelector(".rotation-button");
        if (buttonSelector.textContent === "Vertical") {
          for (let j = 0; j < shipInventory[i].size; j++) {
            newShip.pos.push(`${x},${y - j}`);
            const verticalSel = document.querySelector(
              `[data-cord='${x},${y - j}']`
            );
            verticalSel.classList.add("placed");
          }
        } else {
          for (let k = 0; k < shipInventory[i].size; k++) {
            newShip.pos.push(`${x + k},${y}`);
            const horizontalSel = document.querySelector(
              `[data-cord='${x + k},${y}']`
            );
            horizontalSel.classList.add("placed");
          }
        }
        inventory.push(newShip);
      }
    }
    alreadyPlaced.push(selected);
    selectedShip = undefined;

    const alreadyPlacedShipSquares = document.querySelectorAll(
      `.${selected}-shipSizeSquare`
    );
    alreadyPlacedShipSquares.forEach((element) => {
      element.classList.remove("selected-square");
    });
    checkNumPlaced();
  }

  function receiveAttack(coord) {
    const getDisplay = document.querySelector(".display");
    const player0 = document.querySelector(".player0");
    const player1 = document.querySelector(".player1");
    const whosOwner = boardOwner === "player0" ? player0 : player1;
    const playerSelector =
      boardOwner === "player0"
        ? game.player1.playerName
        : game.player0.playerName;

    let currentShip;
    let shot = coord;
    let didHit;
    for (let i = 0; i < inventory.length; i++) {
      let position = inventory[i].pos.length;
      for (let j = 0; j < position; j++) {
        if (inventory[i].pos[j] === shot) {
          currentShip = inventory[i];
          inventory[i].hit();
          didHit = true;
          currentSank(currentShip, boardOwner, sunkCounter);
        }
      }
    }
    if (didHit) {
      const shotHit = whosOwner.querySelector(`[data-cord="${shot}"]`);
      shotHit.classList.add("hit");
      shotsHit.push(shot);
      getDisplay.textContent = `${playerSelector}'s shot hit!`;
    } else {
      let findMissedShot = whosOwner.querySelector(`[data-cord="${shot}"]`);
      findMissedShot.classList.add("missed-shots");
      shotsMissed.push(shot);
      getDisplay.textContent = `${playerSelector}'s shot missed!`;
    }

    function currentSank() {
      if (currentShip.isSunk()) {
        sunkCounter += 1;
        for (let i = 0; i < currentShip.pos.length; i++) {
          let findSunkenSquare = whosOwner.querySelector(
            `[data-cord="${currentShip.pos[i]}"]`
          );
          findSunkenSquare.classList.add("sunk");
        }
        pushToShipsSunk();
        allSunk();
      }
    }

    function allSunk() {
      if (sunkCounter === 5) endGame = boardOwner;
    }

    function pushToShipsSunk() {
      let getTotalSunk = document.querySelector(`.${boardOwner}-sunk`);
      getTotalSunk.textContent = `Ships sunk: ${sunkCounter}/5`;
    }
  }

  return { placeShip, receiveAttack, inventory, shotsMissed, shotsHit };
}
