// 对请求和响应的API作统一管理
import request from './request.js'

// 三级联动

const reqCategoryList = () => {
  return request({
    method: 'GET',
    url: '/api/product/getBaseCategoryList'
  })
}

// 请求轮播图图片的小axios
const reqImagesURL = () => {
  return request({
    method: 'GET',
    url: '/api/images/swiper'
  })
}

// 调用这个函数就可以向服务器请求floor渲染数据
const reqFloorMsg = () => {
  return request({
    method: 'GET',
    url: '/api/images/floorMsg'
  })
}

// 调用这个函数就可以向服务器请求search模块的数据
const reqSearchList = (params) => {
  return request({
    method: 'POST',
    url: '/api/list',
    data: params
  })
}

// 调用这个函数可以向服务器请求商品的详细信息
const reqGoodsDetail = (skuid) => {
  return request({
    url: `/api/item/${skuid}`,
    methods: 'GET'
  })
}

// 调用这个函数向服务器发送请求添加购物车数据
const reqGoodsCart = (skuId, skuNum) => {
  return request({
    method: 'POST',
    url: `/api/cart/addToCart/${skuId}/${skuNum}`
  })
}

// 获取游客的购物车列表
const reqGoodsCartList = () => {
  return request({
    method: 'GET',
    url: '/api/cart/cartList'
  })
}

// 更新商品的勾选状态
const reqGoodsCheck = (skuId, isChecked) => {
  return request({
    method: 'GET',
    url: `/api/cart/checkCart/${skuId}/${isChecked}`
  })
}

// 删除商品
const removeGoods = (skuId) => {
  return request({
    method: 'GET',
    url: `/api/cart/deleteCart/${skuId}`
  })
}

// 获取注册所用的验证码
const reqRegisterCode = (email) => {
  return request({
    method: 'POST',
    url: '/api/user/passport/code',
    data: {
      email
    }
  })
}

// 注册用户
const reqRegister = ({ email, password, code }) => {
  return request({
    method: 'POST',
    url: '/api/user/passport/register',
    data: {
      email,
      password,
      code
    }
  })
}

// 登录用户
const reqLogin = ({ email, password }) => {
  return request({
    method: 'POST',
    url: '/api/user/passport/login',
    data: {
      email,
      password
    }
  })
}

// 用户登录以后拿着token去服务器请求获取token中的信息
const reqUserinfo = () => {
  return request({
    method: 'GET',
    url: '/my/userinfo'
  })
}

// 用户退出登录
const reqLogout = () => {
  return request({
    method: 'GET',
    url: '/api/user/passport/logout'
  })
}

// 获取用户交易页的详细信息
const reqTradeInfo = () => {
  return request({
    method: 'GET',
    url: '/my/order/auth/trade'
  })
}

// 发送用户交易的相关信息和获取订单交易页信息拿到的tradeNo，拿到一个订单号
const reqOrderId = (tradeNo, data) => {
  return request({
    method: 'POST',
    url: `/my/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data: data
  })
}

export { reqCategoryList, reqImagesURL, reqFloorMsg, reqSearchList, reqGoodsDetail, reqGoodsCart, reqGoodsCartList, reqGoodsCheck, removeGoods, reqRegisterCode, reqRegister, reqLogin, reqUserinfo, reqLogout, reqTradeInfo, reqOrderId }
