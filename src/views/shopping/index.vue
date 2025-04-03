<script setup lang="ts" name="HomeView">
import { showAllHotEvent, showAllHotMovie } from "@/api/activity";
import { displayDetailsGoods } from "@/api/shop";
import router from "@/router";
import { onMounted, ref } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const activeIndex = ref(null);
// 鼠标移入，记录当前悬停的元素索引
const hoverItem = (index: any) => {
  activeIndex.value = index;
};

const { width, height } = useWindowSize();

// 鼠标移出，恢复默认状态
const resetItems = () => {
  activeIndex.value = null;
};

const HotMoviesdata = ref();
const hotHotEvent = ref();
const newProduct = ref();

import { ElSkeleton } from "element-plus";

// 新增加载状态
const loadingStates = ref({
  hotMovies: true,
  hotEvent: true,
  newProduct: true,
});

const getHotMoviesData = async () => {
  try {
    const res = await showAllHotMovie();
    if (res.data.code === 0) {
      HotMoviesdata.value = res.data.json;
    }
  } finally {
    loadingStates.value.hotMovies = false;
  }
};

const gethotHotEventData = async () => {
  try {
    const res = await showAllHotEvent();
    if (res.data.code === 0) {
      hotHotEvent.value = res.data.json;
    }
  } finally {
    loadingStates.value.hotEvent = false;
  }
};

const getNewProductData = async () => {
  try {
    const res = await displayDetailsGoods({ search: "" });
    if (res.data.code === 0) {
      newProduct.value = res.data.json.displayDetailsGoodsList;
    }
  } finally {
    loadingStates.value.newProduct = false;
  }
};
onMounted(() => {
  getHotMoviesData();
  gethotHotEventData();
  getNewProductData();
});
</script>
<template>
  <div class="home_view">
    <div class="container">
      <div class="shopTop">
        <div class="movie">
          <div class="movieText">{{ t("shop.shop1") }}</div>
          <div class="movieBtn">
            {{ t("shop.shop2")
            }}<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M14.0306 9.03063L9.53063 13.5306C9.38973 13.6715 9.19863 13.7507 8.99938 13.7507C8.80012 13.7507 8.60902 13.6715 8.46813 13.5306C8.32723 13.3897 8.24807 13.1986 8.24807 12.9994C8.24807 12.8001 8.32723 12.609 8.46813 12.4681L11.6875 9.25H2.5C2.30109 9.25 2.11032 9.17098 1.96967 9.03033C1.82902 8.88968 1.75 8.69892 1.75 8.5C1.75 8.30109 1.82902 8.11032 1.96967 7.96967C2.11032 7.82902 2.30109 7.75 2.5 7.75H11.6875L8.46937 4.53C8.32848 4.38911 8.24932 4.19801 8.24932 3.99875C8.24932 3.7995 8.32848 3.6084 8.46937 3.4675C8.61027 3.32661 8.80137 3.24745 9.00062 3.24745C9.19988 3.24745 9.39098 3.32661 9.53187 3.4675L14.0319 7.9675C14.1018 8.03727 14.1573 8.12017 14.1951 8.21144C14.2329 8.30271 14.2523 8.40054 14.2522 8.49932C14.252 8.59811 14.2324 8.6959 14.1944 8.78708C14.1564 8.87825 14.1007 8.96102 14.0306 9.03063Z"
                fill="#D339C4"
                style="
                  fill: #d339c4;
                  fill: color(display-p3 0.8292 0.2246 0.7687);
                  fill-opacity: 1;
                "
              />
            </svg>
          </div>
        </div>
        <div class="movieImg">
          <img src="@/assets/images/shop1.png" alt="" />
        </div>
      </div>
      <div class="shopbottom">
        <div class="bottomLeft">
          <!-- New Product Section -->
          <div class="New">
            <div class="NewTitle">
              <div class="title">{{ t("shop.shop3") }}</div>
              <div class="more" @click="router.push('/new')">
                {{ t("shop.shop4") }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="white"
                    stroke-opacity="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div class="newList">
              <template v-if="newProduct && newProduct.length">
                <div
                  class="newsItem"
                  v-for="item in newProduct.slice(0, 4)"
                  :key="item.goodsId"
                  @click="
                    router.push({
                      path: '/newDetail',
                      query: { id: item.goodsId, search: 'Hot' },
                    })
                  "
                >
                  <div
                    class="newsImg"
                    :style="{
                      backgroundImage: `url(${item.cover})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }"
                  ></div>
                  <div class="newsTitle">{{ item.name }}</div>
                  <div class="Preview">
                    <div class="Price">${{ item.price }}</div>
                    <div class="Sold">
                      {{ t("shop.shop5") }} {{ item.sold }}
                    </div>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="row">
                  <el-skeleton :rows="6" animated> </el-skeleton>
                  <el-skeleton :rows="6" animated> </el-skeleton>
                  <el-skeleton :rows="6" animated> </el-skeleton>
                  <el-skeleton :rows="6" animated> </el-skeleton>
                </div>
              </template>
            </div>
          </div>

          <!-- Hot Movie Section -->
          <div class="Hotmovie">
            <div class="HotmovieTitle">
              <div class="title">{{ t("shop.shop9") }}</div>
              <div class="all" @click="router.push('/hotMovie')">
                {{ t("shop.shop6") }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    d="M10.0893 7.9643L5.71427 12.3393C5.59099 12.4626 5.42378 12.5318 5.24943 12.5318C5.07508 12.5318 4.90787 12.4626 4.78459 12.3393C4.6613 12.216 4.59204 12.0488 4.59204 11.8745C4.59204 11.7001 4.6613 11.5329 4.78459 11.4096L8.69529 7.50001L4.78568 3.5893C4.72464 3.52826 4.67621 3.45579 4.64318 3.37603C4.61014 3.29627 4.59313 3.21079 4.59313 3.12446C4.59313 3.03813 4.61014 2.95265 4.64318 2.87289C4.67621 2.79313 4.72464 2.72066 4.78568 2.65962C4.84672 2.59857 4.91919 2.55015 4.99895 2.51711C5.07871 2.48408 5.16419 2.46707 5.25052 2.46707C5.33685 2.46707 5.42234 2.48408 5.50209 2.51711C5.58185 2.55015 5.65432 2.59857 5.71537 2.65962L10.0904 7.03462C10.1515 7.09566 10.1999 7.16816 10.233 7.24797C10.266 7.32777 10.2829 7.41332 10.2828 7.49969C10.2827 7.58606 10.2656 7.67156 10.2324 7.75129C10.1992 7.83102 10.1505 7.90341 10.0893 7.9643Z"
                    fill="#959595"
                  />
                </svg>
              </div>
            </div>
            <div class="HotmovieList">
              <template v-if="HotMoviesdata && HotMoviesdata.length">
                <div
                  v-for="(movie, index) in HotMoviesdata.slice(0, 3)"
                  :key="index"
                  class="HotmovieItem"
                  @mouseenter="hoverItem(index)"
                  @mouseleave="resetItems"
                  :class="{
                    active: activeIndex === index,
                    // moveDown: activeIndex !== null && activeIndex !== index,
                    moveLeft: activeIndex !== null && activeIndex > index,
                    moveRight: activeIndex !== null && activeIndex < index,
                  }"
                >
                  <div class="hotImg">
                    <img class="imageUrl" :src="movie.imageUrl" alt="" />
                  </div>
                  <div class="hotText">
                    {{ movie.title }}
                  </div>
                  <div
                    class="circle"
                    :style="{
                      backgroundImage: `url(${movie.imageUrl})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }"
                  >
                    <div class="circleImg" alt=""></div>
                  </div>
                  <div
                    class="participate"
                    v-if="width < 824 || activeIndex === index"
                  >
                    {{ t("shop.shop7") }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="row">
                  <el-skeleton :rows="9" animated> </el-skeleton>
                  <el-skeleton :rows="9" animated> </el-skeleton>
                  <el-skeleton :rows="9" animated> </el-skeleton>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="HotEvent">
          <div class="HotEventTitle">
            <div class="title">{{ t("shop.shop8") }}</div>
            <div class="All" @click="router.push('/hotEvent')">
              {{ t("shop.shop6")
              }}<svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  d="M10.0893 7.9643L5.71427 12.3393C5.59099 12.4626 5.42378 12.5318 5.24943 12.5318C5.07508 12.5318 4.90787 12.4626 4.78459 12.3393C4.6613 12.216 4.59204 12.0488 4.59204 11.8745C4.59204 11.7001 4.6613 11.5329 4.78459 11.4096L8.69529 7.50001L4.78568 3.5893C4.72464 3.52826 4.67621 3.45579 4.64318 3.37603C4.61014 3.29627 4.59313 3.21079 4.59313 3.12446C4.59313 3.03813 4.61014 2.95265 4.64318 2.87289C4.67621 2.79313 4.72464 2.72066 4.78568 2.65962C4.84672 2.59857 4.91919 2.55015 4.99895 2.51711C5.07871 2.48408 5.16419 2.46707 5.25052 2.46707C5.33685 2.46707 5.42234 2.48408 5.50209 2.51711C5.58185 2.55015 5.65432 2.59857 5.71537 2.65962L10.0904 7.03462C10.1515 7.09566 10.1999 7.16816 10.233 7.24797C10.266 7.32777 10.2829 7.41332 10.2828 7.49969C10.2827 7.58606 10.2656 7.67156 10.2324 7.75129C10.1992 7.83102 10.1505 7.90341 10.0893 7.9643Z"
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
          <div class="HotEventList">
            <template v-if="HotMoviesdata && HotMoviesdata.length">
              <div
                class="HotEventItem"
                v-for="item in (hotHotEvent || []).slice(0, 5)"
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
                      class="positioningSvg"
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
            </template>
            <template v-else>
              <div class="vertical">
                <el-skeleton :rows="2" animated> </el-skeleton>
                <el-skeleton :rows="2" animated> </el-skeleton>
                <el-skeleton :rows="2" animated> </el-skeleton>
                <el-skeleton :rows="2" animated> </el-skeleton>
                <el-skeleton :rows="2" animated> </el-skeleton>
                <el-skeleton :rows="2" animated> </el-skeleton>
              </div>
            </template>
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

  .container {
    padding: 55px 120px 115px 120px;
    overflow: hidden;
  }
}
.shopTop {
  margin-bottom: 24px;
  width: 100%;
  height: 104px;
  display: inline-flex;
  padding-left: 29px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  border-radius: 12px;
  background: radial-gradient(
    91.51% 100.71% at 100% 50%,
    #000 28.71%,
    #e621ca 69.86%,
    #ffa1fb 100%
  );

  .movie {
    display: flex;
    flex-direction: column;
    gap: 7px;
    .movieText {
      color: #fff;
      font-family: Montserrat;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
    .movieBtn {
      display: flex;
      padding: 8px 14px 8px 16px;
      justify-content: center;
      align-items: center;
      gap: 6px;
      border-radius: 8px;
      background: #fff;
      color: #e621ca;
      text-align: center;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: uppercase;
    }
  }
  .movieImg {
    width: 310px;
    height: 104px;
    line-height: 104px;
    flex-shrink: 0;
    img {
      border-radius: 12px;
    }
  }
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  .el-skeleton {
    --el-skeleton-color: #383838;
    --el-skeleton-to-color: #7c7c7f;
  }
}
.vertical {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .el-skeleton {
    --el-skeleton-color: #383838;
    --el-skeleton-to-color: #7c7c7f;
  }
}
.shopbottom {
  display: flex;
  flex-wrap: wrap;
  gap: 70px;

  .bottomLeft {
    display: flex;
    flex-direction: column;
    gap: 53px;
    width: 793px;

    .HotmovieTitle,
    .NewTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 23.8px;
      .title {
        color: #fff;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.64px;
        text-transform: uppercase;
      }
      .all,
      .more {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
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
    .HotmovieList {
      display: flex;
      gap: 45px;
      // align-items: center;
      .HotmovieItem {
        max-width: 225px;
        position: relative;
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); /* 添加弹性回弹 */
      }
    }
    .hotImg {
      position: relative;
      margin-bottom: 15px;
      flex-shrink: 0;
      z-index: 2;
      background: url("@/assets/images/hotBG.png") no-repeat;
      background-size: contain;
      width: 225.733px;
      height: 323.51px;
      flex-shrink: 0;
      border-radius: 12.071px;
      transition: transform 300ms ease-in-out; /* 添加平滑过渡 */
      .imageUrl {
        position: absolute;
        top: 30.78px;
        left: 2px;
        width: 218.49px;
        height: 286.089px;
        flex-shrink: 0;
        border-radius: 1.207px 4.829px 4.829px 1.207px;
        box-shadow: 1.207px 1.207px 0px 0px #151515,
          3.621px 0px 3.44px 0px rgba(255, 255, 255, 0.51) inset;
      }
    }

    .hotText {
      position: relative;
      z-index: 4;
      color: #fff;
      text-align: center;
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.56px;
      text-transform: uppercase;
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      // display: -webkit-box;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 2; /* 限制最多两行 */
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: normal; /* 允许换行 */
      // word-break: break-word; /* 防止长单词溢出 */
    }
    .participate {
      width: 150px;
      top: 50%;
      left: 15%;
      transform: translate(-50%, -50%);
      z-index: 6;
      position: absolute;
      display: flex;
      padding: 8px 14px;
      justify-content: center;
      align-items: center;

      border-radius: 10px;
      background: rgba(27, 27, 27, 0.6);
      backdrop-filter: blur(5px);
      color: #f9f9f9;

      font-family: Rubik;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px; /* 157.143% */
      letter-spacing: 0.07px;
      cursor: pointer;
    }
    /* 圆形背景 */
    .circle {
      z-index: 1;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%) rotate(0deg);
      transition: transform 500ms ease-in-out; /* 鼠标悬浮时的平滑过渡 */
      .circleImg {
        width: 69px;
        height: 69px;
        background: url("@/assets/images/Subtract.png") no-repeat;
        background-size: contain;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    } /* 中间镂空 */
    // .circle::before {
    //   content: "";
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   width: 39px; /* 中间空洞大小 */
    //   height: 39px;
    //   background-color: #6c6c6c; /* 让它和背景一样 */
    //   border-radius: 50%;
    //   transform: translate(-50%, -50%);
    // }

    /* 文字的移动效果 */
    .textMove {
      transform: translateY(200vh); /* 向上弹 */
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* 其他元素向下平移 200px */
    .moveDown {
      transform: translateY(200vh);
    }

    /* 悬停的元素保持在原位 */
    .active {
      transform: translateY(0);
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .moveLeft {
      transform: translateX(-35%);
    }

    .moveRight {
      transform: translateX(35%);
    }

    /* 鼠标悬浮时，图片和圆形一起动画 */
    .HotmovieItem:hover .circle {
      transform: translate(-50%, -60%) translateX(18px) rotate(75deg);
    }

    .HotmovieItem:hover .hotImg {
      transform: translateX(-84px) rotate(-12deg);
    }

    .newList {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      row-gap: 16px;
      .newsItem {
        width: 180px;
        cursor: pointer;
        .newsImg {
          display: flex;
          width: 174px;
          height: 174px;
          border-radius: 8px;
          margin-bottom: 12px;
        }
      }
      .newsTitle {
        color: #fff;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px; /* 114.286% */
        margin-bottom: 8px;
        // height: 8px;
        word-wrap: break-word; /* 允许单词内换行 */
        word-break: break-all; /* 允许任何地方换行 */
        white-space: normal; /* 默认换行 */
        overflow: hidden; /* 超出隐藏 */
        text-overflow: ellipsis; /* 显示省略号 */
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 限制最多 3 行 */
        -webkit-box-orient: vertical;
      }
      .Preview {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .Price {
          color: #e621ca;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 15px; /* 107.143% */
        }
        .Sold {
          color: rgba(255, 255, 255, 0.5);
          font-family: Rubik;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 14px; /* 116.667% */
        }
      }
    }
  }
  .HotEvent {
    width: 336px;

    .HotEventTitle {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 26px;
      .title {
        color: #fff;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.64px;
        text-transform: uppercase;
      }
      .All {
        cursor: pointer;
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
    .HotEventList {
      // height: 934px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      overflow-y: auto; /* 允许垂直滚动 */
      -ms-overflow-style: none; /* 兼容IE/Edge 隐藏滚动条 */
      scrollbar-width: none; /* 兼容Firefox 隐藏滚动条 */
    }

    .HotEventList::-webkit-scrollbar {
      display: none; /* 兼容Chrome/Safari 隐藏滚动条 */
    }
    .HotEventItem {
      display: flex;
      gap: 13px;
      padding-bottom: 24px;
      border-bottom: 1px solid #2a2a2a;
      padding-top: 24px;
      cursor: pointer;
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        border: none;
      }
      .HotEventImg {
        width: 88px;
        height: 88px;
        flex-shrink: 0;
        border-radius: 4px;
      }
      .EventRight {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
          .positioningSvg {
            flex-shrink: 0;
          }
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
@media (max-width: 1440px) {
  .home_view {
    .shopbottom {
      display: flex;
      flex-wrap: wrap;
      gap: 70px;

      .bottomLeft {
        display: flex;
        flex-direction: column;

        gap: 53px;
        width: 100%;
        .newList {
          width: 100%;
          justify-content: space-between;
        }
      }
      .HotEvent {
        width: 100%;
      }
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    .container {
      padding: 15px;
      .shopTop {
        padding-left: 20px;
        .movie {
          .movieText {
            font-size: 14px;
          }
          .movieBtn {
            font-size: 12px;
          }
        }
        .movieImg {
          flex: 1;
        }
      }
      .shopbottom {
        .bottomLeft {
          width: 100%;
          .newList {
            .newsItem {
              background-color: rgba(18, 18, 18, 1);
              padding: 6px;
              border-radius: 6px;
              width: calc(50% - 6px);
              .newsImg {
                width: 100%;
              }
            }
          }
          .HotmovieList {
            flex-direction: column;
            align-items: center;
            .HotmovieItem {
              width: 280px;
              max-width: 280px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              .hotImg {
                width: 280px;
                height: 385px;
                background-size: cover;
                .imageUrl {
                  width: calc(100% - 10px);
                  top: 40px;
                  left: 4px;
                  height: 340px;
                }
              }
              .circle {
                width: 280px;
                transform: none;
                top: 0;
                left: 0;
                display: none;
              }
              .participate {
                left: 75px;
                // top: 35%;
                transform: none;
                z-index: 6;
              }
              .hotText {
              }
            }
            .HotmovieItem:hover {
              transform: none;
            }

            .HotmovieItem:hover .hotImg {
              transform: none;
            }
            .HotmovieItem:hover .participate {
              z-index: 6;
              // transform: translate(-100%, -50%);
            }
            .moveLeft {
              transform: none;
            }

            .moveRight {
              transform: none !important;
            }
          }
        }
      }
    }
  }
}
</style>
