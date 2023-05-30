<template>
	<canvas id="myCanvas"></canvas>
</template>

<script>
import { Bodies, Composite, Body, Sleeping } from 'matter-js';
import Static from './Static';
import Basic from './Basic';
import Events from './Events';
export default {
	name: 'Matter',
	data() {
		return {
			moveCircle: null,
			config: [
				{
					radius: 20,
					sprite: '/static/images/Mercury.png',
				},
				{
					radius: 26,
					sprite: '/static/images/Mars.png',
				},
				{
					radius: 33,
					sprite: '/static/images/Venus.png',
				},
				{
					radius: 43,
					sprite: '/static/images/theEarth.png',
				},
				{
					radius: 56,
					sprite: '/static/images/Neptune.png',
				},
				{
					radius: 73,
					sprite: '/static/images/Uranus.png',
				},
				{
					radius: 95,
					sprite: '/static/images/Saturn.png',
				},
				{
					radius: 124,
					sprite: '/static/images/Jupiter.png',
				},
			],
			circleTargetArr: [],
			level: 0,
		};
	},
	methods: {
		getRadius() {
			const radius = [10, 15, 22.5, 33.75];
			const max = this.level > 4 ? 4 : this.level;
			return radius[Math.floor(Math.random() * max)];
		},
		getColor(radius) {
			return radius === 10 ? '#FF0000' : this.config[radius].color;
		},
		setLevel() {
			if (this.circleTargetArr.length < 2) return (this.level = 1);
			const max = this.circleTargetArr.reduce(function (a, b) {
				return a.custom.radius > b.custom.radius ? a : b;
			});
			this.level = this.config[max.custom.radius].level;
		},
		// 添加球体
		addCircle() {
			const dataTemp = this.config.slice(0, 4);
			const index =
				this.level === 0 ? 0 : (Math.random() * dataTemp.length) | 0;
			const { radius, sprite } = dataTemp[index];
			this.circle = Bodies.circle(750 / 2, radius + 30, radius, {
				isStatic: true,
				restitution: 0.2,
				render: {
					sprite: {
						texture: sprite,
					},
				},
			});
			Composite.add(this.Basic.world, this.circle);
			this.level++;
		},
		createMoveCircle({ x, y }) {
			const circle = Bodies.circle(x, y, 10, {
				isStatic: true,
				render: { fillStyle: '#FF0000' },
			});
			circle.custom = {};
			circle.custom.radius = 10;
			circle.custom.color = '#FF0000';
			Composite.add(this.Basic.world, circle);
			return circle;
		},
		createCircle() {
			const {
				position: { x, y },
				custom: { radius, color },
			} = this.moveCircle;
			const circle = Bodies.circle(x, y, radius, {
				render: { fillStyle: color },
			});
			circle.custom = {};
			circle.custom.radius = radius;
			Composite.add(this.Basic.world, circle);
			return circle;
		},
	},
	mounted() {
		const canvas = document.getElementById('myCanvas');
		this.Basic = new Basic(canvas);
		this.Static = new Static(this.Basic.world);
		this.Events = new Events(this.Basic.mouseConstraint, this.Basic.engine);
		canvas.style.backgroundImage = 'url(/static/images/bg.jpeg)';
		this.addCircle();
		this.Events.updateCirclePosition = (e) => {
			if (!this.circle) return;
			const xTemp = (e.mouse.position.x * 750) / window.innerWidth;
			const radius = this.circle.circleRadius;
			Body.setPosition(this.circle, {
				x: e.mouse.position.x,
				y: radius + 30,
			});
		};
		this.Events.activationCircle = () => {
			if (!this.circle) return;
			Sleeping.set(this.circle, false);
			Body.setStatic(this.circle, false);
			this.circle = null;
			setTimeout(() => {
				this.addCircle();
			}, 1000);
		};
		this.Events.collision = (bodyA, bodyB) => {
			const {
				position: { x: bx, y: by },
				circleRadius,
			} = bodyA;
			const {
				position: { x: ax, y: ay },
			} = bodyB;

			const x = (ax + bx) / 2;
			const y = (ay + by) / 2;

			const index = this.config.findIndex(
				(d) => d.radius === circleRadius
			);
			const { radius, sprite } = this.config[index + 1];

			const circleNew = Bodies.circle(x, y, radius, {
				restitution: 0.2,
				render: {
					sprite: {
						texture: sprite,
					},
				},
			});

			Composite.remove(this.Basic.world, [bodyA, bodyB]);
			Composite.add(this.Basic.world, circleNew);
		};
	},
};
</script>

<style scoped >
</style>
