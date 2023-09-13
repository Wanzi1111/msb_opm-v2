import request from '@/utils/request'
/**
 * 查询广场首页作品
 * @param data
 * @returns {AxiosPromise}
 */
export function findSquareWorks(data) {
  return request({
    url: '/ums_meixiu/api/works/s/v1/works/bear/findSquareWorks',
    method: 'post',
    data,
    timeout: 10000
  })
}
/**
 * 查询广场首页作品
 * @param {*} params
 * @returns
 */
export function getOperationCenterWorkList(params) {
  return request({
    url: '/msb_api/roomShow/getOperationCenterWorkList',
    method: 'get',
    params,
    timeout: 10000
  })
}
/**
 * 是否显示作品
 * @param {*} params
 * @returns
 */
export function WorkDispaly(params) {
  return request({
    url: '/msb_api/roomShow/operationCenterWorkDispaly',
    method: 'post',
    params,
    timeout: 10000
  })
}
/**
 * 是否推荐作品
 * @param {*} params
 * @returns
 */
export function WorkRecommend(params) {
  return request({
    url: '/msb_api/roomShow/operationCenterWorkRecommend',
    method: 'post',
    params,
    timeout: 10000
  })
}

/**
 * 是否取消馆藏
 * @param {*} params
 * @returns
 */
export function WorkRoomShow(params) {
  return request({
    url: '/msb_api/roomShow/operationCenterWorkRoomShow',
    method: 'post',
    params,
    timeout: 10000
  })
}
/* 查询广场首页作品(新)
 * @param data
 * @returns {AxiosPromise}
 */
// export function squareWorksList(data) {
//   return request({
//     url: '/ums_meixiu/api/works/s/v1/works/bear/squareWorksList',
//     method: 'post',
//     data,
//     timeout: 10000
//   })
// }

/**
 * 查询广场首页作品(新)
 * @param data
 * @returns {AxiosPromise}
 */
export function squareWorksList(data) {
  return request({
    url: '/ums_meixiu/api/works/s/v1/works/bear/squareWorksList',
    method: 'post',
    data,
    timeout: 10000
  })
}

/**
 * 修改作品状态作品
 * @param params
 * @returns {AxiosPromise}
 */
export function updateBearWorks(params) {
  return request({
    url: '/ums_meixiu/api/works/s/v1/works/bear/updateBearWorks',
    method: 'post',
    params,
    timeout: 10000
  })
}

