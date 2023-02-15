<template>
    <div class="order-map">
        <vue-echarts :options="options"></vue-echarts>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
export default {
    name: 'OrderMap',
    setup () {
        const options = ref({})

        const update = () => {
            fetch('http://www.youbaobao.xyz/datav-res/datav/map.json')
                .then(res => res.json())
                .then(data => {
                    /* eslint-disable */
                    // 城市起点的地理坐标
                    const geoGpsMap = {
                        '1': [125.8154, 44.2584],
                        '2': [125.8154, 44.2584],
                        '3': [117.1582, 36.8701],
                        '4': [117.1582, 36.8701],
                        '5': [103.9526, 30.7617],
                        '6': [103.9526, 30.7617]
                    }
                    // 城市重点对应的地理坐标
                    const geoCoordMap = {
                        '江苏': [118.8062, 31.9208],
                        '黑龙江': [127.9688, 45.368],
                        '内蒙古': [110.3467, 41.4899],
                        '吉林': [125.8154, 44.2584],
                        '北京市': [116.4551, 40.2539],
                        '辽宁': [123.1238, 42.1216],
                        '河北': [114.4995, 38.1006],
                        '天津': [117.4219, 39.4189],
                        '山西': [112.3352, 37.9413],
                        '陕西': [109.1162, 34.2004],
                        '甘肃': [103.5901, 36.3043],
                        '宁夏': [106.3586, 38.1775],
                        '青海': [101.4038, 36.8207],
                        '新疆': [87.9236, 43.5883],
                        '四川': [103.9526, 30.7617],
                        '重庆': [108.384366, 30.439702],
                        '山东': [117.1582, 36.8701],
                        '河南': [113.4668, 34.6234],
                        '安徽': [117.29, 32.0581],
                        '湖北': [114.3896, 30.6628],
                        '浙江': [119.5313, 29.8773],
                        '福建': [119.4543, 25.9222],
                        '江西': [116.0046, 28.6633],
                        '湖南': [113.0823, 28.2568],
                        '贵州': [106.6992, 26.7682],
                        '云南': [102.9199, 25.4663],
                        '广东': [113.12244, 23.009505],
                        '广西': [108.479, 23.1152],
                        '海南': [110.3893, 19.8516],
                        '上海': [121.4648, 31.2891]
                    }
                    const d1 = {
                        '江苏': 10041,
                        '黑龙江': 4093,
                        '内蒙古': 1157,
                        '吉林': 4903,
                        '北京市': 2667,
                        '辽宁': 8331,
                        '河北': 23727,
                        '天津': 681,
                        '山西': 5352,
                        '陕西': 38,
                        '甘肃': 77,
                        '宁夏': 65,
                        '青海': 10,
                        '新疆': 193,
                        '四川': 309,
                        '重庆': 77,
                        '山东': 21666,
                        '河南': 15717,
                        '安徽': 15671,
                        '湖北': 3714,
                        '浙江': 3141,
                        '福建': 955,
                        '江西': 4978,
                        '湖南': 778,
                        '贵州': 33,
                        '云南': 149,
                        '广东': 1124,
                        '广西': 125,
                        '海南': 7,
                        '上海': 2155

                    }
                    const d2 = {
                        '江苏': 0,
                        '黑龙江': 0,
                        '内蒙古': 0,
                        '吉林': 0,
                        '北京市': 0,
                        '辽宁': 0,
                        '河北': 0,
                        '天津': 0,
                        '山西': 0,
                        '陕西': 0,
                        '甘肃': 0,
                        '宁夏': 0,
                        '青海': 0,
                        '新疆': 0,
                        '四川': 0,
                        '重庆': 0,
                        '山东': 0,
                        '河南': 0,
                        '安徽': 0,
                        '湖北': 0,
                        '浙江': 0,
                        '福建': 0,
                        '江西': 0,
                        '湖南': 0,
                        '贵州': 0,
                        '云南': 0,
                        '广东': 0,
                        '广西': 0,
                        '海南': 0,
                        '上海': 0

                    }
                    const d3 = {
                        '江苏': 11788,
                        '黑龙江': 1944,
                        '内蒙古': 2954,
                        '吉林': 3482,
                        '北京市': 1808,
                        '辽宁': 5488,
                        '河北': 27035,
                        '天津': 2270,
                        '山西': 13623,
                        '陕西': 4221,
                        '甘肃': 754,
                        '宁夏': 1783,
                        '青海': 91,
                        '新疆': 1907,
                        '四川': 4905,
                        '重庆': 1420,
                        '山东': 39781,
                        '河南': 16154,
                        '安徽': 7914,
                        '湖北': 6802,
                        '浙江': 5812,
                        '福建': 3345,
                        '江西': 4996,
                        '湖南': 5627,
                        '贵州': 1504,
                        '云南': 2725,
                        '广东': 6339,
                        '广西': 1009,
                        '海南': 0,
                        '上海': 1988

                    }
                    const d4 = {
                        '江苏': 0,
                        '黑龙江': 0,
                        '内蒙古': 0,
                        '吉林': 0,
                        '北京市': 0,
                        '辽宁': 0,
                        '河北': 0,
                        '天津': 0,
                        '山西': 0,
                        '陕西': 0,
                        '甘肃': 0,
                        '宁夏': 0,
                        '青海': 0,
                        '新疆': 0,
                        '四川': 0,
                        '重庆': 0,
                        '山东': 0,
                        '河南': 0,
                        '安徽': 0,
                        '湖北': 0,
                        '浙江': 0,
                        '福建': 0,
                        '江西': 0,
                        '湖南': 0,
                        '贵州': 0,
                        '云南': 0,
                        '广东': 0,
                        '广西': 0,
                        '海南': 0,
                        '上海': 0
                    }
                    const d5 = {
                        '江苏': 159,
                        '黑龙江': 5,
                        '内蒙古': 54,
                        '吉林': 10,
                        '北京市': 0,
                        '辽宁': 0,
                        '河北': 1679,
                        '天津': 1,
                        '山西': 2698,
                        '陕西': 1744,
                        '甘肃': 362,
                        '宁夏': 429,
                        '青海': 122,
                        '新疆': 731,
                        '四川': 3925,
                        '重庆': 1480,
                        '山东': 79,
                        '河南': 1017,
                        '安徽': 208,
                        '湖北': 1209,
                        '浙江': 1418,
                        '福建': 1237,
                        '江西': 1004,
                        '湖南': 1511,
                        '贵州': 345,
                        '云南': 1429,
                        '广东': 2242,
                        '广西': 2271,
                        '海南': 59,
                        '上海': 8

                    }
                    const d6 = {
                        '江苏': 0,
                        '黑龙江': 0,
                        '内蒙古': 0,
                        '吉林': 0,
                        '北京市': 0,
                        '辽宁': 0,
                        '河北': 0,
                        '天津': 0,
                        '山西': 0,
                        '陕西': 0,
                        '甘肃': 0,
                        '宁夏': 0,
                        '青海': 0,
                        '新疆': 0,
                        '四川': 0,
                        '重庆': 0,
                        '山东': 0,
                        '河南': 0,
                        '安徽': 0,
                        '湖北': 0,
                        '浙江': 0,
                        '福建': 0,
                        '江西': 0,
                        '湖南': 0,
                        '贵州': 0,
                        '云南': 0,
                        '广东': 0,
                        '广西': 0,
                        '海南': 0,
                        '上海': 0
                    }
                    // 调色盘
                    const colors = [
                        ['#1DE9B6', '#1DE9B6', '#FFDB5C', '#FFDB5C', '#04B9FF', '#04B9FF'],
                        ['#1DE9B6', '#F46E36', '#04B9FF', '#5DBD32', '#FFC809', '#FB95D5', '#BDA29A', '#6E7074', '#546570', '#C4CCD3'],
                        ['#37A2DA', '#67E0E3', '#32C5E9', '#9FE6B8', '#FFDB5C', '#FF9F7F', '#FB7293', '#E062AE', '#E690D1', '#E7BCF3', '#9D96F5', '#8378EA', '#8378EA'],
                        ['#DD6B66', '#759AA0', '#E69D87', '#8DC1A9', '#EA7E53', '#EEDD78', '#73A373', '#73B9BC', '#7289AB', '#91CA8C', '#F49F42']
                    ]
                    const colorIndex = 1
                    const year = ['北京', '上海', '深圳', '广州', '杭州', '南京']
                    const mapData = [
                        [],
                        [],
                        [],
                        [],
                        [],
                        []
                    ]
                    /* 柱子Y名称 */
                    // 拼接数据结构
                    const categoryData = []
                    const barData = []
                    for (var key in geoCoordMap) {
                        mapData[0].push({
                            'year': '长春',
                            'name': key,
                            'value': d1[key] / 100,
                            'value1': d1[key] / 100
                        })
                        mapData[1].push({
                            'year': '长春',
                            'name': key,
                            'value': d1[key] / 100,
                            'value1': d2[key] / 100
                        })
                        mapData[2].push({
                            'year': '青岛',
                            'name': key,
                            'value': d3[key] / 100,
                            'value1': d3[key] / 100
                        })
                        mapData[3].push({
                            'year': '青岛',
                            'name': key,
                            'value': d3[key] / 100,
                            'value1': d4[key] / 100
                        })
                        mapData[4].push({
                            'year': '成都',
                            'name': key,
                            'value': d5[key] / 100,
                            'value1': d5[key] / 100
                        })
                        mapData[5].push({
                            'year': '成都',
                            'name': key,
                            'value': d5[key] / 100,
                            'value1': d6[key] / 100
                        })
                    }
                    for (var i = 0; i < mapData.length; i++) {
                        mapData[i].sort(function sortNumber (a, b) {
                            return a.value - b.value
                        })
                        barData.push([])
                        categoryData.push([])
                        for (var j = 0; j < mapData[i].length; j++) {
                            barData[i].push(mapData[i][j].value1)
                            categoryData[i].push(mapData[i][j].name)
                        }
                    }
                    const convertData = function (data) {
                        var res = []
                        for (var i = 0; i < data.length; i++) {
                            var geoCoord = geoCoordMap[data[i].name]
                            if (geoCoord) {
                                res.push({
                                    name: data[i].name,
                                    value: geoCoord.concat(data[i].value)
                                })
                            }
                        }
                        return res
                    }
                    const convertToLineData = function (data, gps) {
                        const res = []
                        for (let i = 0; i < data.length; i++) {
                            var dataItem = data[i]
                            var toCoord = geoCoordMap[dataItem.name]
                            var fromCoord = gps // 郑州
                            //  var toCoord = geoGps[Math.random()*3];
                            if (fromCoord && toCoord) {
                                res.push({
                                    coords: [fromCoord, toCoord]
                                })
                            }
                        }
                        return res
                    }
                    console.log(mapData, barData, categoryData);
                    echarts.registerMap('china', data)
                    const _options = {
                        timeline: {
                            data: year,
                            axisType: 'category',
                            autoPlay: true,
                            playInterval: 2000,
                            left: '10%',
                            right: '5%',
                            bottom: '3%',
                            width: '80%',
                            label: {
                                color: '#ddd',
                            },
                            emphasis: {
                                label: {
                                    color: '#fff'
                                },
                                controlStyle: {
                                    color: '#aaa',
                                    borderColor: '#aaa'
                                }
                            },
                            symbolSize: 10,
                            lineStyle: {
                                color: '#555'
                            },
                            checkpointStyle: {
                                borderColor: '#777',
                                borderWidth: 2
                            },
                            controlStyle: {
                                color: '#666',
                                borderColor: '#666',
                            }
                        },
                        baseOption: {
                            backgroundColor: 'rgb(48, 48, 48)',
                            grid: {
                                top: '20%',
                                bottom: '20%',
                                right: '5%',
                                width: '20%'
                            },
                            geo: {
                                map: 'china',
                                zoom: 1.1,
                                roam: true,
                                scaleLimit: {
                                    min: 0.5,
                                    max: 3
                                },
                                center: [113.83531246, 34.0267395887],
                                itemStyle: {
                                    borderColor: 'rgba(147,235,240,1)',
                                    borderWidth: 2,
                                    areaColor: {
                                        type: 'radial',
                                        x: 0.5,
                                        y: 0.5,
                                        r: 0.8,
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                        }],

                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(128,217,248,1)',
                                    shadowOffsetX: -2,
                                    shadowOffsetY: 2,
                                    shadowBlur: 10,
                                },
                                emphasis: {
                                    itemStyle: {
                                        areaColor: '#389BB7',
                                        borderWidth: 0
                                    },
                                    label: {
                                        show: false
                                    }
                                }
                            }
                        },
                        options: []

                    }
                    for (let i = 0; i < year.length; i++) {
                        _options.options.push({
                            title: [
                                {
                                    text: '慕课外卖销售大盘',
                                    subtext: '数据由慕课外卖大数据提供',
                                    left: '2%',
                                    top: '2%',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 35,
                                        fontWeight: 700
                                    }
                                },
                                {
                                    id: 'statistic',
                                    text: `${year[i]}销售额统计情况`,
                                    left: '75%',
                                    top: '8%',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 25
                                    }
                                }
                            ],
                            tooltip: {
                                show: true,
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow',
                                    shadowColor: 'rgba(150,150,150,.1)'
                                },
                                backgroundColor: 'rgba(150,150,150,.1)',
                                textStyle: {
                                    color: '#fff'
                                },
                                borderColor: 'rgba(150,150,150,.1)'

                            },
                            xAxis: {
                                type: 'value',
                                position: 'top',
                                min: 0,
                                boundaryGap: false,
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                }
                            },
                            yAxis: {
                                type: 'category',
                                data: categoryData[i],
                                axisLine: {
                                    lineStyle: {
                                        color: '#ddd'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    interval: 0,
                                    color: '#ddd'
                                }
                            },
                            series: [
                                {
                                    type: 'bar',
                                    itemStyle: {
                                        color: colors[colorIndex][i]
                                    },
                                    data: barData[i]
                                },
                                {
                                    type: 'effectScatter',
                                    coordinateSystem: 'geo',
                                    data: convertData(mapData[i]),
                                    symbolSize: function (val) {
                                        return val[2] / 10
                                    },
                                    rippleEffect: {
                                        brushType: 'stroke'
                                    },
                                    label: {
                                        show: true,
                                        position: 'right',
                                        formatter: function (params) {
                                            return params.data.name
                                        },
                                        color: colors[colorIndex][i]
                                    },
                                    itemStyle: {
                                        color: colors[colorIndex][i],
                                        shadowColor: colors[colorIndex][i],
                                        shadowBlur: 10
                                    },
                                    emphasis: {
                                        scale: true,
                                        label: {
                                            show: false
                                        }
                                    },
                                    zlevel: 1

                                },
                                {
                                    type: 'lines',
                                    data: convertToLineData(mapData[i], geoGpsMap[i + 1]),
                                    effect: {
                                        show: true,
                                        period: 4,
                                        symbol: 'arrow',
                                        symbolSize: 3,
                                        trailLength: 0.02
                                    },
                                    lineStyle: {
                                        color: colors[colorIndex][i],
                                        width: 0.1,
                                        opacity: 0.5,
                                        curveness: 0.3
                                    },
                                    zlevel: 2
                                }
                            ]
                        })
                    }

                    options.value = _options
                })

        }
        onMounted(() => {
            update()
        })
        return {
            options
        }
    }
}

</script>

<style lang='scss' scoped>
.order-map {
    width: 100%;
    height: 100%;
}
</style>
