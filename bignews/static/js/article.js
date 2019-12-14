// 获取热门排行数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function(response){
        // console.log(response);
        var html = template('hotTpl', {
            data: response.data
        })
        $('#hotBox').html(html);
    }
})

// 获取最新评论信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function(response){
        // console.log(response);
        var html = template('newCommentTpl', {
            data: response.data
        })
        $('#newCommentBox').html(html)
    }
})

// 焦点关注内容
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/attention',
    success: function(response){
        // console.log(response);
        var html = template('focusTpl', {
            data: response.data
        })
        $('#focusBox').html(html);
    }
})