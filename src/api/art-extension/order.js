/**
 * @author: zhengyufeng
 * @description: 推广订单查询
 * @date: 2021/7/15
 */
import request from '@/utils/request'

/**
  * 获取订单记录列表
  * @param data
  * @returns {AxiosPromise}
  */
export function orderRecordList(data) {
  return request({
    url: '/ai_api/api/fx/op/order/api/getOrderRecord',
    method: 'post',
    data
  })
}

/**
  * 获取订单总单出总收益
  * @param data
  * @returns {AxiosPromise}
  */
export function orderNumAndProfit(data) {
  return request({
    url: '/ai_api/api/fx/op/order/api/orderNumAndProfit',
    method: 'post',
    data
  })
}

/**
  * 获取所有订单筛选状态
  * @param
  * @returns {AxiosPromise}
  */
export function getAllOrderFilterStatus() {
  return request({
    url: '/ai_api/api/fx/op/order/api/getAllOrderFilterStatus',
    method: 'get'
  })
}

/**
  * 获取所有订单科目
  * @param
  * @returns {AxiosPromise}
  */
export function getAllOrderSubject() {
  return request({
    url: '/ai_api/api/fx/op/order/api/getAllOrderSubject',
    method: 'get'
  })
}
