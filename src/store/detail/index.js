// 导入发送Ajax请求的模块
import { reqGoodsDetail, reqGoodsCart } from '@/api/index.js'

const state = {
  goodsDetail: {}
}
const actions = {
  // 发送ajax请求获取产品的详细信息
  async getGoodsDetail(context, skuid) {
    // 发送ajax请求
    // reqGoodsDetail(skuid).then((result) => {
    //   if (result.code === 200) {
    //     // 根据请求的结果通知mutations修改state中的内容
    //     context.commit('GETGOODSDETAIL', result.data)
    //   }
    // })
    const result = await reqGoodsDetail(skuid)
    if (result.code === 200) {
      context.commit('GETGOODSDETAIL', result.data)
    }
  },
  // 发送ajax请求通知服务器添加商品到购物车
  async addGoodsCart(context, skuObj) {
    const result = await reqGoodsCart(skuObj.skuId, skuObj.skuNum)
    if (result.code === 200) {
      // console.log(result)
      return result.ok
    } else {
      return Promise.reject('error')
    }
  }
}
const mutations = {
  GETGOODSDETAIL(state, data) {
    state.goodsDetail = data
  }
}
const getters = {
  // 注意这里要加||{}防止在undefined上面去寻找属性导致报错
  skuInfo(state) {
    return state.goodsDetail.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsDetail.spuSaleAttrList || {}
  },
  categoryView(state) {
    return state.goodsDetail.categoryView || {}
  }
}

export default {
  namespaced: 'true',
  state,
  actions,
  mutations,
  getters
}
