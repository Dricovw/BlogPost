import CanvasRenderer from './CanvasRenderer.js';

export default class Building {
  private image: HTMLImageElement;

  private posX: number;

  private posY: number;

  public constructor() {
    this.image = CanvasRenderer.loadNewImage('./assets/fabriek.png');
    this.posX = 180; // tijdelijke coordinaten
    this.posY = 90; // tijdelijke coordinaten
  }

  /**
   * @param canvas canvas to render the buildings
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public getPosY(): number {
    return this.posY;
  }

  public getPosX(): number {
    return this.posX;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }
}
