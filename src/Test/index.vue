<template>
	<div>
		<el-container class="container" :class="{ 'folded': folded }">
			<el-header class="header" height=''>
				<Breadcrumb></Breadcrumb>
			</el-header>
			<el-container>
				<el-aside class="left" width=''>
					<el-menu :default-active="$route.path" :collapse="folded" background-color="#545c64" text-color="#fff"
						active-text-color="#ffd04b" :router="true">
						<!-- 图表 -->
						<el-menu-item index="/chart">
							<i class="el-icon-setting"></i>
							<span slot="title">图表</span>
						</el-menu-item>
						<!-- 文档 -->
						<el-submenu index="/doc">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>文档</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/doc/javascript">
									<i class="el-icon-document"></i>
									<span>javascript</span>
								</el-menu-item>
								<el-menu-item index="/doc/css">
									<i class="el-icon-document"></i>
									<span>css</span>
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<!-- 图表 -->
						<el-menu-item index="/goods">
							<i class="el-icon-setting"></i>
							<span slot="title">商品管理</span>
						</el-menu-item>
					</el-menu>
					<!-- 展开收起按钮 -->
					<span class="btn_folded" @click="folded = !folded">
						<i :class="folded ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
					</span>
				</el-aside>
				<el-main class="main">
					<transition name="showRouter" mode="out-in" appear>
						<router-view></router-view>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue';
export default {
	name: '',
	data() {
		return {
			folded: false,
		};
	},
	methods: {
		
	},
	components: {
		Breadcrumb,
	},
};
</script>

<style scoped lang="scss">
.showRouter-enter-active,
.showRouter-leave-active {
	transition: 0.5s linear;
}

.showRouter-enter,
.showRouter-leave-to {
	transform: translateX(-100px);
	opacity: 0;
}

.showRouter-enter-to,
.showRouter-leave {
	transform: translateX(0px);
	opacity: 1;
}

$h_height: 50px;

.header {
	display: flex;
	align-items: center;
	background-color: white;
	position: fixed;
	z-index: 10;
	width: 100%;
	height: #{$h_height};
	box-shadow: 0px 10px 10px #cecece;
}

.left {
	background-color: #545c64;
	width: 200px;
	position: fixed;
	z-index: 11;
	top: #{$h_height};
	left: 0px;
	height: calc(100% - #{$h_height});
	transition: width 0.3s;
	-webkit-transition: width 0.3s;
}

.main {
	/* background-color: #c0c4cc; */
	margin: #{$h_height} 0 0 200px;
	transition: margin-left 0.3s;
	-webkit-transition: margin-left 0.3s;
}

.btn_folded {
	display: block;
	position: fixed;
	bottom: 0;
	background-color: #343c45;
	color: white;
	width: 200px;
	height: 40px;
	font-size: 24px;
	text-align: center;
	cursor: pointer;
	line-height: 40px;
	transition: width 0.3s;
	-webkit-transition: width 0.3s;
}

.el-menu {
	border-right: 0px;
}

.folded .el-menu span {
	display: none;
}

.folded .btn_folded {
	width: 64px;
}

.folded .left {
	width: 64px;
}

.folded .main {
	margin-left: 64px;
}
</style>
