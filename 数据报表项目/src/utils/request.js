import axios from 'axios'
// 返回的service其实也是一个函数
const service = axios.create({
    baseURL: 'https://www.fastmock.site/mock/7b79b1dbd67d9c01b8ba44861a79252f/screen',
    timeout: 8000
})

service.interceptors.response.use()
export default service
