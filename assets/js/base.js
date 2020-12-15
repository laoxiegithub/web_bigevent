// 引入一个JQ函数  该函数主要用来收集或设置发起ajax时的配置参数
// options 用来接收发起ajax时的配置参数
$.ajaxPrefilter( function(options) {
    // 在真正的发起ajax请求之前 同一并接根路径 
 options.url = 'http://ajax.frontend.itheima.net'+options.url;
//  判断用户发起的ajax请求是否是包含my字符 包含的话说明需要配置header属性
 if(options.url.indexOf('/my/') !==-1) {
     options.header = {
        Authotization:localStorage.getItem('token') || ''
     }
    
 }
})