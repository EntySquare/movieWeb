import { defineStore } from "pinia";

const useWalletStore = defineStore("wallet", {
  state: () => ({
    walletAddress: "", // 存钱包地址
    isWallet: false, // 是否有钱包
    BSC_chain_id: "0x38"
  }),
  actions: {
    setWalletAddress(address: string) {
      this.walletAddress = address;
      this.isWallet = true;
    },
    clearWalletAddress() {
      this.walletAddress = "";
      this.isWallet = false;
    },
  },
});

export default useWalletStore;
