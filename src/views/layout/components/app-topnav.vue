<script lang="ts" setup name="AppTopnav">
import router from "@/router";
import { useWindowSize } from "@/utils/useWindowSize";
import { ref } from "vue";
const { windowWidth } = useWindowSize();
const isMenuOpen = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const TO = (link: any) => {
  router.push(link);
  isMenuOpen.value = true;
};
const isActive = (link: any) => {
  return router.currentRoute.value.path === link;
};

// 格式化字符串的函数
const formatData = (input: string): string => {
  if (input.length <= 10) {
    return input; // 如果字符串较短，不需要省略
  }
  const start = input.slice(0, 5); // 获取前5个字符
  const end = input.slice(-4); // 获取后4个字符
  return `${start}...${end}`; // 返回格式化后的字符串
};
</script>
<template>
  <nav class="app-topnav">
    <div class="container">
      <div class="topLeft">
        <router-link to="/" class="logo"
          ><img src="@/assets/images/logo.png" alt=""
        /></router-link>
        <div class="line"></div>
        <div class="appLogo" v-if="windowWidth > 824">
          <div class="appLogoItem">
            <img src="@/assets/svgs/twi.svg" alt="" />
          </div>
          <div class="appLogoItem">
            <img src="@/assets/svgs/telegram.svg" alt="" />
          </div>
          <div class="appLogoItem">
            <img src="@/assets/svgs/gitBook.svg" alt="" />
          </div>
          <div class="appLogoItem">
            <img src="@/assets/svgs/discord.svg" alt="" />
          </div>
          <div class="appLogoItem">
            <img src="@/assets/svgs/medium.svg" alt="" />
          </div>
        </div>
        <div class="NavSvg" v-if="windowWidth <= 824" @click="toggleMenu">
          <svg
            v-if="isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M21.8418 12C21.8418 12.2984 21.7233 12.5845 21.5123 12.7955C21.3013 13.0065 21.0152 13.125 20.7168 13.125H4.2168C3.91843 13.125 3.63228 13.0065 3.4213 12.7955C3.21032 12.5845 3.0918 12.2984 3.0918 12C3.0918 11.7016 3.21032 11.4155 3.4213 11.2045C3.63228 10.9935 3.91843 10.875 4.2168 10.875H20.7168C21.0152 10.875 21.3013 10.9935 21.5123 11.2045C21.7233 11.4155 21.8418 11.7016 21.8418 12ZM4.2168 7.125H20.7168C21.0152 7.125 21.3013 7.00647 21.5123 6.7955C21.7233 6.58452 21.8418 6.29837 21.8418 6C21.8418 5.70163 21.7233 5.41548 21.5123 5.2045C21.3013 4.99353 21.0152 4.875 20.7168 4.875H4.2168C3.91843 4.875 3.63228 4.99353 3.4213 5.2045C3.21032 5.41548 3.0918 5.70163 3.0918 6C3.0918 6.29837 3.21032 6.58452 3.4213 6.7955C3.63228 7.00647 3.91843 7.125 4.2168 7.125ZM20.7168 16.875H4.2168C3.91843 16.875 3.63228 16.9935 3.4213 17.2045C3.21032 17.4155 3.0918 17.7016 3.0918 18C3.0918 18.2984 3.21032 18.5845 3.4213 18.7955C3.63228 19.0065 3.91843 19.125 4.2168 19.125H20.7168C21.0152 19.125 21.3013 19.0065 21.5123 18.7955C21.7233 18.5845 21.8418 18.2984 21.8418 18C21.8418 17.7016 21.7233 17.4155 21.5123 17.2045C21.3013 16.9935 21.0152 16.875 20.7168 16.875Z"
              fill="white"
              style="fill: white; fill-opacity: 1"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M20.0127 17.954C20.224 18.1653 20.3428 18.452 20.3428 18.7509C20.3428 19.0497 20.224 19.3364 20.0127 19.5477C19.8013 19.7591 19.5147 19.8778 19.2158 19.8778C18.9169 19.8778 18.6303 19.7591 18.4189 19.5477L12.4668 13.5937L6.51269 19.5459C6.30135 19.7572 6.0147 19.8759 5.71582 19.8759C5.41693 19.8759 5.13029 19.7572 4.91894 19.5459C4.7076 19.3345 4.58887 19.0479 4.58887 18.749C4.58887 18.4501 4.7076 18.1635 4.91894 17.9521L10.873 11.9999L4.92082 6.04586C4.70947 5.83451 4.59074 5.54787 4.59074 5.24898C4.59074 4.9501 4.70947 4.66345 4.92082 4.45211C5.13216 4.24076 5.41881 4.12203 5.71769 4.12203C6.01658 4.12203 6.30322 4.24076 6.51457 4.45211L12.4668 10.4062L18.4208 4.45117C18.6322 4.23983 18.9188 4.12109 19.2177 4.12109C19.5166 4.12109 19.8032 4.23983 20.0146 4.45117C20.2259 4.66251 20.3446 4.94916 20.3446 5.24804C20.3446 5.54693 20.2259 5.83358 20.0146 6.04492L14.0605 11.9999L20.0127 17.954Z"
              fill="white"
              style="fill: white; fill-opacity: 1"
            />
          </svg>
        </div>
      </div>
      <div class="topRight">
        <router-link
          to="/home"
          class="navLink"
          v-if="windowWidth > 824"
          :class="{ active: isActive('/home') }"
          >HOME</router-link
        >
        <router-link
          to="/mint"
          class="navLink"
          v-if="windowWidth > 824"
          :class="{ active: isActive('/mint') }"
          >MINT</router-link
        >
        <router-link
          to="/shop"
          class="navLink"
          v-if="windowWidth > 824"
          :class="{ active: isActive('/shop') }"
          >SHOP</router-link
        >
        <router-link
          to="/ai"
          class="navLink"
          v-if="windowWidth > 824"
          :class="{ active: isActive('/ai') }"
          >AI</router-link
        >
        <router-link to="/my">
          <div class="LAUNCHBtn" v-if="false">Connect wallet</div>
          <div class="my" v-else>
            <div class="name">{{ formatData("0x1231g2q4v6f1s3f2345") }}</div>
            <div class="avatar"></div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="overlay" v-if="!isMenuOpen">
      <div @click="TO('/mint')" class="text">MINT</div>
      <div @click="TO('/shop')" class="text">SHOP</div>

      <div class="iconLink">
        <div class="iconLinkItem">
          <img src="@/assets/svgs/twi.svg" alt="" />
        </div>
        <div class="iconLinkItem">
          <img src="@/assets/svgs/telegram.svg" alt="" />
        </div>
        <div class="iconLinkItem">
          <img src="@/assets/svgs/gitBook.svg" alt="" />
        </div>
        <div class="iconLinkItem">
          <img src="@/assets/svgs/discord.svg" alt="" />
        </div>
        <div class="iconLinkItem">
          <img src="@/assets/svgs/medium.svg" alt="" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  border-bottom: 1px solid #1e1e1e;
  background: #000;
  min-height: 81px;
}

.container {
  height: 100%;
  padding: 24px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topLeft {
  display: flex;
  align-items: center;
  gap: 28px;

  .logo {
    flex-shrink: 0;
    img {
      width: 87px;
      height: 32px;
    }
  }

  .line {
    width: 1px;
    height: 18px;
    background: #4d4d4d;
  }

  .appLogo {
    display: flex;
    gap: 12px;
    align-items: center;

    .appLogoItem {
      width: 28px;
      height: 28px;
      //   background: #4d4d4d;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.topRight {
  display: flex;
  align-items: center;
  gap: 40px;
  height: 100%;

  .navLink {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    color: #fff;

    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;

    &:hover {
      color: #d339c4;
    }
  }
  // .navLink.active {
  //   border-bottom: 2px solid #d339c4; /* 添加下划线 */
  // }
  .navLink.active::after {
    content: "";
    position: absolute;
    bottom: -6px; /* 控制下划线距离文字的间距 */
    width: 100%; /* 线条的宽度 */
    height: 1px; /* 线条的高度 */
    background-color: #d600ff; /* 线条颜色，改为你想要的 */
  }
}
.LAUNCHBtn {
  display: flex;
  align-items: center;
  display: flex;
  padding: 8px 14px 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #fff;
  gap: 6px;

  color: @xtxColor;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
.my {
  display: flex;
  align-items: center;
  gap: 8px;
  .name {
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }
  .avatar {
    width: 32px;
    height: 32px;
    background: #e621ca;
    border-radius: 50%;
  }
}

@media (max-width: 970px) {
  .container {
    padding: 32px;
  }
}
@media (max-width: 880px) {
  .container {
    .topLeft {
      gap: 18px;
    }
    .topRight {
      gap: 20px;
    }
  }
}
@media (max-width: 824px) {
  .app-topnav {
    border-bottom: none;
  }
  .container {
    padding: 16px;
    padding-right: 32px;
  }
  .topLeft {
    gap: 8px;
    .NavSvg {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .topRight {
    .LAUNCHBtn {
      padding: 6px 12px 6px 14px;
      font-size: 12px;
      //   letter-spacing: -0.48px;
    }
  }
}
.topLeft,
.topRight {
  z-index: 1000;
}
.overlay {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1); /* Semi-transparent black */
  //   background: #d339c4;
  z-index: 999;
  display: flex;
  padding: 36px;
  flex-direction: column;
  gap: 40px;
  .text {
    padding: 12px 0px;
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }
  .iconLink {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
}
</style>
