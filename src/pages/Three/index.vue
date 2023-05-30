<template>
	<div
		v-loading.fullscreen.lock="isLoading"
		element-loading-text="拼命加载中"
		element-loading-background="rgba(0, 0, 0, 0.8)"
	>
		<div id="earth-canvas"></div>
		<div
			id="html2canvas"
			class="css3d-wapper"
			style="opacity: 0;"
		>
		</div>
	</div>
</template>

<script>
import Basic from './Basic';
import Sizes from './Sizes';
import Resources from './resources';
import Earth from './Earth';

export default {
	data() {
		return {
			isLoading: true,
		};
	},
	mounted() {
		const dom = document.querySelector('#earth-canvas');
		this.basic = new Basic(dom);
		this.scene = this.basic.scene;
		this.renderer = this.basic.renderer;
		this.controls = this.basic.controls;
		this.camera = this.basic.camera;

		this.sizes = new Sizes({ dom });

		this.sizes.changeSize = () => {
			this.renderer.setSize(
				Number(this.sizes.viewport.width),
				Number(this.sizes.viewport.height)
			);
			this.camera.aspect =
				Number(this.sizes.viewport.width) /
				Number(this.sizes.viewport.height);
			this.camera.updateProjectionMatrix();
		};

		this.resources = new Resources(async () => {
			await this.createEarth();
			// 开始渲染
			this.render();
		});
	},
	methods: {
		async createEarth() {
			// 资源加载完成，开始制作地球，注释在new Earth()类型里面
			this.earth = new Earth({
				textures: this.resources.textures,
			});

			this.scene.add(this.earth.group);

			await this.earth.init();

			this.isLoading = false;
		},

		/**
		 * 渲染函数
		 */
		render() {
			requestAnimationFrame(this.render.bind(this));
			this.renderer.render(this.scene, this.camera);
			this.controls && this.controls.update();
			this.earth && this.earth.render();
		},
	},
};
</script>

<style scoped>
#earth-canvas {
	height: 100%;
	width: 100%;
	background: #010826;
}
#html2canvas {
	position: absolute;
	z-index: -1;
	left: 0;
	top: 0;
}
.css3d-wapper {
	pointer-events: none;
	color: #fff;
	font-size: 20px;
	font-weight: 600;
	border-top: 3px solid #0cd1eb;
	padding: 6px 8px;
	min-width: 50px;
	background: rgba(40, 108, 181, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>