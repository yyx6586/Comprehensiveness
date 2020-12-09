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

const request = (url = "", data = {}, type = 'GET') => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: url,
            data,
            // dataType: 'json', 
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