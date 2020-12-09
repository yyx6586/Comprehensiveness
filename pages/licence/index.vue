<template>
	<view>
		<!-- 请选择驾照类型 -->
		<view style="display: flex; flex-direction: column;align-items: center; margin-top: 40rpx;">
			<view style="display: flex; flex-direction: row; justify-content: center; margin-top: 15rpx; margin-bottom: 15rpx;">
				<text style="font-size: 35rpx; margin-right: 20rpx; line-height: 50rpx; text-align: center;">{{type}}</text>
				<view @click.stop="showTypeHidden = !showTypeHidden" :value="inputTypeValue" type="text" style="width: 300rpx; height: 50rpx; border: 1rpx solid #BEBEBE; border-radius: 30rpx; text-align: center;">{{inputTypeValue}}</view>
				<!-- <input /> -->
				<image src="../../static/licence/xiala.png" style="width: 40rpx; height: 40rpx; margin-left: -50rpx;margin-top: 9rpx;"></image>
			</view>
			<view v-if="showTypeHidden" style="text-align: center;left: 0rpx;right: 0rpx;position: fixed;bottom: 0rpx;background-color: #F4F5F6; border-radius: 40rpx;">
				<text @click="getTypeValue(index)" v-for="(item,index) in licenceTypeList" :key="index" style="display: block; margin-top: 15rpx;font-size: 45rpx; border-bottom: 1rpx solid #DCDCDC;">{{item}}</text>
			</view>
			<!-- <view v-if="showTypeHidden" style="width: 290rpx; height: 305rpx;display: flex; flex-direction: column;align-items: center; background-color: #EBEBEB;margin-left: 152rpx; border-radius: 20rpx;">
				<text @click="getTypeValue(index)" v-for="(item,index) in licenceTypeList" :key="index">{{item}}</text>
			</view> -->
		</view>
		<!-- 请选择驾照类型 end-->
		
		<!-- 请选择考试科目 -->
		<view style="display: flex; flex-direction: column;align-items: center; margin-top: 40rpx;">
			<view style="display: flex; flex-direction: row; justify-content: center; margin-top: 15rpx; margin-bottom: 15rpx;">
				<text style="font-size: 35rpx; margin-right: 20rpx; line-height: 50rpx; text-align: center;">{{subject}}</text>
				<view @click.stop="showSubjectHidden = !showSubjectHidden" :value="inputSubjectValue" type="text" style="width: 300rpx; height: 50rpx; border: 1rpx solid #BEBEBE; border-radius: 30rpx; text-align: center;">{{inputSubjectValue}}</view>
				<!-- <input /> -->
				<image src="../../static/licence/xiala.png" style="width: 40rpx; height: 40rpx; margin-left: -50rpx;margin-top: 9rpx;"></image>
			</view>
			<view v-if="showSubjectHidden" style="text-align: center;left: 0rpx;right: 0rpx;position: fixed;bottom: 0rpx;background-color: #F4F5F6; border-radius: 40rpx;">
				<text @click="getSubjectValue(index)" v-for="(item,index) in licenceSubjectList" :key="index" style="display: block; margin-top: 15rpx;font-size: 45rpx; border-bottom: 1rpx solid #DCDCDC;">{{item}}</text>
			</view>
			<!-- <view v-if="showSubjectHidden" style="width: 290rpx; height: 105rpx;display: flex; flex-direction: column;align-items: center; background-color: #EBEBEB;margin-left: 152rpx; border-radius: 20rpx;">
				<text @click="getSubjectValue(index)" v-for="(item,index) in licenceSubjectList" :key="index">{{item}}</text>
			</view> -->
		</view>
		<!-- 请选择考试科目 end-->
		
		<!-- 练习 -->
		<view style="display: flex; flex-direction: row; justify-content: center; align-items: center;margin-top: 80rpx;">
			<view @click="goToRandom(inputTypeValue,inputSubjectValue)" style="width: 200rpx; height: 200rpx; border-radius: 100rpx; background-color: #007AFF; text-align: center;margin-right: 80rpx;">
				<text style="color: #FFFFFF; line-height: 200rpx; text-align: center;">随机练习</text>
			</view>
			
			<view @click="goToOrder(inputTypeValue,inputSubjectValue)" style="width: 200rpx; height: 200rpx; border-radius: 100rpx; background-color: #00CE47; text-align: center;">
				<text style="color: #FFFFFF; line-height: 200rpx; text-align: center;">顺序练习</text>
			</view>
		</view>
		<!-- 练习 end-->
		
		<!-- 错题与考试 -->
		<view style="display: flex; flex-direction: row; justify-content: center; align-items: center;margin-top: 80rpx;">
			<view @click="goToWrongExercise()" style="width: 200rpx; height: 200rpx; border-radius: 100rpx; background-color: #F823FF; text-align: center;margin-right: 80rpx;">
				<text style="color: #FFFFFF; line-height: 200rpx; text-align: center;">错题集</text>
			</view>
			
			<view @click="goToTest(inputTypeValue,inputSubjectValue)" style="width: 200rpx; height: 200rpx; border-radius: 100rpx; background-color: #FFCC33; text-align: center;">
				<text style="color: #FFFFFF; line-height: 200rpx; text-align: center;">测验</text>
			</view>
		</view>
		<!-- 错题与考试 end-->
	</view>
</template>

<script>	
	export default{
		data(){
			return{
				type:"请选择驾照类型",
				inputTypeValue:"",                 //类型输入框里的内容
				showTypeHidden: false,             //是否显示下拉框为不显示
				licenceTypeList:["a1","a2","b1","b2","c1","c2"],           //驾照类型数组
				
				subject:"请选择考试科目",
				inputSubjectValue:"",              //科目输入框里的值,
				showSubjectHidden: false,             //是否显示下拉框为不显示
				licenceSubjectList:["科目1", "科目4"],                      //科目数组
			}
		},
		
		methods:{
			// 点击页面事件 隐藏需要隐藏的区域
			hiddenTypeClick () {
			    this.showTypeHidden = false;
			},
			getTypeValue(e){
				this.inputTypeValue = this.licenceTypeList[e];
				this.showTypeHidden = false;
				console.log(e);
				console.log(this.inputTypeValue);
			},
			
			hiddenSubjectClick () {
			    this.showSubjectHidden = false;
			},
			getSubjectValue(e){
				this.inputSubjectValue = this.licenceSubjectList[e];
				this.showSubjectHidden = false;
				console.log(e);
				console.log(this.inputSubjectValue);
			},
			
			goToRandom(inputTypeValue, inputSubjectValue){
				if(this.inputTypeValue == ""){
					uni.showToast({
						title:this.type,
						icon:"none",
						mask:true,
						position:'center',
					})
					return;
				}
				
				if(this.inputSubjectValue == ""){
					uni.showToast({
						title:this.subject,
						icon:'none',
						mask:true,
						position:'center',
					})
					return;
				}
				
				uni.navigateTo({
					url:"random?inputTypeValue="+inputTypeValue + "&inputSubjectValue=" + inputSubjectValue,
				})
			},
			
			goToOrder(inputTypeValue,inputSubjectValue){
				if(this.inputTypeValue == ""){
					uni.showToast({
						title:this.type,
						icon:"none",
						mask:true,
						position:'center',
					})
					return;
				}
				
				if(this.inputSubjectValue == ""){
					uni.showToast({
						title:this.subject,
						icon:'none',
						mask:true,
						position:'center',
					})
					return;
				}
				
				uni.navigateTo({
					url:"order?inputTypeValue="+inputTypeValue + "&inputSubjectValue=" + inputSubjectValue,
				})
			},
			
			goToWrongExercise(inputTypeValue, inputSubjectValue){
				uni.navigateTo({
					url:"wrong-exercise",
				})
			},
			
			goToTest(inputTypeValue,inputSubjectValue){
				if(this.inputTypeValue == ""){
					uni.showToast({
						title:this.type,
						icon:"none",
						mask:true,
						position:'center',
					})
					return;
				}
				
				if(this.inputSubjectValue == ""){
					uni.showToast({
						title:this.subject,
						icon:'none',
						mask:true,
						position:'center',
					})
					return;
				}
				uni.navigateTo({
					url:"test?inputTypeValue="+inputTypeValue + "&inputSubjectValue=" + inputSubjectValue,
				})
			}
			
		}
	}
</script>

<style>
</style>
