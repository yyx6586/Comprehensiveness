//生成一个随机的整数
const getRandom = function random(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	// return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
	return parseInt(Math.floor(Math.random() * (max - min + 1)) + min); //含最大值，含最小值 
}

export default getRandom