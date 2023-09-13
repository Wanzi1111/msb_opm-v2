// const { baseData: { review_activity_names }} = window

export default [
  {
    prop: 'mobile',
    label: '用户手机号',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入手机号'
    }
  },
  {
    prop: 'spreadUserMobile',
    label: '推广大使手机号',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入推广大使手机号'
    }
  },
  {
    prop: 'buyTime',
    label: '支付时间',
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
    prop: 'spreadUserId',
    label: '推广大使id',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入推广大使id'
    }
  },
  {
    prop: 'subject',
    label: '科目',
    type: 'select', // 选择器,
    options: [],
    defaultVal: '',
    attr: {
      clearable: true,
      placeholder: '请选择科目'
    }
  },
  {
    prop: 'orderFilterStatus',
    label: '订单状态',
    type: 'select', // 选择器,
    options: [],
    defaultVal: '',
    attr: {
      clearable: true,
      placeholder: '请选择订单状态'
    }
  },
  {
    prop: 'pid',
    label: '上级推广大使id',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入推广大使id'
      // type: 'number'
    }
  }
]
