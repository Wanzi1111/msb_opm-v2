import request from '@/utils/request'

// 物流列表
export function getExpressList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/order/backendExpressList',
    method: 'post',
    data
  })
}

// 立即推单
export function immediatelyPush(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/order/immediatelyPush',
    method: 'post',
    params
  })
}

// 取消物流单（若已有WL单号，则无法取消）
export function cancelExpress(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/order/cancelExpress',
    method: 'post',
    data
  })
}

// 获取订单中台快递详情
export function getLogisticsDetail2(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/order/getLogisticsDetail',
    method: 'post',
    params
  })
}
