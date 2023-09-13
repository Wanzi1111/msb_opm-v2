/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-14 16:21:46
 * @LastEditTime: 2022-05-23 16:41:56
 * @LastEditors: ZhangYeLei
 */
/**
 * 转介绍截图审核
 */
import request from '@/utils/request'
import qs from 'qs'

/**
 * 转介绍截图审核: 1v1接口
 */
// 获取审批列表
export function getScreenshotApprovalList(data) {
  return request({
    url: '/k8s/api/recommend/api/v1/referral/queryList',
    method: 'post',
    data: data
  })
}
/**
 * 新生任务截图审核: 1v1接口
 */
// 获取新生任务审批列表
export function getNewStudentTaskApprovalList(data) {
  return request({
    url: '/k8s/api/recommend/api/NewStudentTask/queryList',
    method: 'post',
    data: data
  })
}
// 新生任务修改截图审核状态：通过/驳回
export function batchNewStudentTaskApproval(data) {
  return request({
    url: '/k8s/api/recommend/api/NewStudentTask/audit',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询新生任务列表个数
export function getNewStudentTaskQuerySize(data) {
  return request({
    url: '/k8s/api/recommend/api/NewStudentTask/querySize',
    method: 'post',
    data: data
  })
}

// 查询列表个数
export function getQuerySize(data) {
  return request({
    url: '/k8s/api/recommend/api/v1/referral/querySize',
    method: 'post',
    data: data
  })
}

// 修改截图审核状态：通过/驳回
export function batchScreenshotApproval(data) {
  return request({
    url: '/k8s/api/recommend/api/v1/ScreenShot/audit',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 转介绍字典接口
export function codeScreenshotApproval(params) {
  return request({
    url: '/k8s/api/recommend/api/v1/referral/statistic',
    method: 'post',
    params
  })
}

/**
 * 转介绍截图审核: 小熊美术接口
 */
// 获取审批列表
export function artsGetScreenshotApprovalList(params) {
  return request({
    url: '/ai_api/api/b/v1/backend/userflow/sharereward/pageList',
    method: 'get',
    params
  })
}

// 获取审批统计数据
export function artsGetScreenshotApprovalStatistics(params) {
  return request({
    url: '/ai_api/api/b/v1/backend/userflow/sharereward/statusCount',
    method: 'get',
    params
  })
}

// 修改截图审核状态：通过/驳回
export function artsScreenshotApproval(data) {
  return request({
    url: '/ai_api/api/b/v1/backend/userflow/complete',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 批量截图审核状态：通过/驳回
export function artsBatchScreenshotApproval(data) {
  return request({
    url: '/ai_api/api/b/v1/backend/userflow/batchComplete',
    method: 'post',
    data: qs.stringify(data)
  })
}
