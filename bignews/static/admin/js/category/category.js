
/* -------殷明------- */
// 一、获取文章分类列表
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function(response){
        // console.log(response);
        var html = template('categoryTpl', {
            data: response.data
        })
        $('#categoryBox').html(html)
    }

})

// 二、添加文章分类
$('#model_add').click(function(){
    var formData = $('#categoryForm').serialize();
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/category/add',
        data: formData,
        success: function(response){
            // console.log(response);
            location.reload();
        }
    })
    $('#addModal').modal('hide');
})

// 三、编辑文章类别
// 将需要编辑的分类数据传递给编辑分类表单
$('#categoryBox').on('click','.edit', function(){
    $('#addModal .modal-title').html('修改分类名称');
    $('#addModal #model_add').html('修改');
    $('#addModal').modal('show');
    var id = $(this).attr('data-id');
    var name =$(this).parent().siblings("#className").text();
    var slug = $(this).parent().siblings("#slugName").text();
    $('#categoryForm').find('.one').val(name);
    $('#categoryForm').find('.two').val(slug);
    $('#model_add').attr('data-id', id);
  })
// 收集表单数据，根据接口发送请求，实现编辑功能
$('#model_add').click(function(){
    var id =  Number($(this).attr('data-id'));
    var name = $('#categoryForm').find('.one').val();
    var slug = $('#categoryForm').find('.two').val();
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/category/edit',
        data: {
            id: id,
            name: name,
            slug: slug
        },
        success: function(response){
            console.log(response);
            location.reload();
        }
    })
    $('#addModal').modal('hide');
})

// 四、删除分类
$('#categoryBox').on('click', '.delete', function(){
    var id = Number($(this).attr('data-id'));
    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/api/v1/admin/category/delete',
      data: {id: id},
      success: function(response){
        console.log(response);
      }
    })
    if(confirm('您确定要删除该分类吗')){
      $(this).parents('#category').remove();
    }
  })
