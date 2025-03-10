<template>
  <div class="home_view">
    <div class="container">
      <div style="width: 100%" v-loading="loading">
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
        <div class="buy">
          <div class="buyleft">
            <el-form :model="form" label-width="auto" style="max-width: 496px">
              <el-form-item>
                <div class="text">Contact</div>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model.trim="form.email"
                  placeholder="Email"
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <div class="text">delivery</div>
              </el-form-item>
              <el-form-item>
                <el-input
                  clearable
                  v-model.trim="form.country"
                  placeholder="Country/Region"
                />
                <!-- <el-select
                  :show-arrow="true"
                  clearable
                  v-model.trim="form.country"
                  placeholder="Country/Region"
                  popper-class="ContrySelect"
                  :teleported="false"
                >
                  <el-option
                    v-for="(country, index) in countries"
                    :key="index"
                    :label="country.name"
                    :value="country.code"
                  ></el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item>
                <el-input
                  clearable
                  v-model.trim="form.firstName"
                  placeholder="Frist name"
                />
                <el-input
                  clearable
                  v-model.trim="form.lastName"
                  placeholder="Last name"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  clearable
                  v-model.trim="form.apartment"
                  placeholder="Apartment, suite, etc. (optional)"
                />

                <!-- <el-select
                  v-model.trim="form.apartment"
                  placeholder="Apartment, suite, etc. (optional)"
                  popper-class="ContrySelect"
                  :teleported="false"
                  clearable
                >
                  <el-option
                    v-for="(country, index) in countries"
                    :key="index"
                    :label="country.name"
                    :value="country.code"
                  ></el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item>
                <el-input
                  clearable
                  v-model.trim="form.city"
                  placeholder="City"
                />
                <el-input
                  clearable
                  v-model.trim="form.province"
                  placeholder="Province"
                />
                <el-input
                  clearable
                  v-model.trim="form.postcode"
                  placeholder="Postal code"
                />
                <!-- <el-select
                  v-model.trim="form.city"
                  placeholder="City"
                  popper-class="ContrySelect"
                  :teleported="false"
                  clearable
                >
                  <el-option
                    v-for="(country, index) in countries"
                    :key="index"
                    :label="country.name"
                    :value="country.code"
                  ></el-option>
                </el-select>
                <el-select
                  v-model.trim="form.province"
                  placeholder="Province"
                  popper-class="ContrySelect"
                  :teleported="false"
                >
                  <el-option
                    v-for="(country, index) in countries"
                    :key="index"
                    :label="country.name"
                    :value="country.code"
                  ></el-option>
                </el-select>
                <el-select
                  v-model.trim="form.postcode"
                  placeholder="Postal code"
                  popper-class="ContrySelect"
                  :teleported="false"
                >
                  <el-option
                    v-for="(country, index) in countries"
                    :key="index"
                    :label="country.name"
                    :value="country.code"
                  ></el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item>
                <el-input
                  clearable
                  v-model.trim="form.phone"
                  placeholder="Phone"
                />
              </el-form-item>
              <el-form-item>
                <el-checkbox-group v-model="type">
                  <el-checkbox value="true" name="type">
                    Save this information for next time
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <div class="elButton" @click="submitForm">
                  <div>Submit</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                  >
                    <path
                      d="M7.55894 14.1862C7.22421 14.918 6.10722 16.625 2.96851 16.625C2.81103 16.625 2.66001 16.5624 2.54866 16.4511C2.43731 16.3397 2.37476 16.1887 2.37476 16.0313C2.37476 12.8925 4.08179 11.7755 4.81359 11.4408C4.88454 11.4085 4.96117 11.3904 5.03911 11.3877C5.11705 11.3849 5.19476 11.3975 5.26781 11.4248C5.34087 11.4521 5.40783 11.4935 5.46488 11.5467C5.52193 11.5999 5.56795 11.6638 5.6003 11.7347C5.63266 11.8057 5.65073 11.8823 5.65347 11.9603C5.65621 12.0382 5.64358 12.1159 5.61629 12.189C5.58899 12.262 5.54758 12.329 5.49441 12.386C5.44124 12.4431 5.37735 12.4891 5.3064 12.5214C4.82917 12.7389 3.77601 13.4388 3.59046 15.4093C5.56097 15.2238 6.26234 14.1706 6.47831 13.6934C6.51067 13.6224 6.55669 13.5585 6.61374 13.5054C6.67079 13.4522 6.73775 13.4108 6.8108 13.3835C6.88385 13.3562 6.96157 13.3435 7.03951 13.3463C7.11744 13.349 7.19408 13.3671 7.26503 13.3995C7.33599 13.4318 7.39987 13.4778 7.45304 13.5349C7.50621 13.5919 7.54763 13.6589 7.57492 13.7319C7.60221 13.805 7.61485 13.8827 7.6121 13.9607C7.60936 14.0386 7.5913 14.1152 7.55894 14.1862ZM16.6136 3.49868C16.596 3.20917 16.4731 2.93611 16.268 2.73102C16.0629 2.52593 15.7899 2.40299 15.5003 2.38539C14.5667 2.32973 12.1805 2.41508 10.2011 4.3945L6.53101 8.06758C6.47589 8.1228 6.41044 8.16661 6.33839 8.19653C6.26634 8.22645 6.1891 8.24189 6.11108 8.24195C5.95352 8.24209 5.80236 8.17964 5.69085 8.06832C5.57934 7.95701 5.51662 7.80596 5.51648 7.6484C5.51634 7.49084 5.5788 7.33968 5.69011 7.22817L7.66136 5.25618C7.70263 5.21466 7.7307 5.16188 7.74205 5.10445C7.75341 5.04703 7.74753 4.98753 7.72516 4.93344C7.7028 4.87934 7.66494 4.83307 7.61634 4.80043C7.56775 4.76779 7.5106 4.75025 7.45206 4.75H5.51792C5.3615 4.74918 5.20647 4.77946 5.06185 4.83909C4.91724 4.89872 4.78592 4.98651 4.67554 5.09735L2.12983 7.64453C1.97371 7.80055 1.86416 7.99699 1.81348 8.2118C1.76279 8.42661 1.77297 8.6513 1.84288 8.86065C1.9128 9.07 2.03967 9.25572 2.20926 9.39697C2.37886 9.53823 2.58446 9.62942 2.803 9.66032L5.65819 10.0589L8.93941 13.3401L9.33796 16.1968C9.36861 16.4153 9.45978 16.6209 9.60116 16.7904C9.74255 16.9598 9.92851 17.0864 10.138 17.1557C10.2601 17.1964 10.3879 17.2172 10.5166 17.2173C10.6723 17.2176 10.8267 17.187 10.9706 17.1274C11.1145 17.0678 11.2453 16.9803 11.3552 16.8699L13.9024 14.3242C14.0129 14.2136 14.1005 14.0822 14.1601 13.9377C14.2197 13.7931 14.2502 13.6382 14.2498 13.4818V11.5477C14.2497 11.489 14.2322 11.4317 14.1995 11.3829C14.1668 11.3342 14.1204 11.2962 14.0662 11.2738C14.0119 11.2514 13.9523 11.2456 13.8947 11.2571C13.8372 11.2686 13.7843 11.2969 13.7428 11.3384L11.7709 13.3097C11.7132 13.3674 11.6442 13.4126 11.5683 13.4425C11.4923 13.4724 11.4111 13.4863 11.3295 13.4834C11.248 13.4805 11.1679 13.4608 11.0943 13.4255C11.0207 13.3902 10.9551 13.3402 10.9017 13.2785C10.8044 13.1607 10.7549 13.0105 10.7631 12.8579C10.7714 12.7052 10.8368 12.5613 10.9463 12.4547L14.603 8.79789C16.5839 6.81774 16.6693 4.4316 16.6136 3.49719V3.49868Z"
                      fill="white"
                      style="fill: white; fill-opacity: 1"
                    />
                  </svg>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="buyright">
            <div class="Commodity">
              <div
                class="CommodityItem"
                v-for="item in selectedProduct"
                :key="item.goodsId"
              >
                <div class="CommodityImg">
                  <img :src="item.image" alt="" />
                </div>
                <div class="CommodityName">{{ item.title }}</div>
                <div class="CommodityPrice">
                  <div class="price">${{ item.price }}</div>
                  <div class="num">*{{ item.number }}</div>
                </div>
              </div>
            </div>
            <div class="total">
              <div class="title">Total</div>
              <div class="price">${{ totalPrice }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import useWalletStore from "@/store/modules/home";
import { useProductStore } from "@/store/modules/product";
import { ElNotification } from "element-plus";
import { onMounted, ref, watch } from "vue";
import Web3 from "web3";
import usdtAbi from "@/abiU.json";
import { purchaseGoods, scanPurchaseStatus } from "@/api/shop";
import { useFormStore } from "@/store/modules/buy"; // 你的 Pinia store 路径
import { computed } from "vue";
import { useTokenStore } from "@/store/modules/my";
import { CartItem, GoodsInfo } from "@/api/type";
const productStore = useProductStore();

// 获取选中的商品信息
let selectedProduct = ref<CartItem[] | GoodsInfo[]>(
  productStore.selectedProduct
);

selectedProduct = computed(() => {
  return productStore.selectedProduct;
}); // 变成 computed
// 计算总价格
const totalPrice = computed(() => {
  if (Array.isArray(selectedProduct.value)) {
    return (productStore.selectedProduct as (CartItem | GoodsInfo)[]).reduce(
      (sum, item) => sum + Number(item.price) * item.number,
      0
    );
  }
  return 0; // 如果 selectedProduct 不是数组，返回默认值
});

const type = ref<string[]>([]);
const form = ref({
  email: "",
  country: "",
  firstName: "",
  lastName: "",
  apartment: "",
  phone: "",
  city: "",
  province: "",
  postcode: "",
});

const validateField = (field: string, message: string) => {
  if (!field.trim()) {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: message,
      duration: 1000,
    });
    return false;
  }
  return true;
};
const loading = ref(false);
const walletStore = useWalletStore(); // 导入钱包状态
const web3 = new Web3(window.ethereum);

const formStore = useFormStore();
// **回显数据**
onMounted(() => {
  // 检查是否有保存的数据，如果有，则勾选复选框
  if (formStore.savedForm.email) {
    form.value = { ...formStore.savedForm };
    type.value = ["true"]; // 设置 checkbox 为勾选状态
  }
});

// **监听 type[0]，保存或清除数据**
watch(
  () => type.value[0],
  (newVal) => {
    if (newVal === "true") {
      formStore.saveForm(form.value); // 保存数据
    } else {
      formStore.clearForm(); // 清除保存的数据
    }
  }
);

const submitForm = async () => {
  if (
    !validateField(form.value.email, "Email cannot be empty") ||
    !validateField(form.value.country, "Country cannot be empty") ||
    !validateField(form.value.firstName, "FristName cannot be empty") ||
    !validateField(form.value.lastName, "LastName cannot be empty") ||
    !validateField(form.value.city, "City cannot be empty") ||
    !validateField(form.value.province, "Province cannot be empty") ||
    !validateField(form.value.postcode, "PostalCode cannot be empty") ||
    !validateField(form.value.phone, "Phone cannot be empty") ||
    !validateField(form.value.apartment, "Apartment cannot be empty")
  ) {
    return;
  }
  // 控制按钮 loading 状态
  loading.value = true;
  formStore.saveForm(form.value);
  // 检查钱包是否连接

  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: "请连接钱包后再购买",
      duration: 1000,
    });
    loading.value = false;
    return;
  }
  // 检查当前网络是否为 Arbitrum One 主网
  const networkId = await web3.eth.net.getId();
  // if (networkId !== 42161n) {
  //   ElNotification({
  //     showClose: true,
  //     customClass: "message-logout",
  //     title: "请切换到 Arbitrum One 网络",
  //     message: "当前网络不是 Arbitrum 主网，请切换到 Arbitrum One。",
  //     duration: 5000,
  //   });
  //   loading.value = false;
  //   return;
  // }
  const accounts = await web3.eth.requestAccounts();
  const senderAddress = accounts[0];

  // USDT 合约地址和 ABI
  const usdtContract = new web3.eth.Contract(
    usdtAbi,
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
  );

  // 转账金额，假设用户支付 0.01 USDT
  const amount = web3.utils.toWei(totalPrice.value, "mwei"); // USDT 使用 mwei 为单位
  console.log("amountmwei", amount);
  // const gasPrice = await web3.eth.getGasPrice();
  // 电影票的接收地址
  const recipientAddress = "0x5f5c3a0c19005d8f3607222d79a7492412501582";
  // 🗝️ 5. 优化 Gas 估算逻辑
  console.log("111111111111");
  const [gasPrice, gasLimit] = await Promise.all([
    web3.eth.getGasPrice(),
    usdtContract.methods
      .transfer(recipientAddress, amount)
      .estimateGas({ from: senderAddress })
      .then((limit) => Math.floor(Number(limit) * 1.2)), // 增加 20% 余量
  ]);
  try {
    console.log("2222222222222222222222");
    // console.log(
    //   "usdtContract.methods.",
    //   usdtContract.methods.transfer(recipientAddress, amount.toString()).send({
    //     from: senderAddress,
    //     gasPrice: web3.utils.toWei('0.0001', 'gwei').toString(), // 0.1 gwei = 100,000,000 wei
    // gas: web3.utils.toHex(gasLimit), // 转换为十六进制
    //   })
    // );

    const tx = await usdtContract.methods
      .transfer(recipientAddress, amount)
      .send({
        from: senderAddress,
        gasPrice: web3.utils.toWei("0.0001", "gwei").toString(), // 0.1 gwei = 100,000,000 wei
        gas: web3.utils.toHex(gasLimit), // 转换为十六进制
      });
    console.log("tx", tx);

    const res = await purchaseGoods({
      cartsId:
        selectedProduct.value[0].cartId !== ""
          ? selectedProduct.value[0].cartId
          : "",
      goodsId: selectedProduct.value[0].goodsId, // 如果你是直接购买 不走购物车，就给“”
      number: String(selectedProduct.value[0].number),
      amount: String(totalPrice.value),
      address: form.value,
      // hash: txHash.transactionHash,
      hash: "0x556eae566286b6c00cbf5432279106ad5a3aafd5b1c261e98c4b712d716ce2bb",

      // from: senderAddress,
      from: "0x5f5c3a0c19005d8f3607222d79a7492412501582",
      payType: 3, // 1 表示 PayPal
      remarks: "", // remarks是备注，你传空就行
    });
    console.log("res", res);
    console.log("222222222222222");
    try {
      //  请求
      if (res.data.code === 0) {
        const res1 = await scanPurchaseStatus({
          payType: 3,
          // address: senderAddress,
          address: "0x5f5c3a0c19005d8f3607222d79a7492412501582",
          // hash: txHash.transactionHash,
          hash: "0x556eae566286b6c00cbf5432279106ad5a3aafd5b1c261e98c4b712d716ce2bb",
        });
        if (res1.data.code === 0) {
          console.log("re s111", res1);
          console.log("33333333333333");
          ElNotification({
            dangerouslyUseHTMLString: true,
            customClass: "message-logout",
            title: selectedProduct.value[0].title + "购买成功",
            message: ` <div style="display: flex; align-items: center;justify-content: space-between;">
                <div
                  style="
                    color: rgba(255, 255, 255, 0.6);
                    font-family: Inter;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 14px;
                  "
                >
                  Purchase Success!
                </div>
                <div
                 id="verify-link"
                  style="
                    display: flex;
                    align-items: center;
                    color: #e621ca;
                    font-family: Inter;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 16px;
                      cursor: pointer;
                      "
                     
                >
                  verification
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M10.0895 7.46427L5.71452 11.8393C5.59123 11.9626 5.42402 12.0318 5.24967 12.0318C5.07532 12.0318 4.90811 11.9626 4.78483 11.8393C4.66155 11.716 4.59229 11.5488 4.59229 11.3744C4.59229 11.2001 4.66155 11.0329 4.78483 10.9096L8.69553 6.99998L4.78592 3.08927C4.72488 3.02823 4.67646 2.95576 4.64342 2.876C4.61038 2.79624 4.59338 2.71076 4.59338 2.62443C4.59338 2.5381 4.61038 2.45262 4.64342 2.37286C4.67646 2.2931 4.72488 2.22063 4.78592 2.15959C4.84697 2.09854 4.91944 2.05012 4.9992 2.01708C5.07895 1.98404 5.16444 1.96704 5.25077 1.96704C5.3371 1.96704 5.42258 1.98404 5.50234 2.01708C5.5821 2.05012 5.65457 2.09854 5.71561 2.15959L10.0906 6.53459C10.1517 6.59563 10.2002 6.66813 10.2332 6.74794C10.2662 6.82774 10.2832 6.91328 10.2831 6.99966C10.283 7.08603 10.2658 7.17153 10.2326 7.25126C10.1994 7.33099 10.1508 7.40338 10.0895 7.46427Z"
                      fill="#D339C4"
                      style="
                        fill: #d339c4;
                        fill: color(display-p3 0.8292 0.2246 0.7687);
                        fill-opacity: 1;
                      "
                    />
                  </svg>
                </div>
              </div>`,
            duration: 60000,
          });
          // **使用 setTimeout 等待 DOM 渲染后绑定事件**
        } else {
          ElNotification({
            dangerouslyUseHTMLString: true,
            customClass: "message-logout",
            title: res.data.json.message,
            duration: 6000,
          });
          loading.value = false;
        }
      } else {
        ElNotification({
          dangerouslyUseHTMLString: true,
          customClass: "message-logout",
          title: res.data.json.message,
          duration: 6000,
        });
        loading.value = false;
      }
    } catch (error: any) {
      if (
        error.code === 4001 ||
        error.message.includes("User denied transaction signature")
      ) {
        // 用户取消交易
        ElNotification({
          showClose: true,
          customClass: "message-logout",
          title: "交易已取消",
          message: "您已取消交易，未完成支付。",
          duration: 5000,
        });
      } else {
        // 其他错误
        ElNotification({
          customClass: "message-logout",
          title: "交易失败",
          message: error.message || "支付过程中发生错误",
          duration: 5000,
        });
      }
      console.error("error", error);
      loading.value = false;
    } finally {
      loading.value = false;
    }
  } catch (error) {
    console.error("error", error);
  } finally {
    loading.value = false;
  }
  setTimeout(() => {
    const verifyLink = document.getElementById("verify-link");
    if (verifyLink) {
      verifyLink.addEventListener("click", () => {
        router.push("/my"); // Vue Router 跳转
      });
    }
  }, 100);
};
</script>


<style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  height: 100%;

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
.buy {
  display: flex;
  gap: 86px;
  .buyleft {
    .text {
      color: #fff;
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.64px;
      text-transform: uppercase;
    }
    .el-form-item {
      margin-bottom: 16px;
      :deep(.el-form-item__content) {
        display: flex;
        align-items: center;
        gap: 24px;
        flex-wrap: nowrap;
      }
      .elButton {
        cursor: pointer;
        width: 100%;
        display: flex;
        padding: 16px 24px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        border-radius: 99px;
        border: 1px solid #ff7121;
        background: #e621ca;
        box-shadow: 0px 1px 2px 0px rgba(14, 24, 41, 0.05);
        color: #fff;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.32px;
      }
    }
    :deep(.el-checkbox__label) {
      padding-left: 12px;
      color: #fff;
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.56px;
    }
    :deep(.el-checkbox__inner) {
      border-radius: 4px;
      border: 1px solid #676767;
      background: #000;
      width: 16px;
      height: 16px;
    }
    :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
      background-color: #e621ca;
      border-color: #e621ca;
    }
    :deep(.el-checkbox__input.is-checked .el-checkbox__inner:after) {
      left: 5px;
    }
    .el-input {
      display: flex;
      // padding: 16px 24px;
    }
    :deep(.el-input__wrapper) {
      display: flex;
      padding: 12px 24px;
      gap: 10px;
      border-radius: 12px;
      background: #121212;
      border: none;
      box-shadow: none;
    }
    :deep(.el-input__inner) {
      color: rgb(255, 255, 255);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.36px;
    }
    :deep(.el-input__inner::placeholder) {
      color: rgba(255, 255, 255, 0.32);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.36px;
    }
    :deep(.el-tooltip__trigger) {
      display: flex;
      width: 100%;
      padding: 16px 24px;

      gap: 10px;
      align-self: stretch;
      border-radius: 12px;
      background: #121212;
      border: none;
      box-shadow: none;
    }

    :deep(.el-select__placeholder) {
      color: rgb(255, 255, 255);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.36px;
    }
    :deep(.el-select__placeholder.is-transparent) {
      color: rgba(255, 255, 255, 0.32);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.36px;
    }
    :deep(.el-select__icon) {
      // width: 0;
    }

    :deep(
        .el-select__popper.el-popper,
        .el-select__popper.el-popper .el-popper__arrow:before
      ) {
      border: none;
      background: #121212 !important;
    }

    :deep(.el-popper__arrow::before) {
      background-color: #121212 !important;
      border: none !important;
    }
    :deep(.el-select-dropdown__item.is-hovering) {
      background-color: rgba(255, 255, 255, 0.07);
    }
    :deep(.el-select-dropdown__item) {
      color: #fff;
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.56px;
      display: flex;
      align-items: center;
    }
  }
  .buyright {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    .Commodity {
      display: flex;
      gap: 14px;
      flex-direction: column;
      margin-bottom: 70px;
      max-height: 480px;
      overflow: hidden;
      overflow-y: auto; /* 允许垂直滚动 */
      -ms-overflow-style: none; /* 兼容IE/Edge 隐藏滚动条 */
      scrollbar-width: none; /* 兼容Firefox 隐藏滚动条 */

      .CommodityItem {
        display: flex;
        align-items: center;
        .CommodityImg {
          width: 64px;
          height: 64px;
          border-radius: 8px;
          background: #282828;
          margin-right: 16px;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        }
        .CommodityName {
          color: #fff;
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.64px;
          text-transform: uppercase;
          margin-right: 91px;
        }
        .CommodityPrice {
          display: flex;
          align-items: center;
          .price {
            color: #e621ca;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 22px; /* 137.5% */
            margin-right: 4px;
          }
          .num {
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
    .Commodity::-webkit-scrollbar {
      display: none; /* 兼容Chrome/Safari 隐藏滚动条 */
    }
    .total {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      .title {
        color: #fff;
        font-family: Rubik;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 91.667% */
      }
      .price {
        color: #e621ca;
        font-family: Rubik;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 91.667% */
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