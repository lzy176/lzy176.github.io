<template>
	<div>
		<div
			v-loading.fullscreen.lock="isLoading"
			element-loading-text="拼命加载中"
			element-loading-background="rgba(0, 0, 0, 0.8)"
		>
			<Positioning
				:province="province"
				:city="city"
			></Positioning>
			<div
				v-for="(item,index) in prediction"
				:key="index"
			>
				<p>日期：{{ item.date }}-星期{{ item.week }}</p>
				<p>昼-天气{{item.dayweather}}-温度{{ item.daytemp }}度-风向{{ item.daywind }}风-风力{{item.daypower }}级</p>
				<p>夜-天气{{item.nightweather}}-温度{{ item.nighttemp }}度-风向{{item.nightwind  }}风-风力{{ item.nightpower}}级</p>
			</div>
		</div>
	</div>
</template>

<script >
import Positioning from './Positioning.vue';
export default {
	data() {
		return {
			province: '',
			city: '',
			adcode: 0,
			weatherData: {},
			prediction: [],
			isLoading: true,
		};
	},
	async created() {
		this.$api.getIp().then((res)=>{
			console.log(res);
		})
		// 获取IP地址
		await this.$api.getMapIp().then((res) => {
			if (res.status === 200 && res.data.status === '1') {
				this.province = res.data.province;
				this.city = res.data.city;
				this.adcode = res.data.adcode;
			}
		});
		// 通过IP地址获取天气
		this.$api.getWeather(this.adcode).then((res) => {
			this.prediction = res.data.forecasts[0].casts;
			this.weatherData = res;
			this.$nextTick().then(() => {
				this.isLoading = false;
			});
		});
	},
	components: {
		Positioning,
	},
};
</script>

<style scoped>
</style>
