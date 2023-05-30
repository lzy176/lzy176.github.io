
import { Events,Sleeping } from 'matter-js';
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
      Sleeping.afterCollisions(pairs);
      for (let i = 0; i < pairs.length; i++) {
        const { bodyA, bodyB } = pairs[i];
        if (bodyA.circleRadius && bodyA.circleRadius == bodyB.circleRadius) {
          this.collision(bodyA,bodyB);
         
        }
      }


      // var pairs = event.pairs;
      // for (var i = 0; i < pairs.length; i++) {
      //   var pair = pairs[i];

      //   // 检查碰撞的两个刚体是否为圆形刚体
      //   if (pair.bodyA.label === 'Circle Body' && pair.bodyB.label === 'Circle Body') {
      //     if (pair.bodyA.custom.radius !== pair.bodyB.custom.radius) continue;
      //     if (pair.bodyA.custom.type === 'collision' || pair.bodyB.custom.type === 'collision') continue;
      //     pair.bodyA.custom.type = 'collision';
      //     pair.bodyB.custom.type = 'collision';
      //     // console.log('两个圆形刚体发生碰撞！', pair.bodyA, pair.bodyB);
      //     this.collision(pair.bodyA, pair.bodyB);
      //   }
      // }
    });
  }
  collision() { };
}