<template>
	<div id="canvas">
	</div>
</template>

<script>
import {
	Engine,
	Render,
	Runner,
	Body,
	Composites,
	MouseConstraint,
	Mouse,
	Bodies,
	Composite,
	Constraint,
	Vector,
} from 'matter-js';
export default {
	name: 'Chart',
	data() {
		return {};
	},
	methods: {
		initMatter() {
			// 创建引擎
			let engine = Engine.create();
			// 创建世界
			let world = engine.world;
			// 创建渲染器
			let render = Render.create({
				element: document.getElementById('canvas'),
				engine: engine,
				options: {
					width: 800,
					height: 600,
					showVelocity: true,
				},
			});
			// 在requestAnimationFrame事件上持续渲染画布
			Render.run(render);
			// 创建动画循环
			let runner = Runner.create();
			// 在requestAnimationFrame事件上连续记录引擎
			Runner.run(runner, engine);
			// 创建一个鼠标模块
			let mouse = Mouse.create(render.canvas);
			// 创建鼠标模块约束方法
			let mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false,
					},
				},
			});
			// 添加组合
			Composite.add(world, mouseConstraint);
			// 使鼠标与渲染保持同步
			render.mouse = mouse;
			// 将渲染视口适配到场景
			Render.lookAt(render, {
				min: { x: 0, y: 50 },
				max: { x: 800, y: 600 },
			});
			return { world };
		},
	},
	mounted() {
		let { world } = this.initMatter();
		let rect1 = Bodies.rectangle(400, 400, 400, 20);
		let rect2 = Bodies.rectangle(200, 300, 20, 200);
		let rect3 = Bodies.rectangle(600, 300, 20, 200);
		let rect4 = Bodies.rectangle(400, 600, 800, 50.5, {
			isStatic: true,
			render: { fillStyle: '#060a19' },
		});
		let rect5 = Bodies.rectangle(250, 500, 20, 20, { isStatic: true });
		let rect6 = Bodies.rectangle(550, 500, 20, 20, { isStatic: true });
		let c1 = Body.create({
			parts: [rect1, rect2, rect3],
		});
		let line = Constraint.create({
			pointA: { x: 400, y: 100 },
			pointB: { x: 400, y: 400 },
		});
		let point = Constraint.create({
			bodyA: c1,
			pointB: Vector.clone(c1.position),
			stiffness: 1,
			length: 0,
		});
		let rect7 = Bodies.rectangle(300, 100, 50, 50);
		let rect8 = Bodies.rectangle(500, 100, 50, 50);
		Composite.add(world, [rect4, rect5, rect6, line, point, c1, rect7, rect8]);
	},
};
</script>

<style scoped >
</style>
