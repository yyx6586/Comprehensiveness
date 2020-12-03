import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = {
	//测试 vuex
	account:"",
	name:"",
	
}

export default {
	namespaced:true,
	state,
	getters,
	actions,
	mutations
}