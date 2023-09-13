/**
 * @author: pengtaoiq
 * @description: 商城管理
 * @date: 2020/12/16
 */
import request from '@/utils/request'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import qs from 'qs'
/**
 * 商品列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getList(data) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/getGoodsPage',
    method: 'post',
    data: qs.stringify(data),
    timeout: 10000
  })
}

/**
 * 新增商品
 * @param params
 * @returns {AxiosPromise}
 */
export function addGoods(data) {
  const newData = cloneDeep(data)
  if (newData.goodsRegionIds) {
    newData.goodsRegionIds = newData.goodsRegionIds.join(',')
  }
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/editGoods',
    method: 'post',
    data: qs.stringify(newData, { allowDots: true }),
    timeout: 10000
  })
}

/**
 * 商品上下架
 * @param params
 * @returns {AxiosPromise}
 */
export function updownShelf(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/goodsUpOrDown',
    method: 'post',
    params,
    timeout: 10000
  })
}

/**
 * 删除商品
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteGood(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/del',
    method: 'post',
    params: params,
    timeout: 10000
  })
}

/**
 * 分类管理列表（一二级列表）
 * @param params
 * @returns {AxiosPromise}
 */
export function getCategorys(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/getCategorys',
    method: 'get',
    params: params,
    timeout: 10000,
    cancelToken: new axios.CancelToken(function executor(c) {
      window.source = c
    })
  })
}

/**
 * 分类管理列表（一二级列表）
 * @param params
 * @returns {AxiosPromise}
 */
export function getCategorysMapBusiness(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/getCategorysMapBusiness',
    method: 'get',
    params: params,
    timeout: 10000,
    cancelToken: new axios.CancelToken(function executor(c) {
      window.source = c
    })
  })
}

export function inkind(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/goodscoupon/query/inkind/epc',
    method: 'get',
    params: params
  })
}

export function goodscouponEpc(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/goodscoupon/query/epc',
    method: 'get',
    params: params
  })
}

export function assignednum(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/goodscoupon/query/inkind/assignednum',
    method: 'get',
    params: params
  })
}

/**
 * 查询业务线
 * @param params
 * @returns {AxiosPromise}
 */
export function line() {
  return request({
    url: '/ums_meixiu/api/im/g/v1/mall/bussines/line',
    method: 'get',
    timeout: 10000
  })
}

/**
 * 查询汇率
 * @param params
 * @returns {AxiosPromise}
 */
export function rate(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/mall/bussines/rate',
    method: 'get',
    params: params,
    timeout: 10000
  })
}

/**
 * 设置汇率
 * @param params
 * @returns {AxiosPromise}
 */
export function updateRate(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/updateRate',
    method: 'post',
    params: params,
    timeout: 10000
  })
}

/**
 * 卡劵库查询
 * @param params
 * @returns {AxiosPromise}
 */
export function coupon(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/goodscoupon/query/coupons/version1',
    method: 'post',
    params: params,
    timeout: 10000
  })
}

// 选择商品
export function selectCoupon(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/coupon/overSeasCoupons',
    method: 'post',
    params: params,
    timeout: 10000
  })
}

export function singleCoupon(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/goodscoupon/query/coupon',
    method: 'post',
    params: params,
    timeout: 10000
  })
}

export function queryAllProductsFore(data) {
  return request({
    url: '/logistics/api/queryAllProductsFore',
    method: 'post',
    data
  })
}
export function categoryEdit(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/editCategory',
    method: 'POST',
    params
  })
}

export function delCategory(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/delCategory',
    method: 'POST',
    params
  })
}

export function drag(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/page/pagedview',
    method: 'POST',
    params
  })
}

export function updateSortOfMove(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/updateSortOfMove',
    method: 'POST',
    params
  })
}

export function sortIdlist(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/updateGoodsSort',
    method: 'POST',
    params
  })
}

export function cateUpdateSortId(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/updateSortId',
    method: 'POST',
    params
  })
}

export function goodsExist(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/goodsExist',
    method: 'POST',
    params
  })
}

export function transTypeEunm(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/getTransTypeList',
    method: 'POST',
    params
  })
}

// 金币分类排序列表
export function categorySort(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/getGoodsPageOfCategory',
    method: 'POST',
    params
  })
}

// 获取国家列表
export function getCountries(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/goods/getCountries',
    method: 'POST',
    params
  })
}

export function getCategoryRelationPage(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/getCategoryRelationPage',
    method: 'POST',
    params
  })
}

export function updateCategoryId(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/updateCategoryId',
    method: 'POST',
    params
  })
}

export function updateBatchCategoryId(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/category/updateBatchCategoryId',
    method: 'POST',
    params
  })
}

export function activityGoodsList(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/rvactivity/activityGoodsList',
    method: 'GET',
    params
  })
}

