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
let newShip = Ship(6);

/* module.exports = newShip;*/
