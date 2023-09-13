import request from '@/utils/request'

/**
 * 添加表框 参数json
 * @param data
 * @returns {AxiosPromise}
 */
export function addFrame(data, payload) {
  const { businessType, ...params } = payload
  if (businessType === '101') {
    return request({
      url: '/operation/frame/addFrame',
      method: 'post',
      data,
      params,
      timeout: 10000
    })
  } else if (businessType === '105') {
    return request({
      url: '/ums_meixiu/api/works/f/v1/frame/addFrame',
      method: 'post',
      data: {
        ...data,
        businessType: ~~businessType
        // compressPicUrl: data?.compressPicUrl?.[0]?.url,
        // pictureBox: ~~data?.newPictureBox,
        // workFrameCategoryId: ~~data.workFrameCategoryId
      },
      timeout: 10000
    })
  } else {
    return request({
      url: '/ums_meixiu/api/works/f/v1/frame/addFrame',
      method: 'post',
      data: {
        ...data,
        businessType: ~~businessType,
        compressPicUrl: data?.compressPicUrl?.[0]?.url,
        pictureBox: ~~data?.newPictureBox,
        workFrameCategoryId: ~~data.workFrameCategoryId
      },
      timeout: 10000
    })
  }
}

/**
 * 修改表框 参数json
 * @param data
 * @returns {AxiosPromise}
 */
export async function updateFrame(data, payload) {
  const { businessType, ...params } = payload
  if (businessType === '101') {
    return request({
      url: '/operation/frame/updateFrame',
      method: 'post',
      data,
      params,
      timeout: 10000
    })
  } else if (businessType === '105') {
    const value = await request({
      url: '/ums_meixiu/api/works/f/v1/frame/getFrameById',
      method: 'post',
      params: {
        id: data.id
      }
    })
    return request({
      url: '/ums_meixiu/api/works/f/v1/frame/addFrame',
      method: 'post',
      data: {
        ...value?.payload || {},
        ...data,
        businessType: ~~businessType
        // compressPicUrl: data?.compressPicUrl?.[0]?.url || '',
        // pictureBox: ~~data?.newPictureBox,
        // paperJamMargin: data?.paper === '0' ? 0 : data?.paperJamMargin,
        // paperJamUrl: data?.paper === '0' ? '' : data?.paperJamUrl
      },
      timeout: 10000
    })
  } else {
    const value = await request({
      url: '/ums_meixiu/api/works/f/v1/frame/getFrameById',
      method: 'post',
      params: {
        id: data.id
      }
    })
    return request({
      url: '/ums_meixiu/api/works/f/v1/frame/addFrame',
      method: 'post',
      data: {
        ...value?.payload || {},
        ...data,
        businessType: ~~businessType,
        compressPicUrl: data?.compressPicUrl?.[0]?.url || '',
        pictureBox: ~~data?.newPictureBox,
        paperJamMargin: data?.paper === '0' ? 0 : data?.paperJamMargin,
        paperJamUrl: data?.paper === '0' ? '' : data?.paperJamUrl
      },
      timeout: 10000
    })
  }
}

/**
 * 启用裱框
 * @param params
 * @returns {AxiosPromise}
 */
export function openFrame(payload) {
  const { businessType, ...params } = payload
  if (businessType === '101') {
    return request({
      url: '/operation/frame/openFrame',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/upperAndLowerShelve',
    method: 'post',
    params,
    timeout: 10000
  })
}

/**
 * 禁用裱框
 * @param params
 * @returns {AxiosPromise}
 */
export function forbiddenFrame(payload) {
  const { businessType, ...params } = payload
  if (businessType === '101') {
    return request({
      url: '/operation/frame/forbiddenFrame',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/upperAndLowerShelve',
    method: 'post',
    params,
    timeout: 10000
  })
}

/**
 * 表框管理列表
 * @param params
 * @returns {AxiosPromise}
 */
export function listFrame(payload) {
  const { businessType, ...params } = payload
  if (businessType === '101') {
    return request({
      url: '/operation/frame/listFrame',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  const { pageNum, type, order, ...resetParams } = params
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/getFrameList',
    method: 'post',
    data: {
      ...resetParams,
      businessType,
      pageNumber: pageNum - 1,
      status: resetParams?.status >= 0 ? resetParams?.status : undefined,
      workFrameCategoryId: ~~type || undefined,
      sortField: 'num',
      sortDirection: order
    },
    timeout: 10000
  })
}

/**
 * 表框分类列表
 * @param params
 * @returns {AxiosPromise}
 */
export function listFrameTypeAll(payload) {
  const { businessType, ...params } = payload
  if (businessType === '101') {
    return request({
      url: '/operation/frame/listFrameTypeAll',
      method: 'post',
      params,
      timeout: 10000
    })
  }
  return request({
    url: '/ums_meixiu/api/works/f/v1/frame/category/frameCategoryList',
    method: 'post',
    data: {
      businessType,
      pageNumber: 0,
      pageSize: 100,
      status: 1
    },
    timeout: 10000
  })
}
