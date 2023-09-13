/**
 * @author: Liwei
 * @description: 商品管理
 * @date: 2020/6/4
 */
import request from '@/utils/request'

/**
 * 查询业务线信息
 * @param data
 * @returns {AxiosPromise}
 */
export function businessList() {
  return request({
    url: '/logistics/product/business/list',
    method: 'POST'
  })
}

export function saveProductDetail(data) {
  return request({
    url: '/logistics/product/saveProductDetail',
    method: 'POST',
    data
  })
}

/**
 * 删除商品
 * @param params
 * @returns {AxiosPromise}
 */
export function productDelete(params) {
  return request({
    url: '/logistics/product/delete',
    method: 'POST',
    params
  })
}

/**
 * 启用/停用商品
 * @param params
 */
export function productChange(params) {
  return request({
    url: '/logistics/product/updateProductStatus',
    method: 'POST',
    params
  })
}

/**
 * 获取商品信息
 * @param params
 * @returns {AxiosPromise}
 */
export function getProduct(params) {
  return request({
    url: '/logistics/product/getProductDetail',
    method: 'POST',
    params
  })
}

/**
 * 获取批次号列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getProductBatchCodeList(params) {
  return request({
    url: '/logistics/product/getProductBatchCodeList',
    method: 'POST',
    params
  })
}

/**
 * 保存商品批次
 * @param params
 * @returns {AxiosPromise}
 */
export function saveBatch(data) {
  return request({
    url: '/logistics/product/saveBatch',
    method: 'POST',
    data
  })
}

/**
 * 批量下载模版
 */
export function getProductExcel() {
  const url = `${import.meta.env['VUE_APP_URL_ENV']}/product/getProductExcel`
  const linkNode = document.createElement('a')
  linkNode.style.display = 'none'
  linkNode.href = url
  console.log(url)
  document.body.appendChild(linkNode)
  linkNode.click()
  document.body.removeChild(linkNode)
}

/**
 * 批量导入物料下载模版
 */
export function getProductMaterialExcel(data) {
  const url = `${import.meta.env['VUE_APP_URL_ENV']}/product/getProductMaterialExcel?productCode=${data.productCode}&productName=${data.productName}`
  const linkNode = document.createElement('a')
  linkNode.style.display = 'none'
  linkNode.href = url
  console.log(url)
  document.body.appendChild(linkNode)
  linkNode.click()
  document.body.removeChild(linkNode)
}

/**
 * 获取物料
 * @param params
 * @returns {AxiosPromise}
 */
export function materialConnect(params) {
  return request({
    url: '/logistics/product/getProductMaterial',
    method: 'POST',
    params
  })
}

/**
 * 删除物料
 * @param params
 * @returns {AxiosPromise}
 */
export function materialDelete(params) {
  return request({
    url: '/logistics/product/delProductMaterial',
    method: 'POST',
    params
  })
}

/**
 * 删除物料
 * @param params
 * @returns {AxiosPromise}
 */
export function materialSave(params) {
  return request({
    url: '/logistics/product/saveProductMaterial',
    method: 'POST',
    params
  })
}

/**
 * 分页查询商品信息
 * @param data
 * @returns {AxiosPromise}
 */
export function productList(data) {
  return request({
    url: '/logistics/product/getList',
    // url: '/logistics/product/list',
    method: 'POST',
    data
  })
}

/**
 * 实体下批量修改物料
 * @param data
 * @returns {AxiosPromise}
 */
export function saveProductMaterialList(data) {
  return request({
    url: '/logistics/product/saveProductMaterialList',
    method: 'POST',
    data
  })
}

/**
 * 分页查询商品信息
 * @param data
 * @returns {AxiosPromise}
 */
export function productListMatrial(data) {
  return request({
    url: '/logistics/product/list',
    method: 'POST',
    data
  })
}

/**
 * 添加商品
 * @param data
 * @returns {AxiosPromise}
 */
export function productSave(data) {
  return request({
    url: '/logistics/product/save',
    method: 'POST',
    data
  })
}

/**
 * 更新商品
 * @param data
 * @returns {AxiosPromise}
 */
export function productUpdate(data) {
  return request({
    url: '/logistics/product/update',
    method: 'POST',
    data
  })
}

/**
 * 查询仓库信息
 * @param data
 * @returns {AxiosPromise}
 */
export function houseListApi(data) {
  return request({
    url: '/logistics/warehouse/list',
    method: 'POST',
    data
  })
}

/**
 * 删除商品与库存关联信息
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteHouse(data) {
  return request({
    url: '/logistics/warehouse/product/delete',
    method: 'POST',
    data
  })
}

/**
 * 保存仓库信息
 * @param data
 * @returns {AxiosPromise}
 */
export function houseSave(data) {
  return request({
    url: '/logistics/warehouse/save',
    method: 'POST',
    data
  })
}

/**
 * 更新仓库信息
 * @param data
 * @returns {AxiosPromise}
 */
export function houseUpdate(data) {
  return request({
    url: '/logistics/warehouse/update',
    method: 'POST',
    data
  })
}

/**
 * 查询商品与库存关联信息
 * @param data
 * @returns {AxiosPromise}
 */
export function houseList(data) {
  return request({
    url: '/logistics/warehouse/product/list',
    method: 'POST',
    data
  })
}

/**
 * 查询单个商品与库存关联信息
 * @param data
 * @returns {AxiosPromise}
 */
export function productOne(data) {
  return request({
    url: '/logistics/warehouse/product/productOne',
    method: 'POST',
    data
  })
}

/**
 * 增加-扣减 库存
 * @param data
 * @returns {AxiosPromise}
 */
export function updateStock(data) {
  return request({
    url: '/logistics/warehouse/product/updateStock',
    method: 'POST',
    data
  })
}

/**
 * 查询第三方商品库存
 * @param data
 * @returns {AxiosPromise}
 */
export function updateSupplierStock(data) {
  return request({
    url: '/logistics/warehouse/product/updateSupplierStock',
    method: 'POST',
    data
  })
}

/**
 * 导出商品数据
 * @param data
 * @returns {AxiosPromise}
 */
export function exportProduct(data) {
  return request({
    url: '/logistics/product/exportProduct',
    method: 'POST',
    data,
    responseType: 'blob' // 导出文件必添加、不然request会报错
  })
}

/**
 *
 解析云文件
 * @returns {AxiosPromise}
 */
export function readUrl(params) {
  return request({
    url: '/logistics/oss/readUrl',
    method: 'POST',
    params
  })
}

/**
 * 批量修改
 * @returns {AxiosPromise}
 */
export function saveProductEntity(data) {
  return request({
    url: '/logistics/product/saveProductEntity',
    method: 'POST',
    data
  })
}
