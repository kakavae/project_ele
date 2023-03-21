<template>
  <div>
    <MyTypeNav />
    <MyList />
    <MyRecommend />
    <MyRank />
    <MyLike />
    <!-- 
      1. MyFloor组件的数目是由Floor渲染数据来决定的，所以要在其父组件也就是home组件拿到这些渲染信息
      2. 同时，Floor渲染数据中有一部分还要传递给Floor组件内部，使用props传参
      3. 两个组件里面的数据结构完全相同只是内容会不同，所以直接将item传递给MyFloor组件
    -->
    <MyFloor v-for="item of floorMsg" :key="item.id" :floorMsg="item" :name="item.name" :keywords="item.keywords" :imgUrl="item.imgUrl" :carouselList="item.carouselList" :navList="item.navList" :bigImg="item.bigImg" :recommendList="item.recommendList"></MyFloor>
    <MyBrand />
  </div>
</template>

<script>
import MyList from '@/pages/Home/List'
import MyRecommend from '@/pages/Home/Recommend'
import MyRank from '@/pages/Home/Rank'
import MyLike from '@/pages/Home/Like'
import MyFloor from '@/pages/Home/Floor'
import MyBrand from '@/pages/Home/Brand'

import { mapState } from 'vuex'

export default {
  name: 'MyHome',
  components: {
    MyList,
    MyRecommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand
  },
  computed: {
    ...mapState('home', ['floorMsg'])
  },
  mounted() {
    // 从登录页面跳转到home主页的时候，拿着token请求数据并将数据渲染到页面当中
    // 问题：在商品详情刷新页面的时候用户的信息就会消失，因为vuex里面保存的数据随着刷新而消失了
    // 所以要在路由守卫里面判断，决定是否重新带着token去dispatch获取数据
    // this.$store.dispatch('register_login/getUserinfo')
    // console.log(111)
  }
}
</script>

<style></style>
