<template>
  <div class="super-pk-container">
    <!-- PK进度条主体 -->
    <div class="pk-progress-bar" ref="progressBarRef">
      <!-- 左侧进度 -->
      <div class="progress-left" :style="{ width: leftProgress + '%' }">
        <div class="vote-count left-count">
          {{ formatNumber(props.leftVotes) }}
        </div>
        <div class="glow-effect left-glow"></div>
        <div class="particle-overlay"></div>
      </div>

      <!-- 右侧进度 -->
      <div class="progress-right" :style="{ width: rightProgress + '%' }">
        <div class="vote-count right-count">
          {{ formatNumber(props.rightVotes) }}
        </div>
        <div class="glow-effect right-glow"></div>
        <div class="particle-overlay"></div>
      </div>

      <!-- 中间光柱 -->
      <div class="central-beam"></div>
    </div>

    <!-- 酷炫提示弹窗 -->
    <Teleport to="body">
      <Transition name="zoom-fade">
        <div v-if="showTip" class="modal-overlay">
          <div class="battle-tip" :class="tipType">
            <button class="close-btn" @click="showTip = false">×</button>

            <div class="tip-content">
              <div class="sparkle"></div>
              <div
                style="
                  color: #000;
                  text-align: center;
                  font-family: Montserrat;
                  font-size: 18px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: normal;
                  text-transform: uppercase;
                  margin-bottom: 20px;
                "
                v-html="tipMessage"
              ></div>
              <div
                style="
                  color: #fff;
                  font-family: Montserrat;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: normal;
                "
                v-html="tipSubMessage"
              ></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
  
  <script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import gsap from "gsap";

const props = withDefaults(
  defineProps<{
    leftVotes: number;
    rightVotes: number;
    leftName: string;
    rightName: string;
    all: any;
    leftColor?: string;
    rightColor?: string;
    barHeight?: number;
    showTip?: boolean;
  }>(),
  {
    leftColor: "#45B3FF",
    rightColor: "#FF5E7D",
    barHeight: 16,
  }
);

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const emit = defineEmits(["vote-complete"]);

// 状态管理
const leftProgress = ref(1);
const rightProgress = ref(1);
const showTip = ref(props.showTip);
const tipMessage = ref("");
const tipSubMessage = ref("");
const tipConMessage = ref("");
const tipType = ref<"leading" | "catching">("leading");
const progressBarRef = ref<HTMLElement>();

// 计算属性
const totalVotes = computed(() => props.leftVotes + props.rightVotes);

const getShareThreshold = (totalVotes: number): number => {
  if (totalVotes < 5000) return 200;
  if (totalVotes < 10000) return 500;
  if (totalVotes < 20000) return 1000;
  if (totalVotes < 50000) return 2000;
  if (totalVotes < 100000) return 5000;
  return 10000;
};

// 修改showBattleTip方法，增加votedTeam参数
const showBattleTip = (votedTeam: "left" | "right") => {
  const total = totalVotes.value;
  const isLeftVoted = votedTeam === "left";
  const votedName = isLeftVoted ? props.leftName : props.rightName; // 被投票方名称
  const votedVotes = isLeftVoted ? props.leftVotes : props.rightVotes; // 被投票方票数
  const opponentVotes = isLeftVoted ? props.rightVotes : props.leftVotes; // 另一方票数
  const forwarding = isLeftVoted
    ? getShareThreshold(props.all.sharesOne)
    : getShareThreshold(props.all.sharesTwo); // 转发数量
  const voteDiff = Math.abs(votedVotes - opponentVotes); // 票数差距
  const percentage = ((votedVotes / total) * 100).toFixed(2); // 被投票方占比
  const throwMore = Math.ceil(total * 0.1); // 10% 翻盘需要的票数
  const poolReward = (total * 10).toFixed(2); // 100 票 = 10 USDT

  if (votedVotes === opponentVotes) {
    tipMessage.value = t("ai.ai4");
    tipSubMessage.value = "";
    tipType.value = "leading";
  } else {
    const isLeading = votedVotes > opponentVotes;
    const diff = Math.abs(votedVotes - opponentVotes);
    const neededFor10Percent = Math.ceil(total * 0.2);

    if (isLeading) {
      // 计算增加10%需要多少票
      tipMessage.value = ` <div style="color: #e621ca; ">
            🎉 ${t("ai.ai5")} ${neededFor10Percent} ${t("ai.ai6")}🎉
            </div>`;
      tipSubMessage.value = `${t("ai.ai7")} ${votedName} ${t(
        "ai.ai8"
      )} ${percentage}% ${t("ai.ai9")}
            ${t("ai.ai10")}${throwMore}${t("ai.ai11")}<br> <br>
            ${t("ai.ai12")}${diff}${t("ai.ai13")}${forwarding}${t(
        "ai.ai14"
      )} <br> <br>
                      <span style="color: #e621ca">守住王${t(
                        "ai.ai15"
                      )}座分大奖 >>></span>
      `;

      tipType.value = "leading";
    } else {
      // 计算需要多少票反超
      // 计算增加10%需要多少票
      const neededToFlip = voteDiff + 1; // 翻盘需要的票数

      tipMessage.value = ` <span style="color: #000">🔥 ${t(
        "ai.ai16"
      )} ${neededToFlip} ${t("ai.ai17")}🔥 </span>
    `;
      tipSubMessage.value = `${t("ai.ai18")} ${votedName} ${t("ai.ai19")}
      ${t("ai.ai20")} ${neededToFlip}  ${t("ai.ai21")}<br> <br>
       ${t("ai.ai22")}${forwarding} ${t("ai.ai23")}  <br> <br>
       ${t("ai.ai24")} ${total}  ${t("ai.ai25")} <br><br>
       <span style="color: #000"> ${t("ai.ai26")} >>></span>`;

      tipType.value = "catching";
    }
  }

  showTip.value = true;
};

// 修改watch监听，跟踪投票方向
watch(
  [() => props.leftVotes, () => props.rightVotes],
  ([newL, newR], [oldL, oldR]) => {
    const changedSide = newL > oldL ? "left" : "right";
    animateProgress(changedSide);
  }
);

// 修改animateProgress函数签名
const animateProgress = async (
  votedTeam: "left" | "right" // 新增参数
) => {
  const minWidth = 5; // 最小占比，保证 0 票时仍有 5%
  // 计算实际目标比例
  let targetLeft =
    totalVotes.value === 0 ? 50 : (props.leftVotes / totalVotes.value) * 100;
  let targetRight = 100 - targetLeft;
  targetLeft = Math.max(targetLeft, minWidth);
  targetRight = Math.max(targetRight, minWidth); // 确保右侧也有最小宽度
  // 重新归一化，保证总和为100%
  const totalFixed = targetLeft + targetRight;
  targetLeft = (targetLeft / totalFixed) * 100;
  targetRight = 100 - targetLeft;
  // 冲刺动画参数
  const boostAmount = 15;
  const initialBoost =
    votedTeam === "left"
      ? Math.min(targetLeft + boostAmount, 100) // 蓝队向右冲刺
      : Math.max(targetRight + boostAmount, 0); // 红队向左冲刺

  // 第一阶段：向点击方向冲刺
  await gsap.to(leftProgress, {
    value: votedTeam === "left" ? initialBoost : 100 - initialBoost,
    duration: 0.4,
    ease: "power2.out",
    onUpdate: () => {
      rightProgress.value = 100 - leftProgress.value;
    },
  });

  // 第二阶段：弹性回归实际比例
  await gsap.to(leftProgress, {
    value: targetLeft,
    duration: 1.2,
    ease: "elastic.out(1, 0.5)",
    onUpdate: () => {
      rightProgress.value = 100 - leftProgress.value;
    },
  });
  // 修改提示调用
  showBattleTip(votedTeam); // 传入投票方
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

onMounted(() => {
  // 获取当前总票数
  const total = totalVotes.value;

  if (total === 0) {
    // 如果初始票数为 0，设置默认比例为 50%
    leftProgress.value = 50;
    rightProgress.value = 50;
  } else {
    // 计算进度条比例
    let targetLeft = (props.leftVotes / total) * 100;
    let targetRight = 100 - targetLeft;

    // 确保最小宽度，防止 0 票时条形图消失
    const minWidth = 5;
    targetLeft = Math.max(targetLeft, minWidth);
    targetRight = Math.max(targetRight, minWidth);

    // 重新归一化，保证总和为 100%
    const totalFixed = targetLeft + targetRight;
    leftProgress.value = (targetLeft / totalFixed) * 100;
    rightProgress.value = 100 - leftProgress.value;
  }
});
</script>
  
<style scoped>
.super-pk-container {
  width: 100%;
  padding: 20px 0;
}

.pk-progress-bar {
  height: v-bind('props.barHeight + "px"');
  border-radius: 99px;
  background: rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.progress-left,
.progress-right {
  position: absolute;
  top: 0;
  height: 100%;
  transition: width 0.3s ease;
}

.progress-left {
  left: 0;
  background: linear-gradient(90deg, v-bind("props.leftColor"), #70c7ff);
}

.progress-right {
  right: 0;
  background: linear-gradient(90deg, #ff8a9b, v-bind("props.rightColor"));
}

/* 提示弹窗 */
.battle-tip {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 30px;
  border-radius: 16px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 999;
  width: 80%;
  max-width: 400px;
}

/* 领先方样式 */
.battle-tip.leading {
  background: linear-gradient(45deg, #5598cb, #3a91c7);
  animation: leadFlash 0.5s infinite alternate;
}

/* 落后方样式（急促+深红色+闪烁） */
.battle-tip.catching {
  background: linear-gradient(45deg, #ff1a1a, #cc0000);
  animation: urgentFlash 0.5s infinite alternate;
}

/* X 关闭按钮 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

/* 落后方的闪烁动画 */
@keyframes leadFlash {
  0% {
    box-shadow: 0 0 20px rgba(69, 178, 255, 0.611);
  }
  100% {
    box-shadow: 0 0 30px rgba(69, 178, 255, 1);
  }
}
/* 落后方的闪烁动画 */
@keyframes urgentFlash {
  0% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
  }
  100% {
    box-shadow: 0 0 30px rgba(255, 0, 0, 1);
  }
}
/* 弹窗动画 */
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 确保层级足够高 */
}
</style>
