<template>
    <div class="bottom-view">
        <div class="view">
            <el-card shadow="hover">
                <template v-slot:header>
                    <div class="title-wrapper">关键词搜索</div>
                </template>
                <template>
                    <div class="chart-wrapper">
                        <div class="chart-inner">
                            <div class="chart">
                                <div class="chart-title">搜索用户数</div>
                                <div class="chart-data">{{ userCount}}</div>
                                <v-chart :options="searchUserOption"></v-chart>
                            </div>
                            <div class="chart">
                                <div class="chart-title">搜索量</div>
                                <div class="chart-data">{{ searchCount}}</div>
                                <v-chart :options="searchNumberOption"></v-chart>
                            </div>
                        </div>
                        <div class="table-wrapper">
                            <el-table :data="tableData" height="240">
                                <el-table-column prop="rank" label="排名"></el-table-column>
                                <el-table-column prop="keyword" label="关键词"></el-table-column>
                                <el-table-column prop="count" label="总搜索量"></el-table-column>
                                <el-table-column prop="users" label="搜索用户数"></el-table-column>
                                <el-table-column prop="range" label="点击率"></el-table-column>
                            </el-table>
                            <el-pagination @current-change="onPageChange" :page-size="pageSize" background layout="prev, pager, next" :total="total" />
                        </div>
                    </div>
                </template>
            </el-card>
        </div>
        <div class="view">
            <el-card shadow="hover">
                <template v-slot:header>
                    <div class="title-wrapper">
                        <div class="title">分类销售排行</div>
                        <div class="radio-wrapper">
                            <el-radio-group v-model="radioSelect" @change="onCategoryChange" size="small">
                                <el-radio-button label="品类"></el-radio-button>
                                <el-radio-button label="商品"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </template>
                <template>
                    <div class="chart-wrapper">
                        <v-chart :options="categoryOption"></v-chart>
                    </div>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script>
import commonDataMixin from '../../mixins/commonDataMixin'
const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc']
export default {
    name: 'BottomView',
    mixins: [commonDataMixin],
    data () {
        return {
            searchUserOption: {},
            searchNumberOption: {},
            tableData: [],
            totalData: [],
            userCount: 0,
            searchCount: 0,
            total: 0,
            pageSize: 4,
            radioSelect: '品类',
            categoryOption: {}
        }
    },
    watch: {
        // 检测wordcloud的变化，调整数据格式，累加搜索和用户总量
        wordcloud () {
            const totalData = []
            this.wordcloud.forEach((item, index) => {
                totalData.push({
                    id: index + 1,
                    rank: index + 1,
                    keyword: item.word,
                    count: item.count,
                    users: item.user,
                    range: `${((item.user / item.count) * 100).toFixed(2)}%`
                })
            })
            this.totalData = totalData
            this.total = totalData.length
            // 格式化并累加用户和搜索量
            this.userCount = this.format(totalData.reduce((s, i) => i.users + s, 0))
            this.searchCount = this.format(totalData.reduce((s, i) => i.count + s, 0))
            this.renderLineChart()
        },
        category1 () {
            this.renderPieChart()
        }
    },
    methods: {
        // 品类和商品切换时触发的事件
        onCategoryChange (type) {
            this.radioSelect = type
            this.renderPieChart()
        },
        // 跳转翻页时触发的事件
        onPageChange (page) {
            // 跳转翻页时，更新tableData的数据
            this.renderTable(page)
        },
        // 绘制右边的饼图
        renderPieChart () {
            if (!this.category1.data1 || !this.category2.data1) {
                return
            }
            let data = []
            let axis = []
            let total = 0

            if (this.radioSelect === '品类') {
                // 品类对应的数据
                data = this.category1.data1.slice(0, 6)
                axis = this.category1.axisX.slice(0, 6)
                total = data.reduce((s, i) => s + i, 0)
            } else {
                // 商品对应的数据
                data = this.category2.data1.slice(0, 6)
                axis = this.category2.axisX.slice(0, 6)
                total = data.reduce((s, i) => s + i, 0)
            }
            // 饼图所需的数据
            const chartData = []
            data.forEach((item, index) => {
                const percent = `${(item / total * 100).toFixed(2)}%`
                chartData.push({
                    legendname: axis[index],
                    value: item,
                    percent,
                    itemStyle: {
                        color: colors[index]
                    },
                    name: `${axis[index]} | ${percent}`
                })
            })
            // 饼图的配置
            this.categoryOption = {
                title: [
                    {
                        text: `${this.radioSelect}分布`,
                        textStyle: {
                            fontSize: 14,
                            color: '#666'
                        },
                        left: 20,
                        top: 20
                    },
                    {
                        text: '累计订单量',
                        textStyle: {
                            fontSize: 14,
                            color: '#999'
                        },
                        subtext: total,
                        subtextStyle: {
                            fontSize: 28,
                            color: '#333'
                        },
                        x: '34.5%',
                        y: '42.5%',
                        textAlign: 'center'
                    }
                ],
                series: {
                    name: '品类分布',
                    type: 'pie',
                    data: chartData,
                    center: ['35%', '50%'], // 圆心位置
                    radius: ['45%', '60%'], // 第一个内半径，第二个外半径，取的是画布宽高最小的那个的百分比
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: function (params) {
                            return params.data.legendname
                        }
                    },
                    labelLine: {
                        length: 5,
                        length2: 3,
                        smooth: true
                    },
                    itemStyle: {
                        borderWidth: 4,
                        borderColor: '#fff'
                    }
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    height: 250,
                    left: '70%',
                    top: 'middle',
                    textStyle: {
                        color: '#8c8c8c'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    textStyle: {
                        color: '#fff'
                    },
                    borderColor: 'rgba(50,50,50,.7)',
                    backgroundColor: 'rgba(50,50,50,.7)',
                    formatter: function (params) {
                        const format = params.seriesName + '<br/>' +
                            params.marker + params.data.legendname + '<br/>' +
                            '数量：' + params.data.value + '<br/>' +
                            '占比：' + params.data.percent
                        return format
                    }
                }
            }
        },
        // 处理tableData数据的更新
        renderTable (page) {
            this.tableData = this.totalData.slice((page - 1) * this.pageSize, page * this.pageSize)
        },
        renderLineChart () {
            // 封装的通用的创建配置函数
            const createOption = (key) => {
                const data = []
                const axis = []
                this.wordcloud.forEach((item) => { data.push(item[key]) })
                this.wordcloud.forEach((item) => { axis.push(item.word) })
                return {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: axis
                    },
                    yAxis: {
                        show: false
                    },
                    tooltip: {},
                    series: {
                        type: 'line',
                        data,
                        areaStyle: {
                            color: 'rgba(95,187,255,.5)'
                        },
                        lineStyle: {
                            color: 'rgba(95,187,255,.5)'
                        },
                        itemStyle: {
                            opacity: 0
                        },
                        smooth: true

                    },
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }
                }
            }
            this.searchUserOption = createOption('user')
            this.searchNumberOption = createOption('count')
        }
    },
    mounted () {
        this.renderPieChart()
    }
}

</script>

<style lang='scss' scoped>
.bottom-view {
    margin-top: 20px;
    display: flex;
    .view {
        flex: 1;
        width: 50%;
        box-sizing: border-box;
        &:first-child {
            padding: 0 10px 0 0;
        }
        &:last-child {
            padding: 0 0 0 10px;
        }
        .title-wrapper {
            display: flex;
            align-items: center;
            height: 60px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            font-weight: 500;
            padding: 0 0 0 20px;
            .radio-wrapper {
                flex: 1;
                display: flex;
                justify-content: flex-end;
                padding-right: 20px;
            }
        }
        .chart-wrapper {
            display: flex;
            flex-direction: column;
            height: 452px;

            .chart-inner {
                display: flex;
                padding: 0 10px;
                margin-top: 20px;

                .chart {
                    flex: 1;
                    padding: 0 10px;

                    .chart-title {
                        color: #999;
                        font-size: 14px;
                    }

                    .chart-data {
                        font-size: 22px;
                        color: #333;
                        font-weight: 500;
                        letter-spacing: 2px;
                    }

                    .echarts {
                        width: 100%;
                        height: 50px;
                    }
                }
            }

            .table-wrapper {
                flex: 1;
                margin-top: 20px;
                padding: 0 20px 20px;

                .el-pagination {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 15px;
                }
            }
        }
    }
}
</style>
