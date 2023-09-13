/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zhangjiawen
 * @Date: 2020-11-05 14:46:34
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-11-10 18:39:47
 */

import request from '@/utils/request'

/**
 * 业务线和客户端配置
 * @param data
 * @returns {AxiosPromise}
 */
// businessType 业务类型：
// clientType 客户端：
// name 分类名称
// id 如果是更新传id ，新增不传
export function positionConfig(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/positionConfig',
    method: 'post',
    params: params
  })
}

/**
 * 新增和修改分类
 * @param data
 * @returns {AxiosPromise}
 */
// businessType 业务类型：
// clientType 客户端：
// name 分类名称
// id 如果是更新传id ，新增不传
export function addClassify(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/addClassify',
    method: 'post',
    params: params
  })
}

/**
 * 导出运营组点击数据
 * @param data
 * @returns {AxiosPromise}
 */
// groupId 运营组id
// startTime 开始时间
// endTime   结束时间
export function exportOperatReport(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/exportClickReport',
    method: 'post',
    params: params,
    responseType: 'blob' // 导出文件必添加、不然request会报错
  })
}
/**
 * 调整运营位顺序
 * @param data
 * @returns {AxiosPromise}
 */
// orderInfo 列表
export function orderPosition(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/orderPosition',
    method: 'post',
    data: data
  })
}

/**
 * 新建运营位和更新运营位
 * @param data
 * @returns {AxiosPromise}
 */
//
// value
export function addPosition(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/addPosition',
    method: 'post',
    params: data
  })
}
/**
 * 查询运营位列表
 * @param data
 * @returns {AxiosPromise}
 */
//
// value
export function listPosition(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/listPosition',
    method: 'post',
    params: data
  })
}

/**
 * 查询分类列表
 * @param data
 * @returns {AxiosPromise}
 */
//
// value
export function searchClassify(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/searchClassify',
    method: 'post',
    params: data
  })
}
// /**
//  * 新增和修改分类
//  * @param data
//  * @returns {AxiosPromise}
//  */
// //
// // value
// export function addClassify(data) {
//   return request({
//     url: "/ums_meixiu/api/a/ad/position/addClassify",
//     method: "post",
//     params: data
//   });
// }
/**
 * 新建更新分组
 * @param params
 * @returns {AxiosPromise}
 */
// bussinessName 业务线
// clientType 客户端
// classifyId 分类id
// picUrl 预览图
// name  组名称
// id 如果是更新传id，新增不传
// enabled 0-未废弃，1-废弃
export function addGroup(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/addGroup',
    method: 'post',
    params: data
  })
}

/**
 * 获取树结构
 * @param params
 * @returns {AxiosPromise}
 */
// bussinessName 业务线
// clientType 客户端
// classifyId 分类id
// picUrl 预览图
// name  组名称
// id 如果是更新传id，新增不传
// enabled 0-未废弃，1-废弃
export function classifyTree(data) {
  return request({
    url: '/ums_meixiu/api/a/ad/position/classifyTree',
    method: 'post',
    params: data
  })
}
