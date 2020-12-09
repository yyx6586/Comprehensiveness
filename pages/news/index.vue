<template>
	<!-- 请选择新闻类型 -->
	<view>
		<view style="display: flex; flex-direction: column;align-items: center; margin-top: 10rpx;">
			<view style="display: flex; flex-direction: row; justify-content: center; margin-top: 15rpx; margin-bottom: 15rpx;">
				<text style="font-size: 35rpx; margin-right: 20rpx; line-height: 50rpx; text-align: center;">{{text}}</text>
				<view @click.stop="showHidden = !showHidden" :value="inputValue" type="text" style="width: 300rpx; height: 50rpx; border: 1rpx solid #BEBEBE; border-radius: 30rpx; text-align: center;">{{inputValue}}</view>
				<!-- <input @click.stop="showHidden = !showHidden" :value="inputValue" type="text" style="width: 300rpx; height: 50rpx; border: 1rpx solid #BEBEBE; border-radius: 30rpx; text-align: center;"/> -->
				<image src="../../static/licence/xiala.png" style="width: 35rpx; height: 35rpx; margin-left: -50rpx;margin-top: 12rpx;"></image>
				<image @click="getNewsType()" src="../../static/news/search.png" style="width: 50rpx; height: 50rpx; margin-left: 35rpx;margin-top: 2rpx;"></image>
			</view>
			<view v-if="showHidden" style="text-align: center;left: 0rpx;right: 0rpx;position: fixed;bottom: 0rpx;background-color: #F4F5F6; border-radius: 40rpx;">
				<text @click="getValue(index)" v-for="(item,index) in newsType" :key="index" style="display: block; margin-top: 15rpx;font-size: 45rpx; border-bottom: 1rpx solid #DCDCDC;">{{item}}</text>
			</view>
		</view>
		<!-- 请选择新闻类型 end-->
		
		<view v-for="(item,index) in newsList" :key="item.url" style="display: flex; flex-direction: column; margin-top: 20rpx;">
			<view @click="goToNewsDetails(item.url)" style="font-size: 35rpx;margin-left: 15rpx; width: 500rpx; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.title}}</view>
			<view @click="goToNewsDetails(item.url)" style="display: flex; flex-direction: row;justify-content: space-between; margin-left: 15rpx; margin-right: 15rpx;margin-top: 10rpx; margin-bottom: 18rpx;">
				<image :src="item.thumbnail_pic_s" style="width: 230rpx;height: 200rpx;"></image>
				<image :src="item.thumbnail_pic_s02" style="width: 230rpx;height: 200rpx;"></image>
				<image :src="item.thumbnail_pic_s03" style="width: 230rpx;height: 200rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as config from '../../common/config.js'
	
	export default{
		data(){
			return{
				text:"请选择新闻类型",
				showHidden:false,          //下拉框的内容是否显示
				inputValue:"头条",                 //类型输入框里的内容    
				newsType:["头条","社会","国内","国际","娱乐","体育","军事","科技","财经","时尚"],   //新闻类型
				newsList:[],               //新闻内容
				type:"top",                 //新闻类型  默认为 头条
			}
		},
		
		onLoad() {
			this.getNewsList();
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			await this.getNewsList();
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			...mapActions({
				getNews:'common/getNews',
			}),
			
			async getNewsList(){
				let res = await this.getNews({
					"type":this.type,
					"key":config.NEWS_KEY,
				})
				
				this.newsList = res.result.data;
				console.log(res);
				console.log(this.newsList);
			},
			
			//获取新闻类型
			getNewsType(){
				console.log(this.inputValue);
				
				if(this.inputValue == "头条"){
					this.type = "top";
				};
				if(this.inputValue == "社会"){
					this.type = "shehui";
				};
				if(this.inputValue == "国内"){
					this.type = "guonei";
				};
				if(this.inputValue == "国际"){
					this.type = "guoji";
				};
				if(this.inputValue == "娱乐"){
					this.type = "yule";
				};
				if(this.inputValue == "体育"){
					this.type = "tiyu";
				};
				if(this.inputValue == "军事"){
					this.type = "junshi";
				};
				if(this.inputValue == "科技"){
					this.type = "keji";
				};
				if(this.inputValue == "财经"){
					this.type = "caijing";
				};
				if(this.inputValue == "时尚"){
					this.type = "shishang";
				};
				console.log(this.type);
				this.getNewsList();
			},
			
			//获取下拉输入框里的值
			getValue(e){
				this.inputValue = this.newsType[e];
				this.showHidden = false;
				console.log(e);
				console.log(this.inputValue);
			},
			
			//跳转到新闻详情页面
			goToNewsDetails(e){
				let url = e;
				console.log(e);
				console.log(url);
				uni.navigateTo({
					url:"news-details?url="+encodeURIComponent(JSON.stringify(url)),
				});
			}
		}
	}
</script>

<style>
</style>
