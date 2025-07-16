<template>
  <div class="ai_container">
    <div class="container_head">
      <img
        :src="detailData.character0Image || ''"
        alt=""
        class="red_back_img"
      />
      <img
        :src="detailData.character1Image || ''"
        alt=""
        class="blue_back_img"
      />
      <div class="head_content">
        <div class="red_avatar">
          <img :src="detailData.character0Image || ''" alt="" />
          <div class="red_avatar_name">
            <div>RED</div>
            <div>{{ detailData.character0 || "" }}</div>
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
            <div>{{ detailData.character1 || "" }}</div>
          </div>
          <img :src="detailData.character1Image || ''" alt="" />
        </div>
      </div>
      <div class="progress_container">
        <div
          class="red_line"
          :style="{
            width: 'calc(' + detailData.votes0Proportion + '% + 12px)',
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
            width: 'calc(' + detailData.votes0Proportion + '% + 10px)',
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
            left: 'calc(' + detailData.votes0Proportion + '% - 25px)',
          }"
        />
        <div
          class="progress blue"
          :style="{
            width: 'calc(' + detailData.votes1Proportion + '% + 10px)',
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
            width: 'calc(' + detailData.votes1Proportion + '% + 12px)',
          }"
        ></div>
      </div>
      <div class="count_down">{{ detailData.remainingTime }}</div>
    </div>
    <div class="container_section">
      <img src="@/assets/images/ai/img13.png" alt="" class="pedestal_img" />
      <div class="container_section_content">
        <div class="container_section_red">
          <img
            src="@/assets/images/ai/img7.png"
            alt=""
            class="container_section_redbackimg"
          />
          <img
            :src="detailData.character0Image || ''"
            alt=""
            class="container_section_avatar"
          />
        </div>
        <div class="container_section_btn">
          <div
            class="csb_blue_block"
            :style="{
              clipPath:
                'polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 calc(100% - 195px))',
              background: `url('${
                detailData.character1Image || ''
              }') no-repeat`,
            }"
          >
            <div class="csb_blue_block_mask">
              <div class="vote_btn" @click="showVoteDifference('blue')">
                VOTE BLUE
              </div>
              <div class="share_btn" @click="showShareVisible">
                SPEED UP VOTING
              </div>
              <div class="text_btn">BLUE</div>
            </div>
          </div>
          <div
            class="csb_red_block"
            :style="{
              clipPath:
                'polygon(0 0, 100% 195px, 100% 100%, 100% 100%, 0 100%)',
              background: `url('${
                detailData.character0Image || ''
              }') no-repeat`,
            }"
          >
            <div class="csb_red_block_mask">
              <div class="text_btn">RED</div>
              <div class="share_btn" @click="showShareVisible">
                SPEED UP VOTING
              </div>
              <div class="vote_btn" @click="showVoteDifference('red')">
                VOTE RED
              </div>
            </div>
          </div>
        </div>
        <div class="container_section_blue">
          <img
            :src="detailData.character1Image || ''"
            alt=""
            class="container_section_avatar"
          />
          <img
            src="@/assets/images/ai/img12.png"
            alt=""
            class="container_section_redbackimg"
          />
        </div>
      </div>
    </div>
    <!-- 投票票数相差弹窗 -->
    <div
      v-if="voteDifferenceVisible"
      style="
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
      "
      @click="voteDifferenceVisible = false"
    >
      <div class="vote_dv_content" @click.stop="">
        <div class="vote_dvc_red">
          <img :src="detailData.character0Image || ''" alt="" />
          <div
            v-if="detailData.votes1Proportion > detailData.votes0Proportion"
          ></div>
        </div>
        <div class="vote_dvc_content" :class="voteDifferenceType">
          <div class="vote_dvc_content_head">
            <div
              class="red_text red_text_lead"
              v-if="
                detailData.votes0Proportion > detailData.votes1Proportion &&
                voteDifferenceType === 'red'
              "
            >
              NEZHA TAKES<br />THE LEAD!
            </div>
            <div
              class="red_text red_text_lead"
              v-else-if="
                detailData.votes0Proportion < detailData.votes1Proportion &&
                voteDifferenceType === 'red'
              "
            >
              NEZHA IS<br />BEHIND!
            </div>
            <div
              class="red_text red_text_backward"
              v-else-if="
                detailData.votes1Proportion > detailData.votes0Proportion &&
                voteDifferenceType === 'blue'
              "
            >
              AO BING TAKES<br />THE LEAD!
            </div>
            <div
              class="red_text red_text_backward"
              v-else-if="
                detailData.votes1Proportion < detailData.votes0Proportion &&
                voteDifferenceType === 'blue'
              "
            >
              AO BING IS<br />BEHIND!
            </div>
          </div>
          <div class="">
            Stake
            {{
              voteDifferenceType === "red"
                ? detailData.votes0 - detailData.votes1 > 0
                  ? detailData.votes0 - detailData.votes1
                  : 0
                : detailData.votes1 - detailData.votes0 > 0
                ? detailData.votes1 - detailData.votes0
                : 0
            }}
            votes for enhanced yield
          </div>
          <div>
            Keep voting to maintain the lead! Get 1 free vote daily, and earn
            bonus votes by inviting friends.
          </div>
          <div @click="showVoteVisible">Vote More</div>
        </div>
        <div class="vote_dvc_blue">
          <img :src="detailData.character1Image || ''" alt="" />
          <div
            v-if="detailData.votes0Proportion > detailData.votes1Proportion"
          ></div>
        </div>
      </div>
    </div>
    <!-- 投票弹窗 -->
    <div
      v-if="voteVisible"
      style="
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
      "
      @click="voteVisible = false"
    >
      <div
        class="vote_num_content_red"
        v-if="voteDifferenceType === 'red'"
        @click.stop=""
      >
        <img :src="detailData.character0Image || ''" alt="" />
        <div class="vncr_title">VOTE {{ detailData.character0 || "" }}</div>
        <div class="vncr_subtitle">
          Vote for {{ detailData.character0 || "" }} with 1 vote per submission!
          Earn extra votes by inviting friends.
        </div>
        <div class="vncr_line"></div>
        <div class="vncr_num_tip">Number of votes</div>
        <div class="vncr_num">
          <img
            src="@/assets/images/ai/img16.png"
            alt=""
            @click="
              () => {
                if (Number(voteAmount) < 1) {
                  return;
                }
                voteAmount = Number(voteAmount) - 1;
              }
            "
          />
          <div>{{ voteAmount }}</div>
          <img
            src="@/assets/images/ai/img17.png"
            alt=""
            @click="
              () => {
                if (Number(voteAmount) >= Number(userFreeTickets)) {
                  return;
                }
                voteAmount = Number(voteAmount) + 1;
              }
            "
          />
        </div>
        <div class="vncr_num_votes">
          Remaining votes <span>{{ userFreeTickets || 0 }}</span>
        </div>
        <div class="vncr_num">
          <img
            src="@/assets/images/ai/img16.png"
            alt=""
            @click="
              () => {
                if (Number(voteUsdtAmount) < 1) {
                  return;
                }
                voteUsdtAmount = Number(voteUsdtAmount) - 1;
              }
            "
          />
          <input
            type="number"
            v-model="voteUsdtAmount"
            class="custom_input"
            @change="
              () => {
                if (Number(voteUsdtAmount) > Number(balanceAmount)) {
                  voteUsdtAmount = balanceAmount;
                }
              }
            "
          />
          <img
            src="@/assets/images/ai/img17.png"
            alt=""
            @click="
              () => {
                if (Number(voteUsdtAmount) >= Number(balanceAmount)) {
                  return;
                }
                voteUsdtAmount = Number(voteUsdtAmount) + 1;
              }
            "
          />
        </div>
        <div class="vncr_num_votes">
          balance <span>{{ balanceAmount || 0 }} USDT</span>
        </div>
        <div class="vncr_vote_btn vncr_vote_btn_red" @click="voteTicket('0')">
          VOTE
        </div>
      </div>
      <div
        class="vote_num_content_blue"
        v-if="voteDifferenceType === 'blue'"
        @click.stop=""
      >
        <img :src="detailData.character1Image || ''" alt="" />
        <div class="vncr_title">VOTE {{ detailData.character1 }}</div>
        <div class="vncr_subtitle">
          Vote for {{ detailData.character1 || "" }} with 1 vote per submission!
          Earn extra votes by inviting friends.
        </div>
        <div class="vncr_line"></div>
        <div class="vncr_num_tip">Number of votes</div>
        <div class="vncr_num">
          <img
            src="@/assets/images/ai/img16.png"
            alt=""
            @click="
              () => {
                if (Number(voteAmount) < 1) {
                  return;
                }
                voteAmount = Number(voteAmount) - 1;
              }
            "
          />
          <div>{{ voteAmount }}</div>
          <img
            src="@/assets/images/ai/img17.png"
            alt=""
            @click="
              () => {
                if (Number(voteAmount) >= Number(userFreeTickets)) {
                  return;
                }
                voteAmount = Number(voteAmount) + 1;
              }
            "
          />
        </div>
        <div class="vncr_num_votes">
          Remaining votes <span>{{ userFreeTickets || 0 }}</span>
        </div>
        <div class="vncr_num">
          <img
            src="@/assets/images/ai/img16.png"
            alt=""
            @click="
              () => {
                if (Number(voteUsdtAmount) < 1) {
                  return;
                }
                voteUsdtAmount = Number(voteUsdtAmount) - 1;
              }
            "
          />
          <input
            type="number"
            v-model="voteUsdtAmount"
            class="custom_input"
            @change="
              () => {
                if (Number(voteUsdtAmount) > Number(balanceAmount)) {
                  voteUsdtAmount = balanceAmount;
                }
              }
            "
          />
          <img
            src="@/assets/images/ai/img17.png"
            alt=""
            @click="
              () => {
                if (Number(voteUsdtAmount) >= Number(balanceAmount)) {
                  return;
                }
                voteUsdtAmount = Number(voteUsdtAmount) + 1;
              }
            "
          />
        </div>
        <div class="vncr_num_votes">
          balance <span>{{ balanceAmount || 0 }} USDT</span>
        </div>
        <div class="vncr_vote_btn vncr_vote_btn_blue" @click="voteTicket('1')">
          VOTE
        </div>
      </div>
    </div>
    <!-- 分享弹窗 -->
    <div
      v-if="shareVisible"
      style="
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
      "
      @click="shareVisible = false"
    >
      <div class="share_content" @click.stop="">
        <div>Speed up voting</div>
        <div>
          Share your voting link. Each vote from your unique link earns you
          bonus support points!
        </div>
        <div></div>
        <div>
          <div>Your unique link</div>
          <img
            src="@/assets/images/ai/img18.png"
            alt=""
            @click="
              copyTextToClipboard(
                'https://www.figma.com/design/E7rxc8q37pBGBIQ3zd8ndk/Movie--%E9%A1%B9%E7%9B%AE%E8%AE%BE%E8%AE%A1?node-id=5129-2626&t=sLFn30masH4YaTS8-1'
              )
            "
          />
        </div>
        <div>
          https://www.figma.com/design/E7rxc8q37pBGBIQ3zd8ndk/Movie--%E9%A1%B9%E7%9B%AE%E8%AE%BE%E8%AE%A1?node-id=5129-2626&t=sLFn30masH4YaTS8-1
        </div>
        <div @click="shareVisible = false">CLose</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useUsdtTokenContract } from "@/api/contract/usdtToken";
import { useMovieVoteFactoryContract } from "@/api/contract/movieVoteFactory";
import { useMovieVotePairContract } from "@/api/contract/movieVotePair";
import { getImage } from "@/api/vote";
import { ElNotification, ElMessage } from "element-plus";
import useWalletStore from "@/store/modules/wallet";
import Web3 from "web3";
import Decimal from "decimal.js";

const web3 = new Web3(window.ethereum);
const walletStore = useWalletStore();
const route = useRoute();
const usdtTokenContract = useUsdtTokenContract();
const movieVoteFactoryContract = useMovieVoteFactoryContract();
const pair = route.query.pair || "";
const voteDifferenceVisible = ref(false);
const voteVisible = ref(false);
const shareVisible = ref(false);
const voteDifferenceType = ref("");
const detailData = ref({
  contractAddress: "",
  character0: "",
  character0Image: "",
  character1Image: "",
  votes0: "",
  votes0Proportion: 50,
  character1: "",
  votes1: "",
  votes1Proportion: 50,
  remainingTime: "",
  countdown: 0,
});
const voteAmount = ref("0");
const voteUsdtAmount = ref("0");
const userFreeTickets = ref(0);
const balanceAmount = ref(0);

onMounted(async () => {
  await getDetailState();
  setInterval(() => {
    detailData.value.countdown -= 1;
    detailData.value.remainingTime = formatBlockToTimeString(
      detailData.value.countdown
    );
  }, 1000);
  await getDetail();
});

const getDetailState = async () => {
  try {
    const blockNum = await movieVoteFactoryContract.getBlockCount();
    const movieVotePairContract = useMovieVotePairContract(pair);
    const character0 = await movieVotePairContract.getCharacter0();
    const character1 = await movieVotePairContract.getCharacter1();
    const endBlock = await movieVotePairContract.getEndBlock();
    const imageList = await getImage({
      pair: pair,
    });
    detailData.value.contractAddress = pair;
    detailData.value.character0 = character0;
    detailData.value.character0Image = imageList.data?.json?.image_url_0;
    detailData.value.character1Image = imageList.data?.json?.image_url_1;
    detailData.value.character1 = character1;
    detailData.value.countdown = (Number(endBlock) - Number(blockNum)) * 3;
    detailData.value.remainingTime = formatBlockToTimeString(
      detailData.value.countdown
    );
  } catch (error) {
    console.log("error", error);
  }
};

const getDetail = async () => {
  try {
    const movieVotePairContract = useMovieVotePairContract(pair);
    const votes0 = await movieVotePairContract.getVotes0();
    const votes1 = await movieVotePairContract.getVotes1();
    const votes0Proportion =
      Number(votes0) / (Number(votes0) + Number(votes1) || 1);
    detailData.value.votes0 = votes0;
    detailData.value.votes0Proportion =
      Number(votes0) === Number(votes1)
        ? 50
        : (votes0Proportion * 100).toFixed(0);
    detailData.value.votes1 = votes1;
    detailData.value.votes1Proportion =
      Number(votes0) === Number(votes1) ? 50 : 100 - votes0Proportion;
    await getDetail();
  } catch (error) {
    console.log("error", error);
  }
};

const formatBlockToTimeString = (time) => {
  const day = Math.floor(time / 60 / 60 / 24);
  const hours = Math.floor((time / 60 / 60) % 24);
  const minute = Math.floor((time / 60) % 60);
  const second = Math.floor(time % 60);
  return day + "days " + hours + "h " + minute + "min " + second + "sec";
};

const showShareVisible = async () => {
  try {
    if (walletStore.walletAddress === "") {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: "请先连接钱包",
        duration: 1000,
      });
      return;
    }
    shareVisible.value = true;
  } catch (error) {}
};
const showVoteDifference = async (type) => {
  voteDifferenceType.value = type;
  voteAmount.value = "0";
  voteUsdtAmount.value = "0";
  userFreeTickets.value = 0;
  balanceAmount.value = 0;
  try {
    if (walletStore.walletAddress === "") {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: "请先连接钱包",
        duration: 1000,
      });
      return;
    }
    const movieVotePairContract = useMovieVotePairContract(pair);
    const data = await movieVotePairContract.getUserFreeTickets(
      walletStore.walletAddress
    );
    userFreeTickets.value = Number(data) || 0;
    const balance = await usdtTokenContract.getBalanceOf(
      walletStore.walletAddress
    );
    balanceAmount.value = formatBalance18(balance);

    if (detailData.votes0 === detailData.votes1) {
      voteVisible.value = true;
    } else {
      voteDifferenceVisible.value = true;
    }
  } catch (error) {}
};

const showVoteVisible = () => {
  voteDifferenceVisible.value = false;
  voteVisible.value = true;
};

const voteTicket = (type) => {};

const copyTextToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  let success = false;
  try {
    success = document.execCommand("copy");
    if (success) {
      ElMessage({
        showClose: true,
        message: "Copy Success",
        type: "success",
      });
    } else {
      console.warn("复制失败");
    }
  } catch (err) {
    console.error("复制出错：", err);
  }

  document.body.removeChild(textarea);
};

const formatBalance18 = (balance, fixedNum) => {
  try {
    if (!balance || balance === "0" || balance === 0) {
      return "0.00";
    }

    let parsedBalance =
      typeof balance === "string" ? balance : balance.toString();
    const isNegative = parsedBalance.includes("-");
    if (isNegative) {
      parsedBalance = parsedBalance.replace("-", "");
    }

    let etherValue = new Decimal(parsedBalance).dividedBy(1e18);
    let result;

    // 保留 fixedNum 位小数（默认 6 位）
    fixedNum = fixedNum ?? 2;
    const precision = new Decimal(10).pow(fixedNum);
    result = etherValue
      .times(precision)
      .floor()
      .div(precision)
      .toFixed(fixedNum);

    // 检查小数部分是否全为 0
    const [intPart, decimalPart] = result.split(".");
    const allZeroDecimal = decimalPart.split("").every((c) => c === "0");

    const finalResult = allZeroDecimal ? `${intPart}.00` : result;

    return isNegative ? `-${finalResult}` : finalResult;
  } catch (error) {
    console.log("error", error);
  }
};
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
      top: -20px;
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
  .vote_num_content_red {
    border-radius: 16px;
    background: #1e0803;
    border: 1px solid #d33939;
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
    .vncr_title {
      color: #d33939;
      font-family: Montserrat;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 36px */
      text-transform: uppercase;
      text-align: center;
      margin-top: -20px;
    }
  }
  .vote_num_content_blue {
    border-radius: 16px;
    background: #03051e;
    border: 1px solid #2a2ef1;
    box-shadow: 0px 1px 6px 0px rgba(42, 46, 241, 0.54) inset,
      0px 0px 40px 0px rgba(42, 46, 241, 0.28) inset;
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
    .vncr_title {
      color: #2a2ef1;
      text-align: center;
      font-family: Montserrat;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 36px */
      text-transform: uppercase;
      text-align: center;
      margin-top: -20px;
    }
  }
  .vncr_subtitle {
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    text-align: center;
  }
  .vncr_line {
    width: 100%;
    height: 1px;
    background-color: rgba(222, 158, 215, 0.2);
    margin: 24px 0;
  }
  .vncr_num_tip {
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
  }
  .vncr_num {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0;
    img {
      width: 34px;
      height: 34px;
      cursor: pointer;
    }
    div {
      flex: 1;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(23, 25, 48, 0.56);
      color: rgba(255, 255, 255, 0.9);
      /* 14/CN-Regular */
      font-family: "PingFang SC";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }
  }
  .vncr_num_votes {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.5);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    span {
      display: inline-block;
      margin-left: 8px;
      color: #fff;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 21px */
    }
  }
  .vncr_vote_btn {
    width: 100%;
    height: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 24px;
  }
  .vncr_vote_btn_red {
    background: #d33939;
  }
  .vncr_vote_btn_blue {
    background: #2a2ef1;
  }
  .share_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: 1px solid #c166b8;
    background: #1a0014;
    box-shadow: 0px 1px 6px 0px rgba(255, 120, 219, 0.54) inset,
      0px 0px 40px 0px rgba(211, 57, 196, 0.28) inset;
    padding: 40px 27px;
    & > div {
      &:first-child {
        color: #d339c4;
        font-family: Montserrat;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 36px */
        text-transform: uppercase;
      }
      &:nth-child(2) {
        max-width: 240px;
        margin-top: 4px;
        color: rgba(255, 255, 255, 0.8);
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 21px */
      }
      &:nth-child(3) {
        width: 266px;
        height: 1px;
        background-color: rgba(222, 158, 215, 0.2);
        margin: 32px 0;
      }
      &:nth-child(4) {
        width: 240px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 21px */
        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      &:nth-child(5) {
        max-width: 240px;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.5);
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-family: Montserrat;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 18px */
        margin: 8px 0 32px;
      }
      &:last-child {
        width: 79px;
        height: 33px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 8px;
        color: #d339c4;
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
  .custom_input {
    flex: 1;
    height: 34px;
    line-height: 34px;
    background-color: rgba(23, 25, 48, 0.56); /* 背景透明 */
    border: none; /* 去除边框 */
    outline: none; /* 取消点击时的外轮廓 */
    color: #fff; /* 字体颜色（按需） */
    font-size: 14px; /* 字体大小（可调） */
    text-align: center;

    /* 去除上下箭头 - Chrome/Safari */
    -webkit-appearance: none;
    appearance: none;

    /* 去除上下箭头 - Firefox */
    -moz-appearance: textfield;
  }

  /* 去除 Chrome/Safari 的 spin buttons */
  .custom_input::-webkit-inner-spin-button,
  .custom_input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
