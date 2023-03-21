<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="resetCurrentIndex" @mouseenter="showSort">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div class="item" v-for="(cFirst, index) of categoryList" :key="cFirst.categoryId">
                <h3 @mouseenter="changeCurrentIndex(index)" :class="{ bgc: currentIndex === index }">
                  <a :data-category-name="cFirst.categoryName" :data-category-first-id="cFirst.categoryId">{{ cFirst.categoryName }}</a>
                </h3>
                <!-- 或者用v-show -->
                <div class="item-list" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                  <div class="subitem">
                    <!-- 二级分类 -->
                    <dl class="fore" v-for="cSecond of cFirst.categoryChild" :key="cSecond.categoryId">
                      <dt>
                        <a :data-category-name="cSecond.categoryName" :data-category-second-id="cSecond.categoryId">{{ cSecond.categoryName }}</a>
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em v-for="cThird of cSecond.categoryChild" :key="cThird.categoryId">
                          <a :data-category-name="cThird.categoryName" :data-category-third-id="cThird.categoryId">{{ cThird.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 导入lodash的节流函数
import throttle from 'lodash/throttle.js'
export default {
  name: 'MyTypeNav',
  data() {
    return {
      currentIndex: -1,
      isShow: true // 控制三级联动的显示与隐藏
    }
  },
  methods: {
    changeCurrentIndex: throttle(function (index) {
      // 给这个事件添加节流效果
      this.currentIndex = index
    }, 50),
    resetCurrentIndex() {
      this.currentIndex = -1
      // 除了home组件鼠标离开三级联动和上面的全部商品分类的时候隐藏三级联动
      if (this.$route.path !== '/home') {
        this.isShow = false
      }
    },
    goSearch(e) {
      // 初始化跳转路由携带的参数
      const location = {
        name: 'search',
        query: {}
      }

      // 如果这个目标节点有自定义属性categoryName，就跳转路由
      if (e.target.dataset.categoryName) {
        location.query.categoryName = e.target.dataset.categoryName

        // 三级分类的不同类别传的ID值不一样
        if (e.target.dataset.categoryFirstId) {
          location.query.categoryFirstId = e.target.dataset.categoryFirstId
        } else if (e.target.dataset.categorySecondId) {
          location.query.categorySecondId = e.target.dataset.categorySecondId
        } else if (e.target.dataset.categoryThirdId) {
          location.query.categoryThirdId = e.target.dataset.categoryThirdId
        }

        // 如果现在的路由信息里面有params参数，也就是在Search组件里面，Search组件拿到了query参数，就将这个query参数合并到路由跳转配置对象中，一起携带通过路由传值
        // 始终记住一点，当前显示哪个路由组件，现在只有一级路由并且一级路由只有主页搜索登录注册这四个路由组件，router-view位置是哪个组件，this.$route就代表那个组件的路由信息
        if (Object.keys(this.$route.params).length !== 0) {
          // console.log('有params参数')
          location.params = this.$route.params
        }

        // 携带参数并跳转路由
        this.$router.push(location)
      }
    },
    // 鼠标进入全部商品的时候显示三级联动sort部分
    showSort() {
      this.isShow = true
    }
  },
  mounted() {
    // 触发dispatch，通知actions发送异步ajax，一般不写在这个组件，因为每次挂载这个组件的时候都会重新发送请求，没必要，放在App组件中，只触发一次
    // this.$store.dispatch('home/getCategory')
    // 当这个组件挂载的时候，将三级联动隐藏起来，只有不在首页的时候需要隐藏
    if (this.$route.path !== '/home') {
      this.isShow = false
    }
  },
  computed: {
    // 在计算属性里面拿到vuex中的state数据
    ...mapState('home', {
      categoryList: 'categoryList'
    })
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          .bgc {
            background-color: skyblue;
          }

          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }

    // 三级联动的过渡效果对应的样式
    // 进入之前
    .sort-enter {
      height: 0;
    }

    // 进入过程中
    .sort-enter-active {
      transition: all 0.2s linear;
      overflow: hidden;
    }

    // 进入的终点
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>
