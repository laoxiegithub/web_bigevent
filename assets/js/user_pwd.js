$(function() {
    var form = layui.form;
    form.verify({
        newPwd:function(value) {
            if(value ==  $('.password').val()){
                return '新旧密码不能一样'
            }
        },
        pwd: [/^[\S]{6,16}$/,'密码必须是6-16位'],
        repwd: function(value){
            if(value !== $('.newPassword').val()){
                return '两次密码不一致';
            }
        }
    })
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax ({
            method:'POST',
            url:'/my/updatepwd',
            data:{
                oldPwd: $('.password').val(),
                newPwd: $('.newPassword').val()
            },
            success: function(res) {
                console.log(res);
                if(res.status==1) {
                    layui.layer.msg('原始密码错误')
                } else{
                    $('.layui-form')[0].reset();//?
                    layui.layer.msg('原始密码成功');
                }
            }
        })
    })
})