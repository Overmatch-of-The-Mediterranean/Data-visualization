<template>
    <ve-bmap :settings="chartSettings" height="100%" :tooltip="{}" :series="chartSeries" :title="title"></ve-bmap>
</template>

<script>
import commonDataMixin from '../../mixins/commonDataMixin'
// 转化成统一的格式
const convertData = (data, geo) => {
    const result = []
    data.forEach(item => {
        const { name, value } = item
        const coord = geo[name]
        result.push({
            name,
            value: [...coord, value]
        })
    })
    return result
}
export default {
    name: 'BMap2',
    mixins: [commonDataMixin],
    data () {
        return {
            // 地图的第一层
            chartSettings: {
                key: 'G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb',
                bmap: {
                    center: [104.114129, 37.550339],
                    zoom: 5,
                    roam: false,
                    mapStyle: {
                        styleJson: [{
                            featureType: 'water',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        }, {
                            featureType: 'land',
                            elementType: 'all',
                            stylers: {
                                color: '#f3f3f3'
                            }
                        }, {
                            featureType: 'railway',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        }, {
                            featureType: 'highway',
                            elementType: 'all',
                            stylers: {
                                color: '#fdfdfd'
                            }
                        }, {
                            featureType: 'highway',
                            elementType: 'labels',
                            stylers: {
                                visibility: 'off'
                            }
                        }, {
                            featureType: 'arterial',
                            elementType: 'geometry',
                            stylers: {
                                color: '#fefefe'
                            }
                        }, {
                            featureType: 'arterial',
                            elementType: 'geometry.fill',
                            stylers: {
                                color: '#fefefe'
                            }
                        }, {
                            featureType: 'poi',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        }, {
                            featureType: 'green',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        }, {
                            featureType: 'subway',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        }, {
                            featureType: 'manmade',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        }, {
                            featureType: 'local',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        }, {
                            featureType: 'arterial',
                            elementType: 'labels',
                            stylers: {
                                visibility: 'off'
                            }
                        }, {
                            featureType: 'boundary',
                            elementType: 'all',
                            stylers: {
                                color: '#fefefe'
                            }
                        }, {
                            featureType: 'building',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        }, {
                            featureType: 'label',
                            elementType: 'labels.text.fill',
                            stylers: {
                                color: '#999999'
                            }
                        }]
                    }
                }
            },
            title: {
                text: '慕课外卖销售数据大盘',
                subtext: '销售趋势统计',
                left: 'center'
            },
            chartSeries: []
        }
    },
    watch: {
        mapData () {
            // 获取城市信息与地理信息
            const { data, geo } = this.mapData
            // 地图第二层的系列
            this.chartSeries = [
                {
                    name: 'sales',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: convertData(data, geo),
                    encode: { value: 2 },
                    itemStyle: {
                        color: 'purple'
                    },
                    symbolSize: function (val) {
                        return val[2] / 10
                    },
                    label: {
                        show: false,
                        position: 'right',
                        formatter: function (v) {
                            return `${v.data.name} - ${v.data.value[2]}`
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                {
                    name: 'Top 2',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value
                    }), geo).slice(0, 10),
                    symbolSize: function (val) {
                        return val[2] / 10
                    },
                    encode: {
                        value: 2
                    },
                    hoverAnimation: true,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    itemStyle: {
                        color: 'purple',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                }
            ]
        }

    }
}

</script>

<style lang='scss' scoped>
</style>
