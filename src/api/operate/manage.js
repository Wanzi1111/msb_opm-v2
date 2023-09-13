// 转介绍活动管理接口

import request from '@/utils/request'

// 获取周周有礼列表数据
export function getConfigTaskList(params) {
  return request({
    url: '/k8s/api/recommend/api/v1/admin/getConfigTaskList',
    method: 'get',
    params
  })
}

// 新建配置
export function saveWeeklyCoinConfig(data) {
  return request({
    url: '/k8s/api/recommend/api/v1/admin/saveWeeklyCoinConfig',
    method: 'post',
    data
  })
}

// 删除配置
export function deleteWeeklyCoinConfig(params) {
  return request({
    url: '/k8s/api/recommend/api/v1/admin/updateTaskListDelStatus',
    method: 'post',
    params
  })
}
// 获取配置详情
export function getWeeklyCoinConfig(params) {
  return request({
    url: '/k8s/api/recommend/api/v1/admin/getWeeklyCoinConfig',
    method: 'get',
    params
  })
}

// 获取拼团列表
export function getAssembleActive(params) {
  return request({
    url: '/ass/assemble/wx/assemble/back/getAssembleActive',
    method: 'post',
    headers: {
      token: '72aae2387bfb8075785bb7e9f631df75'
    },
    params
  })
}

// 拼团新增与修改
export function assembleActive(data) {
  return request({
    url: '/ass/assemble/wx/assemble/back/assembleActive',
    method: 'post',
    headers: {
      token: '72aae2387bfb8075785bb7e9f631df75'
    },
    data
  })
}

// 拼团撤销
export function setActiveDel(params) {
  return request({
    url: '/ass/assemble/wx/assemble/back/setActiveDel',
    method: 'post',
    headers: {
      token: '72aae2387bfb8075785bb7e9f631df75'
    },
    params
  })
}

// 新建 0元组队配置
export function createConfigNew(data) {
  return request({
    url: '/k8s/api/activity/api/activity/config/createConfigNew',
    method: 'post',
    data
  })
}

// 获取 0元组队活动列表
export function getZeroActivityList(params) {
  return request({
    url: '/k8s/api/activity/api/activity/config/getActivityList',
    method: 'post',
    params
  })
}

// 停用/启用 0元组队
export function delActivityById(params) {
  return request({
    url: '/k8s/api/activity/api/activity/config/delActivityById',
    method: 'post',
    params
  })
}

// 排序 0元组队
export function activitySortByFlag(params) {
  return request({
    url: '/k8s/api/activity/api/activity/config/activitySortByFlag',
    method: 'post',
    params
  })
}

// 获取 0元组队配置详情
export function queryActivityDetail(data) {
  return request({
    url: '/k8s/api/activity/api/activity/queryActivityDetail',
    method: 'post',
    data
  })
}

// 获取 0元组队课程列表
export function getActivityCourseList(params) {
  return request({
    url: '/k8s/api/activity/api/activity/config/getActivityCourseList',
    method: 'post',
    params
  })
}

// 创建 0元组队课程
export function createActivityCourse(data) {
  return request({
    url: '/k8s/api/activity/api/activity/config/createActivityCourse',
    method: 'post',
    data
  })
}

// 停用/启用 0元组队课程
export function delActivityCourseById(params) {
  return request({
    url: '/k8s/api/activity/api/activity/config/delActivityCourseById',
    method: 'post',
    params
  })
}

// 排序 0元组队课程
export function activityCourseSortByFlag(params) {
  return request({
    url: '/k8s/api/activity/api/activity/config/activityCourseSortByFlag',
    method: 'post',
    params
  })
}
