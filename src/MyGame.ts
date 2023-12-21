import { Game } from './GameLoop.js';

import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import Start from './Start.js';
import MouseListener from './MouseListener.js';

export default class MyGame extends Game {
  private currentScene: Scene;

  private mouseListener: MouseListener;

  private canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = 742;
    this.canvas.width = 1536;

    this.mouseListener = new MouseListener(this.canvas);

    this.currentScene = new Start(this.canvas.width, this.canvas.height);
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    this.currentScene.processInput(this.mouseListener);
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    this.currentScene.update(elapsed);
    const nextScene: Scene = this.currentScene.getNextScene();
    if (nextScene !== null) {
      this.currentScene = nextScene;
    }
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.currentScene.render(this.canvas);
  }
}
