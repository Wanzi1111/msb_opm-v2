/**
 * 活动审批
 */

import request from '@/utils/request'

// 获取审批列表
export function getActivityList(params) {
  return request({
    url: '/k8s/api/recommend/api/activity/getActivityList',
    method: 'post',
    params
  })
}

// 活动审核
export function checkAudit(params) {
  return request({
    url: '/k8s/api/recommend/api/activity/checkAudit',
    method: 'post',
    params
  })
}

// 活动审核
export function getStatistics(params) {
  return request({
    url: '/k8s/api/recommend/api/activity/statistics',
    method: 'post',
    params
  })
}
