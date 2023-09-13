import { activeType } from '../../enum'
export default [
  {
    prop: 'authRange',
    label: '业务线',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [
      {
        label: '一对一',
        value: 'ONETOONE'
      },
      {
        label: '小熊艺术',
        value: 'BEAR'
      }
    ],
    rules: [{ required: true, message: '请选择' }]
  },
  {
    prop: 'code',
    label: '活动类型',
    type: 'select',
    options: activeType,
    attr: { placeholder: '活动类型' },
    rules: [{ required: true, message: '请选择' }]
  },
  {
    prop: 'name',
    label: '活动标题',
    type: 'input',
    attr: { placeholder: '活动名称' },
    rules: [
      { required: true, message: '请填写活动名称' },
      { max: 20, message: '长度在20个字符内', trigger: 'blur' }
    ]
  },
  {
    prop: 'time',
    label: '活动时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    rules: [{ required: true, message: '请添加活动时间' }],
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'headImg',
    label: '活动图片',
    type: 'upload-media', // 上传,
    mediaRules: {
      time: 60,
      size: 5,
      media: 'img',
      type: 'PNG,JPG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '建议尺寸：750X1300最大不可超过 5M ，支持png/jpg，对应C端活动入口图'
    },
    attr: {
      multiple: true
    }
  },
  {
    prop: 'amount',
    label: '抽奖门槛',
    slot: 'amount'
  }
]

export const actions = {
  submit: {
    label: '提交',
    attr: {
      icon: 'el-icon-check'
    }
  }
}
