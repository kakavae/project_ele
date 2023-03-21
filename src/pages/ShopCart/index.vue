<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item of goodsCartList" :key="item.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked === '1'" @change="getGoodsCheck($event, item.skuId)" />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div>&nbsp;</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateGoodsNum(item.skuId, -1, item.skuNum)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="item.skuNum" @change="updateGoodsCartIpt($event, item.skuId, item.skuNum)" />
            <a href="javascript:void(0)" class="plus" @click="updateGoodsNum(item.skuId, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.cartPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="removeGoods(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAll" @change="isAllChange($event)" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="removeSelGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade" target="_blank">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ShopCart',
  data() {
    return {
      timer: null
    }
  },
  methods: {
    // 更改商品的数量以后发送请求修改商品的数量，更改数量的时候发送的是数量的变化量
    async updateGoodsNum(skuId, deltaNum, skuNum) {
      if (skuNum <= 1 && deltaNum === -1) {
        return
      }
      await this.$store.dispatch('shopcart/updateGoodsCart', { skuId: skuId, deltaNum: deltaNum })
      await this.getGoodsCart()
    },
    // 直接输入商品数量
    async updateGoodsCartIpt(e, skuId, skuNum) {
      let num = e.target.value
      if (isNaN(num * 1) || num < 1) {
        num = 1
      } else {
        num = Number.parseInt(e.target.value)
      }
      console.log(skuId, num - skuNum)
      await this.$store.dispatch('shopcart/updateGoodsCart', { skuId: skuId, deltaNum: num - skuNum })
      await this.getGoodsCart()
    },
    // 获取购物车列表数据
    getGoodsCart() {
      // 向服务器发送请求，商品的信息，数量等都是从服务器拿到的
      this.$store.dispatch('shopcart/getGoodsCartList')
    },
    // 修改商品的勾选状态
    async getGoodsCheck(e, skuId) {
      await this.$store.dispatch('shopcart/updateGoodsCheck', { skuId: skuId, isChecked: Number(e.target.checked) })
      await this.getGoodsCart()
    },
    // 全选与全不选
    async isAllChange(e) {
      const flag = e.target.checked ? '1' : '0'
      await this.$store.dispatch('shopcart/updateIsAllCheck', flag)
      await this.getGoodsCart()
    },
    // 删除商品
    async removeGoods(skuId) {
      console.log(skuId)
      await this.$store.dispatch('shopcart/removeCartGoods', skuId)
      await this.getGoodsCart()
    },
    // 删除选中的商品
    async removeSelGoods() {
      await this.$store.dispatch('shopcart/removeSelGoods')
      await this.getGoodsCart()
    }
  },
  // 将路由中的信息渲染到这个页面当中，
  computed: {
    ...mapState('shopcart', ['goodsCartList']),
    isAll() {
      return this.goodsCartList.every((item) => {
        return item.isChecked === '1'
      })
    },
    totalPrice() {
      return this.goodsCartList.reduce((a, b) => {
        return a + b.cartPrice * b.skuNum
      }, 0)
    },
    selNum() {
      return this.goodsCartList.reduce((a, b) => {
        if (b.isChecked === '1') {
          return a + 1
        } else {
          return a
        }
      }, 0)
    }
  },
  mounted() {
    this.getGoodsCart()
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3 {
        width: 13%;
      }

      .cart-th4 {
        width: 11%;
      }

      .cart-th5 {
        width: 13%;
      }

      .cart-th6 {
        width: 13%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
