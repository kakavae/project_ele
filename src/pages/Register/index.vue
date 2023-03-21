<template>
  <div class="w registerarea">
    <h3>
      注册新用户
      <div class="signin">我有账号，去<router-link to="/login">登陆</router-link></div>
    </h3>
    <div class="reg_form">
      <form action="" @submit="getRegister($event)">
        <ul>
          <!-- label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。
    <label> 标签的 for 属性应当与相关元素的 id 属性相同。 -->
          <li>
            <label for="phone">邮箱名：</label><input type="email" name="phonenumber" id="phone" class="input_con" v-model="email" /><i class="error" v-show="isShowEmail"><em></em>邮箱不正确，请重新输入</i>
          </li>
          <li class="phone_sms">
            <label for="sms">邮箱验证码：</label><input type="number" name="phonesms" id="sms" class="input_con" v-model="code" /><button class="btn_code" @click="sendCode">点击发送验证码{{ countdown ? countdown + 's' : '' }}</button>
          </li>
          <li>
            <label for="passw">登陆密码：</label><input type="password" name="password" id="passw" class="input_con" v-model="password" /><i class="error" v-show="isShowPassword"><em></em>密码不少于6位数正确，请重新输入</i>
          </li>
          <li class="degree">
            <div class="safety">安全程度<span class="low">弱</span><span class="mid">中</span><span class="strong">强</span></div>
          </li>
          <li>
            <label for="confirm">确认密码：</label><input type="password" name="password_confirm" id="confirm" class="input_con" v-model="passwordConfirm" /><i class="error" v-show="isShowConfirmPassword"><em></em>密码输入不一致，请重新输入</i>
          </li>
          <li class="aggrement">
            <input type="checkbox" name="" id="" /><span class="text">同意协议并注册<a href="#">《知果果用户协议》</a></span>
          </li>
          <li>
            <div class="done"><input type="submit" value="完成注册" /></div>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyRegister',
  data() {
    return {
      email: '',
      code: '',
      password: '',
      passwordConfirm: '',
      countdown: '',
      alertMsg: ''
    }
  },
  methods: {
    sendCode() {
      this.$store.dispatch('register_login/getRegisterCode', this.email)
      this.countdown = 60
      const timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          window.clearInterval(timer)
          this.countdown = ''
        }
      }, 1000)
    },
    async getRegister(e) {
      e.preventDefault()
      try {
        this.alertMsg = await this.$store.dispatch('register_login/getRegister', {
          email: this.email,
          password: this.password,
          code: this.code
        })
        alert(this.alertMsg)
        // 如果注册成功了，就跳转到登录页面
        this.$router.push('/login')
      } catch (e) {
        alert('注册失败')
      }
    }
  },
  computed: {
    isShowEmail() {
      return !/@qq.com$/.test(this.email)
    },
    isShowPassword() {
      return this.password.length < 6
    },
    isShowConfirmPassword() {
      return this.password !== this.passwordConfirm
    }
  }
}
</script>

<style scoped>
.btn_code {
  height: 35px;
  width: 120px;
  margin-left: 10px;
  background-color: skyblue;
}

.registerarea {
  height: 522px;
  margin-top: 20px;
  border: 1px solid #dfdfdf;
}
.registerarea h3 {
  height: 41px;
  padding: 0 10px;
  background-color: #ececec;
  line-height: 41px;
  font-weight: 400;
  font-size: 18px;
  color: #333333;
  border-bottom: 1px solid #dfdfdf;
}
.registerarea .signin {
  float: right;
  font-size: 14px;
}
.registerarea .signin a {
  color: #c81623;
}
.reg_form {
  padding: 54px 0 0 300px;
}
.reg_form ul li {
  /* 这个不用写，因为默认的样式就有 */
  /* vertical-align: middle; */
  height: 36px;
  /* margin: 10px 0; */
}
.reg_form ul .phone_sms {
  margin: 20px 0;
}
/* 这里直接给外面的label指定就可以了，不用再拿span包含 */
.reg_form ul li label {
  display: inline-block;
  width: 95px;
  height: 36px;
  text-align: right;
  font-size: 14px;
  color: #4c4c4c;
}
.reg_form ul li .input_con {
  height: 36px;
  width: 241px;
  border: 1px solid #999999;
  line-height: 36px;
}
/* 可以把这个转换为行内块元素单独来放图片 */
.reg_form ul li .error {
  margin-left: 10px;
  font-size: 12px;
  color: #df3033;
}
/* 注意这种用背景图做图标的方式 */
.reg_form ul li .error em {
  display: inline-block;
  height: 20px;
  width: 20px;
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 2px;
  background: url(./images/error.png) no-repeat;
}
.reg_form ul .degree {
  position: relative;
  margin: 10px 0 20px 0;
  height: 20px;
}
.reg_form ul .degree .safety {
  position: absolute;
  top: 0;
  left: 180px;
  font-size: 12px;
  color: #b2b2b2;
}
.degree .safety .low,
.degree .safety .mid,
.degree .safety .strong {
  color: #fff;
  padding: 0 10px;
  margin-left: 10px;
  background-color: #de1111;
}
.degree .safety .mid {
  margin: 0 1px;
  background-color: #40b83f;
}
.degree .safety .strong {
  margin: 0;
  background-color: #f79100;
}
.reg_form ul .aggrement {
  position: relative;
  line-height: 36px;
  padding-left: 95px;
  margin-top: 30px;
}
.aggrement input {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 11px;
}
.aggrement .text {
  padding-left: 20px;
}
.aggrement a {
  color: #1ba1e6;
}
.done input {
  height: 34px;
  line-height: 34px;
  width: 200px;
  margin: 30px 0 0 115px;
  background-color: #c81623;
  text-align: center;
  font-size: 14px;
  color: #fff;
}
</style>
