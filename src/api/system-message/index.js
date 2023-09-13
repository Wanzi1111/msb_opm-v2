import request from '@/utils/request'

// 消息管理字典数据
export function getMessageDict() {
  return request({
    url: '/ums_meixiu/api/mc/manage/dict',
    method: 'get'
  })
}

// 消息组保存
export function saveMessageGroup(data) {
  return request({
    url: '/ums_meixiu/api/mc/manage/save',
    method: 'post',
    data
  })
}

// 消息组列表
export function getMessageList(data) {
  return request({
    url: '/ums_meixiu/api/mc/manage/list',
    method: 'post',
    data
  })
}

// 消息组状态开启或关闭
export function switchMessageStatus(params) {
  return request({
    url: '/ums_meixiu/api/mc/manage/status/switch',
    method: 'post',
    params
  })
}

// 	删除消息组
export function delMessageGroup(params) {
  return request({
    url: '/ums_meixiu/api/mc/manage/delGroup',
    method: 'post',
    params
  })
}

// 根据应用类型和消息类型 查询消息模板
export function selectMessageTemplateList(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/v2/push/selectMessageTemplateList',
    method: 'get',
    params
  })
}

// 根据应用类型和消息类型 查询场景配置
export function selectScenarioConfigurationList(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/v2/push/selectScenarioConfigurationList',
    method: 'get',
    params
  })
}

