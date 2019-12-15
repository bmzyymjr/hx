var nav = 1
var articleId = 1
// 获取文章所有类别
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        var html = template('categorylistTpl', { data: response.data })
        $("#categorylist").html(html)
        $('#categories').html(html)
    }
})
// 获取文章热门排行
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function (response) {
        // console.log(response)
        response.data.forEach((item, index) => item.index = index)
        var html = template('hotlistTpl', { data: response.data })
        $('#hotlist').html(html)
    }
})
// 获取最新评论数据并展示
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function (response) {
        var date1 = +new Date()
        response.data.forEach(item => {
            var date2 = +new Date(item.date)
            var lastTime = Math.floor((date1 - date2) / 1000 / 60 / 60 / 24 / 30)
            item.time = lastTime
        })
        var html = template('lastedcommentTpl', { data: response.data })
        $('#lastedcomment').html(html)
    }
})
// 获得焦点关注的数据并展示
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/attention',
    success: function (response) {
        // console.log(response)
        var html = template('hotfocusTpl', { data: response.data })
        $('#hotfocus').html(html)
    }
})
// 获取分类列表内容并展示在页面上
if (location.search) {
    var par = location.search.substr(1).split('=')[0]
    var params = location.search.substr(1).split('=')[1]
    if (par == 'id') {
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/v1/index/search',
            data: { type: params },
            success: function (response) {
                nav = Math.ceil(response.data.totalCount / 6)
                var html = template('articlelistTpl', { data: response.data.data })
                $('#articlelist').html(html)
            }
        })
    } else if (par == 'key') {
        params = decodeURIComponent(params)
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/v1/index/search',
            data: { key: params },
            success: function (response) {
                if (response.data.data.length >= 1) {
                    nav = Math.ceil(response.data.totalCount / 6)
                    response.data.data[0].key = 1
                    // response.data.data[0].category = '搜索结果'
                    var html = template('articlelistTpl', { data: response.data.data })
                    $('#articlelist').html(html)
                }
            }
        })
    }
} else {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/search',
        data: { type: 1 },
        success: function (response) {
            nav = Math.ceil(response.data.totalCount / 6)
            var html = template('articlelistTpl', { data: response.data.data })
            $('#articlelist').html(html)
        }
    })
}

// 给搜索按钮添加点击事件
$('#searchbtn').on('click', function () {
    location.href = 'http://localhost:8080/list.html?key=' + $(this).siblings().val()
})

// 给全部分类注册点击事件，获取分类id
$('#categories').on('click', 'a', function () {
    var id = $(this).attr('data-id')
    articleId = id
    categoryId(id)
    location.href = 'http://localhost:8080/list.html?id=' + id
    return false
})
$('#categorylist').on('click', 'a', function () {
    var id = $(this).attr('data-id')
    articleId = id
    categoryId(id)
    location.href = 'http://localhost:8080/list.html?id=' + id
    return false
})
$(function () {
    setTimeout(function () {

        $("#pagination").pagination({
            currentPage: 1,
            totalPage: nav,
            callback: function (current) {
                // alert('ok!');
            }
        });
        var text = 1
        // 为分页数添加点击事件
        $('#pagination').on('click', 'a', function () {
            var current = $(this).text()
            if (current == '上一页') {
                text = text - 1
                categoryId(articleId, text)
            } else if (current == '下一页') {
                text = text - 0 + 1
                categoryId(articleId, text)
            } else if (current == '首页') {
                text = 1
                categoryId(articleId, text)
            } else if (current == '尾页') {
                text = nav
                categoryId(articleId, text)
            } else {
                text = $(this).text()
                categoryId(articleId, text)
            }
        })
    }, 1000)
});



function run() {
    $("#pagination").pagination({
        currentPage: 1,
        totalPage: nav,
        callback: function (current) {
            // alert('ok!');
        }
    });
}


// 封装根据分类id展示数据函数
function categoryId(ids, index) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/search',
        data: { type: ids, page: index },
        success: function (response) {
            nav = Math.ceil(response.data.totalCount / 6)
            var html = template('articlelistTpl', { data: response.data.data })
            $('#articlelist').html(html)
        }
    })
}