<script lang="ts" setup name="AppTopnav">
import router from "@/router";
import useWalletStore from "@/store/modules/home";
import { useTokenStore } from "@/store/modules/my";
import { addressLogin } from "@/api/login";
import { useWindowSize } from "@/utils/useWindowSize";
import { connectWallet, formatData, logoutWallet } from "@/utils/wallet";
import {
  deleteGoodsCart,
  displayGoodsCart,
  modifyGoodsCart,
  purchaseGoods,
  scanPurchaseStatus,
} from "@/api/shop";
import { useProductStore } from "@/store/modules/product";
import { ElNotification } from "element-plus";
import { computed, onMounted, ref } from "vue";
import useCartStore from "@/store/modules/cart";
import Web3 from "web3";
import usdtAbi from "@/abiU.json";

const { windowWidth } = useWindowSize();
const walletStore = useWalletStore();
const isMenuOpen = ref(false);

const tokenStore = useTokenStore();
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const login = async () => {
  await connectWallet();
  // const res = await addressLogin({ address: walletStore.walletAddress });
  // console.log("res", res.data.json);
  // tokenStore.setWalletData(res.data.json);
};
const TO = (link: any) => {
  router.push(link);
  isMenuOpen.value = false;
};
const isActive = (link: any) => {
  return router.currentRoute.value.path === link;
};

const isActiveCart = ref(false);
// 添加商品到购物车
const addToCart = async () => {
  getCartList();
  isActiveCart.value = true;
};
const selectedCartId = ref(); // 记录选中的 cartId
// const BuyNowCartClick = () => {
//   if (!selectedCartId.value) {
//     ElNotification({
//       dangerouslyUseHTMLString: true,
//       showClose: false,
//       customClass: "message-logout",
//       title: "Please select the item to purchase",
//       duration: 1000,
//     });
//     return;
//   }
//   isActiveCart.value = false;
//   const productStore = useProductStore();
//   productStore.setProduct([cartList.value]);
//   router.push("/newBuy");
// };
const web3 = new Web3(window.ethereum);
const loading = ref(false);
const submitForm = async () => {
  loading.value = true;

  if (!selectedCartId.value) {
    ElNotification({
      dangerouslyUseHTMLString: true,
      showClose: false,
      customClass: "message-logout",
      title: "Please select the item to purchase",
      duration: 1000,
    });
    loading.value = false;
    return;
  }

  const productStore = useProductStore();
  productStore.setProduct([cartList.value]);

  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: "Please connect your wallet before purchasing",
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
      title:
        "The current network is not BSC mainnet, please switch to Binance Smart Chain.",
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

  console.log("usdtContract", usdtContract);

  // 计算 USDT 转账金额（USDT 使用 6 位小数）
  const amount = web3.utils.toWei(cartList.value.price.toString(), "ether");
  // const amount = web3.utils.toWei("0.01", "ether");
  console.log("amountmwei", amount);

  // 电影票接收地址
  const recipientAddress = useTokenStore().toAddress;
  console.log("recipientAddress", recipientAddress);

  // 余额验证
  console.log("开始获取 BNB 余额");
  const bnbBalance = await web3.eth.getBalance(senderAddress);
  console.log("BNB 余额:", web3.utils.fromWei(bnbBalance, "ether"));

  console.log("开始获取 USDT 余额");
  const usdtBalance = await usdtContract.methods
    .balanceOf(senderAddress)
    .call();

  if (Number(usdtBalance) < Number(amount)) {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title:
        "Your USDT balance is insufficient, please recharge before purchasing.",
      duration: 5000,
    });
    loading.value = false;
    return;
  }

  // 计算 Gas 费
  const baseGasPrice = await web3.eth.getGasPrice();
  console.log("baseGasPrice", baseGasPrice);

  const estimatedGas = await usdtContract.methods
    .transfer(recipientAddress, amount)
    .estimateGas({ from: senderAddress });

  console.log("estimatedGas", estimatedGas);

  const gasParams = {
    gasPrice: Math.floor(Number(baseGasPrice) * 1.2), // 20%缓冲
    gasLimit: Math.floor(Number(estimatedGas) * 1.5), // 50%余量
  };

  console.log("gasParams", gasParams);

  console.log("开始发送 USDT 交易...");
  const txHash = await usdtContract.methods
    .transfer(recipientAddress, amount)
    .send({
      from: senderAddress,
      gasPrice: gasParams.gasPrice.toString(),
      gas: web3.utils.toHex(gasParams.gasLimit),
    });
  console.log("txHash", txHash.transactionHash);

  const res = await purchaseGoods({
    cartsId: cartList.value?.cartId || "",
    goodsId: cartList.value.goodsId,
    number: String(cartList.value.number),
    amount: cartList.value.price.toString(),
    // amount: "0.01",
    hash: txHash.transactionHash,
    from: senderAddress,
    payType: 3, // 1 = PayPal, 3 = USDT
    remarks: "",
  });

  if (res.data.code === 0) {
    ElNotification({
      dangerouslyUseHTMLString: true,
      customClass: "message-logout",
      title: cartList.value.title + " Successful purchase",
      message: `<div style="display: flex; align-items: center;justify-content: space-between;">
              <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">
                Purchase Success!
              </div>
              <div id="verify-link" style="display: flex; align-items: center; color: #e621ca; cursor: pointer;">
                verification
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.0895 7.46427L5.71452 11.8393C5.59123 11.9626 5.42402 12.0318 5.24967 12.0318C5.07532 12.0318 4.90811 11.9626 4.78483 11.8393C4.66155 11.716 4.59229 11.5488 4.59229 11.3744C4.59229 11.2001 4.66155 11.0329 4.78483 10.9096L8.69553 6.99998L4.78592 3.08927C4.72488 3.02823 4.67646 2.95576 4.64342 2.876C4.61038 2.79624 4.59338 2.71076 4.59338 2.62443C4.59338 2.5381 4.61038 2.45262 4.64342 2.37286C4.67646 2.2931 4.72488 2.22063 4.78592 2.15959C4.84697 2.09854 4.91944 2.05012 4.9992 2.01708C5.07895 1.98404 5.16444 1.96704 5.25077 1.96704C5.3371 1.96704 5.42258 1.98404 5.50234 2.01708C5.5821 2.05012 5.65457 2.09854 5.71561 2.15959L10.0906 6.53459C10.1517 6.59563 10.2002 6.66813 10.2332 6.74794C10.2662 6.82774 10.2832 6.91328 10.2831 6.99966C10.283 7.08603 10.2658 7.17153 10.2326 7.25126C10.1994 7.33099 10.1508 7.40338 10.0895 7.46427Z" fill="#D339C4"/>
                </svg>
              </div>
            </div>`,
      duration: 60000,
    });
    productStore.setHash(txHash.transactionHash);
    router.push("/newBuy");
    isActiveCart.value = false;
    loading.value = false;
    const res1 = await scanPurchaseStatus({
      payType: 3,
      address: senderAddress,
      hash: txHash.transactionHash,
    });

    // if (res1.data.code === 0) {
    // } else {
    //   ElNotification({
    //     customClass: "message-logout",
    //     title: "Purchase failed",
    //     duration: 60000,
    //   });
    //   loading.value = false;
    // }
  } else {
    ElNotification({
      customClass: "message-logout",
      title: "Purchase failed",
      duration: 60000,
    });
    loading.value = false;
  }
  // usdtContract.methods
  //   .transfer(recipientAddress, amount)
  //   .send({
  //     from: senderAddress,
  //     gasPrice: gasParams.gasPrice.toString(),
  //     gas: web3.utils.toHex(gasParams.gasLimit),
  //   })
  //   .on("transactionHash", async (hash) => {
  //     console.log("实时交易哈希（事件监听）:", hash); // 立即打印
  //     // 发送交易信息到后端
  //     try {
  //     } catch (error) {
  //       console.error("后端请求错误", error);
  //     } finally {
  //       loading.value = false;
  //     }
  //   })
  //   .on("receipt", (receipt) => {
  //     console.log("交易确认（收据）:", receipt.transactionHash);
  //   })
  //   .on("error", (error) => {
  //     console.error("交易错误:", error);
  //   });
};

// const submitForm = async () => {
//   loading.value = true;

//   // 1. 选择支付的商品
//   if (!selectedCartId.value) {
//     ElNotification({
//       customClass: "message-logout",
//       title: "请选择要购买的商品",
//       duration: 1000,
//     });
//     loading.value = false;
//     return;
//   }

//   // 2. 连接钱包
//   let provider;
//   if (window.okxwallet) {
//     provider = window.okxwallet; // OKX 钱包
//   } else if (window.ethereum) {
//     provider = window.ethereum; // MetaMask
//   } else {
//     ElNotification({
//       customClass: "message-logout",
//       title: "请安装 MetaMask 或 OKX 钱包",
//       duration: 2000,
//     });
//     loading.value = false;
//     return;
//   }

//   const web3 = new Web3(provider);

//   try {
//     // 3. 获取用户地址
//     const accounts = await web3.eth.requestAccounts();
//     const senderAddress = accounts[0];

//     if (!senderAddress) {
//       ElNotification({
//         customClass: "message-logout",
//         title: "未检测到钱包地址",
//         duration: 2000,
//       });
//       loading.value = false;
//       return;
//     }

//     // 4. 检查网络（Arbitrum）
//     const networkId = await web3.eth.net.getId();
//     console.log("networkId", networkId);

//     if (networkId !== 42161n) {
//       ElNotification({
//         customClass: "message-logout",
//         title: "请切换到 Arbitrum One 网络",
//         duration: 5000,
//       });
//       loading.value = false;
//       return;
//     }

//     // 5. 计算 USDT 交易参数
//     const usdtContract = new web3.eth.Contract(
//       usdtAbi,
//       "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9" // 主网 USDT 地址
//     );

//     const amount = web3.utils.toWei(cartList.value.price.toString(), "mwei");
//     const recipientAddress = "0x5f5c3a0c19005d8f3607222d79a7492412501582";

//     // 6. 检查 USDT 余额
//     const usdtBalance = await usdtContract.methods
//       .balanceOf(senderAddress)
//       .call();

//     if (Number(usdtBalance) < Number(amount)) {
//       ElNotification({
//         customClass: "message-logout",
//         title: "USDT 余额不足",
//         duration: 5000,
//       });
//       loading.value = false;
//       return;
//     }

//     // 7. 发送 USDT 交易
//     const tx = await usdtContract.methods
//       .transfer(recipientAddress, amount)
//       .send({
//         from: senderAddress,
//       });

//     console.log("交易哈希:", tx.transactionHash);

//     // 8. 通知后台
//     const res = await purchaseGoods({
//       cartsId: cartList.value?.cartId || "",
//       goodsId: cartList.value.goodsId,
//       number: String(cartList.value.number),
//       amount: cartList.value.price.toString(),
//       hash: tx.transactionHash,
//       from: senderAddress,
//       payType: 3, // 3 表示 USDT 付款
//       remarks: "",
//     });

//     if (res.data.code === 0) {
//       ElNotification({
//         customClass: "message-logout",
//         title: "购买成功",
//         duration: 6000,
//       });
//       router.push("/newBuy");
//     } else {
//       ElNotification({
//         customClass: "message-logout",
//         title: res.data.json,
//         duration: 6000,
//       });
//     }
//   } catch (error: any) {
//     if (error.code === 4001) {
//       ElNotification({
//         customClass: "message-logout",
//         title: "交易已取消",
//         duration: 5000,
//       });
//     } else {
//       ElNotification({
//         customClass: "message-logout",
//         title: "支付失败",
//         duration: 5000,
//       });
//     }
//     console.error("支付错误:", error);
//   } finally {
//     loading.value = false;
//   }
// };

const getCartListStore = useCartStore();
const goodsCartList = computed(() => getCartListStore.cartList ?? []);
const getCartList = async () => {
  const res = await displayGoodsCart();
  console.log("res", res.data);
  if (res.data.code === 0) {
    // goodsCartList = res.data.json.goodsCartList;
    getCartListStore.setcartList(res.data.json.goodsCartList);
    console.log("goodsCartList", goodsCartList);
    console.log("getCartListStore.cartList", getCartListStore.cartList);
  }
};
const totalPrice = computed(() => {
  const selectedItem = goodsCartList.value.find(
    (item: { cartId: any }) => item.cartId === selectedCartId.value
  );
  return selectedItem
    ? Number(selectedItem.price) * Number(selectedItem.number)
    : 0;
});

// **从购物车移除**
const removeFromCart = async (number: any) => {
  const res = await deleteGoodsCart({
    cartsId: number,
  });

  if (res.data.code === 0) {
    ElNotification({
      dangerouslyUseHTMLString: true,
      showClose: false,
      customClass: "message-logout",
      title: res.data.json,
      duration: 1000,
    });
    getCartList();
  } else {
    ElNotification({
      dangerouslyUseHTMLString: true,
      showClose: false,
      customClass: "message-logout",
      title: "Deletion failure",
      duration: 1000,
    });
  }
};
const handleNumberChange = async (item: any) => {
  console.log("item", item.number, item);
  const res = await modifyGoodsCart({
    cartsId: item.cartId,
    number: item.number,
  });
  if (res.data.code === 0) {
    ElNotification({
      dangerouslyUseHTMLString: true,
      showClose: false,
      customClass: "message-logout",
      title: res.data.json.message,
      duration: 1000,
    });
    getCartList();
  } else {
    ElNotification({
      dangerouslyUseHTMLString: true,
      showClose: false,
      customClass: "message-logout",
      title: "Change failed",
      duration: 1000,
    });
    getCartList();
  }
};
const logout = () => {
  logoutWallet();
  isActiveCart.value = false;
};
const cartList = ref<any>([]);
// 处理可取消选中
const toggleSelection = (item: any) => {
  // 如果当前选中的 ID 和点击的 ID 相同，则取消选中
  if (selectedCartId.value === item.cartId) {
    setTimeout(() => {
      selectedCartId.value = ""; // 取消选中
      console.log("选中的商品ID取消:", item);
      cartList.value = "";
    }, 0);
  } else {
    selectedCartId.value = item.cartId; // 选中
    console.log("选中的商品ID勾选:", item);
    cartList.value = item;
  }
};
</script>
<template>
  <nav class="app-topnav">
    <div class="container">
      <div class="topLeft">
        <router-link to="/" class="logo"
          ><img src="@/assets/images/logo.png" alt=""
        /></router-link>
        <div class="line"></div>
        <div class="appLogo" v-if="windowWidth > 824">
          <div class="appLogoItem">
            <img src="@/assets/svgs/twi.svg" alt="" />
          </div>
          <div class="appLogoItem">
            <img src="@/assets/svgs/telegram.svg" alt="" />
          </div>
          <div class="appLogoItem">
            <img src="@/assets/svgs/gitBook.svg" alt="" />
          </div>
          <div class="appLogoItem">
            <img src="@/assets/svgs/discord.svg" alt="" />
          </div>
          <div class="appLogoItem">
            <img src="@/assets/svgs/medium.svg" alt="" />
          </div>
        </div>
        <div class="NavSvg" v-if="windowWidth <= 824" @click="toggleMenu">
          <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M21.8418 12C21.8418 12.2984 21.7233 12.5845 21.5123 12.7955C21.3013 13.0065 21.0152 13.125 20.7168 13.125H4.2168C3.91843 13.125 3.63228 13.0065 3.4213 12.7955C3.21032 12.5845 3.0918 12.2984 3.0918 12C3.0918 11.7016 3.21032 11.4155 3.4213 11.2045C3.63228 10.9935 3.91843 10.875 4.2168 10.875H20.7168C21.0152 10.875 21.3013 10.9935 21.5123 11.2045C21.7233 11.4155 21.8418 11.7016 21.8418 12ZM4.2168 7.125H20.7168C21.0152 7.125 21.3013 7.00647 21.5123 6.7955C21.7233 6.58452 21.8418 6.29837 21.8418 6C21.8418 5.70163 21.7233 5.41548 21.5123 5.2045C21.3013 4.99353 21.0152 4.875 20.7168 4.875H4.2168C3.91843 4.875 3.63228 4.99353 3.4213 5.2045C3.21032 5.41548 3.0918 5.70163 3.0918 6C3.0918 6.29837 3.21032 6.58452 3.4213 6.7955C3.63228 7.00647 3.91843 7.125 4.2168 7.125ZM20.7168 16.875H4.2168C3.91843 16.875 3.63228 16.9935 3.4213 17.2045C3.21032 17.4155 3.0918 17.7016 3.0918 18C3.0918 18.2984 3.21032 18.5845 3.4213 18.7955C3.63228 19.0065 3.91843 19.125 4.2168 19.125H20.7168C21.0152 19.125 21.3013 19.0065 21.5123 18.7955C21.7233 18.5845 21.8418 18.2984 21.8418 18C21.8418 17.7016 21.7233 17.4155 21.5123 17.2045C21.3013 16.9935 21.0152 16.875 20.7168 16.875Z"
              fill="white"
              style="fill: white; fill-opacity: 1"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M20.0127 17.954C20.224 18.1653 20.3428 18.452 20.3428 18.7509C20.3428 19.0497 20.224 19.3364 20.0127 19.5477C19.8013 19.7591 19.5147 19.8778 19.2158 19.8778C18.9169 19.8778 18.6303 19.7591 18.4189 19.5477L12.4668 13.5937L6.51269 19.5459C6.30135 19.7572 6.0147 19.8759 5.71582 19.8759C5.41693 19.8759 5.13029 19.7572 4.91894 19.5459C4.7076 19.3345 4.58887 19.0479 4.58887 18.749C4.58887 18.4501 4.7076 18.1635 4.91894 17.9521L10.873 11.9999L4.92082 6.04586C4.70947 5.83451 4.59074 5.54787 4.59074 5.24898C4.59074 4.9501 4.70947 4.66345 4.92082 4.45211C5.13216 4.24076 5.41881 4.12203 5.71769 4.12203C6.01658 4.12203 6.30322 4.24076 6.51457 4.45211L12.4668 10.4062L18.4208 4.45117C18.6322 4.23983 18.9188 4.12109 19.2177 4.12109C19.5166 4.12109 19.8032 4.23983 20.0146 4.45117C20.2259 4.66251 20.3446 4.94916 20.3446 5.24804C20.3446 5.54693 20.2259 5.83358 20.0146 6.04492L14.0605 11.9999L20.0127 17.954Z"
              fill="white"
              style="fill: white; fill-opacity: 1"
            />
          </svg>
        </div>
      </div>
      <div class="topRight">
        <router-link
          to="/home"
          class="navLink"
          v-if="windowWidth > 824"
          :class="{ active: isActive('/home') }"
          >HOME</router-link
        >
        <router-link
          to="/mint"
          class="navLink"
          v-if="windowWidth > 824"
          :class="{ active: isActive('/mint') }"
          >MINT</router-link
        >
        <router-link
          to="/shop"
          class="navLink"
          v-if="windowWidth > 824"
          :class="{ active: isActive('/shop') }"
          >SHOP</router-link
        >
        <router-link
          to="/ai"
          class="navLink"
          v-if="windowWidth > 824"
          :class="{ active: isActive('/ai') }"
          >AI</router-link
        >
        <div class="LAUNCHBtn" @click="login" v-if="!walletStore.isWallet">
          Connect wallet
        </div>
        <div v-else style="display: flex; align-items: center; gap: 12px">
          <router-link to="/my">
            <div class="my">
              <div class="name">
                {{ formatData(walletStore.walletAddress) }}
              </div>
              <div class="avatar"></div>
            </div>
          </router-link>
          <div class="shopSvg" @click="addToCart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1325_2089)">
                <path
                  d="M10.6671 6V4C10.6671 2.52724 9.47317 1.33333 8.00041 1.33333C6.52765 1.33333 5.33374 2.52724 5.33374 4V6M2.39508 6.90131L1.99508 11.168C1.88135 12.3811 1.82448 12.9877 2.02578 13.4562C2.20261 13.8678 2.51249 14.208 2.90575 14.4225C3.35343 14.6667 3.96265 14.6667 5.18111 14.6667H10.8197C12.0382 14.6667 12.6474 14.6667 13.0951 14.4225C13.4883 14.208 13.7982 13.8678 13.975 13.4562C14.1763 12.9877 14.1195 12.3811 14.0057 11.168L13.6057 6.90131C13.5097 5.8769 13.4617 5.36469 13.2313 4.97744C13.0284 4.63639 12.7286 4.36341 12.3701 4.19323C11.9631 4 11.4486 4 10.4197 4L5.58111 4C4.5522 4 4.03775 4 3.63069 4.19323C3.27219 4.3634 2.97241 4.63639 2.76952 4.97744C2.53914 5.36469 2.49112 5.8769 2.39508 6.90131Z"
                  stroke="black"
                  style="stroke: black; stroke-opacity: 1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1325_2089">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    style="fill: white; fill-opacity: 1"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            v-if="windowWidth > 824"
            @click="logout"
            style="display: flex; align-items: center; cursor: pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.625 20.25C11.625 20.5484 11.5065 20.8345 11.2955 21.0455C11.0845 21.2565 10.7984 21.375 10.5 21.375H4.5C4.20163 21.375 3.91548 21.2565 3.7045 21.0455C3.49353 20.8345 3.375 20.5484 3.375 20.25V3.75C3.375 3.45163 3.49353 3.16548 3.7045 2.9545C3.91548 2.74353 4.20163 2.625 4.5 2.625H10.5C10.7984 2.625 11.0845 2.74353 11.2955 2.9545C11.5065 3.16548 11.625 3.45163 11.625 3.75C11.625 4.04837 11.5065 4.33452 11.2955 4.5455C11.0845 4.75647 10.7984 4.875 10.5 4.875H5.625V19.125H10.5C10.7984 19.125 11.0845 19.2435 11.2955 19.4545C11.5065 19.6655 11.625 19.9516 11.625 20.25ZM21.7959 11.2041L18.0459 7.45406C17.8346 7.24272 17.5479 7.12399 17.2491 7.12399C16.9502 7.12399 16.6635 7.24272 16.4522 7.45406C16.2408 7.66541 16.1221 7.95205 16.1221 8.25094C16.1221 8.54982 16.2408 8.83647 16.4522 9.04781L18.2812 10.875H10.5C10.2016 10.875 9.91548 10.9935 9.7045 11.2045C9.49353 11.4155 9.375 11.7016 9.375 12C9.375 12.2984 9.49353 12.5845 9.7045 12.7955C9.91548 13.0065 10.2016 13.125 10.5 13.125H18.2812L16.4513 14.9541C16.2399 15.1654 16.1212 15.4521 16.1212 15.7509C16.1212 16.0498 16.2399 16.3365 16.4513 16.5478C16.6626 16.7592 16.9492 16.8779 17.2481 16.8779C17.547 16.8779 17.8337 16.7592 18.045 16.5478L21.795 12.7978C21.8999 12.6934 21.9832 12.5692 22.0401 12.4325C22.097 12.2958 22.1263 12.1492 22.1264 12.0011C22.1264 11.8531 22.0973 11.7064 22.0406 11.5697C21.9839 11.4329 21.9008 11.3086 21.7959 11.2041Z"
                fill="#C51573"
                style="
                  fill: #ff008a;
                  fill: color(display-p3 1 0 0.54);
                  fill-opacity: 1;
                "
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <el-drawer v-model="isMenuOpen" :with-header="false" size="100%">
      <div class="overlay">
        <div @click="TO('/home')" class="text">home</div>
        <div @click="TO('/mint')" class="text">MINT</div>
        <div @click="TO('/shop')" class="text">SHOP</div>
        <div @click="TO('/ai')" class="text">AI</div>

        <div class="iconLink">
          <div class="iconLinkItem">
            <img src="@/assets/svgs/twi.svg" alt="" />
          </div>
          <div class="iconLinkItem">
            <img src="@/assets/svgs/telegram.svg" alt="" />
          </div>
          <div class="iconLinkItem">
            <img src="@/assets/svgs/gitBook.svg" alt="" />
          </div>
          <div class="iconLinkItem">
            <img src="@/assets/svgs/discord.svg" alt="" />
          </div>
          <div class="iconLinkItem">
            <img src="@/assets/svgs/medium.svg" alt="" />
          </div>
        </div>
        <div
          v-if="walletStore.isWallet"
          @click="logout"
          style="
            display: flex;
            align-items: center;
            cursor: pointer;
            width: 100%;
            justify-content: center;
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11.625 20.25C11.625 20.5484 11.5065 20.8345 11.2955 21.0455C11.0845 21.2565 10.7984 21.375 10.5 21.375H4.5C4.20163 21.375 3.91548 21.2565 3.7045 21.0455C3.49353 20.8345 3.375 20.5484 3.375 20.25V3.75C3.375 3.45163 3.49353 3.16548 3.7045 2.9545C3.91548 2.74353 4.20163 2.625 4.5 2.625H10.5C10.7984 2.625 11.0845 2.74353 11.2955 2.9545C11.5065 3.16548 11.625 3.45163 11.625 3.75C11.625 4.04837 11.5065 4.33452 11.2955 4.5455C11.0845 4.75647 10.7984 4.875 10.5 4.875H5.625V19.125H10.5C10.7984 19.125 11.0845 19.2435 11.2955 19.4545C11.5065 19.6655 11.625 19.9516 11.625 20.25ZM21.7959 11.2041L18.0459 7.45406C17.8346 7.24272 17.5479 7.12399 17.2491 7.12399C16.9502 7.12399 16.6635 7.24272 16.4522 7.45406C16.2408 7.66541 16.1221 7.95205 16.1221 8.25094C16.1221 8.54982 16.2408 8.83647 16.4522 9.04781L18.2812 10.875H10.5C10.2016 10.875 9.91548 10.9935 9.7045 11.2045C9.49353 11.4155 9.375 11.7016 9.375 12C9.375 12.2984 9.49353 12.5845 9.7045 12.7955C9.91548 13.0065 10.2016 13.125 10.5 13.125H18.2812L16.4513 14.9541C16.2399 15.1654 16.1212 15.4521 16.1212 15.7509C16.1212 16.0498 16.2399 16.3365 16.4513 16.5478C16.6626 16.7592 16.9492 16.8779 17.2481 16.8779C17.547 16.8779 17.8337 16.7592 18.045 16.5478L21.795 12.7978C21.8999 12.6934 21.9832 12.5692 22.0401 12.4325C22.097 12.2958 22.1263 12.1492 22.1264 12.0011C22.1264 11.8531 22.0973 11.7064 22.0406 11.5697C21.9839 11.4329 21.9008 11.3086 21.7959 11.2041Z"
              fill="#FF008A"
              style="
                fill: #ff008a;
                fill: color(display-p3 1 0 0.54);
                fill-opacity: 1;
              "
            />
          </svg>
        </div>
      </div>
    </el-drawer>

    <div class="cart" :class="{ activeCart: isActiveCart }" v-loading="loading">
      <div style="width: 100%">
        <div class="cartTitle">
          <div>Shopping cart</div>
          <div class="icon" @click="isActiveCart = false">
            <svg
              t="1740736413412"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2651"
              width="12"
              height="12"
            >
              <path
                d="M632.117978 513.833356l361.805812 361.735298a85.462608 85.462608 0 1 1-121.001515 120.789974L511.116463 634.552816 146.913186 998.756094a86.026718 86.026718 0 0 1-121.706652-121.706652L389.480325 512.775651 27.674513 150.969839A85.392095 85.392095 0 0 1 148.393973 30.250379L510.199785 392.056191l366.671258-366.671258a86.026718 86.026718 0 0 1 121.706652 121.706652z"
                p-id="2652"
                fill="#D339C4"
              ></path>
            </svg>
          </div>
        </div>
        <!-- <div class="cartList" v-if="goodsCartList.length > 0">
            <div
              class="cartItem"
              v-for="(item, index) in goodsCartList"
              :key="index"
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 16px;
                "
              >
                <img class="cartItemImg" :src="item.image" alt="" />
                <div class="text">
                  <div class="cartItemName">{{ item.describe }}</div>
                  <div class="cartItemPN">
                    <div class="cartItemPrice">${{ item.price }}</div>
                    <div class="cartItemNum">* {{ item.number }}</div>
                  </div>
                </div>
              </div>
              <div
                class="Delete"
                @click="removeFromCart(item.cartId)"
                style="cursor: pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.25 4.5H16.875V3.375C16.875 2.67881 16.5984 2.01113 16.1062 1.51884C15.6139 1.02656 14.9462 0.75 14.25 0.75H9.75C9.05381 0.75 8.38613 1.02656 7.89384 1.51884C7.40156 2.01113 7.125 2.67881 7.125 3.375V4.5H3.75C3.45163 4.5 3.16548 4.61853 2.9545 4.8295C2.74353 5.04048 2.625 5.32663 2.625 5.625C2.625 5.92337 2.74353 6.20952 2.9545 6.4205C3.16548 6.63147 3.45163 6.75 3.75 6.75H4.125V19.5C4.125 19.9973 4.32254 20.4742 4.67417 20.8258C5.02581 21.1775 5.50272 21.375 6 21.375H18C18.4973 21.375 18.9742 21.1775 19.3258 20.8258C19.6775 20.4742 19.875 19.9973 19.875 19.5V6.75H20.25C20.5484 6.75 20.8345 6.63147 21.0455 6.4205C21.2565 6.20952 21.375 5.92337 21.375 5.625C21.375 5.32663 21.2565 5.04048 21.0455 4.8295C20.8345 4.61853 20.5484 4.5 20.25 4.5ZM9.375 3.375C9.375 3.27554 9.41451 3.18016 9.48483 3.10984C9.55516 3.03951 9.65054 3 9.75 3H14.25C14.3495 3 14.4448 3.03951 14.5152 3.10984C14.5855 3.18016 14.625 3.27554 14.625 3.375V4.5H9.375V3.375ZM17.625 19.125H6.375V6.75H17.625V19.125ZM10.875 9.75V15.75C10.875 16.0484 10.7565 16.3345 10.5455 16.5455C10.3345 16.7565 10.0484 16.875 9.75 16.875C9.45163 16.875 9.16548 16.7565 8.9545 16.5455C8.74353 16.3345 8.625 16.0484 8.625 15.75V9.75C8.625 9.45163 8.74353 9.16548 8.9545 8.9545C9.16548 8.74353 9.45163 8.625 9.75 8.625C10.0484 8.625 10.3345 8.74353 10.5455 8.9545C10.7565 9.16548 10.875 9.45163 10.875 9.75ZM15.375 9.75V15.75C15.375 16.0484 15.2565 16.3345 15.0455 16.5455C14.8345 16.7565 14.5484 16.875 14.25 16.875C13.9516 16.875 13.6655 16.7565 13.4545 16.5455C13.2435 16.3345 13.125 16.0484 13.125 15.75V9.75C13.125 9.45163 13.2435 9.16548 13.4545 8.9545C13.6655 8.74353 13.9516 8.625 14.25 8.625C14.5484 8.625 14.8345 8.74353 15.0455 8.9545C15.2565 9.16548 15.375 9.45163 15.375 9.75Z"
                    fill="#707070"
                    style="
                      fill: #707070;
                      fill: color(display-p3 0.4406 0.4406 0.4406);
                      fill-opacity: 1;
                    "
                  />
                </svg>
              </div>
            </div>
          </div> -->
        <!-- 购物车列表 -->
        <el-radio-group v-model="selectedCartId" class="cartList">
          <div
            class="cartItem"
            v-for="(item, index) in goodsCartList"
            :key="index"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <!-- 自定义单选框 -->
              <el-radio
                :value="item.cartId"
                @click="toggleSelection(item)"
                class="custom-radio"
              ></el-radio>
              <!-- <img class="cartItemImg" :src="item.image" alt="" /> -->
              <div
                class="cartItemImg"
                :style="{
                  backgroundImage: `url(${item.image}) `,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                }"
              ></div>
              <div class="text">
                <div class="cartItemName">{{ item.describe }}</div>
                <div class="cartItemPN">
                  <div class="cartItemPrice">${{ item.price }}</div>
                  <!-- <div class="cartItemNum">* {{ item.number }}</div> -->
                </div>
              </div>
              <el-input-number
                v-model="item.number"
                :min="1"
                :max="99"
                @change="handleNumberChange(item)"
              />
            </div>
            <div
              class="Delete"
              @click="removeFromCart(item.cartId)"
              style="cursor: pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20.25 4.5H16.875V3.375C16.875 2.67881 16.5984 2.01113 16.1062 1.51884C15.6139 1.02656 14.9462 0.75 14.25 0.75H9.75C9.05381 0.75 8.38613 1.02656 7.89384 1.51884C7.40156 2.01113 7.125 2.67881 7.125 3.375V4.5H3.75C3.45163 4.5 3.16548 4.61853 2.9545 4.8295C2.74353 5.04048 2.625 5.32663 2.625 5.625C2.625 5.92337 2.74353 6.20952 2.9545 6.4205C3.16548 6.63147 3.45163 6.75 3.75 6.75H4.125V19.5C4.125 19.9973 4.32254 20.4742 4.67417 20.8258C5.02581 21.1775 5.50272 21.375 6 21.375H18C18.4973 21.375 18.9742 21.1775 19.3258 20.8258C19.6775 20.4742 19.875 19.9973 19.875 19.5V6.75H20.25C20.5484 6.75 20.8345 6.63147 21.0455 6.4205C21.2565 6.20952 21.375 5.92337 21.375 5.625C21.375 5.32663 21.2565 5.04048 21.0455 4.8295C20.8345 4.61853 20.5484 4.5 20.25 4.5ZM9.375 3.375C9.375 3.27554 9.41451 3.18016 9.48483 3.10984C9.55516 3.03951 9.65054 3 9.75 3H14.25C14.3495 3 14.4448 3.03951 14.5152 3.10984C14.5855 3.18016 14.625 3.27554 14.625 3.375V4.5H9.375V3.375ZM17.625 19.125H6.375V6.75H17.625V19.125ZM10.875 9.75V15.75C10.875 16.0484 10.7565 16.3345 10.5455 16.5455C10.3345 16.7565 10.0484 16.875 9.75 16.875C9.45163 16.875 9.16548 16.7565 8.9545 16.5455C8.74353 16.3345 8.625 16.0484 8.625 15.75V9.75C8.625 9.45163 8.74353 9.16548 8.9545 8.9545C9.16548 8.74353 9.45163 8.625 9.75 8.625C10.0484 8.625 10.3345 8.74353 10.5455 8.9545C10.7565 9.16548 10.875 9.45163 10.875 9.75ZM15.375 9.75V15.75C15.375 16.0484 15.2565 16.3345 15.0455 16.5455C14.8345 16.7565 14.5484 16.875 14.25 16.875C13.9516 16.875 13.6655 16.7565 13.4545 16.5455C13.2435 16.3345 13.125 16.0484 13.125 15.75V9.75C13.125 9.45163 13.2435 9.16548 13.4545 8.9545C13.6655 8.74353 13.9516 8.625 14.25 8.625C14.5484 8.625 14.8345 8.74353 15.0455 8.9545C15.2565 9.16548 15.375 9.45163 15.375 9.75Z"
                  fill="#707070"
                  style="
                    fill: #707070;
                    fill: color(display-p3 0.4406 0.4406 0.4406);
                    fill-opacity: 1;
                  "
                />
              </svg>
            </div>
          </div>
        </el-radio-group>
      </div>
      <div class="SubtotalAll">
        <div class="Subtotal">
          <div class="SubtotalTitle">Subtotal</div>
          <div class="SubtotalPrice">${{ totalPrice }}</div>
        </div>
        <div
          class="SubtotalBtn"
          @click="submitForm()"
          :class="{ disabled: !selectedCartId }"
        >
          Buy now
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  border-bottom: 1px solid #1e1e1e;
  background: #000;
  min-height: 81px;
}

.container {
  height: 100%;
  padding: 24px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000000;
}

.topLeft {
  display: flex;
  align-items: center;
  gap: 28px;

  .logo {
    flex-shrink: 0;

    img {
      width: 87px;
      height: 32px;
    }
  }

  .line {
    width: 1px;
    height: 18px;
    background: #4d4d4d;
  }

  .appLogo {
    display: flex;
    gap: 12px;
    align-items: center;

    .appLogoItem {
      width: 28px;
      height: 28px;
      //   background: #4d4d4d;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.topRight {
  display: flex;
  align-items: center;
  gap: 40px;
  height: 100%;

  .navLink {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    color: #fff;

    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;

    &:hover {
      color: #d339c4;
    }
  }

  // .navLink.active {
  //   border-bottom: 2px solid #d339c4; /* 添加下划线 */
  // }
  .navLink.active::after {
    content: "";
    position: absolute;
    bottom: -6px;
    /* 控制下划线距离文字的间距 */
    width: 100%;
    /* 线条的宽度 */
    height: 1px;
    /* 线条的高度 */
    background-color: #d600ff;
    /* 线条颜色，改为你想要的 */
  }
}

.LAUNCHBtn {
  display: flex;
  align-items: center;
  display: flex;
  padding: 8px 14px 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #fff;
  gap: 6px;
  cursor: pointer;
  color: @xtxColor;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}

.my {
  display: flex;
  align-items: center;
  gap: 8px;

  .name {
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    // text-transform: uppercase;
  }

  .avatar {
    width: 32px;
    height: 32px;
    background: #e621ca;
    border-radius: 50%;
  }
}

.shopSvg {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
}

@media (max-width: 980px) {
  .container {
    padding: 32px;
  }
}

@media (max-width: 922px) {
  .container {
    .topLeft {
      gap: 18px;
    }

    .topRight {
      gap: 20px;
    }
  }
}

@media (max-width: 824px) {
  .app-topnav {
    border-bottom: none;
  }

  .container {
    padding: 16px;
    padding-right: 32px;
    .topLeft {
      gap: 8px;

      .NavSvg {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
    .topRight {
      .LAUNCHBtn {
        padding: 6px 12px 6px 14px;
        font-size: 12px;
        //   letter-spacing: -0.48px;
      }
    }
  }
}
@media (max-width: 380px) {
  .topLeft {
    .logo {
      flex-shrink: 0;

      img {
        width: 66px;
        height: auto;
      }
    }
  }
}

.topLeft,
.topRight {
  z-index: 1000;
}

.overlay {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  /* Semi-transparent black */
  //   background: #d339c4;
  z-index: 999;
  display: flex;
  padding: 36px;
  flex-direction: column;
  gap: 40px;

  .text {
    cursor: pointer;
    padding: 12px 0px;
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }

  .iconLink {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
}

.cart {
  position: fixed;
  top: 72px;
  // right: 80px;
  right: -520px;
  transition: right 0.3s ease-in-out; /* 过渡动画 */
  z-index: 10;
  display: flex;
  width: 361px;
  height: 453px;
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
          font-size: 13px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 0.34px;
          text-transform: uppercase;
          max-width: 120px;
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
.activeCart {
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
  background: none;
  transform: translate(-50%, -50%) scale(0) rotate(45deg) !important; /* 旋转成勾的形状 */
}
:deep(.el-radio__input.is-checked .el-radio__inner::after) {
  content: "";
  top: 40%;
  left: 50%;
  background: none;
  border-radius: 0;
  width: 4px; /* 勾的宽度 */
  height: 9px; /* 勾的高度 */
  border: solid white;
  border-width: 0 1px 1px 0; /* 右和下的边框形成勾 */

  transform: translate(-50%, -50%) scale(1) rotate(45deg) !important; /* 旋转成勾的形状 */
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
  padding: 0 0px;
  border: none !important;
  box-shadow: none !important;
}
:deep(.el-input-number .el-input__wrapper) {
  padding: 0;
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
  .activeCart {
    right: 30px;
    transition: right 0.3s ease-in-out; /* 过渡动画 */
  }
}
@media (max-width: 384px) {
  .activeCart {
    right: 10px;
    transition: right 0.3s ease-in-out; /* 过渡动画 */
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

.el-drawer {
  --el-drawer-bg-color: #000 !important;
}
</style>
