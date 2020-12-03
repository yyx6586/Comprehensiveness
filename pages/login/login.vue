<template>
	<view>
		<carousel :img-list="imgList" url-key="url" @selected="selectedBanner"/>
		<!-- 不带边框并矩形显示 -->
		<!-- <view class="grid-view">
			<uni-grid :column="3" :show-border="false"  :square="false">
			    <uni-grid-item v-for="(item,index) in gridList" :key="index">
					<view class="grid-item">
						<image class="grid-img" :src="item.url"></image>
						<text class="text">{{item.text}}</text>
					</view>
			    </uni-grid-item>
			</uni-grid>
		</view> -->
		
		<!-- <view class="flex-sub cu-list grid col-4 no-border">
		    <view v-if="item.isShow" @tap="goToolPage(item)" class="cu-item align-center" v-for="(item,index) in commonToolArray" :key="index">
		     <image :src="item.pic" mode="aspectFill" style="width: 72upx;height: 72upx;"></image>
		     <text class="margin-top" style="font-size: 28upx;color:#333">
		      {{item.name}}
		     </text>
		    </view>
		   </view> -->
		   
		<view class="grid">
			<view class="grid-item" v-for="(item,index) in gridList" :key="index">
				<view class="grid-view" @click="goToLicence(index)">
					<image class="grid-img" :src="item.url"></image>
				</view>
				<text class="grid-text">{{item.text}}</text>
			</view>
		</view>   
	</view>
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	
	
	export default{
		
		//注册组件
		components: {
		            carousel,
		        },
				
		data(){
			return{
				commonToolArray:state => [
					{name:"安全设置",nav:"",pic:'../../static/2.jpeg'.icon_set,isShow:false},
					{name:"安全设置",nav:"",pic:'../../static/2.jpeg'.icon_set,isShow:false},
					{name:"安全设置",nav:"",pic:'../../static/2.jpeg'.icon_set,isShow:false},
				],
				imgList: [{
				                    url: '../../static/2.jpeg',
				                    id: 1
				                },{
				                    url: '../../static/2.jpeg',
				                    id: 2
				                },{
				                    url: '../../static/2.jpeg',
				                    id: 3
				                },{
				                    url: '../../static/2.jpeg',
				                    id: 4
				                },],
				gridList:[
					{
						text:"新闻头条",
						url:'../../static/login/news.png'
					},
					{
						text:"号码归属地查询",
						url:'../../static/login/phone.png'
					},
					{
						text:"驾照题库",
						url:'../../static/login/jiazhao.png'
					},
					{
						text:"身份证查询",
						url:'../../static/login/cardID.png'
					},
					{
						text:"天气预报",
						url:'../../static/login/tianqi.png'
					},
					{
						text:"图书电商数据",
						url:'../../static/login/book.png'
					},
					{
						text:"邮编查询",
						url:'../../static/login/youbian.png'
					},
					{
						text:"星座运势",
						url:'../../static/login/xingzhuo.png'
					}
				]				
			}
		},
		
		methods:{
			goToLicence(e){
				console.log(e);
				if(e === 2){
					uni.navigateTo({
						url:"../licence/index",
					})
				}
			}
		}
	}
</script>

<style>
	.grid{
		display: flex;
		display: -webkit-flex;
		width: 100%;
		height: 100%;
		flex-wrap: wrap;
	    justify-content: flex-start;
		align-content: space-between;
		/* background-color: #DBDBDB; */
	}
	.grid-item{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		width: 33%;
		height: 230rpx;
		text-align: center;
		box-sizing:border-box;
		/* border: 1rpx solid #3B4144; */
	}
	.grid-view{
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: center;
		margin-bottom: 20rpx;
	}
	.grid-img{
		width: 140rpx;
		height: 140rpx;
	}
	.grid-text{
		font-size: 28rpx;
		width: 100%;
		line-height: 30rpx;
	}
	
</style>
