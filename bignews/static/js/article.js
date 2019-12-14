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

// 文章详情
$.ajax({
    url: 'http://localhost:8080/api/v1/index/article',
    type: 'get',
    data: {id: location.search.substr(4)},
    success: function(response){
        console.log(response);
        var html = template('detailTpl', {
            data: response.data
        })
        $('#articleDetail').html(html);
        var id = response.data.id;
        $('#pushComment').attr('data-id', id);
        $('#contentList').attr('data-id', id);
    }
})
// 发布评论功能
$('#newComment').on('submit',function(){
    var id = $('#pushComment').attr('data-id');
    var author =$('#author').val()
    var content =$('#content').val()
    
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/index/post_comment',
        data: {
            author:author,
            content:content,
            articleId:id
        },
        success: function(){
            alert(123)
            
        }
    })
    return false;
})

// 评论列表展示
var id = location.search.substr(4);
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/get_comment',
    data: {
        articleId: id
    },
    success: function(response){
        console.log(response);
        var html = template('newCommentTpl1', {
            data: response.data
        })
        $('#contentBox').html(html);
    }
})
//分类
$.ajax({
    type: "get",
    url: "/api/v1/index/category",
    success: function(data) {
        console.log(data);
        var html = template('fenleixialatpl', data)
        $('.level_two').html(html);
        var leftsj = data.data.slice(0, data.data.length - 1)
        var fenlei = template('fenleitpl', leftsj)
        $('.left_menu').html(fenlei)
        var rightsj = data.data.slice(length - 1, data.data.length)
        console.log(rightsj);

        var rfenlei = template('fenleitpl2', rightsj)
        console.log(rfenlei);
        $('.right_menu').html(rfenlei)
    }
})


