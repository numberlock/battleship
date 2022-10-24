function createGameBoard(player) {
  "player0 gameboard";
  //container with class player0/player1
  //creates 10x10 grid
  //each square should have x,y value
  /* 
  //add event listener on mouseover -> add "hover class"
  // add event listener on click -> 
  if gameStatus = 0
    gameboard.placeShip()
  */
}

function createShipSelector() {
  //display name from ship inventory
  //for every 1 in ship size add square
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
  //add selected ship an "active" class
  //
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
const Gameboard = function (player) {
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
