// 管理网络请求
import router from '@/router'
import axios from 'axios'
// 创建 axios 副本对象
let request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000
})
// 设置请求拦截器
request.interceptors.request.use(
    config => {
        // const token = useHomeStore().Token
        // const storedToken = localStorage.getItem('token')
        // config.headers.token = storedToken
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


// 设置响应拦截器
request.interceptors.response.use(
    response => {
        // if (response.data.code === -2) {
        //     localStorage.removeItem('token')
        //     console.log('Token has expired, redirecting to login...')
        //     if (router) {
        //         router.push('/login')
        //     } else {
        //         console.error('Router instance is not available.')
        //     }
        // }
        return response
    },
    err => {
        return Promise.reject(err)
    }
)
// 暴露对象
export default request

