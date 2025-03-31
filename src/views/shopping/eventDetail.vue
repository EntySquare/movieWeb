<template>
  <div class="home_view" v-loading="loading">
    <div class="container">
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
          Back
        </div>
      </div>

      <div class="detail" v-if="selectedProduct">
        <div class="detailLeft">
          <div
            class="BigImg"
            :style="{
              backgroundImage: `url(${selectedProduct.imageUrl}) `,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }"
          ></div>
          <div class="title">{{ selectedProduct.title }}</div>
          <div class="participants">
            {{ selectedProduct.attended }} participants
          </div>
          <div class="time">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 1.25C6.66498 1.25 5.35994 1.64588 4.2499 2.38758C3.13987 3.12928 2.27471 4.18349 1.76382 5.41689C1.25292 6.65029 1.11925 8.00749 1.3797 9.31686C1.64015 10.6262 2.28303 11.829 3.22703 12.773C4.17104 13.717 5.37377 14.3598 6.68314 14.6203C7.99252 14.8808 9.34971 14.7471 10.5831 14.2362C11.8165 13.7253 12.8707 12.8601 13.6124 11.7501C14.3541 10.6401 14.75 9.33502 14.75 8C14.748 6.2104 14.0362 4.49466 12.7708 3.22922C11.5053 1.96378 9.78961 1.25199 8 1.25ZM8 13.25C6.96165 13.25 5.94662 12.9421 5.08326 12.3652C4.2199 11.7883 3.547 10.9684 3.14964 10.0091C2.75228 9.04978 2.64831 7.99418 2.85088 6.97578C3.05345 5.95738 3.55347 5.02191 4.28769 4.28769C5.02192 3.55346 5.95738 3.05345 6.97578 2.85088C7.99418 2.6483 9.04978 2.75227 10.0091 3.14963C10.9684 3.54699 11.7883 4.2199 12.3652 5.08326C12.9421 5.94661 13.25 6.96165 13.25 8C13.2485 9.39193 12.6949 10.7264 11.7107 11.7107C10.7264 12.6949 9.39193 13.2485 8 13.25ZM12.25 8C12.25 8.19891 12.171 8.38968 12.0303 8.53033C11.8897 8.67098 11.6989 8.75 11.5 8.75H8C7.80109 8.75 7.61032 8.67098 7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V4.5C7.25 4.30109 7.32902 4.11032 7.46967 3.96967C7.61032 3.82902 7.80109 3.75 8 3.75C8.19892 3.75 8.38968 3.82902 8.53033 3.96967C8.67098 4.11032 8.75 4.30109 8.75 4.5V7.25H11.5C11.6989 7.25 11.8897 7.32902 12.0303 7.46967C12.171 7.61032 12.25 7.80109 12.25 8Z"
                fill="white"
                style="fill: white; fill-opacity: 1"
              />
            </svg>
            {{ selectedProduct.showTime }}
          </div>
          <div class="price">
            <div class="priceText">$ {{ selectedProduct.price }}</div>
            <div class="button" @click="sendUsdtTransaction">Buy Ticket</div>
          </div>
        </div>
        <div class="detailRight">
          <div class="host">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M9.7557 8.64062C9.15414 9.68297 8.14844 10.2812 7 10.2812C5.85156 10.2812 4.8475 9.68351 4.2443 8.64062C4.16103 8.49015 4.14015 8.31301 4.18616 8.1473C4.23217 7.98159 4.34138 7.84057 4.49031 7.75457C4.63924 7.66857 4.81597 7.64446 4.98249 7.68744C5.14901 7.73041 5.292 7.83704 5.38071 7.98437C5.59344 8.35242 6.08672 8.96875 7 8.96875C7.91328 8.96875 8.40656 8.35187 8.6193 7.98437C8.66152 7.90809 8.71851 7.84098 8.78695 7.78697C8.8554 7.73296 8.93392 7.69313 9.01792 7.6698C9.10193 7.64648 9.18975 7.64013 9.27624 7.65112C9.36273 7.66212 9.44617 7.69024 9.52167 7.73384C9.59717 7.77744 9.66323 7.83565 9.71598 7.90506C9.76873 7.97448 9.80713 8.05371 9.82891 8.13813C9.8507 8.22255 9.85545 8.31047 9.84288 8.39675C9.83031 8.48302 9.80068 8.56593 9.7557 8.64062ZM12.9063 7C12.9063 8.16815 12.5599 9.31006 11.9109 10.2813C11.2619 11.2526 10.3395 12.0096 9.26023 12.4567C8.181 12.9037 6.99345 13.0207 5.84775 12.7928C4.70205 12.5649 3.64966 12.0024 2.82365 11.1763C1.99765 10.3503 1.43513 9.29795 1.20724 8.15225C0.979346 7.00655 1.09631 5.819 1.54334 4.73978C1.99037 3.66055 2.74739 2.73812 3.71867 2.08913C4.68994 1.44015 5.83186 1.09375 7 1.09375C8.5659 1.09549 10.0672 1.71831 11.1744 2.82557C12.2817 3.93283 12.9045 5.4341 12.9063 7ZM11.5938 7C11.5938 6.09144 11.3243 5.20329 10.8196 4.44785C10.3148 3.69241 9.59735 3.10362 8.75795 2.75593C7.91856 2.40824 6.99491 2.31727 6.10381 2.49452C5.21271 2.67177 4.39418 3.10928 3.75173 3.75173C3.10928 4.39418 2.67177 5.2127 2.49452 6.1038C2.31727 6.9949 2.40824 7.91855 2.75593 8.75795C3.10362 9.59735 3.69241 10.3148 4.44785 10.8196C5.20329 11.3243 6.09144 11.5937 7 11.5937C8.21794 11.5924 9.38562 11.108 10.2468 10.2468C11.108 9.38562 11.5924 8.21794 11.5938 7ZM5.03125 6.78125C5.20431 6.78125 5.37348 6.72993 5.51738 6.63379C5.66127 6.53764 5.77342 6.40098 5.83965 6.2411C5.90587 6.08121 5.9232 5.90528 5.88944 5.73555C5.85568 5.56581 5.77234 5.4099 5.64997 5.28753C5.5276 5.16516 5.37169 5.08182 5.20196 5.04806C5.03222 5.0143 4.85629 5.03163 4.6964 5.09786C4.53652 5.16408 4.39986 5.27623 4.30372 5.42013C4.20757 5.56402 4.15625 5.73319 4.15625 5.90625C4.15625 6.13831 4.24844 6.36087 4.41253 6.52497C4.57663 6.68906 4.79919 6.78125 5.03125 6.78125ZM8.96875 5.03125C8.79569 5.03125 8.62652 5.08257 8.48263 5.17871C8.33873 5.27486 8.22658 5.41152 8.16036 5.5714C8.09413 5.73129 8.0768 5.90722 8.11056 6.07695C8.14433 6.24669 8.22766 6.4026 8.35003 6.52497C8.4724 6.64734 8.62831 6.73067 8.79805 6.76444C8.96778 6.7982 9.14371 6.78087 9.3036 6.71464C9.46349 6.64842 9.60014 6.53627 9.69629 6.39237C9.79243 6.24848 9.84375 6.07931 9.84375 5.90625C9.84375 5.67419 9.75156 5.45163 9.58747 5.28753C9.42338 5.12344 9.20082 5.03125 8.96875 5.03125Z"
                fill="white"
                style="fill: white; fill-opacity: 1"
              />
            </svg>
            host
          </div>
          <div class="USDTurl">
            <div
              class="item"
              v-for="item in selectedProduct.host"
              :key="item.name"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="16"
                  fill="#D339C4"
                  style="
                    fill: #d339c4;
                    fill: color(display-p3 0.8292 0.2246 0.7687);
                    fill-opacity: 1;
                  "
                />
              </svg>
              <div class="text">{{ item }}</div>
            </div>
          </div>
          <div class="positioning">
            <div class="posiTop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7 3.28125C6.52409 3.28125 6.05887 3.42237 5.66316 3.68678C5.26745 3.95118 4.95904 4.32698 4.77692 4.76667C4.59479 5.20635 4.54714 5.69017 4.63999 6.15694C4.73283 6.6237 4.962 7.05246 5.29852 7.38898C5.63504 7.7255 6.0638 7.95467 6.53056 8.04751C6.99733 8.14036 7.48115 8.09271 7.92083 7.91058C8.36052 7.72846 8.73632 7.42005 9.00072 7.02434C9.26513 6.62863 9.40625 6.16341 9.40625 5.6875C9.40553 5.04954 9.15178 4.43793 8.70068 3.98682C8.24957 3.53572 7.63796 3.28197 7 3.28125ZM7 6.78125C6.78368 6.78125 6.57221 6.7171 6.39234 6.59692C6.21248 6.47674 6.07229 6.30592 5.98951 6.10606C5.90672 5.9062 5.88506 5.68629 5.92727 5.47412C5.96947 5.26195 6.07364 5.06707 6.2266 4.9141C6.37957 4.76114 6.57445 4.65697 6.78662 4.61477C6.99879 4.57256 7.2187 4.59422 7.41856 4.67701C7.61842 4.75979 7.78924 4.89998 7.90942 5.07984C8.0296 5.25971 8.09375 5.47118 8.09375 5.6875C8.09375 5.97758 7.97852 6.25578 7.7734 6.4609C7.56828 6.66602 7.29008 6.78125 7 6.78125ZM7 0.65625C5.66607 0.657698 4.3872 1.18824 3.44397 2.13147C2.50074 3.0747 1.9702 4.35357 1.96875 5.6875C1.96875 9.91813 6.43344 13.0922 6.62375 13.2251C6.73404 13.3023 6.86539 13.3436 7 13.3436C7.13461 13.3436 7.26596 13.3023 7.37625 13.2251C8.22187 12.6019 8.99553 11.8865 9.68297 11.0923C11.2191 9.32805 12.0312 7.45773 12.0312 5.6875C12.0298 4.35357 11.4993 3.0747 10.556 2.13147C9.6128 1.18824 8.33393 0.657698 7 0.65625ZM8.71172 10.2107C8.19029 10.8097 7.61754 11.3619 7 11.8612C6.38246 11.3619 5.80971 10.8097 5.28828 10.2107C4.375 9.15305 3.28125 7.50914 3.28125 5.6875C3.28125 4.70123 3.67305 3.75535 4.37045 3.05795C5.06785 2.36055 6.01373 1.96875 7 1.96875C7.98627 1.96875 8.93215 2.36055 9.62955 3.05795C10.327 3.75535 10.7188 4.70123 10.7188 5.6875C10.7188 7.50914 9.625 9.15305 8.71172 10.2107Z"
                  fill="white"
                  style="fill: white; fill-opacity: 1"
                />
              </svg>
              Locations
            </div>
            <div class="posiBottom">{{ selectedProduct.place }}</div>
          </div>
          <div class="MapKit">
            <div ref="mapContainer" style="width: 100%; height: 100%"></div>
          </div>
          <div class="about">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M7.875 9.84375C7.875 10.0168 7.82368 10.186 7.72754 10.3299C7.63139 10.4738 7.49474 10.5859 7.33485 10.6521C7.17496 10.7184 6.99903 10.7357 6.8293 10.7019C6.65956 10.6682 6.50365 10.5848 6.38128 10.4625C6.25891 10.3401 6.17558 10.1842 6.14182 10.0145C6.10805 9.84472 6.12538 9.66879 6.19161 9.5089C6.25783 9.34902 6.36999 9.21236 6.51388 9.11621C6.65777 9.02007 6.82694 8.96875 7 8.96875C7.23207 8.96875 7.45463 9.06094 7.61872 9.22503C7.78281 9.38913 7.875 9.61168 7.875 9.84375ZM12.9063 7C12.9063 8.16815 12.5599 9.31006 11.9109 10.2813C11.2619 11.2526 10.3395 12.0096 9.26023 12.4567C8.181 12.9037 6.99345 13.0207 5.84775 12.7928C4.70205 12.5649 3.64966 12.0024 2.82365 11.1763C1.99765 10.3503 1.43513 9.29795 1.20724 8.15225C0.979346 7.00655 1.09631 5.819 1.54334 4.73978C1.99037 3.66055 2.74739 2.73812 3.71867 2.08913C4.68994 1.44015 5.83186 1.09375 7 1.09375C8.5659 1.09549 10.0672 1.71831 11.1744 2.82557C12.2817 3.93283 12.9045 5.4341 12.9063 7ZM11.5938 7C11.5938 6.09144 11.3243 5.20329 10.8196 4.44785C10.3148 3.69241 9.59735 3.10362 8.75795 2.75593C7.91856 2.40824 6.99491 2.31727 6.10381 2.49452C5.21271 2.67177 4.39418 3.10928 3.75173 3.75173C3.10928 4.39418 2.67177 5.2127 2.49452 6.1038C2.31727 6.9949 2.40824 7.91855 2.75593 8.75795C3.10362 9.59735 3.69241 10.3148 4.44785 10.8196C5.20329 11.3243 6.09144 11.5937 7 11.5937C8.21794 11.5924 9.38562 11.108 10.2468 10.2468C11.108 9.38562 11.5924 8.21794 11.5938 7ZM7 3.5C5.67328 3.5 4.59375 4.48109 4.59375 5.6875V5.90625C4.59375 6.0803 4.66289 6.24722 4.78596 6.37029C4.90903 6.49336 5.07595 6.5625 5.25 6.5625C5.42405 6.5625 5.59097 6.49336 5.71404 6.37029C5.83711 6.24722 5.90625 6.0803 5.90625 5.90625V5.6875C5.90625 5.20516 6.39844 4.8125 7 4.8125C7.60156 4.8125 8.09375 5.20516 8.09375 5.6875C8.09375 6.16984 7.60156 6.5625 7 6.5625C6.82595 6.5625 6.65903 6.63164 6.53596 6.75471C6.41289 6.87778 6.34375 7.0447 6.34375 7.21875V7.65625C6.34336 7.81838 6.403 7.97492 6.51118 8.09569C6.61936 8.21646 6.76841 8.29291 6.92961 8.3103C7.09081 8.32769 7.25274 8.28479 7.38419 8.18987C7.51563 8.09495 7.60729 7.95474 7.64149 7.79625C8.65758 7.54031 9.40625 6.69211 9.40625 5.6875C9.40625 4.48109 8.32672 3.5 7 3.5Z"
                fill="white"
                style="fill: white; fill-opacity: 1"
              />
            </svg>
            About
          </div>
          <div class="Brief">
            {{ selectedProduct.description }}
          </div>
        </div>
      </div>
      <div class="NoData" v-else>No data for now</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { purchaseActivity, showHotEventMovieWeb } from "@/api/shop";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AMapLoader from "@amap/amap-jsapi-loader";

const Buy = () => {};
const route = useRoute();
const name = route.query.name; // 获取 id
const movieId = route.query.movieId; // 获取 id
const selectedProduct = ref();
const gethotHotEventData = async () => {
  const res = await showHotEventMovieWeb({ name: name, movieId: movieId });
  console.log("gethotHotEventData", res.data.json);
  if (res.data.code === 0) {
    selectedProduct.value = res.data.json[0];
  }
};
const latitude = 22.533333333333335;
const longitude = 113.9;
onMounted(() => {
  gethotHotEventData();
  AMapLoader.load({
    key: "70aa10ce5670862ae22a6ae40f524f39", // 请替换成你的高德地图 API Key
    version: "2.0",
    plugins: ["AMap.Marker"],
  })
    .then((AMap) => {
      if (!mapContainer.value) return;

      // 创建地图实例
      const map = new AMap.Map(mapContainer.value, {
        center: [longitude, latitude], // 设置地图中心点
        zoom: 15, // 设置缩放级别
        viewMode: "2D",
      });
      map.setStatus({ logo: false });
      // 添加标记
      new AMap.Marker({
        position: [longitude, latitude],
        map: map,
        title: "Target position",
      });
    })
    .catch((e) => {
      console.error("高德地图加载失败", e);
    });
});

const mapContainer = ref<HTMLElement | null>(null);

import Web3 from "web3";

import usdtAbi from "@/abiU.json";
import useWalletStore from "@/store/modules/home";
import router from "@/router";
import { useTokenStore } from "@/store/modules/my";

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
      title: "Please connect your wallet before buying movie tickets",
      duration: 1000,
    });
    loading.value = false;
    return;
  }

  const accounts = await web3.eth.requestAccounts();
  const senderAddress = accounts[0];

  // **BSC USDT 合约地址**
  const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955"; // BSC 主网 USDT 地址
  // const recipientAddress = "0x55d398326f99059fF775485246999027B3197955"; // 电影票收款地址
  const recipientAddress = useTokenStore().toAddress;

  // **创建 USDT 合约实例**
  const usdtContract = new web3.eth.Contract(usdtAbi, usdtContractAddress);

  // **转账金额（假设 0.01 USDT，BSC USDT 使用 `ether` 作为单位）**
  const amount = web3.utils.toWei(selectedProduct.value.price, "ether");

  // **检查链 ID 是否为 BSC 主网**
  const networkId = await web3.eth.getChainId();
  if (networkId !== 56n) {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: "Wrong network",
      message: "Please switch to Binance Smart Chain (BSC) and try again.",
      duration: 3000,
    });
    loading.value = false;
    return;
  }
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
  // **调用 USDT 合约的 `transfer` 方法**
  const tx = await usdtContract.methods
    .transfer(recipientAddress, amount)
    .send({
      from: senderAddress,
      gasPrice: gasParams.gasPrice.toString(),
      gas: web3.utils.toHex(gasParams.gasLimit),
    });

  console.log("Transaction Hash:", tx.transactionHash);

  // **调用后端接口，通知交易成功**
  const res = await purchaseActivity({
    address: senderAddress,
    hash: tx.transactionHash,
    price: selectedProduct.value.price,
    activityId: selectedProduct.value.movieId,
  });

  if (res.data.code === 0) {
    ElNotification({
      dangerouslyUseHTMLString: true,
      customClass: "message-logout",
      title: selectedProduct.value.title,
      message: `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px; font-weight: 500;">
            Purchase Success!
          </div>
          <div id="verify-link" style="display: flex; align-items: center; color: #e621ca; font-size: 12px; font-weight: 500; cursor: pointer;">
            verification
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.0895 7.46427L5.71452 11.8393C5.59123 11.9626 5.42402 12.0318 5.24967 12.0318C5.07532 12.0318 4.90811 11.9626 4.78483 11.8393C4.66155 11.716 4.59229 11.5488 4.59229 11.3744C4.59229 11.2001 4.66155 11.0329 4.78483 10.9096L8.69553 6.99998L4.78592 3.08927C4.72488 3.02823 4.67646 2.95576 4.64342 2.876C4.61038 2.79624 4.59338 2.71076 4.59338 2.62443C4.59338 2.5381 4.61038 2.45262 4.64342 2.37286C4.67646 2.2931 4.72488 2.22063 4.78592 2.15959C4.84697 2.09854 4.91944 2.05012 4.9992 2.01708C5.07895 1.98404 5.16444 1.96704 5.25077 1.96704C5.3371 1.96704 5.42258 1.98404 5.50234 2.01708C5.5821 2.05012 5.65457 2.09854 5.71561 2.15959L10.0906 6.53459C10.1517 6.59563 10.2002 6.66813 10.2332 6.74794C10.2662 6.82774 10.2832 6.91328 10.2831 6.99966C10.283 7.08603 10.2658 7.17153 10.2326 7.25126C10.1994 7.33099 10.1508 7.40338 10.0895 7.46427Z" fill="#D339C4"/>
            </svg>
          </div>
        </div>`,
      duration: 6000,
    });

    setTimeout(() => {
      const verifyLink = document.getElementById("verify-link");
      if (verifyLink) {
        verifyLink.addEventListener("click", () => {
          router.push("/my");
        });
      }
    }, 100);
  }

  try {
  } catch (error: any) {
    console.error("Transaction failed:", error);

    if (
      error.code === 4001 ||
      error.message.includes("User denied transaction signature")
    ) {
      // 用户取消交易
      ElNotification({
        showClose: true,
        customClass: "message-logout",
        title: "The deal has been cancelled",
        message:
          "You have cancelled the transaction and have not completed the payment.",
        duration: 5000,
      });
    } else {
      // 其他错误
      ElNotification({
        customClass: "message-logout",
        title: "Failed transaction",
        message: error.message || "An error occurred during payment",
        duration: 5000,
      });
    }
  } finally {
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
    box-sizing: border-box;
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
      width: 350px;
      height: 350px;
      margin-bottom: 32px;
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
      max-width: 350px;
    }
    .participants {
      color: rgba(255, 255, 255, 0.6);
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 0.56px;
      margin-bottom: 12px;
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
        // text-transform: uppercase;
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

:deep(.el-loading-mask) {
  background: #000000c7;
}
:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
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

<style >
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
