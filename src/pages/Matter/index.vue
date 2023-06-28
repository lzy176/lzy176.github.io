<template>
	<div id="container">
		<div class="record">
			<span>记数：{{score }}</span>
			<span>计时：{{ formattedTime }}</span>
		</div>
		<canvas id="myCanvas"></canvas>
	</div>
</template>

<script>
import { Bodies, Composite, Body } from 'matter-js';
import Static from './Static';
import Basic from './Basic';
import Events from './Events';
export default {
	name: 'Matter',
	data() {
		return {
			moveCircle: null,
			score: 0,
			time: 0,
			config: [
				{
					radius: 20,
					score: 0,
					sprite: '/static/images/Mercury.png',
				},
				{
					radius: 26,
					score: 2,
					sprite: '/static/images/Mars.png',
				},
				{
					radius: 33,
					score: 4,
					sprite: '/static/images/Venus.png',
				},
				{
					radius: 43,
					score: 8,
					sprite: '/static/images/theEarth.png',
				},
				{
					radius: 56,
					score: 16,
					sprite: '/static/images/Neptune.png',
				},
				{
					radius: 73,
					score: 32,
					sprite: '/static/images/Uranus.png',
				},
				{
					radius: 95,
					score: 64,
					sprite: '/static/images/Saturn.png',
				},
				{
					radius: 124,
					score: 128,
					sprite: '/static/images/Jupiter.png',
				},
			],
			level: 0,
		};
	},
	methods: {
		startFormattedTime() {
			let startTime = new Date().getTime();
			this.timer = setInterval(() => {
				let endTime = new Date().getTime();
				if (endTime - startTime >= 1000) {
					startTime = endTime;
					this.time++;
				}
			});
		},
		getRadius() {
			const radius = [10, 15, 22.5, 33.75];
			const max = this.level > 4 ? 4 : this.level;
			return radius[Math.floor(Math.random() * max)];
		},
		getColor(radius) {
			return radius === 10 ? '#FF0000' : this.config[radius].color;
		},
		// 添加球体
		addCircle() {
			const dataTemp = this.config.slice(0, 4);
			const index =
				this.level === 0 ? 0 : (Math.random() * dataTemp.length) | 0;
			const { radius, sprite } = dataTemp[index];
			this.circle = Bodies.circle(
				window.innerWidth / 2,
				radius + 30,
				radius,
				{
					isStatic: true,
					restitution: 0.2,
					render: {
						sprite: {
							texture: sprite,
						},
					},
				}
			);
			Composite.add(this.Basic.world, this.circle);
			this.level++;
		},
	},
	mounted() {
		const canvas = document.getElementById('myCanvas');
		const canvasParent = document.getElementById('container');
		this.Basic = new Basic(canvas, canvasParent);

		this.Static = new Static(this.Basic.world, canvasParent);
		this.Events = new Events(this.Basic.mouseConstraint, this.Basic.engine);
		canvas.style.backgroundImage = 'url(/static/images/bg.jpeg)';
		this.addCircle();
		this.startFormattedTime();
		this.Events.updateCirclePosition = (e) => {
			if (!this.circle) return;
			const radius = this.circle.circleRadius;
			Body.setPosition(this.circle, {
				x: e.mouse.position.x,
				y: radius + 30,
			});
		};
		this.Events.activationCircle = () => {
			if (!this.circle) return;
			// Sleeping.set(this.circle, false);
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
			const { radius, sprite, score } = this.config[index + 1];

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
			this.score += score;

			if (index + 1 === this.config.length - 1) {
				Composite.remove(this.Basic.world, circleNew);
			}
		};
	},
	computed: {
		formattedTime() {
			const minutes = Math.floor(this.time / 60);
			const seconds = this.time % 60;
			return `${minutes.toString().padStart(2, '0')}:${seconds
				.toString()
				.padStart(2, '0')}`;
		},
	},
};
</script>

<style scoped >
.container {
	margin-top: -10px;
}
.record {
	display: flex;
	justify-content: space-between;
	padding: 0 10px 0 10px;
}
</style>
