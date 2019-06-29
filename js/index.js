// 滚动条监听事件,做头部样式
window.onscroll= function(){
    //变量t是滚动条滚动时，距离顶部的距离
    var t = document.documentElement.scrollTop||document.body.scrollTop;
    if(t>50) return;
	console.log('开始监听滚动条');
	var tmallHeader = document.querySelector(".tmall_header");
	var headerMenu = document.querySelector(".tmall_header > .header_top > .menu");
	var tmallIcon = document.querySelector(".tmall_header > .header_top > .tmall_icon");
	var headerLogin = document.querySelector(".tmall_header > .header_top > .login");
	var headerSearch = document.querySelector(".tmall_header > .search_link");
	var searchContent = document.querySelectorAll(".tmall_header > .search_link > .search > *");
	if(t>10) {
		tmallHeader.classList.add('active');
		headerMenu.classList.add('active');
		tmallIcon.classList.add('active');
		headerLogin.classList.add('active');
		headerSearch.classList.add('active');
		[].forEach.call(searchContent,function(v){
			v.classList.add('active');
		});
	}else{
		tmallHeader.classList.remove('active');
		headerMenu.classList.remove('active');
		tmallIcon.classList.remove('active');
		headerLogin.classList.remove('active');
		headerSearch.classList.remove('active');
		[].forEach.call(searchContent,function(v){
			v.classList.remove('active');
		});
	}
}



// slider 轮播图
var gallery = mui('.mui-slider');
gallery.slider({
	interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});
document.querySelector('.mui-slider').addEventListener('touchstart', function(event) {
//手指刚开始滑动时,关闭自动轮播
	console.log("touchstart");
	gallery.slider({
		interval:0//自动轮播周期，若为0则不自动播放，默认为0；
	});
});
document.querySelector('.mui-slider').addEventListener('touchend', function(event) {
//手指滑动结束,重新开启自动轮播
	console.log("touchend");
	gallery.slider({
		interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
	});
});



// 限时抢购倒计时
var limitTime = 1000*3600*2;   // 限时2小时 可以改
var startTime;
if (window.localStorage.getItem('startTime')) {  // 判断用户是否第一次打开该页面，如果之前已经打开过
	startTime = parseInt(window.localStorage.getItem('startTime')); //则取得本地存储startTime值
	if (startTime + limitTime <= Date.parse(new Date())) {  // 如果限时结束时间已经过期
		startTime = Date.parse(new Date());  // 重新设定开始时间，并存储到本地
		window.localStorage.setItem('startTime' , startTime);
	}
} else {
	startTime = Date.parse(new Date());  // 如果是第一次打开，获得当前时间总毫秒数，并存储到本地
	// console.log(typeof startTime);
	window.localStorage.setItem('startTime' , startTime);
}
var endTime = limitTime + startTime;  // 获得限时结束时间
// console.log(startTime,endTime);

// 获得相关dom元素
var hour1 = document.querySelector('.four_culumn .countdown .hour .ten');
var hour2 = document.querySelector('.four_culumn .countdown .hour .single');
var minute1 = document.querySelector('.four_culumn .countdown .minute .ten');
var minute2 = document.querySelector('.four_culumn .countdown .minute .single');
var second1 = document.querySelector('.four_culumn .countdown .second .ten');
var second2 = document.querySelector('.four_culumn .countdown .second .single');

// 把数字分解成十位和各位的方法
function getTen(num) {
	return Math.floor(num/10)
}
function getSingle(num) {
	return num % 10
}

// 开启定时器
var countdownTiming = setInterval( function(){  // 定时循环函数
	let curTime = Date.parse(new Date());  // 获得当前时间
	let countdown = Math.floor((endTime - curTime)/1000);  // 获得倒计时总秒数 
	let hour = Math.floor(countdown/3600);  
	hour1.innerHTML = getTen(hour);
	hour2.innerHTML = getSingle(hour);
	let minute = Math.floor((countdown % 3600)/60); 
	minute1.innerHTML = getTen(minute);
	minute2.innerHTML = getSingle(minute); 
	let second = countdown % 60;
	second1.innerHTML = getTen(second);
	second2.innerHTML = getSingle(second);
	if (countdown === 0) {   // 如果倒计时归零，清除定时器
		clearInterval(countdownTiming)
	}
},1000)
