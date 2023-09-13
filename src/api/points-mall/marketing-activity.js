import request from '@/utils/request'

/**
  * 限时秒杀活动列表
  * @param params
  * @returns {AxiosPromise}
  */
export function getMarketingActivityList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/marketingactivity/getActivityList',
    method: 'post',
    data
  })
}

/**
  * 新增/修改，限时秒杀
  * @param params
  * @returns {AxiosPromise}
  */
export function marketingActivityAddAndUpdate(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/marketingactivity/addAndUpdate',
    method: 'post',
    data
  })
}

/**
  * 获取活动详情
  * @param params
  * @returns {AxiosPromise}
  */
export function getMarketingActivityDetailById(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/marketingactivity/getMarketingDetailById',
    method: 'post',
    params
  })
}

/**
  * 秒杀活动-后台下架指定活动
  * @param params
  * @returns {AxiosPromise}
  */

export function updateMarketingActivityStatusById(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/marketingactivity/updateStatusById',
    method: 'post',
    params
  })
}

/**
  * 秒杀活动-查询中台商品在积分商城支持的支付方式集合
  * @param params
  * @returns {AxiosPromise}
  */

export function getPaymentByEpcAndBusinessType(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/marketingactivity/getPaymentByEpcAndBusinessType',
    method: 'post',
    data
  })
}
