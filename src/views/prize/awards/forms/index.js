import moment from 'moment'
import { PRIZE_TYPE_ENUM, EXPRESS_STATUS_ENUM } from '../schema'

/**
 * @author: Liwei
 * @description: 表单配置
 * @date: 2020/1/4
 */
let pickerMinDate = ''
export default [
  {
    prop: 'time', // beginTime endTime
    label: '时间范围',
    rules: [
      { required: true, message: '时间范围不能为空' }
    ],
    type: 'datePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      style: {
        width: '300px'
      },
      editable: false,
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      valueFormat: 'yyyy-MM-dd',
      pickerOptions: {
        // pickerMinDate: '',
        onPick: ({ maxDate, minDate }) => {
          pickerMinDate = minDate.getTime()
          if (maxDate) {
            pickerMinDate = ''
          }
        },
        disabledDate: (time) => {
          if (pickerMinDate !== '') {
            const day31 = 30 * 24 * 3600 * 1000
            let maxTime = pickerMinDate + day31
            const minTime = pickerMinDate - day31
            if (maxTime > new Date()) {
              maxTime = new Date()
            }
            return time.getTime() > maxTime || time.getTime() < minTime
          }
          return time.getTime() > moment(`${moment().format('YYYY-MM-DD')} 23:59:59`)
        }
      }
    }
  },
  {
    prop: 'expressStatus',
    label: '下单状态',
    type: 'select', // 选择器,
    options: EXPRESS_STATUS_ENUM,
    attr: {
      placeholder: '请选择下单状态'
    },
    rules: [
      { required: true, message: '下单状态不能为空' }
    ]
  },
  {
    prop: 'prizeType',
    label: '奖品类型',
    type: 'select',
    attr: {
      placeholder: '请选择奖品类型'
    },
    options: PRIZE_TYPE_ENUM,
    rules: [
      { required: true, message: '奖品类型不能为空' }
    ]
  },
  {
    prop: 'expressType',
    label: '发货渠道',
    type: 'select',
    attr: {
      placeholder: '请选择发货渠道'
    },
    options: [
      { value: 1, label: '中台发货' },
      { value: 2, label: '渠道商发货' }
    ],
    rules: [
      { required: true, message: '发货渠道不能为空' }
    ]
  }
]

export const actions = ({ closeDl }) => {
  return {
    submit: {
      label: '导出'
    },
    back: {
      hide: true
    },
    quit: {
      click: () => closeDl(),
      type: 'button',
      label: '退出',
      attr: {
        icon: 'el-icon-close'
      }
    }
  }
}
