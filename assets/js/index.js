$(function() {
    getUserInfo()
    // 封装一个获取用户信息的函数
function getUserInfo () {
    $.ajax ({
        method:'GET',
        url:'/my/userinfo',
        headers:{
            Authorization:localStorage.getItem('token')|| ''
        },
        success:function(res) {
            if(res.status ==1 ) {
                return layui.layer.msg('获取用户信息失败')
            }
         render(res.data)
        }
    })
}
// 判断用户是否有图像
function render (user) {
    var name = user.nickname||user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp'+name);
if(user.user_pic !==null) {
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
}else {
    var first = name[0].toUpperCase()
    $('.layui-nav-img').hide()
    $('.text-avatar').show().html(first)
   
}
}
})

