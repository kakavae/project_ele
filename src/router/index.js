import VueRouter from 'vue-router'
import Vue from 'vue'

import MyHome from '@/pages/Home'
import MyLogin from '@/pages/Login'
import MyRegister from '@/pages/Register'
import MySearch from '@/pages/Search'
import MyDetail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import MyTrade from '@/pages/Trade'
import MyPay from '@/pages/Pay'

// 获取和修改token
import { getToken } from '@/utils/setToken.js'
// 还是直接导入store，因为挂载在vue上面的$store其实就是store里面导出的store，可以拿到所有组件的state，以及dispatch，commit方法
import store from '@/store/index.js'

Vue.use(VueRouter) // 将VueRouter挂载到Vue上面，实际上其就是一个插件

// 重写VueRouter.prototype的push和replace方法，防止编程式导航报错
let originPush = VueRouter.prototype.push // 在全局开了一个地址保存，所以运行的时候this应该指向全局对象，Vue里面就是undefined
let originReplace = VueRouter.prototype.replace

// 注意保证原始push方法调用的时候上下文对象this要指向VueRouter才不会报错
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush(location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (loocation, resolve, reject) {
  if (resolve && reject) {
    originReplace(location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const routes = [
  {
    path: '/home',
    component: MyHome,
    meta: { show: true }
  },
  {
    path: '/login',
    component: MyLogin,
    meta: { show: true }
  },
  {
    path: '/register',
    component: MyRegister,
    meta: { show: true }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/search/:keyword?',
    component: MySearch,
    meta: { show: true },
    name: 'search'
  },
  {
    path: '/detail/:skuid',
    name: 'detail',
    meta: { show: true },
    component: MyDetail
  },
  {
    path: '/addGoodsCartSuccess',
    name: 'AddCartSuccess',
    meta: { show: true },
    component: AddCartSuccess
  },
  {
    path: '/GoodsCart',
    name: 'goodsCart',
    meta: { show: true },
    component: ShopCart
  },
  {
    path: '/trade',
    name: 'trade',
    meta: { show: true },
    component: MyTrade
  },
  {
    path: '/pay',
    name: 'pay',
    meta: { show: true },
    component: MyPay
  }
]

const router = new VueRouter({
  routes,
  // 路由的滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 如果有token
  if (getToken()) {
    // 1.如果有token，就不能再去login和register页面
    if (to.path === '/login' || to.path === '/register') {
      next(false)
    }
    // 2. 去的不是登录和注册页面，如果userinfo里面没有信息了，就重新dispatch请求，获取userinfo
    else if (!store.state.register_login.userinfo.email) {
      try {
        // try代码块中的promise状态如果返回的是reject，就会被catch，只有返回Promise.resolve()才会被await前面的参数接收到
        await store.dispatch('register_login/getUserinfo')
        // 2.1 token有效，获取用户信息成功---actions里面的写法保证如果resolved，返回的resultcode一定是200
        next()
      } catch (e) {
        // 2.2.token失效，清除vuex中userinfo里面的数据，删除本地存储的token，这个就调用退出登录的dispatch
        try {
          store.dispatch('register_login/getLogout')
          next('/home')
        } catch (e) {
          alert('识别用户信息失败，请重新登录')
          next('/login')
        }
      }
    }
    // 3. 去的不是login和register，并且userinfo里面有数据，那就直接放行
    else {
      next()
    }
  }
  // 没有token，直接放行，后期限制不可以去的页面
  else {
    next()
  }
  // console.log(to, from)
})

export default router
