import Vue from 'vue'
import App from '@/App.vue'

// 导入路由控制模块
import router from '@/router'
// 导入Vuex的store模块
import store from '@/store/index.js'

// 导入swiper轮播图依赖的css样式，css只需要导入即可编译到html中
import 'swiper/css/swiper.css'

// 导入需要注册为全局组件的组件
import MyTypeNav from '@/components/TypeNav'
// 导入封装好的轮播图组件
import MyCarousel from '@/components/Carousel'
// 导入分页器组件
import MyPager from '@/components/Pager'

// 导入封装好的ajax模块用于请求服务器数据
import * as ajax from '@/api/index.js'

Vue.config.productionTip = false

// 三级联动效果注册为全局组件
Vue.component('MyTypeNav', MyTypeNav)
// 将轮播图组件注册为全局组件
Vue.component('MyCarousel', MyCarousel)
// 将分页器注册为全局组件
Vue.component(MyPager.name, MyPager)

new Vue({
  render: (h) => h(App),
  // 部署全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$ajax = ajax
  },
  router,
  store
}).$mount('#app')
