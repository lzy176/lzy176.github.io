<template>
	<div>
		<transition name="showRouter" appear mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'Doc',
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {},
};
</script>

<style scoped >
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
</style>
