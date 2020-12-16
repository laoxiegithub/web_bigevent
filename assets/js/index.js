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
        },
      
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
// 实现用户点击退出按钮弹出询问框 并点击确定能够实现退出功能
$(".close").on('click',function(){
    layer.confirm('是否确认退出', {icon: 3, title:'提示'}, function(index){
    //   点击弹出层退出需要做的事情在这里填写
    // 1 需要情况token的值
    //2 需要跳转到login页面
      localStorage.removeItem('token');
      location.href = '../../home/login.html'  
        layer.close(index);
      });
})
})

