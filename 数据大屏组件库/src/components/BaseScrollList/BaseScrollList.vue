<template>
    <div class="base-scroll-list" :id="id">
        <div class="base-scroll-list-header" :style="{backgroundColor:actualConfig.headerBgc,height:`${actualConfig.headerHeight}px`,fontSize:`${actualConfig.headerFontSize}px`,color:actualConfig.headerColor}">
            <div class="header-item base-scroll-list-text" :align="aligns[index]" v-for="(item,index) in headerData" :key="item+index" :style="{width:`${columnsWidths[index]}px`,...headerStyle[index]}" v-html="item"></div>
        </div>
        <div class="base-scroll-list-rows-wrapper" :style="{height:`${height - actualConfig.headerHeight}px`}">
            <div class="base-scroll-list-rows" v-for="(rowItem,rowIndex) in currentRowsData" :key="rowItem.data+rowIndex" :style="{height:`${rowsHeights[rowIndex]}px`,lineHeight:`${rowsHeights[rowIndex]}px`,fontSize:`${actualConfig.rowFontSize}px`,backgroundColor: rowItem.rowIndex%2===0 ? rowBgc[1]:rowBgc[0],color:actualConfig.rowColor}">
                <div class="base-scroll-list-columns base-scroll-list-text" v-for="(colItem,colIndex) in rowItem.data" :key="colItem+colIndex" :align="aligns[colIndex]" :style="{width:`${columnsWidths[colIndex]}px`,...rowStyle[colIndex]}" v-html="colItem">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import useScreen from '../../hooks/useScreen'
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'
export default {
    name: 'BaseScrollList',
    props: {
        config: {}

    },
    setup (props) {
        const id = `base-scroll-list-${uuidv4()}`
        const { width, height } = useScreen(id)
        const headerData = ref([])
        // 标题头样式
        const headerStyle = ref([])
        const rowStyle = ref([])
        const rowBgc = ref([])

        // 默认参数--props中的默认值
        const defaultConfig = ref({
            // 标题数据 ['a','b']
            header: [],
            // 标题样式 [{},{}]
            headerStyle: [],
            // 标题背景颜色
            headerBgc: 'rgb(90,90,90)',
            // 标题高
            headerHeight: 35,
            headerIndex: false,
            headerIndexContent: '#',
            headerIndexStyle: {},
            data: [],
            rowNum: 5,
            rowStyle: [],
            rowBgc: [],
            rowIndexStyle: {
                color: 'red'
            },
            aligns: [],
            headerFontSize: 28,
            rowFontSize: 28,
            headerColor: '#fff',
            rowColor: '#000',
            moveNum: 1, // 移动行数
            durtion: 2000,
            headerIndexData: []
        })
        const actualConfig = ref({})
        // 数据修改并备份，不在原数据上进行操作
        const columnsWidths = ref([])
        const rowsHeights = ref([])
        const rowData = ref([])
        const rowNum = ref(0)
        const aligns = ref([])
        const currentRowsData = ref([])
        const currentIndex = ref(0)
        let avgHeight
        const isAnimationStart = ref(true)
        const handleHeader = (config) => {
            const _headerData = cloneDeep(config.header)
            const _headerStyle = cloneDeep(config.headerStyle)
            const _rowStyle = cloneDeep(config.rowStyle)
            const _rowData = cloneDeep(config.data)
            const _aligns = cloneDeep(config.aligns)
            if (_headerData.length === 0) {
                return
            }
            // 添加标题头内容和样式
            if (config.headerIndex) {
                _headerData.unshift(config.headerIndexContent)
                _headerStyle.unshift(config.headerIndexStyle)
                _rowStyle.unshift(config.rowIndexStyle)
                _aligns.unshift('center')
                _rowData.forEach((item, index) => {
                    if (config.headerIndexData && config.headerIndexData.length > 0 && config.headerIndexData[index]) {
                        item.unshift(config.headerIndexData[index])
                    } else {
                        item.unshift(index + 1)
                    }
                })
                console.log(_rowData, '_rowData');
            }
            let useWidth = 0, useWidthNum = 0
            _headerStyle.forEach(item => {
                if (item.width) {
                    useWidth += Number(item.width.replace('px', ''))
                    useWidthNum++
                }
            })
            // 计算剩余的平均宽度
            const avgWidth = (width.value - useWidth) / (_headerData.length - useWidthNum)
            const _columnsWidths = new Array(_headerData.length).fill(avgWidth)

            // 使得每行数据中的每列宽度和标题每列宽度一样
            _headerStyle.forEach((item, index) => {
                if (item.width) {
                    const columnWidth = Number(item.width.replace('px', ''))
                    _columnsWidths[index] = columnWidth
                }
            })

            // 双份数据，使滚动效果更流畅
            const { rowNum } = config
            if (_rowData.length >= rowNum && _rowData.length < 2 * rowNum) {
                const newRowData = [..._rowData, ..._rowData]
                rowData.value = newRowData.map((item, index) => (
                    {
                        data: item,
                        rowIndex: index
                    }
                ))
            } else {
                rowData.value = _rowData.map((item, index) => (
                    {
                        data: item,
                        rowIndex: index
                    }
                ))
            }

            columnsWidths.value = _columnsWidths
            headerData.value = _headerData
            headerStyle.value = _headerStyle
            rowStyle.value = _rowStyle
            rowBgc.value = config.rowBgc
            aligns.value = _aligns
        }
        const handleRows = (config) => {
            const { headerHeight } = config
            rowNum.value = config.rowNum
            const noUseHeight = height.value - headerHeight
            if (rowNum.value > rowData.value.length) {
                rowNum.value = rowData.value.length

            }
            avgHeight = noUseHeight / rowNum.value
            rowsHeights.value = new Array(rowNum.value).fill(avgHeight)
        }
        // rows移动变换逻辑
        const startAnimation = async () => {
            if (!isAnimationStart) return
            const config = actualConfig.value
            const { rowNum, moveNum, durtion } = config
            const totalLength = rowData.value.length
            if (totalLength < rowNum) {
                return
            }
            const index = currentIndex.value
            const _rowData = cloneDeep(rowData.value)
            // 将数据重新首尾相连
            const rows = _rowData.slice(index)
            rows.push(..._rowData.slice(0, index))
            currentRowsData.value = rows
            currentIndex.value += moveNum

            // 还原所有row的高度
            rowsHeights.value = new Array(totalLength).fill(avgHeight)
            if (!isAnimationStart) return
            await new Promise(resolve =>
                setTimeout(resolve, 300)
            )
            // 让moveNum的高度为零
            rowsHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0))

            // 首尾相连
            const isLast = currentIndex.value - totalLength
            if (isLast >= 0) {
                currentIndex.value = isLast
            }

            // sleep
            if (!isAnimationStart) return
            await new Promise(resolve =>
                setTimeout(resolve, durtion - 300)
            )
            startAnimation()
        }
        const stopAnimation = () => {
            isAnimationStart.value = false
        }
        const update = () => {
            stopAnimation()
            // 默认参数与实际参数合并
            rowData.value = props.config.data || []
            const _actualConfig = assign(defaultConfig.value, props.config)
            handleHeader(_actualConfig)
            handleRows(_actualConfig)
            actualConfig.value = _actualConfig
            isAnimationStart.value = true
            startAnimation()
        }
        watch(() => props.config, () => {
            update()
        })
        return {
            id,
            headerData,
            headerStyle,
            actualConfig,
            rowData,
            columnsWidths,
            rowsHeights,
            rowStyle,
            rowBgc,
            aligns,
            currentRowsData,
            height
        }
    }
}

</script>

<style lang='scss' scoped>
.base-scroll-list {
    width: 100%;
    height: 100%;
    .base-scroll-list-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .base-scroll-list-header {
        display: flex;
        font-size: 15px;
        align-items: center;

        .header-item {
            width: 150px;
        }
    }
    .base-scroll-list-rows-wrapper {
        overflow: hidden;
        .base-scroll-list-rows {
            display: flex;
            align-items: center;
            transition: all 0.3s linear;
            .base-scroll-list-columns {
                height: 100%;
                color: #fff;
            }
        }
    }
}
</style>
