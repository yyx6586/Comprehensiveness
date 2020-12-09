<template>
	<view style="display: flex; flex-direction: column;align-items: flex-start;margin-left: 50rpx;flex-wrap: wrap;">
		<text style="margin-top: 10rpx;font-size: 30rpx;">{{count + 1}}.&nbsp{{question}}</text>
		<image v-if="showImgHidden" :src="url" style="width: 450rpx; height: 300rpx; margin-top: 10rpx;"></image>
		<text @click="getMyQuestionA()" style="margin-top: 10rpx; font-size: 30rpx;">A.&nbsp{{optionA}}</text>
		<text @click="getMyQuestionB()" style="margin-top: 10rpx; font-size: 30rpx;">B.&nbsp{{optionB}}</text>
		<text @click="getMyQuestionC()" v-if="showCHidden" style="margin-top: 10rpx; font-size: 30rpx;">C.&nbsp{{optionC}}</text>
		<text @click="getMyQuestionD()" v-if="showDHidden" style="margin-top: 10rpx; font-size: 30rpx;">D.&nbsp{{optionD}}</text>
		
		<view v-if="showAnswer" style="display: flex; flex-direction: row; justify-content: flex-start;margin-top: 30rpx;">
			<text style="font-size: 33rpx;">答案：</text>
			<text style="font-size: 30rpx; text-align: center;margin-top: 3rpx;">{{answerVue}}</text>
			
			<text style="margin-left: 50rpx; font-size: 33rpx;">
				你的选择:
				<text style="font-size: 30rpx; text-align: center; margin-left: 10rpx;margin-top: 5rpx;">{{myAnswer}}</text>
			</text>
		</view>
		
		<view v-if="showExplains" style="display: flex; flex-direction: row; justify-content: flex-start;flex-wrap: wrap; margin-top: 20rpx;">
			<text style="font-size: 33rpx;">解释：</text>
			<text style="font-size: 30rpx;">{{explains}}</text>
		</view>
		
		<view style="position: fixed;bottom: 10rpx; margin-left: 100rpx; margin-right: 100rpx;">
			<button @click="decCount()" style="margin-right: 100rpx; display: inline-block;">上一题</button>
			<button @click="addCount()" style="display: inline-block;">下一题</button>
		</view>
	</view>
	
	<!-- <view>
		<view>{{count+1}}.
			{{list[count].question}}
		</view>
		<image v-if="list[count].url" :src="list[count].url"></image>
		
		<view @tap="answer='A'" v-if="list[count].item1">A.{{list[count].item1}}</view>
		<view @tap="answer='B'" v-if="list[count].item2">B.{{list[count].item2}}</view>
		<view @tap="answer='C'" v-if="list[count].item3">C.{{list[count].item3}}</view>
		<view @tap="answer='D'" v-if="list[count].item4">D.{{list[count].item4}}</view>
	</view>
	
	<view v-if="answer">
		<text>ok.{{answerFlag[list[count].answer]}}</text>
		<view class="" style="width: 10rpx;"></view>
		<text v-if="answerFlag[list[count].answer]">你的答案.{{answer}}</text>
	</view> -->
</template>

<script>
	import request from '@/utils/request.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as config from '../../common/config.js'
	
	export default{
		data(){
			return{
				// flag:0,
				// list:[],
				// answer:'',
				// answerFlag:{'1':'A','2':'B','3':'C','4':'D'},
				
				showImgHidden: true,         //图片是否显示
				showCHidden:true,            //选项 C 是否显示
				showDHidden:true,            //选项 D 是否显示
				showAnswer:false,            //是否显示答案
				showExplains:false,          //是否显示解释
				subjectName:"",           //科目名称
				subject:0,               //考试科目
				model:"",                 //驾照类型
				testType:"rand",          //练习类型 -- 随机练习   rand
				exerciseList:[],             //获取的所有题
				exercise:"",                 //当前页面显示的题
				count:0,                   //获取的所有题中的第几题，索引
				question:"",                 //问题
				url:"",                      //图片
				answer:"",                   //后台答案
				answerVue:"",                //前端显示的正确答案
				myAnswer:"",                 //自己选取的答案
				myAnswerList:[],             //自己选的答案集合
				explains:"",                 //解析
				optionA:"",                  //选项 A
				optionB:"",                  //选项 B
				optionC:"",                  //选项 C
				optionD:"",                  //选项 D
				optionList:[],               //选项集
				errExerciseList:{},                  //错题集
			}
		},
		
		onLoad(option){                               //opthin为object类型，会序列化上页面传递的参数
		    this.model = option.inputTypeValue;
			this.subjectName = option.inputSubjectValue;
			console.log(option.inputTypeValue);      //打印出上页面传递的参数
			console.log(option.inputSubjectValue);
			console.log(this.subjectName);
			console.log(this.model);
			
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			await this.getExerciseList();
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			...mapActions({
				getLicence:'common/getLicence'
			}),
			
			// selectAnswer(answer){
			// 	if()
			// 	this.list[this.count].answer
			// },
			
			//获取所有练习题
		    async getExerciseList () {
				if(this.subjectName == "科目1"){
					this.subject = 1
				}
				
				if(this.subjectName == "科目4"){
					this.subject = 4
					this.model = ""
				}
				console.log(this.subjectName)
				console.log(this.subject)
				
				// await request("http://v.juhe.cn/jztk/query", {
				// // 传参参数名：参数值,如果没有，就不需要传
				// "subject":this.subject,
				// "model":this.model,
				// "key":this.key,
				// "testType":this.testType
				// })
				// .then(res => {
				// 	this.exerciseList = res.result
				// 	console.log(res)
				// })
				
				let res = await this.getLicence({
					"subject":'1',//this.subject,
					"model":'c1',//this.model,
					"key":config.KEY,
					"testType":'rand',//this.testType
				})
				this.exerciseList = res.result
				// this.list = res.result
				this.getExercise()
			},
			
			//获取每一道练习题的详细
			getExercise(){
				this.exercise = this.exerciseList[this.count];
				this.question = this.exercise.question;
				this.url = this.exercise.url;
				this.optionA = this.exercise.item1;
				this.optionB = this.exercise.item2;
				this.optionC = this.exercise.item3;
				this.optionD = this.exercise.item4;
				this.answer = this.exercise.answer;
				this.explains = this.exercise.explains;
				console.log(this.question);
				console.log(this.url);
				console.log(this.optionA);
				console.log(this.explains);
				console.log(this.answer);
				console.log(this.exerciseList);
				console.log(this.exercise);
				
				this.ImgIsShow()
				this.CIsShow()
				this.DIsShow()
			},
			
			//是否显示图片
			ImgIsShow(){
				if(this.url == ""){
					this.showImgHidden = false
				}else{
					this.showImgHidden = true
				}
			},
			
			//是否显示选项 C
			CIsShow(){
				if(this.optionC == ""){
					this.showCHidden = false
				}else{
					this.showCHidden = true
				}
			},
			
			//是否显示选项 D
			DIsShow(){
				if(this.optionD == ""){
					this.showDHidden = false
				}else{
					this.showDHidden = true
				}
			},
			
			//是否显示答案
			answerIsShow(){
				this.showAnswer = true
				this.getAnswerVue()
				this.myAnswer = this.myAnswerList[this.count]
			},
			
			//是否显示解释
			explainsIsShow(){
				this.showExplains = true
			},
			
			//获取前端显示的答案
			getAnswerVue(){
				if(this.answer == "1"){
					this.answerVue = "A"
				}
				
				if(this.answer == "2"){
					this.answerVue = "B"
				}
				
				if(this.answer == "3"){
					this.answerVue = "C"
				}
				
				if(this.answer == "4"){
					this.answerVue = "D"
				}
			},
			
			//保存错题集
			setErrExerciseList(){
				let key = this.exercise.id;
				let value = this.exercise;
				this.errExerciseList[key] = value;
				uni.setStorageSync("randomErrExerciseList",this.errExerciseList);
			},
			
			// //获取错题集
			// getErrExerciseList(){
			// 	this.errExerciseList = uni.getStorageSync("errExerciseList");
			// 	console.log(this.errExerciseList);
			// },
			
			//获取完成练习题自己选的答案 A
			getMyQuestionA(){
				this.myAnswer = "A"
				this.myAnswerList.push(this.myAnswer)
				this.answerIsShow()
				this.explainsIsShow()
				if(this.myAnswer != this.answerVue){
					this.setErrExerciseList()
				};
			},
			
			//获取完成练习题自己选的答案 B
			getMyQuestionB(){
				this.myAnswer = "B"
				this.myAnswerList.push(this.myAnswer)
				this.answerIsShow()
				this.explainsIsShow()
				if(this.myAnswer != this.answerVue){
					this.setErrExerciseList()
				};
			},
			
			//获取完成练习题自己选的答案 C
			getMyQuestionC(){
				this.myAnswer = "C"
				this.myAnswerList.push(this.myAnswer)
				this.answerIsShow()
				this.explainsIsShow()
				if(this.myAnswer != this.answerVue){
					this.setErrExerciseList()
				};
			},
			
			//获取完成练习题自己选的答案 D
			getMyQuestionD(){
				this.myAnswer = "D"
				this.myAnswerList.push(this.myAnswer)
				this.answerIsShow()
				this.explainsIsShow()
				if(this.myAnswer != this.answerVue){
					this.setErrExerciseList()
				};
			},
			
			//清空页面
			clear(){
				this.question = ""
				this.url = ""
				this.optionA = ""
				this.optionB = ""
				this.optionC = ""
				this.optionD = ""
				this.answer = ""
				this.answerVue = ""
				this.myAnswer = ""
				this.explains = ""
				this.showAnswer = false
				this.showExplains = false
			},
			
			//上一页
			decCount(){
				this.count --
				if(this.count <= 0){
					this.count = 0
				}
				console.log(this.count)
				this.getExercise()
				this.answerIsShow()
				this.explainsIsShow()
			},
			
			//下一页
			addCount(){
				this.count ++
				if(this.count >= this.errExerciseList.length){
					this.count = this.errExerciseList.length - 1;
					
					uni.showToast({
						title:"已是最后一道题了哦",
						icon:"none",
						position:"center",
					})
				}else{
					this.clear();
				}
				console.log(this.count)
				this.getExercise()
			}
		}
	}
</script>

<style>
</style>
