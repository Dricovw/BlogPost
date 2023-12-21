import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Building from './Building.js';
import Scene from './Scene.js';
import Bibliotheek from './Bibliotheek.js';
import MouseListener from './MouseListener.js';

export default class MainWorld extends Scene {
  private switching: boolean;

  private nearBuilding: boolean;

  private buttonE: HTMLImageElement;

  private background: HTMLImageElement;

  private player: Player;

  private building: Building;

  private keyListener: KeyListener;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.keyListener = new KeyListener();

    this.player = new Player(maxY, maxX);
    this.background = CanvasRenderer.loadNewImage('./assets/background.png') || new Image();
    this.buttonE = CanvasRenderer.loadNewImage('./assets/buttonE.png') || new Image(); // ander plaatje
    this.building = new Building();
    this.switching = false;
    this.nearBuilding = false;
  }

  /**
   * Updates the game. So far only the player gets updated.
   * @param elapsed time elapsed in the game.
   * @returns true to keep the gameloop going.
   */
  public update(elapsed: number): boolean {
    this.player.update(elapsed, this.building);
    return true;
  }

  /**
   * Processes the player's input.
   *
   * @param mouseListener mouselistener
   */
  public processInput(mouseListener: MouseListener): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_W)) {
      this.player.PlayerMove('Up');
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.player.PlayerMove('Down');
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
      this.player.PlayerMove('Left');
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_D)) {
      this.player.PlayerMove('Right');
    }

    if (this.player.isNearBuilding(this.building)) {
      this.nearBuilding = true;
      console.log('near building true');
      if (mouseListener.buttonPressed(0)) {
        this.switching = true;
      }
    }
  }

  /**
   *
   * @returns new scene to switch to, or null to keep current scene
   */
  public override getNextScene(): Scene | null {
    if (this.switching) {
      return new Bibliotheek(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Renders the player to the screen.
   *
   * @param canvas the canvas to draw to.
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.background, 0, 0);

    this.building.render(canvas);
    this.player.render(canvas);

    // PROBLEM: buttonE verdwijnt niet als de player buiten de near building borders gaat.
    // WERKT: klikken werkt alleen wanneer nearBuilding actief is, er buiten niet
    if (this.nearBuilding) {
      CanvasRenderer.drawImage(canvas, this.buttonE, 250, 200);
    }
  }
}