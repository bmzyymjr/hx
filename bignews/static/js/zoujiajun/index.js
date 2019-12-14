//首页热点图
$.ajax({
    type: "get",
    url: "/api/v1/index/hotpic",
    success: function(data) {
        var html = template('hotfoucs', data)
        $('.focus_list').html(html)
    }
})

// 一周热门
$.ajax({
    type: "get",
    url: "/api/v1/index/rank",
    success: function(data) {
        if (data.code == 200) {
            var html = template('hotactpl', data)
            var sj = data.data.slice(3)
            var html1 = template('hotactpl2', sj)
            $('.hotList').html(html + html1)

        } else {
            alert(data.msg)
        }
    }
})

//最新资讯
$.ajax({
    type: 'get',
    url: "/api/v1/index/latest",
    success: function(data) {
        if (data.code == 200) {
            var html = template('zuixinzixuntpl', data)
            $('#zuixinzixun').html(html)
        } else {
            alert(data.msg)
        }
    }
})

// 最新评论
$.ajax({
    type: "get",
    url: "/api/v1/index/latest_comment",
    success: function(data) {
        if (data.code == 200) {
            var date1 = +new Date()
            data.data.forEach(item => {
                var date2 = +new Date(item.date)
                var lastTime = Math.floor((date1 - date2) / 1000 / 60 / 60 / 24 / 30)
                item.time = lastTime
            })
            var html = template('pingluntpl', data)
            $('.comment_list').html(html)
        }
    }
})

// 获取评论姓名的第一个字
function getfirstname(name) {
    return name.substr(0, 1)
}

//焦点关注
$.ajax({
    type: 'get',
    url: "/api/v1/index/attention",
    success: function(data) {
        var html = template('jiaodianguanzhu', data)
        $('.guanzhu_list').html(html)
    }
})

//分类
$.ajax({
    type: "get",
    url: "/api/v1/index/category",
    success: function(data) {
        var html = template('fenleixialatpl', data)
        $('.level_two').html(html);
        var leftsj = data.data.slice(0, data.data.length - 1)
        var fenlei = template('fenleitpl', leftsj)
        $('.left_menu').html(fenlei)
        var rightsj = data.data.slice(length - 1, data.data.length)

        var rfenlei = template('fenleitpl2', rightsj)
        $('.right_menu').html(rfenlei)
    }
})

//搜索
$('.search_btn').click(function() {
    var keywords = $('.search_txt').val()
    $.ajax({
        type: "get",
        url: "/api/v1/index/search",
        data: {
            key: keywords
        },
        success: function(data) {
            location.href = 'list.html?key=' + keywords
        }
    })
})