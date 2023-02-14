<template>
    <div class="sales-list">
        <base-scroll-list :config="config"></base-scroll-list>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
export default {
    name: 'SalesList',
    props: {
        data: Array
    },
    setup (props) {
        const config = ref({})
        const update = () => {
            const data = []
            const headerIndexData = []
            for (let i = 0; i < props.data.length; i++) {
                data[i] = []
                if (i % 2 === 0) {
                    headerIndexData[i] = `
                <div style="width:100%;height:100%;background:rgb(40,40,40);display:flex;align-items:center;justify-content:center;">
                    <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
                </div>`
                } else {
                    headerIndexData[i] = `
                <div style="width:100%;height:100%;background:rgb(40,40,40);display:flex;align-items:center;justify-content:center;">
                    <div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
                </div>`
                }

                for (let j = 0; j < 5; j++) {
                    let text = ''
                    switch (j) {
                        case 0:
                            text = props.data[i].order
                            break
                        case 1:
                            text = props.data[i].shop
                            break
                        case 2:
                            text = props.data[i].rider
                            break
                        case 3:
                            text = props.data[i].newShop
                            break
                        case 4:
                            text = props.data[i].avgOrder
                            break
                        default:
                    }
                    if (j == 1 || j === 3) {
                        data[i].push(`<div style="color:rgb(178,209,126)">${text}</div>`)
                    } else {
                        data[i].push(text)
                    }

                }
            }
            config.value = {
                headerIndexStyle: { width: '50px' },
                headerIndex: true,
                header: ['城市订单量', '店铺数', '接单骑手人数', '新店铺数量', '人均订单量'],
                headerStyle: [{}],
                headerHeight: 40,
                data,
                rowNum: 10,
                rowStyle: [{}],
                rowBgc: ['rgb(40,40,40)', 'rgb(55,55,55)'],
                aligns: ['center', 'center', 'center'],
                headerFontSize: 24,
                rowFontSize: 20,
                headerColor: '#fff',
                rowColor: '#000',
                headerIndexContent: '',
                headerIndexData
            }

        }
        onMounted(() => {
            update()
        })
        watch(() => props.data, () => {
            update()
        })

        return {
            config
        }

    }
}

</script>

<style lang='scss' scoped>
.sales-list {
    width: 100%;
    height: 100%;
}
</style>
