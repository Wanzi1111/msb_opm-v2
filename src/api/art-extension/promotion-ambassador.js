/**
 * @author: zhengyufeng
 * @description: 推广大使管理
 * @date: 2021/7/15
 */
import request from '@/utils/request'

/**
  * 推广大使列表
  * @param data
  * @returns {AxiosPromise}
  */
export function promotionAmbassadorList(data) {
  return request({
    url: '/ai_api/api/fx/op/user/api/getSpreadUser',
    method: 'post',
    data: data
  })
}

// 审核通过
export function approvedPromotionAmbassador(params) {
  return request({
    url: '/ai_api/api/fx/op/user/api/approved',
    method: 'get',
    params: params
  })
}

// 淘汰
export function eliminateUser(params) {
  return request({
    url: '/ai_api/api/fx/op/user/api/eliminateUser',
    method: 'get',
    params: params
  })
}

// 编辑
export function editPromotionAmbassador(data) {
  return request({
    url: '/ai_api/api/fx/op/user/api/modifySpreadUser',
    method: 'post',
    data: data
  })
}

// 关闭
export function closePromotionAmbassador(params) {
  return request({
    url: '/ai_api/api/fx/op/user/api/closeUser',
    method: 'get',
    params: params
  })
}

// 恢复
export function recoveryPromotionAmbassador(params) {
  return request({
    url: '/ai_api/api/fx/op/user/api/restoreUser',
    method: 'get',
    params: params
  })
}

// 开启/关闭二级
export function ediSecondLevelAmbassador(params) {
  return request({
    url: '/ai_api/api/fx/op/user/api/openPidStatus',
    method: 'get',
    params: params
  })
}

// 获取所有用户等级列表
export function getAllLevel() {
  return request({
    url: '/ai_api/api/fx/op/user/api/getAllLevel',
    method: 'get'
  })
}

// 获取所有用户状态列表
export function getAllUserStatus() {
  return request({
    url: '/ai_api/api/fx/op/user/api/getAllUserStatus',
    method: 'get'
  })
}

// 手动添加推广大使
export function addSpreadUser(params) {
  return request({
    url: '/ai_api/api/fx/op/user/api/addSpreadUser',
    method: 'get',
    params
  })
}

// 修改推广大使添加微信标识
export function updateAddWechat(params) {
  return request({
    url: '/ai_api/api/fx/op/user/api/updateAddWechat',
    method: 'get',
    params
  })
}
