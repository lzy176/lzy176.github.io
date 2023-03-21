<template>
	<div class="Axios">
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {
		};
	},
	mounted() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
		script.src = 'http://localhost:3000/?handleCallback';
		document.head.appendChild(script);
		window.handleCallback=(val)=>{
		  console.log(val)
		}
	},
};
</script>

<style scoped>
</style>
