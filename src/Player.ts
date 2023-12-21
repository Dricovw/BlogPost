import Building from './Building.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Player {
  private image: HTMLImageElement;

  private imageAnimation: HTMLImageElement[][];

  private imageCurrentNumber: number;

  // use new thingy, using elapsed, sort of the same thing with spawning new items falling down

  private speed: number;

  private posX: number;

  private posY: number;

  private maxY: number;

  private maxX: number;

  private move: string = 'down';

  private movingUp: boolean = false;

  private movingDown: boolean = false;

  private movingLeft: boolean = false;

  private movingRight: boolean = false;

  private i: number = 0;

  private changeImage: number = 0;

  public constructor(maxY: number, maxX: number) {
    this.image = CanvasRenderer.loadNewImage('./assets/girlDown1.png');
    this.imageAnimation = [
      [
        CanvasRenderer.loadNewImage('./assets/girlUp1.png'),
        CanvasRenderer.loadNewImage('./assets/girlUp2.png'),
        CanvasRenderer.loadNewImage('./assets/girlUp3.png'),
      ],
      [CanvasRenderer.loadNewImage('./assets/girlDown1.png'),
      CanvasRenderer.loadNewImage('./assets/girlDown2.png'),
      CanvasRenderer.loadNewImage('./assets/girlDown3.png'),
      ],
      [CanvasRenderer.loadNewImage('./assets/girlLeft1.png'),
      CanvasRenderer.loadNewImage('./assets/girlLeft2.png'),
      CanvasRenderer.loadNewImage('./assets/girlLeft3.png'),
      ],
      [CanvasRenderer.loadNewImage('./assets/girlRight1.png'),
      CanvasRenderer.loadNewImage('./assets/girlRight2.png'),
      CanvasRenderer.loadNewImage('./assets/girlRight3.png'),
      ],
    ];
    this.imageCurrentNumber = 0;
    this.speed = 0.4; // wellicht tijdelijk
    this.posX = 0;
    this.posY = 434;
    this.maxY = maxY;
    this.maxX = maxX;
  }

  public PlayerMove(move: string): void {
    this.move = move;
    (this as any)[`moving${move}`] = true;
  }

  /**
   * @param building check if player is in front of building
   * @returns true if the player is in front of building
   */
  public isNearBuilding(building: Building): boolean {
    return (building.getPosX() + building.getWidth() > this.posX
      && building.getPosX() < this.posX + this.image.width
      && building.getPosY() + building.getHeight() + 50 > this.posY);
  }

  /**
   * checks whether player collides with the building
   * @param building buidling
   * @returns true if the player collides with the building
   */
  public checkCollisionBuilding(building: Building): boolean {
    return (building.getPosX() + building.getWidth() > this.posX
      && building.getPosX() < this.posX + this.image.width
      && building.getPosY() + building.getHeight() - this.image.height > this.posY);
  }

  public imageloop(): number {
    if (this.changeImage % 10 === 0)  {
      if (this.i >= 2) {
        this.i = -1;
      }
      this.i += 1;      
    }
    this.changeImage += 1;
    return this.i;
  }

  /**
   * Update the position of the player
   * @param elapsed elapsed time in the game
   * @param building building exists
   */
  public update(elapsed: number, building: Building): void {
    if (this.move === 'Up') {
      this.imageCurrentNumber = 0;
      this.imageloop();
      this.posY -= this.speed * elapsed;
      if (this.posY < 180) {
        this.posY = 180;
      }
      if (this.checkCollisionBuilding(building)) {
        this.posY = building.getPosY() + building.getHeight() - this.image.height;
      }
      this.movingUp = false;
    }
    if (this.move === 'Down') {
      this.imageCurrentNumber = 1;
      this.imageloop();
      this.posY += this.speed * elapsed;
      if ((this.posY + this.image.height) > this.maxY) {
        this.posY = this.maxY - this.image.height;
      }
      this.movingDown = false;
    }
    if (this.move === 'Left') {
      this.imageCurrentNumber = 2;
      this.imageloop();
      this.posX -= this.speed * elapsed;
      if (this.posX < 0) {
        this.posX = 0;
      }
      if (this.checkCollisionBuilding(building)) {
        if (this.posY < building.getPosY() + building.getHeight() - this.image.height - 10) {
          this.posX = building.getPosX() + building.getWidth();
        }
      }
      this.movingLeft = false;
    }
    if (this.move === 'Right') {
      this.imageCurrentNumber = 3;
      this.imageloop();
      this.posX += this.speed * elapsed;
      if ((this.posX + this.image.width) > this.maxX) {
        this.posX = this.maxX - this.image.width;
      }
      if (this.checkCollisionBuilding(building)) {
        if (this.posY < building.getPosY() + building.getHeight() - this.image.height - 10) {
          this.posX = building.getPosX() - this.image.width;
        }
      }
      this.movingRight = false;
    }
  }

  /**
   * Draw the player image on the canvas
   *
   * @param canvas the canvas the image will be rendered to
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
    this.image = this.imageAnimation[this.imageCurrentNumber][this.i];
  }
  
  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }
}