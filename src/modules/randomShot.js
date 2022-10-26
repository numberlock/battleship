import { game } from "./game";

function randomCoordinates() {
  const one = Math.floor(Math.random(1) * 10);
  const two = Math.floor(Math.random(1) * 10);
  return `${one},${two}`;
}

export function randomShot() {
  let randomCords = randomCoordinates();
  while (
    game.player0Gameboard.shotsMissed.includes(randomCords) ||
    game.player0Gameboard.shotsHit.includes(randomCords)
  )
    randomCords = randomCoordinates();
  game.player0Gameboard.receiveAttack(randomCords);
}
