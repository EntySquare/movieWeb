// 管理网络请求
import router from '@/router'
import axios from 'axios'
import { useTokenStore } from "@/store/modules/my";
import { ElNotification } from 'element-plus';

// 创建 axios 副本对象
let request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000
})
// 设置请求拦截器
request.interceptors.request.use(
    config => {
        const tokenStore = useTokenStore(); // 获取 store
        // const token = useHomeStore().Token
        const storedToken = tokenStore.userToken;
        config.headers.token = storedToken;
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


// 设置响应拦截器
request.interceptors.response.use(
    response => {
        if (response.data.code === -2) {
            ElNotification({
                dangerouslyUseHTMLString: true,
                showClose: false,
                customClass: "message-logout",
                title: "请登录",
                duration: 1000,
              });
            // localStorage.removeItem('token')
            // console.log('Token has expired, redirecting to login...')
            // if (router) {
            //     router.push('/login')
            // } else {
            //     console.error('Router instance is not available.')
            // }
        }
        return response
    },
    err => {
        return Promise.reject(err)
    }
)
// 暴露对象
export default request

