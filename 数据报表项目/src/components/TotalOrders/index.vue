<template>
    <div>
        <common-card title="累计订单量" value="2,928,474">
            <template>
                <v-chart :options="getOptions()" :style="{width:'100%',height:'100%'}"></v-chart>
            </template>
            <template v-slot:footer>
                <span>昨日订单量</span>
                <span class="emphsis">2,000,000</span>
            </template>
        </common-card>
    </div>
</template>

<script>
import commonCardMixin from '../../mixins/commonCardMixin'
export default {
    name: 'TotalOrders',
    mixins: [commonCardMixin],
    methods: {
        getOptions () {
            return {
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
                    data: [620, 432, 228, 534, 790, 430, 220, 532, 320, 834, 690, 530, 220, 620],
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
        }
    }

}

</script>

<style lang='scss' scoped>
</style>
