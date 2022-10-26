import { game } from "./src/modules/game";

export default function populateInventory() {
  game.player1Gameboard.inventory = [
    {
      health: 5,
      name: "carrier",
      pos: ["2,9", "3,9", "4,9", "5,9", "6,9"],
      hit() {
        this.health -= 1;
      },
      isSunk() {
        if (this.health === 0) return true;
        else return false;
      },
    },
    {
      health: 4,
      name: "battleship",
      pos: ["2,4", "2,3", "2,2", "2,1"],
      hit() {
        this.health -= 1;
      },
      isSunk() {
        if (this.health === 0) return true;
        else return false;
      },
    },
    {
      health: 3,
      name: "destroyer",
      pos: ["6,1", "7,1", "8,1"],
      hit() {
        this.health -= 1;
      },
      isSunk() {
        if (this.health === 0) return true;
        else return false;
      },
    },
    {
      health: 3,
      name: "submarine",
      pos: ["9,5", "9,4", "9,3"],
      hit() {
        this.health -= 1;
      },
      isSunk() {
        if (this.health === 0) return true;
        else return false;
      },
    },
    {
      health: 2,
      name: "patrol",
      pos: ["5,5", "6,5"],
      hit() {
        this.health -= 1;
      },
      isSunk() {
        if (this.health === 0) return true;
        else return false;
      },
    },
  ];
}
