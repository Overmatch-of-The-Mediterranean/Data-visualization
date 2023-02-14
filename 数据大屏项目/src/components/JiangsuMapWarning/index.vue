<template>
    <div style="width:100%;height:100%">
        <vue-echarts :options="options"></vue-echarts>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: 'JiangsuMapWarning',
    setup () {
        const options = ref({})
        let timer = null
        const update = () => {
            fetch('http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json')
                .then(res => res.json())
                .then(data => {
                    const center = []
                    data.features.forEach(item => {
                        if (item.properties) {
                            center.push({
                                name: item.properties.name,
                                value: item.properties.center
                            })
                        }
                    })
                    echarts.registerMap('jiangsu', data) // 注册地图
                    options.value = {
                        visualMap: {
                            max: 100,
                            // seriesIndex:{}
                            inRange: {
                                color: ['#a5dcf4', '#006edd']
                            }
                        },
                        geo: [
                            {
                                map: 'jiangsu', // 使用自定义地图
                                zoom: 1,
                                roam: false,
                                scaleLimit: {
                                    min: 0,
                                    max: 3
                                },
                                itemStyle: {
                                    areaColor: '#013c62',
                                    shadowColor: '#013c62',
                                    shadowBlur: 20,
                                    shadowOffsetX: -5,
                                    shadowOffsetY: 15
                                },
                            }
                        ],
                        series: [
                            {
                                type: 'map',
                                map: 'jiangsu',
                                roam: false,
                                label: {
                                    show: true,
                                    color: '#fff',

                                },
                                itemStyle: {
                                    borderColor: '#2980b9',
                                    borderWidth: 1,
                                    areaColor: '#12235c',

                                },
                                emphasis: {
                                    label: {
                                        color: '#fff',
                                        show: true
                                    },
                                    itemStyle: {
                                        areaColor: '#fa8c16',
                                        borderWidth: 0
                                    }
                                },
                                data: center.map(centerItem => {
                                    const value = Math.random() * 100
                                    return {
                                        name: centerItem.name,
                                        value
                                    }
                                })
                            },
                            {
                                type: 'effectScatter',
                                data: [],
                                coordinateSystem: 'geo',
                                symbolSize: 16,
                                itemStyle: {
                                    color: '#feae21'
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: function (params) {
                                        console.log(params, 'params');
                                        return `{title|${params.data.city}}\n{content|发生xx事情}`
                                    },
                                    backgroundColor: 'rgba(254,174,33,.8)',
                                    padding: [0, 0],
                                    borderRadius: 3,
                                    lineHeight: 32,
                                    color: '#f7fafb',
                                    rich: {
                                        title: {
                                            padding: [10, 10, 0, 10],
                                            color: '#fff'
                                        },
                                        content: {
                                            padding: [0, 10, 10, 10],
                                            color: '#fff'
                                        }
                                    }
                                }
                            },
                            {
                                type: 'effectScatter',
                                data: [],
                                coordinateSystem: 'geo',
                                symbolSize: 16,
                                itemStyle: {
                                    color: '#e93f42'
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: function (params) {
                                        console.log(params, 'params');
                                        return `{title|${params.data.city}}\n{content|发生xx事情}`
                                    },
                                    backgroundColor: 'rgba(233,63,66,.9)',
                                    padding: [0, 0],
                                    borderRadius: 3,
                                    lineHeight: 32,
                                    color: '#f7fafb',
                                    rich: {
                                        title: {
                                            padding: [10, 10, 0, 10],
                                            color: '#fff'
                                        },
                                        content: {
                                            padding: [0, 10, 10, 10],
                                            color: '#fff'
                                        }
                                    }
                                }
                            },
                            {
                                type: 'effectScatter',
                                data: [],
                                coordinateSystem: 'geo',
                                symbolSize: 16,
                                itemStyle: {
                                    color: '#08baec'
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: function (params) {
                                        console.log(params, 'params');
                                        return `{title|${params.data.city}}\n{content|发生xx事情}`
                                    },
                                    backgroundColor: 'rgba(8,186,236,.9)',
                                    padding: [0, 0],
                                    borderRadius: 3,
                                    lineHeight: 32,
                                    color: '#f7fafb',
                                    rich: {
                                        title: {
                                            padding: [10, 10, 0, 10],
                                            color: '#fff'
                                        },
                                        content: {
                                            padding: [0, 10, 10, 10],
                                            color: '#fff'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                    timer = setInterval(() => {
                        const _options = cloneDeep(options.value)
                        for (let i = 1; i < 4; i++) {
                            _options.series[i].data = []
                        }
                        const cityLength = center.length
                        const cityIndex = Math.floor(Math.random() * cityLength)
                        const eventIndex = Math.floor(Math.random() * 3) + 1
                        _options.series[eventIndex].data = [{
                            city: center[cityIndex].name,
                            value: center[cityIndex].value,
                            visualMap: false
                        }]
                        options.value = _options
                    }, 1000)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        onMounted(() => {
            update()
        })
        onUnmounted(() => {
            timer && clearInterval(timer)
        })
        return {
            options
        }
    }
}

</script>

<style lang='scss' scoped></style>
