<template>
    <div class="base-scroll-list" :style="{width:'500px',height:'400px'}">
        <base-scroll-list :config="config"></base-scroll-list>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'Test',
    setup () {
        const config = ref({})
        const data = []
        const rowStyle = [{ color: 'green' }]
        const rowBgc = ['rgb(244,244,244)', 'rgb(255,255,255)']
        const aligns = ['center', 'left', 'right']
        const headerFontSize = 24
        const rowFontSize = 20
        const headerColor = '#fff'
        const rowColor = '#000'
        for (let i = 0; i < 10; i++) {
            data.push([`同学${i + 1}`, Math.floor(Math.random() * 10 + 20), Math.floor(Math.random() * 10000 + 10000)])
        }
        config.value = {
            headerIndexStyle: { color: 'green', width: '50px' },
            headerIndex: true,
            header: ['姓名', '年龄', '月薪'],
            headerStyle: [{ color: 'red' }, { width: '100px' }],
            headerHeight: 40,
            data,
            rowNum: 10,
            rowStyle,
            rowBgc,
            aligns,
            headerFontSize,
            rowFontSize,
            headerColor,
            rowColor
        }
        return {
            config
        }
    }
}

</script>

<style lang='stylus' scoped></style>
