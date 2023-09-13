/**
 * @author: Liwei
 * @description: 小画家作品秀
 * @date: 2020/7/14
 */
import request from '@/utils/request'

/**
 * 上传视频
 * @param params
 * @returns {AxiosPromise}
 */
export function showAdd(params) {
  return request({
    url: '/msb_api/workShow/add',
    method: 'POST',
    params
  })
}

/**
 * 审核视频状态
 * @param params
 * @returns {AxiosPromise}
 */
export function showExamine(params) {
  return request({
    url: '/msb_api/workShow/examine',
    method: 'POST',
    params
  })
}
/**
 * 批量审核视频状态
 * @param params
 * @returns {AxiosPromise}
 */
export function batchExamine(params) {
  return request({
    url: '/ums_meixiu/api/works/su/v1/content/check/examine/batch',
    method: 'POST',
    params: params
  })
}
/**
 * 作品秀后管平台 - 列表
 * @param params
 * @returns {AxiosPromise}
 */
export function showList(params) {
  return request({
    url: '/msb_api/workShow/list',
    method: 'GET',
    params
  })
}

/**
 * 上线下线视频
 * @param params
 * @returns {AxiosPromise}
 */
export function showOnLine(params) {
  return request({
    url: '/msb_api/workShow/onLine',
    method: 'POST',
    params
  })
}

/**
 * 查看视频详情
 * @param params
 * @returns {AxiosPromise}
 */
export function showDetail(params) {
  return request({
    url: '/msb_api/workShow/query',
    method: 'GET',
    params
  })
}

/**
 * 查询视频作者
 * @param params
 * @returns {AxiosPromise}
 */
export function showQueryAuthor(params) {
  return request({
    url: '/msb_api/workShow/queryAuthor',
    method: 'GET',
    params
  })
}

/**
 * 是否推荐至首页
 * @param params
 * @returns {AxiosPromise}
 */
export function showRecommend(params) {
  return request({
    url: '/msb_api/workShow/recommend',
    method: 'POST',
    params
  })
}

/**
 * 编辑视频详情
 * @param params
 * @returns {AxiosPromise}
 */
export function showUpdate(params) {
  return request({
    url: '/msb_api/workShow/update',
    method: 'POST',
    params
  })
}

/**
 * 审核状态枚举
 * @returns {AxiosPromise}
 */
export function worksShowStatus() {
  return request({
    url: '/msb_api/enum/WorksShowStatus',
    method: 'GET'
  })
}

/**
 * 审核状态原因
 * @returns {AxiosPromise}
 */
export function worksShowStatusCause() {
  return request({
    url: '/msb_api/workShow/getWorksShowStatusCause',
    method: 'GET'
  })
}

/**
 * 提交调整方向
 * @param data
 * @returns {AxiosPromise}
 */
export function adjust(data) {
  return request({
    url: '/msb_api/workShow/adjust',
    method: 'POST',
    data,
    timeout: 60000
  })
}
// 视频状态统计
export function workShowStatistic(params) {
  return request({
    url: '/msb_api/workShow/list/tags',
    method: 'get',
    params
  })
}

// 小熊业务线接口
export function getPandaList(data) {
  return request({
    url: '/ums_meixiu/api/works/su/v1/content/check/list',
    method: 'POST',
    data
  })
}

// 字典接口
export function getSelectOptions(parmas) {
  return request({
    url: '/ums_meixiu/api/works/su/v1/content/check/dict',
    method: 'get',
    parmas
  })
}

// 删除
export function deleteActicle (params) {
  return request({
    url: '/ums_meixiu/api/works/su/v1/content/check/delete',
    method: 'POST',
    params: params
  })
}

// 批量审核
export function batchExaminePanda (params) {
  return request({
    url: '/ums_meixiu/api/works/su/v1/content/check/examine/batch',
    method: 'POST',
    params: params
  })
}

// 单个审核
export function singleExaminePanda (params) {
  return request({
    url: '/ums_meixiu/api/works/su/v1/content/check/examine',
    method: 'POST',
    params: params
  })
}
