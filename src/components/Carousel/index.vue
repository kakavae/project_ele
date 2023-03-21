<template>
  <MySwiper class="swiper" :options="swiperOptionFuther || swiperOption">
    <swiper-slide v-for="item of imagesSwiper" :key="item.id"><img :src="item.imgUrl" /></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </MySwiper>
</template>

<script>
// 导入轮播图的两个组件
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'MyCarousel',
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  props: ['imagesSwiper', 'swiperOptionFuther'],
  components: {
    MySwiper: Swiper,
    SwiperSlide
  }
}
</script>

<style lang="less" scoped>
img {
  height: 100% !important;
  width: 100%;
}
</style>
