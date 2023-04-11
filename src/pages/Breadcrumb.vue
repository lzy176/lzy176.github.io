<template>
	<div class="breadcrumb">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
			<template v-if="!isHome">
				<el-breadcrumb-item
					v-for="item in $route.matched"
					:key="item.id"
					:to="{ name: item.name }"
				>{{item.meta.title}}
				</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name: 'Breadcrumb',
	data() {
		return {
			isHome: false,
		};
	},
	watch: {
		$route: function (val) {
			this.isHome = val.name === 'Home';
		},
	},
};
</script>

<style scoped>
.breadcrumb {
	width: 300px;
}
</style>
