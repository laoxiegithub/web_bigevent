$(function(){
    console.log(location);
    // 先给a链接绑定事件 实现登录页面和注册页面的切换
    $("#reg-btn").on("click", function(){
        $(".re-form").show()
        $(".lg-form").hide()
    })
    $("#lg-btn").on("click", function(){
        $(".re-form").hide()
        $(".lg-form").show()
    })
    // 通过表单收集信息 发起ajax请求并判断表单内容书写规范
    var regExp = /^[a-zA-Z0-9]{6,16}$/
    // 获取layui中layer这个属性
    var layer = layui.layer;
    var baseUrl = 'http://ajax.frontend.itheima.net';
    // 注册页面
   $(".re-form").on("submit",function(e) {
            e.preventDefault();
            var val = $(this).serialize();
        $.ajax({
            method:'POST',
            url: baseUrl+'/api/reguser',
            data:val,
            success: function(res) {
                layer.msg(res.message+'!', {
                    icon: 1,
                    time: 1000 
                  })
                if(res.status !== 1) {
                    $("#lg-btn").click();
                } 
                
            }
        })
   })
//    登录页面
   $(".lg-form").submit( function(e) {
       e.preventDefault();
       var val = $(this).serialize();
        $.post(baseUrl+'/api/login', val, function(res){
            layer.msg(res.message+'!', {
                icon: 1,
                time: 1000 
              })
              if(res.status !==1) {
                locationStorage.setItem('token',res.token);
                location.href ="index.html";
              } 
        })
    })
    // 利用layui内置表单模块的表单验证 封装自己的一个规则的函数
    var layform = layui.form;
    console.log(layform);
    
    layform.verify({
        pwd:[/^[\S]{6,16}$/,'密码必须是6-16位,且不能出现空格'],
        repwd:function(value){
            var pwd = $('.re-form[name=password]').val();
            if(value !== pwd){
                return '两次密码不一致'
            }
        }
    }
    


    )
   })
