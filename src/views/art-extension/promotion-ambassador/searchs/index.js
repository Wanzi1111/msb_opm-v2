export default [
  {
    prop: 'reportTimeInfo',
    label: '报名时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      clearable: true,
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'signTimeInfo',
    label: '签约时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      clearable: true,
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'mobile',
    label: '手机号',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入手机号'
    }
  },
  {
    prop: 'spreadUserId',
    label: '推广大使id',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入推广大使id',
      type: 'number'
    }
  },
  {
    prop: 'weixinNum',
    label: '微信号',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入微信号'
    }
  },
  {
    prop: 'level',
    label: '等级',
    type: 'select', // 选择器,
    options: [],
    defaultVal: '',
    attr: {
      clearable: true,
      placeholder: '请选择等级'
    }
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select', // 选择器,
    options: [],
    defaultVal: '',
    attr: {
      clearable: true,
      placeholder: '请选择状态'
    }
  },
  {
    prop: 'pid',
    label: '上级推广大使id',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入上级推广大使id'
      // type: 'number'
    }
  },
  {
    prop: 'addWechat',
    label: '是否已加v',
    type: 'select', // 选择器,
    options: [
      {
        label: '已加v',
        value: 1
      },
      {
        label: '未加v',
        value: 0
      }
    ],
    defaultVal: '',
    attr: {
      clearable: true,
      placeholder: '请选择是否已加微信'
    }
  }
]
