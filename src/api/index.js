// 此文件作用
// 统一管理整个项目用到的网络请求接口
// 每个方法对用一个接口

import request from '@/utils/request.js'

// 用户_登录
export const loginAPI = function (data) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data
  })
  //   console.log(promiseObj)
  //   return promiseObj
}
