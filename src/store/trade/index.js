// 导入请求的函数，函数调用返回的是一个promise
import { reqTradeInfo } from '@/api/index.js'

const state = {
  tradeInfo: {}
}
const actions = {
  async getTradeInfo(context) {
    try {
      const result = await reqTradeInfo()
      // 请求成功返回的代码是200，如果不成功比如token失效或者没有登录，那就要跳转到登录页，跳到登录页之后输入用户信息，成功登录之后就要跳转到结算当前的这个页面
      if (result.code === 200) {
        // 提交修改state
        context.commit('GETTRADEINFO', result.data)
        return Promise.resolve(result.ok)
      }
      return Promise.reject(new Error('fail'))
    } catch (e) {
      return Promise.reject(new Error(e))
    }
  }
}
const mutations = {
  GETTRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  }
}
const getters = {
  detailArrayList(state) {
    return state.tradeInfo.detailArrayList || []
  },
  totalAmount(state) {
    return state.tradeInfo.totalAmount
  },
  totalNum(state) {
    return state.tradeInfo.totalNum
  },
  userAddressList(state) {
    return state.tradeInfo.userAddressList || []
  },
  tradeNo(state) {
    return state.tradeInfo.tradeNo
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
