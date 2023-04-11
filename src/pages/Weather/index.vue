<template>
	<div>
	

	</div>
</template>

<script>
// key fsgt321dbogrj7jc
export default {
	data() {
		return {};
	},
	created() {},
	mounted() {
		const iconPath = document.getElementsByClassName('icon-path'); // 获取 path 标签
		for (let i = 0; i < iconPath.length; i++) {
			const item = iconPath[i];
			console.log(item.getTotalLength()); // 获得 path 路径长度
		}
	},
	methods: {},
};
</script>

<style scoped>

</style>
