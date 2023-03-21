<template>
  <div>
    <!-- 头部模块开始 -->
    <header class="w header">
      <div class="logo">
        <!-- 先用yigelogo大盒子，里面放h1，h1里面再放a，a的大小就是点击范围的大小，a的背景图片就放logo，同时因为a要有宽度和高度，所以把a转换为块元素， -->
        <!-- h1的目的是告诉搜索引擎这里很重要，链接里面放文字，最后不显示出来，是为了搜索引擎能收录
            需要titla属性 -->
        <h1><router-link to="/home">品优购首页</router-link></h1>
      </div>
      <!-- input和button都是行内块元素,放在一起会有间距的问题,所以必须浮动起来 -->
      <div class="search"><input type="search" name="" id="" placeholder="语言开发" v-model="keyword" /><button @click="search">搜索</button></div>
      <div class="hotwords">
        <a href="#">优惠购首发</a>
        <a href="#">亿元优惠</a>
        <a href="#">9.9元团购</a>
        <a href="#">美满99减30</a>
        <a href="#">办公用品</a>
        <a href="#">电脑</a>
        <a href="#">通信</a>
      </div>
      <div class="shopcar">我的购物车<i class="count">8</i></div>
    </header>
    <!-- 头部模块结束 -->
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      // 1.字符串写法
      // this.$router.push('/search/' + this.keyword + '?key=' + this.keyword.toUpperCase())
      // 如果当前组件还有query参数，即属于已经通过三级联动跳转到Serch组件，Search组件的路由信息里面有query参数，再次跳转的时候就将query参数和params参数合并在一起传递
      const location = {
        name: 'search',
        params: { keyword: this.keyword }
      }
      if (Object.keys(this.$route.query).length !== 0) {
        location.query = this.$route.query
      }
      this.$router.push(location)
      // console.log(this.$router)
    }
  },
  mounted() {
    this.$bus.$on('clearKeyword', () => {
      this.keyword = ''
    })
  }
}
</script>

<style scoped>
/* 头部开始 */
.header {
  position: relative;
  height: 106px;
}
/* logo模块 */
/* 给logo用绝对定位控制位置，里面放a */
.header .logo {
  position: absolute;
  top: 27px;
  left: 0;
}
/* 给a设定宽度高度并放logo为背景图片 */
.header .logo a {
  display: block;
  width: 171px;
  height: 61px;
  background: url(@/assets/images/logo.png) no-repeat;
  /* 隐藏链接里面的文字： */
  /* font-size: 0; */
  /* 方法二：缩进到盒子外面然后隐藏起来 */
  text-indent: -999px;
  overflow: hidden;
}
/* 搜索模块 */
.header .search {
  position: absolute;
  left: 348px;
  top: 25px;
  width: 539px;
  height: 37px;
  border: 2px solid #b1191a;
}
.header .search input {
  float: left;
  width: 454px;
  height: 33px;
  padding-left: 10px;
  /* input和button默认属性的更改在base.css里面 */
}
.header .search button {
  float: left;
  width: 81px;
  height: 33px;
  background-color: #b1191a;
  color: #fff;
  font-size: 16px;
}
.header .hotwords {
  position: absolute;
  top: 70px;
  left: 348px;
}
.header .hotwords a {
  margin: 12px;
}
.header .shopcar {
  position: absolute;
  left: 997px;
  top: 25px;
  width: 140px;
  height: 35px;
  line-height: 33px;
  border: 1px solid #dfdfdf;
  background-color: #f7f7f7;
  text-align: center;
}
/* 在前面和后面各放一个伪元素,里面的content就是小图标 */
.header .shopcar::before {
  content: '\e92a';
  font-family: 'icomoon';
  margin-right: 6px;
}
.header .shopcar::after {
  content: '\e922';
  font-family: 'icomoon';
  /* 注意这里加的是斜杠\,不是反斜杠/ */
  margin-left: 6px;
}
/* 购物数量模块 */
.header .shopcar .count {
  /* 子绝父绝 */
  position: absolute;
  left: 99px;
  top: -2px;
  height: 14px;
  /* 这里的行高会继承父元素的像素,所以要重新定义 */
  line-height: 14px;
  padding: 0 3px;
  border-radius: 7px 7px 7px 0;
  background-color: #e60012;
  font-size: 10px;
  color: #fff;
}
</style>
