import { GameLoop } from './GameLoop.js';
import MyGame from './MyGame.js';

const myGame: MyGame = new MyGame(document.getElementById('game') as HTMLCanvasElement);

const gameLoop: GameLoop = new GameLoop(myGame);
window.addEventListener('load', () => {
  gameLoop.start();
});
