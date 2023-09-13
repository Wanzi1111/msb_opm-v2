import request from '@/utils/request'

/**
 * 批量导入商品
 * @param data
 * @returns {AxiosPromise}
 */
export function importCreateProduct({ file, onUploadProgress }) {
  console.log(file, onUploadProgress)
  const data = new FormData()
  data.append('file', file)
  return request({
    url: '/logistics/product/importProduct',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: onUploadProgress,
    timeout: 60 * 1000
  })
}

/**
 * 批量导入商品
 * @param data
 * @returns {AxiosPromise}
 */
export function importCreateMaterial({ productCode, file, onUploadProgress }) {
  console.log(file, onUploadProgress)
  const data = new FormData()
  data.append('file', file)
  data.append('productCode', productCode)
  console.log(data)
  return request({
    url: '/logistics/product/importProductMaterial',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: onUploadProgress,
    timeout: 60 * 1000
  })
}
