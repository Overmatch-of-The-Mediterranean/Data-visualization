<template>
    <div class="icon-wrapper" :style="{...style}">
        <svg class="icon">
            <use :href="iconName"></use>
        </svg>
    </div>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        name: String,
        prefix: {
            type: String,
            default: '#icon'
        },
        style: Object
    },
    setup (props) {
        const iconName = `${props.prefix}${props.name}`
        return {
            iconName
        }
    }
}

</script>

<style lang='scss' scoped>
.icon-wrapper {
    width: 100%;
    height: 100%;
    .icon {
        width: 100%;
        height: 100%;
    }
}
</style>
