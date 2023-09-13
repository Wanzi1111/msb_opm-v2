import request from '@/utils/request'

/**
 * 查询直播列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectLive(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/selectLive',
    method: 'post',
    params: params
  })
}

/**
 * 创建直播
 * @param params
 * @returns {AxiosPromise}
 */
export function createLive(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/createLive',
    method: 'post',
    data: params
  })
}

/**
 * 修改直播
 * @param params
 * @returns {AxiosPromise}
 */
export function updateLive(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/updateLive',
    method: 'post',
    data: params
  })
}

/**
 * 上下架直播任务(批量)
 * @param params
 * @returns {AxiosPromise}
 */
export function upDownshelf(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/upDownshelf',
    method: 'post',
    params: params
  })
}

/**
 * 弃用
 * @param params
 * @returns {AxiosPromise}
 */
export function delLive(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/delLive',
    method: 'post',
    params: params
  })
}

/**
 * 获取用户类型动态数据
 * @param params
 * @returns {AxiosPromise}
 */
export function userTypeInfo(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/userTypeInfo',
    method: 'get',
    params: params
  })
}

/**
 * 获取商品列表
 * @param params
 * @returns {AxiosPromise}
 */
export function packagetsList(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/packagetsList',
    method: 'get',
    params: params
  })
}

/**
 * 获取直播活动统计信息
 * @param params
 * @returns {AxiosPromise}
 */
export function statisticsActivity(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/statisticsActivity',
    method: 'get',
    params: params
  })
}

/**
 * 直播任务详情
 * @param params
 * @returns {AxiosPromise}
 */
export function getLiveInfo(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/getLiveInfo',
    method: 'get',
    params: params
  })
}

/**
 * 获取查询条件级联下拉选项
 * @param data
 * @returns {AxiosPromise}
 */
export function cascadeQueryOptions(params) {
  return request({
    url: '/ai_api/api/cs/v2/live/find/cascadeQueryOptions',
    method: 'post',
    data: params
  })
}

/**
 * 获取指定用户查询下拉选项
 * @param data
 * @returns {AxiosPromise}
 */
export function assignUserQueryOptions(params) {
  return request({
    url: '/ai_api/api/cs/v2/live/find/assignUserQueryOptions',
    method: 'post',
    data: params
  })
}

/**
 * 获取查询条件动态下拉选项
 * @param data
 * @returns {AxiosPromise}
 */
export function dynamicQueryOptions(params) {
  return request({
    url: '/ai_api/api/cs/v2/live/find/dynamicQueryOptions',
    method: 'post',
    data: params
  })
}

/**
 * 获取指定条件查询班级分页列表
 * @param data
 * @returns {AxiosPromise}
 */
export function listStudentTeamQuery(params) {
  return request({
    url: '/ai_api/api/cs/v2/live/find/listStudentTeamQuery',
    method: 'post',
    data: params
  })
}

/**
 * 获取用户选中回显数据
 * @param data
 * @returns {AxiosPromise}
 */
export function userSelectDisplayData(params) {
  return request({
    url: '/ai_api/api/cs/v2/live/find/userSelectDisplayData',
    method: 'post',
    data: params
  })
}

// 获取推荐列表
export function getRecommendLive(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/getRecommend',
    method: 'get',
    params
  })
}

// 推荐
export function recommendLive(params) {
  return request({
    url: '/ums_meixiu/api/play/v1/live/recommendLive',
    method: 'get',
    params
  })
}
