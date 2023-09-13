/**
 * 社群券码管理
 */

import request from '@/utils/request'

// 	获取全部卡券
export function getAllUmpCoupon(params) {
  return request({
    url: '/ums_meixiu/api/ofa/v1/youZan/coupon/allUmpCoupon',
    method: 'post',
    params
  })
}

// 	检查券码
// export function checkCouponSend(params) {
//   return request({
//     url: '/ums_meixiu/api/ofa/v1/youZan/coupon/checkSend',
//     method: 'post',
//     params
//   })
// }

// 	获取业务线
export function getBusinessList(params) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/businessList',
    method: 'get',
    params
  })
}

// 	添加券码
export function addCoupon(data) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/add',
    method: 'post',
    data
  })
}

// 	更新券码
export function updateCoupon(data) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/update',
    method: 'post',
    data
  })
}

// 	获取券码列表
export function getCouponList(params) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/list',
    method: 'get',
    params
  })
}

// 	获取券码详情
export function getCouponDetail(params) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/detail',
    method: 'get',
    params
  })
}

// 	启用券码
export function enabledCoupon(data) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/enabled',
    method: 'post',
    data
  })
}

// 	禁用券码
export function disabledCoupon(data) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/disabled',
    method: 'post',
    data
  })
}

// 	券码发放方式
export function getCouponSendWayList(data) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/sendWayList',
    method: 'get',
    data
  })
}

// 	人群列表
export function getCouponGroupList(params) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/groupList',
    method: 'get',
    params
  })
}

// 	批量 启用/停用
export function batchUpdateStatus(data) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/batchUpdateStatus',
    method: 'post',
    data
  })
}

//  查询券详情
export function getCouponInfo(params) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/getCouponInfo',
    method: 'post',
    params
  })
}

// 	批量 补发失效接口
export function mobileReissueFailure(data) {
  return request({
    url: '/ums_meixiu/api/ofa/coupon/mobileReissueFailure',
    method: 'post',
    headers: {
      'Content-Type': 'form-data'
    },
    data
  })
}
