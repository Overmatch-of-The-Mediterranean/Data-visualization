<template>
    <div class="base-scroll-list" :style="{width:'500px',height:'400px'}">
        <base-scroll-list :headerIndexStyle="{color:'green'}" headerIndex :header="header" :headerStyle="headerStyle"></base-scroll-list>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'Test',
    setup () {
        const header = ref([])
        const headerStyle = ref([])
        header.value = ['姓名', '年龄', '月薪']
        headerStyle.value = [{ color: 'red' }]
        return {
            header,
            headerStyle
        }
    }
}

</script>

<style lang='stylus' scoped></style>
