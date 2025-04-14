<template>
  <div class="home_view">
    <div class="container" v-loading="loading">
      <div style="width: 100%">
        <div class="back" @click="$router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M13.1633 15.5867C13.3394 15.7628 13.4384 16.0017 13.4384 16.2508C13.4384 16.4999 13.3394 16.7387 13.1633 16.9148C12.9872 17.091 12.7483 17.1899 12.4992 17.1899C12.2502 17.1899 12.0113 17.091 11.8352 16.9148L5.58519 10.6648C5.49779 10.5777 5.42844 10.4743 5.38112 10.3603C5.33381 10.2463 5.30945 10.1242 5.30945 10.0008C5.30945 9.87739 5.33381 9.75522 5.38112 9.64126C5.42844 9.52731 5.49779 9.42381 5.58519 9.33672L11.8352 3.08672C12.0113 2.9106 12.2502 2.81165 12.4992 2.81165C12.7483 2.81165 12.9872 2.9106 13.1633 3.08672C13.3394 3.26284 13.4384 3.50171 13.4384 3.75078C13.4384 3.99985 13.3394 4.23872 13.1633 4.41484L7.57816 10L13.1633 15.5867Z"
              fill="white"
              fill-opacity="0.8"
              style="fill: white; fill-opacity: 0.8"
            />
          </svg>
          {{ t("back") }}
        </div>
      </div>

      <div class="detail" v-if="list">
        <div class="detailLeft">
          <div
            class="BigImg"
            :style="{
              backgroundImage: `url(${list.image}) `,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }"
          ></div>
          <div class="title">{{ list.name }}</div>

          <div class="price">
            <div class="priceText">${{ list.price }}</div>
            <div class="button" @click="submitForm()">
              {{ t("nav.BuyNow") }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="NoData"
        style="
          font-size: 20px;
          text-align: center;
          color: #e621ca;
          margin-top: 60px;
        "
        v-else
      >
        {{ t("noData") }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useWalletStore from "@/store/modules/wallet";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import nftAbi from "@/abiN.json";
import UAbi from "@/abiU.json";
import { useRoute } from "vue-router";
import Web3 from "web3";
import { useI18n } from "vue-i18n";
import { buyUserMint, displayNFTForSale } from "@/api/nft";
import router from "@/router";
const { t } = useI18n();
const route = useRoute();
const itemId = route.query.id; // 获取 id
const loading = ref(false);

// 类型
interface NFT {
  cover: string;
  describe: string;
  image: string;
  name: string;
  price: string;
  status: string; // 上架
  title: string;
  tokenId: string;
}
const authorizedAmount = ref("0");
const nftData = ref();
const list = ref<NFT>();
const getNftData = async () => {
  loading.value = true;
  const res = await displayNFTForSale();
  nftData.value = res.data.json;
  if (nftData.value.length > 0) {
    list.value = nftData.value.find((item: any) => item.tokenId == itemId);
    authorizedAmount.value = list.value!.price;
  }
  loading.value = false;
};
onMounted(async () => {
  getNftData();
});

const walletStore = useWalletStore(); // 导入钱包状态

const web3 = new Web3(window.ethereum);
const contractAddress = "0xC45a6408C1DA7db5BbFF5BC7c6Ef003D22474B74"; // NFT合约地址   授权合约地址
// BSC 主网 USDT 地址
const USDTAddress = "0x55d398326f99059fF775485246999027B3197955";

async function approveUSDT(): Promise<boolean> {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const userAddress = accounts[0];

    const tokenContract = new web3.eth.Contract(UAbi, USDTAddress);

    // 获取当前授权额度
    const allowanceRaw = (await tokenContract.methods
      .allowance(userAddress, contractAddress)
      .call()) as any;
    const amountToApprove = web3.utils.toWei(authorizedAmount.value, "ether"); // 授权金额

    // 如果授权额度足够，就直接返回 true
    if (BigInt(allowanceRaw) >= BigInt(amountToApprove)) {
      return true;
    }
    // 发送授权交易
    const tx = await tokenContract.methods
      .approve(contractAddress, amountToApprove)
      .send({ from: userAddress });
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el32"),
      duration: 3000,
    });

    return true; // 授权成功，返回 true
  } catch (error) {
    console.error("授权失败:", error);
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el33"),
      duration: 3000,
    });
    return false; // 授权失败，返回 false
  }
}

const submitForm = async () => {
  loading.value = true;

  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el2"),
      duration: 1000,
    });
    loading.value = false;
    return;
  }
  // 检查当前网络是否为 BSC 主网
  const networkId = await web3.eth.net.getId();
  if (networkId !== 56n) {
    ElNotification({
      showClose: true,
      customClass: "message-logout",
      title: t("ElNoti.el3"),
      duration: 5000,
    });
    loading.value = false;
    return;
  }
  const isApproved = await approveUSDT();
  if (!isApproved) {
    loading.value = false;
    return;
  }
  try {
    // 实例化合约
    const contract = new web3.eth.Contract(nftAbi, contractAddress);
    // 购买 NFT
    const tx = await contract.methods
      .buyNFT(parseInt(list.value!.tokenId))
      .send({
        from: walletStore.walletAddress,
      });
    console.log("tx", tx);
    router.push({ path: "/nft" });

    // tokenid 就是商品列表信息里那个 tokenid。sellhash 是你掉合约成功后得到的 hash
    try {
      const res = await buyUserMint({
        tokenid: parseInt(list.value!.tokenId),
        sellhash: tx.transactionHash,
      });
      if (res.data.code === 0) {
        ElNotification({
          showClose: false, // 是否显示右上角关闭按钮
          customClass: "message-logout",
          title: t("ElNoti.el6"),
          duration: 5000,
        });
        loading.value = false;
      } else {
        ElNotification({
          showClose: false,
          customClass: "message-logout",
          title: t("ElNoti.el15"),
          duration: 5000,
        });
        loading.value = false;
      }
    } catch (error) {
      console.log("buyUserMint error", error);

      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: t("ElNoti.el15"),
        duration: 5000,
      });
      loading.value = false;
    }
  } catch (error: any) {
    if (
      error.code === 4001 ||
      error.message.includes("User denied transaction signature")
    ) {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: t("ElNoti.el13"),
        duration: 1000,
      });
      loading.value = false;
      return;
    } else {
      console.error("交易失败:", error);
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: t("ElNoti.el34"),
        duration: 1000,
      });
      loading.value = false;
    }
  }
};
</script>
  
  <style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  height: 100vh;

  .container {
    padding: 43px 120px 153px 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.back {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
  margin-bottom: 30px;
}
.detail {
  display: flex;
  gap: 36px;
  .detailLeft {
    .BigImg {
      border-radius: 4px;
      width: 550px;
      height: 550px;
      margin-bottom: 32px;
      background: #121212;
      img {
        border-radius: 4px;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      color: #fff;
      font-family: Rubik;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.96px;
      text-transform: uppercase;
      margin-bottom: 12px;
      max-width: 550px;
    }
    .participants {
      color: rgba(255, 255, 255, 0.6);
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 0.56px;
      margin-bottom: 32px;
    }
    .time {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px; /* 100% */
      margin-bottom: 32px;
    }
    .price {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 30px;
      .priceText {
        color: #e621ca;
        font-family: Rubik;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 91.667% */
      }
      .button {
        cursor: pointer;
        border-radius: 999px;
        background: #e621ca;
        display: flex;
        height: 35px;
        padding: 10px;
        justify-content: center;
        align-items: center;
        flex: 1 0 0;
        color: #fff;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px; /* 114.286% */
        letter-spacing: -0.28px;
        text-transform: uppercase;
      }
      .Addbutton {
        cursor: pointer;
      }
      /* 禁用样式 */
      .disabled-button {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  .detailRight {
    .host {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #fff;
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px; /* 87.5% */
      margin-bottom: 16px;
    }
    .USDTurl {
      display: flex;
      align-items: center;
      gap: 16px;
      .item {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      margin-bottom: 26px;
    }
    .posiTop {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #fff;
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px; /* 87.5% */
      margin-bottom: 8px;
    }
    .posiBottom {
      color: rgba(255, 255, 255, 0.6);

      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px; /* 116.667% */
      margin-bottom: 16px;
    }
    .MapKit {
      cursor: pointer;
      width: 350px;
      height: 120px;
      border-radius: 16px;
      background: #121212;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #5e5e5e;
      text-align: center;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px; /* 116.667% */
      margin-bottom: 26px;
    }
    .about {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #fff;
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px; /* 87.5% */
      margin-bottom: 8px;
    }
    .Brief {
      color: #fff;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 14px; /* 116.667% */
      letter-spacing: -0.24px;
      width: 350px;
    }
  }
}

.cart {
  position: fixed;
  top: 72px;
  // right: 80px;
  right: -320px;
  transition: right 0.3s ease-in-out; /* 过渡动画 */
  z-index: 10;
  display: flex;
  width: 321px;
  height: 443px;
  padding: 16px 12px;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  border-radius: 16px;
  background: #1d1d1d;
  .cartTitle {
    color: #fff;
    font-family: Rubik;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.64px;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      margin-bottom: 16px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .cartList {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-height: 234px;
    overflow-y: auto; /* 允许垂直滚动 */
    scrollbar-width: none; /* Firefox 隐藏滚动条 */
    -ms-overflow-style: none; /* IE/Edge 隐藏滚动条 */
    padding-bottom: 12px;
    .cartItem {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      .custom-radio {
        margin: 0;
        padding: 0;
      }
      .cartItemImg {
        width: 60px;
        height: 60px;
        aspect-ratio: 1/1;
        border-radius: 8px;
        background: #282828;
      }
      .text {
        margin-left: 12px;
        margin-right: 12px;
        .cartItemName {
          margin-bottom: 8px;
          color: #fff;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.64px;
          text-transform: uppercase;
        }
        .cartItemPN {
          display: flex;
          align-items: center;
          gap: 4px;
          .cartItemPrice {
            color: #e621ca;
            font-family: Rubik;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 22px; /* 137.5% */
          }
          .cartItemNum {
            color: #fff;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.64px;
            text-transform: uppercase;
          }
        }
      }
    }
  }
  .cartList::-webkit-scrollbar {
    width: 0; /* 让滚动条占位但不可见 */
    height: 0;
  }

  .SubtotalAll {
    width: 100%;
    border-top: 1px solid #2e2e2e;
    padding-top: 12px;
    .Subtotal {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      .SubtotalTitle {
        color: #fff;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 137.5% */
      }
      .SubtotalPrice {
        color: #e621ca;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 137.5% */
      }
    }
    .SubtotalBtn {
      display: flex;
      width: 100%;
      height: 35px;
      padding: 10px;
      justify-content: center;
      align-items: center;
      border-radius: 999px;
      background: #e621ca;
      color: #fff;
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px; /* 114.286% */
      letter-spacing: -0.28px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
}
.active {
  right: 80px;
  transition: right 0.3s ease-in-out; /* 过渡动画 */
}

:deep(.el-loading-mask) {
  background-color: rgba(0, 0, 0, 0.7);
}
:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}
:deep(.el-radio__inner) {
  background: #1d1d1d;
  width: 18px;
  height: 18px;
  &:hover {
    border: 1px solid #e621ca;
  }
}
:deep(.el-radio__input.is-checked .el-radio__inner) {
  background: #e621ca;
  border: 1px solid #e621ca;
}
:deep(.el-radio__inner:after) {
  top: 47.5%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.el-input-number {
  width: 78px;
}
:deep(.el-input) {
  background: #1d1d1d;
  --el-input-inner-height: 20px;
}
:deep(.el-input__wrapper) {
  background: #1d1d1d;
  padding: 0 20px;
  border: none !important;
  box-shadow: none !important;
}
:deep(.el-input-number__increase) {
  background: #1d1d1d;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  top: -1px;
}

:deep(.el-input__inner) {
  width: 20px;
}
:deep(.el-input-number__decrease) {
  top: -1px;
  background: #1d1d1d;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
:deep(.el-icon) {
  color: #fff;
  width: 12px;
  height: 12px;
  margin-top: -2px;
  margin-left: 0px;
}
:deep(.el-input-number__decrease:hover) {
  border: 1px solid #e621ca;
  color: #e621ca;
}
:deep(.el-input-number__increase:hover) {
  border: 1px solid #e621ca;
  color: #e621ca;
}
@media (max-width: 824px) {
  .home_view {
    .container {
      width: 100%;
      padding: 20px !important;
      .detail {
        width: 100%;
        flex-wrap: wrap;
        .detailLeft {
          width: 100%;

          .BigImg {
            width: 100%;
          }
        }
      }
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    .container {
      width: 100%;
      padding: 20px !important;
      .detail {
        width: 100%;
        flex-wrap: wrap;
        .detailLeft {
          width: 100%;

          .BigImg {
            width: 100%;
            height: 300px;
          }
        }
      }
    }
  }
}

</style>
  
  <style>
.message-logout {
  top: 104px !important;
  right: 24px !important;
  background: #000;
  color: #fff;
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.56px;
  border-radius: 11px;
  border: 1px solid rgba(107, 107, 107, 0.4);
  background: rgb(26, 26, 26);
  width: 328px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.el-notification__title {
  color: #fff;
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.56px;
}
</style>
  