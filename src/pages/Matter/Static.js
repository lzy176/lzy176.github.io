
import {
  Bodies,
  Body,
  Composite,
} from 'matter-js';
export default class Static {
  constructor(world) {
    this.world = world;
    this.canvasHeight = window.innerHeight * 750 / window.innerWidth;
    this.init();
  }
  init() {
    let rect1 = Bodies.rectangle(750 / 2, this.canvasHeight - 30 / 2, 750, 30, {
    });
    let rect2 = Bodies.rectangle(-10 / 2, this.canvasHeight / 2, 10, this.canvasHeight, {
    });
    let rect3 = Bodies.rectangle(10 / 2 + 750, this.canvasHeight / 2, 10, this.canvasHeight, {
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