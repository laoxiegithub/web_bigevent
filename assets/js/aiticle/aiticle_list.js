$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    // 将获取文章列表的配置对象放在一个对象上
    var prams = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
      }
    //定义一个初始化文章列表的函数q
    initAiticleList();
    initCate();
     function initAiticleList() {
        $.ajax ({
            type:'GET',
            url:'/my/article/list',
            data:prams,
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg('获取文章列表失败')
                }
              var htmlStr = template('tpl-aiticleList',res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
    
            }
        })
    } 
// 利用template过滤器 定义一个过滤器函数 用来将时间格式化一下
template.defaults.imports.initDate = function(value) {
    var time = new Date(value);
    var y = time.getFullYear();
    var m =addzero(time.getMonth()+1);
    var d= addzero(time.getDate());
    var h =addzero(time.getHours());
    var mm =addzero(time.getMinutes());
    var s = addzero(time.getSeconds());
    return  y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
}
// 定义一个个位数补零函数
function addzero(n) {
    return n>9 ? n:'0'+n;
}
// 头部分类筛选区
 function initCate() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res) {
              var htmlStr = template('tpl-cate',res);
               $('.cate-name').html(htmlStr);
               form.render();
            }
        })
 }
//  给筛选表单绑定提交事件
  $('.form-filter').on('submit',function(e) {
    e.preventDefault();
     prams.cate_id = $('.cate-name').val();
    prams.state =$('.state').val();
    console.log( prams.cate_id, prams.state);
    initAiticleList(); 
  })
//   实现删除功能  因为删除按钮是利用template动态生成的 只能使用事件委托
 $('tbody').on('click', '.btn-delete', function() {
//  给按钮绑定好事件后  需要添加一个自定义属性用于获取该按钮对应的文章id号 
     var id = $(this).attr('data-index');
    //  解决删除BUG（如果每一页全部删除之后 页面不会自己往前跳转 这是因为删除的顺间还没有监听到页码）
    // 通过获取按钮的个数来判断文章个数
    var btnLength = $('.btn-delete').length;
     layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            method:'GET',
            url:'/my/article/delete/'+id,
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg('删除失败')
                }
              if(btnLength==1) {
                  prams.pagenum = prams.pagenum-1; 
              }
                initAiticleList();        
            }
        })
        layer.close(index);
       
       
      });
 })
  // 封装一个渲染分页的数据函数
  function renderPage(total) {
     //执行一个laypage实例
   laypage.render({
    elem: 'test' ,//注意，这里的 test1 是 ID，不用加 # 号
    count:total,
    layout:['count','limit','prev', 'page', 'next','skip'],
    curr:prams.pagenum,
    limit:prams.pagesize,
    limits:[2,3,5,10],
    jump:function(obj, first) {
         if(!first) {
            prams.pagenum=obj.curr;
            prams.pagesize = obj.limit;
            initAiticleList(); 
        } 
    }
  });

  }
  
})