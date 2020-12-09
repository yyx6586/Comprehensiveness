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
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as config from '../../common/config.js'
	export default{
		data(){
			return{
				subjectName:"",           //科目名称
				subject:0,               //考试科目
				model:"",                 //驾照类型
				testType:"order",          //练习类型 -- 顺序练习   order
				exerciseList:[],             //获取的所有题
				count:0,                   //获取的所有题中的第几题，索引
				answerList:{},             //自己所选的所有答案集
				myAnswer:'',               //自己选的答案
				answerFlag:{'1':'A','2':'B','3':'C','4':'D'},
				errExerciseList:{},        //错题集
			}
		},
		
		onLoad(option){                               //opthin为object类型，会序列化上页面传递的参数
		    this.model = option.inputTypeValue;
			this.subjectName = option.inputSubjectValue;
			console.log(option.inputTypeValue);      //打印出上页面传递的参数
			console.log(option.inputSubjectValue);
			console.log(this.subjectName);
			console.log(this.model);
			// this.getExerciseList();
			
			// this.getCount();
			// console.log(this.count);
			// if(this.count == ""){
			// 	this.count = 0;
			// 	this.getExerciseList();
			// }else{
			// 	this.getExerciseLists();
			// }
			
			console.log(this.exerciseList);
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			this.getCount();
			console.log(this.count);
			if(this.count == ""){
				this.count = 0;
				await this.getExerciseList();
			}else{
				await this.getExerciseLists();
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
			},
			
			//获取自己所选择的答案集
			pushAnswerList(myAnswer){
				let key = this.count;
				let value = myAnswer;
				 this.answerList[key] = value;
				 console.log(this.answerList);
				 this.saveAnswerList();
				 
				 if(myAnswer != this.answerFlag[this.exerciseList[this.count].answer]){
					 this.setErrExerciseList()
				 };
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
			
			//保存题库集的下标
			saveCount(){
				if(this.model == "a1" && this.subjectName == "科目1"){
					uni.setStorageSync('a1_1_count',this.count);
				}
				if(this.model == "a2" && this.subjectName == "科目1"){
					uni.setStorageSync('a2_1_count',this.count);
				}	
			    if(this.model == "b1" && this.subjectName == "科目1"){
					uni.setStorageSync('b1_1_count',this.count);
			    }
			    if(this.model == "b2" && this.subjectName == "科目1"){
					uni.setStorageSync('b2_1_count',this.count);
			    }
				if(this.model == "c1" && this.subjectName == "科目1"){
					uni.setStorageSync('c1_1_count',this.count);
				}
				if(this.model == "c2" && this.subjectName == "科目1"){
					uni.setStorageSync('c2_1_count',this.count);
				}
				
				if(this.model == "a1" && this.subjectName == "科目4"){
					uni.setStorageSync('a1_4_count',this.count);
				}
				if(this.model == "a2" && this.subjectName == "科目4"){
					uni.setStorageSync('a2_4_count',this.count);
				}	
				if(this.model == "b1" && this.subjectName == "科目4"){
					uni.setStorageSync('b1_4_count',this.count);
				}
				if(this.model == "b2" && this.subjectName == "科目4"){
					uni.setStorageSync('b2_4_count',this.count);
				}
				if(this.model == "c1" && this.subjectName == "科目4"){
					uni.setStorageSync('c1_4_count',this.count);
				}
				if(this.model == "c2" && this.subjectName == "科目4"){
					uni.setStorageSync('c2_4_count',this.count);
				}
				// uni.setStorage({
				// 	key:'count',
				// 	data:this.count
				// })
			},
			
			//获取题库集的下标
			getCount(){
				if(this.model == "a1" && this.subjectName == "科目1"){
					this.count = uni.getStorageSync('a1_1_count');
					console.log(uni.getStorageSync('a1_1_count'));
				}
				if(this.model == "a2" && this.subjectName == "科目1"){
					this.count = uni.getStorageSync('a2_1_count');
					console.log(uni.getStorageSync('a2_1_count'));
				}	
				if(this.model == "b1" && this.subjectName == "科目1"){
					this.count = uni.getStorageSync('b1_1_count');
					console.log(uni.getStorageSync('b1_1_count'));
				}
				if(this.model == "b2" && this.subjectName == "科目1"){
					this.count = uni.getStorageSync('b2_1_count');
					console.log(uni.getStorageSync('b2_1_count'));
				}
				if(this.model == "c1" && this.subjectName == "科目1"){
					this.count = uni.getStorageSync('c1_1_count');
					console.log(uni.getStorageSync('c1_1_count'));
				}
				if(this.model == "c2" && this.subjectName == "科目1"){
					this.count = uni.getStorageSync('c2_1_count');
					console.log(uni.getStorageSync('c2_1_count'));
				}
				
				if(this.model == "a1" && this.subjectName == "科目4"){
					this.count = uni.getStorageSync('a1_4_count');
					console.log(uni.getStorageSync('a1_4_count'));
				}
				if(this.model == "a2" && this.subjectName == "科目4"){
					this.count = uni.getStorageSync('a2_4_count');
					console.log(uni.getStorageSync('a2_4_count'));
				}	
				if(this.model == "b1" && this.subjectName == "科目4"){
					this.count = uni.getStorageSync('b1_4_count');
					console.log(uni.getStorageSync('b1_4_count'));
				}
				if(this.model == "b2" && this.subjectName == "科目4"){
					this.count = uni.getStorageSync('b2_4_count');
					console.log(uni.getStorageSync('b2_4_count'));
				}
				if(this.model == "c1" && this.subjectName == "科目4"){
					this.count = uni.getStorageSync('c1_4_count');
					console.log(uni.getStorageSync('c1_4_count'));
				}
				if(this.model == "c2" && this.subjectName == "科目4"){
					this.count = uni.getStorageSync('c2_4_count');
					console.log(uni.getStorageSync('c2_4_count'));
				}
				// uni.getStorage({
				// 	key:'count',
				// 	success(res){
				// 		res.data      //这就是你想要取的信息
				// 	}
				// })
			},
			
			//将自己选的答案集保存到本地
			saveAnswerList(){
				if(this.model == "a1" && this.subjectName == "科目1"){
					uni.setStorageSync('a1_1_answerList',this.answerList);
				}
				if(this.model == "a2" && this.subjectName == "科目1"){
					uni.setStorageSync('a2_1_answerList',this.answerList);
				}	
				if(this.model == "b1" && this.subjectName == "科目1"){
					uni.setStorageSync('b1_1_answerList',this.answerList);
				}
				if(this.model == "b2" && this.subjectName == "科目1"){
					uni.setStorageSync('b2_1_answerList',this.answerList);
				}
				if(this.model == "c1" && this.subjectName == "科目1"){
					uni.setStorageSync('c1_1_answerList',this.answerList);
				}
				if(this.model == "c2" && this.subjectName == "科目1"){
					uni.setStorageSync('c2_1_answerList',this.answerList);
				}
				
				if(this.model == "a1" && this.subjectName == "科目4"){
					uni.setStorageSync('a1_4_answerList',this.answerList);
				}
				if(this.model == "a2" && this.subjectName == "科目4"){
					uni.setStorageSync('a2_4_answerList',this.answerList);
				}	
				if(this.model == "b1" && this.subjectName == "科目4"){
					uni.setStorageSync('b1_4_answerList',this.answerList);
				}
				if(this.model == "b2" && this.subjectName == "科目4"){
					uni.setStorageSync('b2_4_answerList',this.answerList);
				}
				if(this.model == "c1" && this.subjectName == "科目4"){
					uni.setStorageSync('c1_4_answerList',this.answerList);
				}
				if(this.model == "c2" && this.subjectName == "科目4"){
					uni.setStorageSync('c2_4_answerList',this.answerList);
				}
			},
			
			//获取本地自己选的答案集
			getAnswerList(){
				if(this.model == "a1" && this.subjectName == "科目1"){
					this.answerList = uni.getStorageSync('a1_1_answerList');
					console.log(uni.getStorageSync('a1_1_answerList'));
				}
				if(this.model == "a2" && this.subjectName == "科目1"){
					this.answerList = uni.getStorageSync('a2_1_answerList');
					console.log(uni.getStorageSync('a2_1_answerList'));
				}	
				if(this.model == "b1" && this.subjectName == "科目1"){
					this.answerList = uni.getStorageSync('b1_1_answerList');
					console.log(uni.getStorageSync('b1_1_answerList'));
				}
				if(this.model == "b2" && this.subjectName == "科目1"){
					this.answerList = uni.getStorageSync('b2_1_answerList');
					console.log(uni.getStorageSync('b2_1_answerList'));
				}
				if(this.model == "c1" && this.subjectName == "科目1"){
					this.answerList = uni.getStorageSync('c1_1_answerList');
					console.log(uni.getStorageSync('c1_1_answerList'));
				}
				if(this.model == "c2" && this.subjectName == "科目1"){
					this.answerList = uni.getStorageSync('c2_1_answerList');
					console.log(uni.getStorageSync('c2_1_answerList'));
				}
				
				if(this.model == "a1" && this.subjectName == "科目4"){
					this.answerList = uni.getStorageSync('a1_4_answerList');
					console.log(uni.getStorageSync('a1_4_answerList'));
				}
				if(this.model == "a2" && this.subjectName == "科目4"){
					this.answerList = uni.getStorageSync('a2_4_answerList');
					console.log(uni.getStorageSync('a2_4_answerList'));
				}	
				if(this.model == "b1" && this.subjectName == "科目4"){
					this.answerList = uni.getStorageSync('b1_4_answerList');
					console.log(uni.getStorageSync('b1_4_answerList'));
				}
				if(this.model == "b2" && this.subjectName == "科目4"){
					this.answerList = uni.getStorageSync('b2_4_answerList');
					console.log(uni.getStorageSync('b2_4_answerList'));
				}
				if(this.model == "c1" && this.subjectName == "科目4"){
					this.answerList = uni.getStorageSync('c1_4_answerList');
					console.log(uni.getStorageSync('c1_4_answerList'));
				}
				if(this.model == "c2" && this.subjectName == "科目4"){
					this.answerList = uni.getStorageSync('c2_4_answerList');
					console.log(uni.getStorageSync('c2_4_answerList'));
				}
			},
			
			//保存错题集
			setErrExerciseList(){
				let key = this.exerciseList[this.count].id;
				let value = this.exerciseList[this.count];
				this.errExerciseList[key] = value;
				uni.setStorageSync("orderErrExerciseList",this.errExerciseList);
			},
			
			//上一页
			decCount(){
				this.count --;
				if(this.count <= 0){
					this.count = 0;
				}
				console.log(this.count);
				this.getAnswerList();
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
				this.saveCount();
				console.log(this.count);
			}
		}
	}
</script>

<style>
</style>
