<template>
  <div>
    <MyTypeNav></MyTypeNav>
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级分类的面包屑 -->
            <li class="with-x" v-if="this.searchInfo.categoryName.length">{{ searchInfo.categoryName }}<i @click="removeCategoryName">×</i></li>
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x" v-if="this.searchInfo.keyword">{{ searchInfo.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌分类的面包屑 -->
            <li class="with-x" v-if="this.searchInfo.trademark">{{ searchInfo.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 遍历展示商品属性的面包屑 -->
            <li class="with-x" v-for="(item, index) of this.searchInfo.props" :key="index">{{ item }}<i @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!-- selector -->
        <MySearchSelector @sendTrademarkInfo="getTrademarkInfo" @sendAttrsListInfo="getAttrsListInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 按照价格或者综合排序，如何区分呢?根据order变量值来区分，用了四个计算属性分别表示四种情况 -->
              <ul class="sui-nav">
                <li :class="{ active: isComprehensive }" @click="changeOrder(1)">
                  <a href="javascript:"
                    >综合<span v-if="isComprehensive"><span v-if="isAsc"></span><span v-if="isDesc"></span></span></a
                  >
                </li>
                <li :class="{ active: isPrice }" @click="changeOrder(2)">
                  <a href="javascript:"
                    >价格<span v-if="isPrice"><span v-if="isAsc"></span><span v-if="isDesc"></span></span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- 中间的商品详情模块 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item of goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"><img :src="item.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器模块 需要传递连续的页码数-->
          <MyPager :total="total" :pageSize="pageSize" :pageNo="pageNo" :continues="7" @changePage="changePage" />
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MySearchSelector from '@/pages/Search/searchSelector'
import { mapGetters } from 'vuex'
export default {
  name: 'MySearch',
  data() {
    return {
      // 搜索功能应该携带的参数
      searchInfo: {
        // 三个分类的id
        categoryFirstId: '',
        categorySecondId: '',
        categoryThirdId: '',
        // 当前选择的分类的名字
        categoryName: '',
        // 搜索的关键字
        keyword: '',
        // 按照什么来排序
        order: '1:desc',
        // 当前的页数
        pageNo: 1,
        // 一页有多少条数据
        pageSize: 10,
        //
        props: [],
        // 在页签上面选择了哪个品牌
        trademark: ''
      }
    }
  },
  methods: {
    getSearchObj() {
      // disptchvuex发送Ajax请求，拿到Search模块的数据
      this.$store.dispatch('search/getSearchObj', this.searchInfo)
    },
    removeCategoryName() {
      this.searchInfo.categoryName = ''
      this.searchInfo.categoryFirstId = undefined
      this.searchInfo.categorySecondId = undefined
      this.searchInfo.categoryThirdId = undefined
      this.getSearchObj()
      // 跳转路由
      // 如果有params参数，也就是关键字参数，就携带params跳转路由
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
        return
      }
      this.$router.push({ name: 'search' })
    },
    removeKeyword() {
      this.searchInfo.keyword = undefined
      // 通知Header组件清除keyword
      this.$bus.$emit('clearKeyword')

      this.getSearchObj()
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 根据子组件传递过来的数据，请求trademark改变以后的数据
    getTrademarkInfo(item) {
      this.searchInfo.trademark = `${item.tmId}:${item.tmName}`
      this.getSearchObj()
    },
    removeTrademark() {
      this.searchInfo.trademark = ''
      this.getSearchObj()
    },
    // 根据子组件传过来的数据，请求attrsListInfo改变以后的数据
    getAttrsListInfo(attr, value) {
      // ["属性ID:属性值:属性名"]
      // 将这个值添加到searchObj当中
      // 数组去重
      // console.log(this.searchInfo.props.indexOf(`${attr.attrId}:${attr.attrName}:${value}`))
      // console.log(this.searchInfo.props.includes(`${attr.attrId}:${attr.attrName}:${value}`))
      this.searchInfo.props.push(`${attr.attrId}:${attr.attrName}:${value}`)
      this.searchInfo.props = Array.from(new Set(this.searchInfo.props))
      // 重新带着新数据发请求
      this.getSearchObj()
    },
    // 移除商品属性面包屑之后调用的方法
    removeProps(index) {
      // 删除props中的第index个
      this.searchInfo.props.splice(index, 1)
    },
    changeOrder(num) {
      // 排序操作
      // 通过数字1和2来区分点击的到底是综合还是价格
      // 1. 如果切换了综合或者排序 当前的order没有包含点击的时候传入的这个order，就说明点击的和当前显示的不一致，需要切换，否侧只需要交给后面切换排序
      if (!this.searchInfo.order.includes(num)) {
        this.searchInfo.order = `${num}:desc`
        return
      }
      // 2. 如果没有切换综合或者价格排序，只是点击想要切换其为升序或者降序
      if (this.isDesc) {
        this.searchInfo.order = `${num}:asc`
      } else {
        this.searchInfo.order = `${num}:desc`
      }
    },
    // 点击页面跳转，父组件监听到子组件的自定义事件，然后发送Ajax请求更新列表
    changePage(page) {
      // alert(page)
      // 修改this.searchInfo的内容并重新发送请求，监听到
      this.searchInfo.pageNo = page
      this.getSearchObj()
    }
  },
  components: {
    MySearchSelector
  },
  computed: {
    ...mapGetters('search', ['trademarkList', 'attrsList', 'goodsList', 'total', 'pageSize', 'pageNo', 'totalPages']),
    isComprehensive() {
      return this.searchInfo.order.includes('1')
    },
    isPrice() {
      return this.searchInfo.order.includes('2')
    },
    isAsc() {
      return this.searchInfo.order.includes('asc')
    },
    isDesc() {
      return this.searchInfo.order.includes('desc')
    }
  },
  watch: {
    // 监听当前路由信息$route的变化，从而将最新的需要携带的数据都添加到searchInfo，同时发起请求，获取数据
    $route: {
      immediate: true,
      handler() {
        Object.assign(this.searchInfo, this.$route.query, this.$route.params)
        this.getSearchObj() // 路由变化也就是需要重新请求列表的时候就请求参数
        // 清空searchInfo里面的三个ID，下次点击三级联动的时候不携带多余的参数
        this.searchInfo.categoryFirstId = ''
        this.searchInfo.categorySecondId = ''
        this.searchInfo.categoryThirdId = ''
      }
    }
  }
  // immediate: true监听器监听路由变化，是晚于beforeCreate，早于其他三个钩子，为什么？
  // 1. immediate表示监听了第一次$route属性的变化，即由undefined到{}
  // 2. a链接的哈希地址匹配到了router文件夹下面的路由规则，然后跳转到search这一条路由，这时候$route就应该已经存在了，所以就会触发created
  // 3. created什么时候触发？data，methods都有了created之前就要解析watch侦听器，解析的时候发现watch有个immediate，所以就会立刻触发，早于created
  // 4. beforeCreate钩子的时候，data，watch这些都没有，所以会早于watch

  // beforeCreate() {
  //   console.log('beforeCreate')
  // },
  // created() {
  //   console.log('created')
  // },
  // beforeMount() {
  //   // 更新searchInfo当中的数据
  //   console.log('beforeMount')
  //   // Object.assign(this.searchInfo, this.$route.query, this.$route.params)
  // },
  // mounted() {
  //   // 为什么mounted里面让vuex发送数据，DOM不是基于vuex的state渲染的吗？mounted的时候才请求数据，你的DOM什么时候根据最新的情况修改呢？
  //   // 答案：当前组件的DOM依赖着计算属性的值，当计算属性所依赖的数据变化以后，就会重新解析虚拟DOM，DOM对比，执行updated和beforeUpdate那一套钩子，同时最新的DOM被渲染，但是mounted不会再触发
  //   console.log('mounted')
  //   // this.getSearchObj()
  // }
}
</script>

<style scoped lang="less">
@font-face {
  font-family: 'icomoon';
  src: url('fonts/icomoon.eot?4otryg');
  src: url('fonts/icomoon.eot?4otryg#iefix') format('embedded-opentype'), url('fonts/icomoon.ttf?4otryg') format('truetype'), url('fonts/icomoon.woff?4otryg') format('woff'), url('fonts/icomoon.svg?4otryg#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              span {
                font-family: 'icomoon' !important;
              }
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
