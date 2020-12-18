$(function() {
    var layer = layui.layer;
    var form = layui.form;
    // 初始化文章文章类别
    initCate()
    // 初始化富文本
    initEditor()
    function initCate () {
        $.ajax ({
            method:'GET',
            url:'/my/article/cates',
            success: function(res) {
                if(res.status !==0) {
                    return 
                }
                 var htmlStr = template('tpl-cate',res);
                   $('[name=cate_id]').html(htmlStr)
                // 注意动态生成的表单  需要通过layui 的form中一个方法重新渲染一下 
                form.render();
            }
        })
    }
    // 初始化裁剪区
      // 1. 初始化图片裁剪器
  var $image = $('#image')
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options);
//   给按钮绑定事件 来触发file按钮 
$('.choose').click(function() {
  $('#file').click();
})
// 在给表单绑定change事件 通过文件事件对象 拿到文件上传的资料
$('#file').on('change',function(e) {
    var file = e.target.files[0];
   if(file.length ==0) {
       return 
   }
   var newImgURL = URL.createObjectURL(file);
   $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
 
})
  var art_status = "已发布";
  $('.layui-btn-primary').on('click',function(e){
         art_status = '草稿';
         
  })
// 给表单绑定提交事件
        $('#form-pub').on('submit', function(e){
            e.preventDefault();
            // 实例化一个form对象  注意转换为DOM对象
            var fd = new FormData($(this)[0])
          /*   fd.title =$('[name=title]').val();
            fd.cate_id=$('[name=cate-Id').val();
            fd.content=$('[name=content]').val(); */
            //  
            fd.append('state',art_status)
            $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
              width: 400,
              height: 280
            })
          /*  fd.forEach(function(value,key) {
               console.log(key,value);
           }) */
            .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
              // 得到文件对象后，进行后续的操作
              fd.append('cover_img',blob);
                     publishArticle(fd);  
                    
            })
        })
        // 讲form中所有的内容追加到fd之后  进行ajax
       function publishArticle(fd) {
            $.ajax({
                method:'POST',
                url:'/my/article/add',
                data:fd,
                contentType:false,
                processData:false,
               success: function(res) {
                   console.log(res);
                   if(res.status !==0) {
                       return layer.msg('发布文章失败');
                   }
                   layer.msg('发布文章成功');
                    location.href = '../../aiticle/aiticle_list.html'
               }
            })
            
        } 
    
})