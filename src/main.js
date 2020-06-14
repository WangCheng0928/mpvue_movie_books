import Vue from 'vue'
import App from './App'

// 关闭vue开发中的一些提示
Vue.config.productionTip = false

// 声明当前的组件为整个应用
App.mpType = 'app'

// 生成当前应用的实例
const app = new Vue(App)

// 挂在当前应用的实例
app.$mount()
