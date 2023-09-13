/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-14 16:21:46
 * @LastEditTime: 2022-05-30 15:58:09
 * @LastEditors: ZhangYeLei
 */

import request from '@/utils/request'
import moment from 'moment'

/**
  * OSS签名
  * @returns {AxiosPromise}
  */
export function getSignature(params) {
  return request({
    url: '/k8s/api/complaint/api/oss/getSignature',
    method: 'get',
    params
  })
}

const get_suffix = (filename) => {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1) {
    suffix = filename.substring(pos).toLocaleLowerCase()
  }
  return suffix
}

const random_string = (len) => {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
  * 上传文件
  * @returns {Promise<(AxiosPromise<any>|string)[]>}
  */
export async function upload({
  file: file,
  rename: rename = true,
  time: time = 0,
  attr: attr = {},
  onUploadProgress = () => {}
}, cb) {
  const bucketName = attr.bucketName ? attr.bucketName : 'msb-operation-center'
  const res = JSON.parse(localStorage.getItem('sign'))
  const timestamp = new Date().getTime() / 1000
  let data = {}
  if (res && res.expire - timestamp > 30 && res.bucketName === bucketName) {
    data = res
  } else {
    data = await getSignature({
      bucketName: bucketName
    })
    localStorage.setItem('sign', JSON.stringify({ ...data, bucketName: bucketName }))
  }
  // const dir = attr.bucketName ? attr.dir : 'operation-resource/'
  const filename = file.name
  const picName = random_string(10) + get_suffix(filename)
  const keyValue = `${data.dir}/${moment().format('YYYY-MM-DD')}/${rename ? picName : file.name}`
  const ossDat = new FormData()
  ossDat.append('key', keyValue)
  ossDat.append('policy', data.policy)
  ossDat.append('OSSAccessKeyId', data.accessid)
  ossDat.append('success_action_status', 200)
  ossDat.append('signature', data.signature)
  // ossDat.append('callback', data.callback)
  ossDat.append('file', file, file.name)
  const url = `https://imgvip.meishubao.com/${keyValue}`
  console.log(url, 'url')

  request({
    url: data.host,
    method: 'post',
    data: ossDat,
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onUploadProgress,
    timeout: (time || 20) * 1000
  }).then(res => {
    cb && cb(url)
    // if (res.Status === 'OK') {
    //   cb && cb(`${data.urlPrefix}${keyValue}`)
    // } else {
    //   cb && cb('')
    //   this.$message.error('上传超时，请检查网络后重试')
    // }
  }).catch(err => {
    console.log(err)
    this.$message.error('获取上传文件签名失败')
    cb && cb('')
  })
}

// 商品库 轻课的课程信息
export function getCourseListOfVender() {
  return request({
    url: '/ums_meixiu/api/im/g/v1/admin/thirdCourse/getCourseListOfVender',
    method: 'get'
  })
}
