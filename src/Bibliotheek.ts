import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import MainWorld from './MainWorld.js';

export default class Bibliotheek extends Scene {
  private background: HTMLImageElement;

  private bookshelf: HTMLImageElement;

  private book: HTMLImageElement;

  private xMark: HTMLImageElement;

  private checkMark: HTMLImageElement;

  private image: HTMLImageElement;

  private goIntoBuidling: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    const random: number = Math.random();
    if (random > 0.6) {
      this.image = CanvasRenderer.loadNewImage('./assets/cat test.png');
    } else if (random > 0.3) {
      this.image = CanvasRenderer.loadNewImage('./assets/doggo test.png');
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/cat2 test.png');
    }
    this.background = CanvasRenderer.loadNewImage('./assets/background.png'); // ander plaatje
    this.bookshelf = CanvasRenderer.loadNewImage('./assets/bookshelf test.png'); // ander plaatje
    this.book = CanvasRenderer.loadNewImage('./assets/book test.jpg'); // ander plaatje
    this.xMark = CanvasRenderer.loadNewImage('./assets/x-mark test.png'); // ander plaatje
    this.checkMark = CanvasRenderer.loadNewImage('./assets/checkmark test.png'); // ander plaatje
    this.goIntoBuidling = false;
  }

  /**
   * @param mouseListener go into building (bibliotheek)
   */
  public processInput(mouseListener: MouseListener): void {
  }

  /**
   * @param elapsed elapsed ms since last update
   */
  public update(elapsed: number): void {}

  /**
   *
   * @returns the next scene to be rendered. null if no change
   */
  public override getNextScene(): Scene | null {
    if (this.goIntoBuidling) {
      return new MainWorld(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * @param canvas render image to canvas
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.background, 0, 0);
    CanvasRenderer.drawImage(canvas, this.bookshelf, 900, 300);
    CanvasRenderer.drawImage(canvas, this.book, 230, 100);
    CanvasRenderer.drawImage(canvas, this.xMark, 250, 430);
    CanvasRenderer.drawImage(canvas, this.checkMark, 430, 430);
    CanvasRenderer.drawImage(canvas, this.image, 230, 100);
  }
}
