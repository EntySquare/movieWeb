<script setup lang="ts" name="HomeView">
import { showAllHotMovie } from "@/api/activity";
import { computed, onMounted, ref } from "vue";

const activeIndex = ref<number | null>(null);

// 轮播数据
const carouselItems = ref([
  {
    image: "/src/assets/images/hot1.png",
    text: "Creation of The Gods: Kingdom of Storms",
  },
  {
    image: "/src/assets/images/hot2.png",
    text: "Creation of The Gods: Kingdom of Storms",
  },
  {
    image: "/src/assets/images/hot1.png",
    text: "Creation of The Gods: Kingdom of Storms",
  },
  {
    image: "/src/assets/images/hot2.png",
    text: "Creation of The Gods: Kingdom of Storms",
  },
  {
    image: "/src/assets/images/hot1.png",
    text: "Creation of The Gods: Kingdom of Storms",
  },
  {
    image: "/src/assets/images/hot2.png",
    text: "Creation of The Gods: Kingdom of Storms",
  },
  {
    image: "/src/assets/images/hot1.png",
    text: "Creation of The Gods: Kingdom of Storms",
  },
  {
    image: "/src/assets/images/hot2.png",
    text: "Creation of The Gods: Kingdom of Storms",
  },
]);
const HotMoviesdata = ref<any>([]);
const getHotMoviesData = async () => {
  const res = await showAllHotMovie();
  if (res.data.code === 0) {
    console.log("res", res.data.json);
    HotMoviesdata.value = res.data.json;
  }
};
onMounted(() => {
  getHotMoviesData();
});
// 当前轮播起始索引
const currentIndex = ref(0);
const visibleCount = 5; // 一次展示 5 张

// 计算可见的轮播项
const visibleItems = computed(() =>
  HotMoviesdata.value.slice(
    currentIndex.value,
    currentIndex.value + visibleCount
  )
);

// 是否是第一张
const isFirst = computed(() => currentIndex.value === 0);

// 是否是最后一张
const isLast = computed(
  () => currentIndex.value + visibleCount > HotMoviesdata.value.length
);

// 事件：鼠标悬停
const hoverItem = (index: number) => {
  activeIndex.value = index;
};

// 事件：鼠标移出
const resetItems = () => {
  activeIndex.value = null;
};

// 事件：下一张
const next = () => {
  if (!isLast.value) currentIndex.value++;
};

// 事件：上一张
const prev = () => {
  if (!isFirst.value) currentIndex.value--;
};
</script>

<template>
  <div class="home_view">
    <div class="container">
      <div class="HotmovieTitle">
        <div class="title">Hot Movie</div>
        <div class="all">
          All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
          >
            <path
              d="M10.0893 7.9643L5.71427 12.3393C5.59099 12.4626 5.42378 12.5318 5.24943 12.5318C5.07508 12.5318 4.90787 12.4626 4.78459 12.3393C4.6613 12.216 4.59204 12.0488 4.59204 11.8745C4.59204 11.7001 4.6613 11.5329 4.78459 11.4096L8.69529 7.50001L4.78568 3.5893C4.72464 3.52826 4.67621 3.45579 4.64318 3.37603C4.61014 3.29627 4.59313 3.21079 4.59313 3.12446C4.59313 3.03813 4.61014 2.95265 4.64318 2.87289C4.67621 2.79313 4.72464 2.72066 4.78568 2.65962C4.84672 2.59857 4.91919 2.55015 4.99895 2.51711C5.07871 2.48408 5.16419 2.46707 5.25052 2.46707C5.33685 2.46707 5.42234 2.48408 5.50209 2.51711C5.58185 2.55015 5.65432 2.59857 5.71537 2.65962L10.0904 7.03462C10.1515 7.09566 10.1999 7.16816 10.233 7.24797C10.266 7.32777 10.2829 7.41332 10.2828 7.49969C10.2827 7.58606 10.2656 7.67156 10.2324 7.75129C10.1992 7.83102 10.1505 7.90341 10.0893 7.9643Z"
              fill="#959595"
            />
          </svg>
        </div>
      </div>

      <!-- 轮播图 -->
      <div class="carousel" v-if="HotMoviesdata.length">
        <div @click="prev" v-if="!isFirst" class="prev">
          <img src="@/assets/images/ArrowBg.png" alt="" />
        </div>

        <div class="carousel-wrapper">
          <div
            class="carousel-item"
            v-for="(item, index) in visibleItems"
            :key="index"
            @mouseenter="hoverItem(index)"
            @mouseleave="resetItems"
            :class="{
              active: activeIndex === index,
              moveDown: activeIndex !== null && activeIndex !== index,
            }"
          >
            <div class="hotImg">
              <img class="imageUrl" :src="item.imageUrl" alt="" />
            </div>
            <div class="hotText" :class="{ textMove: activeIndex !== null }">
              {{ item.title }}
            </div>
            <div class="participate" v-if="activeIndex === index">
              Participate Now
            </div>
            <div
              class="circle"
              :style="{
                backgroundImage: `url(${item.imageUrl}) `,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            >
              <div class="circleImg" alt=""></div>
            </div>
          </div>
        </div>

        <div @click="next" v-if="!isLast" class="next">
          <img src="@/assets/images/ArrowBg1.png" alt="" />
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
        No data for now
      </div>
    </div>
  </div>
</template>


<style scoped lang='less'>
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  height: 100%;

  .container {
    padding: 80px 84px 115px 80px;

    width: 100%;
    overflow: hidden;
  }
}
.next,
.prev {
  position: absolute;
  z-index: 8;
  width: 134px;
  height: 499px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  top: -70px;
}
.next {
  right: 0;
}
.prev {
  left: 0;
}
.HotmovieTitle {
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
.carousel {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  // background: #fff;
  .carousel-wrapper {
    // clip-path: inset(0 20px 0 0);
    display: flex;
    // align-items: center;
    gap: 44px;
    width: 100%;
    // overflow: hidden;
  }
  .carousel-item {
    width: 225px;
    position: relative;
    transition: transform 300ms ease-in-out; /* 添加平滑过渡 */
    flex-shrink: 0;
    // transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); /* 添加弹性回弹 */
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
  transition: transform 0.6s cubic-bezier(0.34, 1.26, 0.4, 1);
}
.participate {
  width: 100px;
  top: 44%;
  left: 23%;
  transform: translate(-50%, -50%);
  z-index: 6;
  position: absolute;
  display: flex;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-radius: 10px;
  background: rgba(27, 27, 27, 0.6);
  backdrop-filter: blur(5px);
  color: #f9f9f9;

  font-family: Rubik;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 157.143% */
  letter-spacing: 0.07px;
}
/* 圆形背景 */
.circle {
  z-index: 1;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%) rotate(25deg);
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
  // transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 鼠标悬浮时，图片和圆形一起动画 */
.carousel-item:hover .circle {
  transform: translate(-50%, -60%) translateX(34px) rotate(75deg);
}

.carousel-item:hover .hotImg {
  transform: translateX(-64px) rotate(-12deg);
}
</style>