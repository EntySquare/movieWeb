<script setup lang='ts' name="HomeView">
import { showAllMyActivity, showAllMyTicket } from "@/api/my";
import { OrderInfo } from "@/api/type";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
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
        title: res.data.json.message_zh,
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
  getActivityList();
});
</script>
<template>
  <div class="home_view">
    <div class="container" v-loading="loading">
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 40px 16px 100px 16px;
          max-width: 350px;
          gap: 24px;
        "
      >
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
        <div class="Order">Activities attended</div>
        <div class="ActivitiesList" v-if="ActivityList.length > 0">
          <div
            class="ActivitiesItem"
            v-for="(item, index) in ActivityList"
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
    </div>
  </div>
</template>
<style scoped lang='less'>
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  .container {
    min-height: 100vh;
    padding-top: 40px;
    width: 100%;
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
}
.father {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.Order {
  color: #fff;
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.4px;
  padding-bottom: 16px;
  border-bottom: 1px solid #2a2a2a;
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