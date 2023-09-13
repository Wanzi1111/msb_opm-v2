/**
 * @author: Liwei
 * @description: 广告位
 * @date: 2020/1/9
 */
import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取投放列表
 * @param data
 * @returns {AxiosPromise}
 */
// advertSize
export function publishListV2(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/publishListV2',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 开启关闭
export function stopPublishV2(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/stopPublishV2',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 新增/修改投放主题
export function updatePut(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/publishV2',
    method: 'post',
    data
  })
}

// 根据投放id查询投放信息
export function getPublishById(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/listTopicPublish',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取地区接口
export function getListRegions(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/listRegions',
    method: 'get',
    params
  })
}

// 获取用户状态及购课状态字典接口
export function advertDin(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/advertDin',
    method: 'get',
    params
  })
}

// queryChannelTreeList

export function queryChannelTreeList(params) {
  return request({
    url: '/ai_api/api/c/v1/channel/queryChannelTreeList',
    method: 'post',
    params
  })
}

export function exportClickReportV2(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/exportClickReportV2',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 下载数据
export function exportClickReportV2New(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/resource/exportClickReportV2New',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
