<template>
	<div>
		深海取泥课件
		<p
			v-for="(item,index) in arr"
			:key="index"
		>
			<span>{{ item.name }}:</span>
			<a
				:href="item.url"
				target="_blank"
			>{{ item.url }}</a>
		</p>
	</div>

</template> 

<script>
export default {
	data() {
		return {
			arr: [
				{
					name: '四合一',
					url: 'https://mv.xesimg.com/XESlides/f181b39a63016396b5c3a51be4d58933/index.html',
				},
				{
					name: '开始入水',
					url: 'https://mv.xesimg.com/courseware_pages/e40cf5b4fec965cece9809938ec46e10/index.html',
				},
				{
					name: '取泥三次',
					url: 'https://mv.xesimg.com/courseware_pages/1494e2a7b7cac6ec32baff285b6ff6c1/index.html',
				},
				{
					name: '刮泥',
					url: 'https://mv.xesimg.com/courseware_pages/e5fec76204801b00f56a9aba3134ef92/index.html',
				},
				{
					name: '离心机',
					url: 'https://mv.xesimg.com/courseware_pages/21ea4095eb0ef5cefd60ffa7a0fa6528/index.html',
				},
			],
		};
	},
	created() {},
	mounted() {},
	methods: {},
};
</script>

<style scoped >
</style>
