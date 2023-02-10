<template>
    <div class="echarts"></div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import * as Echarts from 'echarts';
export default {
    name: 'VueEcharts',
    props: {
        options: Object,
        theme: [Number, Object]
    },
    setup (props) {
        const options = ref(null)
        let dom, chart
        const initEcharts = () => {
            if (!chart) {
                dom = document.getElementsByClassName('echarts')[0]
                chart = Echarts.init(dom, props.theme)
            }
            if (props.options)
                chart.setOption(props.options)
        }
        watch(() => props.options, () => {
            initEcharts()
            chart.setOption(props.options)
        })
        onMounted(() => {
            initEcharts()
        })
    }

}
</script>

<style lang="scss" scoped>
</style>