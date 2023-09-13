/**
 * @author: 韩明阳
 * @description: 积分商城 推荐商品
 * @date: 2021/07/01
 */
import request from '@/utils/request'

/**
 * 推荐商品列表
 * @param params
 * @returns {AxiosPromise}
 */
export function recommendGoodsList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/query/recommendGoodsList',
    method: 'post',
    params: data,
    timeout: 10000
  })
}

/**
 * 商城位置管理-查询
 * @param params
 * @returns {AxiosPromise}
 */
export function recommendationTag(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/query/recommendationTag',
    method: 'post',
    params: data,
    timeout: 10000
  })
}

/**
 * 商城位置管理-新增
 * @param params
 * @returns {AxiosPromise}
 */
export function addRecommendationTag(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/add/recommendationTag',
    method: 'post',
    params: data,
    timeout: 10000
  })
}

/**
 * 商城位置管理-修改
 * @param params
 * @returns {AxiosPromise}
 */
export function updateRecommendationTag(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/update/recommendationTag',
    method: 'post',
    params: data,
    timeout: 10000
  })
}

/**
 * 商城推荐管理-新增
 * @param data
 * @returns {AxiosPromise}
 */
export function addRecommendGoods(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/add/recommendGoods',
    method: 'post',
    data: data,
    timeout: 10000
  })
}

/**
 * 商城推荐管理-列表排序
 * @param data
 * @returns {AxiosPromise}
 */
export function updateSortId(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/update/sortId',
    method: 'post',
    params: data,
    timeout: 10000
  })
}

/**
 * 商城推荐管理-删除
 * @param data
 * @returns {AxiosPromise}
 */
export function delRecommendGoods(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/del/recommendGoods',
    method: 'post',
    params: data,
    timeout: 10000
  })
}

/**
 * 商城推荐管理-修改
 * @param data
 * @returns {AxiosPromise}
 */
export function updateRecommendGoods(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/update/recommendGoods',
    method: 'post',
    data,
    timeout: 10000
  })
}

/**
 * 商城推荐管理-获取该位置已添加的商品编码
 * @param params
 * @returns {AxiosPromise}
 */
export function epcList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/recommend/query/epcList',
    method: 'get',
    params: data,
    timeout: 10000
  })
}
