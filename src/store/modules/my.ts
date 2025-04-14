import { defineStore } from 'pinia';

export const useTokenStore = defineStore('my', {
  state: () => ({
    userToken: '',
    toAddress: '',
    contractAddress: '',
    userId: ''
  }),
  actions: {
    setWalletData(data: { userToken: string; toAddress: string; contractAddress: string, userId: string }) {
      this.userToken = data.userToken;
      this.toAddress = data.toAddress;
      this.contractAddress = data.contractAddress;
      this.userId = data.userId;
    },
    clearWalletData() {
      this.userToken = '';
      this.toAddress = '';
      this.contractAddress = '';
      this.userId = '';
    }
  },
  persist: true // 确保数据在刷新页面后仍然保留（需要 pinia-plugin-persistedstate）
});
