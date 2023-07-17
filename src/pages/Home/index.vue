<template>

	<div>
		深海取泥课件测试自动化部署1
		<p
			v-for="(item,index) in arr"
			:key="index"
		>
			<span>{{ item.name }}:</span>
			<a
				:href="item.url"
				target="_blank"
			>{{ item.url }}</a>
		</p>
	</div>

</template> 

<script>
const OSS = require('ali-oss');
export default {
	data() {
		return {
			arr: [
				{
					name: '四合一',
					url: 'https://mv.xesimg.com/XESlides/c0b0c52c03e62355c0071e789a3bf02c/index.html',
				},
				{
					name: '开始入水',
					url: 'https://mv.xesimg.com/XESlides/4b616fbbca24ad9bd2b5694988d88fe1/index.html',
				},
				{
					name: '取泥三次',
					url: 'https://mv.xesimg.com/XESlides/87065b2e1e2ba1be4c6a0c60d07a74d1/index.html',
				},
				{
					name: '刮泥',
					url: 'https://mv.xesimg.com/XESlides/ce5f6f8f298399455a56a58817cebf57/index.html',
				},
				{
					name: '离心机',
					url: 'https://mv.xesimg.com/XESlides/4519e1cd73b09de0312e4fab5c5c4d4d/index.html',
				},
			],
		};
	},
	created() {},
	mounted() {
		// var fileHost = 'https://lzy-230627-bucket.oss-cn-beijing.aliyuncs.com'; //你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
		// var config = {
		// 	AccessKeySecret: 'mruOfzXi0pNktTXd8AlkQC4OxJKAlB', // AccessKeySecret 去你的阿里云上控制台上找
		// 	OSSAccessKeyId: 'LTAIl0X8gqRHTZsa', // AccessKeyId 去你的阿里云上控制台上找
		// 	timeout: 87600, //这个是上传文件时Policy的失效时间
		// };
		// const client = new OSS({
		// 	// yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
		// 	region: 'oss-cn-beijing',
		// 	// 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
		// 	accessKeyId: 'LTAIl0X8gqRHTZsa',
		// 	accessKeySecret: 'mruOfzXi0pNktTXd8AlkQC4OxJKAlB',
		// 	// 填写Bucket名称，例如examplebucket。
		// 	bucket: 'lzy-230627-bucket',
		// });

		// async function list(dir) {
		// 	try {
		// 		// 默认最多返回1000个文件。
		// 		let result = await client.list();
		// 		console.log(result);
		// 		return;
		// 		// 从上一次list操作读取的最后一个文件的下一个文件开始继续获取文件列表。
		// 		if (result.isTruncated) {
		// 			let result = await client.list({
		// 				marker: result.nextMarker,
		// 			});
		// 		}

		// 		// 列出前缀为'my-'的文件。
		// 		result = await client.list({
		// 			prefix: 'my-',
		// 		});
		// 		console.log(result);

		// 		// 列出前缀为'my-'且在'my-object'之后的文件。
		// 		result = await client.list({
		// 			prefix: 'my-',
		// 			marker: 'my-object',
		// 		});
		// 		console.log(result);
		// 	} catch (e) {
		// 		console.log(e);
		// 	}
		// }

		// list();
	},
	methods: {},
};
</script>

<style scoped >
</style>
