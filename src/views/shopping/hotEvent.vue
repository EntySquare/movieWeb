<template>
  <div class="home_view">
    <div class="container" v-loading="loading">
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
        {{ t("back") }}
      </div>
      <div class="bg">
        <span>{{ t("shop.shop13") }}</span> <span>{{ t("shop.shop14") }}</span>
      </div>
      <div class="HotEventList" v-if="hotHotEvent">
        <div
          class="HotEventItem"
          v-for="item in hotHotEvent"
          :key="item"
          @click="
            router.push({
              path: '/eventDetail',
              query: { name: item.title, movieId: item.movieId },
            })
          "
        >
          <div
            class="HotEventImg"
            :style="{
              backgroundImage: `url(${item.imageUrl}) `,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          ></div>
          <div class="EventRight">
            <div class="EventTitle">{{ item.title }}</div>
            <div class="positioning">
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
          font-size: 30px;
          text-align: center;
          color: #e621ca;
          margin-top: 60px;
        "
        v-else
      >
        {{ t("noData") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showAllHotEvent } from "@/api/activity";
import { onMounted, ref } from "vue";
import router from "@/router";
import { useI18n } from "vue-i18n";
import { ElNotification } from "element-plus";
const { t, locale } = useI18n();

const loading = ref(false);
const hotHotEvent = ref();
const gethotHotEventData = async () => {
  loading.value = true;
  try {
    const res = await showAllHotEvent();
    if (res.data.code === 0) {
      hotHotEvent.value = res.data.json;
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
onMounted(() => {
  gethotHotEventData();
});
</script>

<style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  // height: 100%;

  .container {
    padding: 43px 120px 153px 120px;
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
  margin-bottom: 20px;
}
.bg {
  color: #fff;
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background: url("@/assets/images/hot3.png") no-repeat;
  background-size: contain;
  width: 1200px;
  height: 141px;
  flex-shrink: 0;
  border-radius: 16px;
  padding-left: 22px;
  padding-bottom: 17px;
  margin-bottom: 30px;
}
.HotEventList {
  display: flex;
  flex-wrap: wrap;
  gap: 88px;
  row-gap: 24px;
  // align-items: center;
  // justify-content: center;
}
.NoData {
  font-size: 30px;
  text-align: center;
  color: #e621ca;
  margin-top: 60px;
}
.HotEventItem {
  display: flex;
  gap: 13px;
  cursor: pointer;
  width: 330px;
  .HotEventImg {
    min-width: 88px;
    max-width: 88px;
    height: 88px;
    border-radius: 4px;
  }
  .EventRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 218px;
    .EventTitle {
      color: #fff;
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.64px;
      text-transform: uppercase;
    }
    .positioning {
      display: flex;
      align-items: center;
      gap: 4px;
      color: rgba(255, 255, 255, 0.6);

      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px; /* 116.667% */
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    .container {
      padding: 15px;
      .bg {
        width: 100%;
        height: 100px;
        // padding: 0;
        background-size: cover;
        background-position: center;
        span {
          font-size: 14px;
        }
      }
    }
  }
}

:deep(.el-loading-mask) {
  background: #000000c7;
}
:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}
</style>
