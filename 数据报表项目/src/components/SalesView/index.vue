<template>
    <div class="sales-view">
        <el-card>
            <template v-slot:header>
                <div class="menu-wrapper">
                    <el-menu class="sales-view-menu" :default-active="activeIndex" mode="horizontal" @select="onMenuSelect">
                        <el-menu-item index="1">销售额</el-menu-item>
                        <el-menu-item index="2">访问量</el-menu-item>
                    </el-menu>
                    <div class="menu-right">
                        <el-radio-group size="small" v-model="radioSelect">
                            <el-radio-button label="今日" />
                            <el-radio-button label="本周" />
                            <el-radio-button label="本月" />
                            <el-radio-button label="今年" />
                        </el-radio-group>
                        <el-date-picker class="sales-view-date-picker" unlink-panels :picker-options="pickerOptions" v-model="date" size="small" type="daterange" range-separator="至" start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" />
                    </div>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'SalesView',
    data () {
        return {
            activeIndex: '1',
            radioSelect: '今日',
            date: null,
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick (picker) {
                            const start = new Date()
                            const end = new Date()
                            start.setTime(start.getTime() - 3600 * 24 * 1000 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick (picker) {
                            const start = new Date()
                            const end = new Date()
                            start.setTime(start.getTime() - 3600 * 24 * 1000 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick (picker) {
                            const start = new Date()
                            const end = new Date()
                            start.setTime(start.getTime() - 3600 * 24 * 1000 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        onMenuSelect (index) {
            this.activeIndex = index
        }
    }
}

</script>

<style lang='scss' scoped>
.sales-view {
    margin-top: 20px;
    .menu-wrapper {
        position: relative;
        display: flex;
        .sales-view-menu {
            width: 100%;
            margin: 0 20px;
            height: 50px;
            line-height: 50px;
            .el-menu-item {
                height: 50px;
                line-height: 50px;
                margin: 0 20px;
            }
        }
        .menu-right {
            position: absolute;
            right: 20px;
            top: 0;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .sales-view-date-picker {
                margin-left: 20px;
            }
        }
    }
}
</style>
