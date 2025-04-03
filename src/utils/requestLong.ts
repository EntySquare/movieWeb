// 管理网络请求
import router from '@/router'
import axios from 'axios'
import { useTokenStore } from "@/store/modules/my";
import { ElNotification } from 'element-plus';
import useWalletStore from '@/store/modules/wallet';

// 创建 axios 副本对象
let request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 50000
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
        const businessCode = response.data?.code ?? response.data?.data?.code;

        if (businessCode === -2) {
            console.warn('认证失败，当前本地Token:', localStorage.getItem('token'));

            ElNotification({
                customClass: "message-logout",
                title: '会话过期',
                message: '请重新登录',
                duration: 3000
            });
            const walletStore = useWalletStore();
            walletStore.clearWalletAddress(); // 清空钱包地址
            // 清空token数据
            useTokenStore().clearWalletData();
        }
        return response
    },
    err => {
        return Promise.reject(err)
    }
)
// 暴露对象
export default request

