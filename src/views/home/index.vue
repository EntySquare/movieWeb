<script setup lang="ts" name="HomeView">
import { useWindowSize } from "@/utils/useWindowSize";

const { windowWidth } = useWindowSize();
</script>
<template>
  <div class="home_view">
    <div class="scroll_content_y_fixed">
      <div class="scroll_content_y">
        <img
          class="part1_img1"
          src="https://dapp-file-oss.oss-cn-beijing.aliyuncs.com/movie-ai/home/img1.png"
          alt=""
        />
        <img
          class="part1_img1"
          src="https://dapp-file-oss.oss-cn-beijing.aliyuncs.com/movie-ai/home/img1.png"
          alt=""
        />
        <img
          class="part1_img1"
          src="https://dapp-file-oss.oss-cn-beijing.aliyuncs.com/movie-ai/home/img1.png"
          alt=""
        />
      </div>
    </div>
    <OpenScreen style="flex: 1" />
    <div class="scroll_content_ry_fixed">
      <div class="scroll_content_ry">
        <img
          class="part1_img6"
          src="https://dapp-file-oss.oss-cn-beijing.aliyuncs.com/movie-ai/home/img6.png"
          alt=""
        />
        <img
          class="part1_img6"
          src="https://dapp-file-oss.oss-cn-beijing.aliyuncs.com/movie-ai/home/img6.png"
          alt=""
        />
        <img
          class="part1_img6"
          src="https://dapp-file-oss.oss-cn-beijing.aliyuncs.com/movie-ai/home/img6.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.home_view {
  flex: 1;
  display: flex;
  .container {
    padding: 60px 0 40px 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .scroll_content_y_fixed {
    width: 170px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    overflow: hidden;
    .scroll_content_y {
      width: 170px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      animation: scrollDown 30s linear infinite;
      .part1_img1 {
        width: 50px;
        margin: 0 60px;
      }
    }
  }
  .scroll_content_ry_fixed {
    width: 170px;
    height: 100vh;
    // background-color: #000000;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    overflow: hidden;
    .scroll_content_ry {
      width: 170px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      animation: scrollTop 30s linear infinite;
      .part1_img6 {
        width: 50px;
        margin: 0 60px;
      }
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    // overflow: auto;
  }
  .scroll_content_y_fixed {
    display: none !important;
  }
  .scroll_content_ry_fixed {
    display: none !important;
  }
}
@keyframes scrollDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes scrollTop {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
