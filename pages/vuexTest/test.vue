<template>
	<view>
		<form @submit="submit">
			<view>
				<text>账号:</text>
				<input :value="user.account" name="account"/>
			</view>
			<view>
				<text>姓名:</text>
				<input :value="user.name" name="name"/>
			</view>
			<button form-type="submit" >提交</button>
		</form>
		
		<pullDown></pullDown>
		
		
	</view>
</template>

<script>
	import pullDown from '@/components/pull-down/pull-down.vue'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	
	export default{
		components:{
			pullDown,
		},
		
		data(){
			return{
				user:"",
				text:"请选择驾照类型",
				TextList:["a1","a2","b1","b2","c1","c2"],
			}
		},
		
		computed:{
			...mapState({
				account:state => state.common.account,
				name:state => state.common.name
			})
		},
		
		methods:{
			...mapActions({
				setUser:'common/setUser'
			}),
			
			submit(user){
				this.setUser({account:user.detail.value.account,name:user.detail.value.name})
				console.log(user)
				console.log(user.detail.value.account)
				console.log(user.detail.value.name)
				console.log(this.account)
				console.log(this.name)
			}
		}
	}
</script>

<style>
</style>
