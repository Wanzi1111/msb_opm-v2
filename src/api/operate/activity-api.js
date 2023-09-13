/**
 * @author: zyf
 * @description: 活动中心
 * @date: 2020/6/28
 */
import request from '@/utils/request'

/**
  * 保存业务线
  * @param params
  * @returns {AxiosPromise}
  */
export function saveBusiness(params) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivityBusiness/save',
    method: 'post',
    data: params,
    timeout: 10000
  })
}
/**
* 获取业务线列表
* @param params
* @returns {AxiosPromise}
*/
export function rActivityBusinessList(params) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivityBusiness/select',
    method: 'post',
    data: params,
    timeout: 10000
  })
}
/**
* 活动分类列表
* @param params
* @returns {AxiosPromise}
*/
export function rActivityList(data) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivityType/select',
    method: 'post',
    data
  })
}
/**
* 通过ID获取活动详情
* @param params
* @returns {AxiosPromise}
*/
export function rActivityId(data) {
  return request({
    url: `/ums_meixiu/api/a/r/v1/rActivity/findById?activityId=${data.activityId}`,
    method: 'get'
  })
}
/**
* 新增活动分类活动
* @param data
* @returns {AxiosPromise}
*/
export function saveRActivityBusiness(data) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivityType/save',
    method: 'post',
    data
  })
}
/**
* 修改活动分类活动
* @param data
* @returns {AxiosPromise}
*/
export function updateRActivityBusiness(data) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivityType/update',
    method: 'post',
    data
  })
}
/**
* 活动列表
* @param params
* @returns {AxiosPromise}
*/
export function activityList(data) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivity/select',
    method: 'post',
    data
  })
}
/**
 * 新增活动
 * @param params
 * @returns {AxiosPromise}
 */
export function saveActivity(data) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivity/save',
    method: 'post',
    data
  })
}
/**
 * 修改活动
 * @param params
 * @returns {AxiosPromise}
 */
export function updateActivity(data) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivity/update',
    method: 'post',
    data
  })
}
/**
 * 修改活动顺序
 * @param params
 * @returns {AxiosPromise}
 */
export function activitySort(data) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivity/updateSort',
    method: 'post',
    data
  })
}
/**
 * 修改活动类型顺序
 * @param params
 * @returns {AxiosPromise}
 */
export function activityTypeSort(data) {
  return request({
    url: '/ums_meixiu/api/a/r/v1/rActivityType/updateSort',
    method: 'post',
    data
  })
}
