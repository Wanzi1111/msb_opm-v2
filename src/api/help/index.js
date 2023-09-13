/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zhangjiawen
 * @Date: 2020-11-30 16:10:21
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-12-08 12:23:40
 */
import request from '@/utils/request'

/**
 * 获取业务线常量
 * @param params
 * @returns {AxiosPromise}
 */
export function getConstant(params) {
  return request({
    url: '/operation/help/issue/constant',
    method: 'get',
    params
  })
}
/**
 * 获取列表接口
 * @param params
 * @returns {AxiosPromise}
 */
export function getlistIssue(params) {
  return request({
    url: '/operation/help/issue/listIssue',
    method: 'get',
    params
  })
}
/**
 * 获取分类常量
 * @param params
 * @returns {AxiosPromise}
 */
export function getClassConstant(params) {
  return request({
    url: '/operation/help/classify/constant',
    method: 'get',
    params
  })
}
/**
 * 添加分类
 * @param params
 * @returns {AxiosPromise}
 */
export function addHelpClassify(params) {
  return request({
    url: '/operation/help/classify/addClassify',
    method: 'post',
    data: params
  })
}
/**
 * 更新分类
 * @param params
 * @returns {AxiosPromise}
 */
export function updateClassify(params) {
  return request({
    url: '/operation/help/classify/updateClassify',
    method: 'post',
    data: params
  })
}
/**
 * 删除分类
 * @param params
 * @returns {AxiosPromise}
 */
export function removeHelpClassify(params) {
  return request({
    url: '/operation/help/classify/removeClassify',
    method: 'post',
    params
  })
}
/**
 * 添加问题
 * @param params
 * @returns {AxiosPromise}
 */
export function addHelpIssue(params) {
  return request({
    url: '/operation/help/issue/addHelpIssue',
    method: 'post',
    data: params
  })
}
/**
 * 更新问题
 * @param params
 * @returns {AxiosPromise}
 */
export function updateHelpIssue(params) {
  return request({
    url: '/operation/help/issue/updateHelpIssue',
    method: 'post',
    data: params
  })
}
/**
 * 删除问题
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteHelpIssue(params) {
  return request({
    url: '/operation/help/issue/deleteHelpIssue',
    method: 'post',
    params
  })
}
/**
 * 修改帮助顺序
 * @param params
 * @returns {AxiosPromise}
 */
export function sortHelpIssue(params) {
  return request({
    url: '/operation/help/issue/sortHelpIssue',
    method: 'post',
    params
  })
}
