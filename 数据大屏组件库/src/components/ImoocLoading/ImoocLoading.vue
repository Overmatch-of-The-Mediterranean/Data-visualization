<template>
    <div class="imooc-loading">
        <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
            <circle cx="25" cy="25" r="22" fill="none" stroke-width="3" :stroke="outsideColor" stroke-dasharray="34" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" values="0 25 25;360 25 25" :dur="`${duration}s`" repeatCount="indefinite" />
                <animate attributeName="stroke" :values="outsideColorAnimation" :dur="`${duration}s`" repeatCount="indefinite" />
            </circle>
            <circle cx="25" cy="25" r="12" fill="none" stroke-width="3" :stroke="insideColor" stroke-dasharray="19" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" values="360 25 25;0 25 25" :dur="`${duration}s`" repeatCount="indefinite" />
                <animate attributeName="stroke" :values="insideColorAnimation" :dur="`${duration}s`" repeatCount="indefinite" />
            </circle>
        </svg>
    </div>
    <div>
        <slot />
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'ImoocLoading',
    props: {
        height: {
            type: [Number, String],
            default: '200'
        },
        width: {
            type: [Number, String],
            default: '200'
        },
        outsideColor: {
            type: String,
            default: 'red'
        },
        insideColor: {
            type: String,
            default: 'blue'
        },
        duration: {
            type: String,
            default: '2'
        }
    },
    setup (props) {
        const insideColorAnimation = computed(() => {
            return `${props.insideColor};${props.outsideColor};${props.insideColor}`
        })
        const outsideColorAnimation = computed(() => {
            return `${props.outsideColor};${props.insideColor};${props.outsideColor}`
        })
        return {
            insideColorAnimation,
            outsideColorAnimation
        }
    },
}
</script>

<style lang="scss" scoped></style>
