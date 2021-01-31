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

// 用户获取个人信息
export const userInfoAPI = () => {
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  })
}

// 文章-获取频道名字
export const channelListAPI = () => request({
  url: '/mp/v1_0/channels',
  method: 'GET'
})

// 文章-发布
export const articleAddAPI = (params, data) => request({
  url: '/mp/v1_0/articles',
  method: 'POST',
  params,
  data,
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  }
})

// 文章列表
export const articleListAPI = params => request({
  url: '/mp/v1_0/articles',
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  },
  params
})
