/**
 * @author: Liwei
 * @description: 公告
 * @date: 2020/6/4
 */
import request from '@/utils/request'
import qs from 'qs'

/**
 * 回填物流单快递单号
 * @param data
 * @returns {AxiosPromise}
 */
export function backFillTrackingNum(data) {
  return request({
    url: '/logistics/order/backFillTrackingNum',
    method: 'POST',
    data
  })
}

/**
 * 快递转运
 * @param data
 * @returns {AxiosPromise}
 */
export function expressTransfer(data) {
  return request({
    url: '/logistics/order/transferExpressCodeAndCompany',
    method: 'POST',
    data
  })
}

/**
 * 取消订单
 * @param data
 * @returns {AxiosPromise}
 */
export function cancelOrder(data) {
  return request({
    url: '/logistics/order/cancelOrder',
    method: 'POST',
    data
  })
}

/**
 * 批量取消订单
 * @param data
 * @returns {AxiosPromise}
 */
export function batchCancelOrder(data) {
  return request({
    url: '/logistics/order/batchCancelOrder',
    method: 'POST',
    data
  })
}

/**
 * 撤回订单
 * @param data
 * @returns {AxiosPromise}
 */
export function chargeBack(data) {
  return request({
    url: '/logistics/revokeOrder/chargeback',
    method: 'POST',
    data
  })
}

/**
 * 批量撤回订单
 * @param data
 * @returns {AxiosPromise}
 */
export function batchChargeBack(data) {
  return request({
    url: '/logistics/revokeOrder/batchChargeback',
    method: 'POST',
    data
  })
}

/**
 * delOrder
 * @param params
 * @returns {AxiosPromise}
 */
export function delOrder(params) {
  return request({
    url: '/logistics/order/delOrder',
    method: 'GET',
    params
  })
}

/**
 * 中台创建物流订单
 * @param data
 * @returns {AxiosPromise}
 */
export function mpCreateOrder(data) {
  return request({
    url: '/logistics/order/mpCreateOrder',
    method: 'POST',
    data
  })
}

/**
 * 中台创建物流订单 SKU
 * @param data
 * @returns {AxiosPromise}
 */
export function mpCreateOrderSku(data) {
  return request({
    url: '/logistics/order/mpCreateOrderSku',
    method: 'POST',
    data
  })
}

/**
 * 物流中台审核订单,支持批量
 * @param data
 * @returns {AxiosPromise}
 */
export function mpOrderVerify(data) {
  return request({
    url: '/logistics/order/mpOrderVerify',
    method: 'POST',
    data
  })
}

/**
 * 中台物流单查询
 * @param data
 * @returns {AxiosPromise}
 */
export function queryOrder(data) {
  return request({
    url: '/logistics/order/queryOrder',
    method: 'POST',
    data
  })
}

/**
 * 根据物流单ID查询物流单信息,包含地址信息
 * @param params
 * @returns {AxiosPromise}
 */
export function queryOrderDetail(params) {
  return request({
    url: '/logistics/order/queryOrderDetail',
    method: 'GET',
    params
  })
}

/**
 * 查询物流单物流信息
 * @param params
 * @returns {AxiosPromise}
 */
export function queryOrderStatusByOrderNo(params) {
  return request({
    url: '/logistics/order/queryOrderStatusByOrderNo',
    method: 'GET',
    params
  })
}

/**
 * 关联订单查询
 * @param params
 * @returns {AxiosPromise}
 */
export function queryRelatedOrder(params) {
  return request({
    url: '/logistics/order/queryRelatedOrder',
    method: 'GET',
    params
  })
}

/**
 * 中台物流单数据统计
 * @param data
 * @returns {AxiosPromise}
 */
export function staticicsOrderData(data) {
  return request({
    url: '/logistics/order/staticicsOrderData',
    method: 'POST',
    data
  })
}

/**
 * 物流渠道来源
 * @param data
 * @returns {AxiosPromise}
 */
export function queryChannelClientByPage(data) {
  return request({
    url: `/logistics/public/dict/queryChannelClientByPage?${qs.stringify(data)}`,
    method: 'POST'
    // data
  })
}

/**
 * 发货仓库新接口
 * @param data
 * @returns {AxiosPromise}
 */
export function queryWarehouseDicByPage(data) {
  return request({
    url: `/logistics/public/dict/queryWarehouseDicByPage?${qs.stringify(data)}`,
    method: 'POST'
  })
}

/**
 * 快递新接口
 * @param data
 * @returns {AxiosPromise}
 */
export function queryAllSupplier(data) {
  return request({
    url: `/logistics/public/dict/queryAllSupplier?${qs.stringify(data)}`,
    method: 'POST'
  })
}

/**
 * 中台物流单列表查询
 * @param data
 * @returns {AxiosPromise}
 */
export function queryOrderSku(params) {
  return request({
    url: '/logistics/order/queryOrderSku',
    method: 'GET',
    params
  })
}

