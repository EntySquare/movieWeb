<script setup lang='ts' name="HomeView">
import { CSSProperties, reactive, ref, watch } from "vue";

const videos = ref([
  {
    imageSrc: "/src/assets/images/Producing.png",
    videoSrc: "/src/assets/video.mp4",
  },
  {
    imageSrc: "/src/assets/images/Producing.png",
    videoSrc: "/src/assets/video1.mp4",
  },
  {
    imageSrc: "/src/assets/images/Producing.png",
    videoSrc: "/src/assets/video2.mp4",
  },
  {
    imageSrc: "/src/assets/images/Producing.png",
    videoSrc: "/src/assets/video3.mp4",
  },
]);

const currentIndex = ref(0);
const videoPlayer = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);

const togglePlay = () => {
  if (!videoPlayer.value) return;

  if (isPlaying.value) {
    videoPlayer.value.pause();
  } else {
    videoPlayer.value.play();
  }

  isPlaying.value = !isPlaying.value;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % videos.value.length;
  console.log("22222222");
  resetVideo();
};
const goToSlide = (index: number) => {
  currentIndex.value = index;
  resetVideo();
};
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + videos.value.length) % videos.value.length;
  console.log("111111");

  resetVideo();
};

const showPauseButton = ref(false);
// 监听播放状态，更新 UI
watch(isPlaying, (playing) => {
  if (!playing) {
    showPauseButton.value = false; // 暂停时隐藏暂停按钮
  }
});

const resetVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause();
    videoPlayer.value.load();
    isPlaying.value = false;
  }
};

// 生成 0 到 39 的刻度线
const scaleMarks = ref<number[]>([]);
for (let i = 0; i <= 39; i++) {
  scaleMarks.value.push(i);
}

// 根据索引计算每个刻度线的位置
const getScaleMarkStyle = (index: number): CSSProperties => {
  const scaleWidth = 915; // 刻度条的总宽度
  const step = scaleWidth / 39; // 计算每个刻度的间距
  return {
    left: `${index * step}px`, // 每个刻度的水平位置
    height: "8px", // 刻度线的高度
    width: "1px", // 刻度线的宽度
    position: "absolute",
    bottom: "0",
    backgroundColor: "#2c2c2c",
  };
};

// 根据索引计算每个数字标签的位置
const getScaleLabelStyle = (index: number): CSSProperties => {
  const step = 915 / 39; // 每个刻度之间的间隔
  return {
    left: `0px`, // 使数字与刻度线对齐
    bottom: "12px", // 将数字标签放置在刻度线的上方
    position: "absolute",
    fontSize: "12px",
    textAlign: "center",
    transform: "translateX(-50%)", // 使数字居中显示
    color: "rgba(255, 255, 255, 0.40)",
  };
};

const sliderValue = ref(0);
const sliderValue1 = ref(0);

const onSliderInput = () => {
  // 更新滑动条的颜色
  const slider = document.querySelector(".slider") as HTMLInputElement;
  if (slider) {
    // 根据滑动的值，动态改变背景颜色
    slider.style.background = `linear-gradient(to right, #D339C4 ${sliderValue.value}%, #371b36 ${sliderValue.value}%, #371b36 100%)`;
  }
};
const onSliderInput1 = () => {
  // 更新滑动条的颜色
  const slider = document.querySelector(".slider1") as HTMLInputElement;
  if (slider) {
    // 根据滑动的值，动态改变背景颜色
    slider.style.background = `linear-gradient(to right, #D339C4 ${sliderValue1.value}%, #371b36 ${sliderValue1.value}%, #371b36 100%)`;
  }
};
</script>
<template>
  <div class="home_view">
    <div class="container">
      <div class="deskTop">
        <div class="topleft">
          <div class="Box">
            <div class="BoxOffice">
              <div class="BoxTitle">Box Office Guessing</div>
              <div class="BoxText">
                Drag the film tickets on the left to the corresponding box
                office.
              </div>
            </div>
            <div class="ticket">
              <img src="@/assets/svgs/ticket.svg" alt="" />
              <div class="box">Box office is...？</div>
            </div>
          </div>
          <div class="B15">
            <div class="B15Item">
              <div class="img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                >
                  <path
                    d="M7.08232 15.5044L22.1113 4.98086C22.9182 4.41617 23.9164 4.19511 24.8863 4.36628C25.8563 4.53745 26.7185 5.08685 27.2834 5.89365L29.654 9.27736C29.6884 9.32751 29.7218 9.37858 29.7534 9.42965L7.08232 15.5044ZM1.99375 27.7104L0.965824 23.8726C0.839603 23.4014 0.807454 22.9099 0.871213 22.4262C0.934972 21.9426 1.09339 21.4762 1.33742 21.0538C1.58145 20.6313 1.90631 20.2611 2.29344 19.9642C2.68058 19.6674 3.1224 19.4497 3.59368 19.3236L41.263 9.23001C41.7342 9.10361 42.2257 9.07128 42.7094 9.13485C43.1931 9.19843 43.6595 9.35666 44.082 9.60051C44.5045 9.84437 44.8749 10.1691 45.1719 10.5561C45.4689 10.9431 45.6868 11.3848 45.813 11.856L46.8818 15.847C47.0327 16.4105 47.0144 17.006 46.8291 17.5592C46.6438 18.1123 46.2998 18.5987 45.84 18.9577C45.1175 19.5212 44.5779 20.2858 44.2891 21.1553C44.0002 22.0248 43.975 22.9603 44.2166 23.844C44.4582 24.7278 44.9559 25.5203 45.6469 26.1219C46.3379 26.7235 47.1915 27.1072 48.1001 27.2248C48.6612 27.2978 49.188 27.5358 49.6137 27.9086C50.0393 28.2814 50.3448 28.7722 50.4912 29.3187L51.5804 33.3821C51.7068 33.8533 51.7391 34.3448 51.6755 34.8285C51.612 35.3122 51.4537 35.7786 51.2099 36.2011C50.966 36.6236 50.6413 36.994 50.2543 37.291C49.8673 37.588 49.4256 37.8059 48.9544 37.9321L11.2823 48.0257C10.3308 48.2804 9.31712 48.1467 8.4642 47.6541C7.61129 47.1614 6.98897 46.3502 6.73411 45.3988L5.7099 41.5759C5.54849 40.9741 5.56427 40.3385 5.75535 39.7455C5.94643 39.1525 6.30467 38.6273 6.78704 38.233C7.48069 37.6668 7.99586 36.9121 8.27049 36.0599C8.54512 35.2076 8.56751 34.2941 8.33495 33.4295C8.1024 32.5648 7.62481 31.7858 6.95973 31.1863C6.29464 30.5868 5.47042 30.1923 4.58632 30.0504C3.97472 29.9518 3.40469 29.6784 2.94487 29.2632C2.48506 28.8481 2.15508 28.3088 1.99468 27.7104H1.99375ZM34.9376 21.4992C35.291 21.4045 35.6223 21.2412 35.9125 21.0185C36.2028 20.7957 36.4463 20.518 36.6292 20.2012C36.8122 19.8844 36.9309 19.5346 36.9787 19.1719C37.0264 18.8091 37.0023 18.4406 36.9076 18.0872C36.8129 17.7338 36.6495 17.4025 36.4268 17.1123C36.2041 16.822 35.9264 16.5785 35.6096 16.3955C35.2927 16.2126 34.9429 16.0939 34.5802 16.0461C34.2175 15.9984 33.8489 16.0225 33.4955 16.1172C32.7818 16.3084 32.1733 16.7754 31.8039 17.4152C31.4345 18.0551 31.3343 18.8156 31.5256 19.5293C31.7168 20.243 32.1837 20.8515 32.8236 21.2209C33.4635 21.5903 34.2239 21.6905 34.9376 21.4992ZM36.8598 28.6743C37.2182 28.5844 37.5553 28.4241 37.8512 28.2027C38.1471 27.9813 38.396 27.7032 38.5834 27.3847C38.7708 27.0661 38.893 26.7134 38.9427 26.3472C38.9925 25.981 38.9689 25.6085 38.8732 25.2515C38.7776 24.8945 38.6119 24.5601 38.3858 24.2678C38.1597 23.9754 37.8776 23.731 37.5561 23.5488C37.2346 23.3665 36.88 23.25 36.513 23.2062C36.1461 23.1623 35.774 23.1919 35.4186 23.2932C34.7136 23.4921 34.1153 23.9606 33.7533 24.5974C33.3912 25.2341 33.2945 25.9879 33.4841 26.6954C33.6737 27.403 34.1344 28.0073 34.7663 28.3777C35.3983 28.7481 36.1507 28.8546 36.8607 28.6743H36.8598ZM38.7828 35.8503C39.4965 35.6591 40.105 35.1921 40.4745 34.5523C40.8439 33.9124 40.944 33.152 40.7528 32.4383C40.5616 31.7246 40.0946 31.1161 39.4548 30.7466C38.8149 30.3772 38.0545 30.2771 37.3408 30.4683C36.6271 30.6595 36.0186 31.1264 35.6491 31.7663C35.2797 32.4062 35.1796 33.1666 35.3708 33.8803C35.562 34.594 36.0289 35.2025 36.6688 35.572C37.3087 35.9414 38.0691 36.0415 38.7828 35.8503Z"
                    fill="#3C3C3C"
                    style="
                      fill: #3c3c3c;
                      fill: color(display-p3 0.2333 0.2333 0.2333);
                      fill-opacity: 1;
                    "
                  />
                </svg>
              </div>
              <div class="B15Title">15B</div>
            </div>
            <div class="B15Item">
              <div class="img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                >
                  <path
                    d="M7.08232 15.5044L22.1113 4.98086C22.9182 4.41617 23.9164 4.19511 24.8863 4.36628C25.8563 4.53745 26.7185 5.08685 27.2834 5.89365L29.654 9.27736C29.6884 9.32751 29.7218 9.37858 29.7534 9.42965L7.08232 15.5044ZM1.99375 27.7104L0.965824 23.8726C0.839603 23.4014 0.807454 22.9099 0.871213 22.4262C0.934972 21.9426 1.09339 21.4762 1.33742 21.0538C1.58145 20.6313 1.90631 20.2611 2.29344 19.9642C2.68058 19.6674 3.1224 19.4497 3.59368 19.3236L41.263 9.23001C41.7342 9.10361 42.2257 9.07128 42.7094 9.13485C43.1931 9.19843 43.6595 9.35666 44.082 9.60051C44.5045 9.84437 44.8749 10.1691 45.1719 10.5561C45.4689 10.9431 45.6868 11.3848 45.813 11.856L46.8818 15.847C47.0327 16.4105 47.0144 17.006 46.8291 17.5592C46.6438 18.1123 46.2998 18.5987 45.84 18.9577C45.1175 19.5212 44.5779 20.2858 44.2891 21.1553C44.0002 22.0248 43.975 22.9603 44.2166 23.844C44.4582 24.7278 44.9559 25.5203 45.6469 26.1219C46.3379 26.7235 47.1915 27.1072 48.1001 27.2248C48.6612 27.2978 49.188 27.5358 49.6137 27.9086C50.0393 28.2814 50.3448 28.7722 50.4912 29.3187L51.5804 33.3821C51.7068 33.8533 51.7391 34.3448 51.6755 34.8285C51.612 35.3122 51.4537 35.7786 51.2099 36.2011C50.966 36.6236 50.6413 36.994 50.2543 37.291C49.8673 37.588 49.4256 37.8059 48.9544 37.9321L11.2823 48.0257C10.3308 48.2804 9.31712 48.1467 8.4642 47.6541C7.61129 47.1614 6.98897 46.3502 6.73411 45.3988L5.7099 41.5759C5.54849 40.9741 5.56427 40.3385 5.75535 39.7455C5.94643 39.1525 6.30467 38.6273 6.78704 38.233C7.48069 37.6668 7.99586 36.9121 8.27049 36.0599C8.54512 35.2076 8.56751 34.2941 8.33495 33.4295C8.1024 32.5648 7.62481 31.7858 6.95973 31.1863C6.29464 30.5868 5.47042 30.1923 4.58632 30.0504C3.97472 29.9518 3.40469 29.6784 2.94487 29.2632C2.48506 28.8481 2.15508 28.3088 1.99468 27.7104H1.99375ZM34.9376 21.4992C35.291 21.4045 35.6223 21.2412 35.9125 21.0185C36.2028 20.7957 36.4463 20.518 36.6292 20.2012C36.8122 19.8844 36.9309 19.5346 36.9787 19.1719C37.0264 18.8091 37.0023 18.4406 36.9076 18.0872C36.8129 17.7338 36.6495 17.4025 36.4268 17.1123C36.2041 16.822 35.9264 16.5785 35.6096 16.3955C35.2927 16.2126 34.9429 16.0939 34.5802 16.0461C34.2175 15.9984 33.8489 16.0225 33.4955 16.1172C32.7818 16.3084 32.1733 16.7754 31.8039 17.4152C31.4345 18.0551 31.3343 18.8156 31.5256 19.5293C31.7168 20.243 32.1837 20.8515 32.8236 21.2209C33.4635 21.5903 34.2239 21.6905 34.9376 21.4992ZM36.8598 28.6743C37.2182 28.5844 37.5553 28.4241 37.8512 28.2027C38.1471 27.9813 38.396 27.7032 38.5834 27.3847C38.7708 27.0661 38.893 26.7134 38.9427 26.3472C38.9925 25.981 38.9689 25.6085 38.8732 25.2515C38.7776 24.8945 38.6119 24.5601 38.3858 24.2678C38.1597 23.9754 37.8776 23.731 37.5561 23.5488C37.2346 23.3665 36.88 23.25 36.513 23.2062C36.1461 23.1623 35.774 23.1919 35.4186 23.2932C34.7136 23.4921 34.1153 23.9606 33.7533 24.5974C33.3912 25.2341 33.2945 25.9879 33.4841 26.6954C33.6737 27.403 34.1344 28.0073 34.7663 28.3777C35.3983 28.7481 36.1507 28.8546 36.8607 28.6743H36.8598ZM38.7828 35.8503C39.4965 35.6591 40.105 35.1921 40.4745 34.5523C40.8439 33.9124 40.944 33.152 40.7528 32.4383C40.5616 31.7246 40.0946 31.1161 39.4548 30.7466C38.8149 30.3772 38.0545 30.2771 37.3408 30.4683C36.6271 30.6595 36.0186 31.1264 35.6491 31.7663C35.2797 32.4062 35.1796 33.1666 35.3708 33.8803C35.562 34.594 36.0289 35.2025 36.6688 35.572C37.3087 35.9414 38.0691 36.0415 38.7828 35.8503Z"
                    fill="#3C3C3C"
                    style="
                      fill: #3c3c3c;
                      fill: color(display-p3 0.2333 0.2333 0.2333);
                      fill-opacity: 1;
                    "
                  />
                </svg>
              </div>
              <div class="B15Title">10B</div>
            </div>
            <div class="B15Item">
              <div class="img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                >
                  <path
                    d="M7.08232 15.5044L22.1113 4.98086C22.9182 4.41617 23.9164 4.19511 24.8863 4.36628C25.8563 4.53745 26.7185 5.08685 27.2834 5.89365L29.654 9.27736C29.6884 9.32751 29.7218 9.37858 29.7534 9.42965L7.08232 15.5044ZM1.99375 27.7104L0.965824 23.8726C0.839603 23.4014 0.807454 22.9099 0.871213 22.4262C0.934972 21.9426 1.09339 21.4762 1.33742 21.0538C1.58145 20.6313 1.90631 20.2611 2.29344 19.9642C2.68058 19.6674 3.1224 19.4497 3.59368 19.3236L41.263 9.23001C41.7342 9.10361 42.2257 9.07128 42.7094 9.13485C43.1931 9.19843 43.6595 9.35666 44.082 9.60051C44.5045 9.84437 44.8749 10.1691 45.1719 10.5561C45.4689 10.9431 45.6868 11.3848 45.813 11.856L46.8818 15.847C47.0327 16.4105 47.0144 17.006 46.8291 17.5592C46.6438 18.1123 46.2998 18.5987 45.84 18.9577C45.1175 19.5212 44.5779 20.2858 44.2891 21.1553C44.0002 22.0248 43.975 22.9603 44.2166 23.844C44.4582 24.7278 44.9559 25.5203 45.6469 26.1219C46.3379 26.7235 47.1915 27.1072 48.1001 27.2248C48.6612 27.2978 49.188 27.5358 49.6137 27.9086C50.0393 28.2814 50.3448 28.7722 50.4912 29.3187L51.5804 33.3821C51.7068 33.8533 51.7391 34.3448 51.6755 34.8285C51.612 35.3122 51.4537 35.7786 51.2099 36.2011C50.966 36.6236 50.6413 36.994 50.2543 37.291C49.8673 37.588 49.4256 37.8059 48.9544 37.9321L11.2823 48.0257C10.3308 48.2804 9.31712 48.1467 8.4642 47.6541C7.61129 47.1614 6.98897 46.3502 6.73411 45.3988L5.7099 41.5759C5.54849 40.9741 5.56427 40.3385 5.75535 39.7455C5.94643 39.1525 6.30467 38.6273 6.78704 38.233C7.48069 37.6668 7.99586 36.9121 8.27049 36.0599C8.54512 35.2076 8.56751 34.2941 8.33495 33.4295C8.1024 32.5648 7.62481 31.7858 6.95973 31.1863C6.29464 30.5868 5.47042 30.1923 4.58632 30.0504C3.97472 29.9518 3.40469 29.6784 2.94487 29.2632C2.48506 28.8481 2.15508 28.3088 1.99468 27.7104H1.99375ZM34.9376 21.4992C35.291 21.4045 35.6223 21.2412 35.9125 21.0185C36.2028 20.7957 36.4463 20.518 36.6292 20.2012C36.8122 19.8844 36.9309 19.5346 36.9787 19.1719C37.0264 18.8091 37.0023 18.4406 36.9076 18.0872C36.8129 17.7338 36.6495 17.4025 36.4268 17.1123C36.2041 16.822 35.9264 16.5785 35.6096 16.3955C35.2927 16.2126 34.9429 16.0939 34.5802 16.0461C34.2175 15.9984 33.8489 16.0225 33.4955 16.1172C32.7818 16.3084 32.1733 16.7754 31.8039 17.4152C31.4345 18.0551 31.3343 18.8156 31.5256 19.5293C31.7168 20.243 32.1837 20.8515 32.8236 21.2209C33.4635 21.5903 34.2239 21.6905 34.9376 21.4992ZM36.8598 28.6743C37.2182 28.5844 37.5553 28.4241 37.8512 28.2027C38.1471 27.9813 38.396 27.7032 38.5834 27.3847C38.7708 27.0661 38.893 26.7134 38.9427 26.3472C38.9925 25.981 38.9689 25.6085 38.8732 25.2515C38.7776 24.8945 38.6119 24.5601 38.3858 24.2678C38.1597 23.9754 37.8776 23.731 37.5561 23.5488C37.2346 23.3665 36.88 23.25 36.513 23.2062C36.1461 23.1623 35.774 23.1919 35.4186 23.2932C34.7136 23.4921 34.1153 23.9606 33.7533 24.5974C33.3912 25.2341 33.2945 25.9879 33.4841 26.6954C33.6737 27.403 34.1344 28.0073 34.7663 28.3777C35.3983 28.7481 36.1507 28.8546 36.8607 28.6743H36.8598ZM38.7828 35.8503C39.4965 35.6591 40.105 35.1921 40.4745 34.5523C40.8439 33.9124 40.944 33.152 40.7528 32.4383C40.5616 31.7246 40.0946 31.1161 39.4548 30.7466C38.8149 30.3772 38.0545 30.2771 37.3408 30.4683C36.6271 30.6595 36.0186 31.1264 35.6491 31.7663C35.2797 32.4062 35.1796 33.1666 35.3708 33.8803C35.562 34.594 36.0289 35.2025 36.6688 35.572C37.3087 35.9414 38.0691 36.0415 38.7828 35.8503Z"
                    fill="#3C3C3C"
                    style="
                      fill: #3c3c3c;
                      fill: color(display-p3 0.2333 0.2333 0.2333);
                      fill-opacity: 1;
                    "
                  />
                </svg>
              </div>
              <div class="B15Title">5B</div>
            </div>
          </div>
          <div class="LinkText">
            Lord Su Hu of
            <a href="https://en.wikipedia.org/wiki/Jizhou_(ancient_China)"
              >Jizhou</a
            >
            rebels against the
            <a href="https://en.wikipedia.org/wiki/Shang_dynasty"
              >Shang dynasty</a
            >. The Shang army, led by Prince
            <a href="https://en.wikipedia.org/wiki/King_Zhou_of_Shang"
              >Yin Shou</a
            >, defeats the rebels. Shou and his
            <a href="https://en.wikipedia.org/wiki/Hostage_diplomacy#China"
              >hostage-sons</a
            >
            break through rebel defenses and kill Su.
            <a href="https://en.wikipedia.org/wiki/Daji">Su Daji</a>, the
            daughter of Su Hu, commits suicide but then emerges alive and is
            captured, with the Shang army returning home.
          </div>
        </div>
        <div class="leftCenter">
          <div class="CDIMG">
            <img src="@/assets/images/movie.png" alt="" />
          </div>
          <div class="CenterTitle">Creation of The Gods: Kingdom of Storms</div>
          <div class="Fantasy">
            Fantasy<svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              viewBox="0 0 5 5"
              fill="none"
            >
              <circle
                cx="2.5"
                cy="2.5"
                r="2"
                fill="#C2C2C2"
                style="
                  fill: #c2c2c2;
                  fill: color(display-p3 0.7625 0.7625 0.7625);
                  fill-opacity: 1;
                "
              />
            </svg>
            Action
          </div>
          <div class="time">
            <div class="itemTime">
              <div class="text">Days</div>
              <div class="num">56</div>
            </div>
            <div class="itemTime">
              <div class="text">Hours</div>
              <div class="num">16</div>
            </div>
            <div class="itemTime">
              <div class="text">Mins</div>
              <div class="num">56</div>
            </div>
            <div class="itemTime">
              <div class="text">Mins</div>
              <div class="num">23</div>
            </div>
          </div>
        </div>
        <div class="leftRight">
          <div class="PersonalProfile">
            <div style="display: flex">
              <div class="avater"></div>
              <div class="">
                <div class="name">Huang Bo</div>
                <div class="JiangZiya">Jiang Ziya</div>
              </div>
            </div>
            <div class="aixin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.75 7.96875C18.75 13.4375 10.6414 17.8641 10.2961 18.0469C10.2051 18.0958 10.1033 18.1215 10 18.1215C9.89665 18.1215 9.79492 18.0958 9.70391 18.0469C9.35859 17.8641 1.25 13.4375 1.25 7.96875C1.25145 6.68455 1.76223 5.45337 2.6703 4.5453C3.57837 3.63723 4.80955 3.12645 6.09375 3.125C7.70703 3.125 9.11953 3.81875 10 4.99141C10.8805 3.81875 12.293 3.125 13.9062 3.125C15.1904 3.12645 16.4216 3.63723 17.3297 4.5453C18.2378 5.45337 18.7486 6.68455 18.75 7.96875Z"
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
          <div class="cast">
            <div class="castTitle">CAST <span>(in credits order)</span></div>
            <div class="MultiplePeople">
              <div class="MultiplePeopleitem">
                <div class="PeopleImg">
                  <img src="@/assets/images/cast1.png" alt="" />
                </div>
                <div class="castName">
                  <div class="Peoplename">Huang Bo</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                  >
                    <circle
                      cx="2"
                      cy="2.5"
                      r="2"
                      fill="#444444"
                      style="
                        fill: #444444;
                        fill: color(display-p3 0.2667 0.2667 0.2667);
                        fill-opacity: 1;
                      "
                    />
                  </svg>
                  <div class="smailName">Jiang Ziya</div>
                </div>

                <div class="box" style="background: #cc44c5">1.3K</div>
              </div>
              <div class="MultiplePeopleitem">
                <div class="PeopleImg">
                  <img src="@/assets/images/cast2.png" alt="" />
                </div>
                <div class="castName">
                  <div class="Peoplename">Kris Phillips</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                  >
                    <circle
                      cx="2"
                      cy="2.5"
                      r="2"
                      fill="#444444"
                      style="
                        fill: #444444;
                        fill: color(display-p3 0.2667 0.2667 0.2667);
                        fill-opacity: 1;
                      "
                    />
                  </svg>
                  <div class="smailName">King Zhou (as Hsiang Fei)</div>
                </div>

                <div class="box" style="background: #862281">960</div>
              </div>
              <div class="MultiplePeopleitem">
                <div class="PeopleImg">
                  <img src="@/assets/images/cast3.png" alt="" />
                </div>
                <div class="castName">
                  <div class="Peoplename">Xuejian Li</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                  >
                    <circle
                      cx="2"
                      cy="2.5"
                      r="2"
                      fill="#444444"
                      style="
                        fill: #444444;
                        fill: color(display-p3 0.2667 0.2667 0.2667);
                        fill-opacity: 1;
                      "
                    />
                  </svg>
                  <div class="smailName">Ji Chang</div>
                </div>
                <div class="box" style="background: #40093e">850</div>
              </div>
              <div class="MultiplePeopleitem">
                <div class="PeopleImg"></div>
                <div class="castName">
                  <div class="Peoplename">Yu Xia</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                  >
                    <circle
                      cx="2"
                      cy="2.5"
                      r="2"
                      fill="#444444"
                      style="
                        fill: #444444;
                        fill: color(display-p3 0.2667 0.2667 0.2667);
                        fill-opacity: 1;
                      "
                    />
                  </svg>
                  <div class="smailName">Shen Gongbao</div>
                </div>

                <div class="box" style="background: #2c2c2c">326</div>
              </div>
              <div class="MultiplePeopleitem">
                <div class="PeopleImg"></div>
                <div class="castName">
                  <div class="Peoplename">Kun Chen</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                  >
                    <circle
                      cx="2"
                      cy="2.5"
                      r="2"
                      fill="#444444"
                      style="
                        fill: #444444;
                        fill: color(display-p3 0.2667 0.2667 0.2667);
                        fill-opacity: 1;
                      "
                    />
                  </svg>
                  <div class="smailName">Yuan Shi Tian Zun</div>
                </div>

                <div class="box" style="background: #2c2c2c">87</div>
              </div>
              <div class="MultiplePeopleitem">
                <div class="PeopleImg"></div>
                <div class="castName">
                  <div class="Peoplename">Quan Yuan</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                  >
                    <circle
                      cx="2"
                      cy="2.5"
                      r="2"
                      fill="#444444"
                      style="
                        fill: #444444;
                        fill: color(display-p3 0.2667 0.2667 0.2667);
                        fill-opacity: 1;
                      "
                    />
                  </svg>
                  <div class="smailName">Queen Jiang</div>
                </div>

                <div class="box" style="background: #2c2c2c">12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="deskbottom">
        <div class="video-carousel">
          <div class="arrow">
            <div class="back-button" @click="prevSlide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M11.8468 14.028C12.0053 14.1866 12.0944 14.4015 12.0944 14.6257C12.0944 14.8499 12.0053 15.0648 11.8468 15.2234C11.6883 15.3819 11.4733 15.4709 11.2491 15.4709C11.025 15.4709 10.81 15.3819 10.6515 15.2234L5.02649 9.59836C4.94783 9.51997 4.88541 9.42683 4.84283 9.32427C4.80024 9.22171 4.77832 9.11175 4.77832 9.0007C4.77832 8.88965 4.80024 8.77969 4.84283 8.67713C4.88541 8.57458 4.94783 8.48143 5.02649 8.40304L10.6515 2.77804C10.81 2.61954 11.025 2.53049 11.2491 2.53049C11.4733 2.53049 11.6883 2.61954 11.8468 2.77804C12.0053 2.93655 12.0944 3.15154 12.0944 3.3757C12.0944 3.59987 12.0053 3.81485 11.8468 3.97336L6.82016 9L11.8468 14.028Z"
                  fill="white"
                  fill-opacity="0.2"
                  style="fill: white; fill-opacity: 0.2"
                />
              </svg>
            </div>
            <div class="next-button" @click="nextSlide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M12.9722 9.59695L7.34717 15.222C7.18866 15.3805 6.97367 15.4695 6.74951 15.4695C6.52535 15.4695 6.31036 15.3805 6.15185 15.222C5.99335 15.0634 5.9043 14.8485 5.9043 14.6243C5.9043 14.4001 5.99335 14.1851 6.15185 14.0266L11.1799 9L6.15326 3.97195C6.07478 3.89347 6.01252 3.80029 5.97004 3.69775C5.92757 3.5952 5.9057 3.48529 5.9057 3.3743C5.9057 3.2633 5.92757 3.15339 5.97004 3.05085C6.01252 2.9483 6.07478 2.85513 6.15326 2.77664C6.23175 2.69816 6.32492 2.6359 6.42747 2.59342C6.53001 2.55095 6.63992 2.52908 6.75092 2.52908C6.86191 2.52908 6.97182 2.55095 7.07437 2.59342C7.17691 2.6359 7.27009 2.69816 7.34857 2.77664L12.9736 8.40164C13.0521 8.48012 13.1144 8.57334 13.1569 8.67595C13.1994 8.77856 13.2212 8.88854 13.221 8.99959C13.2209 9.11064 13.1989 9.22057 13.1561 9.32308C13.1134 9.42559 13.0509 9.51866 12.9722 9.59695Z"
                  fill="white"
                  style="fill: white; fill-opacity: 1"
                />
              </svg>
            </div>
          </div>
          <div class="dots-container">
            <span
              v-for="(video, index) in videos"
              :key="index"
              class="dot"
              :class="{ active: index === currentIndex }"
              @click="goToSlide(index)"
            ></span>
          </div>
          <!-- 播放按钮（默认显示，播放后隐藏） -->

          <div v-if="!isPlaying" class="play-button" @click="togglePlay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22.5 12C22.5006 12.2546 22.4353 12.5051 22.3105 12.727C22.1856 12.949 22.0055 13.1348 21.7875 13.2665L8.28 21.5297C8.05227 21.6691 7.79144 21.7452 7.52445 21.7502C7.25746 21.7551 6.99399 21.6887 6.76125 21.5578C6.53073 21.4289 6.3387 21.2409 6.2049 21.0132C6.07111 20.7855 6.00039 20.5263 6 20.2622V3.73779C6.00039 3.47368 6.07111 3.21445 6.2049 2.98673C6.3387 2.75902 6.53073 2.57106 6.76125 2.44217C6.99399 2.31124 7.25746 2.24482 7.52445 2.24977C7.79144 2.25471 8.05227 2.33084 8.28 2.47029L21.7875 10.7334C22.0055 10.8651 22.1856 11.051 22.3105 11.2729C22.4353 11.4949 22.5006 11.7453 22.5 12Z"
                fill="white"
                style="fill: white; fill-opacity: 1"
              />
            </svg>
          </div>

          <!-- 暂停按钮（播放时，鼠标悬停显示） -->
          <div
            v-if="isPlaying && showPauseButton"
            class="pause-button"
            @click="togglePlay"
            @mouseenter="showPauseButton = true"
            @mouseleave="showPauseButton = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M8 4H10V20H8V4ZM14 4H16V20H14V4Z" fill="white" />
            </svg>
          </div>
          <video
            ref="videoPlayer"
            class="video-player"
            :poster="videos[currentIndex].imageSrc"
            @mouseenter="showPauseButton = true"
            @mouseleave="showPauseButton = false"
            @ended="isPlaying = false"
          >
            <source :src="videos[currentIndex].videoSrc" type="video/mp4" />
          </video>
        </div>

        <div class="bottomRight">
          <div class="Producing">
            <div class="ProducingTitle">Producing Roadmap</div>
            <div class="ProducingText">
              Placeholder: this is a description of the current shooting stage,
              this is a description of the current shooting stage
            </div>
          </div>
          <div class="ruler-container">
            <div
              v-for="i in scaleMarks"
              :key="i"
              class="scale-mark"
              :style="getScaleMarkStyle(i)"
            >
              <!-- 只显示 5 的倍数和 0 的数字 -->
              <div
                v-if="i % 5 === 0"
                class="scale-label"
                :style="getScaleLabelStyle(i)"
              >
                {{ i }}
              </div>
            </div>
          </div>
          <div class="BarOfScale">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>

            <div class="slider-wrapper">
              <input
                type="range"
                v-model="sliderValue"
                min="0"
                max="100"
                class="slider"
                @input="onSliderInput"
              />
            </div>
            <div class="DiamondShape">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 0L12 6L6 12L0 6L6 0Z"
                  fill="white"
                  style="fill: white; fill-opacity: 1"
                />
              </svg>
            </div>
          </div>
          <div class="BarOfScale1">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="slider-wrapper">
              <input
                type="range"
                v-model="sliderValue1"
                min="0"
                max="100"
                class="slider1"
                @input="onSliderInput1"
              />
            </div>
            <div class="DiamondShape">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 0L12 6L6 12L0 6L6 0Z"
                  fill="white"
                  style="fill: white; fill-opacity: 1"
                />
              </svg>
            </div>
            <div class="DiamondShape1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 0L12 6L6 12L0 6L6 0Z"
                  fill="white"
                  style="fill: white; fill-opacity: 1"
                />
              </svg>
            </div>
            <div class="DiamondShape2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 0L12 6L6 12L0 6L6 0Z"
                  fill="white"
                  style="fill: white; fill-opacity: 1"
                />
              </svg>
            </div>
            <div class="DiamondShape3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 0L12 6L6 12L0 6L6 0Z"
                  fill="white"
                  style="fill: white; fill-opacity: 1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='less'>
.home_view {
  background: #121212;
  width: 100%;
  // height: 100%;
  height: 100vh;

  .container {
    width: 100%;
    padding: 15px 30px 95px 30px;
  }
}
.deskTop {
  display: flex;
  justify-content: space-between;
  .topleft {
    width: 445px;
    .Box {
      display: flex;
      gap: 24px;
      margin-bottom: 20px;
      .BoxOffice {
        .BoxTitle {
          max-width: 243px;
          color: #fff;
          font-family: Rubik;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.96px;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .BoxText {
          max-width: 243px;
          color: #717171;
          font-family: Lato;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.07px;
        }
      }
      .ticket {
        width: 178px;
        height: 69px;
        position: relative;
        .box {
          position: absolute;
          top: 1px;
          left: 34px;
          width: 74px;
        }
        color: #e621ca;
        text-align: center;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.64px;
        text-transform: uppercase;
      }
    }
    .B15 {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
      .B15Item {
        width: 142px;
        height: 151px;
        flex-shrink: 0;
        border-radius: 4px;
        background: #1a1a1a;
        display: flex;
        flex-direction: column;
        gap: 14px;
        justify-content: center;
        align-items: center;
        .img {
          width: 120px;
          height: 87px;
          flex-shrink: 0;
          border-radius: 999px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #2e2e2e;
          background: #1e1e1e;
          box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.25);
        }
        .B15Title {
          color: #e1e1e1;
          font-family: Rubik;
          font-size: 24px;
          font-style: italic;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.12px;
        }
      }
    }
    .LinkText {
      max-width: 445px;

      color: #e2e2e2;
      text-overflow: ellipsis;

      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 200% */
      letter-spacing: 0.06px;
      a {
        color: #e2e2e2;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.06px;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: none;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
      }
    }
  }
  .leftCenter {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin-left: 20px;
    .CDIMG {
      margin-top: -130px;
      margin-bottom: 8px;
      img {
        flex-shrink: 0;
        width: 261.54px;
        height: 261.54px;
      }
    }
    .CenterTitle {
      max-width: 320px;
      color: #fff;
      text-align: center;
      font-family: Rubik;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.76px;
      text-transform: uppercase;
      margin-bottom: 11px;
    }
    .Fantasy {
      display: flex;
      align-items: center;
      color: #e621ca;
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      gap: 8px;

      margin-bottom: 80px;
    }
    .time {
      display: flex;
      align-items: center;
      gap: 40px;

      .itemTime {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .text {
          color: #9aa4ac;
          font-family: Lato;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.07px;
        }
        .num {
          color: #fff;
          font-family: Lato;
          font-size: 24px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.12px;
        }
      }
    }
  }
  .leftRight {
    .PersonalProfile {
      gap: 241px;

      width: 100%;
      display: flex;
      padding-bottom: 27px;
      border-bottom: 1px solid #2c2c2c;
      .avater {
        width: 88px;
        height: 88px;
        flex-shrink: 0;
        background: #292929;
        margin-right: 8px;
      }
      .name {
        color: #fff;
        font-family: Lato;
        font-size: 24px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        letter-spacing: 0.12px;
        margin-bottom: 2px;
      }
      .JiangZiya {
        color: rgba(255, 255, 255, 0.4);
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.07px;
      }
      .aixin {
        display: flex;
        align-items: end;
      }
    }
    .cast {
      padding-top: 21px;
      .castTitle {
        color: #fff;
        font-family: Rubik;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.96px;
        text-transform: uppercase;
        margin-bottom: 18px;
        span {
          color: #646464;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 0.56px;
          text-transform: uppercase;
        }
      }
      .MultiplePeople {
        display: flex;
        flex-direction: column;
        gap: 5.5px;
        .MultiplePeopleitem {
          display: flex;
          .PeopleImg {
            width: 32px;
            height: 32px;
            flex-shrink: 0;
            background: #292929;
          }
          .castName {
            margin-left: 8px;
            padding: 8px 0;
            display: flex;
            align-items: center;
            width: 375px;
            gap: 10px;
            border-bottom: 1px solid #292929;
          }
          .smailName {
            color: rgba(255, 255, 255, 0.4);
            font-family: Lato;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 0.07px;
          }
          .box {
            margin-top: 6px;
            color: #fff;
            text-align: right;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 0.07px;
            padding-right: 2px;
            width: 50px;
            height: 22px;
          }
        }
      }
    }
  }
}
.deskbottom {
  display: flex;
  .video-carousel {
    display: flex;
    width: 439px;
    height: 240px;
    flex-shrink: 0;
    position: relative;
    border-radius: 12px;

    .arrow {
      z-index: 2;
      position: absolute;
      left: 10px;
      top: 0px;
      display: flex;
    }
    .back-button {
      width: 26px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
    }

    .next-button {
      width: 26px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
    }

    .video-player {
      width: 100%;

      background: #000;

      flex-shrink: 0;
      object-fit: cover;
      border-radius: 12px;
    }

    .play-button {
      z-index: 2;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      width: 80px;
      height: 54px;
      padding: 15px 28px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(2px);
    }

    .dots-container {
      display: flex;
      position: absolute;
      right: 25px;
      top: 21px;
    }

    .dot {
      width: 4px;
      height: 4px;
      margin-left: 2px;
      background: rgba(217, 217, 217, 0.2);
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }

    .dot.active {
      background: #d9d9d9;
    }
    .pause-button {
      z-index: 2;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      width: 80px;
      height: 54px;
      padding: 15px 28px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(2px);
    }
  }

  .bottomRight {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    .Producing {
      .ProducingTitle {
        color: #fff;
        font-family: Rubik;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.96px;
        text-transform: uppercase;
      }
      .ProducingText {
        max-width: 450px;
        color: #717171;
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.07px;
        margin-bottom: 23px;
      }
    }
    .ruler-container {
      position: relative;
      width: 917px; /* 刻度条的总宽度 */
      height: 50px;
      border-bottom: 1px solid #2c2c2c;
      margin-bottom: 18px;
      .scale-mark {
        position: absolute;
        bottom: 0;
        background-color: #2c2c2c;
      }

      .scale-label {
        position: absolute;
        bottom: 20px; /* 将数字标签放置在刻度线的上方 */
        font-size: 12px;
        text-align: center;
        color: #2c2c2c;
        transform: translateX(-50%); /* 使数字居中显示 */
      }
    }

    .BarOfScale,
    .BarOfScale1 {
      margin-bottom: 32px;
      width: 100%;
      background: #000;
      position: relative;
      .line {
        width: 100%;
        height: 1px;
        background: #2c2c2c;
        margin-bottom: 9px;
      }
      .line:last-child,
      .line:nth-child(3) {
        margin-bottom: 0;
      }
    }
    :last-child {
      margin-bottom: 0;
    }
    /* 自定义滑动条 */
    .slider,
    .slider1 {
      -webkit-appearance: none;
      width: 480px;
      height: 19px;
      background: linear-gradient(to right, #d339c4 0%, #371b36 0%);
      border-radius: 0px;
      outline: none;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .BarOfScale {
      .slider-wrapper {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: end;
        gap: 20px;
        flex-direction: column;
        position: absolute;
        top: 1px;
      }
      .DiamondShape {
        z-index: 2;
        position: absolute;
        top: 3px;
        right: 420px;
      }
    }
    .BarOfScale1 {
      .slider-wrapper {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: start;
        gap: 20px;
        flex-direction: column;
        position: absolute;
        top: 1px;
      }
      .DiamondShape {
        z-index: 2;
        position: absolute;
        top: 3px;
        left: 11px;
      }
      .DiamondShape1 {
        z-index: 2;
        position: absolute;
        top: 3px;
        left: 157px;
      }
      .DiamondShape2 {
        z-index: 2;
        position: absolute;
        top: 3px;
        left: 396px;
      }
      .DiamondShape3 {
        z-index: 2;
        position: absolute;
        top: 3px;
        left: 414px;
      }
    }

    /* 滑块形状和样式（使用提供的SVG作为背景） */
    .slider::-webkit-slider-thumb,
    .slider1::-webkit-slider-thumb {
      -webkit-appearance: none;

      width: 20px;
      height: 85px;
      background: url("@/assets/images/Frame2027.png") center no-repeat;
      background-size: contain;
      border: none;
      cursor: pointer;
      position: relative;
      z-index: 5;
    }
  }
}
</style>