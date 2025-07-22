<template>
  <div class="home_view">
    <div class="container" v-loading="loading">
      <div class="container_head">
        <div class="container_head_search">
          <el-input
            v-model="searchName"
            style="width: 204px"
            placeholder="Search collection"
          />
          <div class="chs_btn">
            <img src="@/assets/images/nft/img1.png" alt="" />
          </div>
        </div>
        <div class="container_head_imgs">
          <div class="chi_item" @click="defaultIndex = 0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3.00098 3C2.4487 3 2.00098 3.44772 2.00098 4V8H7.50098V3H3.00098ZM9.50098 3V8H14.501V3H9.50098ZM16.501 3V8H22.001V4C22.001 3.44772 21.5533 3 21.001 3H16.501ZM22.001 10H16.501V14H22.001V10ZM22.001 16H16.501V21H21.001C21.5533 21 22.001 20.5523 22.001 20V16ZM14.501 21V16H9.50098V21H14.501ZM7.50098 21V16H2.00098V20C2.00098 20.5523 2.4487 21 3.00098 21H7.50098ZM2.00098 14H7.50098V10H2.00098V14ZM9.50098 10H14.501V14H9.50098V10Z"
                :fill="defaultIndex === 0 ? '#D339C4' : 'white'"
                fill-opacity="0.5"
              />
            </svg>
          </div>
          <div class="chi_item" @click="defaultIndex = 1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                :fill="defaultIndex === 1 ? '#D339C4' : 'white'"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="container_content" v-if="defaultIndex === 0">
        <div
          class="container_content_item"
          v-for="(item, index) in 20"
          :key="index"
          @mouseenter="checkIndex = index"
          @mouseleave="checkIndex = -1"
        >
          <div class="cci_img">
            <img src="@/assets/images/nft/test.png" alt="" />
            <div>1</div>
          </div>
          <div
            class="cci_btn"
            v-if="checkIndex === index"
            @click="showTransactionVisible(item)"
          >
            Buy
          </div>
          <div class="cci_price" v-else>999 USDT</div>
        </div>
      </div>
      <div class="container_content_list" v-if="defaultIndex === 1">
        <div class="ccl_head">
          <div>Item</div>
          <div>Rarity</div>
          <div>Price</div>
        </div>
        <div
          v-for="(item, index) in 20"
          :key="index"
          class="ccl_item"
          @click="showTransactionVisible(item)"
        >
          <div class="ccl_item_img">
            <img src="@/assets/images/nft/test.png" alt="" />
            <div>AO BING</div>
          </div>
          <div class="ccl_item_rarity"><div>1</div></div>
          <div class="ccl_item_price">
            <div>
              999 USDT <img src="@/assets/images/nft/img2.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="transactionVisible"
      style="
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      "
      @click="transactionVisible = false"
    >
      <div class="transaction_content" @click.stop="">
        <div class="transaction_content_head">
          <div class="tch_name">AO BING</div>
          <div class="tch_imgs">
            <img src="@/assets/images/nft/img3.png" alt="" />
            <img src="@/assets/images/nft/img4.png" alt="" />
            <img
              src="@/assets/images/nft/img5.png"
              alt=""
              @click="transactionVisible = false"
            />
          </div>
        </div>
        <div class="transaction_content_section">
          <div class="tcs_img">
            <img src="@/assets/images/nft/test.png" alt="" />
          </div>
          <div class="tcs_transaction">
            <div class="tcst_head">
              <div class="tcst_head_title">best Price</div>
              <div class="tcst_head_price">999 <span>USDT</span></div>
              <div class="tcst_head_amount_title">Amount</div>
              <div class="tcst_head_input_price">
                <input
                  type="number"
                  placeholder="Set Price"
                  v-model="transactionPrice"
                />
              </div>
              <div class="tcst_head_input_amount">
                <img
                  src="@/assets/images/nft/img6.png"
                  alt=""
                  @click="
                    () => {
                      if (transactionAmount <= 1) return;
                      transactionAmount -= 1;
                    }
                  "
                />
                <input
                  type="number"
                  placeholder="Set Amount"
                  v-model="transactionAmount"
                />
                <img
                  src="@/assets/images/nft/img7.png"
                  alt=""
                  @click="transactionAmount += 1"
                />
              </div>
              <div class="tcst_head_btn">
                <div @click="buyNft">Buy</div>
                <div @click="sellNft">Make Offer</div>
              </div>
            </div>
            <div class="tcst_detail">
              <div class="tcst_detail_head">
                <div>Detail</div>
                <img src="@/assets/images/nft/img8.png" alt="" />
              </div>
              <div class="tcst_detail_item">
                <div>Token ID</div>
                <div>4025962</div>
              </div>
              <div class="tcst_detail_item">
                <div>Token Standard</div>
                <div>ERC-721</div>
              </div>
              <div class="tcst_detail_item">
                <div>Royalty</div>
                <div>10%</div>
              </div>
              <div class="tcst_detail_item">
                <div>Rarity</div>
                <div>1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { displayNFTForSale } from "@/api/nft";
import router from "@/router";
import { ElNotification, ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import useWalletStore from "@/store/modules/wallet";

const { t, locale } = useI18n();
const walletStore = useWalletStore();
const loading = ref(false);
const searchName = ref("");
const defaultIndex = ref(0);
const checkIndex = ref(-1);
const transactionVisible = ref(false);
const transactionPrice = ref("");
const transactionAmount = ref(1);

onMounted(() => {});

const buyNft = () => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  if (transactionPrice.value === "" || Number(transactionPrice.value) <= 0) {
    ElMessage({
      showClose: true,
      message: "Please Set Price",
      type: "error",
    });
    return;
  }
  if (Number(transactionAmount.value) <= 0) {
    ElMessage({
      showClose: true,
      message: "Please Set Amount",
      type: "error",
    });
    return;
  }
};

const sellNft = () => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  if (transactionPrice.value === "" || Number(transactionPrice.value) <= 0) {
    ElMessage({
      showClose: true,
      message: "Please Set Price",
      type: "error",
    });
    return;
  }
  if (Number(transactionAmount.value) <= 0) {
    ElMessage({
      showClose: true,
      message: "Please Set Amount",
      type: "error",
    });
    return;
  }
};

const showTransactionVisible = (item: any) => {
  transactionPrice.value = "";
  transactionAmount.value = 1;
  transactionVisible.value = true;
};
</script>

<style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  flex: 1;

  .container {
    height: 100%;
    padding: 0px 80px;
    .container_head {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      .container_head_search {
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        .chs_btn {
          width: 36px;
          height: 36px;
          background-color: rgba(211, 57, 196, 1);
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          img {
            width: 14px;
            height: 14px;
          }
        }
      }
      .container_head_imgs {
        display: flex;
        align-items: center;
        gap: 12px;
        .chi_item {
          width: 24px;
          height: 24px;
          svg {
            cursor: pointer;
          }
        }
      }
    }
    .container_content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      .container_content_item {
        width: 154px;
        background-color: rgba(20, 20, 20, 1);
        border: 1px solid rgba(41, 41, 41, 1);
        border-radius: 8px;
        cursor: pointer;
        .cci_img {
          width: 154px;
          height: 154px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          div {
            width: 43px;
            height: 24px;
            border-radius: 2px;
            background: #1e1e1e;
            color: #fff;
            /* Text sm/Medium */
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 12px;
            bottom: 12px;
          }
        }
        .cci_btn {
          width: 138px;
          height: 32px;
          margin: 11px 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 49px;
          background: #d339c4;
          color: #fff;
          font-family: Roboto;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          cursor: pointer;
        }
        .cci_price {
          padding: 16px 8px;
          color: #fff;
          font-family: Roboto;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
    }
    .container_content_list {
      .ccl_head {
        width: 100%;
        border-bottom: 1px solid rgba(41, 41, 41, 1);
        display: flex;
        align-items: center;
        div {
          padding: 12px 0px;
          box-sizing: border-box;
          color: rgba(255, 255, 255, 0.5);
          /* Text xs/Medium */
          font-family: Inter;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 18px; /* 150% */
          &:first-child {
            min-width: 163px;
            max-width: 163px;
          }
          &:nth-child(2) {
            min-width: 120px;
            max-width: 120px;
          }
        }
      }
      .ccl_item {
        width: 100%;
        height: 72px;
        border-bottom: 1px solid rgba(41, 41, 41, 1);
        display: flex;
        align-items: center;
        cursor: pointer;
        .ccl_item_img {
          min-width: 163px;
          max-width: 163px;
          display: flex;
          align-items: center;
          gap: 12px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
          div {
            color: #fff;
            /* Text sm/Medium */
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
          }
        }
        .ccl_item_rarity {
          min-width: 120px;
          max-width: 120px;
          div {
            width: 43px;
            height: 24px;
            border-radius: 2px;
            background: #1e1e1e;
            color: #fff;
            /* Text sm/Medium */
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .ccl_item_price {
          div {
            display: flex;
            padding: 2px 4px;
            align-items: center;
            gap: 4px;
            border-radius: 2px;
            background: #340d30;
            color: #fff;
            /* Text sm/Medium */
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
            img {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }
  .transaction_content {
    display: flex;
    padding: 24px 32px 32px 32px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    flex-shrink: 0;
    border-radius: 16px;
    border: 1px solid #565656;
    background: #191919;
    .transaction_content_head {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tch_name {
        color: #d339c4;
        text-align: right;
        font-family: Montserrat;
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: uppercase;
      }
      .tch_imgs {
        display: flex;
        align-items: center;
        gap: 16px;
        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
    }
    .transaction_content_section {
      display: flex;
      justify-content: center;
      gap: 24px;
      .tcs_img {
        width: 356px;
        height: 356px;
        border-radius: 8px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
      .tcs_transaction {
        width: 356px;
        .tcst_head {
          display: flex;
          padding: 12px;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          align-self: stretch;
          border-radius: 8px;
          background: #242024;
          .tcst_head_title {
            color: #fff;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.64px;
            text-transform: uppercase;
            padding-bottom: 8px;
          }
          .tcst_head_price {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #fff;
            font-family: Rubik;
            font-size: 24px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: 0.96px;
            text-transform: uppercase;
            padding-bottom: 8px;
            span {
              display: inline-block;
              color: var(--H2, #d1d5db);
              font-family: "PingFang SC";
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px; /* 137.5% */
            }
          }
          .tcst_head_amount_title {
            color: rgba(255, 255, 255, 0.5);
            font-family: "PingFang SC";
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 24px; /* 150% */
          }
          .tcst_head_input_price {
            width: 100%;
            padding-bottom: 8px;
            input {
              width: 100%;
              display: flex;
              padding: 12px 16px;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              gap: 10px;
              align-self: stretch;
              border-radius: 12px;
              background: #121212;
              border: none !important;
              box-shadow: none !important;
              color: white;
            }
          }
          .tcst_head_input_amount {
            width: 100%;
            padding-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            input {
              flex: 1;
              height: 34px;
              display: flex;
              padding: 0px 16px;
              text-align: center;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              gap: 10px;
              align-self: stretch;
              background: #121212;
              border: none !important;
              box-shadow: none !important;
              color: white;
            }
            img {
              width: 34px;
              height: 34px;
              cursor: pointer;
            }
          }
          .tcst_head_btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            div {
              flex: 1;
              display: flex;
              height: 35px;
              justify-content: center;
              align-items: center;
              align-self: stretch;
              border-radius: 32px;
              background: #d339c4;
              cursor: pointer;
            }
          }
        }
        .tcst_detail {
          margin-top: 24px;
          display: flex;
          padding: 12px;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          align-self: stretch;
          border-radius: 8px;
          background: #242024;
          .tcst_detail_head {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.64px;
            text-transform: uppercase;
            img {
              width: 16px;
              height: 16px;
            }
          }
          .tcst_detail_item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              &:first-child {
                color: #d1d5db;
                font-family: "PingFang SC";
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px; /* 183.333% */
              }
              &:last-child {
                color: #d1d5db;
                text-align: right;
                font-family: "PingFang SC";
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px; /* 183.333% */
              }
            }
          }
        }
      }
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    .container {
    }
  }
}

:deep(.el-loading-mask) {
  background-color: rgba(0, 0, 0, 0.7);
}

:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}
:deep(.el-input__wrapper) {
  background-color: transparent;
  border: none;
  box-shadow: none;
}
:deep(.el-input__inner) {
  color: white;
  font-size: 14px;
}
</style>
