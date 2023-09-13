import request from '@/utils/request'

// 添加流程计划
export function addProcess(data) {
  return request({
    url: '/ums_meixiu/api/sms/api/web/process/add',
    method: 'post',
    data
  })
}

// 删除流程计划
export function delProcess(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/web/process/delete',
    method: 'post',
    params
  })
}

// 编辑流程计划
export function editProcess(data) {
  return request({
    url: '/ums_meixiu/api/sms/api/web/process/edit',
    method: 'post',
    data
  })
}

// 获取流程计划详情
export function getProcessDetail(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/web/process/editFind',
    method: 'post',
    params
  })
}

// 获取流程计划列表
export function getProcessList(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/web/process/list',
    method: 'post',
    params
  })
}
