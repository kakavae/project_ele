<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mouseenter="bigDisplay = true" @mouseleave="bigDisplay = false" @mousemove="changePosition($event)"></div>
    <div class="big" :style="bigStyle">
      <img :src="imgUrl" :style="bigImgStyle" />
    </div>
    <div class="mask" :style="maskStyle" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'MyZoom',
  data() {
    return {
      imgUrlID: 0,
      // 决定遮罩层和放大的图片是否显示的变量
      bigDisplay: false,
      // 鼠标在mask里面移动的时候拿到鼠标的坐标并把这个坐标适当放大以后给big的top和left
      bigImgTop: 0,
      bigImgLeft: 0,
      maskTop: 0,
      maskLeft: 0,
      timer: null
    }
  },
  methods: {
    changePosition(e) {
      const fn = () => {
        // console.log(e)
        // console.log(e.target.offsetWidth, e.target.offsetHeight)
        // 还需要加上盒子宽度的一半和高度的一半

        // 将offsetX和offsetY限制在一定的范围之内防止放大镜脱离区域

        // that.bigImgLeft = -e.offsetX * 2 + e.target.offsetWidth / 2
        // that.bigImgTop = -e.offsetY * 2 + e.target.offsetHeight / 2

        // 更改mask的位置
        this.maskLeft = e.offsetX - this.$refs.mask.offsetWidth / 2
        this.maskTop = e.offsetY - this.$refs.mask.offsetHeight / 2

        if (this.maskLeft < 0) {
          this.maskLeft = 0
        }
        if (this.maskLeft > e.target.offsetWidth - this.$refs.mask.offsetWidth) {
          this.maskLeft = e.target.offsetWidth - this.$refs.mask.offsetWidth
        }
        if (this.maskTop < 0) {
          this.maskTop = 0
        }
        if (this.maskTop > e.target.offsetHeight - this.$refs.mask.offsetHeight) {
          this.maskTop = e.target.offsetHeight - this.$refs.mask.offsetHeight
        }

        this.bigImgLeft = -2 * this.maskLeft
        this.bigImgTop = -2 * this.maskTop
      }
      // 设置一个节流阀防止高频次执行任务
      const throttle = (delay, fn) => {
        if (!this.timer) {
          fn()
          this.timer = setTimeout(() => {
            this.timer = null
          }, delay)
        }
      }
      throttle(1, fn)
    }
  },
  computed: {
    imgUrlList() {
      // 初始渲染数据的时候这个请求还没有发送，所以大的goodsDetail还是一个空对象，所以这里读取到的是undefined，要用一个空对象，前面是undefined，就返回后面的空对象
      // 从vuex中拿数据
      return (this.$store.state.detail.goodsDetail.skuInfo || {}).skuImageList || []
    },
    imgUrl() {
      // 应该返回的是数组中对象的属性中id为imgUrlID的对象的imgUrl
      for (let i = 0; i < this.imgUrlList.length; i++) {
        if (this.imgUrlList[i].id === this.imgUrlID) {
          return this.imgUrlList[i].imgUrl
        }
      }
      return (this.imgUrlList[this.imgUrlID] || {}).imgUrl
    },
    bigStyle() {
      return {
        display: this.bigDisplay ? 'block' : 'none'
      }
    },
    bigImgStyle() {
      return { top: this.bigImgTop + 'px', left: this.bigImgLeft + 'px' }
    },
    maskStyle() {
      return {
        display: this.bigDisplay ? 'block' : 'none',
        top: this.maskTop + 'px',
        left: this.maskLeft + 'px'
      }
    }
  },
  mounted() {
    // console.log(this.$refs.mask.offsetWidth)
    // 监听$bus上面通知的需要修改显示的图片的事件
    this.$bus.$on('changeDisplayImg', (id) => {
      // 遍历imgUrlList数组，找到id为传入的id的对象，然后将这个对象的imgUrl给图片
      this.imgUrlID = id
      // console.log(this) // 这里的this指向的是vc而不是vm，如果用箭头函数，箭头函数没有this,this就会指向所在环境的this,这里就是mounted函数的this，那也就是vm
    })
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  // .event:hover ~ .mask,
  // .event:hover ~ .big {
  //   display: block;
  // }
}
</style>
