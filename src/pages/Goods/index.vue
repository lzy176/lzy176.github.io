<template>
	<div>
		<Search></Search>

		<el-button
			type="primary"
			icon="el-icon-plus"
			style="float:right"
			circle
			@click="addGoodsFrom"
		></el-button>
		<Dialog
			:dialogVisible=dialogVisible
			@closeDialog=closeDialog
		></Dialog>
		<div>
			<el-table
				:data="tableData"
				style="width: 100%"
			>
				<el-table-column
					type="selection"
					width="55"
				>
				</el-table-column>
				<el-table-column
					prop="id"
					label="商品ID"
					width="200"
				></el-table-column>
				<el-table-column
					prop="name"
					label="商品名称"
					width="120"
				></el-table-column>
				<el-table-column
					prop="price"
					label="商品价格"
					width="100"
				></el-table-column>
				<el-table-column
					prop="quantity"
					label="商品数量"
					width="100"
				></el-table-column>
				<el-table-column
					prop="category"
					label="规格类目"
					show-overflow-tooltip
				>
				</el-table-column>
				<el-table-column
					prop="image"
					label="商品图片"
				>
					<template slot-scope="scope">
						<img
							:src="scope.row.image"
							style="width:100px;height:50px"
						>
					</template>
				</el-table-column>
				<el-table-column
					prop="sellingPoints"
					label="商品卖点"
					show-overflow-tooltip
				>
				</el-table-column>
				<el-table-column
					prop="describe"
					label="商品描述"
					width="300"
					show-overflow-tooltip
				>
				</el-table-column>
				<el-table-column
					label="操作"
					width="180"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)"
						>编辑</el-button>
						<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)"
						>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="pagination">
			<el-pagination
				layout="total ,prev, pager, next,jumper"
				:total="totalSum"
				:page-size="8"
				@current-change="changePagination"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import Search from './Search.vue';
import Dialog from './Dialog.vue';
export default {
	data() {
		return {
			dialogVisible: false,
			totalSum: 0,
			initData: [],
			tableData: [],
		};
	},
	created() {
		this.$api
			.getGoodsList()
			.then((res) => {
			
				this.totalSum = res.data.length;
				for (let i = 0; i < this.totalSum; i += 8) {
					this.initData.push(res.data.slice(i, i + 8));
				}
				this.tableData = this.initData[0];
			})
			.catch((err)=>{
				console.log(err)
			})
	},
	methods: {
		changePagination(val) {
			this.tableData = this.initData[val - 1];
		},
		handleEdit() {},
		handleDelete() {},
		addGoodsFrom() {
			this.dialogVisible = true;
		},
		closeDialog() {
			this.dialogVisible = false;
		},
	},
	components: {
		Search,
		Dialog,
	},
};
</script>

<style scoped>
.pagination {
	text-align: center;
	margin: 20px;
}
</style>
