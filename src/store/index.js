// 导入vue vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 导入modules以后的分别的store
import home from '@/store/home'
import search from '@/store/search'
import detail from '@/store/detail'
import shopcart from '@/store/shopcart'
import register_login from '@/store/register_login'
import trade from '@/store/trade'

// 将vuex注册为插件 必须在这个位置，使用Vuex.Store()构造store实例之前
Vue.use(Vuex)

// 生成store实例并导出
export default new Vuex.Store({
  // 使用modules管理vuex，防止数据混乱，维护出错
  modules: {
    home,
    search,
    detail,
    shopcart,
    register_login,
    trade
  }
})
