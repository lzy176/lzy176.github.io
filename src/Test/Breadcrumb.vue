<template>
	<div class="breadcrumb">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item
				v-for="item in breadCrumbList"
				:key="item.id"
				:to="{ name: item.name }"
			>{{item.meta.title}}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name: 'Breadcrumb',
	data() {
		return {};
	},
	computed: {
		breadCrumbList() {
			return this.$route.matched;
		},
	},
};
</script>

<style scoped>
.breadcrumb {
	width: 300px;
}
</style>
