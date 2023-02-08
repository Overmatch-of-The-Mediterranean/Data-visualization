<template>
    <div class="test">
        {{ messgae }} {{ count }}
        <button @click="handleClick">
            +1
        </button>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: "TestComponent",
    setup (props) {
        const messgae = '消息'
        let count = ref(1)
        const handleClick = () => {
            count.value++
        }
        return {
            count,
            messgae,
            handleClick
        }
    }
}

</script>

<style lang='scss' scoped>
.test {
    color: red;
}
</style>
