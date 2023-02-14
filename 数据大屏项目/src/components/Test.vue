<template>
    <div :style="{width:'100%',height:'100%'}">
        <!-- <GdpTimelineChart></GdpTimelineChart> -->
        <JiangsuMapWarning></JiangsuMapWarning>
    </div>
</template>

<script>
// import { ref } from 'vue'
import JiangsuMapWarning from './JiangsuMapWarning/index.vue'
export default {
    name: 'Test',
    components: { JiangsuMapWarning },
    setup () {
    }
}

</script>

<style lang='scss' scoped></style>
