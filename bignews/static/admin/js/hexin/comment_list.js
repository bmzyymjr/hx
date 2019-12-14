var index = 1
// 文章评论搜索并展示在页面上
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    success: function (response) {
        // console.log(response)
        response.data.page = index
        var html = template('comment-listTpl', { data: response.data.data })
        $('#commentBox').html(html)
        var page = template('listsTpl', response.data)
        // console.log(response.data)
        $('#lists').html(page)
    }
})

// 为分页数添加点击事件
$('#lists').on('click', '.pageclick', function () {
    index = Number($(this).attr('data-index'))
    // console.log(index)
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: { page: index, perpage: '' },
        success: function (response) {
            // console.log(response)
            response.data.page = index
            var html = template('comment-listTpl', { data: response.data.data })
            $('#commentBox').html(html)
            var page = template('listsTpl', response.data)
            $('#lists').html(page)
        }
    })
})
// 给批准或拒绝按钮注册点击事件
$('#commentBox').on('click', '.edit', function () {
    var id = Number($(this).attr('data-id'))
    var state = $(this).attr('data-state')
    if (state == '已拒绝') {
        // 评论审核通过
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/pass',
            data: { id: id },
            success: function (response) {
                // console.log(response)
                $.ajax({
                    type: 'get',
                    url: 'http://localhost:8080/api/v1/admin/comment/search',
                    data: { page: index, perpage: '' },
                    success: function (response) {
                        // console.log(response)
                        response.data.page = index
                        var html = template('comment-listTpl', { data: response.data.data })
                        $('#commentBox').html(html)
                    }
                })
                return false
            }
        })
    } else {
        // 评论审核不通过
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/reject',
            data: { id: id },
            success: function (response) {
                $.ajax({
                    type: 'get',
                    url: 'http://localhost:8080/api/v1/admin/comment/search',
                    data: { page: index, perpage: '' },
                    success: function (response) {
                        // console.log(response)
                        response.data.page = index
                        var html = template('comment-listTpl', { data: response.data.data })
                        $('#commentBox').html(html)
                    }
                })
                return false
            }
        })
    }
})
// 删除评论
$('#commentBox').on('click', '.delete', function () {
    var id = Number($(this).attr('data-id'))
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/comment/delete',
        data: { id: id },
        success: function (response) {
            $.ajax({
                type: 'get',
                url: 'http://localhost:8080/api/v1/admin/comment/search',
                data: { page: index, perpage: '' },
                success: function (response) {
                    // console.log(response)
                    response.data.page = index
                    var html = template('comment-listTpl', { data: response.data.data })
                    $('#commentBox').html(html)
                }
            })
        }
    })
})
// 实现分页数据展示
function changePage(data) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: { page: data, perpage: '' },
        success: function (response) {
            index = data
            response.data.page = index
            // console.log(data)
            var html = template('comment-listTpl', { data: response.data.data })
            $('#commentBox').html(html)
            var page = template('listsTpl', response.data)
            // console.log(response.data)
            $('#lists').html(page)
        }
    })
}