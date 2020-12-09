<template>
	<view style="margin-left: 50rpx;">
		<view style="margin-top: 10rpx;font-size: 30rpx;">{{count + 1}}.&nbsp{{exerciseList[count].question}}</view>
		<image v-if="exerciseList[count].url" :src="exerciseList[count].url" style="width: 450rpx; height: 300rpx; margin-top: 10rpx;"></image>
		
		<view @tap="myAnswer='A'" @click="pushAnswerList(myAnswer)" v-if="exerciseList[count].item1" style="margin-top: 10rpx; font-size: 30rpx;">A.&nbsp{{exerciseList[count].item1}}</view>
		<view @tap="myAnswer='B'" @click="pushAnswerList(myAnswer)" v-if="exerciseList[count].item2" style="margin-top: 10rpx; font-size: 30rpx;">B.&nbsp{{exerciseList[count].item2}}</view>
		<view @tap="myAnswer='C'" @click="pushAnswerList(myAnswer)" v-if="exerciseList[count].item3" style="margin-top: 10rpx; font-size: 30rpx;">C.&nbsp{{exerciseList[count].item3}}</view>
		<view @tap="myAnswer='D'" @click="pushAnswerList(myAnswer)" v-if="exerciseList[count].item4" style="margin-top: 10rpx; font-size: 30rpx;">D.&nbsp{{exerciseList[count].item4}}</view>
		
		<view v-if="myAnswer" style="margin-top: 30rpx;">
			<view style="font-size: 30rpx;">答案:&nbsp{{answerFlag[exerciseList[count].answer]}}
			<text v-if="answerFlag[exerciseList[count].answer]" style="font-size: 30rpx; text-align: center;margin-top: 3rpx;margin-left: 50rpx;">你的选择:&nbsp{{myAnswer}}</text>
			</view>
			
			<view style="margin-top: 20rpx;font-size: 30rpx;">解释:&nbsp{{exerciseList[count].explains}}</view>
		</view>
		
		<view style="position: fixed;bottom: 10rpx; margin-left: 100rpx; margin-right: 100rpx;">
			<button @click="decCount()" style="margin-right: 100rpx; display: inline-block;">上一题</button>
			<button @click="addCount()" style="display: inline-block;">下一题</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				exerciseList:[],                      //错题集
				count:0,                              //获取的所有题中的第几题，索引
				answerList:{},                        //自己所选的所有答案集
				myAnswer:'',                          //自己选的答案
				answerFlag:{'1':'A','2':'B','3':'C','4':'D'},
			}
		},
		
		// onLoad(){
		// 	console.log(this.exerciseList);
		// },
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			await this.getErrExerciseList();
			console.log(this.exerciseList);
			
			if(this.exerciseList.length == 0){
				uni.showToast({
					title:"目前还没有错题哦！",
					icon:"none",
					mask:true,
					position:'center',
				})
			}
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			//获取本地错题集
			getErrExerciseList(){
				let randomErrExerciseList = uni.getStorageSync("randomErrExerciseList");
				let orderErrExerciseList = uni.getStorageSync("orderErrExerciseList");
				let randomExerciseList = Object.values(randomErrExerciseList);   //遍历对象获取 values值
				let orderExerciseList = Object.values(orderErrExerciseList);   //遍历对象获取 values值
				
				this.exerciseList = randomExerciseList.concat(orderExerciseList);
				console.log(randomExerciseList);
				console.log(orderExerciseList);
				console.log(this.exerciseList);
			},
			
			//获取自己所选择的答案集
			pushAnswerList(myAnswer){
				let key = this.count;
				let value = myAnswer;
				 this.answerList[key] = value;
				 console.log(this.answerList);
			},
			
			//上一页
			decCount(){
				this.count --;
				if(this.count <= 0){
					this.count = 0;
				}
				console.log(this.count);
				
				if(this.answerList[this.count] == undefined){
					this.myAnswer = "";
				}else{
					this.myAnswer = this.answerList[this.count];
				}
				console.log(this.answerList[this.count]);
			},
			
			//下一页
			addCount(){
				this.count ++;
				if(this.count >= this.exerciseList.length){
					this.count = this.exerciseList.length - 1;
					
					uni.showToast({
						title:"已是最后一道题了哦",
						icon:"none",
						position:"center",
					})
				}else{
					this.myAnswer = "";
				}
				console.log(this.count);
			}
		}
	}
</script>

<style>
</style>
