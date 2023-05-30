
import {
  Engine,
  Render,
  Runner,
  MouseConstraint,
  Mouse,
  Composite,
} from 'matter-js';
export default class Basic {
  constructor(canvas) {
    this.canvas = canvas;
    this.initScenes()
    this.setControls()
  }

  /**
   * 初始化场景
   */
  initScenes() {
    // 创建引擎
    this.engine = Engine.create({
      enableSleeping: true
    });
    // 创建世界
    this.world = this.engine.world;
    this.world.bounds = { min: { x: 0, y: 0}, max: { x: 750, y: window.innerHeight * 750 / window.innerWidth } };
    // 创建渲染器
    this.render = Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: 750,
        height: window.innerHeight * 750 / window.innerWidth,
        wireframes: false,
        showSleeping:false
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
    return;
    // 创建一个鼠标模块
    this.mouse = Mouse.create(this.render.canvas);
    // 创建鼠标模块约束方法
    this.mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    // 添加组合
    Composite.add(this.world, this.mouseConstraint);
    // 使鼠标与渲染保持同步
    this.render.mouse = this.mouse;
  }
}