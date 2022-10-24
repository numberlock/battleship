const Ship = function (leng) {
  this.leng = leng;
  this.health = leng;

  function hit() {
    this.health -= 1;
  }

  function isSunk() {
    if (this.health === 0) return true;
    else return false;
  }

  return { hit, health, isSunk };
};

/* const inventory = [];
(function test(ship) {
  const newShip = Ship(5);
  newShip.pos = ["1,2", "1,3", "1,4", "1,5", "1,6"];
  inventory.push({ name: "example", newShip });
})();
 */
