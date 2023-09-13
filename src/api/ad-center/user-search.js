import request from '@/utils/request'

export function getUserAdList(params) {
  return request({
    url: '/ums_meixiu/api/a/ad/preview/ad',
    method: 'get',
    params
  })
}
