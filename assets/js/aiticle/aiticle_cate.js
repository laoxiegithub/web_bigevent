$(function() {
    // 获取layui的layer属性
    var layer = layui.layer;
    var form = layui.form;
    // 封装一个init初始化文章类别的函数
    initAiticleCate();
    function initAiticleCate () {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res) {
                console.log(res);
                var htmlStr = template('tmp-initCase',res);
                  $('tbody').html(htmlStr);  
            }
        })
    }
    // 给添加类别绑定点击事件
    var indexAdd =null;
    $('.btn-addCate').click(function() {
       indexAdd = layer.open({
            type:1,
            area: ['500px', '260px'],
            title: '增加文章类别',
            content: $('#tmp-addCate').html()
          });      
    })
// 动态生成的元素需要通过事件委托方式来进行绑定
 $('body').on('submit', '#form-add',function(e) {
    e.preventDefault();
 $.ajax({
    method:'POST',
     url:'/my/article/addcates',
     data:$(this).serialize(),
     success:function(res) {
         console.log(res);
         if(res.status !==0) {
             return layer.msg('新增文章类别失败');
         }
         initAiticleCate();
         layer.msg('新增文章类别成功');
         layer.close(indexAdd)   
     }
 })
}) 
var indexEdit = null;
//给编辑按钮绑定点击事件
$('tbody').on('click', '.btn-edit',function(){
        var id = $(this).attr('data-id');
        indexEdit = layer.open({
            type:1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#tmp-edit').html()
          });  
    // 打开弹出层后渲染当前的文章信息
    $.ajax({
        method:'GET',
        url:'/my/article/cates/'+id,
        success:function(res){
            if(res.status !==0) {
                return layer.msg('获取文章分类失败');
            }
            layer.msg('获取文章分类成功');
            form.val('form-edit', res.data)
        }
    })
})
// 利用JQ事件委托给表单绑定submit提交事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0) {
                    return layer.msg('修改失败');
                }
                layer.msg('修改成功');
                initAiticleCate();
                layer.close(indexEdit)
            }
        })
    })
    // 删除功能
    $('tbody').on('click','.btn-delete',function(){
       var id = $(this).attr('data-id');
layer.confirm('是否确定删除?',
{icon: 3, title:'提示'}, 
function(index){
    $.ajax({
        method:'GET',
        url:'/my/article/deletecate/'+id,
        success:function(res) {
            if(res.status !==0) {
                return layer.msg('删除失败');
            }
            layer.close(index);
            layer.msg('删除成功');
            initAiticleCate();
        }
    }) 
  })
    }) 
})