<template>
	<div @click="play()">
		<svg
			t="1681123541116"
			class="icon"
			viewBox="0 0 1227 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			p-id="25633"
			width="25"
			height="25"
		>
			<path
				d="M972.223886 1024a255.290617 255.290617 0 0 0 50.84653-505.467728c-22.441722-177.514021-173.971435-314.80927-357.57678-314.809269-199.026014 0-360.446114 161.372011-360.446115 360.430084a361.712469 361.712469 0 0 0 8.255348 76.943047 205.950888 205.950888 0 1 0-108.265278 382.903866z"
				fill="#2674FD"
				p-id="25634"
				class="icon-path Weather"
			></path>
			<path
				d="M90.360391 539.72367a300.318329 300.318329 0 0 1 117.626683-23.788226h3.382288A456.304327 456.304327 0 0 1 616.73098 110.124992 357.256184 357.256184 0 0 0 358.314552 0.000256C160.426653 0.000256 0.000401 160.426509 0.000401 358.314407a356.598962 356.598962 0 0 0 58.94158 196.910081 302.851038 302.851038 0 0 1 31.41841-15.500818z"
				fill="#FFE41F"
				p-id="25635"
				class="icon-path Weather"
			></path>
		</svg>
		<span>天气</span>
	</div>
</template>

<script>
import mixi from './mixins';
export default {
	name: 'WeatherIcon',
	mixins: [mixi],
	data() {
		return {
			iconName: 'Weather',
		};
	},
};
</script>

<style scoped >
.icon-path {
	fill: '#fff';
	stroke: '#fff';
	stroke-dashoffset: 0;
	stroke-width: 10;
}
</style>
