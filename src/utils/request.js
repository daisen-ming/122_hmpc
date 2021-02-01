// 对ajax进行二次封装
// 此文件作用:封装一个网络请求的工具对象

import axios from 'axios'
import { Message } from 'element-ui'
import JSONbig from 'json-bigint'

const ajax = axios.create({
  baseURL: ' http://api-toutiao-web.itheima.net',
  transformResponse: [function (data) { // 对内容进行处理
    // data:就是本次请求获取的数据
    // 在这里可以对它进行进一步的处理 -- JSONbig
    // 后端返回数据可能不是 JSON 字符串，而JSONbig.parse()只能处理JSON字符串
    // 所以，为了保证代码可以正常执行，这里引入try-catch来捕获异常
    try {
      // 如果没有遇到错误，就返回 JSONbig处理之后的数据
      return JSONbig.parse(data)
    } catch (err) {
      // console.error('JSONbig转换出错', err)
      return data
    }
  }]
  // 作用:所有网络请求都会拼接这个网络地址
})

// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
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
