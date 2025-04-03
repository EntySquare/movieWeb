<template>
  <div class="Homeview">
    <div class="Empowering">
      <div class="blackBg">
        <!-- <div class="title1">
          Entertainment ecosystem based on blockchain technology
        </div> -->
      </div>
      <div class="shadow1"></div>
      <div class="shadow2"></div>
      <!-- <div class="bg1"><img src="@/assets/images/topbg.png" alt="" /></div> -->
      <div class="blackBg1">
        <div class="logo">
          <img src="@/assets/images/HomeLogo.png" alt="" />
        </div>
        <div class="title2">{{ t("home.home2") }}</div>
        <div class="title3">{{ t("home.home3") }}</div>
      </div>
      <div class="OurTeam">
        <div class="OurTeamTitle">{{ t("home.home4") }}</div>
        <div class="OurTeamText">
          {{ t("home.home5") }}
        </div>
      </div>
    </div>
    <div class="second">
      <div class="secondBg"></div>
      <div class="VisionFath">
        <div class="Vision">Vision and core objectives</div>
        <div class="Vision">{{ t("home.home6") }}</div>
        <div class="MovieIS">
          <span class="Movie">{{ t("home.home7") }}</span> {{ t("home.home8")
          }}<span class="Tokenomics">{{ t("home.home9") }}</span
          >.
        </div>
      </div>
    </div>
    <div class="Third">
      <div class="ThirdBg"></div>
      <div class="CoreFeatures">
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
            <div class="title">{{ t(item.title) }}</div>
            <div class="text">{{ t(item.text) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="Fourth">
      <div class="FourthBg"></div>
      <div class="MarketingPlan">
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
            <div class="title">{{ t(item.title) }}</div>
            <div class="text">{{ t(item.text) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWindowSize } from "@/utils/useWindowSize";
import { ref } from "vue";

const { windowWidth } = useWindowSize();
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const CoreFeaturesList = ref([
  {
    title: "home.home12",
    text: "home.home13",
  },
  {
    title: "home.home14",
    text: "home.home15",
  },
  {
    title: "home.home16",
    text: "home.home17",
  },
  {
    title: "home.home18",
    text: "home.home19",
  },
]);
const MarketingPlanList = ref([
  {
    title: "home.home20",
    text: "home.home21",
  },
  {
    title: "home.home22",
    text: "home.home23",
  },
  {
    title: "home.home24",
    text: "home.home25",
  },
]);
</script>
<style scoped lang="less">
@media (max-width: 824px) {
  .Homeview {
    width: 100%;
    // overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #000;
    .Empowering {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      position: relative;
      margin-bottom: 120px;
      .blackBg {
        // position: absolute;
        background: url("@/assets/images/EmpoweringP.png") no-repeat;
        width: 100%;
        height: 400px;
        background-size: cover;
        background-position: center center;
      }

      .shadow1 {
        position: absolute;
        left: 0;
        z-index: 20;
        background: rgba(0, 0, 0, 0.01);
        filter: blur(5px);
        backdrop-filter: blur(5px);
        width: 40px;
        height: 451px;
      }
      .shadow2 {
        position: absolute;
        right: 0;
        z-index: 20;
        background: rgba(0, 0, 0, 0.01);
        filter: blur(5px);
        backdrop-filter: blur(5px);
        width: 40px;
        height: 451px;
      }

      .blackBg1 {
        position: absolute;
        top: 36%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo {
          width: 82px;
          height: 30px;
          position: absolute;
          margin-top: -12px;
        }
        .title2 {
          color: #fff;
          text-align: center;
          font-family: Montserrat;
          font-size: 32px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          text-transform: uppercase;
        }
        .title3 {
          color: #fff;
          text-align: center;
          font-family: Montserrat;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        }
      }

      .OurTeam {
        margin-top: -80px;
        display: flex;
        flex-direction: column;
        .OurTeamTitle {
          color: #fff;
          text-align: center;
          font-family: Montserrat;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .OurTeamText {
          color: #fff;
          text-align: center;
          font-family: Montserrat;
          font-size: 12px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          text-transform: uppercase;
          max-width: 292px;
        }
      }
    }

    .second {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 120px;
      .secondBg {
        width: 100%;
        height: 371.675px;
        background: url("@/assets/images/secondPhone.png") no-repeat;
        background-size: cover;
        background-position: center center;
        margin-bottom: 24px;
      }
      .VisionFath {
        padding: 0 14px;
        .Vision {
          color: #fff;
          text-align: center;
          font-family: Montserrat;
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .MovieIS {
          color: #fff;
          font-family: Montserrat;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          max-width: 359px;
          .Movie {
            color: #e621ca;
            text-align: center;
            font-family: Montserrat;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-transform: uppercase;
          }
          .Tokenomics {
            color: #e621ca;

            font-family: Montserrat;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
        }
      }
    }

    .Third {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 120px;
      .ThirdBg {
        width: 100%;
        height: 371.675px;
        background: url("@/assets/images/ThirdBgPhone.png") no-repeat;
        background-size: cover;
        background-position: center center;
        margin-bottom: 26px;
      }
      .CoreFeatures {
        display: flex;
        flex-direction: column;
        align-items: center;
        .OGPASS {
          width: 103px;
          height: 30px;
          flex-shrink: 0;
          margin-bottom: -16px;
          position: relative;
        }
        .CoreFeaturesTitle {
          color: #fff;
          font-family: Montserrat;
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
          margin-bottom: 48px;
        }
        .CoreFeaturesList {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 55px;
          gap: 32px;
          .CoreFeaturesItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-bottom: 1px solid #292929;
            padding-bottom: 32px;
            &:last-child {
              border-bottom: none;
            }
            .title {
              color: #e621ca;
              text-align: center;
              font-family: Montserrat;
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              text-transform: uppercase;
              margin-top: 8px;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 158px;
      .FourthBg {
        width: 100%;
        height: 364px;
        background: url("@/assets/images/FourthPhone.png") no-repeat;
        background-size: contain;
        background-position: center center;
        margin-bottom: 48px;
      }
      .MarketingPlan {
        display: flex;
        flex-direction: column;
        align-items: center;
        .Roadmap {
          width: 121.765px;
          height: 30px;
          flex-shrink: 0;
          margin-bottom: -18px;
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
          margin-bottom: 48px;
        }
        .MarketingPlanList {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 28px;
          gap: 32px;
          .MarketingPlanItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 32px;
            border-bottom: 1px solid #292929;
            &:last-child {
              border-bottom: none;
            }
            .title {
              color: #e621ca;
              text-align: center;
              font-family: Montserrat;
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              text-transform: uppercase;
              margin-top: 8px;
            }
            .text {
              max-width: 290px;
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
  }
}
@media (max-width: 600px) {
  .Homeview {
    .Fourth {
      .FourthBg {
        background-size: cover;
      }
    }
  }
}
@media (max-width: 462px) {
  .Homeview {
    .Third {
      .ThirdBg {
        height: 181.675px;
      }
    }
  }
}
</style>