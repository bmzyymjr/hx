$('#exampleInputFile').on('change', function() {
    // 先保存我们选中的文件
    var file = this.files[0];
    // 根据文件生成一个url
    var imgURL = URL.createObjectURL(file);
    // 设置img标签的src属性
    $('#preview').prop('src', imgURL);
});
// 修改功能
$('#userForm').on('submit', function() {
        var formData = new FormData(this);
        // console.log(formData);
        $.ajax({
                type: 'post',
                url: 'http://localhost:8080/api/v1/admin/user/edit',
                data: formData,
                processData: false,
                contentType: false,
                success: function(result) {
                    alert('信息修改成功');
                    top.location.reload()
                }
            })
            // alert('ok');
        return false;
    })
    // 发送ajax请求,获取用户信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/detail',
    success: function(response) {
        // 把用户信息显示在表单中
        $('#userForm input[name="username"]').val(response.data.username);
        $('#userForm input[name="nickname"]').val(response.data.nickname);
        $('#userForm input[name="email"]').val(response.data.email);
        // img标签设置src
        $('#preview').attr('src', response.data.userPic);
        $('#userForm input[name="password"]').val(response.data.password);
    },
})