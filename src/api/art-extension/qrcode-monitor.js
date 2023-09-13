import request from '@/utils/request'

/**
  * 推广大使扫码购买监控
  * @param data
  * @returns {AxiosPromise}
  */
//  推广大使扫码出单统计
export function operateTrackList(data) {
  return request({
    url: '/ai_api/api/fx/op/user/api/operateTrackList',
    method: 'post',
    data: data
  })
}

// 手动刷新接口
export function refreshOperateTrack(params) {
  return request({
    url: `/ai_api/api/fx/op/user/api/refreshOperateTrack`,
    method: 'get',
    params: params
  })
}
