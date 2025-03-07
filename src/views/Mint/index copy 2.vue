<script setup lang='ts' name="HomeView">
import { ref } from "vue";
import Web3 from "web3";

import usdtAbi from "@/abiU.json";
import useWalletStore from "@/store/modules/home";
import { ElNotification } from "element-plus";
const selectedIndex = ref(null); // 记录选中的索引
const selectItem = (index: any) => {
  selectedIndex.value = index;
};
const items = ref([
  {
    Stage: "WL(5 Per Wallet)",
    ENDSIN: "Feb 05, 2025  20:00",
    Price: "0.05 USDT",
  },
  {
    Stage: "Public(1 Per Wallet)",
    ENDSIN: "Feb 01, 2025  00:00",
    Price: "0.08 USDT",
  },
]);

const number = ref(1); // 初始值为 1

const decrease = () => {
  if (number.value > 1) {
    number.value--; // 数字减 1，最小为 1
  }
};

const increase = () => {
  if (number.value < 99) {
    number.value++; // 数字加 1，最大为 99
  }
};
const loading = ref(false); // 控制按钮 loading 状态
const walletStore = useWalletStore(); // 导入钱包状态
const web3 = new Web3(window.ethereum);

const sendUsdtTransaction = async () => {
  // 控制按钮 loading 状态
  loading.value = true;
  // 检查钱包是否连接
  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: "请连接钱包后再购买电影票",
      duration: 1000,
    });
    loading.value = false;
    return;
  }
  const accounts = await web3.eth.requestAccounts();
  const senderAddress = accounts[0];
  // USDT 合约地址和 ABI

  const usdtContract = new web3.eth.Contract(usdtAbi, senderAddress);

  // 转账金额，假设用户支付 0.01 USDT
  const amount = web3.utils.toWei("0.01", "mwei"); // USDT 使用 mwei 为单位

  const recipientAddress = "0x2a389e217bbe36396fc9bb76ec40021dfa8b3fc3"; // 电影票的接收地址

  // 创建交易参数
  const transactionParameters = {
    from: senderAddress, // 发送方地址
    to: recipientAddress, // 接收方地址电影
    data: usdtContract.methods.transfer(recipientAddress, amount).encodeABI(), // 转账数据
    gas: 200000, // 确保有足够的 gas
  };

  try {
    const txHash = await web3.eth.sendTransaction(transactionParameters);
    console.log("Transaction Hash:交易哈希", txHash);
    return txHash;
  } catch (error) {
    console.error("Transaction failed:", error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="home_view">
    <div class="container">
      <div class="OneImg">
        <img src="@/assets/images/mintbg.png" alt="" />
      </div>
      <div class="all">
        <div class="OGPass">
          <img src="@/assets/images/OGPass.png" alt="" />
        </div>
        <div class="Moive">Moive og pass card</div>
        <div class="box1">
          <div class="item1">Total supply <span>5,555</span></div>
          <div class="item2">
            <img src="@/assets/images/mint1.png" alt="" />
            Arbiturm
          </div>
          <div class="item3">
            <div class="by">by</div>
            <div class="hexagon">
              <img src="@/assets/images/mint2.png" alt="" />
            </div>
            <div class="TIDO">TIDO capital</div>
          </div>
        </div>
        <div class="ThisNd">
          This 2nd Collection from Ordinal Pizza OG which will bring time-linked
          evolving identities designed by @DesenhistaRedn. Each ordinal has a
          day and night form. The curated set of 1/1s was created in partnership
          with notable B...<span>Read more</span>
        </div>
        <div class="Progress">
          <el-progress :percentage="13" color="#E621CA">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">(345/5,555)</span>
            </template>
          </el-progress>
        </div>
        <div class="Selection">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="Selection_item"
            :class="{ active: selectedIndex === index }"
            @click="selectItem(index)"
          >
            <div class="stage">
              <div class="title">Stage</div>
              <div class="text">{{ item.Stage }}</div>
            </div>
            <div class="endsin">
              <div class="title">Starts IN</div>
              <div class="text">{{ item.ENDSIN }}</div>
            </div>
            <div class="price">
              <img src="@/assets/images/eth.png" alt="" />{{ item.Price }}
            </div>
          </div>
        </div>
        <div class="settlement">
          <div class="counting">
            <div class="ADD" @click="decrease">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M14.25 8.5C14.25 8.69891 14.171 8.88968 14.0303 9.03033C13.8897 9.17098 13.6989 9.25 13.5 9.25H2.5C2.30109 9.25 2.11032 9.17098 1.96967 9.03033C1.82902 8.88968 1.75 8.69891 1.75 8.5C1.75 8.30109 1.82902 8.11032 1.96967 7.96967C2.11032 7.82902 2.30109 7.75 2.5 7.75H13.5C13.6989 7.75 13.8897 7.82902 14.0303 7.96967C14.171 8.11032 14.25 8.30109 14.25 8.5Z"
                  fill="#A7A7A7"
                  style="fill-opacity: 1"
                  :style="{ fill: number > 1 ? '#a7a7a7' : '#222222' }"
                />
              </svg>
            </div>
            <div class="number">{{ number }}</div>
            <div class="ADD" @click="increase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M14.25 8.5C14.25 8.69891 14.171 8.88968 14.0303 9.03033C13.8897 9.17098 13.6989 9.25 13.5 9.25H8.75V14C8.75 14.1989 8.67098 14.3897 8.53033 14.5303C8.38968 14.671 8.19891 14.75 8 14.75C7.80109 14.75 7.61032 14.671 7.46967 14.5303C7.32902 14.3897 7.25 14.1989 7.25 14V9.25H2.5C2.30109 9.25 2.11032 9.17098 1.96967 9.03033C1.82902 8.88968 1.75 8.69891 1.75 8.5C1.75 8.30109 1.82902 8.11032 1.96967 7.96967C2.11032 7.82902 2.30109 7.75 2.5 7.75H7.25V3C7.25 2.80109 7.32902 2.61032 7.46967 2.46967C7.61032 2.32902 7.80109 2.25 8 2.25C8.19891 2.25 8.38968 2.32902 8.53033 2.46967C8.67098 2.61032 8.75 2.80109 8.75 3V7.75H13.5C13.6989 7.75 13.8897 7.82902 14.0303 7.96967C14.171 8.11032 14.25 8.30109 14.25 8.5Z"
                  fill="#A7A7A7"
                  style="fill-opacity: 1"
                  :style="{ fill: number < 99 ? '#a7a7a7' : '#222222' }"
                />
              </svg>
            </div>
          </div>
          <div v-loading="loading" style="width: 100%">
            <div class="mintNow" @click="sendUsdtTransaction()">
              Mint now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M14.0306 9.03061L9.53063 13.5306C9.38973 13.6715 9.19863 13.7507 8.99938 13.7507C8.80012 13.7507 8.60902 13.6715 8.46813 13.5306C8.32723 13.3897 8.24807 13.1986 8.24807 12.9994C8.24807 12.8001 8.32723 12.609 8.46813 12.4681L11.6875 9.24999H2.5C2.30109 9.24999 2.11032 9.17097 1.96967 9.03032C1.82902 8.88967 1.75 8.6989 1.75 8.49999C1.75 8.30108 1.82902 8.11031 1.96967 7.96966C2.11032 7.829 2.30109 7.74999 2.5 7.74999H11.6875L8.46937 4.52999C8.32848 4.38909 8.24932 4.19799 8.24932 3.99874C8.24932 3.79948 8.32848 3.60838 8.46937 3.46749C8.61027 3.32659 8.80137 3.24744 9.00062 3.24744C9.19988 3.24744 9.39098 3.32659 9.53187 3.46749L14.0319 7.96749C14.1018 8.03726 14.1573 8.12016 14.1951 8.21142C14.2329 8.30269 14.2523 8.40052 14.2522 8.49931C14.252 8.59809 14.2324 8.69588 14.1944 8.78706C14.1564 8.87824 14.1007 8.96101 14.0306 9.03061Z"
                  fill="#D339C4"
                  style="
                    fill: #d339c4;
                    fill: color(display-p3 0.8292 0.2246 0.7687);
                    fill-opacity: 1;
                  "
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='less'>
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  height: 100%;

  .container {
    padding: 48px 146px 136px 146px;
    width: 100%;
    display: flex;
    gap: 69px;
    .OneImg {
      width: 607px;
      height: 480px;
      flex-shrink: 0;
    }
  }
}
.all {
  .OGPass {
    position: relative;
    z-index: 2;
    width: 147px;
    height: 32px;
  }
  .Moive {
    margin-top: -14px;
    color: #fff;
    font-family: Montserrat;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 49px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .box1 {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 24px;
    .item1 {
      display: flex;
      padding: 6px 8px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-radius: 8px;
      background: #222;
      color: #fff;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: -0.9px;
      text-transform: uppercase;
      span {
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 17px;
        letter-spacing: -0.4px;
        text-transform: uppercase;
      }
    }
    .item2 {
      display: flex;
      padding: 6px 8px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      background: #222;
      color: #fff;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 17px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .item3 {
      display: flex;
      .by {
        color: #aaa;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-right: 16px;
      }
      .hexagon {
        margin-right: 8px;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        mix-blend-mode: plus-darker;
      }
      .TIDO {
        color: #fff;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
      }
    }
  }
  .ThisNd {
    color: #979797;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    max-width: 471px;
    margin-bottom: 26px;
    span {
      color: #e621ca;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
  .Progress {
    margin-bottom: 46px;
    .percentage-value {
      color: #fff;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .percentage-label {
      color: #aaaaaa;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
}
.Selection {
  display: flex;
  gap: 8px;
  flex-direction: column;
  margin-bottom: 24px;
  .Selection_item {
    display: flex;
    padding: 8px 8px 8px 12px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid #2c2c2c;
    opacity: 0.5;
    cursor: pointer;
    .stage,
    .endsin {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .title {
        color: #aaa;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 14px;
      }
      .text {
        color: #fff;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
      }
    }
    .price {
      display: flex;
      padding: 6px 8px;
      align-items: center;
      gap: 6px;
      border-radius: 8px;
      background: #222;
      color: #fff;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  .active {
    border: 1px solid #e621ca;
    opacity: 1;
    .stage {
      .text {
        color: #e621ca;
      }
    }
    .endsin {
      .text {
        color: #fff;
      }
    }
  }
}

.settlement {
  display: flex;
  align-items: center;
  gap: 12px;
  .counting {
    display: flex;
    height: 41px;
    padding: 8px;
    align-items: center;
    gap: 16px;
    border-radius: 8px;
    background: #222;
    .number {
      color: #fff;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .ADD {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .mintNow {
    display: flex;
    width: 100%;
    max-width: 371px;
    padding: 12px 14px 12px 16px;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    background: #fff;
    color: #e621ca;
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 17px;
    text-transform: uppercase;
  }
}

@media (max-width: 1420px) {
  .home_view {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

:deep(.el-loading-mask) {
  background-color: rgba(0, 0, 0, 0.7);
}
:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
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