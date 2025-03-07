import { createApp } from 'vue'
import App from './App.vue'
// 导入 normalize
import 'normalize.css'
// 导入自定义的公共样式
import '@/assets/styles/common.less'


// 导入路由
import router from './router/index'
// 导入复用组件
import plugin from "./components/index";
// 导入 pinia
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


import piniaPersist from "pinia-plugin-persistedstate"; // 引入持久化插件
let pinia = createPinia()
pinia.use(piniaPersist); // 使用持久化插件

createApp(App).use(pinia)
    .use(router)
    .use(ElementPlus)
    .use(plugin)
    .mount('#app')
