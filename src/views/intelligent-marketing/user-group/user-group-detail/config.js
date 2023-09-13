/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-11 17:18:40
 * @LastEditTime: 2022-05-27 11:38:54
 * @LastEditors: ZhangYeLei
 */

export const behavior_times_list = [
  {
    label: '总次数',
    value: 'totals'
  }
]

export const behavior_time_list = [
  {
    label: '最近7天',
    value: 'LATEST_7'
  },
  {
    label: '最近15天',
    value: 'LATEST_15'
  },
  {
    label: '最近30天',
    value: 'LATEST_30'
  },
  {
    label: '最近90天',
    value: 'LATEST_90'
  },
  {
    label: '最近180天',
    value: 'LATEST_180'
  },
  {
    label: '最近1年',
    value: 'LATEST_YEAR_1'
  },
  {
    label: '本周内',
    value: 'IN_WEEK'
  },
  {
    label: '本月内',
    value: 'IN_MONTH'
  },
  {
    label: '上半月',
    value: 'FIRST_HALF_MONTH'
  },
  {
    label: '下半月',
    value: 'SECOND_HALF_MONTH'
  },
  {
    label: '具体时间段',
    value: 'RANGE'
  }
]

export const behavior_times_rules = [
  {
    label: '=',
    value: 'EVENT_COUNT_EQUAL'
  },
  {
    label: '≥',
    value: 'EVENT_COUNT_GTE'
  },
  {
    label: '≤',
    value: 'EVENT_COUNT_LTE'
  },
  {
    label: '≠',
    value: 'EVENT_COUNT_NE'
  },
  {
    label: '>',
    value: 'EVENT_COUNT_GT'
  },
  {
    label: '<',
    value: 'EVENT_COUNT_LT'
  }
  // {
  //   label: '区间',
  //   value: 'EVENT_COUNT_RANGE'
  // }
]

export const behavior_attr_rules = [
  {
    label: '做过',
    value: 'do'
  },
  {
    label: '未做过',
    value: 'undo'
  }
]

export const formRules = {
  groupName: { required: true, message: '请输入分群名称！' },
  bizId: { required: true, message: '请选择产品线！' },
  groupTreeId: { required: true, message: '请选择分类！' },
  refreshWay: { required: true, message: '请选择刷新机制！' }
}

// 每条基础用户属性的初始值
export const init_basics_form = {
  id: '', // 所选的属性值
  dataType: '', // 数据类型： DATETIME | LIST | BOOL | SGTRING | NUMBER
  ops: [], // 规则下拉
  opCode: '', // 规则下拉值
  dictList: [], // 当数据类型为LIST、STRING、BOOL时，值为下拉选择，其中LIST、STRING为多选，BOOL为单选
  value: '', // 值
  value2: '' // 当为区间规则时，需要输入第二个值
}

// 每条行为属性的初始值
export const init_behavior_form = {
  behaviorAttrList: null, // 行为属性可筛选，当不筛选时用全局的behaviorAttrList，筛选后则用每条行为规则对应的behaviorAttrList
  triggerTimeType: 'LATEST_7', // 时间范围
  dateTimeRangeValue: '', // 时间范围
  actionType: 'do', // 做过 ｜ 未做过
  event: '', // 选中的行为事件
  rules: [], // 选中的行为事件所对应的子行为属性下拉列表
  eventCountop: 'totals', // 选中的总次数
  eventCountopCode: 'EVENT_COUNT_GTE', // 选中的次数规则
  eventCountopValue: 1, // 次数的值
  // behavior_times_value2: 1, // 次数的值
  props: [] // 筛选列表
}

// 每条行为属性的筛选的初始值
// 基本同 init_basics_form 类型说明
export const init_behavior_screen_form = {
  id: '', // 筛选行为属性的值
  dataType: '', // 数据类型
  ops: [], // 规则下拉
  opCode: '', // 规则下拉值
  dictList: [], // 筛选行为属性的事件的下拉
  value: '', // 值
  value2: '' // 第二个值
}
