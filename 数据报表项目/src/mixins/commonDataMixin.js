function format(value) {
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    return `${value}`.replace(reg, '$&,')
}
function wrapperObject(obj, key) {
    if (obj && key.indexOf('.') >= 0) {
        const keys = key.split('.')
        keys.forEach(item => {
            obj = obj[item]
        })
        return obj
    } else {
        return obj && obj[key] ? obj[key] : {}
    }
}
function wrapperNumber(obj, key) {
    return obj && obj[key] ? format(obj[key]) : 0
}
function wrapperOriginalNumber(o, k) {
    return o && o[k] ? o[k] : 0
  }
function wrapperPercentage(obj, key) {
    return obj && obj[key] ? `${obj[key]}%` : 0
}
function wrapperMoney(obj, key) {
    return obj && obj[key] ? `￥${format(obj[key])}` : 0
}
function wrapperTrend(obj, key) {
    return obj && obj[key] ? obj[key] : []
}

export default {
    inject: ['getscreenData', 'getwordcloud', 'getmapScatter'],
    methods: {
        format(value) {
            return format(value)
        }

    },
    computed: {
        screenData () {
            return this.getscreenData()
        },
        wordcloud() {
            return this.getwordcloud()
        },
        mapData () {
            return this.getmapScatter()
        },
        salesToday() {
            return wrapperMoney(this.screenData, 'salesToday')
        },
        salesGrowthLastDay() {
            return wrapperPercentage(this.screenData, 'salesGrowthLastDay')
        },
        salesGrowthLastMonth() {
            return wrapperPercentage(this.screenData, 'salesGrowthLastMonth')
        },
        salesLastDay() {
            return wrapperMoney(this.screenData, 'salesLastDay')
        },
        orderUser() {
            return wrapperNumber(this.screenData, 'orderUser')
        },
        orderToday() {
            return wrapperNumber(this.screenData, 'orderToday')
        },
        orderLastDay() {
            return wrapperNumber(this.screenData, 'orderLastDay')
        },
        orderTrend() {
            return wrapperTrend(this.screenData, 'orderTrend')
        },
        userToday() {
            return wrapperNumber(this.screenData, 'userToday')
        },
        userTodayNumber() {
            return wrapperOriginalNumber(this.screenData, 'userToday')
          },
        returnRate() {
            return wrapperPercentage(this.screenData, 'returnRate')
        },
        orderUserTrend() {
            return wrapperTrend(this.screenData, 'orderUserTrend')
        },
        orderUserTrendAxis() {
            return wrapperTrend(this.screenData, 'orderUserTrendAxis')
        },
        userLastMonth() {
            return wrapperOriginalNumber(this.screenData, 'userLastMonth')
        },
        userGrowthLastDay() {
            return wrapperPercentage(this.screenData, 'userGrowthLastDay')
        },
        userGrowthLastMonth() {
            return wrapperNumber(this.screenData, 'userGrowthLastMonth')
        },
        userRank() {
            return wrapperTrend(this.screenData, 'userRank')
        },
        userFullYear() {
            return wrapperTrend(this.screenData, 'userFullYear')
        },
        userFullYearAxis() {
            return wrapperTrend(this.screenData, 'userFullYearAxis')
        },
        orderRank() {
            return wrapperTrend(this.screenData, 'orderRank')
        },
        orderFullYear() {
            return wrapperTrend(this.screenData, 'orderFullYear')
        },
        orderFullYearAxis() {
            return wrapperTrend(this.screenData, 'orderFullYearAxis')
        },
        category1() {
            return wrapperObject(this.screenData, 'category.data1')
        },
        category2() {
            return wrapperObject(this.screenData, 'category.data2')
        }
    }
}
