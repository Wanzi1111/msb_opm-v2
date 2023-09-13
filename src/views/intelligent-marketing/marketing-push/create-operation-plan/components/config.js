
export const behavior_times_list = [
  {
    label: '总次数',
    value: 'totals'
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

export const transformMap = (list) => {
  const map = {}
  list.forEach(v => {
    map[v.value] = v.label
  })
  return map
}

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

export const trigger_time_limit_type = [
  {
    label: '秒',
    value: 'SECOND'
  },
  {
    label: '分钟',
    value: 'MINUTE'
  },
  {
    label: '小时',
    value: 'HOUR'
  }
]

// 每条行为属性的初始值
export const init_behavior_form = {
  behaviorAttrList: null, // 行为属性可筛选，当不筛选时用全局的behaviorAttrList，筛选后则用每条行为规则对应的behaviorAttrList
  triggerTimeType: 'RANGE', // 时间范围 （LIMIT为自己定义的一种类型）
  triggerTimeLimitType: 'SECOND', // 时间范围-N分钟/小时内
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
