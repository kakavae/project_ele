// 导入search模块发送Ajax请求的函数
import { reqSearchList } from '@/api/index.js'

const state = {
  searchObj: {}
}
const actions = {
  async getSearchObj(context, params = {}) {
    // 发送Ajax请求
    const result = await reqSearchList(params)
    // console.log('@', params)
    // console.log('@', result)
    if (result.code === 200) {
      context.commit('GETSEARCHOBJ', result.data)
    }
  }
}
const mutations = {
  GETSEARCHOBJ(state, searchObj) {
    state.searchObj = searchObj
  }
}
const getters = {
  total() {
    return state.searchObj.total
  },
  // 一共有多少条数据
  pageSize() {
    return state.searchObj.pageSize
  },
  // 当前是第几页
  pageNo() {
    return state.searchObj.pageNo
  },
  // 一共有多少页
  totalPages() {
    return state.searchObj.totalPages
  },
  trademarkList(state) {
    return state.searchObj.trademarkList || []
  },
  attrsList(state) {
    return state.searchObj.attrsList || []
  },
  goodsList(state) {
    return state.searchObj.goodsList || []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
