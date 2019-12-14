// 退出按钮单击事件
$('#logout').on('click', function() {
    var isConfirm = confirm('您真的要退出吗')
    if (isConfirm) {
        $.ajax({
            success: data => {
                location.href = 'login.html'
            },
            error: () => {
                alert('退出失败')
            }
        })
    }
})