<template>
  <div class="Homeview">
    <div class="Empowering">
      <div class="blackBg" :class="bgClass">
        <div class="title1">
          Entertainment ecosystem based on blockchain technology
        </div>
      </div>
      <div class="bigBg" :class="bgClass"></div>
      <div class="shadow1" :class="bgClass"></div>
      <div class="shadow2" :class="bgClass"></div>
      <!-- <div class="bg1"><img src="@/assets/images/topbg.png" alt="" /></div> -->
      <div class="blackBg1" :class="bgClass">
        <div class="logo">
          <img src="@/assets/images/HomeLogo.png" alt="" />
        </div>
        <div class="title2">Empowering the</div>
        <div class="title3">Web3 Entertainment Economy</div>
      </div>
      <div class="OurTeam" :class="bgClass">
        <div class="OurTeamTitle">Our Team</div>
        <div class="OurTeamText">
          Experienced film investor & producer in the Chinese-speaking world ·
          European Film Producer & Co-Investment Advisor · Experienced Hollywood
          film financier & producer · Global Film Distribution Expert &
          Strategic Advisor
        </div>
      </div>
    </div>
    <div class="second">
      <div class="secondBg"></div>
      <div class="VisionFath">
        <div class="Vision">Vision and core objectives</div>
        <div class="MovieIS">
          <span class="Movie">Movie</span> is an entertainment ecosystem based
          on blockchain technology focused on empowering content production,
          distribution and fan interaction in the film industry through a token
          economy model <span class="Tokenomics">(Tokenomics)</span>.
        </div>
      </div>
    </div>
    <div class="Third">
      <div class="ThirdBg" :class="bgClass"></div>
      <div class="CoreFeatures" :class="bgClass">
        <div class="OGPASS">
          <img src="@/assets/images/OGPASS.png" alt="" />
        </div>
        <div class="CoreFeaturesTitle">Core Features</div>
        <div class="CoreFeaturesList">
          <div
            class="CoreFeaturesItem"
            v-for="(item, index) in CoreFeaturesList"
            :key="index"
          >
            <div class="line" v-if="windowWidth > 824">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="208"
                height="25"
                viewBox="0 0 208 25"
                fill="none"
              >
                <path
                  d="M0 25L42.6947 1H165.305L208 25H0Z"
                  fill="url(#paint0_linear_173_3156)"
                  style=""
                />
                <rect
                  x="42.2031"
                  width="123.594"
                  height="3"
                  rx="1.5"
                  fill="url(#paint1_linear_173_3156)"
                  style=""
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_173_3156"
                    x1="104"
                    y1="1"
                    x2="104"
                    y2="25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      stop-color="#D339C4"
                      stop-opacity="0.2"
                      style="
                        stop-color: #d339c4;
                        stop-color: color(display-p3 0.8292 0.2246 0.7687);
                        stop-opacity: 0.2;
                      "
                    />
                    <stop
                      offset="1"
                      stop-color="#D339C4"
                      stop-opacity="0"
                      style="stop-color: none; stop-opacity: 0"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_173_3156"
                    x1="180.143"
                    y1="4"
                    x2="109.189"
                    y2="-68.6617"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.655"
                      stop-color="#D339C4"
                      style="
                        stop-color: #d339c4;
                        stop-color: color(display-p3 0.8292 0.2246 0.7687);
                        stop-opacity: 1;
                      "
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      style="stop-color: white; stop-opacity: 1"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="line" v-if="windowWidth < 824">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="134"
                height="17"
                viewBox="0 0 134 17"
                fill="none"
              >
                <path
                  d="M0.44043 16.6751L27.7651 1.31506H106.236L133.56 16.6751H0.44043Z"
                  fill="url(#paint0_linear_648_4834)"
                  style=""
                />
                <rect
                  x="27.4502"
                  y="0.675049"
                  width="79.1003"
                  height="1.92"
                  rx="0.96"
                  fill="url(#paint1_linear_648_4834)"
                  style=""
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_648_4834"
                    x1="67.0004"
                    y1="1.31506"
                    x2="67.0004"
                    y2="16.6751"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      stop-color="#D339C4"
                      stop-opacity="0.2"
                      style="
                        stop-color: #d339c4;
                        stop-color: color(display-p3 0.8292 0.2246 0.7687);
                        stop-opacity: 0.2;
                      "
                    />
                    <stop
                      offset="1"
                      stop-color="#D339C4"
                      stop-opacity="0"
                      style="stop-color: none; stop-opacity: 0"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_648_4834"
                    x1="115.732"
                    y1="3.23505"
                    x2="70.3212"
                    y2="-43.2684"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.655"
                      stop-color="#D339C4"
                      style="
                        stop-color: #d339c4;
                        stop-color: color(display-p3 0.8292 0.2246 0.7687);
                        stop-opacity: 1;
                      "
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      style="stop-color: white; stop-opacity: 1"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="Fourth">
      <div class="FourthBg" :class="bgClass"></div>
      <div class="MarketingPlan" :class="bgClass">
        <div class="Roadmap">
          <img src="@/assets/images/Roadmap.png" alt="" />
        </div>
        <div class="MarketingPlanTitle">Marketing Plan</div>
        <div class="MarketingPlanList">
          <div
            class="MarketingPlanItem"
            v-for="(item, index) in MarketingPlanList"
            :key="index"
          >
            <div class="line">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="208"
                height="25"
                viewBox="0 0 208 25"
                fill="none"
              >
                <path
                  d="M0 25L42.6947 1H165.305L208 25H0Z"
                  fill="url(#paint0_linear_173_3156)"
                  style=""
                />
                <rect
                  x="42.2031"
                  width="123.594"
                  height="3"
                  rx="1.5"
                  fill="url(#paint1_linear_173_3156)"
                  style=""
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_173_3156"
                    x1="104"
                    y1="1"
                    x2="104"
                    y2="25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      stop-color="#D339C4"
                      stop-opacity="0.2"
                      style="
                        stop-color: #d339c4;
                        stop-color: color(display-p3 0.8292 0.2246 0.7687);
                        stop-opacity: 0.2;
                      "
                    />
                    <stop
                      offset="1"
                      stop-color="#D339C4"
                      stop-opacity="0"
                      style="stop-color: none; stop-opacity: 0"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_173_3156"
                    x1="180.143"
                    y1="4"
                    x2="109.189"
                    y2="-68.6617"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.655"
                      stop-color="#D339C4"
                      style="
                        stop-color: #d339c4;
                        stop-color: color(display-p3 0.8292 0.2246 0.7687);
                        stop-opacity: 1;
                      "
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      style="stop-color: white; stop-opacity: 1"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@/utils/useWindowSize";
import { ref } from "vue";

const step = ref(0);
const bgClass = ref("first"); // 控制背景和黑色部分的平移动画
const { windowWidth } = useWindowSize();
// 处理点击事件
const handleClick = () => {
  step.value += 1;
  if (step.value === 0) {
    bgClass.value = "FirstAnimate"; // 添加动画类
  }
  if (step.value === 1) {
    bgClass.value = "FirstAnimate"; // 添加动画类
  }
  if (step.value === 2) {
    bgClass.value = "SecondAnimate"; // 添加动画类
  }
  if (step.value === 3) {
    bgClass.value = "ThirdAnimate"; // 添加动画类
  }
};

const CoreFeaturesList = ref([
  {
    title: "Exclusive VIP Events",
    text: "Holders can attend offline VIP events such as film premieres and red carpets.",
  },
  {
    title: "Airdrop Rewards",
    text: "Get regular airdrops of project tokens, limited edition NFTs and souvenirs.",
  },
  {
    title: "Neighbourhood Benefits",
    text: "Free or priority access to limited edition physical peripherals and digital content.",
  },
  {
    title: "Community Dividend",
    text: "Holders participate in a portion of the platform's profit sharing, sharing the benefits of the project's success.",
  },
]);
const MarketingPlanList = ref([
  {
    title: "Short-term goals",
    text: "Complete financing and launch two exchanges. ( e.g. Binance, OKX )",
  },
  {
    title: "Medium-term goals",
    text: "Build a complete film content financing and distribution ecosystem.",
  },
  {
    title: "Long-term goals",
    text: "Achieve FDV 100M and become a blockchain film ecosystem benchmark.",
  },
]);
</script>

<style scoped lang="less">
.Homeview {
  /*background: #000000;*/
  background: #000;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // overflow: hidden;
  // position: relative;
}

@media (min-width: 824px) {
  .Empowering {
    /*background: #000000;*/
    background: #000;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    .bigBg {
      overflow: hidden;
      transition: transform 2s ease-out;
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      background: url("@/assets/images/bgBig1.png") no-repeat;
      background-size: contain; /* 使背景图片覆盖整个屏幕 */
      background-position: center center; /* 保证图片居中显示 */
    }

    .shadow1 {
      transition: transform 2s ease-out;
      position: absolute;
      left: 0;
      top: 50%;
      z-index: 20;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.01);
      filter: blur(5px);
      backdrop-filter: blur(5px);
      width: 400px;
      height: 451px;
    }
    .shadow2 {
      transition: transform 2s ease-out;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 20;
      background: rgba(0, 0, 0, 0.01);
      filter: blur(5px);
      backdrop-filter: blur(5px);
      background: rgba(0, 0, 0, 0.01);
      width: 400px;
      height: 451px;
    }
    .blackBg {
      z-index: 6;
      width: 23882px;
      height: 23882px;
      border-radius: 23882px;
      position: absolute;
      top: -23714px;
      background: #000;
      flex-shrink: 0;
      padding-bottom: 55px;
      display: flex;
      align-items: end;
      justify-content: center;
      transition: transform 10s ease-out;

      .title1 {
        padding-top: 79px;
        z-index: 7;
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
        max-width: 290px;
      }
    }
    .bg1 {
      position: absolute;
      margin-top: 70px;
      height: 198px;
      transform: scale(1.3);
    }
    .blackBg1 {
      transition: transform 2s ease-out;
      position: absolute;
      right: 0;
      top: 50%;
      z-index: 20;
      transform: translateY(-76%);
      width: 100%;
      z-index: 10;
      // background: rgba(0, 0, 0, 0.341);

      background-size: cover;
      display: flex;
      flex-direction: column;
      align-items: center;

      .logo {
        height: 54px;
        position: absolute;
        z-index: 3;
        margin-top: -25px;
      }
      .title2 {
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 110px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: uppercase;
        margin-top: -20px;
      }
      .title3 {
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
      }
    }

    .OurTeam {
      transition: transform 2s ease-out;
      position: absolute;
      z-index: 10;
      bottom: 13%;
      .OurTeamTitle {
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      .OurTeamText {
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
        max-width: 392px;
      }
    }

    .blackBg.FirstAnimate {
      transform: translateY(-100%);
      overflow: hidden;
    }
    .bigBg.FirstAnimate {
      transform: translateY(1000%);
      overflow: hidden;
    }
    .shadow1.FirstAnimate {
      transform: translateY(1000%);
      overflow: hidden;
    }
    .shadow2.FirstAnimate {
      transform: translateY(1000%);
      overflow: hidden;
    }
    .blackBg1.FirstAnimate {
      transform: translateY(1000%);
      overflow: hidden;
    }
    .OurTeam.FirstAnimate {
      transform: translateY(1000%);
      overflow: hidden;
    }
  }
  .second {
    background: #000;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    .secondBg {
      width: 100%;
      height: 100%;
      background: url("@/assets/images/secondBg.png") no-repeat;
      background-size: contain;
      background-position: center center; /* 保证图片居中显示 */
    }
    .VisionFath {
      display: flex;
      position: absolute;
      bottom: 105px;
      align-items: center;
      width: 100%;
      max-width: 1440px;
      justify-content: space-between;
      padding-left: 0px;
      padding-right: 0;
      .Vision {
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
      }
      .MovieIS {
        color: #fff;
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        width: 627px;
        flex-shrink: 0;
        .Movie {
          color: #e621ca;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        }
        .Tokenomics {
          color: #e621ca;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
      }
    }
  }
  .Third {
    background: #000;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    .ThirdBg {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      background: url("@/assets/images/ThirdBg.png") no-repeat;
      background-size: cover;
      background-position: center center;
    }
    .CoreFeatures {
      position: absolute;
      bottom: 92px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .OGPASS {
        width: 145px;
        position: relative;
        margin-bottom: -20px;
      }
      .CoreFeaturesTitle {
        color: #fff;
        font-family: Montserrat;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
        margin-bottom: 66px;
      }
      .CoreFeaturesList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1440px;
        .CoreFeaturesItem {
          width: 255px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .title {
            color: #e621ca;
            text-align: center;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: uppercase;
            margin-bottom: 6px;
          }
          .text {
            color: #fff;
            text-align: center;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
        }
      }
    }
  }
  .Fourth {
    background: #000000;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    .FourthBg {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      background: url("@/assets/images/Fourth.png") no-repeat;
      background-size: contain;
      background-position: center center;
    }
    .MarketingPlan {
      position: absolute;
      bottom: 38px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      .Roadmap {
        width: 169px;
        margin-bottom: -16px;
        position: relative;
      }
      .MarketingPlanTitle {
        color: #fff;
        font-family: Montserrat;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
        margin-bottom: 37px;
      }
      .MarketingPlanList {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 29px;
        .MarketingPlanItem {
          display: flex;
          flex-direction: column;
          align-items: center;

          .title {
            color: #e621ca;
            text-align: center;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: uppercase;
          }
          .text {
            max-width: 379px;
            color: #ffffff;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            text-align: center;
            line-height: normal;
          }
        }
      }
    }
  }
}
@media (max-width: 1470px) {
  .Homeview {
    .Third {
      .CoreFeatures {
        .CoreFeaturesList {
          padding: 0 20px;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          .CoreFeaturesItem {
            width: 35%;
          }
        }
      }
    }
  }
}
@media (max-width: 1072px) {
  .Homeview {
    .Empowering {
      .shadow1,
      .shadow2 {
        width: 200px;
        height: 325px;
      }

      .blackBg1 {
        .logo {
          margin-top: -50px;
        }
        .title2 {
          font-size: 40px;
        }
        .title3 {
          font-size: 20px;
        }
      }
    }
    .second {
      .VisionFath {
        flex-direction: column;
        align-items: center;
        .MovieIS,
        .Vision {
          text-align: center;
        }
      }
    }
    .Third {
      .CoreFeatures {
        .CoreFeaturesList {
          .CoreFeaturesItem {
            .text {
              max-width: 309px;
            }
          }
        }
      }
    }
  }
}
</style>
