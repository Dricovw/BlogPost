import CanvasRenderer from './CanvasRenderer.js';
import MainWorld from './MainWorld.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';

export default class Start extends Scene {
  private starting: boolean;

  private background: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.background = CanvasRenderer.loadNewImage('');
    this.starting = false;
  }

  /**
   * Process input from the mouse
   *
   * @param mouseListener mouse listener object
   */
  public processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(0)) {
      this.starting = true;
    }
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public update(elapsed: number): void {}

  /**
   *
   * @returns the next scene to be rendered. null if no change
   */
  public override getNextScene(): Scene | null {
    if (this.starting) {
      return new MainWorld(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * @param canvas render image to canvas
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.background, 0, 0);
  }
}
