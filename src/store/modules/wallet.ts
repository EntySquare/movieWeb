import { defineStore } from "pinia";
import { useReferralContract } from "@/api/contract/referral";

const referralContract = useReferralContract();

const useWalletStore = defineStore("wallet", {
  state: () => ({
    walletAddress: "", // 存钱包地址
    referralAddress: "0x0000000000000000000000000000000000000000", // 推荐人地址
    isWallet: false, // 是否有钱包
    BSC_chain_id: "0x38",
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
    async getReferralAddress(address: string) {
      try {
        if (address != "" && address != null && address != undefined) {
          const address = await referralContract.getReferrer(
            this.walletAddress
          );
          this.referralAddress = address;
        } else {
          this.referralAddress = "0x0000000000000000000000000000000000000000";
        }
      } catch (error) {}
    },
    setReferralAddress(address: string) {
      this.referralAddress = address;
    },
    clearReferralAddress() {
      this.referralAddress = "0x0000000000000000000000000000000000000000";
    },
  },
});

export default useWalletStore;
