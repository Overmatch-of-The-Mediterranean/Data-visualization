<template>
  <div class="total-user">
    <div class="title">
      慕课外卖用户总数 
    </div>
    <div class="sub-title">
      User Total Count
    </div>
    <div class="total">
      <countTo
        :start-val="startval"
        :end-val="totalUser"
        :duration="1000"
      />
    </div>
    <div class="percent-text">
      <span class="percent-text-1">
        每日增长率：<countTo
          :start-val="startPercent1"
          :end-val="growthLastDay"
          :duration="1000"
          :decimals="2"
          suffix="%"
        />
      </span>
      <span class="percent-text-2">
        每月增长率：<countTo
          :start-val="startPercent2"
          :end-val="growthLastMonth"
          :duration="1000"
          :decimals="2"
          suffix="%"
        />
      </span>
    </div>
    <div class="percent">
      <div class="percent-inner-wrapper">
        <div
          class="percent-inner"
          :style="{width: `${growthLastDay}%`}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref,watch } from 'vue';
export default {
    name:'TotalUser',
    props:{
        totalUser:{
            type:Number,
            default:0
        },
        growthLastDay:{
            type:Number,
            default:0
        },
        growthLastMonth:{
            type:Number,
            default:0
        }
    },
    setup(props){
        const startval = ref(0)
        const startPercent1 = ref(0)
        const startPercent2 = ref(0)
        watch(()=>props.totalUser,(newValue,preValue)=>{
            startval.value = preValue
        })
        watch(()=>props.growthLastDay,(newValue,preValue)=>{
            startPercent1.value = preValue
        })
        watch(()=>props.growthLastMonth,(newValue,preValue)=>{
            startPercent1.value = preValue
        })
        return {
            startval,
            startPercent1,
            startPercent2,
        }
    }
}

</script>

<style lang='scss' scoped>
.total-user {
    width: 100%;
    height: 100%;
    background: rgb(66, 68, 70);
    box-shadow: 0 10px 10px rgba(0,0,0,.3);
    padding: 20px 40px;
    box-sizing:border-box;
    .tital {
        font-size: 32px;
    }
    .sub-title {
        font-size: 16px;
        letter-spacing: 1px;
        margin-top: 10px;
    }
    .total {
        font-family: DIN;
        font-size: 68px;
        font-weight: bolder;
        letter-spacing: 2px;
        padding: 10px 0;
    }
    .percent-text {
      font-size: 28px;
      font-family: DIN;
      letter-spacing: 2px;

      .percent-text-1 {
        color: rgb(197, 251, 121);
      }

      .percent-text-2 {
        color: rgb(99, 169, 0);
        margin-left: 10px;
      }
    }
    .percent {
      width: 100%;
      height: 20px;
      box-sizing: border-box;
      border: 1px solid #fff;
      margin-top: 10px;

      .percent-inner-wrapper {
        height: 100%;
        padding: 2px;
        box-sizing: border-box;
        overflow: hidden;

        .percent-inner {
          height: 100%;
          background: rgb(150, 150, 150);
          transition: all 1s linear;
        }
      }
    }
}
</style>
