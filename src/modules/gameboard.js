import { shipInventory } from "./ship-inventory";
import { Ship } from "./ship";
import { game } from "./game";

let selectedShip;
let alreadyPlaced = [];

export function createGameBoard(player) {
  const playerContainer = document.querySelector(`.${player}`);

  for (let x = 0; x < 10; x++) {
    const createX = document.createElement("div");
    for (let y = 9; y >= 0; y--) {
      const createY = document.createElement("div");
      createY.dataset.cord = `${x},${y}`;
      createY.classList.add("board-square");
      createY.textContent = `${x},${y}`;

      createY.addEventListener("mouseover", () => {
        const allHoverClasses = document.querySelectorAll(".hover");
        allHoverClasses.forEach((element) => {
          element.classList.remove("hover");
        });
        createY.classList.add("hover");
      });

      createY.addEventListener("click", () => {
        /* here */
        let current = seperateCoordinates(createY.dataset.cord);
        checkSquareValidity(current.x, current.y);
        if (
          selectedShip !== undefined &&
          checkSquareValidity(current.x, current.y) !== false
        )
          game.player0Gameboard.placeShip(x, y);
      });
      createX.appendChild(createY);
    }
    playerContainer.appendChild(createX);
  }
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
          if (btnVer.classList.contains("placed")) isValid = false;
        }
      } else {
        for (let k = 0; k < shipInventory[i].size; k++) {
          let btnHor = document.querySelector(`[data-cord='${x + k},${y}']`);
          if (btnHor.classList.contains("placed")) isValid = false;
        }
      }
    }
  }
  return isValid;
}

export function createShipSelector() {
  const htmlSelector = document.querySelector(".ship-selector");
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

// HOVER EFFECT ********************
//check what square has "hover" class, add "hover" to other +5(check selected for number) horizontal/verticl depending on button
//hover effect on every square + squares horizontal/verticl of "selected" battleship size
//
/* 
document.querySelector(".hover").dataset
for(i= 0; i< shipinventory[i].size;i++)
document.queryselector(`.${x+1,y}`)
classList.add("green")
*/
export function Gameboard(player) {
  let boardOwner = player;
  createGameBoard(boardOwner);
  createRotationButton();
  createShipSelector();

  let inventory = [];

  function placeShip(x, y) {
    let selected = selectedShip;
    /* looks for ship size of selectedShip */
    for (let i = 0; i < shipInventory.length; i++) {
      if (selected === shipInventory[i].name) {
        let newShip = Ship(shipInventory[i].size);
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
  }

  //takes a pair of coordinates
  //sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
  function receiveAttack(coord) {
    //check "coords" if any of  ships in "inventory" was hit
    // if true run .hit() & "red" class to "coords"
    // else save "coords" to "missedShots" & add "yellow" class
    //check if ship was sunk / ADD COUNTER FOR ALL SUNK SHIPS UNDER BOARD
    //check if all ships have been sunk
  }

  //Gameboards should keep track of missed attacks so they can display them properly.
  let missedShots = [];
  return { placeShip, inventory };
}

/* 
test to add later:
if hover + trail is bigger then grid, dont show trail
if there is already a ship on certain coordinate
if shot has already been shot there, dont do it again
*/
