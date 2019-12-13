//获取统计数据

$.ajax({
        type: "get",
        url: "http://localhost:8080/api/v1/admin/data/info",
        success: function(data) {
            $('#wzzhongshu').html(data.totalArticle)
            $('#drxinzeng').html(data.dayArticle)
            $('#pinglunzonghsu').html(data.totalComment)
            $('#xinzengpinglun').html(data.dayComment)
        }
    })
    //月新增文章
$.ajax({
    type: "get",
    url: "/api/v1/admin/data/article",
    success: function(data) {
        var oChart = echarts.init(document.getElementById('curve_show'));
        var aList_all = data.date;

        let aCount = [];
        let aDate = [];
        for (var i = 0; i < aList_all.length; i++) {
            aCount.push(aList_all[i].count);
            aDate.push(aList_all[i].date);
        }

        var chartopt = {
            title: {
                text: '月新增文章数',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['新增文章'],
                top: '40'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            xAxis: [{
                name: '日',
                type: 'category',
                boundaryGap: false,
                data: aDate
            }],
            yAxis: [{
                name: '月新增文章数',
                type: 'value'
            }],
            series: [{
                name: '新增文章',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        },
                        color: '#f80'
                    },
                    lineStyle: {
                        color: '#f80'
                    }
                },
                data: aCount
            }],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,136,0,0.39)'
                    }, {
                        offset: .34,
                        color: 'rgba(255,180,0,0.25)'
                    }, {
                        offset: 1,
                        color: 'rgba(255,222,0,0.00)'
                    }])

                }
            },
            grid: {
                show: true,
                x: 50,
                x2: 50,
                y: 80,
                height: 220
            }
        };

        oChart.setOption(chartopt);
    }
})

// 访问类数比
$.ajax({
    type: "get",
    url: "/api/v1/admin/data/category",
    success: function(data) {
        console.log(data);
        var wenzhangfenlei = []
        var tongji = []
        for (var i = 0; i < data.date.length; i++) {
            wenzhangfenlei.push(data.date[i].name)
            tongji.push({ value: data.date[i].articles, name: data.date[i].name })
        }
        var oPie = echarts.init(document.getElementById('pie_show'));
        var oPieopt = {
            title: {
                top: 10,
                text: '分类文章数量比',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565'],
            legend: {
                x: 'center',
                top: 65,
                data: wenzhangfenlei
            },
            toolbox: {
                show: true,
                x: 'center',
                top: 35,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['50%', '65%'],
                data: tongji
            }]
        };
        oPie.setOption(oPieopt);
    }
})

//获取随机颜色方法
function getRandomColor() {
    var colorArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var color = "";  
    for (var i = 0; i < 6; i++) {         color += colorArr[Math.floor(Math.random() * 15)];       }      
    return "#" + color;    
}   

// //获取文章访问量
$.ajax({
    type: "get",
    url: "/api/v1/admin/data/visit",
    success: function(data) {
        console.log(data);
        var obj = data.data

        //声明一个空数据,用于存放遍历出来的日期
        var date = []

        //按照插件格式创建一个对象
        var shuju = [{
            name: '当日访问量',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    },
                    color: getRandomColor() //获取随机色
                }
            }
        }]

        //声明一个空数组,存放遍历出来的访问量
        var fangwen = []

        //遍历数组
        for (var k in obj) {

            // 将遍历出的日期加到date中
            date.unshift(k)

            //将遍历出来的访问量加到fangwen中
            fangwen.push(obj[k])
        }

        //将访问量数组,追加到差价格式对象中
        shuju[0].data = fangwen
        var oColumn = window.echarts.init(document.getElementById('column_show'));
        var oColumnopt = {
            title: {
                text: '文章访问量',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['当日访问量'],
                top: '40'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                data: date
            }],
            yAxis: [{
                name: '访问量',
                type: 'value'
            }],
            series: shuju,
            grid: {
                show: true,
                x: 50,
                x2: 30,
                y: 80,
                height: 260
            },
            dataZoom: [ //给x轴设置滚动条
                {
                    start: 0, //默认为0
                    end: 100 - 1000 / 31, //默认为100
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    handleSize: 0, //滑动条的 左右2个滑动条的大小
                    height: 8, //组件高度
                    left: 45, //左边的距离
                    right: 50, //右边的距离
                    bottom: 26, //右边的距离
                    handleColor: '#ddd', //h滑动图标的颜色
                    handleStyle: {
                        borderColor: "#cacaca",
                        borderWidth: "1",
                        shadowBlur: 2,
                        background: "#ddd",
                        shadowColor: "#ddd",
                    }
                }
            ]
        };
        oColumn.setOption(oColumnopt)

    }
})