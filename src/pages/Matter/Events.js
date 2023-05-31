
import { Events } from 'matter-js';
export default class Basic {
  constructor(mouseConstraint, engine) {
    this.mouseConstraint = mouseConstraint;
    this.engine = engine;
    this.isDown = false;
    this.watchDownEvent();
    this.watchCollision();
  }
  prohibitDown() {
    this.isDown = true;
    let startTime = new Date().getTime();
    let inter = setInterval(() => {
      let endTime = new Date().getTime();
      if (endTime - startTime >= 1000) {
        this.isDown = false;
        clearInterval(inter);
      }
    });
  }
  watchDownEvent() {
    Events.on(this.mouseConstraint, 'mouseup', (val) => {
      this.updateCirclePosition(val);
      this.activationCircle();
    });
    Events.on(this.mouseConstraint, 'mousemove', (val) => {
      this.updateCirclePosition(val);
    });
  };
  updateCirclePosition() { };
  activationCircle() { };

  watchCollision() {
    Events.on(this.engine, 'collisionStart', (e) => {
      const { pairs } = e;
      // Sleeping.afterCollisions(pairs);
      for (let i = 0; i < pairs.length; i++) {
        const { bodyA, bodyB } = pairs[i];
        if (bodyA.circleRadius && bodyA.circleRadius == bodyB.circleRadius) {
          this.collision(bodyA,bodyB);
         
        }
      }
    });
  }
  collision() { };
}