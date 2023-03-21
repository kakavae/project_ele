<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="(item, index) of keywords" :key="index">
              <a href="#tab1" data-toggle="tab">{{ item }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(item, index) of keywords" :key="index">{{ item }}</li>
              </ul>
              <img :src="imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- <MySwiper class="swiper" :options="swiperOption">
                <SwiperSlide v-for="item of carouselList" :key="item.id"><img :src="item.imgUrl" /></SwiperSlide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </MySwiper> -->
              <MyCarousel :imagesSwiper="carouselList" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
// import Swiper from 'swiper/js/swiper.js'

export default {
  name: 'MyFloor',
  props: ['name', 'keywords', 'imgUrl', 'carouselList', 'navList', 'bigImg', 'recommendList'],
  data() {
    return {
      myCarouselList: []
    }
  }
  // watch: {
  //   carouselList: {
  //     deep: true,
  //     immediate: true, // 为什么加了immediate: true配置才会生效？因为carouselList首次拿到数据数据就已经改变了并且是最新的，不是计算属性和data中的数据，会先初始化然后再更新
  //     handler() {
  //       console.log('监听到数据变化了')
  //        // 这里不需要推迟到下一次DOM更新才执行，因为这时候数据已经有了，数据是父组件传递过来的，传递来以后才渲染数据并显示轮播图片，所以可以直接new，因为你的最新的DOM就是这里第一次挂载的DOM，而且，这里只挂载一次DOM！！！
  //       this.$nextTick(function () {
  //         console.log('数据改变后的下一次DOM重新渲染之后执行')
  //         new Swiper('.swiper-container', {
  //           // direction: 'vertical', // 垂直切换选项
  //           loop: true, // 循环模式选项

  //           // 如果需要分页器
  //           pagination: {
  //             el: '.swiper-pagination'
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: '.swiper-button-next',
  //             prevEl: '.swiper-button-prev'
  //           },

  //           // 如果需要滚动条
  //           scrollbar: {
  //             el: '.swiper-scrollbar'
  //           }
  //         })
  //       })
  //     }
  //   }
  // }
}
</script>

<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: '|';
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: '';
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
