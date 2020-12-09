<template>
	<view class="pull_down">
		<view class="pull">
			<text class="pull_text" :value="text"></text>
			<input class="pull_input" @click.stop="showHidden = !showHidden" v-model="inputValue" type="text"/>
			<image class="pull_image" src="../../static/licence/xiala.png"></image>
		</view>
		<view class="pull-select" v-if="showHidden">
			<text class="pull_select_text" @click="getValue(index)" v-for="(item,index) in TextList" :key="index" :value="item"></text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			TextList: {
				type: Array,
				default() {
					return []
				}
			},
			// urlKey: {
			// 	type: String,
			// 	default() {
			// 		return ''
			// 	}
			// },
			text:{
				type: String,
				default(){
					return ''
				}
			}
		},
		
		data(){
			return{
				showHidden:false,
			}
		},
		
		methods:{
			// 点击页面事件 隐藏需要隐藏的区域
			hiddenClick () {
			    this.showHidden = false;
			},
			getValue(e){
				this.inputValue = this.TextList[e];
				this.showHidden = false;
				console.log(e);
				console.log(this.inputValue);
			},
		}
	}
</script>

<style>
	.pull_down{
		display: flex; 
		flex-direction: column;
		align-items: center; 
		margin-top: 40rpx;
	}
	
	.pull{
		display: flex; 
		flex-direction: row; 
		justify-content: center;
		margin-top: 15rpx; 
		margin-bottom: 15rpx;
	}
	
	.pull_text{
		font-size: 35rpx;
		margin-right: 20rpx; 
		line-height: 50rpx; 
		text-align: center;
	}
	
	.pull_input{
		width: 300rpx;
		height: 50rpx; 
		border: 1rpx solid #BEBEBE; 
		border-radius: 30rpx; 
		text-align: center;
	}
	.pull_image{
		width: 40rpx; 
		height: 40rpx; 
		margin-left: -50rpx;
		margin-top: 9rpx;
	}
	.pull-select{
		text-align: center;
		left: 0rpx;
		right: 0rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: #F4F5F6; 
		border-radius: 40rpx;
	}
	.pull_select_text{
		display: block; 
		margin-top: 15rpx;
		font-size: 45rpx; 
		border-bottom: 1rpx solid #DCDCDC;
	}
</style>
