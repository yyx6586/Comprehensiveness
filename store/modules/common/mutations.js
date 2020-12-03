const mutations = {
	//测试 vuex
	setUser(state,user){
		// console.log(user)
		state.account = user.account,
		state.name = user.name
	}
}

export default mutations;