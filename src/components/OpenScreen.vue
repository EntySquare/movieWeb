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
            <div class="pli_alltext">
              <div class="pli_text">
                Veteran Film Investor and Producer in the Chinese-speaking
                Market
              </div>
              <div class="pli_subtext">
                <span
                  >Over 10 years of experience in the Chinese film industry,
                  leading investments and production of major </span
                ><span
                  >box office hits. Notable works: Involved in blockbuster films
                  like Operation Red Sea and The Wandering Earth, with total box
                  office exceeding 5 billion RMB. Industry influence: Long-term
                  collaborator with top directors such as Zhang Yimou and Chen
                  Sicheng, with deep expertise across the full film pipeline.
                  Specialties: Skilled in capital integration and marketing
                  strategies, contributing to the global reach of Chinese
                  cinema.</span
                >
              </div>
            </div>
          </div>
          <div class="part3_list_item2">
            <div class="pli_top">
              <div class="plit_tip">ANna wu</div>
              <img src="@/assets/images/home/img14.png" alt="" />
            </div>
            <div class="pli_alltext">
              <div class="pli_text">
                Veteran Hollywood Film Finance Expert Producer
              </div>
              <div class="pli_subtext">
                <span
                  >5+ years in senior roles at top Hollywood studios and private
                  equity firms, with over $1B in film financing. Key projects:
                  Fast & Furious, </span
                ><span
                  >Transformers. Worked closely with Paramount and Universal;
                  well-connected across the U.S. film industry. Expert in global
                  IP financing, box office revenue models, and the Hollywood
                  production ecosystem.</span
                >
              </div>
            </div>
          </div>
          <div class="part3_list_item3">
            <div class="pli_top">
              <div class="plit_tip">LEAN YU</div>
              <img src="@/assets/images/home/img16.png" alt="" />
            </div>
            <div class="pli_alltext">
              <div class="pli_text">CEO</div>
              <div class="pli_subtext">
                <span
                  >Over 5 years of Web3 investment and operations experience as
                  a senior executive at a fund, with $5M+ in investments.
                  Previously worked in Web2 operations, skilled in project
                  planning and growth. </span
                ><span
                  >Investments: UtilityNet, Coresky, Depinsim, Planet Hares,
                  etc. Web2 ops: TikTok JP, HKAIlA, Alutopia.</span
                >
              </div>
            </div>
          </div>
          <div class="part3_list_item4">
            <div class="pli_top">
              <div class="plit_tip">Gaaiwing Wong</div>
              <img src="@/assets/images/home/img18.png" alt="" />
            </div>
            <div class="pli_alltext">
              <div class="pli_text">CTO</div>
              <div class="pli_subtext">
                <span
                  >Ph.D. in Mechanical Engineering from the University of
                  Colorado Boulder, with a strong interdisciplinary background
                  in physics and engineering. Fluent in Golang, C++, Solidity,
                  and Rust. Led development of distributed storage </span
                ><span
                  >algorithms, Web3 dApps, and AI computing chain miner systems.
                  Recipient of Ivy League physics awards and research
                  scholarships from top global universities.</span
                >
              </div>
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
        <div class="part6_mobile_title">WEB3 Features</div>
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
              <div class="p7cc_item_text">
                Box office profits are settled and distributed to RWA holders
                within 6 months after the film’s theatrical run ends.
              </div>
            </div>
            <div class="p7cc_item">
              <div>No.4</div>
              <div class="p7cc_item_text">
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
            <img class="scr_img1" src="@/assets/images/home/img37.png" alt="" />
            <img class="scr_img2" src="@/assets/images/home/img58.png" alt="" />
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
            <div class="statistical_chart_absolute5">
              <div>5% Liquid Pool</div>
              <div class="sca_text">
                This portion of tokens will be allocated for market liquidity to
                ensure smooth trading and exchanges.
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
        <div class="part9_section">
          <div class="part9_section_platform1">
            <div
              v-for="(item, index) in businessImageList"
              :key="index"
              class="p9sp_item"
            >
              <img :src="item.image" alt="" />
              <div>{{ item.title }}</div>
            </div>
          </div>
          <div class="part9_section_card card1">
            <img src="@/assets/images/home/img45.png" alt="" />
            <div class="p9sc_title1">Spider-Man: No Way Home</div>
            <div class="p9sc_subtitle">
              Releases exclusive trailers and behind-the-scenes content on
              social media, using fan interactions and hashtag challenges to
              boost buzz.
            </div>
          </div>
          <div class="part9_section_card card2">
            <img src="@/assets/images/home/img46.png" alt="" />
            <div class="p9sc_title2">Spider-Man: No Way Home</div>
            <div class="p9sc_subtitle">
              Releases exclusive trailers and behind-the-scenes content on
              social media, using fan interactions and hashtag challenges to
              boost buzz.
            </div>
          </div>
        </div>
        <div class="part9_section_tip">
          *Images and content are for reference only.
        </div>
        <div class="part9_section_platform2">
          <div
            v-for="(item, index) in businessImageList"
            :key="index"
            class="p9sp_item"
          >
            <img :src="item.image" alt="" />
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div id="part10">
        <div class="part10_title">
          <div>
            AI KOL
            <img src="@/assets/images/home/img47.png" alt="" />
          </div>
        </div>
        <div class="part10_section">
          <img src="@/assets/images/home/img48.png" alt="" />
          <div class="part10_section_content">
            <div>MovieAI is powered by Multi-AI Agent technology.</div>
            <div>
              Helps the traditional film industry create Web3 AI Agent
              characters, enhanced by proprietary Social Media AI technology to
              keep them active in the Web3 social media ecosystem.
            </div>
            <div></div>
            <div>
              MovieAI mints an NFT for each released film and enables voting
              during its theatrical run. The most popular character is then
              developed into an AI Social Media Agent.
            </div>
          </div>
        </div>
      </div>
      <div id="part11">
        <div class="part11_title">
          <div>
            OPERATION RHYTHM
            <img src="@/assets/images/home/img49.png" alt="" />
          </div>
        </div>
        <div class="part11_section">
          <img
            class="part11_section_img1"
            src="@/assets/images/home/img51.png"
            alt=""
          />
          <div class="part11_section_absolute absolute1">
            <div>Early Stage</div>
            <div>
              Focus on Web2 product operations, with marketing centered around
              movie events and merchandise.
            </div>
          </div>
          <div class="part11_section_absolute absolute2">
            <div>Mid Stage</div>
            <div>Use PUMP MEMEs to generate buzz and amplify hype.</div>
          </div>
          <div class="part11_section_absolute absolute3">
            <div>Early Stage</div>
            <div>
              Combine RWA and Memes in a loop to continuously generate hype.
            </div>
          </div>
          <img
            class="part11_section_img2"
            src="@/assets/images/home/img52.png"
            alt=""
          />
          <img
            class="part11_section_img3"
            src="@/assets/images/home/img59.png"
            alt=""
          />
        </div>
      </div>
      <div id="part12">
        <div class="part12_title">
          <div>
            MARKET OPPORTUNITIES
            <img src="@/assets/images/home/img53.png" alt="" />
          </div>
        </div>
        <div class="part12_section">
          <div class="part12_section_text text1">
            <div class="title1">Industry Pain Points</div>
            <div class="line line1"></div>
            <div class="subtitle">Centralized Content Distribution</div>
            <div class="text">
              Traditional film distribution systems disconnect creators from
              direct engagement with their audience.
            </div>
            <div class="subtitle">Inefficient Fan Economy</div>
            <div class="text">
              Lacks effective mechanisms to convert fan support into long-term
              value.
            </div>
            <div class="subtitle">High Financial Barriers</div>
            <div class="text">
              Small creators struggle to secure funding, and film projects face
              high startup costs.
            </div>
          </div>
          <img src="@/assets/images/home/img55.png" alt="" />
          <div class="part12_section_text text2">
            <div class="title2">Solutions</div>
            <div class="line line2"></div>
            <div class="subtitle">
              Transparent revenue-sharing via blockchain.
            </div>
            <div class="subtitle">
              Tokens and NFTs enable deep fan engagement with film content.
            </div>
            <div class="subtitle">
              Decentralized platform for film project financing.
            </div>
          </div>
        </div>
      </div>
      <div id="part13">
        <div class="part13_title">
          <div>
            THANKS
            <img src="@/assets/images/home/img7.png" alt="" />
          </div>
        </div>
        <img class="img1" src="@/assets/images/home/img56.png" alt="" />
        <img class="img2" src="@/assets/images/home/img60.png" alt="" />
      </div>
    </div>
    <div
      class="fixed_content_step"
      v-if="checkFixed"
      @click="checkFixed = false"
    >
      <el-anchor
        :container="containerRef"
        direction="vertical"
        type="default"
        :offset="0"
        @click="handleClick"
      >
        <el-anchor-link href="#part1" title="-" />
        <el-anchor-link href="#part2" title="-" />
        <el-anchor-link href="#part4" title="" />
        <el-anchor-link href="#part7" title="" />
        <el-anchor-link href="#part8" title="" />
        <el-anchor-link href="#part9" title="" />
        <el-anchor-link href="#part10" title="" />
        <el-anchor-link href="#part11" title="" />
        <el-anchor-link href="#part12" title="" />
      </el-anchor>
    </div>
    <div class="fixed_content" v-else>
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
import { onMounted, ref } from "vue";
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
import Image40 from "@/assets/images/home/img40.png";
import Image41 from "@/assets/images/home/img41.png";
import Image42 from "@/assets/images/home/img42.png";
import Image43 from "@/assets/images/home/img43.png";
import Image44 from "@/assets/images/home/img44.png";

const { windowWidth } = useWindowSize();
const { t } = useI18n();
const containerRef = ref<HTMLElement | null>(null);
const checkFixed = ref(false);
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
    title: "Movie Premiere",
    subTitle:
      "Hosts offline premieres with fan-star interactions to boost film buzz and visibility.",
  },
  {
    image: Image24,
    title: "Fan Meet-and-Greet",
    subTitle: "Hosts regular fan meet-and-greets to strengthen fan loyalty.",
  },
  {
    image: Image25,
    title: "Movie Merchandise Sales",
    subTitle:
      "Launches limited-edition movie merchandise, boosted by co-branded collaborations to enhance product value.",
  },
  {
    image: Image26,
    title: "Movie Character & Star Voting",
    subTitle:
      "Conducts online voting for top movie characters, followed by star meet-and-greet events.",
  },
  {
    image: Image27,
    title: "AI KOL",
    subTitle:
      "Creates AI agents for the two most popular characters of each film to participate in marketing campaigns, including international promotions.",
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
    title: "Token Airdrop",
    subTitle:
      "OG Pass holders will receive priority access to movie-related token airdrops.",
  },
  {
    image: Image31,
    title: "Priority Access to Limited-Edition Merchandise",
    subTitle:
      "Holders enjoy priority purchase rights for movie merchandise releases.",
  },
  {
    image: Image32,
    title: "Exclusive VIP Events",
    subTitle:
      "With an OG Pass PFP, fans can join exclusive online and offline movie events.",
  },
];

const businessImageList = [
  {
    image: Image40,
    title:
      "Promotes the film through X (formerly Twitter) for marketing and audience outreach.",
  },
  {
    image: Image41,
    title:
      "Leverages KOLs and influencers to build film hype by sharing trailers and behind-the-scenes content.",
  },
  {
    image: Image42,
    title:
      "Launches hashtag challenges to encourage user engagement and interaction.",
  },
  {
    image: Image43,
    title: "Attracts fan attention through NFT airdrops and raffle events.",
  },
  {
    image: Image44,
    title:
      "Boosts film visibility through offline events like premieres and fan meet-and-greets.",
  },
];

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  if (windowWidth.value > 824) {
    checkFixed.value = false;
  } else {
    checkFixed.value = true;
  }
};

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
};
</script>

<style scoped lang="less">
.el-anchor {
  background-color: rgba(22, 0, 24, 1) !important;
}
.fixed_content_step {
  .el-anchor {
    background-color: transparent !important;
  }
  .el-anchor.el-anchor--vertical .el-anchor__list .el-anchor__item {
    width: 8px !important;
    height: 2px !important;
    background-color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;
  }
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
  overflow: hidden;
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
              height: 64px;
              top: -20px;
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
              width: 108px;
              height: 128px;
              left: -40px;
              bottom: -15px;
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
              width: 128px;
              height: 128px;
              top: -37px;
              right: -25px;
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
              height: 110px;
              bottom: -25px;
              right: -25px;
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
      .part6_mobile_title {
        display: none;
      }
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
          .scr_img1 {
            width: 100%;
            height: 100%;
          }
          .scr_img2 {
            display: none;
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
          .statistical_chart_absolute5 {
            min-width: 347px;
            max-width: 347px;
            position: absolute;
            top: calc(100% - 18px);
            left: calc(100% - 167px);
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
      .part9_section {
        display: flex;
        align-items: center;
        gap: 40px;
        margin-top: 91px;
        .part9_section_platform1 {
          .p9sp_item {
            max-width: 400px;
            img {
              width: 24px;
              height: 24px;
            }
            div {
              font-family: Montserrat;
              font-weight: 500;
              font-size: 14px;
              line-height: 150%;
              letter-spacing: 0%;
              color: rgba(255, 255, 255, 0.5);
              margin: 8px 0 40px;
            }
          }
        }
        .part9_section_card {
          border-radius: 16px;
          padding: 24px;
          img {
            min-width: 352px;
            max-width: 352px;
            height: 528px;
            border-radius: 8px;
          }
          .p9sc_title1 {
            padding: 24px 0 4px;
            font-family: Montserrat;
            font-weight: 700;
            font-size: 16px;
            line-height: 150%;
            letter-spacing: 0%;
            text-transform: uppercase;
            color: rgba(211, 57, 196, 1);
          }
          .p9sc_title2 {
            padding: 24px 0 4px;
            font-family: Montserrat;
            font-weight: 700;
            font-size: 16px;
            line-height: 150%;
            letter-spacing: 0%;
            text-transform: uppercase;
            color: rgba(62, 39, 228, 1);
          }
          .p9sc_subtitle {
            max-width: 352px;
            font-family: Montserrat;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 0.8);
          }
        }
        .card1 {
          background: radial-gradient(
              221.47% 76.87% at 50% -47.77%,
              #d339c4 0%,
              rgba(211, 57, 196, 0) 100%
            ),
            #160211;
          box-shadow: 0px 1px 6px 0px rgba(255, 120, 219, 0.54) inset,
            0px 0px 40px 0px rgba(211, 57, 196, 0.28) inset;
        }
        .card2 {
          background: radial-gradient(
              221.47% 76.87% at 50% -47.77%,
              #5639d3 0%,
              rgba(86, 57, 211, 0) 100%
            ),
            #020316;
          box-shadow: 0px 1px 6px 0px rgba(154, 146, 255, 0.46) inset,
            0px 0px 40px 0px rgba(68, 57, 211, 0.28) inset;
        }
      }
      .part9_section_tip {
        text-align: center;
        font-family: Montserrat;
        font-weight: 500;
        font-size: 12px;
        line-height: 150%;
        letter-spacing: 0%;
        color: rgba(255, 255, 255, 0.24);
        margin-top: 31px;
      }
      .part9_section_platform2 {
        display: none;
      }
    }
    #part10 {
      width: 100%;
      max-width: 1280px;
      margin: auto;
      margin-top: 120px;
      .part10_title {
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
            width: 40px;
            height: 40px;
            position: absolute;
            bottom: -10px;
            right: -12.5px;
          }
        }
      }
      .part10_section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 684px;
        }
        .part10_section_content {
          flex: 1;
          min-width: 480px;
          margin-left: 47px;
          div {
            &:first-child {
              max-width: 480px;
              color: #fff;
              font-family: Montserrat;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 150%; /* 48px */
              text-transform: uppercase;
              margin-bottom: 16px;
            }
            &:nth-child(2) {
              color: rgba(255, 255, 255, 0.8);
              font-family: Montserrat;
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: 150%; /* 24px */
            }
            &:nth-child(3) {
              width: 100%;
              height: 1px;
              background: #54255c;
              margin: 40px 0;
            }
            &:last-child {
              color: rgba(255, 255, 255, 0.5);
              font-family: Montserrat;
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: 150%; /* 24px */
            }
          }
        }
      }
    }
    #part11 {
      width: 100%;
      max-width: 1280px;
      margin: auto;
      margin-top: 54px;
      .part11_title {
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
            width: 195px;
            height: 40px;
            position: absolute;
            bottom: -10px;
            right: -101.5px;
          }
        }
      }
      .part11_section {
        width: 100%;
        height: 690px;
        background: url("@/assets/images/home/img50.png") no-repeat;
        background-size: cover;
        position: relative;
        .part11_section_img1 {
          width: 218px;
          height: 345px;
          flex-shrink: 0;
          aspect-ratio: 218/345;
          position: absolute;
          top: 129px;
          left: 71px;
        }
        .part11_section_absolute {
          max-width: 320px;
          position: absolute;
          div {
            &:first-child {
              color: #000;
              font-family: Montserrat;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 150%; /* 48px */
              text-transform: uppercase;
              margin-bottom: 16px;
            }
            &:last-child {
              color: rgba(0, 0, 0, 0.8);
              font-family: Montserrat;
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: 150%; /* 24px */
            }
          }
        }
        .absolute1 {
          top: 374px;
          left: 199px;
        }
        .absolute2 {
          top: 280px;
          left: 519px;
        }
        .absolute3 {
          top: 183px;
          left: 865px;
        }
        .part11_section_img2 {
          width: 234px;
          height: 452px;
          flex-shrink: 0;
          aspect-ratio: 117/226;
          position: absolute;
          top: -79px;
          right: -53px;
        }
        .part11_section_img3 {
          display: none;
        }
      }
    }
    #part12 {
      width: 100%;
      padding-top: 157px;
      background-image: url("@/assets/images/home/img54.png");
      background-repeat: no-repeat;
      background-position: left bottom;
      background-size: 100%;
      .part12_title {
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
            width: 150px;
            height: 40px;
            position: absolute;
            bottom: -10px;
            right: -83px;
          }
        }
      }
      .part12_section {
        display: flex;
        justify-content: center;
        padding-top: 29px;
        overflow: hidden;
        img {
          width: 557px;
          aspect-ratio: 557/591;
        }
        .part12_section_text {
          position: relative;
          top: 93px;
          .title1 {
            max-width: 300px;
            color: #ad68b9;
            font-family: Montserrat;
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 150%; /* 48px */
            text-transform: uppercase;
          }
          .title2 {
            color: #d339c4;
            font-family: Montserrat;
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 150%; /* 48px */
            text-transform: uppercase;
          }
          .line {
            width: 48px;
            height: 1px;
            margin-top: 16px;
          }
          .line1 {
            background-color: rgba(173, 104, 185, 1);
          }
          .line2 {
            background-color: rgba(211, 57, 196, 1);
          }
          .subtitle {
            color: #fff;
            font-family: Montserrat;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%; /* 30px */
            margin-top: 16px;
          }
          .text {
            color: rgba(255, 255, 255, 0.8);
            font-family: Montserrat;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%; /* 18px */
            margin-top: 8px;
          }
        }
        .text1 {
          max-width: 377px;
        }
        .text2 {
          max-width: 300px;
        }
      }
    }
    #part13 {
      width: 100%;
      margin-top: 120px;
      .part13_title {
        display: none;
      }
      .img1 {
        width: 100%;
      }
      .img2 {
        display: none;
      }
    }
  }
  .fixed_content_step {
    position: fixed;
    top: 150px;
    right: 0px;
    z-index: 10;
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
    z-index: 10;
  }
}
@media (max-width: 824px) {
  .Homeview {
    max-width: 100% !important;
    .Homeview_content {
      width: 100%;
      height: calc(100vh - 88px);
      overflow-y: auto;
      #part1 {
        height: max-content;
        box-sizing: border-box;
        .scroll_content_y {
          display: none !important;
        }
        .scroll_content_ry {
          display: none !important;
        }
        .part1_section {
          padding: 40px 20px 0 0 !important;
          box-sizing: border-box !important;
          .part1_img2 {
            width: 118px !important;
            max-width: 118px !important;
            max-height: 200px !important;
            aspect-ratio: 118 / 200 !important;
            margin-top: 21px !important;
            position: relative;
            right: -20px;
            z-index: 4;
          }
          .part1_section_content {
            flex: 1 !important;
            // width: 250px !important;
            .psc_head {
              height: 200px !important;
              margin-top: 0 !important;
              .psc_head_text {
                flex: 1 !important;
                div {
                  &:first-child {
                    font-size: 35px !important;
                    padding: 12px 0 27px 28px !important;
                  }
                  &:nth-child(2) {
                    font-size: 13px !important;
                    padding-left: 28px !important;
                  }
                  &:nth-child(3) {
                    font-size: 13px !important;
                    padding-left: 28px !important;
                  }
                  &:last-child {
                    font-size: 13px !important;
                    padding-left: 28px !important;
                  }
                }
              }
              img {
                width: 4px !important;
                height: 137px !important;
                margin: 0 6.5px 6.5px !important;
              }
            }
          }
        }
      }
      #part2 {
        padding: 60px 20px 0 !important;
        box-sizing: border-box !important;
        .part2_title {
          align-items: flex-start !important;
          div {
            font-size: 22px !important;
            img {
              width: 61px !important;
              height: 22px !important;
              position: absolute;
              top: 11px !important;
              right: -30px !important;
            }
          }
        }
        .part2_section {
          padding-top: 135px !important;
          img {
            width: 225px !important;
            height: 180px !important;
            position: relative;
            z-index: 4;
          }
          .part2_section_text {
            min-width: 149px !important;
            max-width: 149px !important;
            position: relative;
            &:first-child {
              top: -100px !important;
              right: -93px !important;
            }
            div {
              &:first-child {
                font-size: 14px !important;
              }
              &:nth-child(2) {
                margin: 8px 0 !important;
                width: 18px !important;
              }
              &:last-child {
                font-size: 10px !important;
              }
            }
            &:last-child {
              min-width: 126px !important;
              max-width: 126px !important;
              top: -68px !important;
              left: -82px !important;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              div {
                text-align: end;
              }
            }
          }
        }
      }
      #part3 {
        padding: 60px 20px 0 !important;
        box-sizing: border-box;
        .part3_title {
          align-items: flex-start !important;
          div {
            font-size: 22px !important;
            img {
              width: 62px !important;
              height: 22px !important;
              position: absolute;
              top: 13px !important;
              right: -21.5px !important;
            }
          }
        }
        .part3_list {
          width: 100%;
          flex-wrap: wrap;
          gap: 54px !important;
          margin-top: 37px !important;

          .part3_list_item1 {
            width: 100%;
            position: relative;
            .pli_top {
              width: 100px !important;
              height: 100px !important;
              background-size: 100% !important;
              .plit_tip {
                font-size: 8px !important;
                padding: 4px !important;
                top: 4px !important;
                left: 2px !important;
              }
              img {
                position: absolute;
                width: 64px !important;
                height: 34px !important;
                top: -12px !important;
                right: 20px !important;
              }
            }
            .pli_alltext {
              position: absolute;
              top: 0;
              right: 0;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }
            .pli_text {
              width: 207px !important;
              margin: 10px 0 16px !important;
              font-size: 15px !important;
              text-align: end !important;
            }
            .pli_subtext {
              width: 100% !important;
              font-size: 10px !important;
              text-align: end !important;
              span {
                display: inline-block;
                &:first-child {
                  max-width: 207px;
                }
              }
            }
          }
          .part3_list_item2 {
            width: 100%;
            margin-top: 136px;
            position: relative;
            .pli_top {
              width: 100px !important;
              height: 100px !important;
              background-size: 100% !important;
              left: calc(100% - 100px) !important;
              .plit_tip {
                font-size: 8px !important;
                padding: 4px !important;
                background: url("@/assets/images/home/img10.png") no-repeat;
                background-size: cover;
                position: absolute;
                top: 2px !important;
                left: 6px !important;
                z-index: 2;
              }
              img {
                position: absolute;
                width: 52px;
                height: 64px;
                left: -16px;
                bottom: -5px;
                z-index: 3;
              }
            }
            .pli_alltext {
              position: absolute;
              top: 0;
              left: 0;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }
            .pli_text {
              width: 201px !important;
              margin: 10px 0 16px !important;
              font-size: 15px !important;
            }
            .pli_subtext {
              width: 100% !important;
              font-size: 10px !important;
              span {
                display: inline-block;
                &:first-child {
                  max-width: 201px;
                }
              }
            }
          }
          .part3_list_item3 {
            width: 100% !important;
            margin-top: 100px !important;
            position: relative !important;
            .pli_top {
              width: 100px !important;
              height: 100px !important;
              left: 0px !important;
              .plit_tip {
                font-size: 8px !important;
                padding: 4px !important;
                top: 0px !important;
                left: 4px !important;
                z-index: 2;
              }
              img {
                position: absolute;
                width: 58px !important;
                height: 58px !important;
                top: -15px !important;
                right: -15px !important;
                z-index: 3;
              }
            }
            .pli_alltext {
              position: absolute;
              top: 0;
              right: 0;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }
            .pli_text {
              width: 207px !important;
              margin: 10px 0 16px !important;
              font-size: 15px !important;
              text-align: end !important;
            }
            .pli_subtext {
              width: 100% !important;
              font-size: 10px !important;
              text-align: end !important;
              span {
                display: inline-block;
                &:first-child {
                  max-width: 207px;
                }
              }
            }
          }
          .part3_list_item4 {
            width: 100% !important;
            margin-top: 44px !important;
            position: relative !important;
            .pli_top {
              width: 100px !important;
              height: 100px !important;
              background-size: 100% !important;
              left: calc(100% - 100px) !important;
              .plit_tip {
                font-size: 8px !important;
                padding: 4px !important;
                left: 0px !important;
                z-index: 2;
              }
              img {
                position: absolute;
                width: 70px !important;
                height: 54px !important;
                bottom: -10px;
                right: -10px;
                z-index: 3;
              }
            }
            .pli_alltext {
              position: absolute;
              top: 0;
              left: 0;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }
            .pli_text {
              width: 201px !important;
              margin: 10px 0 16px !important;
              font-size: 15px !important;
            }
            .pli_subtext {
              width: 100% !important;
              font-size: 10px !important;
              span {
                display: inline-block;
                &:first-child {
                  max-width: 201px;
                }
              }
            }
          }
        }
      }
      #part4 {
        padding: 145px 20px 0 !important;
        box-sizing: border-box;
        .part4_title {
          align-items: flex-start !important;
          div {
            font-size: 22px !important;
            img {
              width: 62px !important;
              height: 22px !important;
              position: absolute;
              top: 15px !important;
              right: -21.5px !important;
            }
          }
        }
        .part4_card {
          margin-top: 35px !important;
          flex-wrap: wrap;
          .part4_card_item1 {
            width: 100% !important;
            height: 262px !important;
            margin-bottom: 16px !important;
          }
          .part4_card_item2 {
            width: 100% !important;
            height: 262px !important;
          }
          .pci_text {
            max-width: 240px !important;
            div {
              &:first-child {
                font-size: 18px !important;
                padding-bottom: 8px !important;
              }
              &:last-child {
                font-size: 12px !important;
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
        max-width: 100% !important;
        padding: 60px 20px 0 !important;
        box-sizing: border-box;
        .part5_title {
          font-size: 20px !important;
        }
        .part5_line {
          margin: 40px 0 !important;
        }
        .part5_list {
          display: grid;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 48px !important;
          .part5_list_item {
            img {
              width: 28px !important;
              height: 28px !important;
            }
            .part5_list_item_title {
              font-size: 14px !important;
            }
            .part5_list_item_subtitle {
              font-size: 12px !important;
            }
          }
        }
      }
      #part6 {
        max-width: 100% !important;
        padding: 60px 20px 0 !important;
        box-sizing: border-box;
        flex-wrap: wrap;
        .part6_mobile_title {
          display: block;
          color: #ad68b9;
          font-family: Montserrat;
          font-size: 20px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .part6_image {
          width: 100% !important;
          height: 581px !important;
          margin-right: 0 !important;
        }
        .part6_section {
          flex: 1;
          .part6_section_title {
            display: none;
          }
          .part6_section_line {
            display: none;
          }
          .part6_section_subtitle {
            font-size: 24px !important;
            margin-top: 64px !important;
          }
          .part6_section_text {
            font-size: 14px !important;
          }
          .part6_list {
            .part6_list_item {
              img {
                width: 28px !important;
                height: 28px !important;
              }
              .part6_list_item_title {
                font-size: 14px !important;
              }
              .part6_list_item_subtitle {
                font-size: 12px !important;
              }
            }
          }
        }
      }
      #part7 {
        width: 100%;
        padding: 20px 20px 0 !important;
        box-sizing: border-box;
        background: url("@/assets/images/home/img57.png") no-repeat !important;
        background-size: cover !important;
        .part7_content {
          max-width: 100% !important;
          .part7_content_head {
            flex-wrap: wrap;
            padding: 0px 0 37px !important;
            .p7ch_left {
              font-size: 22px !important;
              text-align: left !important;
              margin-bottom: 32px;
              img {
                width: 62px !important;
                height: 22px !important;
                right: -23px !important;
              }
            }
            .p7ch_right {
              max-width: 100% !important;
              font-size: 14px !important;
            }
          }
          .part7_content_subhead {
            display: none;
          }
          .part7_content_card {
            display: grid;
            gap: 16px !important;
            padding: 37px 0 33px !important;
            .p7cc_item {
              div {
                &:first-child {
                  font-size: 14px !important;
                }
                &:last-child {
                  min-height: max-content;
                  font-size: 12px !important;
                }
              }
              .p7cc_item_text {
                min-height: 186px !important;
              }
            }
          }
        }
      }
      #part8 {
        max-width: 100% !important;
        padding: 60px 20px 0 !important;
        box-sizing: border-box;
        .part8_title {
          align-items: flex-start !important;
          margin-bottom: 33px !important;
          div {
            font-size: 22px !important;
            img {
              width: 62px !important;
              height: 22px !important;
              position: absolute;
              top: 11px !important;
              right: -30px !important;
            }
          }
        }
        .part8_text {
          font-size: 16px !important;
        }
        .part8_subtext {
          max-width: 240px !important;
          padding: 16px 0 64px !important;
          font-size: 12px !important;
        }
        .statistical_chart {
          padding-left: 25px !important;
          .statistical_chart_relative {
            width: 100% !important;
            height: 155px !important;
            position: relative;
            .scr_img1 {
              display: none;
            }
            .scr_img2 {
              display: block;
              width: 222px;
              height: 155px;
            }
            .statistical_chart_absolute1 {
              max-width: max-content !important;
              position: absolute;
              top: 135px !important;
              left: -25px !important;
              & > div {
                font-size: 9px !important;
                max-width: 91px;
              }
              .sca_text {
                margin-top: 1px !important;
                font-size: 6px !important;
                max-width: 101px !important;
              }
              .sca_card {
                max-width: calc(100% - 40px) !important;
                padding: 0 5px 5px !important;
                box-sizing: border-box;
                margin-top: 18px !important;
                border-radius: 1px !important;
                .sca_card_head {
                  font-size: 10px !important;
                  margin-top: 6px !important;
                }
                .sca_card_subhead {
                  font-size: 8px !important;
                }
                .sca_card_text {
                  font-size: 8px !important;
                }
              }
            }
            .statistical_chart_absolute2 {
              min-width: 96px !important;
              max-width: 96px !important;
              position: absolute;
              top: -38px !important;
              left: 230px !important;
              & > div {
                font-size: 9px !important;
                line-height: 100% !important;
                span {
                  font-size: 6px !important;
                }
                margin-bottom: 5px !important;
              }
              .sca_text {
                margin-top: 1px !important;
                font-size: 6px !important;
              }
            }
            .statistical_chart_absolute3 {
              min-width: 96px !important;
              max-width: 96px !important;
              position: absolute;
              top: 56px !important;
              left: 230px !important;
              & > div {
                font-size: 9px !important;
              }
              .sca_text {
                margin-top: 1px !important;
                font-size: 6px !important;
              }
            }
            .statistical_chart_absolute4 {
              min-width: 96px !important;
              max-width: 96px !important;
              position: absolute;
              top: 112px !important;
              left: 230px !important;
              & > div {
                font-size: 9px !important;
              }
              .sca_text {
                margin-top: 1px !important;
                font-size: 6px !important;
              }
            }
            .statistical_chart_absolute5 {
              min-width: 96px !important;
              max-width: 96px !important;
              position: absolute;
              top: calc(100% + 5px) !important;
              left: 123px !important;
              & > div {
                font-size: 9px !important;
              }
              .sca_text {
                margin-top: 1px !important;
                font-size: 6px !important;
              }
            }
          }
          .sca_img {
            width: 24px !important;
            height: 9px !important;
            position: absolute;
            top: 73px !important;
            left: 164px !important;
          }
        }
      }
      #part9 {
        width: 100%;
        max-width: 100% !important;
        box-sizing: border-box;
        margin-top: 268px !important;
        padding: 0 20px !important;
        .part9_title {
          align-items: flex-start !important;
          div {
            width: 294px !important;
            font-size: 22px !important;
            text-align: left !important;
            img {
              width: 93px !important;
              height: 22px !important;
              position: absolute;
              bottom: -9px !important;
              right: -25px !important;
            }
          }
        }
        .part9_section {
          gap: 0 !important;
          margin-top: 51px !important;
          .part9_section_platform1 {
            display: none;
          }
          .part9_section_card {
            width: calc(50% - 8px) !important;
            border-radius: 6px !important;
            padding: 10px !important;
            img {
              min-width: 100% !important;
              max-width: 100% !important;
              height: max-content;
              border-radius: 8px !important;
            }
            .p9sc_title1 {
              padding: 10px 0 2px !important;
              font-size: 9px !important;
            }
            .p9sc_title2 {
              padding: 10px 0 2px !important;
              font-size: 9px !important;
            }
            .p9sc_subtitle {
              max-width: 100% !important;
              font-size: 9px !important;
            }
          }
          .card1 {
            margin-right: 16px;
          }
        }
        .part9_section_tip {
          width: 100% !important;
          font-size: 10px !important;
          margin-top: 18px !important;
        }
        .part9_section_platform2 {
          margin-top: 36px;
          display: block;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px 58px;
          .p9sp_item {
            max-width: max-content !important;
            img {
              width: 24px;
              height: 24px;
            }
            div {
              font-family: Montserrat;
              font-weight: 500;
              line-height: 150%;
              letter-spacing: 0%;
              color: rgba(255, 255, 255, 0.5);
              font-size: 12px !important;
              margin: 8px 0 0px !important;
            }
          }
        }
      }
      #part10 {
        width: 100%;
        max-width: 100% !important;
        margin: auto;
        padding: 60px 20px 0 !important;
        box-sizing: border-box;
        .part10_title {
          align-items: flex-start !important;
          div {
            font-size: 22px !important;
          }
        }
        .part10_section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          img {
            width: 100% !important;
          }
          .part10_section_content {
            min-width: 100% !important;
            margin-left: 0px !important;
            div {
              &:first-child {
                max-width: 100% !important;
                font-size: 18px !important;
              }
              &:nth-child(2) {
                max-width: 100% !important;
                font-size: 14px !important;
              }
              &:nth-child(3) {
                margin: 32px 0 !important;
              }
              &:last-child {
                font-size: 14px !important;
              }
            }
          }
        }
      }
      #part11 {
        max-width: 100% !important;
        margin-top: 60px !important;
        box-sizing: border-box;
        .part11_title {
          align-items: flex-start !important;
          div {
            font-size: 22px !important;
            img {
              width: 195px;
              height: 40px;
              position: absolute;
              bottom: -10px;
              right: -101.5px;
            }
          }
        }
        .part11_section {
          width: 100%;
          height: 666px !important;
          // background: url("@/assets/images/home/img50.png") no-repeat;
          background: white;
          background-size: cover;
          position: relative;
          .part11_section_img1 {
            width: 157px !important;
            height: 249px !important;
            flex-shrink: 0;
            aspect-ratio: 157/249;
            position: absolute;
            top: auto;
            bottom: 0px !important;
            left: -19px;
          }
          .part11_section_absolute {
            max-width: 200px;
            position: absolute;
            div {
              &:first-child {
                font-size: 16px !important;
              }
              &:last-child {
                font-size: 14px !important;
              }
            }
          }
          .absolute1 {
            top: 80px !important;
            left: auto;
            right: 0px !important;
          }
          .absolute2 {
            top: 172px !important;
            left: 20px !important;
          }
          .absolute3 {
            max-width: 312px !important;
            top: 301px !important;
            left: 20px !important;
          }
          .part11_section_img2 {
            display: none;
          }
          .part11_section_img3 {
            display: block;
            width: 175px !important;
            height: 338px !important;
            flex-shrink: 0;
            aspect-ratio: 175/338;
            position: absolute;
            top: 155px !important;
            right: -0px !important;
          }
        }
      }
      #part12 {
        width: 100%;
        background-image: url("@/assets/images/home/img54.png");
        background-repeat: no-repeat;
        background-position: center !important;
        background-size: cover !important;
        padding: 60px 20px 0 !important;
        box-sizing: border-box;
        .part12_title {
          align-items: flex-start !important;
          div {
            font-size: 22px !important;
            img {
              width: 150px;
              height: 40px;
              position: absolute;
              bottom: -10px;
              right: -83px;
            }
          }
        }
        .part12_section {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding-top: 0 !important;
          overflow: hidden;
          position: relative;
          img {
            width: 350px !important;
            height: 371px !important;
            aspect-ratio: 350/371;
            position: absolute;
            right: -40px;
            bottom: 0;
          }
          .part12_section_text {
            width: 100%;
            position: relative;
            top: auto;
            z-index: 4;
            margin-top: 40px;
            .title1 {
              font-size: 16px !important;
            }
            .title2 {
              font-size: 16px !important;
            }
            .subtitle {
              font-size: 14px !important;
            }
            .text {
              font-size: 14px !important;
              margin-top: 16px !important;
            }
          }
          .text1 {
            max-width: 100% !important;
          }
          .text2 {
            max-width: 100% !important;
            padding-bottom: 100px;
          }
        }
      }
      #part13 {
        width: 100%;
        margin-top: 120px;
        padding: 0 20px 20px;
        box-sizing: border-box;
        .part13_title {
          display: block;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 14px;
          div {
            width: max-content;
            font-family: Montserrat;
            font-weight: 800;
            font-size: 22px;
            line-height: 100%;
            letter-spacing: 0%;
            text-align: center;
            text-transform: uppercase;
            color: rgba(239, 207, 246, 1);
            position: relative;
            img {
              width: 61px;
              height: 22px;
              position: absolute;
              bottom: -6px;
              right: -30px;
            }
          }
        }
        .img1 {
          display: none;
        }
        .img2 {
          width: 100%;
          display: block;
        }
      }
    }
    .fixed_content {
      top: 150px !important;
      // display: none;
    }
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
