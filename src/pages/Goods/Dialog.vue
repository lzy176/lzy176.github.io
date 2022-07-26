<template>
	<div>
		<el-dialog
			title="商品添加"
			:visible="dialogVisible"
			:before-close="close"
			width="70%"
		>
			<GoodsFrom></GoodsFrom>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="$emit('closeDialog')">取 消</el-button>
				<el-button
					type="primary"
					@click="$emit('closeDialog')"
				>确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import GoodsFrom from './GoodsForm';
export default {
	name: 'Dialog',
	props: ['dialogVisible'],
	data() {
		return {};
	},
	methods: {
		close() {
			this.$emit('closeDialog');
		},
	},
	components:{
		GoodsFrom
	}
};
</script>

<style scoped>
</style>
