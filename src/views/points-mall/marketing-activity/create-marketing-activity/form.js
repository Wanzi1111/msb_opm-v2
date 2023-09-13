import allEnum from '@/utils/enum'

export default [
  {
    prop: 'activityTitle',
    label: '活动标题',
    type: 'input', // 选择器,
    attr: {
      clearable: true,
      placeholder: '请输入活动标题',
      maxLength: 20
    },
    rules: [
      { required: true, message: '请输入活动标题，最多不超过20个汉字！' }
    ]
  },
  {
    prop: 'time',
    label: '活动时间',
    type: 'dateTimePicker', // 日期时间选择器,
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59']
      // valueFormat: 'yyyy-MM-dd HH:mm:ss'
    },
    rules: [
      { required: true, message: '请选择活动时间！' }
    ]
  },
  {
    prop: 'activityTag',
    label: '活动标签',
    type: 'select',
    defaultVal: '限时秒杀',
    options: [
      { label: '限时秒杀', value: '限时秒杀' }
    ],
    rules: [
      { required: true, message: '请选择活动标签！' }
    ]
  },
  {
    prop: 'userLimit',
    label: '活动每人限购',
    defaultVal: 1,
    type: 'inputNumber',
    attr: {
      min: 1
    },
    rules: [
      { required: true, message: '请输入活动每人限购！' }
    ]
  },
  {
    prop: 'line',
    label: '支持业务线',
    type: 'checkbox',
    rules: [
      { required: true, message: '请选择业务线！' }
    ],
    options: [...allEnum.marketing_activity_line],
    note: true,
    noteConfig: {
      type: 'text',
      text: '若勾选多条业务线则以下商品价格在两条业务线同步兑换'
    }
  },
  {
    slot: 'goodConfig'
  }
]

export const formActions = () => {
  return {
    submit: {
      hide: false // 是否显示 默认false
    },
    reset: {
      hide: true
    },
    back: {
      hide: false
    }
    // cancel: {
    //   click: () => cancel(),
    //   type: 'button',
    //   label: '取消'
    // }
  }
}
