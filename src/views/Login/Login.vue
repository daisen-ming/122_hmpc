<template>
   <div class="login-container">
    <!-- 登录窗口 -->
    <div class="login-form-wrap">
      <!-- 第一行: logo -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- element-ui组件-form表单 -->

      <!-- ref相当于ID(VUE里给组件起别名,可以获取到这个form原生标签) -->
      <!-- model-表单绑定数据对象(值必须是object类型) -->
      <el-form class="login-form" ref="form" :model="form" :rules="rules">
        <!-- 第一行: 手机号 -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
        </el-form-item>

        <!-- 第二行: 验证码 -->
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="form.code"></el-input>
        </el-form-item>

        <!-- 第三行: 协议 -->
        <el-form-item prop="check">
          <el-checkbox v-model="form.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <!-- 第四行: 登录按钮  -->
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="loginFn" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import { loginRules } from '@/verify'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 复选框的值
      },
      rules: loginRules
    }
  },
  methods: {
    loginFn () {
      this.$refs.form.validate(async valia => {
        if (valia === false) return
        this.load = true
        const res = await loginAPI(this.form)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.load = false

        sessionStorage.setItem('token', res.data.data.token)

        this.$router.push('/layout')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
