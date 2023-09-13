/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-28 17:40:07
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-12-05 19:37:29
 */
// import qs from 'qs'
import request from '@/utils/request'

/**
 * 获取业务线及问卷类型
 */
export function getBizLine() {
  return request({
    url: '/operation/backend/api/survey/getBizLine',
    method: 'get'
  })
}

/**
 * 问卷分页列表
 * @param {*} data
 */
export function getSurveyList(data) {
  return request({
    url: '/operation/backend/api/survey/pageList',
    method: 'post',
    data: data
  })
}

/**
 * 发布或删除问卷
 * @param {*} data
 * {
 *  param
    cid
    surveyId
    type 1发布2删除
 * }
 */
export function pubOrDelSurvey(data) {
  return request({
    url: '/operation/backend/api/survey/pubOrDel',
    method: 'post',
    data
  })
}

/**
 * 创建问卷
 * @params {
 * cid
    surveyBizLineCode
    surveyTypeCode
    surveyTitle
    req
    surveyDesc
 * }
 */
export function createSurvey(params = {}) {
  return request({
    url: `/operation/backend/api/survey/create`,
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // data: qs.stringify(params)
    data: params
  })
}
/**
 * 查看报告-数据统计
 * @params {
 * }
 */
export function reportStatics(params = {}) {
  return request({
    url: `/operation/backend/api/survey/report`,
    method: 'post',
    data: params
  })
}
/**
 * 查看填空题报告
 * @params {
 * }
 */
export function fillBlankReport(params = {}) {
  return request({
    url: `/operation/backend/api/survey/fillBlankReport`,
    method: 'post',
    data: params
  })
}
/**
 * 复制问卷
 * cid,
 * surveyId
 * surveyTypeCode Int
 * surveyTitle String
 */
export function copySurvey(data = {}) {
  return request({
    url: '/operation/backend/api/survey/copy',
    method: 'post',
    data
  })
}

/**
 * 编辑问卷标题
 * cid,
 * surveyId
 * surveyTypeCode Int
 * surveyTitle String
 */
export function updateSurveyTitle(data = {}) {
  return request({
    url: '/operation/backend/api/survey/updateSurvey',
    method: 'post',
    data
  })
}

// 编辑问卷，获取问卷详情
export function getSurveyDetail(data = {}) {
  return request({
    url: '/operation/backend/api/survey/detail',
    method: 'post',
    data
  })
}

// 编辑问卷，提交编辑
export function updateSurvey(data = {}) {
  return request({
    url: '/operation/backend/api/survey/update',
    method: 'post',
    data
  })
}

// 编辑问卷，下拉跳转
export function backend(data = {}) {
  return request({
    url: '/operation/backend/api/survey/questionList',
    method: 'post',
    data
  })
}

// 查看详情
export function reportDetail(data = {}) {
  return request({
    url: '/operation/backend/api/survey/reportDetail',
    method: 'post',
    data
  })
}

// 下载详情数据
export function download(data = {}) {
  return request({
    url: '/operation/backend/api/survey/exportReportDetail',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 下载所有问卷数据
export function downloadAll(data = {}) {
  return request({
    url: '/operation/backend/api/survey/exportReport',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 下载所有问卷数据
export function setSurveyTag(data = {}) {
  return request({
    url: '/operation/backend/api/survey/setSurveyTag',
    method: 'post',
    data
  })
}

export function optionList(data = {}) {
  return request({
    url: '/operation/backend/api/survey/optionList',
    method: 'post',
    data
  })
}

