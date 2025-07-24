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
          <div class="chs_btn" @click="searchNft">
            <img src="@/assets/images/nft/img1.png" alt="" />
          </div>
        </div>
        <div class="container_head_imgs">
          <div class="chi_item">
            <img
              src="@/assets/images/nft/img3.png"
              alt=""
              @click="
                async () => {
                  searchName = '';
                  nftList = [];
                  defaultNftId = 1;
                  await getNftList();
                }
              "
            />
          </div>
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
          v-for="(item, index) in searchNftList"
          :key="index"
          @mouseenter="checkIndex = index"
          @mouseleave="checkIndex = -1"
        >
          <div class="cci_img">
            <img :src="item[4] || ''" alt="" />
            <div>{{ item[2] }}</div>
          </div>
          <div
            class="cci_btn"
            v-if="checkIndex === index"
            @click="showTransactionVisible(item)"
          >
            Buy
          </div>
          <div class="cci_price" v-else>{{ item[5] || "-" }} USDT</div>
        </div>
      </div>
      <div class="container_content_list" v-if="defaultIndex === 1">
        <div class="ccl_head">
          <div>Item</div>
          <div>Rarity</div>
          <div>Price</div>
        </div>
        <div
          v-for="(item, index) in searchNftList"
          :key="index"
          class="ccl_item"
          @click="showTransactionVisible(item)"
        >
          <div class="ccl_item_img">
            <img :src="item[4] || ''" alt="" />
            <div>{{ item[1] || "" }}</div>
          </div>
          <div class="ccl_item_rarity">
            <div>{{ item[2] || "" }}</div>
          </div>
          <div class="ccl_item_price">
            <div>
              {{ item[5] || "-" }} USDT
              <img src="@/assets/images/nft/img2.svg" alt="" />
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
      <div class="transaction_content" @click.stop="" v-loading="detailLoading">
        <div class="transaction_content_head">
          <div class="tch_name">{{ detailData[1] }}</div>
          <div class="tch_imgs">
            <img
              src="@/assets/images/nft/img3.png"
              alt=""
              @click="getNftDetail(detailData[0])"
            />
            <!-- <img src="@/assets/images/nft/img4.png" alt="" /> -->
            <img
              src="@/assets/images/nft/img5.png"
              alt=""
              @click="transactionVisible = false"
            />
          </div>
        </div>
        <div class="transaction_content_section">
          <div class="tcs_img">
            <img :src="detailData[4]" alt="" />
          </div>
          <div class="tcs_transaction">
            <div class="tcst_head">
              <div class="tcst_head_title">best Price</div>
              <div class="tcst_head_price">
                {{ detailData[5] || "-" }} <span>USDT</span>
              </div>
              <div class="tcst_head_amount_title">Price</div>
              <div class="tcst_head_input_price">
                <input
                  type="number"
                  placeholder="Set Price"
                  v-model="transactionPrice"
                />
              </div>
              <div class="tcst_head_amount_title">Amount</div>
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
                <el-button
                  type="primary"
                  @click="buyNft"
                  :loading="buyLoading"
                  class="tcst_head_btn1"
                  >Buy</el-button
                >
                <el-button
                  type="primary"
                  @click="sellNft"
                  :loading="sellLoading"
                  class="tcst_head_btn1"
                  >Make Offer</el-button
                >
              </div>
            </div>
            <div class="tcst_detail">
              <div class="tcst_detail_head">
                <div>Detail</div>
                <img src="@/assets/images/nft/img8.png" alt="" />
              </div>
              <div class="tcst_detail_item">
                <div>Token ID</div>
                <div>{{ detailData[0] }}</div>
              </div>
              <div class="tcst_detail_item">
                <div>Token Standard</div>
                <div>BEP-1155</div>
              </div>
              <div class="tcst_detail_item">
                <div>Royalty</div>
                <div>10%</div>
              </div>
              <div class="tcst_detail_item">
                <div>Rarity</div>
                <div>{{ detailData[2] }}</div>
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
import { onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import useWalletStore from "@/store/modules/wallet";
import { useMovieNFTContract } from "@/api/contract/movieNFT";
import { useNftMarketplaceContract } from "@/api/contract/NftMarketplace";
import { formatBalance18, formatBalanceBigInt18 } from "@/utils/web3";
import { useUsdtTokenContract } from "@/api/contract/usdtToken";
import abiData from "@/abis.json";

const usdtTokenContract = useUsdtTokenContract();
const movieNFTContract = useMovieNFTContract();
const nftMarketplaceContract = useNftMarketplaceContract();
const { t, locale } = useI18n();
const walletStore = useWalletStore();
const loading = ref(false);
const searchName = ref("");
const defaultIndex = ref(0);
const checkIndex = ref(-1);
const transactionVisible = ref(false);
const buyLoading = ref(false);
const sellLoading = ref(false);
const detailLoading = ref(false);
const transactionPrice = ref("");
const transactionAmount = ref(1);
const defaultNftId = ref(1);
const nftList = ref([] as any);
const searchNftList = ref([] as any);
const detailData = ref([] as any);

onMounted(async () => {
  defaultNftId.value = 1;
  await getNftList();
});

const searchNft = async () => {
  if (searchName.value === "") {
    searchNftList.value = nftList.value;
    return;
  }
  searchNftList.value = nftList.value.filter((item: any[]) =>
    item[1].toLowerCase().includes(searchName.value.toLowerCase())
  );
};

const getNftList = async () => {
  try {
    loading.value = true;
    let price = null;
    try {
      price = await nftMarketplaceContract.getLowestPrice(defaultNftId.value);
    } catch (priceErr) {
      price = null;
    }
    const res = await movieNFTContract.tokenMetadata(defaultNftId.value);
    if (res[0] != "" && res.length === 4) {
      nftList.value.push([
        defaultNftId.value,
        res[0],
        res[1],
        res[2],
        await getNFTImage(res[3]),
        formatBalance18(price) || "",
      ]);
      searchNftList.value = nftList.value;
      defaultNftId.value += 1;
      await getNftList();
    } else {
      defaultNftId.value -= 1;
    }
  } catch (err) {
    console.error("err", err);
  } finally {
    loading.value = false;
  }
};

const getNftDetail = async (tokenId: any) => {
  try {
    detailLoading.value = true;
    let price = null;
    try {
      price = await nftMarketplaceContract.getLowestPrice(tokenId);
    } catch (priceErr) {
      price = null;
    }
    const res = await movieNFTContract.tokenMetadata(tokenId);
    if (res[0] != "" && res.length === 4) {
      detailData.value = [
        tokenId,
        res[0],
        res[1],
        res[2],
        await getNFTImage(res[3]),
        formatBalance18(price) || "",
      ];
    }
  } catch (err) {
    console.error("err", err);
  } finally {
    detailLoading.value = false;
  }
};

const getNFTImage = async (jsonUrl: any) => {
  try {
    const res = await fetch(jsonUrl);
    if (!res.ok) throw new Error("请求失败");
    const json = await res.json();
    return json.image;
  } catch (err) {
    console.error("获取 NFT 数据失败:", err);
    return null;
  }
};

const buyNft = async () => {
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
  try {
    buyLoading.value = true;
    await approveUsdt();
    await nftMarketplaceContract.buyNFT(
      detailData.value[0],
      Number(transactionAmount.value),
      formatBalanceBigInt18(
        (
          Math.floor(
            Number(transactionAmount.value) *
              Number(transactionPrice.value) *
              100
          ) / 100
        ).toFixed(2)
      )
    );
    transactionPrice.value = "";
    ElMessage({
      showClose: true,
      message: "Buy Success",
      type: "success",
    });
    await getNftDetail(detailData.value[0]);
  } catch (error: any) {
    console.log("error", error);

    // ElMessage({
    //   showClose: true,
    //   message: error.reason || "",
    //   type: "error",
    // });
  } finally {
    buyLoading.value = false;
  }
};

const sellNft = async () => {
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
  try {
    sellLoading.value = true;
    await approveNFTMarketplace();
    await nftMarketplaceContract.listNFT(
      detailData.value[0],
      Number(transactionAmount.value),
      formatBalanceBigInt18(Number(transactionPrice.value))
    );
    transactionPrice.value = "";
    ElMessage({
      showClose: true,
      message: "Success",
      type: "success",
    });
    await getNftDetail(detailData.value[0]);
  } catch (error: any) {
    console.log("error", error);

    // ElMessage({
    //   showClose: true,
    //   message: error.reason || "",
    //   type: "error",
    // });
  } finally {
    sellLoading.value = false;
  }
};

const showTransactionVisible = async (item: any) => {
  transactionPrice.value = "";
  transactionAmount.value = 1;
  transactionVisible.value = true;
  await getNftDetail(item[0]);
};

//查询usdt的授权额度
const approveUsdt = async () => {
  try {
    const amount = await usdtTokenContract.getAllowance(
      walletStore.walletAddress || "",
      abiData.NFTMarketplace.address
    );

    //没有授权额度去授权
    if (
      BigInt(amount) <
      BigInt(
        formatBalanceBigInt18(
          (
            Math.floor(
              Number(transactionAmount.value) *
                Number(transactionPrice.value) *
                100
            ) / 100
          ).toFixed(2)
        )
      )
    ) {
      await usdtTokenContract.approve(
        abiData.NFTMarketplace.address,
        formatBalanceBigInt18(
          (
            Math.floor(
              Number(transactionAmount.value) *
                Number(transactionPrice.value) *
                100
            ) / 100
          ).toFixed(2)
        )
      );
      await approveUsdt();
    }
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
//查询NFTMarketplace的授权
const approveNFTMarketplace = async () => {
  try {
    const isApproved = await movieNFTContract.isApprovedForAll(
      walletStore.walletAddress || "",
      abiData.NFTMarketplace.address
    );

    //没有授权去授权
    if (!isApproved) {
      await movieNFTContract.setApprovalForAll(
        abiData.NFTMarketplace.address,
        true
      );
      await approveNFTMarketplace();
    }
  } catch (error) {
    console.error("error", error);
    throw error;
  }
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
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            cursor: pointer;
          }
          img {
            width: 20px;
            height: 20px;
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
          width: 100%;
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
            .tcst_head_btn1 {
              flex: 1;
              display: flex;
              height: 35px;
              justify-content: center;
              align-items: center;
              align-self: stretch;
              border-radius: 32px;
              background: #d339c4;
              cursor: pointer;
              border: none;
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
