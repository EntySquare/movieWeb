<script lang="ts" setup name="AppFooter">
import router from "@/router";
</script>
<template>
  <footer class="app_footer">
    <div class="container">
      <div class="logo"><img src="@/assets/images/logo.png" alt="" /></div>
      <div class="footerBottom">
        <div class="text">© 2025 Movie.network. All rights reserved.</div>
        <div class="fotterLink">
          <div class="item" @click="router.push('/my/protocol')">
            Privacy Policy
          </div>
          <div class="item">Terms of Use</div>
        </div>
        <div class="appLogo">
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
      </div>
    </div>
  </footer>
</template>

<style scoped lang="less">
.app_footer {
  background: #000;

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
  }
}
.logo {
  img {
    width: 82px;
    height: 30px;
  }
}
.footerBottom {
  display: flex;
  padding: 32px 80px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  .text {
    color: #8c8c8c;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
  }
  .fotterLink {
    display: flex;
    gap: 20px;
    margin-left: -60px;
    .item {
      color: @xtxColor;
      font-family: Rubik;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 18px */
      cursor: pointer;
    }
  }
  .appLogo {
    display: flex;
    align-items: center;
    gap: 12px;
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
@media (max-width: 824px) {
  .app_footer {
    padding-top: 20px;
    .container {
      gap: 24px;
    }
    .footerBottom {
      align-items: center;
      flex-direction: column-reverse; /* 反转主轴方向 */
      gap: 24px;
      width: 100%;
      padding: 0px 16px 0px 16px;
      .text {
        width: 100%;
        text-align: center;
        padding: 24px 0;
        border-top: 1px solid #131313;
      }
    }
  }
}
</style>
