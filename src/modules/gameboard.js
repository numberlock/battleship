import { shipInventory } from "./ship-inventory";

export function createGameBoard(player) {
  const playerContainer = document.querySelector(`.${player}`);

  for (let x = 0; x < 10; x++) {
    const createX = document.createElement("div");
    for (let y = 0; y < 10; y++) {
      const createY = document.createElement("div");
      createY.dataset.cord = `${y},${x}`;
      createY.textContent = `${y},${x}`;

      createY.addEventListener("mouseover", () => {
        createY.classList.add("hover");
      });

      createY.addEventListener("click", () => {
        // add event listener on click ->
        //if gameStatus = 0
        //gameboard.placeShip()
      });
      createX.appendChild(createY);
    }
    playerContainer.appendChild(createX);
  }
}

export function createShipSelector() {
  const htmlSelector = document.querySelector(".ship-selector");
  for (let i = 0; i < shipInventory.length; i++) {
    const shipContainer = document.createElement("div");
    shipContainer.dataset.ship = `${shipInventory[i].name}`;

    const shipName = document.createElement("div");
    shipName.textContent = `${shipInventory[i].name}`;

    const shipSize = document.createElement("div");
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
    //could be added to seperate function
    shipContainer.addEventListener("click", () => {
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
      shipContainer.classList.add("selected");
      const findNewActiveSquares = document.querySelectorAll(
        `.${shipContainer.dataset.ship}-shipSizeSquare`
      );
      findNewActiveSquares.forEach((square) => {
        square.classList.add("selected-square");
      });
    });
    htmlSelector.appendChild(shipContainer);
  }

  //give squares same class/dataset as ship name
  //add event listener for ship selector
  //there should only be one "selected" class for all ships at a time
  //when a new ship is pressed remove all active classes and add it to new ship
  // selectedShip("selected-ship")
}

function createRotationButton() {
  //add class "rotation"
  //add event listener to  button
  //if button.textContent === horizontal ? textC = vertial : textC: horizontal
}

function selectedShip() {
  //save selected ship class to "selected"
  //return "selected"
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
export const Gameboard = function (player) {
  let boardOwner = player;
  //how do we know where they are placed
  createGameBoard(boardOwner);
  createRotationButton();
  createShipSelector();

  this.inventory = [];
  //Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
  function placeShip(coord) {
    //check selected -> look up ship size
    // call Ship(size)
    //add pos + size, from coord
    //add class "ship name" + color
    //also add color to ship selector DOM
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
};

/* 
test to add later:
if hover + trail is bigger then grid, dont show trail
if there is already a ship on certain coordinate
if shot has already been shot there, dont do it again
*/
