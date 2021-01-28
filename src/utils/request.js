// 对ajax进行二次封装
// 此文件作用:封装一个网络请求的工具对象

import axios from 'axios'

const ajax = axios.create({
  baseURL: ' http://api-toutiao-web.itheima.net'
  // 作用:所有网络请求都会拼接这个网络地址
})

export default ajax
