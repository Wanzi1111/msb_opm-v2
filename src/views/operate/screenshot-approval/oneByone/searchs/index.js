import store from '@/store'
import moment from 'moment'
const defaultStart = moment(`${moment().add('month', 0).format('YYYY-MM') + '-01'} 23:59:59`)
const defaultEnd = moment(`${moment(defaultStart).add('month', 1).add('days', -1).format('YYYY-MM-DD')} 23:59:59`)

export default [
  {
    prop: 'uid',
    label: '学员搜索',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入uid'
    }
  },
  // {
  //   prop: 'activityType',
  //   label: '活动类型',
  //   type: 'select', // 选择器,
  //   attr: {
  //     placeholder: '全部'
  //   },
  //   options: store.getters.codeScreenshot.activityType
  // },
  {
    prop: 'turndownMsgType',
    label: '驳回原因',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: store.getters.codeScreenshot.turndownMsgType
  },
  {
    prop: 'task_time',
    label: '上传时间',
    type: 'dateTimePicker', // 日期时间选择器,
    defaultVal: [defaultStart.format('YYYY-MM-DD HH:mm:ss'), defaultEnd.format('YYYY-MM-DD HH:mm:ss')],
    attr: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    },
    actions: {}
  },
  {
    prop: 'activityRewardType',
    label: '活动奖励',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: store.getters.codeScreenshot.activityRewardType
  },
  {
    prop: 'userType',
    label: '业务线',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请输入'
    },
    defaultVal: -1,
    options: [
      {
        label: '全部',
        value: -1
      },
      {
        label: '小班课',
        value: 0
      },
      {
        label: '1对1',
        value: 1
      }
    ]
  }
]
