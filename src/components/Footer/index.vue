<template>
  <div>
    <footer class="footer">
      <!-- 版心 -->
      <div class="w">
        <!-- 服务模块 -->
        <div class="mod_service">
          <ul>
            <li>
              <h5 class="h5_1"></h5>
              <div class="service_text">
                <h4>正品保障</h4>
                <p>正品保障，提供发票</p>
              </div>
            </li>
            <li>
              <h5 class="h5_2"></h5>
              <div class="service_text">
                <h4>极速物流</h4>
                <p>急速物流，急速送达</p>
              </div>
            </li>
            <li>
              <h5 class="h5_3"></h5>
              <div class="service_text">
                <h4>无忧售后</h4>
                <p>7天无理由退换货</p>
              </div>
            </li>
            <li>
              <h5 class="h5_4"></h5>
              <div class="service_text">
                <h4>特色服务</h4>
                <p>私人定制家电套餐</p>
              </div>
            </li>
            <li>
              <h5 class="h5_5"></h5>
              <div class="service_text">
                <h4>帮助中心</h4>
                <p>您的购物指南</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="mod_help">
          <dl>
            <dt>购物指南</dt>
            <dd><a href="#">购物流程</a></dd>
            <dd><a href="#">会员介绍</a></dd>
            <dd><a href="#">生活旅行/团购</a></dd>
            <dd><a href="#">常见问题</a></dd>
            <dd><a href="#">大家电</a></dd>
            <dd><a href="#">联系客服</a></dd>
          </dl>
          <dl>
            <dt>配送方式</dt>
            <dd><a href="#">上门自提</a></dd>
            <dd><a href="#">211限时达</a></dd>
            <dd><a href="#">配送服务查询</a></dd>
            <dd><a href="#">配送费收取标准</a></dd>
            <dd><a href="#">海外配送</a></dd>
          </dl>
          <dl>
            <dt>支付方式</dt>
            <dd><a href="#">货到付款</a></dd>
            <dd><a href="#">在线支付</a></dd>
            <dd><a href="#">分期付款</a></dd>
            <dd><a href="#">邮局汇款</a></dd>
            <dd><a href="#">公司转账</a></dd>
          </dl>
          <dl>
            <dt>售后服务</dt>
            <dd><a href="#">售后政策</a></dd>
            <dd><a href="#">价格保护</a></dd>
            <dd><a href="#">退款说明</a></dd>
            <dd><a href="#">返修/退换货</a></dd>
            <dd><a href="#">取消订单</a></dd>
          </dl>
          <dl>
            <dt>特色服务</dt>
            <dd><a href="#">夺宝岛</a></dd>
            <dd><a href="#">DIY装机</a></dd>
            <dd><a href="#">延保服务</a></dd>
            <dd><a href="#">品优购E卡</a></dd>
            <dd><a href="#">品优购通信</a></dd>
          </dl>
          <dl>
            <dt>帮助中心</dt>
            <dd>
              <a href="#"><img src="@/assets/images/qrcode.png" alt="品优购客户端" /></a>
            </dd>
            <dd><a href="#">品优购客户端</a></dd>
          </dl>
        </div>
        <div class="mod_copyright">
          <div class="contact_list">
            <a href="#">关于我们</a> | <a href="#">联系我们</a> | <a href="#">联系客服</a> | <a href="#">商家入驻</a> | <a href="#">营销中心</a> | <a href="#">手机品优购</a> | <a href="#">友情链接</a> | <a href="#">销售联盟</a> | <a href="#">品优购社区</a> | <a href="#">品优购公益</a> |
            <a href="#">English Site</a> | <a href="#">Contact U</a>
          </div>
          <p>地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096 电话：400-618-4000 传真：010-82935100 邮箱：zhanghj+itcast.cn<br />京ICP备08001421号京公网安备110108007702</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MyFooter'
}
</script>

<style scoped>
.footer {
  height: 415px;
  background-color: #f5f5f5;
}

.footer .mod_service {
  height: 108px;
  border-bottom: 1px solid #ededed;
}
.footer .mod_service ul li {
  float: left;
  height: 108px;
  width: 240px;
  padding: 28px 0 0 37px;
  /* line-height: 415px; */
  /* background-color: pink; */
}
.footer .mod_service ul li h5 {
  float: left;
  width: 52px;
  height: 52px;
  background: url(@/assets/images/icons.png) no-repeat -253px -2px;
}
.footer .mod_service ul li .service_text {
  float: left;
  padding: 7px 0 0 6px;
}
.footer .mod_service ul li .service_text h4 {
  font-size: 14px;
  color: #333333;
}
/* 用精灵图做样式 */
.footer .mod_service ul li .service_text p {
  font-size: 12px;
}
.footer .mod_service ul li .h5_2 {
  background-position: -253px -54px;
}
.footer .mod_service ul li .h5_3 {
  background-position: -255px -105px;
}
.footer .mod_service ul li .h5_4 {
  background-position: -257px -157px;
}
.footer .mod_service ul li .h5_5 {
  background-position: -255px -209px;
}
/* 底部帮助模块 */
.footer .mod_help {
  height: 188px;
  border-bottom: 1px solid #ededed;
}
.footer .mod_help dl {
  width: 200px;
  float: left;
  padding-left: 52px;
}
.footer .mod_help dl dt {
  padding: 22px 0 12px 0;
  font-size: 16px;
  color: #333333;
}
.footer .mod_help dl dd {
  color: #666;
}
.footer .mod_help dl:nth-child(6) {
  text-align: center;
}
.footer .mod_copyright {
  text-align: center;
}
.footer .mod_copyright .contact_list {
  margin: 20px 0 10px 0;
}
.footer .mod_copyright .contact_list a {
  padding: 0 10px;
}
</style>
