<template>
    <ve-wordcloud :data="chartData" height="100%" :settings="chartSetting"></ve-wordcloud>
</template>

<script>
export default {
    name: 'WordCloud',
    data () {
        return {
            chartData: {
                columns: ['name', 'value'],
                rows: [
                    {
                        name: '慕课网1',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网2',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网3',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网4',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网5',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网6',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网7',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网8',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网9',
                        value: 100 * Math.random()
                    },
                    {
                        name: '慕课网10',
                        value: 100 * Math.random()
                    }
                ]
            },
            chartSetting: {
                color: ['rgba(97,216,0,.7)', 'rgba(204,178,26,.7)', 'rgba(245,166,35,.7)', 'rgba(156,13,113,.7)']
            }
        }
    }
}

</script>

<style lang='scss' scoped>
</style>
