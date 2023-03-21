<template>
  <div>
    <!-- shortcut是快捷导航的意思 -->
    <section class="shortcut">
      <div class="w">
        <div class="fl">
          <ul>
            <li class="fl">品优购欢迎您！</li>
            &nbsp;&nbsp;
            <!-- 如果userinfo当中有email，就说明已经登录了，显示的就不是下面的字 -->
            <li class="fl" v-if="!userinfo.email"><router-link to="/login">请登录</router-link>&nbsp;&nbsp;<router-link to="/register" class="style_red">免费注册</router-link></li>
            <li class="fl" v-else>
              <a>欢迎您：{{ userinfo.email }}</a
              >&nbsp;&nbsp;
              <a @click="logout">退出登录</a>
            </li>
          </ul>
        </div>
        <div class="fr">
          <ul>
            <li>我的订单</li>
            <li></li>
            <li class="arrow_icon">我的品优购&nbsp;</li>
            <li></li>
            <li>品优购会员</li>
            <li></li>
            <li>企业采购</li>
            <li></li>
            <li class="arrow_icon">关注品优购</li>
            <li></li>
            <li class="arrow_icon">客户服务</li>
            <li></li>
            <li class="arrow_icon">网站导航</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyShortcut',
  // 获取home的vuex中保存的用户信息，根据不同的情况渲染不同的页面
  computed: {
    ...mapState('register_login', ['userinfo'])
  },
  methods: {
    async logout() {
      // 登陆了以后保存的token信息在登录和注册的vuex当中，所以通知这个vuex仓库修改数据
      try {
        const result = await this.$store.dispatch('register_login/getLogout')
        if (result) {
          this.$router.push('/home')
        }
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style scoped>
.shortcut {
  height: 31px;
  background-color: #f1f1f1;
  line-height: 31px;
}
/* 里面有文字的小li不需要给定高度和行高，因为都会继承shortcut的高度和行高 */
.shortcut .fr ul li {
  float: left;
}
/* 规定偶数的小li宽度是1，相当于把盒子做成了竖线 */
.shortcut .fr ul li:nth-child(even) {
  height: 12px;
  width: 1px;
  background-color: #666666;
  /* 三个值表示：上，左右，下 */
  margin: 9px 14px 0;
}
/* 或者用伪元素选择器，在li的后面放一个盒子，内容是下拉的箭头， */
.shortcut .fr ul .arrow_icon::after {
  /* 伪元素选择器必须要有content属性 */
  content: '\e90c';
  font-family: 'icomoon';
  margin-left: 6px;
}
</style>
