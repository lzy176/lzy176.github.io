
import {
  Engine,
  Render,
  Runner,
  MouseConstraint,
  Mouse,
  Composite,
} from 'matter-js';
export default class Basic {
  constructor(canvas, canvasParent) {
    this.canvas = canvas;
    this.canvasParent = canvasParent;
    this.initScenes()
    this.setControls()
  }

  /**
   * 初始化场景
   */
  initScenes() {
    // 创建引擎
    this.engine = Engine.create({
      // enableSleeping: true
    });
    // 创建世界
    this.world = this.engine.world;
    this.world.bounds = { min: { x: 0, y: 0 }, max: { x: window.innerWidth, y: window.innerHeight } };
    // 创建渲染器
    this.render = Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: this.canvasParent.offsetWidth,
        height: window.innerHeight,
        wireframes: false,
      },
    });
    // 在requestAnimationFrame事件上持续渲染画布
    Render.run(this.render);
    // 创建动画循环
    this.runner = Runner.create();
    // 在requestAnimationFrame事件上连续记录引擎
    Runner.run(this.runner, this.engine);
  }

  /**
   * 设置控制器
   */
  setControls() {
    this.mouse = Mouse.create(this.render.canvas);
    this.mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: this.mouse,
    })
  }
}