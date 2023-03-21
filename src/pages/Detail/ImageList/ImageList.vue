<template>
  <div>
    <!-- 下面这个div可以用事件委托，所以插槽里面不止可以用插槽的方法传递数据，还可以用事件委托传递数据，其中还要利用自定义属性data-...和$event.target.dataset -->
    <div>
      <MySwiper class="swiper" :options="swiperOption">
        <!-- 这个应该是通过插槽传递过去的标签，会在swiper-slide组件的slot位置去展示 -->
        <swiper-slide v-for="item of imgUrlList" :key="item.id"><img :src="item.imgUrl" :class="{ active: activeIndex === item.id }" :data-id="item.id" @click="changeImg(item.id)" /></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev butt" slot="button-prev"></div>
        <div class="swiper-button-next butt" slot="button-next"></div>
      </MySwiper>
    </div>
  </div>
</template>

<script>
// 导入轮播图的两个组件
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// 轮播图已经注册为全局组件了
export default {
  name: 'ImageList',
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        // 禁止拖动
        // onlyExternal: true,
        // 启动点击效果
        // preventClicks: false,
        // on: {
        //   click: function (e) {
        //     // this.activeIndex = e.target.dataset.id
        //     console.log(e.target.dataset.id)
        //     // 修改activeIndex的值
        //     // 通过全局事件总线通知兄弟组件修改展示的大图
        //     // 因为这里的this指向的是swiper组件，而不是当前组件，相当于把这个配置通过props传递到子组件，子组件再渲染出一定的效果
        //     // 所以这里要通过全局事件总线传递点击的图片的id，当前组件接收到这个事件之后修改activeIndex，从而修改了子组件的显示效果
        //     // this.$bus.$emit('changeImg', e.target.dataset.id)
        //     console.log(this)
        //   }
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      activeIndex: 6
    }
  },
  components: {
    MySwiper: Swiper,
    SwiperSlide
  },
  computed: {
    imgUrlList() {
      // 初始渲染数据的时候这个请求还没有发送，所以大的goodsDetail还是一个空对象，所以这里读取到的是undefined，要用一个空对象，前面是undefined，就返回后面的空对象
      return (this.$store.state.detail.goodsDetail.skuInfo || {}).skuImageList || []
    }
  },
  methods: {
    changeImg(id) {
      // console.log(id) 每一个图片处在一个对象当中，这个对象中存储着这个图片的唯一id
      // console.log(e.target.dataset.id)
      // 1. 修改当前应该活跃的图片
      this.activeIndex = id
      // 2. 通知兄弟组件，显示的图片要更换了
      this.$bus.$emit('changeDisplayImg', id)
    }
  }
}
</script>

<style lang="less" scoped>
img {
  height: 100% !important;
  width: 100%;
}
.active {
  border: 1px solid rgb(220, 156, 38);
}

.butt {
  width: 10px !important;
  height: 10px !important;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 20px;
  color: red;
}
</style>
