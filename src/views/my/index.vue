<script setup lang="ts" name="HomeView">
import router from "@/router";
import useWalletStore from "@/store/modules/wallet";
import { ElNotification, ElMessage } from "element-plus";
import { computed, onMounted, ref, watch } from "vue";
import { connectWallet, formatData1, logoutWallet } from "@/utils/wallet";
import { useI18n } from "vue-i18n";
import {
  formatBalance18,
  formatBalanceBigInt18,
  addressReduce,
} from "@/utils/web3";
import { useUsdtTokenContract } from "@/api/contract/usdtToken";
import { useMovieNFTContract } from "@/api/contract/movieNFT";
import { useNftMarketplaceContract } from "@/api/contract/NftMarketplace";
import abiData from "@/abis.json";

const usdtTokenContract = useUsdtTokenContract();
const movieNFTContract = useMovieNFTContract();
const nftMarketplaceContract = useNftMarketplaceContract();
const walletStore = useWalletStore();
const { t, locale } = useI18n();
const navIndex = ref(0);
const defaultIndex = ref(0);
const checkIndex = ref(-1);
const myNftList = ref([] as any);
const myMarketNftList = ref([] as any);
const defaultNftId = ref(1);
const detailLoading = ref(false);
const transactionPrice = ref("");
const transactionAmount = ref(1);
const detailData = ref([] as any);
const transactionVisible = ref(false);
const sellLoading = ref(false);
const cancelLoading = ref(false);
const loading = ref(false);
const haveMore = ref(false);
const pageSize = ref(1);
const limit = ref(10);
const orderId = ref(-1);
const myBalanceAmount = ref("0");
const defaultIllustratedId = ref(1);
const illustratedList = ref([] as any);

watch(
  () => walletStore.walletAddress,
  async (newVal, oldVal) => {
    if (newVal != "" && walletStore.walletAddress != "") {
      await getMyBalance(walletStore.walletAddress);
      pageSize.value = 1;
      myNftList.value = [];
      defaultNftId.value = 1;
      getNftList();
    }
  }
);

onMounted(async () => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  await getMyBalance(walletStore.walletAddress);
  pageSize.value = 1;
  myNftList.value = [];
  defaultNftId.value = 1;
  await getNftList();
});

const getMyBalance = async (address: any) => {
  try {
    const balance = await usdtTokenContract.getBalanceOf(address);
    myBalanceAmount.value = formatBalance18(balance) || "0";
  } catch (error) {}
};

const copyTextToClipboard = (text: any) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  let success = false;
  try {
    success = document.execCommand("copy");
    if (success) {
      ElMessage({
        showClose: true,
        message: "Copy Success",
        type: "success",
      });
    } else {
      console.warn("复制失败");
    }
  } catch (err) {
    console.error("复制出错：", err);
  }

  document.body.removeChild(textarea);
};

const getNftList = async () => {
  loading.value = true;
  try {
    let price = null;
    try {
      price = await nftMarketplaceContract.getLowestPrice(defaultNftId.value);
    } catch (priceErr) {
      price = null;
    }
    const res = await movieNFTContract.tokenMetadata(defaultNftId.value);
    const resC = await movieNFTContract.balanceOf(
      walletStore.walletAddress,
      defaultNftId.value
    );
    if (res[0] != "" && res.length === 4) {
      if (Number(resC) != 0) {
        myNftList.value.push([
          defaultNftId.value,
          res[0],
          res[1],
          res[2],
          await getNFTImage(res[3]),
          formatBalance18(price) || "",
          resC,
        ]);
      }
      defaultNftId.value += 1;
      haveMore.value = true;
      const haveNextPage =
        Math.floor((defaultNftId.value - 1) / limit.value) + 1;
      if (haveNextPage != pageSize.value) {
        pageSize.value = Math.floor((defaultNftId.value - 1) / limit.value) + 1;
        return;
      } else {
        pageSize.value = Math.floor((defaultNftId.value - 1) / limit.value) + 1;
        await getNftList();
      }
    } else {
      haveMore.value = false;
      defaultNftId.value -= 1;
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
const getMyMarketNftList = async () => {
  loading.value = true;
  try {
    const idsList = await nftMarketplaceContract.getSellerListingIds(
      walletStore.walletAddress
    );
    const res = await nftMarketplaceContract.getListingsBySeller(
      walletStore.walletAddress,
      (pageSize.value - 1) * limit.value,
      limit.value
    );

    if (res.length != 0) {
      const list = await Promise.all(
        res.map(async (item: any, index: any) => {
          const nftDetail = await movieNFTContract.tokenMetadata(item[1]);
          if (item[4]) {
            return {
              id: Number(idsList[(pageSize.value - 1) * limit.value + index]),
              seller: item[0],
              tokenId: Number(item[1]),
              price: formatBalance18(item[2]),
              amount: Number(item[3]),
              active: item[4],
              image: await getNFTImage(nftDetail[3]),
              rarity: nftDetail[1],
              name: nftDetail[0],
            };
          }
        })
      );
      myMarketNftList.value.push(...list);
      if (res.length < limit.value) {
        haveMore.value = false;
      } else {
        haveMore.value = true;
      }
    }
    if (res.length === 0) {
      haveMore.value = false;
    }
  } catch (error) {
  } finally {
    loading.value = false;
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
const cancelOrder = async (item: any) => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  try {
    cancelLoading.value = true;
    orderId.value = item.id;

    await nftMarketplaceContract.unlistNFT(item.id);
    ElMessage({
      showClose: true,
      message: "Operation successful",
      type: "success",
    });
    pageSize.value = 1;
    myMarketNftList.value = [];
    defaultNftId.value = 1;
    await getMyMarketNftList();
  } catch (error: any) {
    console.log("error", error);
    // ElMessage({
    //   showClose: true,
    //   message: error.reason || "",
    //   type: "error",
    // });
  } finally {
    orderId.value = -1;
    cancelLoading.value = false;
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

const showTransactionVisible = async (item: any) => {
  transactionPrice.value = "";
  transactionAmount.value = 1;
  transactionVisible.value = true;
  await getNftDetail(item[0]);
};

const changeNavIndex = async (index: any) => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  if (navIndex.value === index) return;
  navIndex.value = index;
  if (navIndex.value === 0) {
    pageSize.value = 1;
    myNftList.value = [];
    defaultNftId.value = 1;
    await getNftList();
  }
  if (navIndex.value === 1) {
    pageSize.value = 1;
    myMarketNftList.value = [];
    defaultNftId.value = 1;
    await getMyMarketNftList();
  }
  if (navIndex.value === 2) {
    defaultIllustratedId.value = 1;
    illustratedList.value = [];
    await getIllustratedList();
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

const reloadList = async () => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  pageSize.value = 1;
  myNftList.value = [];
  defaultNftId.value = 1;
  await getNftList();
};
const reloadOrderList = async () => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  pageSize.value = 1;
  myMarketNftList.value = [];
  defaultNftId.value = 1;
  await getMyMarketNftList();
};
const changeType = async (type: any) => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  defaultIndex.value = type;
  pageSize.value = 1;
  myNftList.value = [];
  defaultNftId.value = 1;
  await getNftList();
};
const changeOrderType = async (type: any) => {
  if (walletStore.walletAddress === "") {
    ElMessage({
      showClose: true,
      message: "请先连接钱包",
      type: "error",
    });
    return;
  }
  defaultIndex.value = type;
  pageSize.value = 1;
  myMarketNftList.value = [];
  defaultNftId.value = 1;
  await getMyMarketNftList();
};
const getIllustratedList = async () => {
  try {
    loading.value = true;
    const res = await movieNFTContract.getRedeemScheme(
      defaultIllustratedId.value
    );

    console.log("res", res);
    if (res[0] != "" && res.length === 5) {
      if (res[4]) {
        const idsList = illustratedIds(res[1]);
        const amountList = await Promise.all(
          idsList.map(async (item: any, index: any) => {
            const resA = await movieNFTContract.balanceOf(
              walletStore.walletAddress,
              item
            );
            return Number(resA);
          })
        );
        illustratedList.value.push([
          ...res,
          amountList.reduce((acc: any, curr: any) => acc + curr, 0),
        ]);
      }
      defaultIllustratedId.value += 1;
      await getIllustratedList();
    }
  } catch (err) {
    console.error("err", err);
  } finally {
    loading.value = false;
  }
};
const illustratedimages = (tokenIds: any) => {
  if (!tokenIds?.length) return [];
  if (!myNftList.value?.length) return [];
  const list = myNftList.value
    .filter((item: any) => tokenIds.includes(BigInt(item[0])))
    .map((items: any) => items[4]);
  return list;
};
const illustratedIds = (tokenIds: any) => {
  if (!tokenIds?.length) return [];
  if (!myNftList.value?.length) return [];
  const list = myNftList.value
    .filter((item: any) => tokenIds.includes(BigInt(item[0])))
    .map((items: any) => items[0]);
  return list;
};
</script>
<template>
  <div class="home_view">
    <div class="container" v-loading="loading">
      <div class="container_head">
        <div class="container_head_avatar">M</div>
        <div class="container_head_address" v-if="useWalletStore().isWallet">
          <div>{{ addressReduce(walletStore.walletAddress) }}</div>
          <img
            src="@/assets/images/my/img2.png"
            alt=""
            @click="copyTextToClipboard(walletStore.walletAddress)"
          />
        </div>
      </div>

      <div class="container_content">
        <div class="container_content_nav">
          <div class="ccn_head">
            <div class="ccn_head_address">
              <div class="ccnh_address_title">Wallet balance</div>
              <div class="ccnh_address_text">
                <div>{{ addressReduce(walletStore.walletAddress) }}</div>
                <img
                  src="@/assets/images/my/img2.png"
                  alt=""
                  @click="copyTextToClipboard(walletStore.walletAddress)"
                  v-if="useWalletStore().isWallet"
                />
              </div>
            </div>
            <div class="ccn_head_balance">
              {{ useWalletStore().isWallet ? myBalanceAmount : "-" }} USDT
            </div>
          </div>
          <div class="ccn_list">
            <div class="ccn_list_item" @click="changeNavIndex(0)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                  :fill="navIndex === 0 ? '#D339C4' : '#EFCFF6'"
                />
                <path
                  d="M12.0006 13.0787C11.8706 13.0787 11.7406 13.0487 11.6206 12.9787L6.32061 9.91872C5.96061 9.70872 5.84059 9.24872 6.05059 8.89872C6.26059 8.53872 6.72061 8.41872 7.07061 8.62872L11.9906 11.4787L16.8806 8.64872C17.2406 8.43872 17.7006 8.56872 17.9006 8.91872C18.1006 9.26872 17.9806 9.73872 17.6306 9.93872L12.3706 12.9787C12.2606 13.0387 12.1306 13.0787 12.0006 13.0787Z"
                  :fill="navIndex === 0 ? '#D339C4' : '#EFCFF6'"
                />
                <path
                  d="M12 18.5201C11.59 18.5201 11.25 18.1801 11.25 17.7701V12.3301C11.25 11.9201 11.59 11.5801 12 11.5801C12.41 11.5801 12.75 11.9201 12.75 12.3301V17.7701C12.75 18.1801 12.41 18.5201 12 18.5201Z"
                  :fill="navIndex === 0 ? '#D339C4' : '#EFCFF6'"
                />
                <path
                  d="M12.0002 18.7488C11.4202 18.7488 10.8503 18.6188 10.3903 18.3688L7.19025 16.5888C6.23025 16.0588 5.49023 14.7888 5.49023 13.6888V10.2988C5.49023 9.20884 6.24025 7.93883 7.19025 7.39883L10.3903 5.61883C11.3103 5.10883 12.6902 5.10883 13.6102 5.61883L16.8102 7.39883C17.7702 7.92883 18.5103 9.19884 18.5103 10.2988V13.6888C18.5103 14.7788 17.7602 16.0488 16.8102 16.5888L13.6102 18.3688C13.1502 18.6288 12.5802 18.7488 12.0002 18.7488ZM12.0002 6.74883C11.6702 6.74883 11.3502 6.80883 11.1202 6.93883L7.92026 8.71883C7.43026 8.98883 6.99023 9.74883 6.99023 10.2988V13.6888C6.99023 14.2488 7.43026 14.9988 7.92026 15.2688L11.1202 17.0488C11.5802 17.3088 12.4202 17.3088 12.8802 17.0488L16.0802 15.2688C16.5702 14.9988 17.0103 14.2388 17.0103 13.6888V10.2988C17.0103 9.73884 16.5702 8.98883 16.0802 8.71883L12.8802 6.93883C12.6502 6.80883 12.3302 6.74883 12.0002 6.74883Z"
                  :fill="navIndex === 0 ? '#D339C4' : '#EFCFF6'"
                />
              </svg>
              <div :class="navIndex === 0 ? 'active' : ''">NFT</div>
            </div>
            <div class="ccn_list_item" @click="changeNavIndex(1)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"
                  :fill="navIndex === 1 ? '#D339C4' : '#EFCFF6'"
                />
              </svg>
              <div :class="navIndex === 1 ? 'active' : ''">NFT Order</div>
            </div>
            <div class="ccn_list_item" @click="changeNavIndex(2)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.27 22.75H4.23C2.22 22.75 1.25 21.82 1.25 19.9V4.1C1.25 2.18 2.23 1.25 4.23 1.25H8.27C10.28 1.25 11.25 2.18 11.25 4.1V19.9C11.25 21.82 10.27 22.75 8.27 22.75ZM4.23 2.75C2.96 2.75 2.75 3.09 2.75 4.1V19.9C2.75 20.91 2.96 21.25 4.23 21.25H8.27C9.54 21.25 9.75 20.91 9.75 19.9V4.1C9.75 3.09 9.54 2.75 8.27 2.75H4.23Z"
                  :fill="navIndex === 2 ? '#D339C4' : '#EFCFF6'"
                />
                <path
                  d="M19.77 13.75H15.73C13.72 13.75 12.75 12.82 12.75 10.9V4.1C12.75 2.18 13.73 1.25 15.73 1.25H19.77C21.78 1.25 22.75 2.18 22.75 4.1V10.9C22.75 12.82 21.77 13.75 19.77 13.75ZM15.73 2.75C14.46 2.75 14.25 3.09 14.25 4.1V10.9C14.25 11.91 14.46 12.25 15.73 12.25H19.77C21.04 12.25 21.25 11.91 21.25 10.9V4.1C21.25 3.09 21.04 2.75 19.77 2.75H15.73Z"
                  :fill="navIndex === 2 ? '#D339C4' : '#EFCFF6'"
                />
                <path
                  d="M19.77 22.75H15.73C13.72 22.75 12.75 21.82 12.75 19.9V18.1C12.75 16.18 13.73 15.25 15.73 15.25H19.77C21.78 15.25 22.75 16.18 22.75 18.1V19.9C22.75 21.82 21.77 22.75 19.77 22.75ZM15.73 16.75C14.46 16.75 14.25 17.09 14.25 18.1V19.9C14.25 20.91 14.46 21.25 15.73 21.25H19.77C21.04 21.25 21.25 20.91 21.25 19.9V18.1C21.25 17.09 21.04 16.75 19.77 16.75H15.73Z"
                  :fill="navIndex === 2 ? '#D339C4' : '#EFCFF6'"
                />
              </svg>
              <div :class="navIndex === 2 ? 'active' : ''">
                Goods Collection
              </div>
            </div>
            <div class="ccn_list_item" @click="changeNavIndex(3)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.382 3C12.7607 3 13.107 3.214 13.2764 3.55279L14 5H20C20.5523 5 21 5.44772 21 6V17C21 17.5523 20.5523 18 20 18H13.618C13.2393 18 12.893 17.786 12.7236 17.4472L12 16H5V22H3V3H12.382ZM11.7639 5H5V14H13.2361L14.2361 16H19V7H12.7639L11.7639 5Z"
                  :fill="navIndex === 3 ? '#D339C4' : '#EFCFF6'"
                />
              </svg>
              <div :class="navIndex === 3 ? 'active' : ''">
                Activities attended
              </div>
            </div>
            <div class="ccn_list_item" @click="changeNavIndex(4)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"
                  :fill="navIndex === 4 ? '#D339C4' : '#EFCFF6'"
                />
              </svg>
              <div :class="navIndex === 4 ? 'active' : ''">Order History</div>
            </div>
          </div>
          <div style="flex-grow: 1"></div>
          <div class="ccn_logout" @click="logoutWallet">
            <img src="@/assets/images/my/img4.png" alt="" />
            <div>Log Out</div>
          </div>
        </div>
        <div class="container_content_list">
          <div class="ccl_container" v-if="navIndex === 0">
            <div class="ccl_container_head">
              <div class="ccl_container_head_search">
                <img src="@/assets/images/my/img5.png" alt="" />
              </div>
              <div class="ccl_container_head_imgs">
                <div class="chi_item">
                  <img
                    src="@/assets/images/nft/img3.png"
                    alt=""
                    @click="reloadList"
                  />
                </div>
                <div class="chi_item" @click="changeType(0)">
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
                <div class="chi_item" @click="changeType(1)">
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
            <div class="ccl_container_content" v-if="defaultIndex === 0">
              <div
                class="ccl_container_content_item"
                v-for="(item, index) in myNftList"
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
                  Make Offer
                </div>
                <div class="cci_price" v-else>
                  <div>{{ item[5] || "-" }} USDT</div>
                  <div>X {{ item[6] }}</div>
                </div>
              </div>
              <div class="ccl_container_content_item" v-if="haveMore">
                <div class="have_more" @click="getNftList">More</div>
              </div>
            </div>
            <div class="ccl_container_content_list" v-if="defaultIndex === 1">
              <div class="ccl_head">
                <div>Item</div>
                <div>Rarity</div>
                <div>Amount</div>
                <div>Price</div>
              </div>
              <div
                v-for="(item, index) in myNftList"
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
                <div class="ccl_item_amount">{{ item[6] || "" }}</div>
                <div class="ccl_item_price">
                  <div>
                    {{ item[5] || "-" }} USDT
                    <img src="@/assets/images/nft/img2.svg" alt="" />
                  </div>
                </div>
              </div>
              <div class="get_more" @click="getNftList" v-if="haveMore">
                More
              </div>
            </div>
          </div>
          <div class="ccl_container" v-if="navIndex === 1">
            <div class="ccl_container_head">
              <div class="ccl_container_head_search">
                <img src="@/assets/images/my/img5.png" alt="" />
              </div>
              <div class="ccl_container_head_imgs">
                <div class="chi_item">
                  <img
                    src="@/assets/images/nft/img3.png"
                    alt=""
                    @click="reloadOrderList"
                  />
                </div>
                <div class="chi_item" @click="changeOrderType(0)">
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
                <div class="chi_item" @click="changeOrderType(1)">
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
            <div class="ccl_container_content" v-if="defaultIndex === 0">
              <div
                class="ccl_container_content_item"
                v-for="(item, index) in myMarketNftList"
                :key="index"
                @mouseenter="checkIndex = index"
                @mouseleave="checkIndex = -1"
              >
                <div class="cci_img">
                  <img :src="item.image || ''" alt="" />
                  <div>{{ item.rarity }}</div>
                </div>
                <el-button
                  type="primary"
                  class="cci_btn"
                  v-if="checkIndex === index || orderId === item.id"
                  :loading="cancelLoading && orderId === item.id"
                  @click="cancelOrder(item)"
                  >Cancel</el-button
                >
                <div class="cci_price" v-else>
                  <div>{{ item.price || "-" }} USDT</div>
                  <div>X {{ item.amount }}</div>
                </div>
              </div>
              <div class="ccl_container_content_item" v-if="haveMore">
                <div
                  class="have_more"
                  @click="
                    async () => {
                      pageSize += 1;
                      await getMyMarketNftList();
                    }
                  "
                >
                  More
                </div>
              </div>
            </div>
            <div class="ccl_container_content_list" v-if="defaultIndex === 1">
              <div class="ccl_head">
                <div>Item</div>
                <div>Rarity</div>
                <div>Amount</div>
                <div>Price</div>
                <div>Operate</div>
              </div>
              <div
                v-for="(item, index) in myMarketNftList"
                :key="index"
                class="ccl_item"
              >
                <div class="ccl_item_img">
                  <img :src="item.image || ''" alt="" />
                  <div>{{ item.name || "" }}</div>
                </div>
                <div class="ccl_item_rarity">
                  <div>{{ item.rarity || "" }}</div>
                </div>
                <div class="ccl_item_amount">{{ item.amount || "" }}</div>
                <div class="ccl_item_price">
                  <div>
                    {{ item.price || "-" }} USDT
                    <img src="@/assets/images/nft/img2.svg" alt="" />
                  </div>
                </div>
                <el-button
                  type="primary"
                  class="ccl_item_cancel"
                  :loading="cancelLoading && orderId === item.id"
                  @click="cancelOrder(item)"
                  >Cancel</el-button
                >
              </div>
              <div
                class="get_more"
                @click="
                  async () => {
                    pageSize += 1;
                    await getMyMarketNftList();
                  }
                "
                v-if="haveMore"
              >
                More
              </div>
            </div>
          </div>
          <div class="illustrated_handbook" v-if="navIndex === 2">
            <div class="illustrated_handbook_head">
              <img src="@/assets/images/my/img6.png" alt="" />
            </div>
            <div
              class="illustrated_handbook_item"
              v-for="(item, index) in illustratedList"
              :key="index"
            >
              <div class="ihi_head">
                <div class="ihi_head_title">{{ item[2] }}</div>
                <div class="ihi_head_tip">
                  <div>
                    {{ item[5] }}
                    / {{ item[1]?.length || 0 }}
                  </div>
                  <img src="@/assets/images/my/img7.png" alt="" />
                </div>
              </div>
              <div class="ihi_card">
                <div class="ihi_card_list">
                  <div
                    class="ihi_card_item"
                    v-for="(items, index) in illustratedimages(item[1])"
                  >
                    <img :src="items" alt="" />
                  </div>
                </div>
              </div>
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
<style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  flex: 1;
  .container {
    width: 100%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    .container_head {
      width: 100%;
      height: 160px;
      background: url("@/assets/images/my/img1.png") no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      .container_head_avatar {
        width: 64px;
        height: 64px;
        border-radius: 32px;
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 25.6px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: uppercase;
        background: linear-gradient(25.28deg, #d339c4 5.79%, #ff81bd 88.86%);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .container_head_address {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        div {
          color: #fff;
          font-family: Rubik;
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.8px;
        }
        img {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
    }
    .container_content {
      width: 100%;
      height: 696px;
      display: flex;
      gap: 40px;
      .container_content_nav {
        width: 273px;
        height: 100%;
        display: flex;
        flex-direction: column;
        .ccn_head {
          width: 100%;
          height: 126px;
          padding: 16px;
          margin-bottom: 24px;
          box-sizing: border-box;
          border-radius: 16px;
          background: url("@/assets/images/my/img3.png") no-repeat;
          background-size: cover;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .ccn_head_address {
            .ccnh_address_title {
              color: #fff;
              font-family: Inter;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 24px; /* 150% */
              margin-bottom: 4px;
            }
            .ccnh_address_text {
              display: flex;
              align-items: center;
              gap: 4px;
              div {
                color: #e8effb;
                font-family: Inter;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 12px; /* 100% */
              }
              img {
                width: 12px;
                height: 12px;
                cursor: pointer;
              }
            }
          }
          .ccn_head_balance {
            color: #fff;
            font-family: Rubik;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.8px;
          }
        }
        .ccn_list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          .ccn_list_item {
            cursor: pointer;
            height: 40px;
            display: flex;
            align-items: center;
            gap: 16px;
            div {
              color: #efcff6;
              font-family: Inter;
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
            }
            .active {
              color: #d339c4;
            }
          }
        }
        .ccn_logout {
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          margin-bottom: 48px;
          div {
            color: #efcff6;
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
      .container_content_list {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        .ccl_container_head {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          .ccl_container_head_search {
            img {
              width: 92px;
              height: 52px;
            }
          }
          .ccl_container_head_imgs {
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
        .ccl_container_content {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          .ccl_container_content_item {
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
              border: none;
            }
            .cci_price {
              padding: 16px 8px;
              color: #fff;
              font-family: Roboto;
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
            }
            .have_more {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }
          }
        }
        .ccl_container_content_list {
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
              &:nth-child(3) {
                min-width: 120px;
                max-width: 120px;
              }
              &:nth-child(4) {
                flex: 1;
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
            .ccl_item_amount {
              min-width: 120px;
              max-width: 120px;
              color: #fff;
              /* Text sm/Medium */
              font-family: Inter;
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: 20px; /* 142.857% */
            }
            .ccl_item_price {
              flex: 1;
              div {
                width: max-content;
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
            .ccl_item_cancel {
              width: 110px;
              height: 32px;
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
              border: none;
            }
          }
          .get_more {
            padding: 20px 0;
            color: #ffffff47;
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
        .illustrated_handbook {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
          .illustrated_handbook_head {
            img {
              width: 427px;
              height: auto;
            }
          }
          .illustrated_handbook_item {
            width: 100%;
            padding: 20px 24px 24px 24px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            border-radius: 15px;
            border: 1px solid rgba(80, 32, 75, 0.5);
            background: rgba(211, 57, 196, 0.11);
            box-shadow: 0 1px 6px 0 rgba(255, 120, 219, 0.15) inset,
              0 0 10px 0 rgba(211, 57, 196, 0.15) inset;
            backdrop-filter: blur(7.498020648956299px);
            cursor: pointer;
            &:hover {
              background: rgba(211, 57, 196, 0.11);
              box-shadow: 0 1px 6px 0 rgba(255, 120, 219, 0.25) inset,
                0 0 10px 0 rgba(211, 57, 196, 0.25) inset;
              backdrop-filter: blur(7.498020648956299px);
            }
            .ihi_head {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .ihi_head_title {
                color: #efcff6;
                text-align: right;
                font-family: Montserrat;
                font-size: 16px;
                font-style: normal;
                font-weight: 800;
                line-height: normal;
                text-transform: uppercase;
              }
              .ihi_head_tip {
                display: flex;
                align-items: center;
                gap: 8px;
                div {
                  color: #fff;
                  text-align: center;
                  font-family: Montserrat;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: normal;
                }
                img {
                  width: 32px;
                  height: 32px;
                }
              }
            }
            .ihi_card {
              width: 100%;
              height: 186px;
              overflow: hidden;
              .ihi_card_list {
                display: flex;
                flex-wrap: nowrap;
                gap: 16px;
                .ihi_card_item {
                  min-width: 171px;
                  max-width: 171px;
                  height: 186px;
                  border-radius: 10px;
                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                  }
                }
              }
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

:deep(.el-loading-mask) {
  background-color: rgba(0, 0, 0, 0.7);
}

:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}
</style>
