import { ElNotification } from "element-plus";
import { ref } from "vue";
import { Web3 } from "web3";
import useWalletStore from "@/store/modules/wallet";
import { useTokenStore } from "@/store/modules/my";
import { addressLogin } from "@/api/login";
// 格式化字符串的函数
export const formatData = (input: string): string => {
    if (input.length <= 10) {
        return input; // 如果字符串较短，不需要省略
    }
    const start = input.slice(0, 4); // 获取前5个字符
    const end = input.slice(-3); // 获取后4个字符
    return `${start}...${end}`; // 返回格式化后的字符串
};
export const formatData1 = (input: string): string => {
    if (input.length <= 10) {
        return input; // 如果字符串较短，不需要省略
    }
    const start = input.slice(0, 5); // 获取前5个字符
    const end = input.slice(-4); // 获取后4个字符
    return `${start}...${end}`; // 返回格式化后的字符串
};

// !钱包登录
declare global {
    interface Window {
        ethereum?: any;
        okxwallet?: any;
        web3?: Web3;
    }
}
// **钱包相关**
const provider = ref<any>(null);
const web3 = ref<Web3 | null>(null);

// 获取真实的 MetaMask provider
const getProvider = () => {
    if (window.ethereum?.providers) {
        return window.ethereum.providers.find((p: any) => p.isMetaMask) || null;
    }
    return window.ethereum?.isMetaMask ? window.ethereum : null;
};

// 连接钱包
export const connectWallet = async () => {
    try {
        const metaMask = getProvider();
        const walletStore = useWalletStore();
        if (!metaMask) {
            ElNotification({
                showClose: false,
                customClass: "message-logout",
                title: "Connection failed. Please refresh the page after installing MetaMask wallet",
                duration: 1000,
            });
            return;
        }

        provider.value = metaMask;

        web3.value = new Web3(provider.value);
        //获取网络ID
        const chain = await provider.value.request({ method: "eth_chainId" });

        // if (chain !== walletStore.BSC_chain_id) {
        //     // 切换BSC网络
        //     try {
        //         await provider.value.request({
        //             method: "wallet_switchEthereumChain",
        //             params: [{ chainId: walletStore.BSC_chain_id }],
        //         });
        //     } catch (switchError) {
        //         return;
        //     }
        // }

        const accounts = await provider.value.request({
            method: "eth_requestAccounts",
        });
        const tokenStore = useTokenStore();
        if (accounts.length > 0) {
            const newAddress = accounts.length > 0 ? accounts[0] : "";

            const res = await addressLogin({ address: walletStore.walletAddress });
            if (res.data.code === 0) {
                tokenStore.setWalletData(res.data.json);
                walletStore.setWalletAddress(newAddress); // 更新 Pinia
                ElNotification({
                    showClose: false,
                    customClass: "message-logout",
                    title: "Login success",
                    duration: 1000,
                });
            }
        }

        // 监听账户变化
        provider.value.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length === 0) {
                walletStore.clearWalletAddress(); // 清空钱包地址
                // 清空token数据
                tokenStore.clearWalletData();
                ElNotification({
                    showClose: false,
                    customClass: "message-logout",
                    title: "The wallet has been disconnected",
                    duration: 1000,
                });
            } else {
                walletStore.setWalletAddress(accounts[0]); // 更新钱包地址
                ElNotification({
                    showClose: false,
                    customClass: "message-logout",
                    title: "Wallet address has been updated",
                    duration: 1000,
                });
            }
        });

        // 监听钱包断开
        provider.value.on("disconnect", () => {
            walletStore.clearWalletAddress(); // 清空钱包地址
            ElNotification({
                showClose: false,
                customClass: "message-logout",
                title: "The wallet has been disconnected",
                duration: 1000,
            });
            // 清空token数据
            tokenStore.clearWalletData();
        });
    } catch (error) {
        ElNotification({
            showClose: false,
            customClass: "message-logout",
            title: "The connection failed. Please check that the network or wallet plug-in is installed correctly",
            duration: 1000,
        });

    }
};

// 退出钱包
export const logoutWallet = () => {

    provider.value = null;
    web3.value = null;
    useWalletStore().clearWalletAddress();
    useTokenStore().clearWalletData();
    ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: "Exited the wallet ",
        duration: 1000,
    });

};