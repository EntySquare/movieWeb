<template>
  <div class="ai_container" v-loading="loading">
    <div class="container_head">
      <div
        class="red_back_img"
        :style="`background-image: url(${detailData.character0Image || ''});`"
      >
        <div></div>
      </div>
      <div
        class="blue_back_img"
        :style="`background-image: url(${detailData.character1Image || ''});`"
      >
        <div></div>
      </div>
      <div class="head_content">
        <div class="red_avatar">
          <img :src="detailData.character0HeadImage || ''" alt="" />
          <div class="red_avatar_name">
            <div>RED</div>
            <div>{{ detailData.character0 || "" }}</div>
          </div>
        </div>
        <img
          src="@/assets/images/ai/img24.svg"
          alt=""
          class="head_content_img"
        />
        <div class="blue_avatar">
          <div class="blue_avatar_name">
            <div>BLUE</div>
            <div>{{ detailData.character1 || "" }}</div>
          </div>
          <img :src="detailData.character1HeadImage || ''" alt="" />
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
              viewportWidth > 824
                ? 'polygon(0 0, 100% 0, calc(100% - 20px) 100%, 100% 100%, 0 100%)'
                : 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 100% 100%, 0 100%)',
          }"
        >
          <div
            class="red_white_line"
            :style="{
              clipPath:
                viewportWidth > 824
                  ? 'polygon(0 0, 100% 0, calc(100% - 15px) 100%, 100% 100%, 0 100%)'
                  : 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 100% 100%, 0 100%)',
            }"
          >
            <div
              class="rwl_content"
              :style="{
                clipPath:
                  viewportWidth > 824
                    ? 'polygon(0 0, 100% 0, calc(100% - 13px) 100%, 100% 100%, 0 100%)'
                    : 'polygon(0 0, 100% 0, calc(100% - 5px) 100%, 100% 100%, 0 100%)',
              }"
            ></div>
          </div>
        </div>
        <img
          src="@/assets/images/ai/img8.png"
          alt=""
          class="progress_bar_divider"
          :style="{
            left: `calc(${detailData.votes0Proportion}% - ${
              viewportWidth > 824 ? '25px' : '5px'
            })`,
          }"
        />
        <div
          class="progress blue"
          :style="{
            width: 'calc(' + detailData.votes1Proportion + '% + 10px)',
            clipPath:
              viewportWidth > 824
                ? 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 20px 0)'
                : 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 10px 0)',
          }"
        >
          <div
            class="blue_white_line"
            :style="{
              clipPath:
                viewportWidth > 824
                  ? 'polygon(15px 0, 100% 0, 100% 100%, 100% 100%, 0 100%)'
                  : 'polygon(6px 0, 100% 0, 100% 100%, 100% 100%, 0 100%)',
            }"
          >
            <div
              class="bwl_content"
              :style="{
                clipPath:
                  viewportWidth > 824
                    ? 'polygon(13px 0, 100% 0, 100% 100%, 100% 100%, 0 100%)'
                    : 'polygon(5px 0, 100% 0, 100% 100%, 100% 100%, 0 100%)',
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
            width: `calc(${detailData.votes1Proportion}% ${
              viewportWidth > 824 ? ' + 12px' : ' - 0px'
            })`,
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
            :style="{
              clipPath:
                viewportWidth > 824
                  ? 'polygon(0% 0%, 100% 30px, 100% calc(100% - 30px), 0% 100%)'
                  : 'polygon(0% 0%, 100% 20px, 100% calc(100% - 20px), 0% 100%)',
            }"
          />
        </div>
        <div class="container_section_btn">
          <div
            class="csb_blue_block"
            :style="{
              clipPath:
                'polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 calc(100% - 195px))',
              backgroundImage: `url('${detailData.character1Image || ''}')`,
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
              backgroundImage: `url('${detailData.character0Image || ''}')`,
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
            :style="{
              clipPath:
                viewportWidth > 824
                  ? 'polygon(0% 30px, 100% 0%, 100% 100%, 0% calc(100% - 30px))'
                  : 'polygon(0% 20px, 100% 0%, 100% 100%, 0% calc(100% - 20px))',
            }"
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
              {{ detailData.character0 || "" }} TAKES<br />THE LEAD!
            </div>
            <div
              class="red_text red_text_lead"
              v-else-if="
                detailData.votes0Proportion < detailData.votes1Proportion &&
                voteDifferenceType === 'red'
              "
            >
              {{ detailData.character0 || "" }} IS<br />BEHIND!
            </div>
            <div
              class="red_text red_text_backward"
              v-else-if="
                detailData.votes1Proportion > detailData.votes0Proportion &&
                voteDifferenceType === 'blue'
              "
            >
              {{ detailData.character1 || "" }} TAKES<br />THE LEAD!
            </div>
            <div
              class="red_text red_text_backward"
              v-else-if="
                detailData.votes1Proportion < detailData.votes0Proportion &&
                voteDifferenceType === 'blue'
              "
            >
              {{ detailData.character1 || "" }} IS<br />BEHIND!
            </div>
          </div>
          <div class="">
            Stake
            {{
              voteDifferenceType === "red"
                ? Number(detailData.votes0) - Number(detailData.votes1) > 0
                  ? 0
                  : Number(detailData.votes1) - Number(detailData.votes0)
                : Number(detailData.votes1) - Number(detailData.votes0) > 0
                ? 0
                : Number(detailData.votes0) - Number(detailData.votes1)
            }}
            votes for enhanced yield
          </div>
          <div>
            Keep voting to maintain the lead! Get 1 free vote daily, and earn
            bonus votes by inviting friends.
          </div>
          <div @click="showVoteVisible">VOTE MORE</div>
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
        <el-button
          type="primary"
          :loading="voteTicketLoading"
          @click="voteTicket(0)"
          class="vncr_vote_btn vncr_vote_btn_red"
          >VOTE</el-button
        >
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
        <el-button
          type="primary"
          :loading="voteTicketLoading"
          @click="voteTicket(1)"
          class="vncr_vote_btn vncr_vote_btn_blue"
          >VOTE</el-button
        >
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
                `https://twitter.com/intent/tweet?url=${roterLink}`
              )
            "
          />
        </div>
        <div>
          {{ `https://twitter.com/intent/tweet?url=${roterLink}` }}
        </div>
        <div @click="shareVisible = false">CLose</div>
      </div>
    </div>
    <!-- 绑定推荐关系 -->
    <div
      v-if="bindingVisible"
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
    >
      <div class="bind_content" @click.stop="">
        <div>BIND</div>
        <div>
          Are you sure to bind the following referral as a referral
          relationship?
        </div>
        <div></div>
        <div>
          {{ routeAddress }}
        </div>
        <el-button
          type="primary"
          class="bind_btn"
          :loading="bindLoading"
          @click="bindPut"
          >Confirm</el-button
        >
      </div>
    </div>
    <!-- 投票结果 -->
    <div
      v-if="voteResultVisible"
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
      @click="voteResultVisible = false"
    >
      <div class="vote_result_content" @click.stop="">
        <img src="@/assets/images/ai/img19.png" alt="" />
        <div class="vrc_title">VicTORY</div>
        <div
          class="vrc_title_name"
          v-if="
            Number(detailData.votes0Proportion) ===
            Number(detailData.votes1Proportion)
          "
        >
          Draw
        </div>
        <div class="vrc_title_name" v-else>
          {{
            Number(detailData.votes0Proportion) >
            Number(detailData.votes1Proportion)
              ? detailData.character0
              : detailData.character1
          }}
        </div>
        <div class="vrc_statistics">
          <div class="vrc_statistics_red">
            <div class="vrcsr_amount">{{ Number(detailData.votes0) || 0 }}</div>
            <div
              class="vrcsr_statistics"
              :style="`height:${
                (Number(detailData.votes0) /
                  (Number(detailData.votes0) + Number(detailData.votes1) ||
                    1)) *
                151
              }px`"
            ></div>
            <div class="vrcsr_footer">{{ detailData.character0 }}</div>
          </div>
          <div class="vrc_statistics_blue">
            <div class="vrcsr_amount">{{ Number(detailData.votes1) || 0 }}</div>
            <div
              class="vrcsr_statistics"
              :style="`height:${
                (Number(detailData.votes1) /
                  (Number(detailData.votes0) + Number(detailData.votes1) ||
                    1)) *
                151
              }px`"
            ></div>
            <div class="vrcsr_footer">{{ detailData.character1 }}</div>
          </div>
        </div>
        <div class="vrc_div">参与红方票数：{{ detailData.userVotes0 }}</div>
        <div class="vrc_div">参与蓝方票数：{{ detailData.userVotes1 }}</div>
        <div class="vrc_div">预期收益：{{ detailData.expectAmount }} USDT</div>
        <el-button
          class="vrc_close"
          :loading="expectLoading"
          @click="getExpect"
          v-if="!expectVisible"
        >
          Expected withdrawal
        </el-button>
        <el-button
          class="vrc_close"
          :loading="expectLoading"
          @click="withdrawal"
          v-else
        >
          Withdrawal
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useUsdtTokenContract } from "@/api/contract/usdtToken";
import { useMovieVoteFactoryContract } from "@/api/contract/movieVoteFactory";
import { useMovieVotePairContract } from "@/api/contract/movieVotePair";
import { useReferralContract } from "@/api/contract/referral";
import { ElNotification, ElMessage } from "element-plus";
import useWalletStore from "@/store/modules/wallet";
import Web3 from "web3";
import Decimal from "decimal.js";
import router from "@/router";
import {
  formatBalance18,
  formatBalanceBigInt18,
  addressReduce,
} from "@/utils/web3";

const loading = ref(false);
const web3 = new Web3(window.ethereum);
const walletStore = useWalletStore();
const route = useRoute();
const usdtTokenContract = useUsdtTokenContract();
const referralContract = useReferralContract();
const movieVoteFactoryContract = useMovieVoteFactoryContract();
const pair = route.query.pair || "";
const voteDifferenceVisible = ref(false);
const voteResultVisible = ref(false);
const voteVisible = ref(false);
const expectVisible = ref(false);
const shareVisible = ref(false);
const bindingVisible = ref(false);
const voteDifferenceType = ref("");
const voteTicketLoading = ref(false);
const bindLoading = ref(false);
const expectLoading = ref(false);
const detailData = ref({
  contractAddress: "",
  character0: "",
  character0Image: "",
  character1Image: "",
  character0HeadImage: "",
  character1HeadImage: "",
  votes0: "",
  userVotes0: 0,
  votes0Proportion: 50,
  character1: "",
  votes1: "",
  userVotes1: 0,
  votes1Proportion: 50,
  remainingTime: "",
  expectAmount: 0,
  countdown: 0,
});
const voteAmount = ref("0");
const voteUsdtAmount = ref("0");
const userFreeTickets = ref(0);
const balanceAmount = ref(0);
const roterLink = ref("");
const viewportWidth = ref(0);
const routeAddress = ref("");
watch(
  () => walletStore.walletAddress,
  async (newVal, oldVal) => {
    if (
      newVal != "" &&
      walletStore.walletAddress != "" &&
      route.query.address != "" &&
      route.query.address != null &&
      route.query.address != undefined
    ) {
      await walletStore.getReferralAddress(route.query.address);
      if (
        walletStore.referralAddress ===
        "0x0000000000000000000000000000000000000000"
      ) {
        bindingVisible.value = true;
      }
    }
    if (newVal === "" || walletStore.walletAddress === "") {
      walletStore.clearReferralAddress();
      bindingVisible.value = false;
    }
  }
);

onMounted(async () => {
  viewportWidth.value = window.innerWidth;
  window.addEventListener("resize", () => {
    viewportWidth.value = window.innerWidth;
  });
  routeAddress.value = route.query.address || "";
  loading.value = true;
  if (
    walletStore.walletAddress != "" &&
    routeAddress.value != "" &&
    routeAddress.value != null &&
    routeAddress.value != undefined
  ) {
    walletStore.getReferralAddress(routeAddress.value);
    if (
      walletStore.referralAddress ===
      "0x0000000000000000000000000000000000000000"
    ) {
      bindingVisible.value = true;
    }
  }
  try {
    await getDetailState();
    await getDetail();
    setInterval(async () => {
      if (Number(detailData.value.countdown) === 0) {
        for (let i = 1; i < 9999; i++) {
          detailData.value.countdown = 0;
          detailData.value.remainingTime = "Ended";
          clearInterval(i);
        }
        voteResultVisible.value = true;
        expectVisible.value = false;
        if (walletStore.walletAddress === "") {
          detailData.value.userVotes0 = 0;
          detailData.value.userVotes1 = 0;
        } else {
          const movieVotePairContract = useMovieVotePairContract(pair);
          const userVotes0 = await movieVotePairContract.getVotesMap0(
            walletStore.walletAddress
          );
          const userVotes1 = await movieVotePairContract.getVotesMap1(
            walletStore.walletAddress
          );
          detailData.value.userVotes0 = Number(userVotes0) || 0;
          detailData.value.userVotes1 = Number(userVotes1) || 0;
        }
        return;
      }
      voteResultVisible.value = false;
      detailData.value.countdown -= 1;
      detailData.value.remainingTime = formatTimestampToTimeString(
        detailData.value.countdown
      );
    }, 1000);
  } catch (error) {}
});

const getExpect = async () => {
  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: "请先连接钱包",
      duration: 1000,
    });
    return;
  }
  try {
    expectLoading.value = true;
    const movieVotePairContract = useMovieVotePairContract(pair);
    const expectList = await movieVotePairContract.getExpectClaimReward(
      walletStore.walletAddress
    );
    detailData.value.expectAmount = formatBalance18(Number(expectList[1])) || 0;
    expectVisible.value = true;
  } catch (error) {
    expectVisible.value = false;
    detailData.value.expectAmount = 0;
    ElMessage({
      showClose: true,
      message: error.reason || "",
      type: "error",
    });
  } finally {
    expectLoading.value = false;
  }
};

const withdrawal = async () => {
  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: "请先连接钱包",
      duration: 1000,
    });
    return;
  }
  try {
    expectLoading.value = true;
    const movieVotePairContract = useMovieVotePairContract(pair);
    await movieVotePairContract.claimReward();
    ElMessage({
      showClose: true,
      message: "Withdrawal successful",
      type: "success",
    });
    detailData.value.expectAmount = 0;
  } catch (error) {
    detailData.value.expectAmount = 0;
    ElMessage({
      showClose: true,
      message: error.reason || "",
      type: "error",
    });
  } finally {
    expectLoading.value = false;
  }
};

const bindPut = async () => {
  try {
    bindLoading.value = true;
    await referralContract.setReferrer(routeAddress.value);
    walletStore.setReferralAddress(routeAddress.value);
    ElMessage({
      showClose: true,
      message: "Bind Success",
      type: "success",
    });
    bindingVisible.value = false;
  } catch (error) {
    ElMessage({
      showClose: true,
      message: error.reason || "Bind Error",
      type: "error",
    });
  } finally {
    bindLoading.value = false;
  }
};

const getDetailState = async () => {
  try {
    const countDown = Math.floor(new Date().getTime() / 1000);
    const movieVotePairContract = useMovieVotePairContract(pair);
    const baseInfo = await movieVotePairContract.getBaseInfo();
    detailData.value.contractAddress = pair;
    detailData.value.character0 = baseInfo[0];
    detailData.value.character0Image = `https://movieai.oss-cn-hongkong.aliyuncs.com/png/movieai${pair}_image0.png`;
    detailData.value.character1Image = `https://movieai.oss-cn-hongkong.aliyuncs.com/png/movieai${pair}_image1.png`;
    detailData.value.character0HeadImage = `https://movieai.oss-cn-hongkong.aliyuncs.com/png/movieai${pair}_image2.png`;
    detailData.value.character1HeadImage = `https://movieai.oss-cn-hongkong.aliyuncs.com/png/movieai${pair}_image3.png`;
    detailData.value.character1 = baseInfo[1];
    detailData.value.countdown =
      Number(baseInfo[7]) - countDown > 0 ? Number(baseInfo[7]) - countDown : 0;
    detailData.value.remainingTime = formatTimestampToTimeString(
      detailData.value.countdown
    );
  } catch (error) {
    ElMessage({
      showClose: true,
      message: error.reason || "",
      type: "error",
    });
    throw new Error("获取数据错误");
  } finally {
    loading.value = false;
  }
};

const getDetail = async () => {
  try {
    const movieVotePairContract = useMovieVotePairContract(pair);
    const votes0 = await movieVotePairContract.getVotes0();
    const votes1 = await movieVotePairContract.getVotes1();
    const votes0Proportion =
      Number(votes0) / (Number(votes0) + Number(votes1) || 1);
    detailData.value.votes0 = Number(votes0);
    detailData.value.votes0Proportion =
      Number(votes0) === Number(votes1)
        ? 50
        : (votes0Proportion * 100).toFixed(0);
    detailData.value.votes1 = Number(votes1);
    detailData.value.votes1Proportion =
      Number(votes0) === Number(votes1)
        ? 50
        : 100 - detailData.value.votes0Proportion;
    if (Number(detailData.value.countdown) === 0) {
      voteResultVisible.value = true;
      expectVisible.value = false;
      if (walletStore.walletAddress === "") {
        detailData.value.userVotes0 = 0;
        detailData.value.userVotes1 = 0;
      } else {
        const userVotes0 = await movieVotePairContract.getVotesMap0(
          walletStore.walletAddress
        );
        const userVotes1 = await movieVotePairContract.getVotesMap1(
          walletStore.walletAddress
        );
        detailData.value.userVotes0 = Number(userVotes0) || 0;
        detailData.value.userVotes1 = Number(userVotes1) || 0;
      }
    }
    setTimeout(async () => {
      await getDetail();
    }, 3000);
  } catch (error) {
    console.log("error", error);
    ElMessage({
      showClose: true,
      message: error.reason || "",
      type: "error",
    });
    throw new Error("获取数据错误");
  } finally {
    loading.value = false;
  }
};

const formatTimestampToTimeString = (time) => {
  const day = Math.floor(time / 60 / 60 / 24);
  const hours = Math.floor((time / 60 / 60) % 24);
  const minute = Math.floor((time / 60) % 60);
  const second = Math.floor(time % 60);
  return day + "days " + hours + "h " + minute + "min " + second + "sec";
};

const showShareVisible = async () => {
  if (Number(detailData.value.countdown) === 0) {
    ElMessage({
      showClose: true,
      message: "Voting has ended",
      type: "error",
    });
    return;
  }
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
    roterLink.value =
      window.location.href + `&address=${walletStore.walletAddress}`;
    shareVisible.value = true;
  } catch (error) {}
};
const showVoteDifference = async (type) => {
  if (Number(detailData.value.countdown) === 0) {
    ElMessage({
      showClose: true,
      message: "Voting has ended",
      type: "error",
    });
    return;
  }
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
    if (Number(detailData.value.votes0) === Number(detailData.value.votes1)) {
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

//查询usdt的授权额度
const usdtAuthorizationAmount = async () => {
  try {
    const amount = await usdtTokenContract.getAllowance(
      walletStore.walletAddress,
      pair
    );

    //没有授权额度去授权
    if (BigInt(amount) < BigInt(formatBalanceBigInt18(voteUsdtAmount.value))) {
      await usdtTokenContract.approve(
        pair,
        formatBalanceBigInt18(voteUsdtAmount.value)
      );
      await usdtAuthorizationAmount();
    }
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

const voteTicket = async (type) => {
  if (Number(detailData.value.countdown) === 0) {
    ElMessage({
      showClose: true,
      message: "Voting has ended",
      type: "error",
    });
    return;
  }
  if (Number(voteAmount.value) > Number(userFreeTickets.value)) {
    ElMessage({
      showClose: true,
      message: "免费票不足",
      type: "error",
    });
    return;
  }

  if (Number(voteUsdtAmount.value) === 0) {
    ElMessage({
      showClose: true,
      message: "请输入USDT数量",
      type: "error",
    });
    return;
  }
  if (Number(voteUsdtAmount.value) > Number(balanceAmount.value)) {
    ElMessage({
      showClose: true,
      message: "余额不足",
      type: "error",
    });
    return;
  }
  if (voteTicketLoading.value) {
    return;
  }
  try {
    voteTicketLoading.value = true;
    await usdtAuthorizationAmount();
    const movieVotePairContract = useMovieVotePairContract(pair);
    await movieVotePairContract.voteWithUSDT(
      type,
      Number(voteUsdtAmount.value)
    );
    if (Number(voteAmount.value) > 0) {
      await movieVotePairContract.voteWithFreeTicket(
        type,
        Number(voteAmount.value)
      );
    }
    voteVisible.value = false;
    ElMessage({
      showClose: true,
      message: "Vote Success",
      type: "success",
    });
  } catch (error) {
    ElMessage({
      showClose: true,
      message: error.reason || "",
      type: "error",
    });
    console.error("error", error);
  } finally {
    voteTicketLoading.value = false;
  }
};

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
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      div {
        width: 100%;
        height: 100%;
        background-color: #000000c7;
      }
    }
    .blue_back_img {
      width: 50%;
      height: 328px;
      position: absolute;
      top: 0;
      right: 0;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      div {
        width: 100%;
        height: 100%;
        background-color: #000000c7;
      }
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
          background-color: #fd8080;
          padding-left: 2px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          box-sizing: border-box;
          .rwl_content {
            width: calc(100% - 4px);
            height: 32px;
            background: linear-gradient(to right, #3a0b0b 0%, #c2494f 100%);
          }
        }
        .blue_white_line {
          width: calc(100% - 10px);
          height: 36px;
          background-color: #8189fe;
          padding-right: 2px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          box-sizing: border-box;
          .bwl_content {
            width: calc(100% - 4px);
            height: 32px;
            background: linear-gradient(90deg, #5861e5 0%, #181375 100%);
          }
        }
      }

      .red {
        background: linear-gradient(to right, #760c11 0%, #7f0852 100%);
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-left: 6px;
      }

      .blue {
        background: linear-gradient(to right, #2631a8 0%, #192ccf 100%);
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
          height: 600px;
          position: absolute;
          top: 5px;
          right: -35px;
          transform: rotateY(35deg);
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
            background-color: #000000a4;
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
          // background: url("@/assets/images/ai/img1.png") no-repeat;
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
            background-color: #000000a4;
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
          height: 600px;
          position: absolute;
          top: 5px;
          left: -35px;
          transform: rotateY(-35deg);
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
      right: -40px;
      transform: rotateY(35deg);
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
      left: -40px;
      transform: rotateY(-35deg);
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
    border: none !important;
  }
  .vncr_vote_btn_red {
    background: #d33939;
  }
  .vncr_vote_btn_blue {
    background: #2a2ef1;
  }
  .bind_btn {
    margin-top: 20px;
    color: #d339c4;
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
    background-color: rgba(255, 255, 255, 1);
    border: none;
  }
  .bind_content {
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
        word-break: break-all;
        white-space: normal;
        overflow-wrap: break-word;
      }
      &:last-child {
        padding: 8px 16px;
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
        margin-top: 32px;
      }
    }
  }
  .vote_result_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: 1px solid #c166b8;
    background: #1a0014;
    box-shadow: 0px 1px 6px 0px rgba(255, 120, 219, 0.54) inset,
      0px 0px 40px 0px rgba(211, 57, 196, 0.28) inset;
    padding: 40px;
    position: relative;
    img {
      width: 240px;
      min-height: 240px;
      max-height: 240px;
      position: absolute;
      top: -184px;
      left: 84px;
    }
    .vrc_title {
      min-width: 329px;
      max-width: 329px;
      color: #fff;
      text-align: center;
      font-family: Montserrat;
      font-size: 48px;
      font-style: normal;
      font-weight: 900;
      line-height: 150%; /* 72px */
      text-transform: uppercase;
    }
    .vrc_title_name {
      color: #fff;
      text-align: center;
      font-family: Montserrat;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 36px */
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    .vrc_statistics {
      width: 329px;
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
      .vrc_statistics_red {
        width: calc(100% / 3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        .vrcsr_amount {
          color: #fff;
          text-align: center;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 100%; /* 14px */
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .vrcsr_statistics {
          width: 34px;
          height: 151px;
          gap: 12px;
          flex-shrink: 0;
          background: #ff3503;
          box-shadow: 0 0 11.293px 0 #d33939;
        }
        .vrcsr_footer {
          width: 100%;
          height: 30px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          color: #ff3503;
          text-align: center;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 150%; /* 21px */
          text-transform: uppercase;
          border-top: 1px solid #3f1e16;
        }
      }
      .vrc_statistics_blue {
        width: calc(100% / 3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        .vrcsr_amount {
          color: #fff;
          text-align: center;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 100%; /* 14px */
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .vrcsr_statistics {
          width: 34px;
          height: 151px;
          gap: 12px;
          flex-shrink: 0;
          background: #2a2ef1;
          box-shadow: 0 0 11.293px 0 #2a2ef1;
        }
        .vrcsr_footer {
          width: 100%;
          height: 30px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          color: #2a2ef1;
          text-align: center;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 150%; /* 21px */
          text-transform: uppercase;
          border-top: 1px solid #3f1e16;
        }
      }
    }
    .vrc_div {
      width: 100%;
      display: flex;
      align-items: center;
      color: #fff;
      text-align: center;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 21px */
      text-transform: uppercase;
      padding-bottom: 15px;
    }
    .vrc_close {
      display: flex;
      padding: 8px 14px 8px 16px;
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
        margin-top: 8px;
      }
      &:last-child {
        padding: 8px 16px;
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
        margin-top: 32px;
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
}
@media (max-width: 824px) {
  .ai_container {
    .container_head {
      max-width: 100% !important;
      padding: 0 16px !important;
      .head_content {
        .red_avatar {
          gap: 7px !important;
          img {
            width: 36.5px !important;
            height: 36.5px !important;
            border-radius: 8px !important;
          }
          .red_avatar_name {
            gap: 4px !important;
            div {
              &:first-child {
                font-size: 14px !important;
              }
              &:last-child {
                font-size: 13px !important;
              }
            }
          }
        }
        .head_content_img {
          width: 100px !important;
        }
        .blue_avatar {
          gap: 7px !important;
          img {
            width: 36.5px !important;
            height: 36.5px !important;
            border-radius: 8px !important;
          }
          .blue_avatar_name {
            gap: 4px !important;
            div {
              &:first-child {
                font-size: 14px !important;
              }
              &:last-child {
                font-size: 13px !important;
              }
            }
          }
        }
      }
      .progress_container {
        max-width: 100% !important;
        height: 35px !important;
        top: 10px !important;
        .red_line {
          height: 1px;
          top: 6px !important;
        }
        .progress_container_topline {
          top: 8px !important;
        }
        .progress {
          height: 15px !important;
          top: 10px !important;
          .red_white_line {
            width: calc(100% - 6px);
            height: 10px !important;
            background-color: rgba(255, 255, 255, 0.49);
            padding-left: 2px;
            .rwl_content {
              width: calc(100% - 3px);
              height: 8px !important;
            }
          }
          .blue_white_line {
            width: calc(100% - 16px);
            height: 10px !important;
            padding-right: 2px;
            .bwl_content {
              width: calc(100% - 3px);
              height: 8px !important;
            }
          }
        }

        .red {
          padding-left: 2px !important;
        }

        .blue {
          padding-right: 2px !important;
        }
        .progress_bar_divider {
          width: 20px !important;
          height: 40px !important;
          position: absolute;
          top: 0;
          z-index: 10;
          transition: 1s;
        }
        .progress_container_bottomline {
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: 9px;
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
          bottom: 6px;
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
        top: 10px;
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
        top: -100px;
        .container_section_red {
          flex: 1;
          height: 290px;
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
          display: none;
        }
        .container_section_blue {
          flex: 1;
          height: 290px;
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
      border: none !important;
    }
    .vncr_vote_btn_red {
      background: #d33939;
    }
    .vncr_vote_btn_blue {
      background: #2a2ef1;
    }
    .bind_btn {
      margin-top: 20px;
      color: #d339c4;
      text-align: center;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: uppercase;
      background-color: rgba(255, 255, 255, 1);
      border: none;
    }
    .bind_content {
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
          word-break: break-all;
          white-space: normal;
          overflow-wrap: break-word;
        }
        &:last-child {
          padding: 8px 16px;
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
          margin-top: 32px;
        }
      }
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
          margin-top: 8px;
        }
        &:last-child {
          padding: 8px 16px;
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
          margin-top: 32px;
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
  }
}
.custom_input::-webkit-inner-spin-button,
.custom_input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
:deep(.el-loading-mask) {
  background: #000000c7;
}
:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}
</style>
