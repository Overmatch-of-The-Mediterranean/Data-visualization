<template>
    <div :ref="refName" id="imooc-container">
        <div :style="{width:'100%',height:'100%'}" v-if="ready">
            <slot />
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, ref, onMounted, onUnmounted, nextTick } from "vue";
import { debounce } from "../../utils/debounce";
export default {
    name: "ImoocContainer",
    props: {
        options: Object,
    },
    setup (props) {
        const width = ref(0);
        const height = ref(0);
        const originWidth = ref(0);
        const originHeight = ref(0);
        const refName = "imooc-comtainer";
        const ready = ref(false)
        let dom, observer;

        const init = () => {
            return new Promise((resolve) => {
                nextTick(() => {
                    if (props.options && props.options.width && props.options.height) {
                        width.value = props.options.width;
                        height.value = props.options.height;
                    } else {
                        width.value = dom.clientWidth;
                        height.value = dom.clientHeight;
                    }

                    if (!originWidth.value || !originHeight.value) {
                        originWidth.value = window.screen.width;
                        originHeight.value = window.screen.height;
                    }
                    resolve();
                });
            });
        };
        const updateSize = () => {
            if (width.value && height.value) {
                dom.style.width = `${width.value}px`;
                dom.style.height = `${height.value}px`;
            } else {
                dom.style.width = `${originWidth.value}px`;
                dom.style.height = `${originHeight.value}px`;
            }
        };

        const updateScale = () => {
            // 获取视口尺寸
            const currentWidth = document.body.clientWidth;
            const currentHeight = document.body.clientHeight;
            // 最终大屏尺寸
            const realWidth = width.value || originWidth.value;
            const realHeight = height.value || originHeight.value;
            // 放大视口尺寸变小，real不变,则scale缩小，dom的大小也跟着缩小
            const widthScale = currentWidth / realWidth;
            const heightScale = currentHeight / realHeight;
            dom && (dom.style.transform = `scale(${widthScale},${heightScale})`);
        };
        const onResize = async () => {
            // console.log('onResize',e);
            await init();
            updateScale();
        };
        // 监听dom和属性的变化
        const initMutationObserver = () => {
            const MutationObserver = window.MutationObserver
            observer = new MutationObserver(onResize)
            observer.observe(dom, {
                attributes: true,
                attributeFilter: ['style'],
                attributeOldValue: true
            })
        }

        const removeMutationObserber = () => {
            if (observer) {
                observer.disconnect()
                observer.takeRecords()
                observer = null
            }

        }
        onMounted(async () => {
            ready.value = false
            const instance = getCurrentInstance();
            dom = instance.ctx.$refs[refName];
            await init();
            updateSize();
            updateScale();
            window.addEventListener("resize", debounce(100, onResize));
            initMutationObserver()
            ready.value = true

            // console.log(
            //     width.value,
            //     height.value,
            //     originWidth.value,
            //     originHeight.value
            // );
            // console.log(
            //     document.body.clientWidth,
            //     document.body.clientHeight,
            //     dom.clientWidth,
            //     dom.clientHeight
            // );
        });
        onUnmounted(() => {
            window.removeEventListener("resize", onResize);
            removeMutationObserber()
        });
        return {
            refName,
            ready
        };
    },
};
</script>

<style lang='scss' scoped>
#imooc-container {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    transform-origin: left top;
    z-index: 999;
    font-size: 20px;
}
</style>
