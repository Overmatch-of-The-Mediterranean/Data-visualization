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
                222
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
                        1
                    </div>
                    <div class="right-top2">
                        2
                    </div>
                    <div class="right-bottom">
                        <div class="right-left">
                            <div class="right-left1">
                                999
                            </div>
                            <div class="right-left2">
                                10
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
export default {
    name: 'Home',
    components: {
        TopHeader,
        TotalUser,
        AverageAge,
        TotalDevice,
        TotalGender,
        TotalRider,
        HotCategory
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
            background: rebeccapurple;
            .left {
                display: flex;
                flex-direction: column;
                flex: 0 0 860px;
                justify-content: space-between;
                width: 860px;
                height: 100%;
                background: red;
                padding-bottom: 20px;
                box-sizing: border-box;
                .left1 {
                    height: 300px;
                    background: green;
                }
                .left2 {
                    height: 320px;
                    background: yellow;
                }
                .left3 {
                    height: 280px;
                    background: blueviolet;
                }
                .left4 {
                    height: 230px;
                    background: mediumpurple;
                }
                .left5 {
                    height: 360px;
                    background: pink;
                }
                .left6 {
                    height: 360px;
                    background: darkred;
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                flex: 1;
                background: blue;
                .right-top1 {
                    height: 206px;
                    width: 100%;
                    background: darkred;
                }
                .right-top2 {
                    height: 48px;
                    width: 100%;
                    background: cadetblue;
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
                            background: red;
                        }
                        .right-left2 {
                            height: 80px;
                            background: yellowgreen;
                        }
                        .right-left3 {
                            height: 350px;
                            background: deepskyblue;
                        }
                        .right-left4 {
                            height: 220px;
                            background: orangered;
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
                            background: burlywood;
                        }
                        .right-right2 {
                            flex: 1;
                            width: 100%;
                            height: 650px;
                            margin-top: 20px;
                            background: darkred;
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
