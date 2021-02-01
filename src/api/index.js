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
    method: 'GET'

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
  data

})

// 文章列表
export const articleListAPI = params => request({
  url: '/mp/v1_0/articles',
  method: 'GET',

  params
})

// 文章--某个详情
export const articleByIdAPI = id => request({
  url: '/mp/v1_0/articles/' + id,
  method: 'GET'

})

// 文章---更新文章
export const articleUpdateAPI = (id, params, body) => request({
  url: '/mp/v1_0/articles/' + id, // 路径传参
  method: 'PUT',

  params, // ?后面
  data: body// 请求体
})

// 文章---删除文章
export const articleDeleteAPI = id => request({
  url: '/mp/v1_0/articles/' + id,
  method: 'DELETE'

})

// 素材库---获取图片
export const UserImageListAPI = params => request({
  url: '/mp/v1_0/user/images',
  method: 'GET',
  params
})
