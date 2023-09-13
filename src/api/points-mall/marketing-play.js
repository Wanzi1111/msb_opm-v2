import request from '@/utils/request'

/**
  * 积分夺宝活动列表
  * @param params
  * @returns {AxiosPromise}
  */
export function getMarketingList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/collectactivity/activityList',
    method: 'post',
    data,
    timeout: 100000
  })
}

/**
  * 新增/修改，积分夺宝
  * @param params
  * @returns {AxiosPromise}
  */
export function addMarketingPlay(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/collectactivity/addAndUpdate',
    method: 'post',
    data
  })
}

/**
  * 修改活动状态
  * @param params
  * @returns {AxiosPromise}
  */
export function updateMarketingStatus(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/collectactivity/update/imActivity/status',
    method: 'post',
    params
  })
}

/**
  * 获取活动详情
  * @param params
  * @returns {AxiosPromise}
  */

export function getMarketingDetail(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/collectactivity/query/activityDetail',
    method: 'post',
    params
  })
}

/**
  * 积分抽奖活动列表
  * @param params
  * @returns {AxiosPromise}
  */
export function rvactivityList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/activityList',
    method: 'post',
    data,
    timeout: 100000
  })
}

/**
  * 新增活动接口
  * @param params
  * @returns {AxiosPromise}
  */
export function rvactivityAddActivity(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/addActivity',
    method: 'post',
    params,
    timeout: 100000
  })
}

/**
  * 修改活动接口
  * @param params
  * @returns {AxiosPromise}
  */
export function rvactivityUpdateActivity(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/updateActivity',
    method: 'post',
    data,
    timeout: 100000
  })
}

/**
  * 调整活动商品概率
  * @param params
  * @returns {AxiosPromise}
  */
export function updateProbability(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/updateProbability',
    method: 'post',
    params,
    timeout: 100000
  })
}

/**
  * 绑定活动归属商品 - 实物
  * @param params
  * @returns {AxiosPromise}
  */
export function addActivityGoods(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/addActivityGoods',
    method: 'post',
    params,
    timeout: 100000
  })
}

/**
  * 绑定活动归属商品 - 金币

  * @param params
  * @returns {AxiosPromise}
  */
export function addActivityCoinGoods(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/addActivityCoinGoods',
    method: 'post',
    params,
    timeout: 100000
  })
}

/**
  * 模拟商品中奖
  * @param params
  * @returns {AxiosPromise}
  */
export function simulatedLottery(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/simulatedLottery',
    method: 'post',
    data,
    timeout: 100000
  })
}

/**
  * 删除奖品
  * @param params
  * @returns {AxiosPromise}
  */
export function delActivityGoodsById(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/delActivityGoodsById',
    method: 'post',
    params,
    timeout: 100000
  })
}
