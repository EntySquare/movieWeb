<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";
import { RouteLocationRaw } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const activeIndex = ref(null);
import recordImg from "@/assets/images/Record.png";
import recordImg1 from "@/assets/images/Record1.png";
import recordImg2 from "@/assets/images/Record2.png";
const navigateTo = (path: RouteLocationRaw) => {
  router.push(path);
};
// 鼠标移入，记录当前悬停的元素索引
const hoverItem = (index: any) => {
  activeIndex.value = index;
};

// 鼠标移出，恢复默认状态
const resetItems = () => {
  activeIndex.value = null;
};
</script>

<template>
  <div class="home_view">
    <div class="container">
      <!-- <div class="HotmovieList">
        <div
          v-for="(movie, index) in movies"
          :key="index"
          class="HotmovieItem"
          @mouseenter="hoverItem(index)"
          @mouseleave="resetItems"
          :class="{
            active: activeIndex === index,
            moveLeft: activeIndex !== null && activeIndex > index,
            moveRight: activeIndex !== null && activeIndex < index,
          }"
        >
          <img class="hotImg" :src="movie.img" alt="" />
          <div class="hotText">
            {{ t(movie.title) }}
          </div>
          <div class="Fantasy">
            <span v-for="(category, index) in movie.categories" :key="index">
              {{ t(category) }}
              <svg
                v-if="index !== movie.categories.length - 1"
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="5"
                viewBox="0 0 4 5"
                fill="none"
              >
                <circle cx="2" cy="2.5" r="2" fill="#C2C2C2" />
              </svg>
            </span>
          </div>

          <div
            class="circle"
            :style="{
              backgroundImage: `url(${movie.recordImg}) `,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <div class="circleImg" alt=""></div>
          </div>
          <div class="participate" @click="router.push(movie.link)">
            {{ t("shop.shop7") }}
          </div>
        </div>
    
      </div> -->
      <div class="HotmovieList">
        <div
          class="HotmovieItem"
          @mouseenter="hoverItem(0)"
          @mouseleave="resetItems"
          :class="{
            active: activeIndex === 0,
            moveLeft: activeIndex !== null && activeIndex > 0,
            moveRight: activeIndex !== null && activeIndex < 0,
          }"
        >
          <img class="hotImg" src="@/assets/images/hot1.png" alt="" />
          <div class="hotText">{{ t("ai.ai1") }}</div>
          <div class="Fantasy">
            <span>{{ t("ai.ai2") }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
            >
              <circle cx="2" cy="2.5" r="2" fill="#C2C2C2" />
            </svg>
            <span>{{ t("ai.ai3") }}</span>
          </div>
          <div
            class="circle"
            :style="{
              backgroundImage: `url(${recordImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <div class="circleImg" alt=""></div>
          </div>
          <div class="participate" @click="router.push('/ai/vote')">
            {{ t("shop.shop7") }}
          </div>
        </div>

        <!-- 第二个 -->
        <div
          class="HotmovieItem"
          @mouseenter="hoverItem(1)"
          @mouseleave="resetItems"
          :class="{
            active: activeIndex === 1,
            moveLeft: activeIndex !== null && activeIndex > 1,
            moveRight: activeIndex !== null && activeIndex < 1,
          }"
        >
          <img class="hotImg" src="@/assets/images/app1.png" alt="" />
          <div class="hotText">{{ t("ai.ai1") }}</div>
          <div class="Fantasy">
            <span>{{ t("ai.ai2") }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
            >
              <circle cx="2" cy="2.5" r="2" fill="#C2C2C2" />
            </svg>
            <span>{{ t("ai.ai3") }}</span>
          </div>
          <div
            class="circle"
            :style="{
              backgroundImage: `url(${recordImg1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <div class="circleImg" alt=""></div>
          </div>
          <div class="participate" @click="router.push('/ai/vote')">
            {{ t("shop.shop7") }}
          </div>
        </div>

        <!-- 第三个 -->
        <div
          class="HotmovieItem"
          @mouseenter="hoverItem(2)"
          @mouseleave="resetItems"
          :class="{
            active: activeIndex === 2,
            moveLeft: activeIndex !== null && activeIndex > 2,
            moveRight: activeIndex !== null && activeIndex < 2,
          }"
        >
          <img class="hotImg" src="@/assets/images/app2.png" alt="" />
          <div class="hotText">{{ t("ai.ai1") }}</div>
          <div class="Fantasy">
            <span>{{ t("ai.ai2") }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
            >
              <circle cx="2" cy="2.5" r="2" fill="#C2C2C2" />
            </svg>
            <span>{{ t("ai.ai3") }}</span>
          </div>
          <div
            class="circle"
            :style="{
              backgroundImage: `url(${recordImg2})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <div class="circleImg" alt=""></div>
          </div>
          <div class="participate" @click="router.push('/ai/vote')">
            {{ t("shop.shop7") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home_view {
  // background: #121212;
  background: rgb(0, 0, 0);

  width: 100%;
  height: 100vh;

  .container {
    padding: 32px 30px 56px 30px;
    overflow: hidden;
    width: 100%;
  }
}
.HotmovieList {
  display: flex;
  gap: 45px;
  width: 100%;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  .HotmovieItem {
    width: 362px;
    position: relative;
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); /* 添加弹性回弹 */
    cursor: pointer;
  }
  .hotImg {
    position: relative;
    margin-bottom: 46px;
    flex-shrink: 0;
    z-index: 2;
    transition: transform 300ms ease-in-out; /* 添加平滑过渡 */
  }

  .hotText {
    position: relative;
    z-index: 4;
    color: #fff;
    text-align: center;
    font-family: Rubik;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;

    line-height: normal;
    letter-spacing: 0.96px;
    text-transform: uppercase;
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    margin-bottom: 11px;
  }
  .Fantasy {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #dd8a54;
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .participate {
    width: 190px;
    cursor: pointer;
    top: 50%;
    left: 55%;
    transform: translate(-100%, -55%);
    z-index: 0;
    position: absolute;
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px;
    background: rgba(27, 27, 27, 0.6);
    backdrop-filter: blur(5px);
    color: #f9f9f9;

    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 157.143% */
    letter-spacing: 0.07px;
    transition: transform 0.1s ease-in-out; /* 鼠标悬浮时的平滑过渡 */
  }
  /* 圆形背景 */
  .circle {
    z-index: 1;
    width: 434px;
    height: 434px;

    background-size: cover;
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
  }

  /* 悬停的元素保持在原位 */
  .active {
    transform: translateY(0);
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* 鼠标悬浮时，图片和圆形一起动画 */
  .HotmovieItem:hover .circle {
    transform: translate(-50%, -60%) translateX(54px) rotate(64deg);
  }

  .HotmovieItem:hover .hotImg {
    transform: translateX(-84px) rotate(-12deg);
  }
  .HotmovieItem:hover .participate {
    z-index: 6;
    // transform: translate(-100%, -50%);
  }

  /* 左右平移 */
  .moveLeft {
    transform: translateX(-35%);
  }

  .moveRight {
    transform: translateX(35%);
  }
}
@media (max-width: 824px) {
  .home_view {
    height: max-content;
    .container {
      .HotmovieList {
        flex-direction: column;
        .HotmovieItem {
          width: 340px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          .hotImg {
            width: calc(100% - 50px);
          }
          .circle {
            width: 200px;
            height: 200px;
          }
          .participate {
            left: 80px;
            top: 35%;
            transform: none;
            z-index: 6;
          }
          .hotText {
            font-size: 20px;
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
</style>
