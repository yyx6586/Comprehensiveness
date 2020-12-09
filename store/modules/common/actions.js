import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	//测试 vuex
	setUser({commit,state},data){
		console.log(data)
		commit("setUser",data)
	},
	
	//驾照
	getLicence({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request(config.LICENCE_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				console.log(res);
			}
		})
	},
	
	//新闻头条
	getNews({commit,state},data){
		return new Promise(async (resolve, reject) =>{
			let res = await request(config.NEWS_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				console.log(res);
			}
		})
	}
}

export default actions