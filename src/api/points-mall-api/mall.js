import request from '@/utils/request'
// 新增卡券
export function addCouponApi({ couponName, type, startTime, endTime, file }) {
  console.error(file, couponName, startTime)
  const data = new FormData()
  data.append('couponName', couponName)
  data.append('type', type)
  data.append('startTime', startTime)
  data.append('endTime', endTime)
  data.append('file', file)
  return request({
    url: '/ums_meixiu/api/im/g/v1/couponinfo/add/coupon',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 卡卷库
export function queryCouponApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/coupon/query/coupon',
    method: 'post',
    params
  })
}
// 卡卷库
export function queryCouponApiv1(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/coupon/query/coupon/v1',
    method: 'post',
    params
  })
}
// 删除卡卷库
export function delCouponApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/coupon/del/coupon',
    method: 'post',

    params
  })
}
// 卡券商品-查询
export function goodscouponApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/coupon/getGoodsCouponInfoDetailPage',
    method: 'post',
    params
  })
}

// 卡券商品-启用/停用
export function goodscouponStatusApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/goodscoupon/update/coupon/status',
    method: 'post',
    params
  })
}
// 	卡券商品-新增/编辑
export function goodscouponEditApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/coupon/operaGoodsCouponInfo',
    method: 'post',
    data: params
  })
}
// 	卡券商品-新增/编辑
export function couponinfoDetailApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/couponinfo/query/coupon/info',
    method: 'post',
    params
  })
}
// 卡密详情-删除
export function couponinfoDelApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/couponinfo/update/coupon/info',
    method: 'post',
    params
  })
}
// 卡密详情-清空
export function couponinfoDelAllApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/couponinfo/updateall/coupon/info',
    method: 'post',
    params
  })
}

// 卡密详情-导出
export function downloadCouponApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/couponinfo/download/couponinfo',
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}
//

// 	卡券商品-单个查询
export function initEditCouponApi(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/goodscoupon/query/coupon',
    method: 'post',
    params
  })
}
// 	卡券商品-单个查询
export function getGoodsCouponInfoDetail(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/coupon/getGoodsCouponInfoDetail',
    method: 'post',
    params
  })
}
// /couponinfo/add/id/coupon
export function addCouponIdApi({ couponId, file }) {
  const data = new FormData()
  data.append('couponId', couponId)
  data.append('file', file)
  return request({
    url: '/ums_meixiu/api/im/g/v1/couponinfo/add/id/coupon',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// *
// * 卡劵库海外订单相关接口
// *

// 后台海外订单-列表查询
export function queryOverseasOrder(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/overseas/getCouponOverseas',
    method: 'post',
    data
  })
}

// 导出海外订单
export function exportOverseasOrder(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/overseas/exportCouponOverseas',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导入海外订单
export function importOverseasOrder(file) {
  console.log(file, 'opop')
  const data = new FormData()
  data.append('file', file.file)
  return request({
    url: '/ums_meixiu/api/im/g/v2/overseas/couponBatch',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 充值
export function recharge(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/overseas/couponOne',
    method: 'post',
    params
  })
}

export function cancelOverseasOrder(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/overseas/cancelOrder',
    method: 'post',
    params
  })
}

// 商品库商品-新增/编辑
export function thirdGoods(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/edit/thirdGoods',
    method: 'post',
    data
  })
}

// 查询鸿源商品列表接口
export function findProductList(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/third/hongyuan/findProductList',
    method: 'post',
    params
  })
}

//  实物商品列表
export function thirdGoodsList(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/query/thirdGoodsList',
    method: 'post',
    params
  })
}

// 商城管理-查询
export function queryThirdGoods(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/query/thirdGoods',
    method: 'post',
    params
  })
}

// 商城管理-查询
export function thirdGoodsStatus(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/update/thirdGoodsStatus',
    method: 'post',
    params
  })
}

// 已添加商品查询
export function thirdProductCode(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/query/thirdProductCode',
    method: 'get',
    params
  })
}
