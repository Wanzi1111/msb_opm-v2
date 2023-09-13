import request from '@/utils/request'

// 积分商城-订单列表接口
export function getOrderList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/order/backendOrderList',
    method: 'post',
    data
  })
}

// 查询订单详情
export function getOrderDetail(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/order/orderDetail',
    method: 'POST',
    params
  })
}

// 查询订单物流详情
export function getLogisticsDetail(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/order/getLogisticsDetail',
    method: 'POST',
    params
  })
}

// 导出订单列表
export function exportOrder(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/order/exportOrder',
    method: 'POST',
    responseType: 'blob',
    data
  })
}

// 获取渠道来源
export function getChannelList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/channel/findAll',
    method: 'POST',
    data
  })
}

// 获取活动类型
export function getDiscountTypeIdAndShowName(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/marketingactivity/getDiscountTypeIdAndShowName',
    method: 'POST',
    data
  })
}
