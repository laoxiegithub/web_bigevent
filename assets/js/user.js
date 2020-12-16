  $ (function() {
    var form = layui.form;
      form.verify(
          {nickname:function(value) {
              var flag =  /[^0-9]{1,6}/.test(value)
        if(!flag){
           return "昵称长度必须是1-6位的非数字！"
      }
     }
    })
initUserInfo();
     function initUserInfo () {
         $.ajax ({
             method:'GET',
            url:'/my/userinfo',
             success: function(res) {
               if(res.status !==0) {
                   return layui.layer.msg('获取用户信息失败');
               }
            //    layui里form有个快速渲染表单的方法 参数1表示需要渲染的表单 参数2位数据 会自己将数据对应的名称渲染到对应的表单
            // 要配合一个属性 lay-filter
               form.val('formUserInfo',res.data);  
              } 
            })
     } 
    $('.layui-form').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:  $('.layui-form').serialize(),
            success:function(res) {
                // 页面userInfo.html相当于是index.html 的子页面  此时如果想调用父页面的方法  即可以使用window.parent.方法()
                window.parent.getUserInfo();
                layui.layer.msg('更新用户信息成功');
                initUserInfo();
            }
        })
    })
    $('#reset').on('click',function(e){
        e.preventDefault()
        initUserInfo();
    }) 
 })