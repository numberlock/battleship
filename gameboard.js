//there should be one for each player
const Gameboard = function () {
  const shipInventory = [
    { name: "carrier", size: 5 },
    { name: "battleship", size: 4 },
    { name: "destroyer", size: 3 },
    { name: "submarine", size: 3 },
    { name: "patrol boat", size: 2 },
  ];

  //takes a pair of coordinates
  //sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
  function receiveAttack(coord) {}
  let shipStatus = [];
  let missedShots = [];
};

/* 
Gameboards should be able to place ships at specific coordinates by calling the ship factory function.

Gameboards should have a "receiveAttack" function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

Gameboards should keep track of missed attacks so they can display them properly.

Gameboards should be able to report whether or not all of their ships have been sunk.
*/
