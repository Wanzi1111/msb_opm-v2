import moment from 'moment'
let pickerMinDate = ''
export default [
  {
    prop: 'classTime',
    label: '上课时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [
      moment()
        .subtract(1, 'month')
        .format('YYYY-MM-DD HH:mm:ss'),
      moment().format('YYYY-MM-DD HH:mm:ss')
    ],
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      clearable: false,
      pickerOptions: {
        // pickerMinDate: '',
        onPick: ({ maxDate, minDate }) => {
          pickerMinDate = minDate.getTime()
          if (maxDate) {
            pickerMinDate = ''
          }
        },
        disabledDate: time => {
          if (pickerMinDate !== '') {
            const day30 = (30 - 1) * 24 * 3600 * 1000
            let maxTime = pickerMinDate + day30
            const minTime = pickerMinDate - day30
            if (maxTime > new Date()) {
              maxTime = new Date()
            }
            return time.getTime() > maxTime || time.getTime() < minTime
          }
          return (
            time.getTime() > moment(`${moment().format('YYYY-MM-DD')} 23:59:59`)
          )
        }
      }
    },
    actions: {}
  },
  {
    prop: 'lessonType',
    label: '课程类型',
    type: 'select', // 选择器,
    attr: {
      placeholder: '正式课'
    },
    defaultVal: 7,
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '试听课',
        value: 6
      },
      {
        label: '正式课',
        value: 7
      }
    ]
  },
  {
    prop: 'stcommentStar',
    label: '评价分数',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '5星',
        value: 5
      },
      {
        label: '4星',
        value: 4
      },
      {
        label: '3星',
        value: 3
      },
      {
        label: '2星',
        value: 2
      },
      {
        label: '1星',
        value: 1
      }
    ]
  },
  // TODO hah
  {
    prop: 'stcommentStarDesc',
    label: '评价内容',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部'
    },
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 0
      }
    ]
  },
  {
    prop: 'uid',
    label: '用户ID',
    type: 'inputNumber', // 选择器,
    attr: {
      placeholder: '请输入用户ID',
      min: -2147483648,
      max: 2147483648,
      controlsPosition: 'right',
      class: 'input-number-left'
    }
  },

  {
    prop: 'tid',
    label: '老师ID',
    type: 'inputNumber', // 选择器,
    attr: {
      placeholder: '请输入老师ID',
      min: -2147483648,
      max: 2147483648,
      controlsPosition: 'right',
      class: 'input-number-left'
    }
  },
  {
    prop: 'del',
    label: '是否有效',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部'
    },
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '是',
        value: 0
      },
      {
        label: '否',
        value: 1
      }
    ]
  }
]
