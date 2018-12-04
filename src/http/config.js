import axios from 'axios';
//import store from '../store/index';
//import {Loading, Message, Notification} from 'element-ui';
//const qs = require("querystring");
import qs from 'qs';

// 超时时间
let TIMEOUT = 10000;
// loading层的文字
// let options = {text: '拼命加载中'};
// 请求次数
var axiosNum = 0;
// loading层
var loadingInstance = null;
// 定时器
var loadingTimer = null;
// 是否要显示loading层
var isLoading = true
// 请求的超时时间
axios.defaults.timeout = TIMEOUT;
// post请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 后台必带参数
axios.defaults.headers.common['client-id'] = '2';

// 基础域名
// if(location.hostname == 'cropadmin.funmart.cn') {
//	axios.defaults.baseURL = process.env.API_PATH_PROD;
// }else {
// 	axios.defaults.baseURL = process.env.API_PATH_DEV;
// }
axios.defaults.baseURL = 'http://localhost:3002/';
// axios.defaults.baseURL = process.env.API_ROOT;
// 全局基础域名
global.baseURL = axios.defaults.baseURL;
// request 拦截
axios.interceptors.request.use(config => {
	// 获取axiostype 用于判断是否需要显示loading层 axiosType == 2时  不需要显示loading层
	var dataParse = qs.parse(config.data);
	if(dataParse.axiosType && dataParse.axiosType === 2) {
		isLoading = false;
		// 删除axiosType字段 因为不需要传至后端，此字段只用作前端判断是否全局显示loading层
		delete dataParse.axiosType;
		// 将删除后的对象重新转化
		config.data = qs.stringify(dataParse);
	}else {
		isLoading = true;
	}
	// 统计请求次数 对应响应次数 当数值为0的时候表示所有请求都已返回
	if(isLoading) {
		axiosNum++;
		// 此处定时器 用于过滤请求响应时间小于500毫秒的请求 防止过快响应时 loading闪烁
		setTimeout(()=>{
			if(axiosNum > 0) {
				// 开启loading
				//loadingInstance = Loading.service(options);
				// 清空定时器
				clearTimeout(loadingTimer)
				// 设置定时器 超时关闭loading
				loadingTimer = setTimeout(()=>{
					if(loadingInstance) {
						loadingInstance.close();
						// 清空记录的num
						axiosNum = 0;
					}
				}, TIMEOUT);
			}
		}, 600)
	}
	//loadingInstance = Loading.service(options);
	var token = window.localStorage.getItem('token')
	if(token) {
		// 在头部中加上Authorziation字段 内容为token
		config.headers.Authorization = `Bearer ${token}`;
	}
	// console.log(axiosNum, 'axiosNum-rq')
	return config;
}, error => {
	axiosNum--;
	// 关闭loading
	if(loadingInstance) {
		loadingInstance.close();
		// 清空记录的num
		axiosNum = 0;
	}
	// console.log(axiosNum, 'axiosNum-er1')
	// 对请求错误做些什么
	return Promise.reject(error);
});

// response 拦截
axios.interceptors.response.use(response => {
	// console.log(axiosNum, 'axiosNum-res')
	// 统计请求次数 对应响应次数 当数值为0的时候表示所有请求都已返回
	axiosNum--;
	// 关闭loading
	if(axiosNum <= 0) {
		if(loadingInstance) {
			loadingInstance.close();
			// 清空记录的num
			axiosNum = 0;
		}
	}
	// console.log(axiosNum, 'axiosNum-res1')
    // code和error处理
    let code = response.data.code;
    //let error = response.data.error;

    if(!code) {
		// Message({
	 //        message: "无返回数据",
	 //        type: 'error',
	 //        duration: 3000
	 //    });
	    return false;
    }
    // 消息中心通知
    var um = response.data.um;
	if(um && um.length > 0) {
		for(var i in um) {
			setTimeout(()=>{
				// Notification.success({
				// 	title: '消息',
			 //        message: um[i].message || '您有一条未读消息，请前往消息中心查看！',
			 //        offset: 200,
			 //        position: 'bottom-right'
				// });
			}, 500 * i)
			// 有notice通知 记录对应信息
			// store.commit('NOTICE_STATUS', true);
			// store.commit('NEED_RELOAD', true);
		}	
	}
    if(code === '00002') { // 失败错误码
    	// if(error == '20001') { // 缺少请求头
    	// 	Message({
		   //      message: response.data.msg || "缺少请求头",
		   //      type: 'error',
		   //      duration: 3000
		   //  });
    	// }else if(error == '20002') { // 缺少请求字段
    	// 	Message({
		   //      message: response.data.msg || "缺少请求字段",
		   //      type: 'error',
		   //      duration: 3000
		   //  });
    	// }else if(error == '20006') { // 缺少请求字段
    	// 	Message({
		   //      message: response.data.msg || "字段值不合法",
		   //      type: 'error',
		   //      duration: 3000
		   //  });
    	// }else if(error == '20007') { // 缺少请求字段
    	// 	Message({
		   //      message: response.data.msg || "操作失败",
		   //      type: 'error',
		   //      duration: 3000
		   //  });
    	// }else if(error == '20008') { // 缺少请求字段
    	// 	Message({
		   //      message: response.data.msg || "数量不合法",
		   //      type: 'error',
		   //      duration: 3000
		   //  });
    	// }else { // 缺少请求字段
    	// 	if(error) {
	    // 		Message({
			  //       message: response.data.msg || "异常报错",
			  //       type: 'error',
			  //       duration: 3000
			  //   });
    	// 	}
    	// }
    	return Promise.reject(response.data)
    }else if(code === '00003') { // 鉴权错误码
   //  	if(error == '30001') { // 认证失败
			// Message({
		 //        message: "认证失败",
		 //        type: 'error',
		 //        duration: 500,
		 //        onClose: () => {
		 //        	// 重定向地址
		 //        	var redirectUrl = response.data.data.redirect
		 //        	// console.log(redirectUrl, 'redirectUrl')
		 //        	window.location = redirectUrl
		 //        }
		 //    });
   //  	}else if(error == '30002') { // 权限不足
			// Message({
		 //        message: "权限不足",
		 //        type: 'error',
		 //        duration: 3000
		 //    });
   //  	}
    	return Promise.reject(response.data)
    }else if(code === '00004') { // 异常错误码
    	// Message({
	    //     message: response.data.msg || "异常错误",
	    //     type: 'error',
	    //     duration: 3000
	    // });
    }else {
		// Message({
	 //        message: response.data.msg || "成功",
	 //        type: 'success',
	 //        duration: 3000
	 //    });   
	    return response
    }
}, error => {
	axiosNum--;
    //关闭进度条
    if(loadingInstance) {
		loadingInstance.close();
    	// 清空记录的num
    	axiosNum = 0;
	}
	if(error === `Error: timeout of ${TIMEOUT}ms exceeded`) {
		// Message({
	 //        message: '接口响应超时',
	 //        type: 'error',
	 //        duration: 3000
	 //    });  
	    return Promise.reject(error) 
	}
	if(error.response) {
		let status = error.response.status;
		//let statusText = error.response.statusText;
		if(status === 500 || status === 404) {
	    	// Message({
		    //     message: `异常错误${status}：${statusText}`,
		    //     type: 'error',
		    //     duration: 2000
		    // });
		}
	}
	//console.log(axiosNum, 'axiosNum-er2')
    return Promise.reject(error.response)
});

export const post = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: qs.stringify(params),
    })
}

export const get = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        params: params,
    })
}
