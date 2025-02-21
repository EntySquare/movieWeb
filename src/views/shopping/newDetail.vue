<template>
  <div class="home_view">
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
      <div class="cart" :class="{ active: isActive }">
        <div style="width: 100%">
          <div class="cartTitle">Shopping cart</div>
          <div class="cartList">
            <div
              class="cartItem"
              v-for="(item, index) in cartList"
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
                <img class="cartItemImg" :src="item.img" alt="" />
                <div class="text">
                  <div class="cartItemName">{{ item.name }}</div>
                  <div class="cartItemPN">
                    <div class="cartItemPrice">${{ item.price }}</div>
                    <div class="cartItemNum">*{{ item.num }}</div>
                  </div>
                </div>
              </div>
              <div class="Delete" @click="removeFromCart(index)">
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
          </div>
        </div>
        <div class="SubtotalAll">
          <div class="Subtotal">
            <div class="SubtotalTitle">Subtotal</div>
            <div class="SubtotalPrice">$58</div>
          </div>
          <div class="SubtotalBtn" @click="BuyNowClick">Buy now</div>
        </div>
      </div>
      <div class="detail">
        <div class="detailLeft">
          <div class="BigImg">
            <img src="@/assets/images/newBg.png" alt="" />
          </div>
          <div class="title">Movie Gift</div>
          <div class="participants">Sold 217</div>

          <div class="price">
            <div class="priceText">$58</div>
            <div class="button" @click="Buy">Buy now</div>
            <div
              @click="
                addToCart({
                  img: '/src/assets/images/newCard.png',
                  name: 'Movie Gift',
                  price: 58,
                  num: 2,
                })
              "
              style="cursor: pointer"
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
import router from "@/router";
import { ElNotification } from "element-plus";
import { ref } from "vue";
const Buy = () => {
  ElNotification({
    dangerouslyUseHTMLString: true,
    showClose: false,
    customClass: "message-logout",
    title: "Title of film-related activities",
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
    duration: 1000,
  });
};
const cartList = ref([
  {
    img: "/src/assets/images/newCard.png",
    name: "Movie Gift",
    price: 58,
    num: 1,
  },
]);

const isActive = ref(false);

// 添加商品到购物车
const addToCart = (item: {
  img: string;
  name: string;
  price: number;
  num: number;
}) => {
  const existingItem = cartList.value.find(
    (cartItem) => cartItem.name === item.name
  );
  if (existingItem) {
    existingItem.num += 1;
  } else {
    cartList.value.push({ ...item, num: 1 });
  }
  isActive.value = true;
};

// 删除商品
const removeFromCart = (index: number) => {
  cartList.value.splice(index, 1);
};

const BuyNowClick = () => {
  router.push("/newBuy");
  isActive.value = false;
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
  width: 291px;
  height: 383px;
  padding: 16px;
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
      .cartItemImg {
        width: 64px;
        height: 64px;
        aspect-ratio: 1/1;
        border-radius: 8px;
        background: #282828;
      }
      .text {
        .cartItemName {
          margin-bottom: 8px;
          color: #fff;
          font-family: Rubik;
          font-size: 16px;
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
            font-size: 16px;
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