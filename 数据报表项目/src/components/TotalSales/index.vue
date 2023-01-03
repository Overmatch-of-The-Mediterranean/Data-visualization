<template>
    <div>
        <common-card title="累计销售额" value="¥ 46,901,064">
            <template>
                <div class="compare-wrapper">
                    <div class="compare">
                        <span>日同比</span>
                        <span class="emphsis">56.34%</span>
                        <div class="increace"></div>
                    </div>
                    <div class="compare">
                        <span>月同比</span>
                        <span class="emphsis">102.16%</span>
                        <div class="decreace"></div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <span>昨日销售额</span>
                <span class="emphsis"> ¥30,000,000</span>
            </template>
        </common-card>
    </div>
</template>

<script>
import commonCardMixin from '../../mixins/commonCardMixin'
export default {
    name: 'TotalSales',
    mixins: [commonCardMixin]
}

</script>

<style lang='scss' scoped>
.compare-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .compare {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-top: 3px;
        color: #666;
    }
}
</style>
