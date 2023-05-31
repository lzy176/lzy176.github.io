<template>
	<div>
		<el-container :class="`${status}`">
			<el-header
				class="header"
				height=''
			>
				<Breadcrumb></Breadcrumb>
				<el-dropdown
					:hide-on-click="false"
					@command="clickDropdown"
					v-if="status==='screen_hide'"
				>
					<span class="el-dropdown-link">
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item
							v-for="item in filterRouters"
							:key="item.id"
							:command="item.name"
						> {{item.meta.title}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-aside
					class="left"
					width=''
				>
					<el-menu
						:default-active="$route.path"
						:collapse="status === 'screen_min'"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b"
						:router="true"
					>
						<el-menu-item index="/home">
							<home-icon></home-icon>
						</el-menu-item>
						<el-menu-item index="/matter">
							<matter-icon></matter-icon>
						</el-menu-item>
						<el-menu-item index="/three">
							<three-icon></three-icon>
						</el-menu-item>
						<el-menu-item index="/map">
							<map-icon></map-icon>
						</el-menu-item>
						<el-menu-item index="/weather">
							<weather-icon></weather-icon>
						</el-menu-item>
						<el-menu-item index="/goods">
							<goods-icon></goods-icon>
						</el-menu-item>
					</el-menu>
					<!-- 展开收起按钮 -->
					<span
						class="btn_folded"
						@click="clickOpenUp"
					>
						<i :class="status === 'screen_min' ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
					</span>
				</el-aside>
				<el-main class="main">
					<transition
						name="showRouter"
						mode="out-in"
						appear
					>
						<router-view></router-view>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue';
import iconData from './SVG/index';

export default {
	name: '',
	data() {
		return {
			status: 'screen_hide',
			filterRouters: null,
		};
	},
	created() {
		this.filterRouters = this.$router.options.routes.slice(1);
	},
	mounted() {
		this.changeStyle();
		window.addEventListener('resize', this.changeStyle);
	},
	methods: {
		clickDropdown(item) {
			this.$router.push(item);
		},
		clickOpenUp() {
			this.status =
				this.status === 'screen_min' ? 'screen_max' : 'screen_min';
		},
		changeStyle() {
			if (window.innerWidth > 1200) {
				this.status = 'screen_max';
			}
			if (window.innerWidth >= 850 && window.innerWidth <= 1200) {
				this.status = 'screen_min';
			}
			if (window.innerWidth < 850) {
				this.status = 'screen_hide';
			}
		},
	},
	components: {
		Breadcrumb,
		MapIcon: iconData['MapIcon'],
		HomeIcon: iconData['HomeIcon'],
		MatterIcon: iconData['MatterIcon'],
		ThreeIcon: iconData['ThreeIcon'],
		WeatherIcon: iconData['WeatherIcon'],
		GoodsIcon: iconData['GoodsIcon'],
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
	justify-content: space-between;
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
.screen_hide .left {
	display: none;
}
.screen_hide .main {
	margin-left: 0;
	padding-left: 0;
	padding-right: 0;
}
.screen_min .el-menu span {
	display: none;
}

.screen_min .btn_folded {
	width: 64px;
}

.screen_min .left {
	width: 64px;
}

.screen_min .main {
	margin-left: 64px;
}
</style>
