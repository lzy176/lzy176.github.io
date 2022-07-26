<template>
	<div class="Test">
		<h1>{{isShow?'显示' :'不显示'}}</h1>
		<div class="test">
			<div class="test3"></div>
			<img
				class="test2"
				src="http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/bigMathGame/linziyang/sudoku/1/resource/assets/images/commit.png"
				alt=""
			>
			<div class="test3"></div>
		</div>
	</div>
</template>

<script>
// getBoundingClientRect 用于获取某个元素相对于视窗的集合
export default {
	name: 'getBoundingClientRect',
	data() {
		return {
			isShow: false,
		};
	},
	mounted() {
		let testDiv = document.querySelector('.test');
		let image = document.querySelector('.test2');
		function lazyload() {
			let divPos = testDiv.getBoundingClientRect();
			let imgPos = image.getBoundingClientRect();
			if (imgPos.bottom >= divPos.top && imgPos.top <= divPos.bottom) {
				this.isShow = true;
			} else {
				this.isShow = false;
			}
		}
		testDiv.addEventListener('scroll', lazyload.bind(this));
	},
	methods: {},
};
</script>

<style scoped>
.test {
	width: 100px;
	height: 100px;
	background-color: burlywood;
	overflow: auto;
}
.test2 {
	width: 50px;
	height: 50px;
	background-color: cadetblue;
}
.test3 {
	height: 1000px;
}
</style>
