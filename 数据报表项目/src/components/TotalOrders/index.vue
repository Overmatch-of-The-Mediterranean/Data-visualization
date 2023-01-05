<template>
    <div>
        <common-card title="累计订单量" :value="orderToday">
            <template>
                <v-chart :options="getOptions()" :style="{width:'100%',height:'100%'}"></v-chart>
            </template>
            <template v-slot:footer>
                <span>昨日订单量</span>
                <span class="emphsis">{{ orderLastDay }}</span>
            </template>
        </common-card>
    </div>
</template>

<script>
import commonCardMixin from '../../mixins/commonCardMixin'
import commonDataMixin from '../../mixins/commonDataMixin'
export default {
    name: 'TotalOrders',
    mixins: [commonCardMixin, commonDataMixin],
    methods: {
        getOptions () {
            return this.orderTrend.length > 0
                ? {
                    xAxis: {
                        type: 'category',
                        show: false,
                        boundaryGap: false // 使图标充分延申
                    },
                    yAxis: {
                        show: false
                    },
                    series: [{
                        type: 'line',
                        data: this.orderTrend,
                        areaStyle: {
                            color: 'purple'
                        },
                        lineStyle: {
                            width: 0 // 消除线
                        },
                        itemStyle: {
                            opacity: 0 // 变透明
                        },
                        smooth: true // 使曲线变得光滑
                    }],
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }
                }
                : null
        }
    }

}

</script>

<style lang='scss' scoped>
</style>
