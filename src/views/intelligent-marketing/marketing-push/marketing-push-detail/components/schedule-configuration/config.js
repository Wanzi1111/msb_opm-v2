export const plan_message = [
  {
    label: '业务线',
    value: '',
    key: 'businessType'
  },
  {
    label: '分类',
    value: '',
    key: 'oneType'
  },

  {
    label: '触发方式',
    value: '',
    key: 'triggerType'
  },
  {
    label: '触发时间',
    value: '',
    slot: true,
    name: 'startDate',
    key: 'startDate'
  },
  {
    label: '受众用户',
    value: '',
    key: 'groupId',
    slot: true,
    name: 'groupId'
  },
  {
    label: '触发时机',
    value: '',
    key: 'planEvents'
  }
]

export const push_message = [
  {
    label: '推送应用',
    value: '',
    key: 'applyId'
  },
  {
    label: '模板ID',
    value: '',
    key: 'templateId'
  },
  {
    label: '消息标题',
    value: '',
    key: 'templateTitle'
  },
  {
    label: '离线时长',
    value: '',
    key: 'offLineTime'
  },
  {
    label: '推送设备',
    value: '',
    key: 'deviceTypes'
  },
  {
    label: '供应商',
    value: '',
    key: 'supplierId'
  },
  {
    label: '静默时间',
    value: '',
    key: 'silentStartTime',
    span: 2
  },
  {
    label: '消息内容',
    value: '',
    key: 'messageContent',
    span: 2
  },
  {
    label: '点击消息打开',
    slot: true,
    name: 'openUrl',
    value: '',
    key: 'openUrl',
    span: 2
  },
  {
    label: '消息提醒类型',
    value: '',
    key: 'remindType',
    slot: true,
    name: 'remindType',
    span: 2
  }
]

export const rootListBusinessTypeMap = {
  101: '1',
  109: '2',
  113: '100'
}
