import { defineStore } from 'pinia';

export const useTokenStore = defineStore('my', {
  state: () => ({
    userToken: '',
    toAddress: '',
    contractAddress: ''
  }),
  actions: {
    setWalletData(data: { userToken: string; toAddress: string; contractAddress: string }) {
      this.userToken = data.userToken;
      this.toAddress = data.toAddress;
      this.contractAddress = data.contractAddress;
    },
    clearWalletData() {
      this.userToken = '';
      this.toAddress = '';
      this.contractAddress = '';
      }
  },
  persist: true // 确保数据在刷新页面后仍然保留（需要 pinia-plugin-persistedstate）
});
