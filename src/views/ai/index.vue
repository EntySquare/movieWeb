<!-- <script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const redWidth = ref(50);
const blueWidth = ref(50);

const redClipPath =
  "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 100% 100%, 0 100%)";
const blueClipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%, 20px 0)";
onMounted(() => {
  setInterval(() => {
    const red = Math.floor(Math.random() * 100);
    redWidth.value = red;
    blueWidth.value = 100 - red;
  }, 1000);
});
</script>

<template>
  <div class="home_view">
    <div class="progress_bar">
      <img
        src="@/assets/images/ai/img6.png"
        alt=""
        class="progress_bar_top_img"
      />
      <div class="progress_bar_line">
        <div
          class="skew_box1"
          :style="{ width: redWidth + '%', clipPath: redClipPath }"
        >
          <div class="skew_box_chi">
            <img src="@/assets/images/ai/img14.png" alt="" />
          </div>
        </div>
        <img
          src="@/assets/images/ai/img8.png"
          alt=""
          class="progress_bar_divider"
        />
        <div
          class="skew_box2"
          :style="{ width: blueWidth + '%', clipPath: blueClipPath }"
        >
          <div class="skew_box_chi">
            <img src="@/assets/images/ai/img15.png" alt="" />
          </div>
        </div>
      </div>
      <img
        src="@/assets/images/ai/img6.png"
        alt=""
        class="progress_bar_bottom_img"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.home_view {
  // background: #121212;
  background: rgb(0, 0, 0);

  width: 100%;
  height: 100vh;
  .progress_bar {
    max-width: 1280px;
    margin: auto;
    .progress_bar_top_img {
      width: 100%;
      position: relative;
      top: 45px;
    }
    .progress_bar_line {
      display: flex;
      align-items: center;
      justify-content: center;
      .skew_box1 {
        // width: 50%;
        height: 48px;
        background: radial-gradient(
          221.47% 76.87% at 50% -47.77%,
          #ff0c45 0%,
          rgba(255, 12, 69, 0.48) 100%
        );
        padding: 6px 10px 6px 6px;
        box-sizing: border-box;
        position: relative;
        right: -40px;
        .skew_box_chi {
          width: 100%;
          height: 36px;
          img {
            width: 100%;
            height: 36px;
          }
        }
      }
      .progress_bar_divider {
        width: 60px;
        height: 126px;
        position: relative;
        z-index: 10;
      }
      .skew_box2 {
        // width: 50%;
        height: 48px;
        background: radial-gradient(
          221.47% 76.87% at 50% -47.77%,
          #5639d3 0%,
          rgba(86, 57, 211, 0.48) 100%
        );
        padding: 6px 6px 6px 10px;
        box-sizing: border-box;
        position: relative;
        left: -40px;
        .skew_box_chi {
          width: 100%;
          height: 36px;
          img {
            width: 100%;
            height: 36px;
          }
        }
      }
    }
    .progress_bar_bottom_img {
      width: 100%;
      position: relative;
      top: -50px;
    }
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
</style> -->
<template>
  <div class="progress-container">
    <div
      class="progress red"
      :style="{
        width: 'calc(' + redWidth + '% + 10px)',
        clipPath: redClipPath,
      }"
    >
      <div class="red_white_line"></div>
    </div>
    <img
      src="@/assets/images/ai/img8.png"
      alt=""
      class="progress_bar_divider"
      :style="{
        left: 'calc(' + redWidth + '% - 25px)',
      }"
    />
    <div
      class="progress blue"
      :style="{
        width: 'calc(' + blueWidth + '% + 10px)',
        clipPath: blueClipPath,
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const redWidth = ref(50);
const blueWidth = ref(50);

const redClipPath =
  "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 100% 100%, 0 100%)";
const blueClipPath = "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 20px 0)";

onMounted(() => {
  setInterval(() => {
    // 模拟动态更新进度，总和为 100%
    const red = Math.floor(Math.random() * 100);
    redWidth.value = red;
    blueWidth.value = 100 - red;
  }, 1000);
});
</script>

<style scoped lang="less">
.progress-container {
  position: relative;
  width: 100%;
  height: 126px;
  background: transparent;
  display: flex;
  overflow: hidden;
}

.progress {
  height: 48px;
  position: absolute;
  top: 39px;
  transition: width 1s;
  .red_white_line {
    width: 100%;
  }
}

.red {
  background: radial-gradient(
    221.47% 76.87% at 50% -47.77%,
    #ff0c45 0%,
    rgba(255, 12, 69, 0.48) 100%
  );

  left: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
}

.blue {
  background: radial-gradient(
    221.47% 76.87% at 50% -47.77%,
    #5639d3 0%,
    rgba(86, 57, 211, 0.48) 100%
  );
  right: 0;
  z-index: 0;
}
.progress_bar_divider {
  width: 50px;
  height: 126px;
  position: absolute;
  top: 0;
  z-index: 10;
  transition: 1s;
}
</style>
