import request from '@/utils/request'
/**
 * 添加裱框分类
 * @param params
 * @returns {AxiosPromise}
 */
export function addFrameType(payload) {
  const { activeName, ...params } = payload
  if (activeName === '101') {
    return request({
      url: '/operation/frame/addFrameType',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/category/addFrameType',
    method: 'post',
    data: {
      businessType: ~~activeName,
      name: params.name,
      sort: params.sort,
      status: 1
    },
    timeout: 10000
  })
}

/**
 * 修改裱框分类
 * @param params
 * @returns {AxiosPromise}
 */
export function updateFrameType(payload) {
  const { activeName, ...params } = payload
  if (activeName === '101') {
    return request({
      url: '/operation/frame/updateFrameType',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/category/addFrameType',
    method: 'post',
    data: {
      ...params,
      businessType: ~~activeName
    },
    timeout: 10000
  })
}

/**
 * 启用裱框分类
 * @param params
 * @returns {AxiosPromise}
 */
export function openFrameType(payload) {
  const { activeName, ...params } = payload
  if (activeName === '101') {
    return request({
      url: '/operation/frame/openFrameType',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/category/disableOrEnable',
    method: 'get',
    params: {
      id: params.id
    },
    timeout: 10000
  })
}

/**
 * 禁用裱框分类
 * @param params
 * @returns {AxiosPromise}
 */
export function forbiddenFrameType(payload) {
  const { activeName, ...params } = payload
  if (activeName === '101') {
    return request({
      url: '/operation/frame/forbiddenFrameType',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/category/disableOrEnable',
    method: 'get',
    params: {
      id: params.id
    },
    timeout: 10000
  })
}

/**
 * 表框分类列表
 * @param payload
 * @returns {AxiosPromise}
 */
export function listFrameType(payload) {
  const { activeName, ...params } = payload
  if (activeName === '101') {
    return request({
      url: '/operation/frame/listFrameType',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/category/frameCategoryList',
    method: 'post',
    data: {
      businessType: activeName,
      pageNumber: params.pageNum - 1,
      pageSize: params.pageSize
    },
    timeout: 10000
  })
}
/**
 * 表框业务线列表
 * @returns {AxiosPromise}
 */
export function frameTab() {
  return request({
    url: '/ums_meixiu/api/works/f/enum/getEnum',
    method: 'post',
    timeout: 10000
  })
}
