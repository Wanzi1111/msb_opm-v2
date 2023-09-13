/*
 * @Author: ZhangYeLei
 * @Date: 2022-05-26 15:09:12
 * @LastEditTime: 2022-05-26 17:35:57
 * @LastEditors: ZhangYeLei
 */
/**
 * @author: Liwei
 * @description: 登录页接口
 * @date: 2020/1/8
 */
import request from '@/utils/request'
import qs from 'qs'

/**
 * 登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login(data) {
  return request({
    url: '/operation/login/teaEmailOrPhonePwdLogin',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getTokenReq(data) {
  return request({
    url: `/ums_meixiu/api/uc/api/auth/apply/token?userName=${data.phone}&platform=OPM`,
    method: 'post'
  })
}

// 接入权限管理新登陆接口
export function umsLogin(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums_meixiu/api/uc/api/platform/user/login',
    method: 'post',
    params
  })
}

// 修改密码
export async function modPwd(data) {
  return request('/ums_meixiu/api/uc/api/user/pwd/mod', {
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/ums_meixiu/api/uc/api/platform/user/login/info',
    method: 'get',
    headers: {
      token
    }
  })
}

// 接入sso登陆
export function ssoLogin(params) {
  return request({
    url: '/sso/api/v1/token/get',
    method: 'get',
    params
  })
}

