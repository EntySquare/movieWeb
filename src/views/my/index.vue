<script setup lang="ts" name="HomeView">
import router from "@/router";
import useWalletStore from "@/store/modules/wallet";
import { ElNotification } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { connectWallet, formatData1 } from "@/utils/wallet";
import { showAllMyActivity } from "@/api/my";
import { OrderInfo } from "@/api/type";
import { useI18n } from "vue-i18n";

const walletStore = useWalletStore();
const { t, locale } = useI18n();
const navIndex = ref(0);

// 复制数据到剪贴板
const copyToClipboard = async (data: string) => {
  try {
    await navigator.clipboard.writeText(data);
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: "Copy successfully",
      duration: 1000,
    });
  } catch (err) {
    console.error("复制失败:", err);
  }
};
const loading = ref(false);

const ActivityList = ref<OrderInfo[]>([]);
const getActivityList = async () => {
  loading.value = true;

  try {
    const res = await showAllMyActivity();
    if (res.data.code === 0) {
      ActivityList.value = res.data.json;
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

const login = async () => {
  loading.value = true;
  await connectWallet();
  loading.value = false;
};

onMounted(() => {
  getActivityList();
});

const changeNavIndex = (index: any) => {
  navIndex.value = index;
};
</script>
<template>
  <div class="home_view">
    <div class="container" v-loading="loading">
      <div class="container_head">
        <div class="container_head_avatar">M</div>
        <div class="container_head_address">
          <div>0x7hu...69i8</div>
          <img src="@/assets/images/my/img2.png" alt="" />
        </div>
      </div>
      <div class="container_content">
        <div class="container_content_nav">
          <div class="ccn_head">
            <div class="ccn_head_address">
              <div class="ccnh_address_title">Wallet balance</div>
              <div class="ccnh_address_text">
                <div>0x7hu...69i8</div>
                <img src="@/assets/images/my/img2.png" alt="" />
              </div>
            </div>
            <div class="ccn_head_balance">876,786 USDT</div>
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
          <div class="ccn_logout">
            <img src="@/assets/images/my/img4.png" alt="" />
            <div>Log Out</div>
          </div>
        </div>
        <div class="container_content_list"></div>
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
