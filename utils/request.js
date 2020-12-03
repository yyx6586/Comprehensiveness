// getList() {         
//                 uni.request({
//                     url: "https://unidemo.dcloud.net.cn/api/news",                  
//                     method: 'get',
//                     dataType: 'json',
//                     success: (res) => {
//                         console.log(res.data);
//                         this.productList = res.data;
//                     },                  
//                 });
//             },

const errorResult = {
	jsonError:[
		{"_exceptionMessage":"系统异常，请与后台管理员联系"}
	]
}

const request = (url = "", data = {}, type = 'get') => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: url,
            data,
            // dataType: 'json', 
		    header:{
				"Access-Control-Allow-Headers": "content-type,x-requested-with",
				"version": "1.0.0",
				"Accept": "application/json",
				"_locale": "zh_CN",
				"Accept-Language": "zh-CN",
				"Content-Language": "zh-CN",
				"Content-Type": "application/json;charset=UTF-8"
			}
        }).then((response) => {
            // setTimeout(function() {
            //     uni.hideLoading();
            // }, 200);
            let [error, res] = response;        
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

// function myRequest(options){
// 	return new Promise((resolve,reject)=>{
// 		uni.request({
// 					url:options.url,
// 					method:options.method || 'GET',
// 					data:options.data,
// 					success(data) {
// 						resolve(data)
// 					},
// 					fail(err) {
// 						reject(err)
// 					}

// 	})
// }
export default request 