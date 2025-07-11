<template>
  <div class="ai_container">
    <div class="container_head">
      <img src="@/assets/images/ai/img1.png" alt="" class="red_back_img" />
      <img src="@/assets/images/ai/img2.png" alt="" class="blue_back_img" />
      <div class="head_content">
        <div class="red_avatar">
          <img src="@/assets/images/ai/img3.png" alt="" />
          <div class="red_avatar_name">
            <div>RED</div>
            <div>Nezha</div>
          </div>
        </div>
        <img
          src="@/assets/images/ai/img4.png"
          alt=""
          class="head_content_img"
        />
        <div class="blue_avatar">
          <div class="blue_avatar_name">
            <div>BLUE</div>
            <div>Ao Bing</div>
          </div>
          <img src="@/assets/images/ai/img5.png" alt="" />
        </div>
      </div>
      <div class="progress_container">
        <div
          class="red_line"
          :style="{
            width: 'calc(' + redWidth + '% + 12px)',
          }"
        ></div>
        <img
          src="@/assets/images/ai/img6.png"
          alt=""
          class="progress_container_topline"
        />
        <div
          class="progress red"
          :style="{
            width: 'calc(' + redWidth + '% + 10px)',
            clipPath:
              'polygon(0 0, 100% 0, calc(100% - 20px) 100%, 100% 100%, 0 100%)',
          }"
        >
          <div
            class="red_white_line"
            :style="{
              clipPath:
                'polygon(0 0, 100% 0, calc(100% - 15px) 100%, 100% 100%, 0 100%)',
            }"
          >
            <div
              class="rwl_content"
              :style="{
                clipPath:
                  'polygon(0 0, 100% 0, calc(100% - 13px) 100%, 100% 100%, 0 100%)',
              }"
            ></div>
          </div>
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
            clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 20px 0)',
          }"
        >
          <div
            class="blue_white_line"
            :style="{
              clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 100% 100%, 0 100%)',
            }"
          >
            <div
              class="bwl_content"
              :style="{
                clipPath:
                  'polygon(13px 0, 100% 0, 100% 100%, 100% 100%, 0 100%)',
              }"
            ></div>
          </div>
        </div>
        <img
          src="@/assets/images/ai/img6.png"
          alt=""
          class="progress_container_bottomline"
        />
        <div
          class="blue_line"
          :style="{
            width: 'calc(' + blueWidth + '% + 12px)',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const redWidth = ref(50);
const blueWidth = ref(50);

onMounted(() => {
  setInterval(() => {
    const red = Math.floor(Math.random() * 100);
    redWidth.value = red;
    blueWidth.value = 100 - red;
  }, 1000);
});
</script>

<style scoped lang="less">
.ai_container {
  flex: 1;
  .container_head {
    width: 100%;
    height: 328px;
    max-width: 1280px;
    margin: auto;
    position: relative;
    z-index: 1;
    .red_back_img {
      width: 50%;
      height: 328px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .blue_back_img {
      width: 50%;
      height: 328px;
      position: absolute;
      top: 0;
      right: 0;
    }
    .head_content {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      position: relative;
      .red_avatar {
        display: flex;
        align-items: center;
        gap: 24px;
        img {
          width: 120px;
          height: 120px;
          border-radius: 24px;
          border: 1px solid #ff3503;
        }
        .red_avatar_name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          div {
            &:first-child {
              font-family: "Douyin Sans";
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              background: linear-gradient(
                180deg,
                rgba(255, 53, 3, 1) 0%,
                rgba(153, 65, 2, 1) 100%
              );
              -webkit-background-clip: text; /* 关键：让背景裁剪到文字 */
              -webkit-text-fill-color: transparent; /* 关键：填充变透明，显示背景 */
            }
            &:last-child {
              color: #fff;
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: #200;
              font-family: "Douyin Sans";
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
            }
          }
        }
      }
      .head_content_img {
        width: 244px;
        height: auto;
      }
      .blue_avatar {
        display: flex;
        align-items: center;
        gap: 24px;
        img {
          width: 120px;
          height: 120px;
          border-radius: 24px;
          border: 1px solid #3103ff;
        }
        .blue_avatar_name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          gap: 6px;
          div {
            &:first-child {
              font-family: "Douyin Sans";
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              background: linear-gradient(
                180deg,
                rgba(49, 3, 255, 1) 0%,
                rgba(2, 125, 153, 1) 100%
              );
              -webkit-background-clip: text; /* 关键：让背景裁剪到文字 */
              -webkit-text-fill-color: transparent; /* 关键：填充变透明，显示背景 */
            }
            &:last-child {
              color: #fff;
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: #200;
              font-family: "Douyin Sans";
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
            }
          }
        }
      }
    }
    .progress_container {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 1280px;
      margin: auto;
      height: 126px;
      top: -10px;
      .red_line {
        height: 2px;
        background: linear-gradient(
          to left,
          #ff3a3a 0.39%,
          rgba(255, 58, 58, 0) 81.18%
        );
        position: absolute;
        top: 32px;
        left: 0;
        z-index: 5;
        transition: 1s;
      }
      .progress_container_topline {
        width: 100%;
        height: 2px;
        position: absolute;
        top: 37px;
      }
      .progress {
        height: 48px;
        position: absolute;
        top: 39px;
        transition: width 1s;
        box-sizing: border-box;
        .red_white_line {
          width: calc(100% - 10px);
          height: 36px;
          background-color: rgba(255, 255, 255, 0.49);
          padding-left: 2px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          box-sizing: border-box;
          .rwl_content {
            width: calc(100% - 4px);
            height: 32px;
            background: linear-gradient(to right, #3a0b0b 0%, #c86b7e 100%);
          }
        }
        .blue_white_line {
          width: calc(100% - 10px);
          height: 36px;
          background-color: rgba(255, 255, 255, 0.49);
          padding-right: 2px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          box-sizing: border-box;
          .bwl_content {
            width: calc(100% - 4px);
            height: 32px;
            background: linear-gradient(to right, #4351b3 0%, #233b88 100%);
          }
        }
      }

      .red {
        background: linear-gradient(to right, #861e1a 0%, #592857 100%);
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-left: 6px;
      }

      .blue {
        background: linear-gradient(to right, #37459b 0%, #4650b2 100%);
        right: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
        padding-right: 6px;
      }
      .progress_bar_divider {
        width: 50px;
        height: 126px;
        position: absolute;
        top: 0;
        z-index: 10;
        transition: 1s;
      }
      .progress_container_bottomline {
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: 38px;
      }
      .blue_line {
        height: 2px;
        background: linear-gradient(
          to left,
          rgba(21, 54, 255, 0) 0.39%,
          #1536ff 100%
        );
        position: absolute;
        right: 0;
        bottom: 32px;
        z-index: 5;
        transition: 1s;
      }
    }
  }
}
</style>
