import "./style.css";
import game from "./modules/game.js";
import { createGameBoard } from "./modules/gameboard";
import { createShipSelector } from "./modules/gameboard";

createGameBoard("player0");
createShipSelector();

//DOM
/*
1st page:
  player name input
  button(start):
    create player    
    after it is pressed -> class hidden
    show page2
2nd page:
  generate shipselector
  when all ships are placed
    remove event listener from board
    hide shipselector
    show color meaning
    generate shipsSunk 0/5 under boards
    run game()
*/
