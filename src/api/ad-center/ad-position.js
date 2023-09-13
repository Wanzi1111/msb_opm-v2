import request from '@/utils/request'
import qs from 'qs'

/**
 * 修改广告分类
 * @param data
 * @returns {AxiosPromise}
 */
export function updateAdvertType(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/updateAdvertClassification',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 新建广告分类
 * @param data
 * @returns {AxiosPromise}
 */
export function addAdvertType(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/addAdvertClassification',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 获取广告分类
 * @param data
 * @returns {AxiosPromise}
 */
export function getAdvertType(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/listAdvertClassification',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 获取广告位
 * @param data
 * @returns {AxiosPromise}
 */
export function listAdvertNew(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/listAdvertV2',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 获取广告位
 */
export function listAdvertV2New(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/listAdvertV2New',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    data
    // data: qs.stringify(data)
  })
}

/**
 * 获取广告尺寸
 */
export function listAdvertSize(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/listAdvertSize',
    method: 'post',
    params
  })
}

/**
 * 获取广告位类型
 * @param data
 * @returns {AxiosPromise}
 */
export function listAdvertType(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/listAdvertType',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 新增广告位
 * @param data
 * @returns {AxiosPromise}
 */
export function addAdvertNew(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/addAdvert',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 新增广告位
 * @param data
 * @returns {AxiosPromise}
 */
export function addAdvertTypeNew(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/addAdvertType',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 启用/停用广告位
 * @param data
 * @returns {AxiosPromise}
 */
export function openAndCloseAdvert(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/openAndCloseAdvert',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 获取广告下面所有投放
 * @param data
 * @returns {AxiosPromise}
 */
export function getPutsByPositionId(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/advertPublish',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 调整投放顺序
 * @param data
 * @returns {AxiosPromise}
 */
export function sortPut(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/orderResource',
    method: 'post',
    data
  })
}

/**
 * 查看详情
 * @param data
 * @returns {AxiosPromise}
 */
export function queryResource1(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/queryResource',
    method: 'get',
    params
  })
}

/**
 * 获取某个主题下的所有投放的详细数据
 * @param data
 * @returns {AxiosPromise}
 */
export function listAdversTopicPublish(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/listAdversTopicPublish',
    method: 'post',
    params
  })
}

/**
 * 广告位配置下拉列表 - 未用
 * @param data
 * @returns {AxiosPromise}
 */
export function advertConfig() {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/advertConfig',
    method: 'get'
  })
}
