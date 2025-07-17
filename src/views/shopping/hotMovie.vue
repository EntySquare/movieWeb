<script setup lang="ts" name="HomeView">
import { showAllHotMovie } from "@/api/activity";
import { computed, onMounted, ref } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { ElNotification } from "element-plus";
const { t, locale } = useI18n();
const HotMoviesdata = ref<any>([]);
const getHotMoviesData = async () => {
  loading.value = true;
  try {
    const res = await showAllHotMovie();
    if (res.data.code === 0) {
      HotMoviesdata.value = res.data.json;
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
  getHotMoviesData();
});
const loading = ref(false);
</script>

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
            d="M13.1633 15.5867C13.3394 15.7628 13.4384 16.0017 13.4384 16.2508C13.4384 16.4999 13.3394 16.7387 13.1633 16.9148C12.9872 17.091 12.7483 17.2899 12.4992 17.1899C12.2502 17.1899 12.0113 17.091 11.8352 16.9148L5.58519 10.6648C5.49779 10.5777 5.42844 10.4743 5.38112 10.3603C5.33381 10.2463 5.30945 10.1242 5.30945 10.0008C5.30945 9.87739 5.33381 9.75522 5.38112 9.64126C5.42844 9.52731 5.49779 9.42381 5.58519 9.33672L11.8352 3.08672C12.0113 2.9106 12.2502 2.81165 12.4992 2.81165C12.7483 2.81165 12.9872 2.9106 13.1633 3.08672C13.3394 3.26284 13.4384 3.50171 13.4384 3.75078C13.4384 3.99985 13.3394 4.23872 13.1633 4.41484L7.57816 10L13.1633 15.5867Z"
            fill="white"
            fill-opacity="0.8"
            style="fill: white; fill-opacity: 0.8"
          />
        </svg>
        {{ t("back") }}
      </div>
      <div class="container_head">
        <div>Hot Movie</div>
        <img src="@/assets/images/shop/img11.png" alt="" />
      </div>
      <div class="container_list">
        <div
          class="container_list_item"
          v-for="(item, index) in HotMoviesdata"
          :key="index"
        >
          <div class="hotImgBack">
            <div class="hotImg">
              <div>
                <img src="@/assets/images/shop/img3.png" alt="" />
                <img src="@/assets/images/shop/img4.png" alt="" />
              </div>
              <img class="imageUrl" :src="item.imageUrl" alt="error" />
            </div>
          </div>
          <div class="hotText">
            {{ item.title }}
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
  height: max-content;
  max-width: 1440px;
  margin: 0 auto;

  .container {
    width: 100%;
    padding: 40px 80px 10px 80px;
    overflow: hidden;
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
    .container_head {
      width: max-content;
      position: relative;
      color: #efcff6;
      text-align: right;
      font-family: Montserrat;
      font-size: 32px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: uppercase;
      margin: 16px 0 24px;
      img {
        width: 44px;
        height: auto;
        position: absolute;
        right: -17px;
        bottom: 0px;
        z-index: 2;
      }
    }
    .container_list {
      height: max-content;
      display: flex;
      flex-wrap: wrap;
      gap: 24px 64px;
      .container_list_item {
        min-width: 160px;
        max-width: 160px;
        cursor: pointer;
        .hotImgBack {
          margin-bottom: 16px;
          flex-shrink: 0;
          background: rgba(41, 41, 41, 0.75);
          background-size: cover;
          min-width: 160px;
          max-width: 160px;
          height: 230px;
          flex-shrink: 0;
          border-radius: 8.5px;
          overflow: hidden;
        }
        .hotImg {
          min-width: 160px;
          max-width: 160px;
          height: 230px;
          flex-shrink: 0;
          border-radius: 8.5px;
          overflow: hidden;
          background: url("@/assets/images/shop/img5.png") no-repeat;
          background-size: cover;
          div {
            width: 100%;
            height: 22px;
            padding: 2px 6px 0px 8px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
              &:first-child {
                width: 27px;
                height: auto;
              }
              &:last-child {
                width: 81px;
                height: auto;
              }
            }
          }
          .imageUrl {
            width: 232px;
            height: 304px;
            flex-shrink: 0;
            border-radius: 1.207px 4.829px 4.829px 1.207px;
            box-shadow: 1.207px 1.207px 0px 0px #151515,
              3.621px 0px 3.44px 0px rgba(255, 255, 255, 0.51) inset;
          }
        }
        .hotText {
          max-width: 160px;
          margin: auto;
          color: #fff;
          text-align: center;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.56px;
          text-transform: uppercase;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* 限制最多两行 */
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    max-width: 100% !important;

    .container {
      padding: 24px 20px !important;
      .back {
        margin-bottom: 16px !important;
      }
      .container_list {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 24px 16px !important;
        .container_list_item {
          min-width: 100% !important;
          max-width: 100% !important;
          .hotImgBack {
            margin-bottom: 8px !important;
            flex-shrink: 0;
            background: rgba(41, 41, 41, 0.75);
            background-size: cover;
            min-width: 100% !important;
            max-width: 100% !important;
            height: 152px !important;
            flex-shrink: 0;
            border-radius: 5.5px !important;
            overflow: hidden;
          }
          .hotImg {
            min-width: 100% !important;
            max-width: 100% !important;
            height: 150px !important;
            border-radius: 5.5px !important;
            div {
              min-width: 100% !important;
              max-width: 100% !important;
              height: 13px !important;
              padding: 2px 4px 0px 5px !important;
              img {
                &:first-child {
                  width: 18px !important;
                }
                &:last-child {
                  width: 54px !important;
                }
              }
            }
            .imageUrl {
              width: calc(100% - 4px) !important;
              height: 135px !important;
            }
          }
          .hotText {
            max-width: 100% !important;
            text-align: left !important;
            font-size: 12px !important;
            font-weight: 400 !important;
          }
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
