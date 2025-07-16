<template>
  <div class="ai_container">
    <div
      class="container_head"
      v-for="(item, index) in reversedPairList"
      :key="index"
      @click="
        () => {
          if (reversedVoteList[index]?.remainingTime === 'Not yet started') {
            ElMessage({
              showClose: true,
              message: 'Voting has not yet begun',
              type: 'error',
            });
            return;
          }
          router.push(
            `/aidetail?pair=${reversedVoteList[index]?.contractAddress}`
          );
        }
      "
    >
      <img
        :src="reversedVoteList[index]?.character0Image || ''"
        alt=""
        class="red_back_img"
      />
      <img
        :src="reversedVoteList[index]?.character1Image || ''"
        alt=""
        class="blue_back_img"
      />
      <div class="head_content">
        <div class="red_avatar">
          <img :src="reversedVoteList[index]?.character0Image || ''" alt="" />
          <div class="red_avatar_name">
            <div>RED</div>
            <div>{{ reversedVoteList[index]?.character0 || "" }}</div>
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
            <div>{{ reversedVoteList[index]?.character1 || "" }}</div>
          </div>
          <img :src="reversedVoteList[index]?.character1Image || ''" alt="" />
        </div>
      </div>
      <div class="progress_container">
        <div
          class="red_line"
          :style="{
            width:
              'calc(' + reversedVoteList[index]?.votes0Proportion + '% + 12px)',
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
            width:
              'calc(' + reversedVoteList[index]?.votes0Proportion + '% + 10px)',
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
            left:
              'calc(' + reversedVoteList[index]?.votes0Proportion + '% - 25px)',
          }"
        />
        <div
          class="progress blue"
          :style="{
            width:
              'calc(' + reversedVoteList[index]?.votes1Proportion + '% + 10px)',
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
      <div class="count_down">
        <div>{{ reversedVoteList[index]?.startBlock || "" }}</div>
        <div>{{ reversedVoteList[index]?.remainingTime || "" }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useMovieVoteFactoryContract } from "@/api/contract/movieVoteFactory";
import { useMovieVotePairContract } from "@/api/contract/movieVotePair";
import { getImage } from "@/api/vote";
import router from "@/router";
import { ElMessage } from "element-plus";

const movieVoteFactoryContract = useMovieVoteFactoryContract();
const redWidth = ref(50);
const blueWidth = ref(50);
const pairList = ref([]);
const voteList = ref([]);
const reversedPairList = computed(() => [...pairList.value].reverse());
const reversedVoteList = computed(() => [...voteList.value].reverse());

onMounted(async () => {
  for (let i = 1; i < 9999; i++) {
    clearTimeout(i);
  }
  await getAllPair();
});
onUnmounted(() => {
  for (let i = 1; i < 9999; i++) {
    clearTimeout(i);
  }
});

const getAllPair = async () => {
  try {
    const list = await movieVoteFactoryContract.allPairs();
    pairList.value = [...list] || [];
    const blockNum = await movieVoteFactoryContract.getBlockCount();
    const nowTime = new Date().getTime();
    voteList.value = await Promise.all(
      pairList.value.map(async (item) => {
        const movieVotePairContract = useMovieVotePairContract(item);
        const character0 = await movieVotePairContract.getCharacter0();
        const votes0 = await movieVotePairContract.getVotes0();
        const character1 = await movieVotePairContract.getCharacter1();
        const votes1 = await movieVotePairContract.getVotes1();
        const startBlock = await movieVotePairContract.getStartBlock();
        const endBlock = await movieVotePairContract.getEndBlock();
        const imageList = await getImage({
          pair: item,
        });
        const votes0Proportion =
          Number(votes0) / (Number(votes0) + Number(votes1) || 1);

        return {
          contractAddress: item,
          character0: character0,
          character0Image: imageList.data?.json?.image_url_0,
          character1Image: imageList.data?.json?.image_url_1,
          votes0: votes0,
          votes0Proportion:
            Number(votes0) === Number(votes1)
              ? 50
              : (votes0Proportion * 100).toFixed(0),
          character1: character1,
          votes1: votes1,
          votes1Proportion:
            Number(votes0) === Number(votes1) ? 50 : 100 - votes0Proportion,
          remainingTime: formatBlockToTimeString(
            startBlock,
            endBlock,
            blockNum,
            nowTime
          ),
          startBlock: formatBlockToTime(
            startBlock,
            endBlock,
            blockNum,
            nowTime
          ),
        };
      })
    );
    // setTimeout(async () => {
    //   await getAllPair();
    // }, 1000);
  } catch (error) {
    console.log("error", error);
  }
};

const formatTime = (time) => {
  const minuteTime = time / 1000;
  const day = Math.floor(minuteTime / 60 / 60 / 24);
  const hours = Math.floor((minuteTime / 60 / 60) % 24);
  const minute = Math.floor((minuteTime / 60) % 60);
  const second = Math.floor(minuteTime % 60);
  return day + "days " + hours + "h " + minute + "min " + second + "sec";
};
// 区块格式化成时间字符串
const formatBlockToTimeString = (startBlock, endBlock, blockNum, nowTime) => {
  if (Number(startBlock) > Number(blockNum)) {
    return "Not yet started";
  } else {
    if (Number(endBlock) >= Number(blockNum)) {
      return formatTime((Number(endBlock) - Number(blockNum)) * 3 * 1000);
    } else {
      return "Ended";
    }
  }
};
const formatBlockToTime = (startBlock, endBlock, blockNum, nowTime) => {
  const startDifferenceBlockNum = Number(startBlock) - Number(blockNum);
  const endDifferenceBlockNum = Number(endBlock) - Number(blockNum);
  const startDate = new Date(nowTime + startDifferenceBlockNum * 3000);
  const endDate = new Date(nowTime + endDifferenceBlockNum * 3000);
  return (
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1 < 10
      ? "0" + (startDate.getMonth() + 1)
      : startDate.getMonth() + 1) +
    "-" +
    (startDate.getDate() < 10
      ? "0" + startDate.getDate()
      : startDate.getDate()) +
    " " +
    (startDate.getHours() < 10
      ? "0" + startDate.getHours()
      : startDate.getHours()) +
    ":" +
    (startDate.getMinutes() < 10
      ? "0" + startDate.getMinutes()
      : startDate.getMinutes()) +
    ":" +
    (startDate.getSeconds() < 10
      ? "0" + startDate.getSeconds()
      : startDate.getSeconds()) +
    " ~ " +
    endDate.getFullYear() +
    "-" +
    (endDate.getMonth() + 1 < 10
      ? "0" + (endDate.getMonth() + 1)
      : endDate.getMonth() + 1) +
    "-" +
    (endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate()) +
    " " +
    (endDate.getHours() < 10 ? "0" + endDate.getHours() : endDate.getHours()) +
    ":" +
    (endDate.getMinutes() < 10
      ? "0" + endDate.getMinutes()
      : endDate.getMinutes()) +
    ":" +
    (endDate.getSeconds() < 10
      ? "0" + endDate.getSeconds()
      : endDate.getSeconds())
  );
};
</script>

<style scoped lang="less">
.ai_container {
  flex: 1;
  .container_head {
    width: 100%;
    // height: 328px;
    max-width: 1280px;
    margin: auto;
    position: relative;
    z-index: 1;
    margin-top: 20px;
    cursor: pointer;
    .red_back_img {
      width: 50%;
      height: 250px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .blue_back_img {
      width: 50%;
      height: 250px;
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
          width: 80px;
          height: 80px;
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
        width: 150px;
        height: auto;
      }
      .blue_avatar {
        display: flex;
        align-items: center;
        gap: 24px;
        img {
          width: 80px;
          height: 80px;
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
    .count_down {
      color: #ff54f6;
      text-align: center;
      font-family: Montserrat;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: capitalize;
      position: relative;
      z-index: 2;
      width: 100%;
      top: -25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .container_section {
    width: 100%;
    position: relative;
    .pedestal_img {
      width: 1280px;
      height: auto;
      margin: auto;
      position: absolute;
      left: calc(50% - 640px);
      bottom: 0;
      z-index: 1;
    }
    .container_section_content {
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 2;
      padding-bottom: 150px;
      .container_section_red {
        flex: 1;
        height: 560px;
        position: relative;
        left: -35px;
        top: -24px;

        .container_section_redbackimg {
          width: 100%;
          height: 100%;
        }
        .container_section_avatar {
          width: 420px;
          height: 609px;
          position: absolute;
          top: 0;
          right: -35px;
        }
      }
      .container_section_btn {
        width: 326px;
        height: 498px;
        margin: 0 32px;
        background: url("@/assets/images/ai/img10.png") no-repeat;
        background-size: 100% 100%;
        .csb_blue_block {
          width: 319px;
          height: 337px;
          background: url("@/assets/images/ai/img2.png") no-repeat;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          position: relative;
          left: 20px;
          top: 26px;
          box-shadow: 0px 0px 40px 0px rgba(42, 46, 241, 0.28) inset;
          box-shadow: 0px 1px 6px 0px rgba(42, 46, 241, 0.46) inset;
          .csb_blue_block_mask {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: rgba(22, 6, 2, 0.25);
            .vote_btn {
              width: 280px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(42, 46, 241, 1);
              border-radius: 4px;
              color: #fff;
              text-align: center;
              font-family: Montserrat;
              font-size: 20px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              text-transform: uppercase;
              margin-top: 20px;
              cursor: pointer;
            }
            .share_btn {
              width: 280px;
              height: 35px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(33, 34, 105, 0.95);
              border-radius: 4px;
              color: #fff;
              text-align: center;
              font-family: Montserrat;
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              text-transform: uppercase;
              margin-top: 16px;
              cursor: pointer;
            }
            .text_btn {
              margin-top: 45px;
              text-align: right;
              -webkit-text-stroke-width: 0.83px;
              -webkit-text-stroke-color: #000;
              font-family: Montserrat;
              font-size: 54px;
              font-style: normal;
              font-weight: 800;
              line-height: normal;
              text-transform: uppercase;
              transform: rotate(30deg);
              background: linear-gradient(
                0deg,
                rgba(101, 104, 228, 1) 0%,
                rgba(127, 130, 255, 0.23) 100%
              );
              -webkit-background-clip: text; /* 关键：让背景裁剪到文字 */
              -webkit-text-fill-color: transparent; /* 关键：填充变透明，显示背景 */
            }
          }
        }
        .csb_red_block {
          width: 319px;
          height: 312px;
          background: url("@/assets/images/ai/img1.png") no-repeat;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          position: relative;
          left: -10px;
          top: -150px;
          box-shadow: 0px 0px 40px 0px rgba(210, 57, 58, 0.28) inset;
          box-shadow: 0px 1px 6px 0px rgba(210, 57, 58, 0.46) inset;
          .csb_red_block_mask {
            width: 100%;
            height: 100%;
            background-color: rgba(22, 6, 2, 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            .vote_btn {
              width: 280px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(211, 57, 57, 1);
              border-radius: 4px;
              color: #fff;
              text-align: center;
              font-family: Montserrat;
              font-size: 20px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              text-transform: uppercase;
              margin-bottom: 12px;
              cursor: pointer;
            }
            .share_btn {
              width: 280px;
              height: 35px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(72, 16, 16, 1);
              border-radius: 4px;
              color: #fff;
              text-align: center;
              font-family: Montserrat;
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              text-transform: uppercase;
              margin-bottom: 11px;
              cursor: pointer;
            }
            .text_btn {
              text-align: right;
              -webkit-text-stroke-width: 0.83px;
              -webkit-text-stroke-color: #000;
              font-family: Montserrat;
              font-size: 54px;
              font-style: normal;
              font-weight: 800;
              line-height: normal;
              text-transform: uppercase;
              transform: rotate(30deg);
              background: linear-gradient(
                0deg,
                rgba(255, 114, 114, 1) 0%,
                rgba(255, 114, 114, 0.08) 100%
              );
              -webkit-background-clip: text; /* 关键：让背景裁剪到文字 */
              -webkit-text-fill-color: transparent; /* 关键：填充变透明，显示背景 */
              position: relative;
              top: -35px;
            }
          }
        }
      }
      .container_section_blue {
        flex: 1;
        height: 560px;
        position: relative;
        right: -35px;
        top: -24px;

        .container_section_redbackimg {
          width: 100%;
          height: 100%;
        }
        .container_section_avatar {
          width: 420px;
          height: 609px;
          position: absolute;
          top: 0;
          left: -35px;
        }
      }
    }
  }
  .vote_dv_content {
    display: flex;
    align-items: center;
    justify-content: center;
    .vote_dvc_red {
      min-width: 220px;
      max-width: 220px;
      height: 320px;
      position: relative;
      right: -30px;
      img {
        width: 100%;
        height: 100%;
      }
      div {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.56);
        z-index: 2;
      }
    }
    .vote_dvc_content {
      min-width: 409px;
      max-width: 409px;
      height: 325px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .vote_dvc_content_head {
        .red_text {
          text-align: center;
          font-family: Montserrat;
          font-size: 32px;
          font-style: normal;
          font-weight: 900;
          line-height: 150%; /* 48px */
          text-transform: uppercase;
        }
        .red_text_lead {
          color: #d33939;
        }
        .red_text_backward {
          color: #2a2ef1;
        }
      }

      & > div {
        max-width: 329px;
        &:nth-child(2) {
          color: #fff;
          text-align: center;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 150%; /* 21px */
          text-transform: uppercase;
        }
        &:nth-child(3) {
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 21px */
        }
        &:last-child {
          margin-top: 24px;
          display: flex;
          padding: 8px 16px;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          background: #fff;
          color: #d33939;
          text-align: center;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          text-transform: uppercase;
          cursor: pointer;
        }
      }
    }
    .red {
      border: 1px solid #d33939;
      background: #1e0803;
      box-shadow: 0px 1px 6px 0px rgba(211, 57, 57, 0.54) inset,
        0px 0px 40px 0px rgba(211, 57, 57, 0.28) inset;
    }
    .blue {
      border: 1px solid #2a2ef1;
      background: #03051e;
      box-shadow: 0px 1px 6px 0px rgba(42, 46, 241, 0.54) inset,
        0px 0px 40px 0px rgba(42, 46, 241, 0.28) inset;
    }
    .vote_dvc_blue {
      min-width: 220px;
      max-width: 220px;
      height: 320px;
      position: relative;
      left: -30px;
      img {
        width: 100%;
        height: 100%;
      }
      div {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.56);
        z-index: 2;
      }
    }
  }
  .vote_num_content {
    border-radius: 16px;
    border: 1px solid #d33939;
    background: #1e0803;
    box-shadow: 0px 1px 6px 0px rgba(211, 57, 57, 0.54) inset,
      0px 0px 40px 0px rgba(211, 57, 57, 0.28) inset;
    padding: 0 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > div {
      width: 272px;
      max-width: 272px;
    }
    & > img {
      width: 80px;
      height: 80px;
      position: relative;
      top: -40px;
      z-index: 2;
    }
  }
}
</style>
