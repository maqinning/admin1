<template>
  <div class="box">
    <div class="loginform">
      <div class="head">
        <img class="logo"
             src="./logo_index.png"
             alt="">
      </div>
      <el-form ref="loginForm"
               :rules="rules"
               :model="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile"
                    placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span='14'>
              <el-form-item prop="code">
                <el-input v-model="loginForm.code"
                          placeholder="验证码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8"
                    :push=2>
              <el-button @click="handleGetCode"
                         :disabled="timeCode"
                         :loading="isGetCode"
                         class="code-btn">{{btnText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree">
          </el-checkbox>
          <span> 我已阅读并同意 <el-link type="primary"
                     :underline="false"> 用户协议 </el-link> 和
            <el-link type="primary"
                     :underline="false"> 隐私条款 </el-link>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn"
                     type="primary"
                     :loading="isloading"
                     @click="handleSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import '@/vendor/gt.js'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      // 表单数据
      loginForm: {
        mobile: '',
        code: '',
        agree: ''
      },
      timeCode: false,
      btnText: '发送验证码',
      isGetCode: false,
      // 提交时按钮禁用
      isloading: false,
      // 通过 initGeetest 得到的极验验证码对象
      captchaObj: null,
      initGeetestMobile: '',
      // 验证规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '请输入11位手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '是否同意协议', trigger: 'change' },
          { pattern: /true/, message: '请同意协议', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 登录成功弹出框
    open1 () {
      this.$message({
        message: '恭喜你，登录成功',
        type: 'success'
      })
    },
    // 登录失败弹出框
    open4 () {
      this.$message.error('手机号或者验证码错误')
    },
    // 提交表单
    handleSubmit () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.isloading = true
          this.onSubmit()
        } else {
          this.open4()
        }
      })
    },
    // 提交表单的方法
    onSubmit () {
      const data = this.loginForm
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        headers: { 'content-type': 'application/json' },
        data: data
      }).then(res => {
        this.open1()
        this.isloading = false
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        if (err) {
          this.open4()
          this.isloading = false
          this.loginForm.code = ''
        }
      })
    },
    handleGetCode () {
      this.$refs['loginForm'].validateField('mobile', (valid) => {
        if (valid) {
          return false
        } else {
          this.isGetCode = true
          this.handleCode()
          return false
        }
      })
    },
    // 获取验证码
    handleCode () {
      const mobile = this.loginForm.mobile
      const that = this
      if (this.captchaObj && mobile === this.initGeetestMobile) {
        that.isGetCode = false
        return this.captchaObj.verify()
      }
      axios({
        method: 'GET',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/captchas/' + mobile
      }).then(res => {
        const data = res.data.data
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, function (captchaObj) {
          if (document.querySelector('.geetest_panel')) {
            document.body.removeChild(document.querySelector('.geetest_panel'))
          }

          that.captchaObj = captchaObj
          // 这里可以调用验证实例 captchaObj 的实例方法
          captchaObj.onReady(function () {
            that.isGetCode = false
            // 存储实例initGeerest的电话
            that.initGeetestMobile = mobile
            // 验证码ready之后才能调用verify方法显示验证码
            captchaObj.verify() // 显示验证码
          }).onSuccess(function () {
            // your code
            var result = captchaObj.getValidate()
            axios({
              method: 'GET',
              url: 'http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/' + mobile,
              params: {
                challenge: result.geetest_challenge,
                validate: result.geetest_validate,
                seccode: result.geetest_seccode
              }
            }).then(res => {
              let secend = 59
              that.btnText = secend + '秒'
              that.timeCode = true
              let time = window.setInterval(() => {
                that.btnText = --secend + '秒'
                if (secend === 0) {
                  that.timeCode = false
                  window.clearInterval(time)
                  that.btnText = '发送验证码'
                }
              }, 1000)
            })
          }).onError(function () {
            // your code
            window.alert('出错啦，稍后重试')
          })
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  background: #ccc;
  position: relative;
  background: url("./login_bg.jpg") no-repeat center;
  .loginform {
    width: 400px;
    height: 300px;
    background-color: #fff;
    padding: 40px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .el-checkbox {
    margin-right: 5px;
  }
  .head {
    text-align: center;
    .logo {
      width: 200px;
      margin-bottom: 10px;
    }
  }
  .login-btn,
  .code-btn {
    width: 100%;
  }
}
</style>
