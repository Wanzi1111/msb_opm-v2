const { baseData: { review_activity_names }} = window

export default [
  {
    prop: 'uploadTime',
    label: '上传时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59']
    }
  },
  {
    prop: 'auditTime',
    label: '审核时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59']
    }
  },
  {
    prop: 'type',
    label: '活动名称',
    type: 'select', // 选择器,
    options: review_activity_names,
    defaultVal: '5',
    attr: {
      placeholder: '请选择活动名称'
    }
  },
  {
    prop: 'uid',
    label: '用户uid',
    type: 'input', // 选择器,
    attr: {
      placeholder: '请输入用户UID'
    }
  },
  {
    prop: 'name',
    label: '用户昵称',
    type: 'input', // 选择器,
    attr: {
      placeholder: '请输入用户昵称'
    }
  }
]
