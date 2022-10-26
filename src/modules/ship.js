export function Ship(leng) {
  let health = leng;

  function hit() {
    this.health -= 1;
  }

  function isSunk() {
    if (this.health <= 0) return true;
    else return false;
  }

  return { hit, health, isSunk };
}
