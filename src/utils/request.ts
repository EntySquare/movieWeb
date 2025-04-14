// 管理网络请求
import router from '@/router'
import axios from 'axios'
import { useTokenStore } from "@/store/modules/my";
import { ElNotification } from 'element-plus';
import useWalletStore from '@/store/modules/wallet';
import { connectWallet } from "@/utils/wallet";


let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};



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

        const businessCode = response.data.code ?? response.data?.data?.code;

        if (businessCode === -2) {
            console.warn('认证失败，当前本地Token:', localStorage.getItem('token'));

            ElNotification({
                customClass: "message-logout",
                title: '会话过期',
                message: '请重新登录',
                offset: 164,
                duration: 1000
            });
            const walletStore = useWalletStore();
            walletStore.clearWalletAddress(); // 清空钱包地址
            // 清空token数据
            useTokenStore().clearWalletData();
            // 如果还没有在刷新 token，开始刷新 token
            if (!isRefreshing) {
                isRefreshing = true;

                // 使用一个 Promise 来刷新 token
                return new Promise(async (resolve, reject) => {
                    // 假设你有一个登录或刷新 token 的方法
                    await connectWallet()
                    await processQueue(null, useTokenStore().userToken);  // 处理队列中的请求
                    resolve(request(response.config));  // 重新发起原始请求
                });
            } else {
                // 如果已经在刷新 token，将当前请求放入队列
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    // 获取新的 token 后重新发起请求
                    response.config.headers.token = token;
                    return axios(response.config);
                });
            }

        }
        return response
    },

    err => {
        return Promise.reject(err)
    }
)
// 暴露对象
export default request

