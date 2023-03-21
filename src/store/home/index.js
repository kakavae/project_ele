import { reqCategoryList, reqImagesURL, reqFloorMsg } from '@/api/index.js' // 配套TypeNav用于发送ajax请求获取数据的方法

// home组件用到的state，actions，mutations
// home组件下面的List组件以及Floor组件的state，actions，mutations也放在这里
const state = {
  // 三级联动
  categoryList: [],
  // home swiper
  imagesSwiper: [],
  // floor组件的渲染数据
  floorMsg: []
}

const actions = {
  // 三级联动
  async getCategory(context) {
    // 发送ajax请求，接收数据，传数据给mutations
    context.commit('GETCATEGORY', (await reqCategoryList()).data)
  },

  // home swiper
  getImagesSwiper(context) {
    // 发送ajax请求，如果请求成功，就触发commit，通知mutation修改数据
    // 如果出现错误，就catch，打印看一下
    reqImagesURL()
      .then(({ data }) => {
        // console.log(data)
        context.commit('GETIMAGESSWIPER', data)
      })
      .catch((err) => {
        console.log('请求图片出错', err)
      })
  },

  // 获取floor数据的ajax请求
  async getFloorMsg(context) {
    context.commit('GETFLOORMSG', (await reqFloorMsg()).data)
  }
}

const mutations = {
  // 三级联动
  GETCATEGORY(state, categoryList) {
    // console.log(categoryList)
    state.categoryList = categoryList
  },

  // home swiper
  GETIMAGESSWIPER(state, imagesSwiper) {
    // console.log(state, imagesSwiper)
    // 修改state里面的数据
    // console.log('修改state中的数据')
    state.imagesSwiper = imagesSwiper
  },

  // 根据获取到的floor数据修改state里面的数据
  GETFLOORMSG(state, floorMsg) {
    // console.log(floorMsg)
    state.floorMsg = floorMsg
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
