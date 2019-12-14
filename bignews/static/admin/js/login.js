$('#loginForm').on('submit', function() {
    // 获取用户的信息
    var username = $('#username').val()
    var password = $('#password').val()
    if (username.trim().length == 0) {
        alert('请输入用户名')
        return
    }
    if (password.trim().length == 0) {
        alert('请输入密码')
        return
    }
    // 发送ajax请求
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/user/login',
        data: {
            username: username,
            password: password
        },
        // console.log(data);
        success: function(response) {
            console.log(response);
            if (response.code == 200) {
                console.log(response);
                window.localStorage.setItem('token', response.token)
                // location.href = 'index.html'
            } else {
                alert(response.msg);
            }
        },
        error: function() {
            alert(response.msg);
        }
    })
    return false
})