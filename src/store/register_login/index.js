import { reqRegisterCode, reqRegister, reqLogin, reqUserinfo, reqLogout } from '@/api/index.js'
// 导入存储localStorage的模块
import { setToken, getToken, clearToken } from '@/utils/setToken.js'

const state = {
  // token默认从localStorage中读取
  token: getToken(),
  // 用户信息
  userinfo: {}
}
const actions = {
  // 获取验证码的actions
  getRegisterCode(context, email) {
    reqRegisterCode(email)
    console.log(email)
  },

  // 发起注册请求的actions
  async getRegister(context, regObj) {
    // 这个对象需要有email,password,code三个属性
    // console.log(regObj)
    try {
      let result = await reqRegister(regObj)
      if (result.code === 200) {
        return Promise.resolve(result.message)
      }
      return Promise.reject('注册失败')
    } catch (e) {
      return Promise.reject(e)
    }
  },

  // 发起登录请求的actions
  async getLogin(context, loginObj) {
    try {
      const result = await reqLogin(loginObj)
      if (result.code === 200) {
        // 1.登陆成功以后就将token存储到localStorage
        setToken(result.data.token)
        // 2.登录请求发送成功，获得成功的结果，commit，修改state中的token，因为这个时候的token并没有和localStorage中的保持同步，state中的数据只会在初始渲染的时候更新一次，以后的更新都要依赖于mutations
        context.commit('GETLOGIN', result.data.token)
        return Promise.resolve(result)
      } else {
        return Promise.reject(result)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  },

  // 拿着现有的token去服务器请求用户的数据
  async getUserinfo(context) {
    try {
      const result = await reqUserinfo()
      // 利用token拿到用户的信息以后，将这个信息存储在vuex当中
      context.commit('GETUSERINFO', result.data)
      if (result.code === 200) {
        return result // 这样返回一个参数，默认会被包装为Promise.resolve(result)
      } else {
        return Promise.reject(new Error('获取用户信息失败，token可能失效')) // code不等于200就认为token失效
      }
    } catch (e) {
      return Promise.reject(new Error('获取用户信息失败，token可能失效'))
    }
  },

  // 退出登录的actions
  async getLogout(context) {
    try {
      const result = await reqLogout()
      if (result.code === 200) {
        // 清除本地localStorage存储的token
        clearToken()
        // 清除vuex仓库当中存储的token和个人信息
        context.commit('GETLOGOUT')
        return 'ok'
      }
      return Promise.reject('失败')
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

const mutations = {
  GETLOGIN(state, token) {
    state.token = token
  },

  // 根据token返回的用户信息，修改state
  GETUSERINFO(state, userinfo) {
    state.userinfo = userinfo
  },

  GETLOGOUT(state) {
    state.token = ''
    state.userinfo = {}
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
