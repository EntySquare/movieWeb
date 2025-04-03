<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const changeLang = (lang: string) => {
  locale.value = lang;
  localStorage.setItem("upaclang", lang);
  document
    .querySelector("html")!
    .setAttribute("lang", localStorage.getItem("upaclang") || "en");
  show.value = false;
};
const show = ref(false);
const setLang = () => {
  if (locale.value === "en") {
    changeLang("zh");
  } else {
    changeLang("en");
  }
};
</script>
<template>
  <div class="setlanguage_div">
    <div
      :class="['setlanguage', show ? 'hover' : '']"
      @mouseenter="show = true"
      @mouseleave="show = false"
    >
      <div class="text">
        {{ locale === "en" ? "EN" : "中文" }}
        <div style="display: flex" class="icon">
          <svg
            t="1743499419132"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4054"
            width="16"
            height="16"
          >
            <path
              d="M512 657.723077c-7.876923 0-15.753846-3.938462-19.692308-7.876923l-240.246154-232.369231c-11.815385-11.815385-11.815385-31.507692 0-43.323077 11.815385-11.815385 31.507692-11.815385 43.323077 0l220.553847 212.676923 220.553846-212.676923c11.815385-11.815385 31.507692-11.815385 43.323077 0 11.815385 11.815385 11.815385 31.507692 0 43.323077l-240.246154 232.369231c-11.815385 3.938462-19.692308 7.876923-27.569231 7.876923z"
              p-id="4055"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="text_style_top setlanguage_dropdown_wrap"
      :style="{
        width: `100px`,
        height: show ? `94px` : 0,
        opacity: show ? `1` : 0,
        transition: show
          ? 'all 0.1s cubic-bezier(0.07, 0.69, 0.14, 0.8)'
          : 'all 0.1s cubic-bezier(0.7, 0.08, 0.82, 0.16)',
      }"
      @mouseenter="show = true"
      @mouseleave="show = false"
    >
      <div class="options">
        <div class="opt_item" @click="changeLang('en')">EN</div>
        <div class="opt_item" @click="changeLang('zh')">中文</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.setlanguage_div {
  position: relative;
  display: flex;
  justify-content: end;
}
.setlanguage {
  height: 69px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .text {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .icon {
    color: #e621ca;
    fill: #fff;
    height: 14px;
    width: 14px;
  }
}
.hover {
  .text {
    color: #e621ca;
  }
  .icon {
    fill: #e621ca;
  }
}

.setlanguage_dropdown_wrap {
  max-height: calc(100vh - 69px) !important;
  width: fit-content;
  height: fit-content;
  background-color: #000000;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(236, 226, 235, 0.234);
  position: absolute;
  top: 60px;
  left: 20%;
  transform: translateX(-50%);
  overflow: hidden;
  display: flex;

  .options {
    width: 100%;
    padding: 10px;
    height: 94px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .opt_item {
      cursor: pointer;
      width: 100%;
      height: 35px;
      text-align: center;
      line-height: 35px;
      flex-shrink: 0;
      color: #fff;
      &:hover {
        color: #e621ca;
        border-radius: 6px;
        background: #414242;
      }
    }
  }
}
</style>
