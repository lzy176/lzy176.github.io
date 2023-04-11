<template>
	<div
		style="height: 500px;"
		id="mapContainer"
	>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {},
	mounted() {
		// 百度地图API功能
		var map = new BMap.Map('mapContainer'); // 创建Map实例
		map.centerAndZoom('北京', 15); // 初始化地图,用城市名设置地图中心点
		map.enableScrollWheelZoom(); //启用滚轮放大缩小
	},
	methods: {},
};
</script>

<style>
.anchorBL,
.BMap_cpyCtrl {
	display: none;
}
</style>
