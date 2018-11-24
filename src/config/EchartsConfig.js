export const pieOptions = {
	tooltip: {
	  trigger: 'item',
	  formatter: "{a} <br/>{b}: {c} ({d}%)"
	},
	legend: {
	  orient: 'vertical',
	  x: 'left',
	  data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
	},
	series: [
	  {
	    name:'访问来源',
	    type:'pie',
	    radius: ['100%', '70%'],
	    avoidLabelOverlap: false,
	    label: {
	      normal: {
	        show: false,
	        position: 'center'
	      },
	      emphasis: {
	        show: true,
	        textStyle: {
	          fontSize: '30',
	          fontWeight: 'bold'
	        }
	      }
	    },
	    labelLine: {
	      normal: {
	        show: false
	      }
	    },
	    data:[
	      {value:335, name:'直接访问'},
	      {value:310, name:'邮件营销'},
	      {value:234, name:'联盟广告'},
	      {value:135, name:'视频广告'},
	      {value:1548, name:'搜索引擎'}
	    ]
	  }
	]
}

export const lineOptions = {
	title: {
	    text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
}

export const radarOptions = {
	title: {
        text: '浏览器占比变化',
        subtext: '纯属虚构',
        top: 10,
        left: 10
    },
    tooltip: {
        trigger: 'item',
        backgroundColor : 'rgba(0,0,250,0.2)'
    },
    legend: {
        type: 'scroll',
        bottom: 10,
        data: (function (){
            var list = [];
            for (var i = 1; i <=28; i++) {
                list.push(i + 2000 + '');
            }
            return list;
        })()
    },
    visualMap: {
        top: 'middle',
        right: 10,
        color: ['red', 'yellow'],
        calculable: true
    },
    radar: {
       indicator : [
           { text: 'IE8-', max: 400},
           { text: 'IE9+', max: 400},
           { text: 'Safari', max: 400},
           { text: 'Firefox', max: 400},
           { text: 'Chrome', max: 400}
        ]
    },
    series : (function (){
        var series = [];
        for (var i = 1; i <= 28; i++) {
            series.push({
                name:'浏览器（数据纯属虚构）',
                type: 'radar',
                symbol: 'none',
                lineStyle: {
                    width: 1
                },
                emphasis: {
                    areaStyle: {
                        color: 'rgba(0,250,0,0.3)'
                    }
                },
                data:[
                  {
                    value:[
                        (40 - i) * 10,
                        (38 - i) * 4 + 60,
                        i * 5 + 10,
                        i * 9,
                        i * i /2
                    ],
                    name: i + 2000 + ''
                  }
                ]
            });
        }
        return series;
    })()
}