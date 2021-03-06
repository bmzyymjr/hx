var verifyCode = new GVerify("v_container");
document.getElementById("my_button").onclick = function() {
    var res = verifyCode.validate(document.getElementById("code_input").value);
    if (res) {
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
            success: function(response) {
                if (response.code == 200) {
                    window.localStorage.setItem('token', response.token)
                    location.href = 'index.html'
                } else {
                    alert(response.msg);
                }
            },
            error: function() {
                alert(response.msg);
            }
        })
        return false
    } else {
        alert("验证码错误");
    }
}