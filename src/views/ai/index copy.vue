<script setup lang="ts">
import { displayWahlPool } from "@/api/ai";
import router from "@/router";
import { onMounted, ref } from "vue";
import { RouteLocationRaw } from "vue-router";

const activeIndex = ref(null);
const movies = [
  {
    id: 0,
    img: "/src/assets/images/hot1.png",
    title: "Creation of The Gods: Kingdom of Storms",
    categories: ["Fantasy", "Action"],
    recordImg: "/src/assets/images/Record.png",
    link: "/ai/vote",
  },
  {
    id: 1,
    img: "/src/assets/images/app1.png",
    title: "Creation of The Gods: Kingdom of Storms",
    categories: ["Fantasy", "Action"],
    recordImg: "/src/assets/images/Record1.png",
    link: "/ai/vote",
  },
  {
    id: 2,
    img: "/src/assets/images/app2.png",
    title: "Creation of The Gods: Kingdom of Storms",
    categories: ["Fantasy", "Action"],
    recordImg: "/src/assets/images/Record2.png",
    link: "/ai/vote",
  },
];
const navigateTo = (path: RouteLocationRaw) => {
  router.push(path);
};
const List = ref([]);
const getList = async () => {
  const res = await displayWahlPool();
  console.log("res", res.data);
  if (res.data.code === 0) {
    List.value = res.data.json;
  }
};

onMounted(() => {
  getList();
});
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
      <div class="HotmovieList">
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
          <div class="hotImg">
            <img class="imageUrl" :src="movie.img" alt="" />
          </div>
          <div class="hotText">
            {{ movie.title }}
          </div>
          <div class="Fantasy">
            <span v-for="(category, index) in movie.categories" :key="index">
              {{ category }}
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
          <!-- <div
            class="circle"
            :style="{
              background: `url('${movie.recordImg}') no-repeat center/cover`,
            }"
          ></div> -->
          <div
            class="circle"
            :style="{
              backgroundImage: `url(${movie.img})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <div class="circleImg" alt=""></div>
          </div>
          <!-- @click="navigateTo(movie.link)" -->
          <div class="participate" @click="router.push(movie.link)">
            COMMINGLE SOON
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home_view {
  background: #121212;
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
    background: url("@/assets/images/hotBG.png") no-repeat;
    background-size: contain;
    width: 374px;
    height: 536px;
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

  .circle {
    z-index: 1;
    width: 332px;
    height: 332px;
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
            border-radius: 50%;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -60%) rotate(0deg);
          }
          .participate {
            left: 80px;
            top: 35%;
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
</style>
