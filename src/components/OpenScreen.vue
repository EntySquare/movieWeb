<template>
  <div class="Homeview">
    <div ref="containerRef" class="Homeview_content">
      <div id="part1">
        <div class="scroll_content_y">
          <img class="part1_img1" src="@/assets/images/home/img1.png" alt="" />
          <img class="part1_img1" src="@/assets/images/home/img1.png" alt="" />
        </div>
        <div class="part1_section">
          <img class="part1_img2" src="@/assets/images/home/img2.png" alt="" />
          <div class="part1_section_content">
            <div class="psc_head">
              <div class="psc_head_text">
                <div>Movie AI</div>
                <div>a New Paradigm</div>
                <div>for the Web3</div>
                <div>Entertainment Economy</div>
              </div>
              <img src="@/assets/images/home/img4.png" alt="" />
            </div>
            <div class="scroll_content_x">
              <img
                class="part1_img5"
                src="@/assets/images/home/img5.png"
                alt=""
              />
              <img
                class="part1_img5"
                src="@/assets/images/home/img5.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="scroll_content_ry">
          <img class="part1_img6" src="@/assets/images/home/img6.png" alt="" />
          <img class="part1_img6" src="@/assets/images/home/img6.png" alt="" />
        </div>
      </div>
      <div id="part2">
        <div class="part2_title">
          <div>
            Project Introduction
            <img src="@/assets/images/home/img7.png" alt="" />
          </div>
        </div>
        <div class="part2_section">
          <div class="part2_section_text">
            <div>Project<br />Introduction</div>
            <div></div>
            <div>
              MOVIE AI leverages blockchain technology and AI innovation to
              reshape the film and entertainment ecosystem, empower the fan
              economy, and create a new decentralized model for movie investment
              and interaction.
            </div>
          </div>
          <img src="@/assets/images/home/img9.png" alt="" />
          <div class="part2_section_text">
            <div>Core VALUEs<br />and Vision</div>
            <div></div>
            <div>
              By harnessing the traffic from the film industry and fan
              communities, and integrating AI technology, it aims to build a
              Web3 digital entertainment ecosystem.
            </div>
          </div>
        </div>
      </div>
      <div id="part3">
        <div class="part3_title">
          <div>
            Team Introduction
            <img src="@/assets/images/home/img7.png" alt="" />
          </div>
        </div>
        <div class="part3_list">
          <div class="part3_list_item1">
            <div class="pli_top">
              <div class="plit_tip">YAO Meng</div>
              <img src="@/assets/images/home/img12.png" alt="" />
            </div>
            <div class="pli_text">
              Veteran Film Investor and Producer in the Chinese-speaking Market
            </div>
            <div class="pli_subtext">
              Over 10 years of experience in the Chinese film industry, leading
              investments and production of major box office hits. Notable
              works: Involved in blockbuster films like Operation Red Sea and
              The Wandering Earth, with total box office exceeding 5 billion
              RMB. Industry influence: Long-term collaborator with top directors
              such as Zhang Yimou and Chen Sicheng, with deep expertise across
              the full film pipeline. Specialties: Skilled in capital
              integration and marketing strategies, contributing to the global
              reach of Chinese cinema.
            </div>
          </div>
          <div class="part3_list_item2">
            <div class="pli_top">
              <div class="plit_tip">ANna wu</div>
              <img src="@/assets/images/home/img14.png" alt="" />
            </div>
            <div class="pli_text">
              Veteran Hollywood Film Finance Expert Producer
            </div>
            <div class="pli_subtext">
              5+ years in senior roles at top Hollywood studios and private
              equity firms, with over $1B in film financing. Key projects: Fast
              & Furious, Transformers. Worked closely with Paramount and
              Universal; well-connected across the U.S. film industry. Expert in
              global IP financing, box office revenue models, and the Hollywood
              production ecosystem.
            </div>
          </div>
          <div class="part3_list_item3">
            <div class="pli_top">
              <div class="plit_tip">LEAN YU</div>
              <img src="@/assets/images/home/img16.png" alt="" />
            </div>
            <div class="pli_text">CEO</div>
            <div class="pli_subtext">
              Over 5 years of Web3 investment and operations experience as a
              senior executive at a fund, with $5M+ in investments. Previously
              worked in Web2 operations, skilled in project planning and growth.
              Investments: UtilityNet, Coresky, Depinsim, Planet Hares, etc.
              Web2 ops: TikTok JP, HKAIlA, Alutopia.
            </div>
          </div>
          <div class="part3_list_item4">
            <div class="pli_top">
              <div class="plit_tip">Gaaiwing Wong</div>
              <img src="@/assets/images/home/img18.png" alt="" />
            </div>
            <div class="pli_text">CTO</div>
            <div class="pli_subtext">
              Ph.D. in Mechanical Engineering from the University of Colorado
              Boulder, with a strong interdisciplinary background in physics and
              engineering. Fluent in Golang, C++, Solidity, and Rust. Led
              development of distributed storage algorithms, Web3 dApps, and AI
              computing chain miner systems. Recipient of Ivy League physics
              awards and research scholarships from top global universities.
            </div>
          </div>
        </div>
      </div>
      <div id="part4">
        <div class="part4_title">
          <div>
            PRODUCT FEATURES
            <img src="@/assets/images/home/img19.png" alt="" />
          </div>
        </div>
        <div class="part4_card">
          <div
            class="part4_card_item1"
            :class="hoverIndex === 0 ? 'active' : ''"
            @mouseenter="hoverIndex = 0"
            @mouseleave="hoverIndex = 0"
          >
            <div class="pci_text">
              <div>WEB2</div>
              <div>
                Creates immersive fan experiences by combining film events,
                celebrity interactions, and limited-edition merchandise, driving
                traffic and user engagement both online and offline.
              </div>
            </div>
          </div>
          <div
            class="part4_card_item2"
            :class="hoverIndex === 1 ? 'active' : ''"
            @mouseenter="hoverIndex = 1"
            @mouseleave="hoverIndex = 0"
          >
            <div class="pci_text">
              <div>WEB3</div>
              <div>
                Builds a decentralized film investment ecosystem using
                blockchain and NFT technology, leveraging tokenized rights and
                community-driven models to reshape fan economy value.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="part5">
        <div class="part5_title">WEB2 Features</div>
        <div class="part5_line"></div>
        <div class="part5_list">
          <div
            v-for="(item, index) in web2ImagesList"
            :key="index"
            class="part5_list_item"
          >
            <img :src="item.image" alt="" />
            <div class="part5_list_item_title">{{ item.title }}</div>
            <div class="part5_list_item_subtitle">{{ item.subTitle }}</div>
          </div>
        </div>
      </div>
      <div id="part6">
        <img src="@/assets/images/home/img28.png" alt="" class="part6_image" />
        <div class="part6_section">
          <div class="part6_section_title">WEB3 Features</div>
          <div class="part6_section_line"></div>
          <div class="part6_section_subtitle">OG PASS PFP</div>
          <div class="part6_section_text">
            The OG Pass PFP is an NFT avatar serving as a membership card for
            film projects. Holders gain access to exclusive movie perks and
            participation opportunities. Each NFT represents a unique digital
            identity, giving fans a special status within the project.
          </div>
          <div class="part6_list">
            <div
              v-for="(item, index) in web3ImagesList"
              :key="index"
              class="part6_list_item"
            >
              <img :src="item.image" alt="" />
              <div class="part6_list_item_title">{{ item.title }}</div>
              <div class="part6_list_item_subtitle">{{ item.subTitle }}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="part7">
        <div class="part7_content">
          <div class="part7_content_head">
            <div class="p7ch_left">
              RWA BENEFITS
              <img src="@/assets/images/home/img34.png" alt="" />
            </div>
            <div class="p7ch_right">
              Tokenizes movie box office revenue rights on the blockchain,
              enabling users to invest with low entry barriers and share in the
              profits.
            </div>
          </div>
          <div class="part7_content_subhead">Rights & Mechanisms</div>
          <div class="part7_content_card">
            <div class="p7cc_item">
              <div>No.1</div>
              <div>
                Issued around film projects, users participate in revenue
                sharing by purchasing RWA.
              </div>
            </div>
            <div class="p7cc_item">
              <div>No.2</div>
              <div>
                RWA holders can earn a share of movie box office profits,
                typically 20% of total revenue.
              </div>
            </div>
            <div class="p7cc_item">
              <div>No.3</div>
              <div>
                Box office profits are settled and distributed to RWA holders
                within 6 months after the film’s theatrical run ends.
              </div>
            </div>
            <div class="p7cc_item">
              <div>No.4</div>
              <div>
                Early investors receive priority access to RWA subscriptions and
                a share of project profits.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="part8">
        <div class="part8_title">
          <div>
            MEME TOken
            <img src="@/assets/images/home/img35.png" alt="" />
          </div>
        </div>
        <div class="part8_text">PUMP Explanation</div>
        <div class="part8_subtext">
          Pump is a method of rapidly increasing a token’s price through
          community-driven hype and market speculation, typically fueled by
          social media and KOL promotions.
        </div>
        <div class="statistical_chart">
          <div class="statistical_chart_relative">
            <img class="scr_img" src="@/assets/images/home/img37.png" alt="" />
            <div class="statistical_chart_absolute1">
              <div>50%</div>
              <div>Lock-up Period Includes</div>
              <div class="sca_text">
                OG Pass PFP holders have priority access to subscribe to movie
                box office revenue rights (RWA).
              </div>
              <div class="sca_card">
                <div class="sca_card_head">15% Venture Capital</div>
                <div class="sca_card_subhead">
                  1. 10% Seed & Strategic Rounds
                </div>
                <div class="sca_card_text">
                  10% released at TGE (Token Generation Event), remaining tokens
                  linearly unlocked over 15 months.
                </div>
                <div class="sca_card_subhead">
                  2. 5% Public Sale (Whitelist Offering)
                </div>
                <div class="sca_card_text">
                  20% released at TGE, remaining tokens linearly unlocked over
                  12 months.
                </div>
                <div class="sca_card_head" style="margin-top: 24px">
                  35% Linear Unlock Over 3 Years
                </div>
                <div class="sca_card_text">
                  OG Pass PFP holders have priority access to subscribe to movie
                  box office revenue rights (RWA).
                </div>
              </div>
            </div>
            <div class="statistical_chart_absolute2">
              <div>30%</div>
              <div>Pump<span>（Offline Events & Livestream Pump）</span></div>
              <div class="sca_text">
                OG Pass PFP holders have priority access to subscribe to movie
                box office revenue rights (RWA).
              </div>
            </div>
            <div class="statistical_chart_absolute3">
              <div>10% Market Maker</div>
              <div class="sca_text">
                Used to maintain market price stability and enhance liquidity
                through market maker operations.
              </div>
            </div>
            <div class="statistical_chart_absolute4">
              <div>5% Market</div>
              <div class="sca_text">
                NFT Airdrop: Attracts and expands the community user base.
                Community Partnerships: Collaborates with other projects or
                platforms to boost market exposure.
              </div>
            </div>
          </div>
          <img class="sca_img" src="@/assets/images/home/img38.png" alt="" />
        </div>
      </div>
      <div id="part9">
        <div class="part9_title">
          <div>
            BUSINESS SEGMENT<br />
            FILM PROMOTION CASES
            <img src="@/assets/images/home/img39.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="fixed_content">
      <el-anchor
        :container="containerRef"
        direction="vertical"
        type="default"
        :offset="0"
        @click="handleClick"
      >
        <el-anchor-link href="#part1" title="Home" />
        <el-anchor-link href="#part2" title="Project introduction" />
        <el-anchor-link href="#part4" title="Product features" />
        <el-anchor-link href="#part7" title="RWA benefits" />
        <el-anchor-link href="#part8" title="MEME token" />
        <el-anchor-link
          href="#part9"
          title="Business segment film promotion cases"
        />
        <el-anchor-link href="#part10" title="AI KOL" />
        <el-anchor-link href="#part11" title="Operation rhythm" />
        <el-anchor-link href="#part12" title="Market opportunities" />
      </el-anchor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@/utils/useWindowSize";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Image22 from "@/assets/images/home/img22.png";
import Image23 from "@/assets/images/home/img23.png";
import Image24 from "@/assets/images/home/img24.png";
import Image25 from "@/assets/images/home/img25.png";
import Image26 from "@/assets/images/home/img26.png";
import Image27 from "@/assets/images/home/img27.png";
import Image29 from "@/assets/images/home/img29.png";
import Image30 from "@/assets/images/home/img30.png";
import Image31 from "@/assets/images/home/img31.png";
import Image32 from "@/assets/images/home/img32.png";

const { windowWidth } = useWindowSize();
const { t } = useI18n();
const containerRef = ref<HTMLElement | null>(null);
// 默认选中第一个锚点
const hoverIndex = ref(0);
const web2ImagesList = [
  {
    image: Image22,
    title: "Movie Event Ticket Sales",
    subTitle:
      "Sells movie event tickets online, with integrated raffles to enhance user participation.",
  },
  {
    image: Image23,
    title: "Movie Event Ticket Sales",
    subTitle:
      "Sells movie event tickets online, with integrated raffles to enhance user participation.",
  },
  {
    image: Image24,
    title: "Movie Event Ticket Sales",
    subTitle:
      "Sells movie event tickets online, with integrated raffles to enhance user participation.",
  },
  {
    image: Image25,
    title: "Movie Event Ticket Sales",
    subTitle:
      "Sells movie event tickets online, with integrated raffles to enhance user participation.",
  },
  {
    image: Image26,
    title: "Movie Event Ticket Sales",
    subTitle:
      "Sells movie event tickets online, with integrated raffles to enhance user participation.",
  },
  {
    image: Image27,
    title: "Movie Event Ticket Sales",
    subTitle:
      "Sells movie event tickets online, with integrated raffles to enhance user participation.",
  },
];
const web3ImagesList = [
  {
    image: Image29,
    title: "Priority Access to RWA Subscriptions",
    subTitle:
      "OG Pass PFP holders have priority access to subscribe to movie box office revenue rights (RWA).",
  },
  {
    image: Image30,
    title: "Priority Access to RWA Subscriptions",
    subTitle:
      "OG Pass PFP holders have priority access to subscribe to movie box office revenue rights (RWA).",
  },
  {
    image: Image31,
    title: "Priority Access to RWA Subscriptions",
    subTitle:
      "OG Pass PFP holders have priority access to subscribe to movie box office revenue rights (RWA).",
  },
  {
    image: Image32,
    title: "Priority Access to RWA Subscriptions",
    subTitle:
      "OG Pass PFP holders have priority access to subscribe to movie box office revenue rights (RWA).",
  },
];

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
};
</script>

<style scoped lang="less">
.el-anchor {
  background-color: rgba(22, 0, 24, 1) !important;
}
:deep(.el-anchor__marker) {
  display: none !important;
}
:deep(.el-anchor__link) {
  color: rgba(255, 255, 255, 0.5) !important;
}
:deep(.el-anchor.el-anchor--vertical .el-anchor__list) {
  padding-left: 0px !important;
}
:deep(.el-anchor__link.is-active) {
  color: rgba(211, 57, 196, 1) !important;
}
:deep(.el-anchor__link) {
  white-space: normal;
}
.Homeview {
  width: 100%;
  max-width: 1920px;
  margin: auto;
  display: flex;
  .Homeview_content {
    width: 100%;
    height: calc(100vh - 88px);
    overflow-y: auto;
    #part1 {
      width: 100%;
      height: 878px;
      display: flex;
      overflow: hidden;
      .scroll_content_y {
        height: 100%;
        display: flex;
        flex-direction: column;
        animation: scrollDown 20s linear infinite;
      }
      .scroll_content_ry {
        height: 100%;
        display: flex;
        flex-direction: column;
        animation: scrollTop 20s linear infinite;
      }
      .part1_img1 {
        width: 47px;
        margin-left: 80px;
        margin-right: 89px;
      }
      .part1_img6 {
        width: 47px;
        margin-left: 126px;
        margin-right: 80px;
      }
      .part1_section {
        flex: 1;
        height: 100%;
        display: flex;
        .part1_img2 {
          width: 37%;
          max-width: 535px;
          max-height: 735px;
          aspect-ratio: 535 / 735;
          margin-top: 112px;
        }
        .part1_section_content {
          width: 63%;
          overflow: hidden;
          .psc_head {
            width: 100%;
            height: 737px;
            margin-top: 32px;
            background: url("@/assets/images/home/img3.png") no-repeat;
            background-size: cover;
            display: flex;
            align-items: flex-end;
            .psc_head_text {
              width: 86%;
              height: 100%;
              div {
                &:first-child {
                  font-family: Montserrat;
                  font-weight: 800;
                  font-size: 132px;
                  line-height: 100%;
                  letter-spacing: 0%;
                  text-transform: uppercase;
                  color: rgba(167, 88, 180, 1);
                  padding: 45px 0 102px 23px;
                }
                &:nth-child(2) {
                  font-family: Montserrat;
                  font-weight: 700;
                  font-size: 48px;
                  line-height: 150%;
                  letter-spacing: 0%;
                  text-transform: uppercase;
                  color: rgba(255, 255, 255, 1);
                  padding-left: 33px;
                }
                &:nth-child(3) {
                  font-family: Montserrat;
                  font-weight: 700;
                  font-size: 48px;
                  line-height: 150%;
                  letter-spacing: 0%;
                  text-transform: uppercase;
                  color: rgba(167, 88, 180, 1);
                  padding-left: 33px;
                }
                &:last-child {
                  font-family: Montserrat;
                  font-weight: 700;
                  font-size: 48px;
                  line-height: 150%;
                  letter-spacing: 0%;
                  text-transform: uppercase;
                  color: rgba(167, 88, 180, 1);
                  padding-left: 33px;
                }
              }
            }
            img {
              width: 15px;
              height: 505px;
              margin-bottom: 24px;
            }
          }
          .scroll_content_x {
            width: 100%;
            display: flex;
            animation: scrollLeft 20s linear infinite;
            .part1_img5 {
              min-width: 100%;
              max-width: 100%;
            }
          }
        }
      }
    }
    #part2 {
      width: 100%;
      padding-top: 157px;
      background-image: url("@/assets/images/home/img8.png");
      background-repeat: no-repeat;
      background-position: left bottom;
      background-size: 100%;
      .part2_title {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          width: max-content;
          font-family: Montserrat;
          font-weight: 800;
          font-size: 48px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: center;
          text-transform: uppercase;
          color: rgba(239, 207, 246, 1);
          position: relative;
          img {
            width: 112px;
            height: 40px;
            position: absolute;
            top: 29px;
            right: -65px;
          }
        }
      }
      .part2_section {
        display: flex;
        justify-content: center;
        padding-top: 67px;
        .part2_section_text {
          max-width: 275px;
          position: relative;
          &:first-child {
            top: 48px;
            right: -80px;
          }
          &:last-child {
            top: 130px;
            left: -40px;
          }
          div {
            &:first-child {
              font-family: Montserrat;
              font-weight: 700;
              font-size: 24px;
              line-height: 100%;
              letter-spacing: 0%;
              text-transform: uppercase;
              background-image: linear-gradient(
                to bottom,
                rgba(211, 57, 196, 1),
                rgba(109, 30, 101, 1)
              );
              -webkit-background-clip: text; /* 将背景裁剪到文字 */
              -webkit-text-fill-color: transparent; /* 让文字本身透明显示背景 */
            }
            &:nth-child(2) {
              margin: 14px 0;
              width: 48px;
              height: 1px;
              background-color: rgba(211, 57, 196, 1);
            }
            &:last-child {
              font-family: Montserrat;
              font-weight: 400;
              font-size: 16px;
              line-height: 140%;
              letter-spacing: 0%;
              color: #c2c0c2;
            }
          }
        }
      }
    }
    #part3 {
      width: 100%;
      padding-top: 157px;
      .part3_title {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          width: max-content;
          font-family: Montserrat;
          font-weight: 800;
          font-size: 48px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: center;
          text-transform: uppercase;
          color: rgba(239, 207, 246, 1);
          position: relative;
          img {
            width: 112px;
            height: 40px;
            position: absolute;
            top: 29px;
            right: -65px;
          }
        }
      }
      .part3_list {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-top: 91px;

        .part3_list_item1 {
          .pli_top {
            width: 200px;
            height: 200px;
            position: relative;
            background: url("@/assets/images/home/img11.png") no-repeat;
            background-size: cover;
            .plit_tip {
              width: max-content;
              border: 1px solid rgba(51, 51, 51, 1);
              font-family: Montserrat;
              font-weight: 400;
              font-size: 16px;
              line-height: 100%;
              letter-spacing: 5%;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 1);
              padding: 8px;
              background: url("@/assets/images/home/img10.png") no-repeat;
              background-size: cover;
              position: absolute;
              top: 4px;
              left: 4px;
              z-index: 2;
            }
            img {
              position: absolute;
              width: 129px;
              height: 34px;
              top: -10px;
              right: 30px;
              z-index: 3;
            }
          }
          .pli_text {
            width: 280px;
            margin: 30px 0 6px;
            font-family: Montserrat;
            font-weight: 700;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0%;
            text-transform: uppercase;
            color: rgba(211, 57, 196, 1);
          }
          .pli_subtext {
            width: 280px;
            font-family: Montserrat;
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 0.5);
          }
        }
        .part3_list_item2 {
          .pli_top {
            width: 200px;
            height: 200px;
            position: relative;
            background: url("@/assets/images/home/img13.png") no-repeat;
            background-size: cover;
            left: -14px;
            .plit_tip {
              width: max-content;
              border: 1px solid rgba(51, 51, 51, 1);
              font-family: Montserrat;
              font-weight: 400;
              font-size: 16px;
              line-height: 100%;
              letter-spacing: 5%;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 1);
              padding: 8px;
              background: url("@/assets/images/home/img10.png") no-repeat;
              background-size: cover;
              position: absolute;
              top: 4px;
              left: 16px;
              z-index: 2;
            }
            img {
              position: absolute;
              width: 34px;
              height: 128px;
              left: 0px;
              bottom: -20px;
              z-index: 3;
              transform: rotate(-30deg);
            }
          }
          .pli_text {
            width: 280px;
            margin: 30px 0 6px;
            font-family: Montserrat;
            font-weight: 700;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0%;
            text-transform: uppercase;
            color: rgba(211, 57, 196, 1);
          }
          .pli_subtext {
            width: 280px;
            font-family: Montserrat;
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 0.5);
          }
        }
        .part3_list_item3 {
          .pli_top {
            width: 200px;
            height: 200px;
            position: relative;
            background: url("@/assets/images/home/img15.png") no-repeat;
            background-size: cover;
            left: -14px;
            .plit_tip {
              width: max-content;
              border: 1px solid rgba(51, 51, 51, 1);
              font-family: Montserrat;
              font-weight: 400;
              font-size: 16px;
              line-height: 100%;
              letter-spacing: 5%;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 1);
              padding: 8px;
              background: url("@/assets/images/home/img10.png") no-repeat;
              background-size: cover;
              position: absolute;
              top: 4px;
              left: 16px;
              z-index: 2;
            }
            img {
              position: absolute;
              width: 34px;
              height: 128px;
              top: -37px;
              right: 15px;
              z-index: 3;
              transform: rotate(-38deg);
            }
          }
          .pli_text {
            width: 280px;
            margin: 30px 0 6px;
            font-family: Montserrat;
            font-weight: 700;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0%;
            text-transform: uppercase;
            color: rgba(211, 57, 196, 1);
          }
          .pli_subtext {
            width: 280px;
            font-family: Montserrat;
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 0.5);
          }
        }
        .part3_list_item4 {
          .pli_top {
            width: 200px;
            height: 200px;
            position: relative;
            background: url("@/assets/images/home/img17.png") no-repeat;
            background-size: cover;
            left: -14px;
            .plit_tip {
              width: max-content;
              border: 1px solid rgba(51, 51, 51, 1);
              font-family: Montserrat;
              font-weight: 400;
              font-size: 16px;
              line-height: 100%;
              letter-spacing: 5%;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 1);
              padding: 8px;
              background: url("@/assets/images/home/img10.png") no-repeat;
              background-size: cover;
              position: absolute;
              top: 4px;
              left: 16px;
              z-index: 2;
            }
            img {
              position: absolute;
              width: 148px;
              height: 39px;
              bottom: 10px;
              right: -30px;
              z-index: 3;
              transform: rotate(160deg);
            }
          }
          .pli_text {
            width: 280px;
            margin: 30px 0 6px;
            font-family: Montserrat;
            font-weight: 700;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0%;
            text-transform: uppercase;
            color: rgba(211, 57, 196, 1);
          }
          .pli_subtext {
            width: 280px;
            font-family: Montserrat;
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
    #part4 {
      width: 100%;
      padding-top: 132px;
      .part4_title {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          width: max-content;
          font-family: Montserrat;
          font-weight: 800;
          font-size: 48px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: center;
          text-transform: uppercase;
          color: rgba(239, 207, 246, 1);
          position: relative;
          img {
            width: 112px;
            height: 40px;
            position: absolute;
            top: 29px;
            right: -36px;
          }
        }
      }
      .part4_card {
        display: flex;
        justify-content: center;
        margin-top: 81px;
        .part4_card_item1 {
          width: 640px;
          height: 480px;
          border: 1px solid rgba(60, 59, 59, 1);
          background: url("@/assets/images/home/img20.png") no-repeat;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .part4_card_item2 {
          width: 640px;
          height: 480px;
          border: 1px solid rgba(60, 59, 59, 1);
          background: url("@/assets/images/home/img21.png") no-repeat;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pci_text {
          max-width: 400px;
          div {
            &:first-child {
              font-family: Montserrat;
              font-weight: 700;
              font-size: 32px;
              line-height: 150%;
              letter-spacing: 0%;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 0.5);
              padding-bottom: 16px;
            }
            &:last-child {
              font-family: Montserrat;
              font-weight: 400;
              font-size: 20px;
              line-height: 150%;
              letter-spacing: 0%;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
        .active {
          border: 1px solid rgba(211, 57, 196, 1);
          .pci_text {
            div {
              &:first-child {
                color: rgba(211, 57, 196, 1);
              }
              &:last-child {
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
    }
    #part5 {
      width: 100%;
      max-width: 1280px;
      margin: auto;
      padding-top: 120px;
      .part5_title {
        font-family: Montserrat;
        font-weight: 800;
        font-size: 40px;
        line-height: 100%;
        letter-spacing: 0%;
        text-transform: uppercase;
        color: rgba(173, 104, 185, 1);
      }
      .part5_line {
        width: 100%;
        height: 1px;
        background-color: rgba(84, 37, 92, 1);
        margin: 64px 0;
      }
      .part5_list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 160px 120px;
        .part5_list_item {
          img {
            width: 32px;
            height: 32px;
          }
          .part5_list_item_title {
            padding: 16px 0;
            font-family: Montserrat;
            font-weight: 500;
            font-size: 20px;
            line-height: 150%;
            letter-spacing: 0%;
            text-transform: uppercase;
            color: rgba(211, 57, 196, 1);
          }
          .part5_list_item_subtitle {
            font-family: Montserrat;
            font-weight: 500;
            font-size: 14px;
            line-height: 150%;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
    #part6 {
      width: 100%;
      max-width: 1280px;
      margin: auto;
      padding-top: 120px;
      display: flex;
      .part6_image {
        width: 445px;
        aspect-ratio: 445 / 713;
        margin-right: 36px;
      }
      .part6_section {
        flex: 1;
        .part6_section_title {
          font-family: Montserrat;
          font-weight: 800;
          font-size: 40px;
          line-height: 100%;
          letter-spacing: 0%;
          text-transform: uppercase;
          color: rgba(173, 104, 185, 1);
        }
        .part6_section_line {
          width: 100%;
          height: 1px;
          background-color: rgba(84, 37, 92, 1);
          margin: 64px 0;
        }
        .part6_section_subtitle {
          font-family: Montserrat;
          font-weight: 700;
          font-size: 32px;
          line-height: 150%;
          letter-spacing: 0%;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 1);
        }
        .part6_section_text {
          padding: 16px 0 64px;
          font-family: Montserrat;
          font-weight: 500;
          font-size: 16px;
          line-height: 150%;
          letter-spacing: 0%;
          color: rgba(255, 255, 255, 0.8);
        }
        .part6_list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px;
          .part6_list_item {
            img {
              width: 32px;
              height: 32px;
            }
            .part6_list_item_title {
              padding: 16px 0;
              font-family: Montserrat;
              font-weight: 500;
              font-size: 20px;
              line-height: 150%;
              letter-spacing: 0%;
              text-transform: uppercase;
              color: rgba(211, 57, 196, 1);
            }
            .part6_list_item_subtitle {
              font-family: Montserrat;
              font-weight: 500;
              font-size: 14px;
              line-height: 150%;
              letter-spacing: 0%;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
      }
    }
    #part7 {
      width: 100%;
      height: max-content;
      background: url("@/assets/images/home/img33.png") no-repeat;
      background-size: cover;
      margin-top: 120px;
      .part7_content {
        width: 100%;
        max-width: 1280px;
        margin: auto;
        .part7_content_head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 60px 0 140px;
          .p7ch_left {
            position: relative;
            font-family: Montserrat;
            font-weight: 800;
            font-size: 48px;
            line-height: 100%;
            letter-spacing: 0%;
            text-align: right;
            text-transform: uppercase;
            color: rgba(239, 207, 246, 1);
            img {
              width: 93px;
              height: 40px;
              position: absolute;
              bottom: -10px;
              right: -66px;
            }
          }
          .p7ch_right {
            max-width: 600px;
            font-family: Montserrat;
            font-weight: 500;
            font-size: 16px;
            line-height: 150%;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 0.8);
          }
        }
        .part7_content_subhead {
          font-family: Montserrat;
          font-weight: 700;
          font-size: 24px;
          line-height: 150%;
          letter-spacing: 0%;
          text-transform: uppercase;
          color: rgba(173, 104, 185, 1);
        }
        .part7_content_card {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px;
          padding: 48px 0 135px;
          .p7cc_item {
            border: 1px solid rgba(207, 113, 222, 1);
            border-radius: 12px;
            padding: 8px;
            background: linear-gradient(263.64deg, #901d9a 0%, #3f0044 96.52%);
            div {
              &:first-child {
                font-family: Montserrat;
                font-weight: 700;
                font-size: 16px;
                line-height: 150%;
                letter-spacing: 0%;
                text-transform: uppercase;
                color: rgba(173, 104, 185, 1);
                margin-bottom: 8px;
              }
              &:last-child {
                width: 100%;
                min-height: 96px;
                background-color: rgba(18, 3, 18, 1);
                border-radius: 8px;
                padding: 12px;
                box-sizing: border-box;
                font-family: Montserrat;
                font-weight: 500;
                font-size: 16px;
                line-height: 150%;
                letter-spacing: 0%;
                text-transform: uppercase;
                color: rgba(255, 255, 255, 0.8);
              }
            }
          }
        }
      }
    }
    #part8 {
      width: 100%;
      max-width: 1280px;
      margin: auto;
      margin-top: 120px;
      .part8_title {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 79px;
        div {
          width: max-content;
          font-family: Montserrat;
          font-weight: 800;
          font-size: 48px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: center;
          text-transform: uppercase;
          color: rgba(239, 207, 246, 1);
          position: relative;
          img {
            width: 112px;
            height: 40px;
            position: absolute;
            top: 29px;
            right: -65px;
          }
        }
      }
      .part8_text {
        font-family: Montserrat;
        font-weight: 700;
        font-size: 32px;
        line-height: 150%;
        letter-spacing: 0%;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 1);
      }
      .part8_subtext {
        max-width: 625px;
        padding: 16px 0 28px;
        font-family: Montserrat;
        font-weight: 500;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: 0%;
        color: rgba(255, 255, 255, 0.8);
      }
      .statistical_chart {
        width: 100%;
        padding-left: 96px;
        box-sizing: border-box;
        position: relative;
        .statistical_chart_relative {
          width: 822px;
          height: 520px;
          position: relative;
          .scr_img {
            width: 100%;
            height: 100%;
          }
          .statistical_chart_absolute1 {
            max-width: 288px;
            position: absolute;
            top: 54px;
            left: -70px;
            & > div {
              font-family: Montserrat;
              font-weight: 700;
              font-size: 24px;
              line-height: 150%;
              letter-spacing: 0%;
              text-transform: uppercase;
              color: rgba(211, 57, 196, 1);
            }
            .sca_text {
              margin-top: 4px;
              font-family: Montserrat;
              font-weight: 500;
              font-size: 12px;
              line-height: 150%;
              letter-spacing: 0%;
              color: rgba(255, 255, 255, 0.5);
            }
            .sca_card {
              max-width: 335px;
              padding: 16px;
              margin-top: 28px;
              box-sizing: border-box;
              border: 1px solid rgba(80, 32, 75, 1);
              border-radius: 4px;
              background-color: rgba(211, 57, 196, 0.11);
              .sca_card_head {
                font-family: Montserrat;
                font-weight: 700;
                font-size: 16px;
                line-height: 150%;
                letter-spacing: 0%;
                text-transform: uppercase;
                color: rgba(173, 104, 185, 1);
              }
              .sca_card_subhead {
                font-family: Montserrat;
                font-weight: 400;
                font-size: 12px;
                line-height: 150%;
                letter-spacing: 0%;
                color: rgba(255, 255, 255, 0.8);
              }
              .sca_card_text {
                font-family: Montserrat;
                font-weight: 400;
                font-size: 12px;
                line-height: 150%;
                letter-spacing: 0%;
                color: rgba(255, 255, 255, 0.5);
              }
            }
          }
          .statistical_chart_absolute2 {
            min-width: 347px;
            max-width: 347px;
            position: absolute;
            top: -16px;
            left: calc(100% + 15px);
            & > div {
              font-family: Montserrat;
              font-weight: 700;
              font-size: 24px;
              line-height: 150%;
              letter-spacing: 0%;
              text-transform: uppercase;
              color: rgba(211, 57, 196, 1);
              span {
                font-size: 16px;
              }
            }
            .sca_text {
              margin-top: 4px;
              font-family: Montserrat;
              font-weight: 500;
              font-size: 12px;
              line-height: 150%;
              letter-spacing: 0%;
              color: rgba(255, 255, 255, 0.5);
            }
          }
          .statistical_chart_absolute3 {
            min-width: 347px;
            max-width: 347px;
            position: absolute;
            top: 203px;
            left: calc(100% + 15px);
            & > div {
              font-family: Montserrat;
              font-weight: 700;
              font-size: 24px;
              line-height: 150%;
              letter-spacing: 0%;
              text-transform: uppercase;
              color: rgba(211, 57, 196, 1);
            }
            .sca_text {
              margin-top: 4px;
              font-family: Montserrat;
              font-weight: 500;
              font-size: 12px;
              line-height: 150%;
              letter-spacing: 0%;
              color: rgba(255, 255, 255, 0.5);
            }
          }
          .statistical_chart_absolute4 {
            min-width: 347px;
            max-width: 347px;
            position: absolute;
            top: 332.5px;
            left: calc(100% + 15px);
            & > div {
              font-family: Montserrat;
              font-weight: 700;
              font-size: 24px;
              line-height: 150%;
              letter-spacing: 0%;
              text-transform: uppercase;
              color: rgba(211, 57, 196, 1);
            }
            .sca_text {
              margin-top: 4px;
              font-family: Montserrat;
              font-weight: 500;
              font-size: 12px;
              line-height: 150%;
              letter-spacing: 0%;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
        .sca_img {
          width: 88px;
          height: 32px;
          position: absolute;
          top: 263.5px;
          left: 581px;
        }
      }
    }
    #part9 {
      width: 100%;
      max-width: 1280px;
      margin: auto;
      margin-top: 203px;
      .part9_title {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          width: max-content;
          font-family: Montserrat;
          font-weight: 800;
          font-size: 48px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: center;
          text-transform: uppercase;
          color: rgba(239, 207, 246, 1);
          position: relative;
          img {
            width: 172px;
            height: 32px;
            position: absolute;
            bottom: -2px;
            right: -86px;
          }
        }
      }
    }
  }
  .fixed_content {
    max-width: 164px;
    position: fixed;
    top: 333px;
    right: 16px;
    border: 1px solid rgba(173, 104, 185, 1);
    background-color: rgba(22, 0, 24, 1);
    border-radius: 4px;
    padding: 12px;
  }
}
/* 动画关键帧 */
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
/* 动画关键帧 */
@keyframes scrollLeft {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
