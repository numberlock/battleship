import { game } from "./game";
import { Ship } from "./ship";

export function populateInventory() {
  let carrier = Ship(5);
  carrier.name = "carrier";
  carrier.pos = ["2,9", "3,9", "4,9", "5,9", "6,9"];

  let battleship = Ship(4);
  battleship.name = "battleship";
  battleship.pos = ["2,4", "2,3", "2,2", "2,1"];

  let destroyer = Ship(3);
  destroyer.name = "destroyer";
  destroyer.pos = ["6,1", "7,1", "8,1"];

  let submarine = Ship(3);
  submarine.name = "submarine";
  submarine.pos = ["9,5", "9,4", "9,3"];

  let patrol = Ship(2);
  patrol.name = "patrol";
  patrol.pos = ["5,5", "6,5"];

  game.player1Gameboard.inventory.push(
    carrier,
    battleship,
    destroyer,
    submarine,
    patrol
  );
}
