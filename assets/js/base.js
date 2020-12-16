$.ajaxPrefilter( function(options) {
    // 在真正的发起ajax请求之前 同一并接根路径 
 options.url = 'http://ajax.frontend.itheima.net'+options.url;

//  判断用户发起的ajax请求是否是包含my字符 包含的话说明需要配置header属性
 if(options.url.indexOf('/my/') !==-1) {
     options.headers = {
        Authorization:localStorage.getItem('token')||''
     }  
     options.complete =function(res){
            if(res.responseJSON.status==1&& res.responseJSON.message=="身份认证失败！") {
                localStorage.removeItem('token');
      location.href = 'login.html'
            }
    }   
 }   
})