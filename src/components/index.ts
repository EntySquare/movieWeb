// 管理所有的全局组件
import { App } from "vue";
import OpenScreen from "./OpenScreen.vue";
import OpenScreenPhone from "./OpenScreenPhone.vue";
import set_language from "./set_language.vue";

// 将全局组件封装到插件中
export default {
  install(Vue: App) {
    Vue.component("OpenScreen", OpenScreen);
    Vue.component("SETLANGUAGE", set_language);
    Vue.component("OpenScreenPhone", OpenScreenPhone);
  },
};
