<template>
  <div id="app">
    <MyShortcut></MyShortcut>
    <MyHeader v-if="true"></MyHeader>
    <router-view></router-view>
    <!-- 登录和注册组件没有MyFooter组件 -->
    <!-- 这里的$route代表谁的路由信息？谁被显示出来就代表谁的路由信息-->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
import MyShortcut from '@/components/Shootcut/index.vue'
import MyHeader from '@/components/Header/index.vue'
import MyFooter from '@/components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    MyShortcut,
    MyHeader,
    MyFooter
  },
  mounted() {
    // 给vuex发dispatch，获取三级联动的数据
    this.$store.dispatch('home/getCategory')
    // 给vuex发送dispatch，让actions发送Ajax请求获取floor的渲染信息，这个请求不适合在floor发，因为floor要挂载两次，适合在app组件发
    this.$store.dispatch('home/getFloorMsg')
  }
}
</script>

<style scoped></style>
