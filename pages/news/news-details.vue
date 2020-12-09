<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:"",                 //网址
				src:"",                 //网址
			}
		},
		
		onLoad(option) {
		    this.url = JSON.parse(decodeURIComponent(option.url));
			console.log(this.url);
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			await this.getUrl();
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			//获取网址
			getUrl(){
				this.src = this.url;
				console.log(this.src);
			}
		}
	}
</script>

<style>
</style>
