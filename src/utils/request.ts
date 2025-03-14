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
        console.log('response.data.code5000', response);

        // if (response.data.code === -2) {
        //     ElNotification({
        //         dangerouslyUseHTMLString: true,
        //         showClose: false,
        //         customClass: "message-logout",
        //         title: "Please log in",
        //         duration: 1000,
        //     });
        //     // localStorage.removeItem('token')
        //     // console.log('Token has expired, redirecting to login...')
        //     // if (router) {
        //     //     router.push('/login')
        //     // } else {
        //     //     console.error('Router instance is not available.')
        //     // }
        // }
        // 深度克隆响应数据避免污染
        const clonedResponse = JSON.parse(JSON.stringify(response));

        console.log('[响应拦截器]5000 请求路径:', response.config.url);
        console.log('[响应拦截器]5000 完整结构:', clonedResponse);

        // 精确访问 code 值（根据实际结构调整）
        const businessCode = response.data?.code ?? response.data?.data?.code;

        if (businessCode === -2) {
            console.warn('认证失败，当前本地Token:', localStorage.getItem('token'));

            ElNotification({
                customClass: "message-logout",
                title: '会话过期',
                message: '请重新登录',

                duration: 3000
            });

            useTokenStore().clearWalletData()
        }
        return response
    },

    err => {
        return Promise.reject(err)
    }
)
// 暴露对象
export default request

