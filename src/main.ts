import { createApp } from 'vue'
import App from './App.vue'
// 导入 normalize
import 'normalize.css'
// 导入自定义的公共样式
import '@/assets/styles/common.less'
// 导入 国际化
import i18n from './locale/index'

// 导入路由
import router from './router/index'
// 导入复用组件
import plugin from "./components/index";
// 导入 pinia
import { createPinia } from 'pinia'
// 导入 element-plus 图标
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

import 'element-plus/dist/index.css';


import piniaPersist from "pinia-plugin-persistedstate"; // 引入持久化插件
let pinia = createPinia()
pinia.use(piniaPersist); // 使用持久化插件


createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(plugin).use(pinia)
    .use(i18n)
    .mount('#app')


// 挂载 element-plus 图标
