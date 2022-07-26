<template>
	<div class="search" :class="{ 'showInput': showInput }">
		<i class="el-icon-edit" style="cursor: pointer" @click="changeInput"></i>
		<input type="text" placeholder="请输入内容" v-model="searchText" ref="input" v-inputChange>
		<el-button v-show="showInput" icon="el-icon-search" size="mini" round>查询</el-button>
	</div>
</template>
<script>
export default {
	name: 'Search',
	data() {
		return {
			showInput: false,
			searchText: '',
		};
	},
	mounted() {

	},
	methods: {
		changeInput() {
			this.showInput = !this.showInput;
			this.showInput && this.$refs.input.focus();
			if (!this.showInput) this.searchText = '';
		},
	},
};
</script>

<style scoped>
.search {
	display: inline-block;
	width: 410px;
	height: 40px;
	font-size: 25px;
}

.search input {
	padding: 0;
	outline: none;
	border: 0;
	border-bottom: 1px solid #cecece;
	width: 0px;
	transition: width 0.5s;
}

.showInput input {
	width: 200px;
}
</style>
