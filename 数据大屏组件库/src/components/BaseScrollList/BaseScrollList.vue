<template>
    <div class="base-scroll-list" :id="id">
        <div class="base-scroll-list-header" :style="{backgroundColor:headerBgc,height:`${headerHeight}px`}">
            <div class="header-item base-scroll-list-text" v-for="(item,index) in headerData" :key="item+index" :style="headerStyle[index]" v-html="item"></div>
        </div>
        <div class="base-scroll-list-rows">111</div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import useScreen from '../../hooks/useScreen'
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: 'BaseScrollList',
    props: {
        // 标题数据 ['a','b']
        header: Array,
        // 标题样式 [{},{}]
        headerStyle: Array,
        headerBgc: {
            type: String,
            default: 'rgb(90,90,90)'
        },
        headerHeight: {
            type: [Number, String],
            default: 35
        },
        headerIndex: {
            type: Boolean,
            default: false
        },
        headerIndexContent: {
            type: String,
            default: '#'
        },
        headerIndexStyle: Object
    },
    setup (props) {
        const id = `base-scroll-list-${uuidv4()}`
        const { width, height } = useScreen(id)
        onMounted(() => {
            console.log(width.value, height.value, props.headerIndex, 1111111111111111111);
        })
        const headerData = ref([])
        // 标题头样式
        const headerStyle = ref([])
        const handleHeader = () => {
            const _headerData = cloneDeep(props.header)
            const _headerStyle = cloneDeep(props.headerStyle)
            // if (_headerData.length === 0) {
            //     return
            // }
            if (props.headerIndex) {
                _headerData.unshift(props.headerIndexContent)
                _headerStyle.unshift(props.headerIndexStyle)
            }
            headerData.value = _headerData
            headerStyle.value = _headerStyle
        }
        onMounted(() => {
            handleHeader()
        })
        return {
            id,
            headerStyle,
            headerData
        }
    }
}

</script>

<style lang='scss' scoped>
.base-scroll-list {
    width: 100%;
    height: 100%;
    .base-scroll-list-header {
        display: flex;
        font-size: 15px;
        .base-scroll-list-text {
            padding: 0 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-sizing: border-box;
        }
        .header-item {
            width: 150px;
        }
    }
}
</style>
