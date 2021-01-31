// 对ajax进行二次封装
// 此文件作用:封装一个网络请求的工具对象

import axios from 'axios'
import { Message } from 'element-ui'

const ajax = axios.create({
  baseURL: ' http://api-toutiao-web.itheima.net'
  // 作用:所有网络请求都会拼接这个网络地址
})

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  const errTextObj = {
    'Please verify your real information in app.': '手机号只能是固定的',
    'Invalid code.': '验证码错误',
    'User must be authorized.': '身份认证失败'
  }
  const messageKey = error.response.data.message
  Message({
    message: errTextObj[messageKey],
    type: 'error',
    onClose () {
      if (error.response.status === 401) {
        sessionStorage.clear()
        window.location.href = '/#/login'
      }
    }
  })
  return Promise.reject(error)
})

export default ajax
