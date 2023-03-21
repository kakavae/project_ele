import { reqGoodsCartList, reqGoodsCart, reqGoodsCheck, removeGoods } from '@/api/index.js'

const state = {
  goodsCartList: []
}
const actions = {
  // 获取购物车列表的数据
  async getGoodsCartList(context) {
    let result = await reqGoodsCartList()
    if (result) {
      context.commit('GETGOODSCARTLIST', result.data)
    }
  },
  // 修改商品的数量
  updateGoodsCart(context, skuObj) {
    return reqGoodsCart(skuObj.skuId, skuObj.deltaNum)
  },
  // 修改购物车中商品的勾选状态
  updateGoodsCheck(context, checkObj) {
    return reqGoodsCheck(checkObj.skuId, checkObj.isChecked)
  },
  // 修改商品是否全选
  async updateIsAllCheck(context, isChecked) {
    const promiseAll = []
    context.state.goodsCartList.forEach((item) => {
      if (item.isChecked !== isChecked) {
        let promise = reqGoodsCheck(item.skuId, isChecked)
        promiseAll.push(promise)
      }
    })
    return Promise.all(promiseAll)
  },
  // 删除商品
  async removeCartGoods(context, skuId) {
    return removeGoods(skuId)
  },
  // 删除选中的商品
  removeSelGoods(context) {
    const promiseAll = []
    context.state.goodsCartList.forEach((item) => {
      if (item.isChecked !== '0') {
        let promise = removeGoods(item.skuId)
        promiseAll.push(promise)
      }
    })
    return Promise.all(promiseAll)
  }
}
const mutations = {
  GETGOODSCARTLIST(state, data) {
    state.goodsCartList = data
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
