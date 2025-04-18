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

      <div class="detail" v-if="selectedProduct">
        <div class="detailLeft">
          <div
            class="BigImg"
            :style="{
              backgroundImage: `url(${selectedProduct.image}) `,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }"
          >
            <!-- <img :src="selectedProduct.image" alt="" /> -->
          </div>
          <div class="title">{{ selectedProduct.name }}</div>
          <div class="participants">
            {{ t("sold") }} {{ selectedProduct.sold }}
          </div>

          <div class="price">
            <div class="priceText">${{ selectedProduct.price }}</div>
            <div class="button" @click="submitForm()">
              {{ t("nav.BuyNow") }}
            </div>
            <div
              @click="addToCart()"
              class="Addbutton"
              :class="{ 'disabled-button': add }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
              >
                <path
                  d="M18.667 11V7.49998C18.667 4.92265 16.5777 2.83331 14.0003 2.83331C11.423 2.83331 9.33368 4.92265 9.33368 7.49998V11M4.19102 12.5773L3.49102 20.0439C3.29199 22.1669 3.19248 23.2284 3.54474 24.0483C3.8542 24.7685 4.39649 25.3641 5.0847 25.7394C5.86813 26.1666 6.93428 26.1666 9.06657 26.1666H18.9341C21.0664 26.1666 22.1326 26.1666 22.916 25.7394C23.6042 25.3641 24.1465 24.7685 24.456 24.0483C24.8082 23.2284 24.7087 22.1669 24.5097 20.0439L23.8097 12.5773C23.6416 10.7846 23.5576 9.88819 23.1544 9.2105C22.7993 8.61366 22.2747 8.13594 21.6474 7.83813C20.935 7.49998 20.0347 7.49998 18.2341 7.49998L9.76657 7.49998C7.96599 7.49998 7.0657 7.49998 6.35334 7.83813C5.72596 8.13594 5.20136 8.61366 4.84629 9.2105C4.44312 9.88819 4.35909 10.7845 4.19102 12.5773Z"
                  stroke="white"
                  style="stroke: white; stroke-opacity: 1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  addGoodsCart,
  displayDetailsGoods,
  purchaseGoods,
  scanPurchaseStatus,
} from "@/api/shop";
import router from "@/router";
import useWalletStore from "@/store/modules/wallet";
import { useProductStore } from "@/store/modules/product";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import usdtAbi from "@/abiU.json";
import { useRoute } from "vue-router";
import Web3 from "web3";
import { useTokenStore } from "@/store/modules/my";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const route = useRoute();
const search = route.query.search;
const itemId = route.query.id; // 获取 id

const newProduct = ref(); // 存储所有商品数据
const selectedProduct = ref(); // 存储匹配到的商品
const getNewProductData = async (search: any) => {
  loading.value = true;
  const res = await displayDetailsGoods({ search });
  newProduct.value = res.data.json.displayDetailsGoodsList;

  // 过滤匹配的商品
  selectedProduct.value = newProduct.value.find(
    (item: any) => item.goodsId == itemId
  );

  try {
    const res = await displayDetailsGoods({ search });
    if (res.data.code === 0) {
      newProduct.value = res.data.json.displayDetailsGoodsList;
      // 过滤匹配的商品
      selectedProduct.value = newProduct.value.find(
        (item: any) => item.goodsId == itemId
      );
    } else {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title:
          locale.value === "zh"
            ? res.data.json.message_zh
            : res.data.json.message,
        duration: 2000,
      });
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el35"),
      duration: 2000,
    });
  }
};
onMounted(async () => {
  if (search === "New") {
    getNewProductData("");
  }
  if (search === "All goods") {
    getNewProductData("");
  }
  if (search === "Hot") {
    getNewProductData("hot");
  }
  // getCartList();
});
// const getCartList = async () => {
//   const res = await displayGoodsCart();
//   goodsCartList.value = res.data.json.goodsCartList;
// };

const loading = ref(false);
const add = ref(false);

const walletStore = useWalletStore(); // 导入钱包状态
const web3 = new Web3(window.ethereum);

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

  const accounts = await web3.eth.requestAccounts();
  const senderAddress = accounts[0];

  // BSC 主网 USDT 合约地址
  const usdtContract = new web3.eth.Contract(
    usdtAbi,
    "0x55d398326f99059fF775485246999027B3197955"
  );

  // 计算 USDT 转账金额（USDT 使用 6 位小数）
  const amount = web3.utils.toWei(
    selectedProduct.value.price.toString(),
    "ether"
  );
  // 电影票接收地址
  const recipientAddress = useTokenStore().toAddress;

  // 余额验证
  const bnbBalance = await web3.eth.getBalance(senderAddress);
  const usdtBalance = await usdtContract.methods
    .balanceOf(senderAddress)
    .call();

  if (Number(usdtBalance) < Number(amount)) {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el4"),
      duration: 5000,
    });
    loading.value = false;
    return;
  }

  // 计算 Gas 费
  const baseGasPrice = await web3.eth.getGasPrice();

  const estimatedGas = await usdtContract.methods
    .transfer(recipientAddress, amount)
    .estimateGas({ from: senderAddress });

  const gasParams = {
    gasPrice: Math.floor(Number(baseGasPrice) * 1.2), // 20%缓冲
    gasLimit: Math.floor(Number(estimatedGas) * 1.5), // 50%余量
  };

  try {
    const txHash = await usdtContract.methods
      .transfer(recipientAddress, amount)
      .send({
        from: senderAddress,
        gasPrice: gasParams.gasPrice.toString(),
        gas: web3.utils.toHex(gasParams.gasLimit),
      });

    const res = await purchaseGoods({
      cartsId: selectedProduct.value?.cartId || "", // 如果你是直接购买 不走购物车，就给“”
      goodsId: selectedProduct.value.goodsId,
      number: "1",
      amount: selectedProduct.value.price.toString(),
      hash: txHash.transactionHash,
      from: senderAddress,
      payType: 3, // 1 表示 PayPal
      remarks: "", // remarks是备注，你传空就行
    });

    if (res.data.code === 0) {
      const res1 = await scanPurchaseStatus({
        payType: 3,
        address: senderAddress,
        hash: txHash.transactionHash,
      });

      if (res1.data.code === 0) {
        ElNotification({
          dangerouslyUseHTMLString: true,
          customClass: "message-logout",
          title: selectedProduct.value.title + t("ElNoti.el5"),
          message: `<div style="display: flex; align-items: center;justify-content: space-between;">
            <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">
             ${t("ElNoti.el6")}
            </div>
            <div id="verify-link" style="display: flex; align-items: center; color: #e621ca; cursor: pointer;">
             ${t("ElNoti.el7")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10.0895 7.46427L5.71452 11.8393C5.59123 11.9626 5.42402 12.0318 5.24967 12.0318C5.07532 12.0318 4.90811 11.9626 4.78483 11.8393C4.66155 11.716 4.59229 11.5488 4.59229 11.3744C4.59229 11.2001 4.66155 11.0329 4.78483 10.9096L8.69553 6.99998L4.78592 3.08927C4.72488 3.02823 4.67646 2.95576 4.64342 2.876C4.61038 2.79624 4.59338 2.71076 4.59338 2.62443C4.59338 2.5381 4.61038 2.45262 4.64342 2.37286C4.67646 2.2931 4.72488 2.22063 4.78592 2.15959C4.84697 2.09854 4.91944 2.05012 4.9992 2.01708C5.07895 1.98404 5.16444 1.96704 5.25077 1.96704C5.3371 1.96704 5.42258 1.98404 5.50234 2.01708C5.5821 2.05012 5.65457 2.09854 5.71561 2.15959L10.0906 6.53459C10.1517 6.59563 10.2002 6.66813 10.2332 6.74794C10.2662 6.82774 10.2832 6.91328 10.2831 6.99966C10.283 7.08603 10.2658 7.17153 10.2326 7.25126C10.1994 7.33099 10.1508 7.40338 10.0895 7.46427Z" fill="#D339C4"/>
              </svg>
            </div>
          </div>`,
          duration: 60000,
        });
        useProductStore().setHash(txHash.transactionHash);
        router.push("/newBuy");
        loading.value = false;
      } else {
        ElNotification({
          showClose: false,
          customClass: "message-logout",
          title:
            locale.value === "zh"
              ? res.data.json.message_zh
              : res.data.json.message,
          duration: 5000,
        });
      }
    } else {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title:
          locale.value === "zh"
            ? res.data.json.message_zh
            : res.data.json.message,
        duration: 5000,
      });
    }
  } catch (error: any) {
    console.error("交易失败:", error);

    if (error.message.includes("TransactionBlockTimeoutError")) {
      ElNotification({
        showClose: true,
        customClass: "message-logout",
        title: t("ElNoti.el16"),
        message: t("ElNoti.el17"),
        duration: 5000,
      });
    }
  } finally {
    loading.value = false;
  }
};
const addToCart = async () => {
  loading.value = true;
  const res = await addGoodsCart({
    number: 1,
    goodsId: selectedProduct.value.goodsId,
  });
  if (res.data.code === 0) {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el18"),
      duration: 1000,
    });
    loading.value = false;
  } else {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title:
        locale.value === "zh"
          ? res.data.json.message_zh
          : res.data.json.message,
      duration: 1000,
    });
    loading.value = false;
  }
};
</script>

<style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  // height: 100%;

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
      padding: 20px !important;
      .detail {
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