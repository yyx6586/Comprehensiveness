<template>
	<view style="margin-left: 50rpx;">
		<view style="margin-top: 10rpx;font-size: 30rpx;">{{count + 1}}.&nbsp{{exercises[count].question}}</view>
		<image v-if="exercises[count].url" :src="exercises[count].url" style="width: 450rpx; height: 300rpx; margin-top: 10rpx;"></image>
		
		<view @tap="myAnswer='A'" @click="pushAnswerList(myAnswer)" v-if="exercises[count].item1" style="margin-top: 10rpx; font-size: 30rpx;">A.&nbsp{{exerciseList[count].item1}}</view>
		<view @tap="myAnswer='B'" @click="pushAnswerList(myAnswer)" v-if="exercises[count].item2" style="margin-top: 10rpx; font-size: 30rpx;">B.&nbsp{{exerciseList[count].item2}}</view>
		<view @tap="myAnswer='C'" @click="pushAnswerList(myAnswer)" v-if="exercises[count].item3" style="margin-top: 10rpx; font-size: 30rpx;">C.&nbsp{{exerciseList[count].item3}}</view>
		<view @tap="myAnswer='D'" @click="pushAnswerList(myAnswer)" v-if="exercises[count].item4" style="margin-top: 10rpx; font-size: 30rpx;">D.&nbsp{{exerciseList[count].item4}}</view>
		
		<view v-if="myAnswer" style="margin-top: 30rpx;">
			<view style="font-size: 30rpx;">答案:&nbsp{{answerFlag[exercises[count].answer]}}
			<text v-if="answerFlag[exercises[count].answer]" style="font-size: 30rpx; text-align: center;margin-top: 3rpx;margin-left: 50rpx;">你的选择:&nbsp{{myAnswer}}</text>
			</view>
			
			<view style="margin-top: 20rpx;font-size: 30rpx;">解释:&nbsp{{exercises[count].explains}}</view>
		</view>
		
		<view v-if="myAnswer" style="position: fixed;bottom: 10rpx; margin-left: 100rpx; margin-right: 100rpx;">
			<button @click="decCount()" style="margin-right: 100rpx; display: inline-block;">上一题</button>
			<button @click="addCount()" style="display: inline-block;">下一题</button>
		</view>
	</view>
</template>

<script>
	import getRandom from '../../utils/utils.js';
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as config from '../../common/config.js';
	
	export default{
		data(){
			return{
				subjectName:"",           //科目名称
				subject:0,               //考试科目
				model:"",                 //驾照类型
				testType:"order",          //练习类型 -- 顺序练习   order
				exerciseList:[],             //获取的所有题
				exercises:[],                //测试习题
				count:0,                   //获取的所有题中的第几题，索引
				answerList:[],             //自己所选的所有答案集
				myAnswer:'',               //自己选的答案
				answerFlag:{'1':'A','2':'B','3':'C','4':'D'},
				accuracy:"",               //正确率
				number:20,                 //20道题
				num:0,                     //做对的题数
			}
		},
		
		onLoad(option) {
			this.model = option.inputTypeValue;
			this.subjectName = option.inputSubjectValue;
			console.log(option.inputTypeValue);      //打印出上页面传递的参数
			console.log(option.inputSubjectValue);
			console.log(this.subjectName);
			console.log(this.model);
			
			// this.getExerciseLists();
			
			// if(this.exerciseList.length == 0){
			// 	this.getExerciseList();
			// }else{
			// 	this.getExercises();
			// }
			
			console.log(this.exerciseList);
			console.log(this.exercises);
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			this.getExerciseLists();
			
			if(this.exerciseList.length == 0){
				await this.getExerciseList();
			}else{
				await this.getExercises();
			}
			// await this.getExerciseList();
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			...mapActions({
				getLicence:'common/getLicence'
			}),
			
			async getExerciseList(){
				if(this.subjectName == "科目1"){
					this.subject = 1
				}
				
				if(this.subjectName == "科目4"){
					this.subject = 4
					this.model = ""
				}
				console.log(this.subjectName)
				console.log(this.subject)
				
				let res = await this.getLicence({
					"subject":this.subject,
					"model":this.model,
					"key":config.KEY,
					"testType":this.testType
				});
				
				this.exerciseList = res.result;
				console.log(res);
				console.log(this.exerciseList);
				
				this.saveExerciseList();
				
				this.getExercises();
			},
			
			//获取20道测试题
			getExercises(){
				for(let i = 0; i < this.number; i ++){
					let index = getRandom(0,this.exerciseList.length);
					console.log(index);
					if(this.exerciseList[index].item1 != "" && this.exerciseList[index].item2 != ""){
						this.exercises.push(this.exerciseList[index]);
					}else{
						this.number ++;
					}
					console.log(this.exercises);
				}
			},
			
			//计算正确率
			getAccuracy(){
				this.accuracy = this.num/this.exercises.length * 100 + "%";
				console.log(this.accuracy);
			},
			
			//获取自己所选择的答案集
			pushAnswerList(myAnswer){
				 this.answerList.push(myAnswer);
				 console.log(this.answerList);
				 
				 if(this.myAnswer == this.answerFlag[this.exercises[this.count].answer]){
				 	this.num ++;
				 };
				 console.log(this.num);
				 
				 if(this.count == 19){
					 this.getAccuracy();
					 
					 uni.showModal({
					 	title:"你的正确率为",
						content:this.accuracy,
						confirmText:"确定",
					 })
					 this.count = 0;
					 this.myAnswer = this.answerList[this.count];
				 }else{
					 this.count ++;
					 this.myAnswer = "";
				 }
			},
			
			//将题库集保存到本地
			saveExerciseList(){
				if(this.model == "a1" && this.subjectName == "科目1"){
					uni.setStorageSync('a1_1_exerciseList',this.exerciseList);
				}
				if(this.model == "a2" && this.subjectName == "科目1"){
					uni.setStorageSync('a2_1_exerciseList',this.exerciseList);
				}	
				if(this.model == "b1" && this.subjectName == "科目1"){
					uni.setStorageSync('b1_1_exerciseList',this.exerciseList);
				}
				if(this.model == "b2" && this.subjectName == "科目1"){
					uni.setStorageSync('b2_1_exerciseList',this.exerciseList);
				}
				if(this.model == "c1" && this.subjectName == "科目1"){
					uni.setStorageSync('c1_1_exerciseList',this.exerciseList);
				}
				if(this.model == "c2" && this.subjectName == "科目1"){
					uni.setStorageSync('c2_1_exerciseList',this.exerciseList);
				}
				
				if(this.model == "a1" && this.subjectName == "科目4"){
					uni.setStorageSync('a1_4_exerciseList',this.exerciseList);
				}
				if(this.model == "a2" && this.subjectName == "科目4"){
					uni.setStorageSync('a2_4_exerciseList',this.exerciseList);
				}	
				if(this.model == "b1" && this.subjectName == "科目4"){
					uni.setStorageSync('b1_4_exerciseList',this.exerciseList);
				}
				if(this.model == "b2" && this.subjectName == "科目4"){
					uni.setStorageSync('b2_4_exerciseList',this.exerciseList);
				}
				if(this.model == "c1" && this.subjectName == "科目4"){
					uni.setStorageSync('c1_4_exerciseList',this.exerciseList);
				}
				if(this.model == "c2" && this.subjectName == "科目4"){
					uni.setStorageSync('c2_4_exerciseList',this.exerciseList);
				}
			},
			
			//获取本地的题库集
			getExerciseLists(){
				if(this.model == "a1" && this.subjectName == "科目1"){
					this.exerciseList = uni.getStorageSync('a1_1_exerciseList');
					console.log(uni.getStorageSync('a1_1_exerciseList'));
				}
				if(this.model == "a2" && this.subjectName == "科目1"){
					this.exerciseList = uni.getStorageSync('a2_1_exerciseList');
					console.log(uni.getStorageSync('a2_1_exerciseList'));
				}	
				if(this.model == "b1" && this.subjectName == "科目1"){
					this.exerciseList = uni.getStorageSync('b1_1_exerciseList');
					console.log(uni.getStorageSync('b1_1_exerciseList'));
				}
				if(this.model == "b2" && this.subjectName == "科目1"){
					this.exerciseList = uni.getStorageSync('b2_1_exerciseList');
					console.log(uni.getStorageSync('b2_1_exerciseList'));
				}
				if(this.model == "c1" && this.subjectName == "科目1"){
					this.exerciseList = uni.getStorageSync('c1_1_exerciseList');
					console.log(uni.getStorageSync('c1_1_exerciseList'));
				}
				if(this.model == "c2" && this.subjectName == "科目1"){
					this.exerciseList = uni.getStorageSync('c2_1_exerciseList');
					console.log(uni.getStorageSync('c2_1_exerciseList'));
				}
				
				if(this.model == "a1" && this.subjectName == "科目4"){
					this.exerciseList = uni.getStorageSync('a1_4_exerciseList');
					console.log(uni.getStorageSync('a1_4_exerciseList'));
				}
				if(this.model == "a2" && this.subjectName == "科目4"){
					this.exerciseList = uni.getStorageSync('a2_4_exerciseList');
					console.log(uni.getStorageSync('a2_4_exerciseList'));
				}	
				if(this.model == "b1" && this.subjectName == "科目4"){
					this.exerciseList = uni.getStorageSync('b1_4_exerciseList');
					console.log(uni.getStorageSync('b1_4_exerciseList'));
				}
				if(this.model == "b2" && this.subjectName == "科目4"){
					this.exerciseList = uni.getStorageSync('b2_4_exerciseList');
					console.log(uni.getStorageSync('b2_4_exerciseList'));
				}
				if(this.model == "c1" && this.subjectName == "科目4"){
					this.exerciseList = uni.getStorageSync('c1_4_exerciseList');
					console.log(uni.getStorageSync('c1_4_exerciseList'));
				}
				if(this.model == "c2" && this.subjectName == "科目4"){
					this.exerciseList = uni.getStorageSync('c2_4_exerciseList');
					console.log(uni.getStorageSync('c2_4_exerciseList'));
				}
			},
			
			
			//上一页
			decCount(){
				this.count --;
				if(this.count <= 0){
					this.count = 0;
				}
				console.log(this.count);
				this.myAnswer = this.answerList[this.count];
			},
			
			//下一页
			addCount(){
				this.count ++;
				if(this.count >= this.exercises.length){
					this.count = this.exercises.length - 1;
					
					uni.showToast({
						title:"已是最后一道题了哦",
						icon:"none",
						position:"center",
					})
				};
				console.log(this.count);
				this.myAnswer = this.answerList[this.count];
			}
		}
	}
</script>

<style>
</style>
