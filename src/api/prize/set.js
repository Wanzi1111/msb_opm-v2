/**
 * @author: Liwei
 * @description: 奖品
 * @date: 2020/7/27
 */
import request from '@/utils/request'

/**
 * 奖品管理 分页获取
 * @param params
 * @returns {AxiosPromise}
 */
export function getPrize(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/getPrize',
    method: 'post',
    params
  })
}
/**
 * 奖品管理 单条获取
 * @param params
 * @returns {AxiosPromise}
 */
export function getOnePrize(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/getOnePrize',
    method: 'post',
    params
  })
}
/**
 * 奖品管理 保存
 * @param params
 * @returns {AxiosPromise}
 */
export function savePrize(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/savePrize',
    method: 'post',
    params
  })
}
/**
 * 奖品管理 删除
 * @param params
 * @returns {AxiosPromise}
 */
export function delPrize(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/delPrize',
    method: 'post',
    params
  })
}

/**
 * 月度转介绍 卡券列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getCardConfig(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/getCardConfig',
    method: 'post',
    params
  })
}

/**
 * 月度转介绍 卡券详情
 * @param params
 * @returns {AxiosPromise}
 */
export function getCardDetailList(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/getCardByPage',
    method: 'post',
    params
  })
}

/**
 * 月度转介绍 卡券导入
 * @param params
 * @returns {AxiosPromise}
 */
// export function importCard(params) {
//   return request({
//     url: '/ums_meixiu/api/a/p/v1/activity/prize/importCard',
//     method: 'post',
//     params
//   })
// }
export function importCard(file) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/importCard',
    method: 'post',
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 60 * 1000
  })
}

/**
 * 月度转介绍 卡券导出
 * @param params
 * @returns {AxiosPromise}
 */
export function exportCard(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/exportCard',
    method: 'post',
    params,
    responseType: 'blob' // 导出文件必添加、不然request会报错
  })
}

/**
 * 月度转介绍 卡券删除
 * @param params
 * @returns {AxiosPromise}
 */
export function delCard(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/delCard',
    method: 'post',
    params
  })
}

/**
 * 月度转介绍 卡券补发
 * @param params
 * @returns {AxiosPromise}
 */
export function reissueCard(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/reissueCard',
    method: 'post',
    params
  })
}

/**
 * 月度转介绍 卡券下载模版
 * @param params
 * @returns {AxiosPromise}
 */
export function exportCardTemplate(params) {
  return request({
    url: '/ums_meixiu/api/a/p/v1/activity/prize/exportCardTemplate',
    method: 'post',
    params,
    responseType: 'blob' // 导出文件必添加、不然request会报错
  })
}
