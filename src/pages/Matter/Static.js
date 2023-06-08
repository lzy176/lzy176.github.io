
import {
  Bodies,
  Body,
  Composite,
} from 'matter-js';
export default class Static {
  constructor(world,canvasParent) {
    this.world = world;
    this.canvasWidth = canvasParent.offsetWidth;
    this.canvasHeight = window.innerHeight;
    this.init();
  }
  init() {
    let rect1 = Bodies.rectangle(this.canvasWidth / 2, this.canvasHeight - 120 / 2, this.canvasWidth, 120, {
    });
    let rect2 = Bodies.rectangle(-10 / 2, this.canvasHeight / 2, 10, this.canvasHeight, {
    });
    let rect3 = Bodies.rectangle(10 / 2 + this.canvasWidth, this.canvasHeight / 2, 10, this.canvasHeight, {
    });
    let c1 = Body.create({
      isStatic: true,
      parts: [rect1, rect2, rect3],
      render: {
        fillStyle: '#F55A3C'
      }
    });
    Composite.add(this.world, c1);
  }
}