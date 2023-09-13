export default [
  {
    prop: 'author',
    label: '关键词',
    type: 'input',
    attr: {
      placeholder: '请输入视频编号/作者（昵称，ID）'
    }
  },
  {
    prop: 'status',
    label: '视频状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      {
        label: '已上线', value: 2
      },
      // {
      //   label: '已下线', value: 3
      // },
      {
        label: '待审核', value: 1
      },
      {
        label: '已驳回', value: 0
      }
    ]
  },
  {
    prop: 'videoTime',
    label: '选择时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'isRecommend',
    label: '首页展示',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      {
        label: '已推荐', value: 1
      },
      {
        label: '未推荐', value: 0
      }
    ]
  },
  {
    prop: 'videoLength',
    label: '视频时长',
    type: 'slider',
    // layer: 'large',
    attr: {
      range: true,
      'show-stops': true,
      step: 1,
      max: 125,
      marks: {
        0: '0(s)',
        25: '25(s)',
        50: '50(s)',
        75: '75(s)',
        100: '100(s)',
        125: '125(s)'
      }
    }
  }
]

