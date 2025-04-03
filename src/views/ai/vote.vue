<template>
  <div class="vote-container">
    <div
      class="container"
      v-loading="loading"
      style="display: flex; flex-direction: column; gap: 100px"
      v-if="List.length > 0"
    >
      <div v-for="(item, index) in List" :key="index">
        <div style="display: flex; flex-direction: column; align-items: center">
          <h1 style="color: #d339c4; margin-bottom: 40px">
            {{ item.title }} {{ t("ai.ai27") }}
          </h1>
          <h4 style="color: #fff; margin-bottom: 10px">
            {{ t("ai.ai28") }} {{ item.startAt }}
          </h4>
          <h4 style="color: #fff; margin-bottom: 60px">
            {{ t("ai.ai29") }} {{ item.endAt }}
          </h4>
        </div>

        <div class="vote-container">
          <!-- PK进度条 -->
          <SuperPkBar
            :left-votes="getLeftVotes(item.poolId)"
            :right-votes="getRightVotes(item.poolId)"
            :left-name="item.roleOne"
            :right-name="item.roleTwo"
            :all="item"
          />

          <!-- 投票按钮组 -->
        </div>
        <div class="vote-box" v-if="item.status === 1">
          <div class="shop">
            <div class="avatar"></div>
            <div class="role">{{ t("ai.ai30") }} : {{ item.roleOne }}</div>
            <el-input
              :disabled="item.status !== 1"
              v-model.number="voteAmountLeft"
              :placeholder="t('ai.ai31')"
              type="number"
              min="1"
            />
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                width: 100%;
              "
            >
              <!-- 状态 0-下架 1-进行中 2-结束 3-奖励已发放 -->
              <div
                class="vote-button left-team"
                @click="vote(true, item.poolId)"
                :class="{ disabled: item.status !== 1 }"
              >
                <span>{{ t("ai.ai32") }}{{ item.roleOne }}</span>
              </div>

              <div
                class="participate"
                :class="{ disabled: item.status !== 1 }"
                @click="shareOnTwitter(item.roleOne, true, item.poolId)"
              >
                <svg
                  t="1742884235460"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2873"
                  width="14"
                  height="14"
                >
                  <path
                    d="M922.026667 439.04l-267.221334-282.368v185.258667h-85.333333c-250.325333 0-455.253333 181.504-481.322667 413.44 115.157333-133.674667 291.925333-218.922667 480.682667-218.922667h85.077333l0.554667 185.173333 267.52-282.581333z m-438.528 189.44C268.8 662.570667 87.04 821.76 47.232 1024A529.664 529.664 0 0 1 0 805.461333C0 502.272 254.976 256.597333 569.472 256.597333V40.96a35.242667 35.242667 0 0 1 10.368-30.208 39.68 39.68 0 0 1 54.4 0l378.794667 400.298667a35.413333 35.413333 0 0 1 10.88 27.861333 35.498667 35.498667 0 0 1-10.88 27.904l-376.704 398.08a37.973333 37.973333 0 0 1-56.448 2.133333 35.114667 35.114667 0 0 1-10.410667-30.208l-0.64-215.082666c-26.88 0-53.546667 2.005333-79.701333 5.845333l-5.632 0.853333z"
                    p-id="2874"
                  ></path>
                </svg>
              </div>
            </div>
            <div style="width: 100%; text-align: end">
              <span
                style="
                  color: #d339c4;
                  font-size: 14px;
                  font-weight: 600;
                  margin-right: 20px;
                "
                >{{ t("ai.ai33") }} : {{ item.sharesOne }}</span
              >
            </div>
          </div>
          <span class="vs"
            ><svg
              t="1743151591526"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="41379"
              width="100"
              height="100"
            >
              <path
                d="M896 332.8c0 38.4-6.4 70.4-25.6 96-6.4 12.8-19.2 19.2-32 25.6-12.8 6.4-32 6.4-44.8-6.4-6.4-6.4-19.2-12.8-25.6-25.6-19.2-12.8-38.4-25.6-57.6-32-6.4 0-6.4-6.4-12.8 0-6.4 0-12.8 0-19.2 6.4l-6.4 6.4c0 6.4 0 6.4-6.4 6.4-12.8 6.4-19.2 12.8-32 19.2-19.2 19.2-25.6 38.4-25.6 70.4 6.4 12.8 12.8 25.6 32 32 6.4 0 12.8 6.4 12.8 6.4 25.6 0 44.8 6.4 70.4 6.4h32c38.4 0 76.8 12.8 102.4 44.8 12.8 12.8 19.2 25.6 19.2 44.8 0 6.4 0 12.8-6.4 19.2V672c-6.4 0-6.4 6.4-6.4 6.4-6.4 6.4-12.8 19.2-19.2 25.6l-6.4 6.4c-12.8 19.2-38.4 32-57.6 44.8-6.4 6.4-12.8 6.4-19.2 12.8h-12.8-6.4c-12.8 6.4-25.6 12.8-32 25.6-6.4 0-6.4 6.4-6.4 6.4-6.4 6.4-12.8 12.8-19.2 12.8h-6.4l25.6-6.4h-6.4c-25.6 12.8-51.2 32-76.8 44.8-12.8 6.4-32 19.2-44.8 25.6-6.4 0-6.4 6.4-12.8 6.4-6.4 6.4-19.2 12.8-32 12.8-19.2 0-32 6.4-51.2 6.4h-12.8l6.4-6.4c19.2 6.4 25.6 0 38.4-6.4 6.4-6.4 19.2-6.4 25.6-12.8l6.4-6.4h-12.8c-12.8 6.4-19.2 12.8-32 12.8-6.4 6.4-19.2 6.4-25.6 12.8-12.8 0-19.2 6.4-25.6 6.4-6.4 6.4-12.8 6.4-25.6 6.4s-25.6 6.4-38.4 12.8c-6.4 6.4-19.2 6.4-25.6 12.8l19.2-12.8c-12.8 0-19.2 0-32 6.4-32 12.8-64 32-96 44.8-12.8 6.4-32 19.2-44.8 25.6-6.4 6.4-12.8 12.8-19.2 12.8H166.4c-6.4 0-19.2 6.4-25.6 6.4H128c6.4-6.4 12.8-12.8 25.6-19.2 12.8-6.4 32-12.8 44.8-19.2 6.4 0 6.4-6.4 6.4-6.4-12.8 0-19.2 6.4-32 12.8 6.4-6.4 19.2-12.8 32-19.2 12.8-6.4 25.6-6.4 38.4-12.8 12.8-6.4 25.6-12.8 38.4-12.8-6.4 0-6.4 6.4-12.8 6.4s-12.8 6.4-12.8 6.4h-6.4c-6.4 0 0 0 0 6.4 6.4 0 19.2 0 25.6-6.4 6.4 0 12.8-6.4 19.2-12.8 6.4-6.4 6.4-6.4 12.8-6.4 0 0 6.4 0 0-6.4v-6.4s6.4 0 6.4-6.4c12.8-6.4 19.2-12.8 32-12.8 6.4 0 12.8-6.4 12.8 0h6.4c6.4 0 12.8 0 19.2-6.4 6.4-6.4 19.2-6.4 25.6-12.8 6.4 0 6.4-6.4 12.8-6.4l6.4-6.4h-12.8c-6.4 0-19.2 6.4-25.6 12.8-6.4 6.4-12.8 6.4-25.6 12.8h6.4-19.2c6.4-6.4 19.2-6.4 25.6-12.8 6.4-6.4 12.8-6.4 19.2-12.8l19.2-19.2 6.4-6.4c12.8 0 19.2 0 25.6-6.4l6.4-6.4c-6.4 0-19.2 0-25.6 6.4-19.2 6.4-32 6.4-44.8 19.2-6.4 6.4-12.8 6.4-12.8 12.8h-6.4c-6.4 0-6.4 0-6.4 6.4h-6.4c-25.6 6.4-51.2 19.2-76.8 25.6h-6.4c19.2-19.2 44.8-32 64-51.2 6.4-6.4 6.4-6.4 19.2-6.4h19.2c19.2 0 32 0 51.2-6.4 6.4-6.4 12.8-6.4 19.2-6.4 12.8 0 19.2-6.4 25.6-19.2v-6.4h-6.4c6.4-6.4 12.8-6.4 19.2-12.8 6.4 0 6.4-6.4 12.8-6.4 25.6-25.6 51.2-44.8 83.2-57.6 6.4-6.4 19.2-6.4 25.6-12.8 6.4 0 6.4-6.4 12.8-6.4l38.4-19.2c19.2-12.8 44.8-25.6 64-38.4 12.8-12.8 25.6-19.2 32-32 6.4-6.4 0-12.8-6.4-12.8-6.4-6.4-12.8-6.4-12.8-12.8-6.4-6.4-19.2-6.4-25.6-6.4-32-12.8-57.6-12.8-83.2-12.8-19.2 0-32 0-51.2-6.4-12.8-6.4-25.6-12.8-32-25.6l-6.4-6.4c-6.4-6.4-12.8-19.2-12.8-25.6-6.4-12.8-6.4-25.6 0-38.4 0-32 19.2-64 38.4-89.6l38.4-38.4c19.2-12.8 32-19.2 44.8-25.6 12.8-6.4 32-12.8 51.2-19.2 19.2-6.4 38.4-6.4 57.6 0 6.4 0 12.8 0 25.6 6.4h32c12.8-6.4 25.6-6.4 38.4-12.8 6.4-6.4 12.8-6.4 19.2-12.8v6.4l25.6-19.2c0 6.4 6.4 6.4 6.4 12.8v51.2z"
                fill="#3E91FB"
                p-id="41380"
              ></path>
              <path
                d="M659.2 25.6s0 6.4 0 0c0 12.8-6.4 25.6-12.8 32-6.4 19.2-12.8 32-19.2 44.8l25.6-32c0 6.4 0 19.2-6.4 25.6-6.4 6.4-6.4 12.8-12.8 19.2v6.4c0 6.4 0 12.8-6.4 19.2v6.4l6.4-6.4c6.4 0 6.4-6.4 12.8-12.8 0 0 6.4 0 6.4-6.4h6.4v19.2c-6.4 6.4-12.8 19.2-12.8 25.6 0 6.4-6.4 6.4-6.4 6.4 0 6.4-6.4 12.8-6.4 19.2-12.8 25.6-25.6 44.8-38.4 64-25.6 38.4-44.8 76.8-64 121.6-19.2 57.6-38.4 115.2-57.6 179.2-6.4 25.6-6.4 51.2-12.8 83.2v57.6c0 12.8-12.8 19.2-25.6 19.2h-32c0-12.8-6.4-19.2-12.8-25.6-6.4-6.4-19.2-12.8-25.6-19.2-12.8-6.4-12.8-19.2-12.8-32v-19.2c0-12.8 0-25.6-6.4-38.4l-19.2-64 12.8 32v-12.8c0-25.6-6.4-44.8-12.8-64-6.4-19.2-19.2-38.4-32-57.6 0-6.4-6.4-12.8-6.4-19.2v12.8c0-6.4-6.4-12.8-6.4-12.8-6.4-25.6-19.2-51.2-25.6-70.4 0-6.4-6.4-12.8-12.8-19.2v-12.8c-6.4 0-12.8-6.4-12.8-6.4 0-6.4-6.4-6.4-12.8-6.4 0-6.4 0-19.2-6.4-25.6v-12.8c6.4-6.4 6.4-12.8 6.4-25.6v-6.4c0-6.4 0-6.4 6.4-6.4s6.4-6.4 6.4-12.8 0-6.4 6.4-12.8l6.4-6.4v-12.8c6.4 0 6.4 0 12.8 6.4s19.2 0 25.6-6.4c6.4-6.4 6.4-6.4 12.8 0s12.8 6.4 19.2 0c6.4 0 6.4 0 6.4 6.4v6.4h6.4c0 6.4 6.4 12.8 6.4 12.8 6.4 6.4 12.8 19.2 12.8 32 0 19.2 6.4 32 6.4 51.2 6.4 32 19.2 64 25.6 96 6.4 32 19.2 64 25.6 96v6.4l6.4-6.4c19.2-51.2 38.4-96 51.2-140.8 19.2-44.8 32-89.6 51.2-134.4 6.4-12.8 12.8-32 25.6-44.8 6.4-6.4 12.8-6.4 12.8-12.8v6.4l38.4-38.4v25.6l6.4-6.4c12.8-12.8 25.6-32 32-44.8 12.8-19.2 19.2-38.4 32-57.6l12.8-12.8v6.4c-6.4 6.4-6.4 12.8-12.8 19.2z"
                fill="#FF0F50"
                p-id="41381"
              ></path>
            </svg>
          </span>
          <div class="shop">
            <div class="avatar"></div>
            <div class="role">{{ t("ai.ai34") }} : {{ item.roleTwo }}</div>

            <el-input
              :disabled="item.status !== 1"
              v-model.number="voteAmountRight"
              :placeholder="t('ai.ai31')"
              type="number"
              min="1"
            />

            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                width: 100%;
              "
            >
              <div
                class="vote-button right-team"
                @click="vote(false, item.poolId)"
                :class="{ disabled: item.status !== 1 }"
              >
                <span>{{ t("ai.ai32") }}{{ item.roleTwo }}</span>
              </div>
              <div
                class="participate"
                :class="{ disabled: item.status !== 1 }"
                @click="shareOnTwitter(item.roleTwo, false, item.poolId)"
              >
                <svg
                  t="1742884235460"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2873"
                  width="14"
                  height="14"
                >
                  <path
                    d="M922.026667 439.04l-267.221334-282.368v185.258667h-85.333333c-250.325333 0-455.253333 181.504-481.322667 413.44 115.157333-133.674667 291.925333-218.922667 480.682667-218.922667h85.077333l0.554667 185.173333 267.52-282.581333z m-438.528 189.44C268.8 662.570667 87.04 821.76 47.232 1024A529.664 529.664 0 0 1 0 805.461333C0 502.272 254.976 256.597333 569.472 256.597333V40.96a35.242667 35.242667 0 0 1 10.368-30.208 39.68 39.68 0 0 1 54.4 0l378.794667 400.298667a35.413333 35.413333 0 0 1 10.88 27.861333 35.498667 35.498667 0 0 1-10.88 27.904l-376.704 398.08a37.973333 37.973333 0 0 1-56.448 2.133333 35.114667 35.114667 0 0 1-10.410667-30.208l-0.64-215.082666c-26.88 0-53.546667 2.005333-79.701333 5.845333l-5.632 0.853333z"
                    p-id="2874"
                  ></path>
                </svg>
              </div>
            </div>
            <div style="width: 100%; text-align: end">
              <span
                style="
                  color: #d339c4;
                  font-size: 14px;
                  font-weight: 600;
                  margin-right: 20px;
                "
                >{{ t("ai.ai33") }} : {{ item.sharesTwo }}</span
              >
            </div>
          </div>
        </div>
        <!-- winner 0 表示还不知道，1 表示 a 赢，2 表示b 赢 -->

        <div v-if="item.status === 2">
          <div class="victory">
            <div class="victoryTitle">
              {{ t("ai.ai35")
              }}{{
                item.winner === 0
                  ? t("ai.ai36")
                  : item.winner === 1
                  ? item.roleOne
                  : item.roleTwo
              }}
              {{ t("ai.ai37") }}
            </div>
            <div class="victoryBox">
              <div class="victoryBoxIcon">
                <svg
                  t="1743497012494"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2949"
                  width="44"
                  height="44"
                >
                  <path
                    d="M609.630574 116.018364c-34.014698 34.014698-33.994232 89.153506 0 123.146714 8.620331 8.620331 18.600637 14.988366 29.247115 19.262716l-49.771567 124.409474-203.982788-58.269101c8.337899-29.416983 1.344624-62.271252-21.787212-85.402066-33.994232-33.994232-89.13304-34.014698-123.146714 0s-33.994232 89.153506 0 123.146715c23.130813 23.130813 55.986105 30.125111 85.403088 21.787212l58.269102 203.982788-124.409475 49.771567c-4.27435-10.647501-10.642384-20.626783-19.262715-29.247115-33.994232-33.994232-89.13304-34.014698-123.146715 0-34.014698 34.014698-33.994232 89.153506 0 123.146715s89.13304 34.014698 123.146715 0c4.771677-4.771677 8.66638-10.031471 12.145621-15.511276l254.673283 159.183466 41.048905 41.048905c22.689768 22.689768 59.428507 22.669302 82.09781 0L917.498384 629.131721c22.669302-22.669302 22.689768-59.408041 0-82.09781l-41.048905-41.048905-159.162999-254.694773c5.490038-3.406586 10.719132-7.352455 15.490809-12.125155 34.014698-34.014698 33.994232-89.153506 0-123.146714s-89.13304-34.014698-123.146715 0zM281.237289 280.213983c11.323906-11.32493 29.745465-11.30344 41.048905 0 11.30344 11.30344 11.323906 29.724998 0 41.048905s-29.745465 11.30344-41.048905 0c-11.30344-11.30344-11.323906-29.723975 0-41.048905zM158.090575 690.705078c-11.30344-11.30344-11.323906-29.724998 0-41.048905 11.323906-11.32493 29.745465-11.30344 41.048904 0 11.30344 11.30344 11.323906 29.724998 0 41.048905-11.323906 11.323906-29.745465 11.30344-41.048904 0z m718.358904-102.622262L589.106122 875.426173l-41.048905-41.048905L835.400574 547.033911l41.048905 41.048905z m-73.718978-90.477664L498.628458 801.707195 306.395272 681.58742l99.015108-39.607067c7.491625-3.006474 14.06432-7.414877 19.47761-12.828166 14.510482-14.510482 20.765953-36.159548 14.772448-57.022715l-53.353138-186.845479 186.845478 53.353139c20.863167 5.993504 42.511209-0.261966 57.022715-14.772448 5.41329-5.41329 9.82067-11.985986 12.828167-19.47761l39.607066-99.015108 120.119775 192.233186zM691.728384 198.116173c-11.32493 11.323906-29.745465 11.30344-41.048905 0-11.30344-11.30344-11.32493-29.724998 0-41.048905 11.323906-11.32493 29.745465-11.30344 41.048905 0s11.323906 29.724998 0 41.048905z"
                    fill="#d81e06"
                    p-id="2950"
                  ></path>
                </svg>
              </div>
              <div class="victoryAvatar"></div>
              <div class="victoryRole">
                {{ t("ai.ai35") }}:
                <span style="color: #ff0000; font-weight: 500">
                  {{
                    item.winner === 0
                      ? t("ai.ai36")
                      : item.winner === 1
                      ? item.roleOne
                      : item.roleTwo
                  }}</span
                >
              </div>
              <div class="victoryVotes">
                {{ t("ai.ai38") }}:
                <span style="color: #ff0000; font-weight: 500">
                  {{
                    item.winner === 0
                      ? t("ai.ai36")
                      : item.winner === 1
                      ? item.numberOne
                      : item.numberTwo
                  }}</span
                >
              </div>
              <!-- <div class="victoryBtn">Claim Rewards</div> -->
              <div
                class="victoryBtn"
                v-if="isPickUp"
                @click="claimReward(item)"
              >
                {{ t("ai.ai39") }}
              </div>
              <div class="victoryBtn_d" v-else>{{ t("ai.ai40") }}</div>
            </div>
          </div>
        </div>

        <!-- <div class="settlement">
          <div
            class="settlementshop"
            :class="Victory ? 'ZoomIn' : 'Downsizing'"
          >
            <div class="settlementavatar"></div>
            <div class="role">角色A : {{ item.roleOne }}</div>
          </div>

          <div
            class="settlementshop"
            :class="!Victory ? 'ZoomIn' : 'Downsizing'"
          >
            <div class="settlementavatar"></div>
            <div class="role">角色B : {{ item.roleTwo }}</div>
          </div>
        </div> -->
      </div>
    </div>
    <div
      v-else
      style="
        text-align: center;
        color: #e621ca;
        font-family: Rubik;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
      "
    >
      {{ t("ai.ai41") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import {
  displayWahlPool,
  distributeBonus,
  judgeBonus,
  voteWahlPool,
} from "@/api/ai";
//类型
type Pool = {
  poolId: number;
  title: string;
  roleOne: string;
  roleTwo: string;
  startAt: string;
  endAt: string;
  status: number;
  numberOne: number;
  numberTwo: number;
  sharesOne: number;
  sharesTwo: number;
  winner: number;
};

import Web3 from "web3";
import contractABI from "@/abi.json";
import useWalletStore from "@/store/modules/wallet";
const List = ref<Pool[]>([]);

import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface PoolT {
  nameA: string;
  nameB: string;
  endTime: bigint;
  totalA: bigint;
  totalB: bigint;
  amountA: bigint;
  amountB: bigint;
  settled: boolean;
  winner: boolean;
}

// **合约信息**
const contractAddress = "0xcFB915BA26D2248e90Bd0e808B906D7F6A4CE85c"; // 你的投票合约地址

// **初始化 Web3**
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

const loading = ref(false); // 控制按钮 loading 状态
const walletStore = useWalletStore(); // 导入钱包状态

const voteAmountLeft = ref(1);
const voteAmountRight = ref(1);
// **投票方法**
const vote = async (forA: boolean, poolId: number) => {
  if (forA) {
    if (voteAmountLeft.value <= 0) {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: t("ElNoti.el20"),
        duration: 2000,
      });
      return;
    }
  } else {
    if (voteAmountRight.value <= 0) {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: t("ElNoti.el20"),
        duration: 2000,
      });
      return;
    }
  }

  loading.value = true;
  // **1. 连接钱包**
  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el21"),
      duration: 1000,
    });
    loading.value = false;
    return;
  }

  try {
    const pool = (await contract.methods.getPool(poolId).call()) as PoolT;

    const endTime = Number(pool.endTime);
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime >= endTime) {
      console.error("投票已结束！");
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: t("ElNoti.el22"),
        duration: 2000,
      });
      loading.value = false;
      return;
    }

    // **3. 确保钱包余额充足**
    const balance = await web3.eth.getBalance(walletStore.walletAddress);

    const voteAmount = forA ? voteAmountLeft.value : voteAmountRight.value;

    // **7. 发送交易**
    try {
      const tx = await contract.methods
        .vote(poolId, forA, voteAmount, false)
        .send({
          from: walletStore.walletAddress,
        });
      // 2. 等待交易确认
      const res = await voteWahlPool({
        hash: tx.transactionHash,
        poolId: poolId,
        role: forA ? 1 : 2,
        amount: voteAmount,
        weise: 2, // weise 1 转发 2 投票
      });
      if (res.data.code === 0) {
        ElNotification({
          showClose: false,
          customClass: "message-logout",
          title: t("ElNoti.el23"),
          duration: 2000,
        });
        if (forA) {
          leftVotes.value += voteAmount;
        } else {
          rightVotes.value += voteAmount;
        }
        getList();
        loading.value = false;
      } else {
        ElNotification({
          showClose: false,
          customClass: "message-logout",
          title: res.data.json.message_zh,
          duration: 2000,
        });
      }

      loading.value = false;
    } catch (error: any) {
      console.error("投票失败:", error);
      if (error.message.includes("User denied transaction signature")) {
        ElNotification({
          showClose: false,
          customClass: "message-logout",
          title: t("ElNoti.el24"),
          duration: 2000,
        });
      } else {
        ElNotification({
          showClose: false,
          customClass: "message-logout",
          title: t("ElNoti.el25"),
          duration: 2000,
        });
      }
      loading.value = false;
      return;
    } finally {
      loading.value = false; // **确保任何情况下都会取消loading**
    }
  } catch (error) {
    console.error("投票失败:", error);
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el26"),
      duration: 2000,
    });

    loading.value = false;
  } finally {
    loading.value = false; // **确保任何情况下都会取消loading**
  }
};
const getLeftVotes = (poolId: number) => {
  const pool = List.value.find((p) => p.poolId === poolId);
  return pool ? Number(pool.numberOne) : 0;
};

const getRightVotes = (poolId: number) => {
  const pool = List.value.find((p) => p.poolId === poolId);
  return pool ? Number(pool.numberTwo) : 0;
};

// 判断是否领取奖励处理
const isPickUp = ref(true);
const checkBonusForWinners = async () => {
  if (List.value.length === 0) return;
  for (const item of List.value) {
    if (item.winner === 2) {
      try {
        const res = await judgeBonus({ poolId: item.poolId, win: item.winner });
        if (res.data.code === 0) {
          isPickUp.value = res.data.json;
        }
      } catch (error) {}
    }
  }
};

watch(
  () => useTokenStore().userToken,
  (newToken: any) => {
    if (newToken) {
      checkBonusForWinners();
    }
  },
  { immediate: true }
);
// **获取投票列表**
const getList = async () => {
  const res = await displayWahlPool();
  if (res.data.code === 0) {
    List.value = res.data.json;
    checkBonusForWinners();
  }
};

// 转发
let previousTitle = "";
const isTwitterShared = ref(false);

const shareOnTwitter = async (Role: any, forA: boolean, poolId: number) => {
  loading.value = true;
  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el21"),
      duration: 1000,
    });
    loading.value = false;
    return;
  }

  const pool = (await contract.methods.getPool(poolId).call()) as PoolT;
  const endTime = Number(pool.endTime);
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime >= endTime) {
    console.error("投票已结束！");
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el22"),
      duration: 2000,
    });
    loading.value = false;
    return;
  }
  const shareText = `
${t("ai.ai42")}${Role}${t("ai.ai43")}

${t("ai.ai44")}${Role}${t("ai.ai45")}
${t("ai.ai46")}
${t("ai.ai47")}

${t("ai.ai48")}👉 https://dizhi.com
 #MovieAI逆风翻盘 #全民瓜分MovieAI奖池
${t("ai.ai49")}
 `;

  //  [ Popularity voting sprint! Help ${Role} win, and share the 10,000U prize pool🔥]

  // Family members! The votes for [${Role}] are rushing to the top, and you are the only one short! ✨
  // Get a free ticket worth 88U by participating!

  // Vote to enjoy the prize pool dividend, the higher the number of votes, the more prize money🎁

  // Click the link to support quickly👉 https://website.com
  // #MovieAI逆风翻盘 #全民股分电影AI奖池
  // Forward and spread!

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}`;

  // 记录当前页面标题
  previousTitle = document.title;

  // 监听用户是否返回
  isTwitterShared.value = false;
  window.open(twitterUrl, "_blank");

  // 监听窗口焦点变化
  const handleFocus = async () => {
    if (!isTwitterShared.value) {
      isTwitterShared.value = true;
      document.title = previousTitle; // 恢复标题

      // 用户返回后执行投票
      try {
        // loading.value = true;
        const userVotes = await contract.methods
          .getUserVotes(poolId, walletStore.walletAddress)
          .call();
        const tx = await contract.methods.vote(poolId, forA, 88, true).send({
          from: walletStore.walletAddress,
        });
        // 2. 等待交易确认
        const res = await voteWahlPool({
          hash: tx.transactionHash,
          poolId: poolId,
          role: forA ? 1 : 2,
          amount: 88,
          weise: 1, // weise 1 转发 2 投票
        });
        if (res.data.code === 0) {
          ElNotification({
            showClose: false,
            customClass: "message-logout",
            title: t("ElNoti.el27"),
            duration: 2000,
          });
          if (forA) {
            leftVotes.value += 88;
          } else {
            rightVotes.value += 88;
          }
          getList();
          loading.value = false;
        } else {
          ElNotification({
            showClose: false,
            customClass: "message-logout",
            title: res.data.json.message_zh,
            duration: 2000,
          });
        }

        loading.value = false;
      } catch (error: any) {
        console.error("转发失败:", error);
        if (error.message.includes("User denied transaction signature")) {
          ElNotification({
            showClose: false,
            customClass: "message-logout",
            title: t("ElNoti.el28"),
            duration: 2000,
          });
        } else {
          ElNotification({
            showClose: false,
            customClass: "message-logout",
            title: t("ElNoti.el29"),
            duration: 2000,
          });
        }
        return;
      } finally {
        loading.value = false; // **确保任何情况下都会取消loading**
      }
    }
  };

  window.addEventListener("focus", handleFocus);

  // 组件卸载时移除监听
  onUnmounted(() => {
    window.removeEventListener("focus", handleFocus);
  });
};

import SuperPkBar from "./SuperPkBar.vue";
import { useTokenStore } from "@/store/modules/my";

const leftVotes = ref(0);
const rightVotes = ref(0);

// 领取奖励

const claimReward = async (item: any) => {
  if (walletStore.walletAddress === "") {
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el21"),
      duration: 1000,
    });
    return;
  }

  try {
    loading.value = true;
    const tx = await contract.methods
      .claim(item.poolId)
      .send({ from: walletStore.walletAddress });
    const res = await distributeBonus({
      hash: tx.transactionHash,
      poolId: item.poolId,
      win: item.winner,
    });
    if (res.data.code === 0) {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: t("ElNoti.el30"),
        duration: 2000,
      });
      getList();
      loading.value = false;
    } else {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title: res.data.json.message_zh,
        duration: 2000,
      });
      loading.value = false;
    }
  } catch (error) {
    console.error("领取失败:", error);
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el31"),
      duration: 2000,
    });
    loading.value = false;
  }
};

onMounted(() => {
  getList();
});
</script>

<style scoped lang="less">
.victory {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  .victoryTitle {
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
      "Microsoft YaHei", sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #ff0000;
    margin-bottom: 40px;
  }
  .victoryBox {
    position: relative;
    padding: 50px 20px;
    border-radius: 10px;
    background: #1a1a1a73;
    text-align: center;
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.138);
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    gap: 30px;
    .victoryBoxIcon {
      position: absolute;
      left: 50%;
      transform: translateX(-50% - 108px);
      top: 22px;
    }
    .victoryRole {
      font-size: 18px;
    }
    .victoryVotes {
      font-size: 16px;
    }
    .victoryBtn {
      width: 100%;
      height: 40px;
      border-radius: 10px;
      background: #ff000069;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease-in-out;
      &:hover {
        background: #ff0000;
      }
    }
    .victoryBtn_d {
      width: 100%;
      height: 40px;
      border-radius: 10px;
      background: #ff000069;
      color: #ffffff84;
      font-size: 16px;
      font-weight: 500;
      cursor: not-allowed;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.vote-container {
  text-align: center;
  padding: 20px;
}

.vote-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.shop {
  padding: 40px 20px;
  border-radius: 10px;
  background: #1a1a1a73;
  text-align: center;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.138);
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  gap: 20px;

  &:hover {
    transform: scale(1.05);
  }
}

.avatar,
.victoryAvatar {
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  background: #292929;
}

.role {
  color: #fff;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.08px;
}

.Number {
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.07px;
}

.vs {
  font-size: 24px;
  font-weight: bold;
}

.message {
  color: green;
  margin-top: 10px;
}

.participate {
  flex: 1;
  cursor: pointer;
  display: flex;
  padding: 6px 2px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: rgba(27, 27, 27, 0.6);
  backdrop-filter: blur(5px);
  color: #d339c4;
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  /* 157.143% */
  letter-spacing: 0.07px;
  transition: all 0.3s ease-in-out;

  /* 鼠标悬浮时的平滑过渡 */
  .icon {
    fill: #d339c4;
    /* 继承父级 color */
    transition: fill 0.3s ease, transform 0.3s ease;
  }

  &:hover {
    color: #f9f9f9;
    background: #d339c4;
  }

  &:hover .icon {
    fill: #f9f9f9;
    /* 继承父级 color */
    transform: scale(1.1);
    /* 放大 10% */
    transition: fill 0.3s ease, transform 0.3s ease;
  }
}

:deep(.el-loading-mask) {
  background-color: rgba(0, 0, 0, 0.7);
}

:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}

.vote-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
}

.vote-buttons {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
}

.vote-button {
  flex: 1;
  position: relative;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  display: flex;
  padding: 6px 2px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: rgba(27, 27, 27, 0.6);
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  /* 157.143% */
  letter-spacing: 0.07px;
  transition: all 0.3s ease-in-out;
}

.vote-button span {
  position: relative;
  z-index: 2;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.left-team {
  color: #45b3ff;
  &:hover {
    background: linear-gradient(135deg, #45b3ff, #2d8cf0);
    box-shadow: 0 6px 20px rgba(69, 179, 255, 0.3);
    color: #fff;
  }
}

.right-team {
  color: #ff3b3b;
  &:hover {
    background: linear-gradient(135deg, #ff5e7d, #ff3b3b);
    box-shadow: 0 6px 20px rgba(255, 94, 125, 0.3);
    color: #fff;
  }
}

.disabled {
  background: rgba(27, 27, 27, 0.6);
  // pointer-events: none; /* 禁止点击 */
  box-shadow: none;
  cursor: not-allowed !important;

  .icon {
    fill: #d339c342;
    /* 继承父级 color */
  }

  &:hover {
    background: rgba(27, 27, 27, 0.6);
    transform: scale(1);
    /* 放大 10% */
  }

  &:hover .icon {
    fill: #d339c342;
    /* 继承父级 color */
    transform: scale(1);
    /* 放大 10% */
  }
}

.el-input {
  display: flex;
  width: 100%;
  // padding: 16px 24px;
}

:deep(.el-input__wrapper) {
  width: 100%;
  display: flex;
  padding: 4px 20px;
  border-radius: 12px;
  background: #121212;
  border: none;
  box-shadow: none;
}

:deep(.el-input__inner) {
  width: 100%;
  color: rgb(255, 255, 255);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.36px;
}

:deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.32);
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.36px;
}

:deep(.el-input.is-disabled .el-input__wrapper) {
  background: rgba(18, 18, 18, 0.285);
  box-shadow: none;
}

.settlement {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin-top: 30px;
  padding: 40px 20px;
  border-radius: 10px;
  background: #1a1a1a73;
  text-align: center;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.138);

  .settlementshop {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .settlementavatar {
    width: 88px;
    height: 88px;
    flex-shrink: 0;
    background: #292929;
    margin-bottom: 20px;
  }
}

.ZoomIn {
  transform: scale(1.1);
}

.Downsizing {
  transform: scale(0.9);
  //透明
  opacity: 0.5;
}
</style>

<style lang="less">
.message-logout {
  top: 104px !important;
  right: 24px !important;
  background: #000;
  color: #fff;
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.56px;
  border-radius: 11px;
  border: 1px solid rgba(107, 107, 107, 0.4);
  background: rgb(26, 26, 26);
  width: 328px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.el-notification__title {
  color: #fff;
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.56px;
}

@media (max-width: 824px) {
  .vote-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;

    .shop {
      width: 90%;
    }
  }
}
</style>@/store/modules/wallet@/store/modules/wallet
