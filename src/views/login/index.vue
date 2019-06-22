<template>
  <div class="box">
    <div class="loginform">
      <div class="head">
        <img class="logo"
             src="./logo_index.png"
             alt="">
      </div>
      <el-form ref="form"
               :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.mobile"
                    placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span='14'>
              <el-input v-model="loginForm.code"
                        placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="7"
                    push="3">
              <el-button class="code-btn">发送验证码</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item>
          <el-checkbox name="isOk">
          </el-checkbox>
          我已阅读并同意 <el-link type="primary"
                   :underline="false"> 用户协议 </el-link> 和
          <el-link type="primary"
                   :underline="false"> 隐私条款 </el-link>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn"
                     type="primary"
                     @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
