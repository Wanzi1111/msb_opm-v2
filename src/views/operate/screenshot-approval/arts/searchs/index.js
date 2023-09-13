import store from '@/store'

export default [
  {
    prop: 'userId',
    label: '学员搜索',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入uid'
    }
  },
  {
    prop: 'type',
    label: '活动类型',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部'
    },
    options: store.getters.baseData.screenshot_approval_activity_type
  },
  {
    prop: 'approvalRemark',
    label: '驳回原因',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入驳回原因'
    }
  },
  {
    prop: 'task_time',
    label: '上传时间',
    type: 'dateTimePicker', // 日期时间选择器,
    attr: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59']
    },
    actions: {}
  }
]
