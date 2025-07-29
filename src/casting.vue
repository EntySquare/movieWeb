<script setup lang="ts" name="HomeView">
import { useWindowSize } from "@/utils/useWindowSize";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { addressReduce } from "@/utils/web3";
import { useMovieNFTContract } from "@/api/contract/movieNFT";
import useWalletStore from "@/store/modules/wallet";

const walletStore = useWalletStore();
const { ethereum } = window as any;
const route = useRoute();
const movieNFTContract = useMovieNFTContract();
const castingCode = ref(route.query.castingCode || "");
const walletAddress = ref("");
const castingLoading = ref(false);
const linkWalletLoading = ref(false);

onMounted(async () => {
  if (ethereum) {
    ethereum.on("accountsChanged", handleAccountsChanged);
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    // 处理某些平台兼容问题
    if (accounts[0] !== walletStore.walletAddress) {
      walletAddress.value = "";
      linkWallet();
    } else if (accounts[0] && accounts[0] === walletStore.walletAddress) {
      walletAddress.value = addressReduce(accounts[0]);
    }
  }
});

const handleAccountsChanged = async (accounts: any) => {
  if (accounts[0] === localStorage.getItem("wallet_address")) {
    return;
  }
  walletAddress.value = "";
  localStorage.setItem("wallet_address", "");
  // window.location.reload();
};

//链接钱包
const linkWallet = async () => {
  if (!ethereum) {
    ElMessage({
      showClose: true,
      message: "Please download and install the wallet plugin first",
      type: "error",
    });
    return;
  }
  linkWalletLoading.value = true;
  try {
    //获取网络ID
    const chain = await ethereum.request({ method: "eth_chainId" });
    if (chain !== "0x38") {
      // 切换BSC网络
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
      } catch (switchError) {
        return;
      }
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      localStorage.setItem("wallet_address", accounts[0]);
      walletAddress.value = accounts[0] || "";
    } catch (error) {}
  } catch (error) {
  } finally {
    linkWalletLoading.value = false;
  }
};

//铸造
const castingPut = async () => {
  if (castingCode.value === "") {
    ElMessage({
      showClose: true,
      message: "NFT Casting Code is null",
      type: "error",
    });
    return;
  }
  try {
    castingLoading.value = true;
    await movieNFTContract.claimNFT(castingCode.value);
    ElMessage({
      showClose: true,
      message: "Casting Success",
      type: "success",
    });
    window.open("https://movieai.me/nft", "_blank");
  } catch (error: any) {
    ElMessage({
      showClose: true,
      message: error.reason || "",
      type: "error",
    });
  } finally {
    castingLoading.value = false;
  }
};
</script>
<template>
  <div class="home_view">
    <div
      style="
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <div class="share_content" @click.stop="">
        <div>Casting NFT</div>
        <div>
          After using the NFT casting code, it will be bound to the wallet, and
          the same NFT casting code cannot be repeatedly bound!
        </div>
        <div></div>
        <div>
          <div>NFT Casting Code</div>
        </div>
        <div>
          {{ castingCode || "" }}
        </div>
        <el-button
          type="primary"
          style="
            padding: 8px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 1);
            border-radius: 8px;
            color: #d339c4;
            text-align: center;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            text-transform: uppercase;
            cursor: pointer;
            margin-top: 32px;
          "
          v-if="walletAddress === ''"
          @click="linkWallet"
          :loading="linkWalletLoading"
          >Link Wallet</el-button
        >
        <el-button
          type="primary"
          style="
            padding: 8px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 1);
            border-radius: 8px;
            color: #d339c4;
            text-align: center;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            text-transform: uppercase;
            cursor: pointer;
            margin-top: 32px;
          "
          v-else
          :loading="castingLoading"
          @click="castingPut"
          >Casting</el-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.home_view {
  flex: 1;
  display: flex;
  .share_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: 1px solid #c166b8;
    background: #1a0014;
    box-shadow: 0px 1px 6px 0px rgba(255, 120, 219, 0.54) inset,
      0px 0px 40px 0px rgba(211, 57, 196, 0.28) inset;
    padding: 40px 27px;
    & > div {
      &:first-child {
        color: #d339c4;
        font-family: Montserrat;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 36px */
        text-transform: uppercase;
      }
      &:nth-child(2) {
        max-width: 240px;
        margin-top: 4px;
        color: rgba(255, 255, 255, 0.8);
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 21px */
      }
      &:nth-child(3) {
        width: 266px;
        height: 1px;
        background-color: rgba(222, 158, 215, 0.2);
        margin: 32px 0;
      }
      &:nth-child(4) {
        width: 240px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 21px */
        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      &:nth-child(5) {
        max-width: 240px;
        // overflow: hidden;
        color: rgba(255, 255, 255, 0.5);
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-line-clamp: 2;
        // -webkit-box-orient: vertical;
        font-family: Montserrat;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 18px */
        margin-top: 8px;
        word-break: break-all;
        overflow-wrap: break-word;
        white-space: normal;
      }
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    .share_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      border: 1px solid #c166b8;
      background: #1a0014;
      box-shadow: 0px 1px 6px 0px rgba(255, 120, 219, 0.54) inset,
        0px 0px 40px 0px rgba(211, 57, 196, 0.28) inset;
      padding: 40px 27px;
      & > div {
        &:first-child {
          color: #d339c4;
          font-family: Montserrat;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 150%; /* 36px */
          text-transform: uppercase;
        }
        &:nth-child(2) {
          max-width: 240px;
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.8);
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 21px */
        }
        &:nth-child(3) {
          width: 266px;
          height: 1px;
          background-color: rgba(222, 158, 215, 0.2);
          margin: 32px 0;
        }
        &:nth-child(4) {
          width: 240px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 21px */
          img {
            width: 16px;
            height: 16px;
            cursor: pointer;
          }
        }
        &:nth-child(5) {
          max-width: 240px;
          overflow: hidden;
          color: rgba(255, 255, 255, 0.5);
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-family: Montserrat;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 18px */
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
