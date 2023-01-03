<template>
    <div>
        <common-card title="今日交易用户数" value="456,558">
            <template>
                <v-chart :option="getOptions()"></v-chart>
            </template>
            <template v-slot:footer>
                <span>退货率 </span>
                <span class="emphsis">5.52%</span>
            </template>
        </common-card>
    </div>
</template>

<script>
import commonCardMixin from '../../mixins/commonCardMixin'
export default {
    name: 'TodayUsers',
    mixins: [commonCardMixin],
    methods: {
        getOptions () {
            return {
                color: ['#3398DB'],
                xAxis: {
                    type: 'category',
                    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [{
                    type: 'bar',
                    data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150],
                    barWidth: '60%'
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
