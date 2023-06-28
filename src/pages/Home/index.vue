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
					url: 'https://mv.xesimg.com/XESlides/c0b0c52c03e62355c0071e789a3bf02c/index.html',
				},
				{
					name: '开始入水',
					url: 'https://mv.xesimg.com/XESlides/4b616fbbca24ad9bd2b5694988d88fe1/index.html',
				},
				{
					name: '取泥三次',
					url: 'https://mv.xesimg.com/XESlides/87065b2e1e2ba1be4c6a0c60d07a74d1/index.html',
				},
				{
					name: '刮泥',
					url: 'https://mv.xesimg.com/XESlides/ce5f6f8f298399455a56a58817cebf57/index.html',
				},
				{
					name: '离心机',
					url: 'https://mv.xesimg.com/XESlides/4519e1cd73b09de0312e4fab5c5c4d4d/index.html',
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
