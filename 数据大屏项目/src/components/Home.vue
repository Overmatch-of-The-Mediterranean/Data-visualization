<template>
    <div class="home">
        <imooc-loading v-if="loading" inside-color="#02bcfe" outside-color="#3be6cb">
            <div class="loading-text">
                数据大屏加载中......
            </div>
        </imooc-loading>
        <imooc-container v-else :options="{width:3840,height:2160}">
            <div class="header">
                <top-header />
            </div>
            <div class="separator">
            </div>
            <div class="center">
                <div class="left">
                    <div class="left1">
                        <total-user :total-user="totalUser" :growth-last-day="growthLastDay" :growth-last-month="growthLastMonth" />
                    </div>
                    <div class="left2">
                        <average-age :data="ageData" :avgAge="averageAge" />
                    </div>
                    <div class="left3">
                        <TotalDevice :data="deviceData" />
                    </div>
                    <div class="left4">
                        <TotalGender :data="genderData" />
                    </div>
                    <div class="left5">
                        <TotalRider :data="riderData" />
                    </div>
                    <div class="left6">
                        <HotCategory :data="hotCategoryData" />
                    </div>
                </div>
                <div class="right">
                    <div class="right-top1">
                        <CenterHeader :data="headerMockData" />
                    </div>
                    <div class="right-top2">
                        <TransformCategory :data="['All','北京','上海','深圳','杭州','南京','武汉']" />
                    </div>
                    <div class="right-bottom">
                        <div class="right-left">
                            <div class="right-left1">
                                <!-- <BaseScrollList /> -->
                            </div>
                            <div class="right-left2">
                                <TransformCategory :data="['订单量','销售额','用户数','退单量']" :color="['rgb(178,209,126)','rgb(116,166,49)']" />
                            </div>
                            <div class="right-left3">
                                11
                            </div>
                            <div class="right-left4">
                                11
                            </div>
                        </div>
                        <div class="right-right">
                            <div class="right-right1">
                                12
                            </div>
                            <div class="right-right2">
                                13
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </imooc-container>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import useScreenData from '../hooks/useScreenData'
import TopHeader from './TopHeader/TopHeader.vue'
import TotalUser from './TotalUser/TotalUser.vue'
import AverageAge from './AverageAge/index.vue'
import TotalDevice from './TotalDevice/index.vue'
import TotalGender from './TotalGender/index.vue'
import TotalRider from './TotalRider/index.vue'
import HotCategory from './HotCategory/index.vue'
import CenterHeader from './CenterHeader/index.vue'
import TransformCategory from './TransformCategory/index.vue'
export default {
    name: 'Home',
    components: {
        TopHeader,
        TotalUser,
        AverageAge,
        TotalDevice,
        TotalGender,
        TotalRider,
        HotCategory,
        CenterHeader,
        TransformCategory
    },
    setup () {
        const options = ref(null)
        options.value = {
            xAxis: {
                type: 'category',
                data: ['一季度', '二季度', '三季度']
            },
            yAxis: {},
            series: {
                type: 'bar',
                data: [40, 80, 60]
            }
        }
        const loading = ref(true)
        const screenData = useScreenData()
        // console.log(screenData);
        onMounted(() => {
            setTimeout(() => {
                loading.value = false
            }, 200)
        })
        return {
            loading,
            ...screenData,
            options
        }
    }
}

</script>

<style lang="scss" scoped>
.home {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(29, 29, 29);
    font-size: 48px;
    color: #fff;
    #imooc-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .header {
            width: 100%;
            height: 147px;
            background: yellow;
        }
        .separator {
            width: 100%;
            height: 10px;
            background: #000;
        }
        .center {
            display: flex;
            width: 100%;
            flex: 1;
            .left {
                display: flex;
                flex-direction: column;
                flex: 0 0 860px;
                justify-content: space-between;
                width: 860px;
                height: 100%;
                margin: 0 10px;
                background: rgb(60, 61, 64);

                box-sizing: border-box;
                .left1,
                .left2,
                .left3,
                .left4,
                .left5,
                .left6 {
                    padding-bottom: 20px;
                }
                .left1 {
                    height: 300px;
                }
                .left2 {
                    height: 320px;
                }
                .left3 {
                    height: 280px;
                }
                .left4 {
                    height: 230px;
                }
                .left5 {
                    height: 360px;
                }
                .left6 {
                    height: 360px;
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                flex: 1;
                margin-left: 10px;
                .right-top1 {
                    height: 206px;
                    width: 100%;
                }
                .right-top2 {
                    height: 48px;
                    width: 100%;
                    margin: 10px 0;
                }
                .right-bottom {
                    flex: 1;
                    display: flex;
                    padding-bottom: 20px;
                    .right-left {
                        flex: 0 0 1917px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        width: 1917px;
                        .right-left1 {
                            height: 999px;
                        }
                        .right-left2 {
                            height: 80px;
                        }
                        .right-left3 {
                            height: 350px;
                        }
                        .right-left4 {
                            height: 220px;
                        }
                    }
                    .right-right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 10px;
                        .right-right1 {
                            width: 100%;
                            height: 999px;
                        }
                        .right-right2 {
                            flex: 1;
                            width: 100%;
                            height: 650px;
                            margin-top: 20px;
                        }
                    }
                }
            }
        }
    }
}
.loading-text {
    font-size: 20px;
}
</style>
