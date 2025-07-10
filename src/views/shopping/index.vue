<script setup lang="ts" name="HomeView">
import { showAllHotEvent, showAllHotMovie } from "@/api/activity";
import { displayDetailsGoods } from "@/api/shop";
import router from "@/router";
import { onMounted, ref } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { width, height } = useWindowSize();

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
            }}<img src="@/assets/images/shop/img1.png" alt="" />
          </div>
        </div>
        <div class="movieImg">
          <img src="@/assets/images/shop/img2.png" alt="" />
        </div>
        <div class="movieImg_mobile">
          <img src="@/assets/images/shop/img2.png" alt="" />
        </div>
      </div>
      <div class="shopbottom">
        <div class="bottomLeft">
          <!-- Hot Movie Section -->
          <div class="Hotmovie">
            <div class="HotmovieTitle">
              <div class="title">{{ t("shop.shop9") }}</div>
              <div class="all" @click="router.push('/hotMovie')">
                {{ t("shop.shop6") }}
                <img src="@/assets/images/shop/img7.png" alt="" />
              </div>
            </div>
            <div class="HotmovieList">
              <template v-if="HotMoviesdata && HotMoviesdata.length">
                <div
                  v-for="(movie, index) in HotMoviesdata.slice(0, 3)"
                  :key="index"
                  class="HotmovieItem"
                >
                  <div class="hotImgBack">
                    <div class="hotImg">
                      <div>
                        <img src="@/assets/images/shop/img3.png" alt="" />
                        <img src="@/assets/images/shop/img4.png" alt="" />
                      </div>
                      <!-- <img class="imageUrl" :src="movie.imageUrl" alt="error" /> -->
                      <img
                        class="imageUrl"
                        src="@/assets/images/shop/img6.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="hotText">
                    {{ movie.title }}
                  </div>
                  <div class="participate" v-if="width < 824">
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
          <!-- New Product Section -->
          <div class="New">
            <div class="NewTitle">
              <div class="title">{{ t("shop.shop3") }}</div>
              <div class="more" @click="router.push('/new')">
                {{ t("shop.shop6") }}
                <img src="@/assets/images/shop/img7.png" alt="" />
              </div>
            </div>
            <div class="newList">
              <template v-if="newProduct && newProduct.length">
                <div
                  class="newsItem"
                  v-for="item in newProduct.slice(0, 8)"
                  :key="item.goodsId"
                  @click="
                    router.push({
                      path: '/newDetail',
                      query: { id: item.goodsId, search: 'Hot' },
                    })
                  "
                >
                  <div class="newsImg">
                    <img :src="item.cover" alt="" />
                    <!-- <img src="@/assets/images/shop/img8.png" alt="" /> -->
                  </div>
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
        </div>
        <div class="HotEvent">
          <div class="HotEventTitle">
            <div class="title">{{ t("shop.shop8") }}</div>
            <div class="All" @click="router.push('/hotEvent')">
              {{ t("shop.shop6") }}
              <img src="@/assets/images/shop/img7.png" alt="" />
            </div>
          </div>
          <div class="HotEventList">
            <template v-if="HotMoviesdata && HotMoviesdata.length">
              <div
                class="HotEventItem"
                v-for="item in (hotHotEvent || []).slice(0, 7)"
                :key="item"
                @click="
                  router.push({
                    path: '/eventDetail',
                    query: { name: item.title, movieId: item.movieId },
                  })
                "
              >
                <div class="HotEventImg">
                  <!-- <img :src="item.imageUrl" alt="" /> -->
                  <img src="@/assets/images/shop/img6.png" alt="" />
                </div>
                <div class="EventRight">
                  <div class="EventTitle">{{ item.title }}</div>
                  <div class="positioning">
                    <img src="@/assets/images/shop/img9.png" alt="" />
                    <div>{{ item.place }}</div>
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
  max-width: 1440px;
  margin: auto;
  .container {
    padding: 64px 80px;
    overflow: hidden;
  }
}
.shopTop {
  margin-bottom: 70px;
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
    #000 0%,
    #1c031a 61.08%,
    #7f3878 100%
  );
  box-shadow: 0px 0px 24px 0px #f942e7 inset;
  position: relative;
  overflow: hidden;

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
      width: max-content;
      display: flex;
      padding: 8px 14px 8px 16px;
      justify-content: center;
      align-items: center;
      gap: 6px;
      border-radius: 8px;
      background: #fff;
      color: #d339c4;
      text-align: center;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: uppercase;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .movieImg {
    width: 310px;
    height: 104px;
    line-height: 104px;
    flex-shrink: 0;
    padding-top: 7px;
    padding-right: 8px;
    overflow: hidden;
    img {
      width: 310px;
      height: 104px;
      border-radius: 12px;
    }
  }
  .movieImg_mobile {
    display: none;
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
  gap: 64px;

  .bottomLeft {
    display: flex;
    flex-direction: column;
    gap: 64px;
    width: 880px;

    .HotmovieTitle,
    .NewTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
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
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .HotmovieList {
      display: flex;
      gap: 80px;
      // align-items: center;
      .HotmovieItem {
        min-width: 240px;
        max-width: 240px;
        cursor: pointer;
        .hotImgBack {
          margin-bottom: 15px;
          flex-shrink: 0;
          background: rgba(41, 41, 41, 0.75);
          background-size: cover;
          width: 240px;
          height: 344px;
          flex-shrink: 0;
          border-radius: 12.8px;
          overflow: hidden;
        }
      }
    }
    .hotImg {
      width: 240px;
      height: 344px;
      flex-shrink: 0;
      border-radius: 12.8px;
      overflow: hidden;
      background: url("@/assets/images/shop/img5.png") no-repeat;
      background-size: cover;
      div {
        width: 100%;
        height: 32px;
        padding: 4px 8px 4px 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          &:first-child {
            width: 40px;
            height: auto;
          }
          &:last-child {
            width: 122px;
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
      max-width: 210px;
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

    /* 文字的移动效果 */
    .textMove {
      transform: translateY(200vh); /* 向上弹 */
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* 其他元素向下平移 200px */
    .moveDown {
      transform: translateY(200vh);
    }

    .newList {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      .newsItem {
        width: 202px;
        cursor: pointer;
        .newsImg {
          width: 202px;
          height: 202px;
          img {
            width: 202px;
            height: 202px;
          }
        }
      }
      .newsTitle {
        color: #fff;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px; /* 114.286% */
        word-wrap: break-word; /* 允许单词内换行 */
        word-break: break-all; /* 允许任何地方换行 */
        white-space: normal; /* 默认换行 */
        overflow: hidden; /* 超出隐藏 */
        text-overflow: ellipsis; /* 显示省略号 */
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 限制最多 3 行 */
        -webkit-box-orient: vertical;
        padding: 8px 0;
      }
      .Preview {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .Price {
          color: #d339c4;
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
    flex: 1;

    .HotEventTitle {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 16px;
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
        gap: 4px;
        color: #959595;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.56px;
        text-transform: uppercase;
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .HotEventList {
      // height: 934px;
      overflow: hidden;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 24px;
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
      border-bottom: 1px solid #2b2b2b;
      cursor: pointer;
      &:last-child {
        border: none;
      }
      .HotEventImg {
        width: 88px;
        height: 88px;
        flex-shrink: 0;
        border-radius: 4px;
        img {
          width: 88px;
          height: 88px;
          flex-shrink: 0;
          border-radius: 4px;
        }
      }
      .EventRight {
        flex: 1;
        padding-top: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .EventTitle {
          width: 218px;
          color: #fff;
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.64px;
          text-transform: uppercase;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* 限制最多显示 2 行 */
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .positioning {
          display: flex;
          align-items: center;
          gap: 4px;
          img {
            width: 12px;
            height: 12px;
            flex-shrink: 0;
          }
          div {
            flex: 1;
            color: rgba(255, 255, 255, 0.6);
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 14px; /* 116.667% */
            display: -webkit-box;
            -webkit-line-clamp: 1; /* 限制最多显示 2 行 */
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    max-width: 100% !important;
    .container {
      padding: 0 !important;
    }
  }
  .shopTop {
    width: calc(100% - 40px) !important;
    margin: 0 20px 40px !important;
    padding-left: 16px !important;
    box-sizing: border-box;
    background: radial-gradient(
      100.71% 91.51% at 100% 50%,
      #000000 64.32%,
      #d339c4 84.31%,
      #ffa6f6 100%
    ) !important;
    box-shadow: none !important;

    .movie {
      gap: 10px !important;
      position: relative;
      z-index: 2;
    }
    .movieImg {
      display: none !important;
    }
    .movieImg_mobile {
      display: block;
      width: 248px;
      height: 104px;
      position: absolute;
      top: 0;
      right: -50px;
      img {
        width: 248px;
        height: 104px;
      }
    }
  }
  .shopbottom {
    gap: 40px !important;

    .bottomLeft {
      display: flex;
      flex-direction: column;
      gap: 64px;
      width: 880px;

      .HotmovieTitle,
      .NewTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
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
          img {
            width: 14px;
            height: 14px;
          }
        }
      }
      .HotmovieList {
        display: flex;
        gap: 80px;
        // align-items: center;
        .HotmovieItem {
          min-width: 240px;
          max-width: 240px;
          cursor: pointer;
          .hotImgBack {
            margin-bottom: 15px;
            flex-shrink: 0;
            background: rgba(41, 41, 41, 0.75);
            background-size: cover;
            width: 240px;
            height: 344px;
            flex-shrink: 0;
            border-radius: 12.8px;
            overflow: hidden;
          }
        }
      }
      .hotImg {
        width: 240px;
        height: 344px;
        flex-shrink: 0;
        border-radius: 12.8px;
        overflow: hidden;
        background: url("@/assets/images/shop/img5.png") no-repeat;
        background-size: cover;
        div {
          width: 100%;
          height: 32px;
          padding: 4px 8px 4px 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            &:first-child {
              width: 40px;
              height: auto;
            }
            &:last-child {
              width: 122px;
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
        max-width: 210px;
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

      /* 文字的移动效果 */
      .textMove {
        transform: translateY(200vh); /* 向上弹 */
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* 其他元素向下平移 200px */
      .moveDown {
        transform: translateY(200vh);
      }

      .newList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        .newsItem {
          width: 202px;
          cursor: pointer;
          .newsImg {
            width: 202px;
            height: 202px;
            img {
              width: 202px;
              height: 202px;
            }
          }
        }
        .newsTitle {
          color: #fff;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 16px; /* 114.286% */
          word-wrap: break-word; /* 允许单词内换行 */
          word-break: break-all; /* 允许任何地方换行 */
          white-space: normal; /* 默认换行 */
          overflow: hidden; /* 超出隐藏 */
          text-overflow: ellipsis; /* 显示省略号 */
          display: -webkit-box;
          -webkit-line-clamp: 2; /* 限制最多 3 行 */
          -webkit-box-orient: vertical;
          padding: 8px 0;
        }
        .Preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .Price {
            color: #d339c4;
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
      flex: 1;

      .HotEventTitle {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 16px;
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
          gap: 4px;
          color: #959595;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 0.56px;
          text-transform: uppercase;
          img {
            width: 14px;
            height: 14px;
          }
        }
      }
      .HotEventList {
        // height: 934px;
        overflow: hidden;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 24px;
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
        border-bottom: 1px solid #2b2b2b;
        cursor: pointer;
        &:last-child {
          border: none;
        }
        .HotEventImg {
          width: 88px;
          height: 88px;
          flex-shrink: 0;
          border-radius: 4px;
          img {
            width: 88px;
            height: 88px;
            flex-shrink: 0;
            border-radius: 4px;
          }
        }
        .EventRight {
          flex: 1;
          padding-top: 4px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .EventTitle {
            width: 218px;
            color: #fff;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.64px;
            text-transform: uppercase;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* 限制最多显示 2 行 */
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .positioning {
            display: flex;
            align-items: center;
            gap: 4px;
            img {
              width: 12px;
              height: 12px;
              flex-shrink: 0;
            }
            div {
              flex: 1;
              color: rgba(255, 255, 255, 0.6);
              font-family: Inter;
              font-size: 12px;
              font-style: normal;
              font-weight: 500;
              line-height: 14px; /* 116.667% */
              display: -webkit-box;
              -webkit-line-clamp: 1; /* 限制最多显示 2 行 */
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
