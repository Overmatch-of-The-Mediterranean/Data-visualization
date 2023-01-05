import request from '../utils/request'
// request对应service，所以为函数
export function screenData() {
    return request({
        url: '/data',
        method: 'get'
    })
}
export function wordcloud() {
    return request({
        url: '/wordcloud',
        method: 'get'
    })
}
export function mapScatter() {
    return request({
        url: '/map/scatter',
        method: 'get'
    })
}
