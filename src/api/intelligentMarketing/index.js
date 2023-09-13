/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-21 14:32:15
 * @LastEditTime: 2022-05-25 11:46:33
 * @LastEditors: ZhangYeLei
 */
import request from '@/utils/request'

// * - * - * - * - * - * - * - * 用户分群 - * - * - * - * - * - * - * - * - * - * - *

// 获取 专属token
export function getBIToken() {
  return request({
    url: '/big_data/oauth2/getToken?clientId=ae7a2621-361e-4604-84bd-0617b7213589&clientSecret=1HHixbNb2bvvkI8i',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取 业务线
export function getRootList(params) {
  return request({
    url: '/big_data/client/profile/biz/rootList',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

// 获取 人群分类-目录树-不同业务线的目录树
export function getGroupTreeByRootId(params) {
  return request({
    url: `/big_data/client/profile/group/getGroupTreeByRootId/${params.rootId}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
    // params
  })
}

// 获取 用户属性目录树-不同业务线的目录树
export function getUserPropsTreeByRootId(params) {
  return request({
    url: '/big_data/client/profile/group/getUserPropsTreeByRootId',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

// 获取 基础属性-用户属性
export function listUserPropsDropdown(data) {
  return request({
    url: '/big_data/client/profile/group/listUserPropsDropdown',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 事件目录树-不同业务线的目录树
export function listEventTreeByRootId(data) {
  return request({
    url: '/big_data/client/profile/group/listEventTreeByRootId',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 行为属性下拉列表
export function listEventDropdown(data) {
  return request({
    url: '/big_data/client/profile/group/listEventDropdown',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 根据选中的行为属性获取相应的行为规则
export function listEventPropsDropdown(data) {
  return request({
    url: '/big_data/client/profile/group/listEventPropsDropdown',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 新增 用户分群
export function addUserGroup(data) {
  return request({
    url: '/big_data/client/profile/group/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 编辑 用户分群
export function editUserGroup(data) {
  return request({
    url: '/big_data/client/profile/group/edit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 用户分群列表
export function getGroupList(data) {
  return request({
    url: '/big_data/client/profile/group/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 更新 分群启用/停用状态
export function updateGroupStatus(data) {
  return request({
    url: '/big_data/client/profile/group/updateStatus',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 删除 分群
export function removeGroupById(data) {
  return request({
    url: '/big_data/client/profile/group/removeById',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 刷新 分群
export function refreshGroup(data) {
  return request({
    url: '/big_data/client/profile/group/refresh',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 分群日志
export function getGroupLogList(data) {
  return request({
    url: '/big_data/client/profile/group/log/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 编辑分群数据
export function getEditById(data) {
  return request({
    url: `/big_data/client/profile/group/getEditById/${data.id}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 导出 分群下载数据
export function exportByGroupId(data) {
  return request({
    url: `/big_data/client/profile/userId/exportByGroupId/${data.id}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 新增 人群分类
export function addClassifyDir(data) {
  return request({
    url: '/big_data/client/profile/group/classify/addDir',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 排序 人群分类
export function dragClassifyDir(data) {
  return request({
    url: '/big_data/client/profile/group/classify/dragDir',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 删除 人群分类
export function delClassifyDir(data) {
  return request({
    url: `/big_data/client/profile/group/classify/delDir/${data.id}/${data.userId}`,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 编辑 人群分类
export function editClassifyDir(data) {
  return request({
    url: '/big_data/client/profile/group/classify/editDir',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 用户属性-字典-下拉筛选
export function listDictOfUserProps(data) {
  return request({
    url: '/big_data/client/profile/group/listDictOfUserProps',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 事件属性-字典-下拉筛选
export function listDictOfEventProps(data) {
  return request({
    url: '/big_data/client/profile/group/listDictOfEventProps',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 所有用户分群列表
export function listGroupDropDown(data) {
  return request({
    url: '/big_data/client/profile/group/listGroupDropDown',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 全部业务线-用户属性树
export function listAllUserPropDropdownWithBiz(data) {
  return request({
    url: '/big_data/client/profile/group/listAllUserPropDropdownWithBiz',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取 全部业务线-事件树
export function listAllEventDropdownWithBiz(data) {
  return request({
    url: '/big_data/client/profile/group/listAllEventDropdownWithBiz',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// * - * - * - * - * - * - * - * 营销push - * - * - * - * - * - * - * - * - * - * - *

// 获取 营销push字典列表
export function getPushDinc() {
  return request({
    url: '/ums_meixiu/api/sms/api/push/selectDinc',
    method: 'get'
  })
}

// 获取 营销push分类
export function listCategory(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/list/category',
    method: 'get',
    params
  })
}

// 获取 营销push计划列表
export function getListPlan(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/plan/list',
    method: 'get',
    params
  })
}

// 停止 营销push计划
export function stopPlan(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/stop/plan',
    method: 'post',
    params
  })
}

// 启用 营销push计划
export function enablePlan(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/enable/plan',
    method: 'post',
    params
  })
}

// 增加 营销push分类
export function addCategory(data) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/add/category',
    method: 'post',
    data
  })
}

// 删除 营销push分类
export function deleteCategory(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/delete/category',
    method: 'post',
    params
  })
}

// 重命名 营销push分类
export function renameCategory(data) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/rename/category',
    method: 'post',
    data
  })
}

// 添加 营销push计划
export function addPlan(data) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/add/plan',
    method: 'post',
    data
  })
}

// 获取 push模板
export function selectPushMessageTemplateList(data) {
  return request({
    url: '/ums_meixiu/api/sms/api/v2/push/selectMessageTemplateByType',
    method: 'get',
    data
  })
}

// 获取 营销计划数据详情
export function getMarketingPlanDetail(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/plan/data',
    method: 'get',
    params
  })
}

// 获取 营销计划配置
export function getMarketingPlanConfig(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/plan/config',
    method: 'get',
    params
  })
}

// 获取 营销计划日志
export function getMarketingPlanLog(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/plan/log',
    method: 'get',
    params
  })
}

// 服务端（侯钧瀚） 新增分群列表接口
export function getAllGroups(params) {
  return request({
    url: '/ums_meixiu/api/im/g/v2/h5/usergroup/getAllGroups',
    method: 'post',
    params
  })
}

// 用户路径 - push触发型
export function addUserPath(data) {
  return request({
    url: '/big_data/client/profile/paths/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 复用push / 查询push详情
export function findMarketPushDetailById(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/plan/findMarketPushDetailById',
    method: 'get',
    params
  })
}

// 覆盖
export function coverTemplate(data) {
  return request({
    url: '/ums_meixiu/api/sms/api/push/market/coverTemplate',
    method: 'post',
    data
  })
}

// * - * - * - * - * - * - * - * 营销外呼 - * - * - * - * - * - * - * - * - * - * - *

// 获取 营销外呼字典
export function getMarketingCallDict(params) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/dict',
    method: 'get',
    params
  })
}

// 营销外呼任务保存
export function saveMarketingCall(data) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/save',
    method: 'post',
    data
  })
}

// 获取 营销外呼任务列表
export function getMarketingCallList(data) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/list',
    method: 'post',
    data
  })
}

// 获取 营销外呼任务明细
export function getMarketingCallDetail(params) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/detail',
    method: 'get',
    params
  })
}

// 停用操作
export function stopMarketingCall(params) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/stop',
    method: 'post',
    params
  })
}

// 启用操作
export function startMarketingCall(params) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/start',
    method: 'post',
    params
  })
}

// 刷新操作
export function refreshMarketingCall(params) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/refresh',
    method: 'post',
    params
  })
}

// 选择短信场景列表
export function selectSmsScenarioConfigurationList(params) {
  return request({
    url: '/ums_meixiu/api/sms/api/web/message/platform/sms/scenario/configuration/list',
    method: 'get',
    params
  })
}

// 获取 任务列表
export function getJobs(params) {
  const { jobId, ...rest } = params
  if (jobId === 3) {
    return request({
      url: '/ums_meixiu/api/out/docking/outbound/nine/four/intelligent/taskList',
      method: 'post',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else {
    return request({
      url: '/ums_meixiu/api/out/m/task/manage/getJobs',
      method: 'get',
      params: { ...rest }
    })
  }
}

// 获取 任务数据统计
export function getMarketingCallStats(data) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/stats',
    method: 'post',
    data
  })
}

// 获取 任务操作日志
export function getMarketingCallLog(params) {
  return request({
    url: '/ums_meixiu/api/out/m/task/manage/log',
    method: 'get',
    params
  })
}

// * - * - * - * - * - * - * - * IVR - * - * - * - * - * - * - * - * - * - * - *

// 	Ivr外呼字典数据
export function ivrDict(params) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/dict',
    method: 'get',
    params
  })
}

// 	任务列表
export function ivrGetJobs(params) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/getJobs',
    method: 'get',
    params
  })
}

// ivr任务保存
export function ivrSave(data) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/save',
    method: 'post',
    data
  })
}

// ivr外呼任务列表
export function ivrList(data) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/list',
    method: 'post',
    data
  })
}

// ivr外呼任务明细
export function ivrDetail(params) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/detail',
    method: 'get',
    params
  })
}

// ivr停用操作
export function ivrStop(params) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/stop',
    method: 'post',
    params
  })
}

// ivr启用操作
export function ivrStart(params) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/start',
    method: 'post',
    params
  })
}

// ivr刷新操作
export function ivrRefresh(params) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/refresh',
    method: 'post',
    params
  })
}

// ivr任务统计数据
export function ivrStats(data) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/stats',
    method: 'post',
    data
  })
}

// 	ivr任务操作日志
export function ivrLog(params) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/log',
    method: 'get',
    params
  })
}

// 	ivr任务执行入口, 定时任务触发
export function ivrRunTask(data) {
  return request({
    url: '/ums_meixiu/api/out/m/ivr/run/task',
    method: 'post',
    data
  })
}
