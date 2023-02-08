<template>
  <div
    :ref="refName"
    class="imooc-fly-box"
  >
    <svg
      :width="width"
      :height="height"
    >
      <defs>
        <path
          id="fly-box-path"
          :d="path"
          fill="none"
        />
        <radialGradient
          id="radialGradient"
          cx="50%"
          cy="50%"
          fx="100%"
          fy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stop-color="#fff"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color="#fff"
            stop-opacity="0"
          />
        </radialGradient>
        <mask id="fly-box-mask">
          <circle
            r="50"
            cx="0"
            cy="0"
            fill="url(#radialGradient)"
          >
            <animateMotion 
              :path="path"
              :dur="`${duration}s`"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>
      <use
        href="#fly-box-path"
        stroke="#235fa7"
        stroke-width="1"
      />
      <use
        href="#fly-box-path"
        stroke="#4fd2dd"
        stroke-width="1"
        mask="url(#fly-box-mask)"
      />
    </svg>
    <div class="imooc-fly-box-content">
      <slot />
    </div>
    <!-- <svg
      wdith="400"
      height="400"
      viewBox="0 0 400 400"
    >
      <radialGradient 
        id="radialGradient"
        cx="40%"
        cy="50%"
        fx="50%"
        fy="50%"
        r="50%"
      >
        <stop
          offset="0%"
          stop-color="red"
        />
        <stop
          offset="100%"
          stop-color="blue"
        />
      </radialGradient>
      <mask id="mask">
        <circle
          cx="50%"
          cy="50%"
          r="25%"
          fill="url(#radialGradient)"
        />
      </mask>
      
      <circle
        r="30%"
        cx="50%"
        cy="50%"
        fill="url(#radialGradient)"
      />
    </svg> -->
  </div>
</template>

<script>
import {ref,getCurrentInstance,onMounted,computed} from 'vue'
// import { v4 as uuidv4 } from 'uuid';
export default {
  name:'ImoocFlyBox',
  props:{
    duration:{
      type:[Number,String],
      default:2
    }
  },
  setup(props) {
    const width = ref(0)
    const height = ref(0)
    const refName = 'imoocFlyBox'
    // const uuid = uuidv4()
    const path = computed(()=>{
      return `M5 5 L${width.value-5} 5 L${width.value-5} ${height.value-5} L5 ${height.value-5} Z`
    })
    const init = ()=>{
      const instance = getCurrentInstance()
      const dom = instance.ctx.$refs[refName]
      height.value = dom.clientHeight
      width.value = dom.clientWidth
    }
    onMounted(()=>{
      init()
    })
    return {
      height,
      width,
      refName,
      path
    }
  }
}

</script>

<style lang='scss' scoped>
.imooc-fly-box{
  position: relative;
  width: 100%;
  height:100%;
  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
.imooc-fly-box-content {
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}
}

</style>
