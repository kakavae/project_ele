// request就是一个小的axios，里面加了一些自己的配置，改变axios的默认行为
// axios还是那个第三方的包

import axios from 'axios'
// 导入进度条
import nProgress from 'nprogress'
// 导入进度条匹配的样式
import 'nprogress/nprogress.css'
// 导入获取localStorage中的UUID的js
import getUUID from '@/utils/getUUID.js'
// 导入vuex中的js拿到token数据
import store from '@/store/register_login/index.js'

const request = axios.create({
  // 请求的基础路径，如果url配置不是一个绝对URL，就会加在url的前面
  baseURL: 'http://127.0.0.1:8090',
  timeout: 5000 // 请求的超时时间
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在每一次发送请求之前需要做的事情都放在这里
    // 1. 携带游客身份的UUIDTOKEN  这个UUID也可以在vuex里面拿，数据保存在vuex当中
    if (getUUID()) {
      config.headers.UUIDTOKEN = getUUID()
    }

    // 2. 携带用户的token到请求头当中 token字段存储在login的vuex当中
    if ((store.state || {}).token) {
      config.headers.Authorization = (store.state || {}).token
    }

    nProgress.start()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    nProgress.done()
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 不能在这里写，这里的配置只会执行一次

export default request
