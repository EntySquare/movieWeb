<script setup lang='ts' name="HomeView">
import router from "@/router";
import useWalletStore from "@/store/modules/wallet";
import { ElNotification } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { connectWallet, formatData1 } from "@/utils/wallet";
import { showAllMyActivity } from "@/api/my";
import { OrderInfo } from "@/api/type";
const walletStore = useWalletStore();
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
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
</script>
<template>
  <div class="home_view">
    <div class="container" v-loading="loading">
      <div class="my">
        <div class="avater" v-if="walletStore.isWallet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
          >
            <circle
              cx="28"
              cy="28"
              r="28"
              fill="url(#paint0_linear_1326_3874)"
              style=""
            />
            <defs>
              <linearGradient
                id="paint0_linear_1326_3874"
                x1="10.1111"
                y1="56"
                x2="36.5556"
                y2="4.33973e-07"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stop-color="#D339C4"
                  style="
                    stop-color: #d339c4;
                    stop-color: color(display-p3 0.8292 0.2246 0.7687);
                    stop-opacity: 1;
                  "
                />
                <stop
                  offset="1"
                  stop-color="#FF81BD"
                  style="
                    stop-color: #ff81bd;
                    stop-color: color(display-p3 1 0.5042 0.7422);
                    stop-opacity: 1;
                  "
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="LAUNCHBtn" @click="login" v-if="!walletStore.isWallet">
          {{ t("nav.connect") }}
        </div>
        <div
          v-else
          class="nameCopy"
          @click="copyToClipboard(walletStore.walletAddress)"
        >
          <div class="name">{{ formatData1(walletStore.walletAddress) }}</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.25 2.625H8.25C7.95163 2.625 7.66548 2.74353 7.4545 2.9545C7.24353 3.16548 7.125 3.45163 7.125 3.75V7.125H3.75C3.45163 7.125 3.16548 7.24353 2.9545 7.4545C2.74353 7.66548 2.625 7.95163 2.625 8.25V20.25C2.625 20.5484 2.74353 20.8345 2.9545 21.0455C3.16548 21.2565 3.45163 21.375 3.75 21.375H15.75C16.0484 21.375 16.3345 21.2565 16.5455 21.0455C16.7565 20.8345 16.875 20.5484 16.875 20.25V16.875H20.25C20.5484 16.875 20.8345 16.7565 21.0455 16.5455C21.2565 16.3345 21.375 16.0484 21.375 15.75V3.75C21.375 3.45163 21.2565 3.16548 21.0455 2.9545C20.8345 2.74353 20.5484 2.625 20.25 2.625ZM14.625 19.125H4.875V9.375H14.625V19.125ZM19.125 14.625H16.875V8.25C16.875 7.95163 16.7565 7.66548 16.5455 7.4545C16.3345 7.24353 16.0484 7.125 15.75 7.125H9.375V4.875H19.125V14.625Z"
                fill="white"
                style="fill: white; fill-opacity: 1"
              />
            </svg>
          </div>
        </div>
        <div class="Activities">
          <div class="ActivitiesTitle" @click="router.push('/my/Activities')">
            <div class="title">{{ t("my.my1") }}</div>
            <div class="all">
              {{ t("shop.shop6")
              }}<svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  d="M10.0893 7.96427L5.71427 12.3393C5.59099 12.4626 5.42378 12.5318 5.24943 12.5318C5.07508 12.5318 4.90787 12.4626 4.78459 12.3393C4.6613 12.216 4.59204 12.0488 4.59204 11.8744C4.59204 11.7001 4.6613 11.5329 4.78459 11.4096L8.69529 7.49998L4.78568 3.58927C4.72464 3.52823 4.67621 3.45576 4.64318 3.376C4.61014 3.29624 4.59313 3.21076 4.59313 3.12443C4.59313 3.0381 4.61014 2.95262 4.64318 2.87286C4.67621 2.7931 4.72464 2.72063 4.78568 2.65959C4.84672 2.59854 4.91919 2.55012 4.99895 2.51708C5.07871 2.48404 5.16419 2.46704 5.25052 2.46704C5.33685 2.46704 5.42234 2.48404 5.50209 2.51708C5.58185 2.55012 5.65432 2.59854 5.71537 2.65959L10.0904 7.03459C10.1515 7.09563 10.1999 7.16813 10.233 7.24794C10.266 7.32774 10.2829 7.41328 10.2828 7.49966C10.2827 7.58603 10.2656 7.67153 10.2324 7.75126C10.1992 7.83099 10.1505 7.90338 10.0893 7.96427Z"
                  fill="#959595"
                  style="
                    fill: #959595;
                    fill: color(display-p3 0.5833 0.5833 0.5833);
                    fill-opacity: 1;
                  "
                />
              </svg>
            </div>
          </div>
          <!-- <div class="YearMonthDay">Jan 12,2025 / Mon</div> -->
          <div class="ActivitiesList" v-if="ActivityList.length > 0">
            <div
              class="ActivitiesItem"
              v-for="(item, index) in ActivityList.slice(0, 4)"
              :key="index"
            >
              <div
                class="itemImg"
                :style="{
                  backgroundImage: `url(${item.imageUrl}) `,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
              >
                <!-- <img :src="item.imageUrl" alt="" /> -->
              </div>
              <div class="text">
                <div class="title">{{ item.activityName }}</div>
                <div class="time">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1326_3866)">
                      <path
                        d="M6 0.9375C4.99873 0.9375 4.01995 1.23441 3.18743 1.79069C2.3549 2.34696 1.70603 3.13761 1.32286 4.06266C0.939694 4.98772 0.839439 6.00562 1.03478 6.98764C1.23011 7.96967 1.71227 8.87173 2.42027 9.57973C3.12828 10.2877 4.03033 10.7699 5.01236 10.9652C5.99439 11.1606 7.01229 11.0603 7.93734 10.6771C8.86239 10.294 9.65304 9.6451 10.2093 8.81257C10.7656 7.98005 11.0625 7.00127 11.0625 6C11.061 4.6578 10.5272 3.371 9.57809 2.42192C8.62901 1.47284 7.3422 0.938989 6 0.9375ZM6 9.9375C5.22124 9.9375 4.45996 9.70657 3.81244 9.27391C3.16493 8.84125 2.66025 8.2263 2.36223 7.50682C2.06421 6.78733 1.98623 5.99563 2.13816 5.23183C2.29009 4.46803 2.6651 3.76644 3.21577 3.21577C3.76644 2.6651 4.46803 2.29009 5.23183 2.13816C5.99563 1.98623 6.78733 2.0642 7.50682 2.36222C8.2263 2.66024 8.84126 3.16492 9.27391 3.81244C9.70657 4.45996 9.9375 5.22124 9.9375 6C9.93639 7.04395 9.52118 8.04482 8.783 8.783C8.04482 9.52118 7.04395 9.93638 6 9.9375ZM9.1875 6C9.1875 6.14918 9.12824 6.29226 9.02275 6.39775C8.91726 6.50324 8.77419 6.5625 8.625 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49677 6.29226 5.4375 6.14918 5.4375 6V3.375C5.4375 3.22582 5.49677 3.08274 5.60225 2.97725C5.70774 2.87176 5.85082 2.8125 6 2.8125C6.14919 2.8125 6.29226 2.87176 6.39775 2.97725C6.50324 3.08274 6.5625 3.22582 6.5625 3.375V5.4375H8.625C8.77419 5.4375 8.91726 5.49676 9.02275 5.60225C9.12824 5.70774 9.1875 5.85082 9.1875 6Z"
                        fill="white"
                        style="fill: white; fill-opacity: 1"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1326_3866">
                        <rect
                          width="12"
                          height="12"
                          fill="white"
                          style="fill: white; fill-opacity: 1"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {{ item.buyTime }}
                </div>
                <div class="Location">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M6 2.8125C5.59208 2.8125 5.19331 2.93346 4.85414 3.16009C4.51496 3.38672 4.2506 3.70884 4.0945 4.08572C3.93839 4.46259 3.89755 4.87729 3.97713 5.27737C4.05671 5.67746 4.25315 6.04496 4.54159 6.33341C4.83004 6.62185 5.19754 6.81829 5.59763 6.89787C5.99771 6.97745 6.41241 6.93661 6.78928 6.7805C7.16616 6.6244 7.48828 6.36004 7.71491 6.02086C7.94154 5.68169 8.0625 5.28292 8.0625 4.875C8.06188 4.32818 7.84438 3.80394 7.45772 3.41728C7.07106 3.03062 6.54682 2.81312 6 2.8125ZM6 5.8125C5.81458 5.8125 5.63332 5.75752 5.47915 5.6545C5.32498 5.55149 5.20482 5.40507 5.13386 5.23377C5.06291 5.06246 5.04434 4.87396 5.08051 4.6921C5.11669 4.51025 5.20598 4.3432 5.33709 4.21209C5.4682 4.08098 5.63525 3.99169 5.8171 3.95551C5.99896 3.91934 6.18746 3.93791 6.35877 4.00886C6.53007 4.07982 6.67649 4.19998 6.7795 4.35415C6.88252 4.50832 6.9375 4.68958 6.9375 4.875C6.9375 5.12364 6.83873 5.3621 6.66291 5.53791C6.4871 5.71373 6.24864 5.8125 6 5.8125ZM6 0.5625C4.85663 0.563741 3.76045 1.01849 2.95197 1.82697C2.14349 2.63545 1.68874 3.73163 1.6875 4.875C1.6875 8.50125 5.51438 11.2219 5.6775 11.3358C5.77203 11.4019 5.88462 11.4374 6 11.4374C6.11538 11.4374 6.22797 11.4019 6.3225 11.3358C7.04731 10.8016 7.71045 10.1885 8.29969 9.50766C9.61641 7.99547 10.3125 6.39234 10.3125 4.875C10.3113 3.73163 9.85651 2.63545 9.04803 1.82697C8.23955 1.01849 7.14337 0.563741 6 0.5625ZM7.46719 8.75203C7.02025 9.26542 6.52932 9.73878 6 10.1667C5.47068 9.73878 4.97975 9.26542 4.53281 8.75203C3.75 7.84547 2.8125 6.43641 2.8125 4.875C2.8125 4.02962 3.14832 3.21887 3.7461 2.6211C4.34387 2.02332 5.15462 1.6875 6 1.6875C6.84538 1.6875 7.65613 2.02332 8.2539 2.6211C8.85168 3.21887 9.1875 4.02962 9.1875 4.875C9.1875 6.43641 8.25 7.84547 7.46719 8.75203Z"
                      fill="white"
                      fill-opacity="0.6"
                      style="fill: white; fill-opacity: 0.6"
                    />
                  </svg>
                  {{ item.place }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="NoData"
            style="
              font-size: 20px;
              text-align: center;
              color: #e621ca;
              margin-top: 60px;
            "
            v-else
          >
            {{ t("noData") }}
          </div>
        </div>
        <div class="order" @click="router.push('/my/order')">
          <div class="title">{{ t("my.my2") }}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M17.296 12.796L9.79596 20.296C9.58461 20.5073 9.29797 20.626 8.99908 20.626C8.7002 20.626 8.41355 20.5073 8.20221 20.296C7.99086 20.0846 7.87213 19.798 7.87213 19.4991C7.87213 19.2002 7.99086 18.9136 8.20221 18.7022L14.9063 12L8.20408 5.29596C8.09944 5.19131 8.01642 5.06708 7.95979 4.93035C7.90316 4.79362 7.87401 4.64708 7.87401 4.49908C7.87401 4.35109 7.90316 4.20455 7.95979 4.06782C8.01642 3.93109 8.09944 3.80686 8.20408 3.70221C8.30873 3.59756 8.43296 3.51455 8.56969 3.45792C8.70642 3.40128 8.85296 3.37213 9.00096 3.37213C9.14895 3.37213 9.2955 3.40128 9.43222 3.45792C9.56895 3.51455 9.69319 3.59756 9.79783 3.70221L17.2978 11.2022C17.4026 11.3068 17.4857 11.4311 17.5423 11.568C17.5989 11.7048 17.628 11.8514 17.6278 11.9995C17.6276 12.1475 17.5982 12.2941 17.5413 12.4308C17.4843 12.5675 17.401 12.6916 17.296 12.796Z"
              fill="white"
              style="fill: white; fill-opacity: 1"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='less'>
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  height: 100vh;
  .container {
    padding: 48px 16px 136px 16px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 69px;
  }
}
.my {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  width: 100%;
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
    margin-bottom: 47.5px;
    margin-top: 8px;
  }
  .nameCopy {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 47.5px;
    margin-top: 8px;
    cursor: pointer;
    .name {
      color: #fff;
      font-family: Rubik;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.8px;
    }
  }
  .Activities {
    width: 100%;
    margin-bottom: 32px;
    .ActivitiesTitle {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 17.5px;
      .title {
        color: #fff;
        font-family: Rubik;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.4px;
      }
      .all {
        display: flex;
        align-items: center;
        color: #959595;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.56px;
        text-transform: uppercase;
      }
    }
    .YearMonthDay {
      color: rgba(255, 255, 255, 0.6);
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px; /* 100% */
      margin-bottom: 12px;
    }
    .ActivitiesList {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .ActivitiesItem {
        display: flex;
        gap: 12px;
        align-items: center;
        .itemImg {
          width: 80px;
          height: 80px;
          border-radius: 4px;
        }
        .text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          .title {
            color: #fff;
            font-family: Rubik;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.48px;
            text-transform: uppercase;
            max-width: 218px;
          }
          .time {
            display: flex;
            align-items: center;
            gap: 4px;
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 14px; /* 116.667% */
          }
          .Location {
            display: flex;
            gap: 4px;
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 14px; /* 116.667% */
          }
        }
      }
    }
  }
  .order {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    .title {
      color: #fff;
      font-family: Rubik;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.4px;
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