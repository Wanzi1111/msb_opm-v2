import { FRAMING_ADMIN_STATUS } from '@/utils/enum'

export const defaultSearchVal = {
  type: 0,
  status: 1
}

export default [
  {
    prop: 'selectTime',
    label: '时间选择',
    type: 'datePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'daterange',
      clearable: true,
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '昨日',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本周',
          onClick(picker) {
            const day = new Date().getDay()
            const end = new Date()
            const start = new Date().addDays(1 - day)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本月',
          onClick(picker) {
            const date = new Date().getDate()
            const end = new Date()
            const start = new Date().addDays(1 - date)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  {
    prop: 'type',
    label: '裱框分类',
    type: 'select',
    options: [],
    defaultVal: defaultSearchVal.type
  },
  {
    prop: 'status',
    label: '是否上架',
    type: 'select',
    defaultVal: defaultSearchVal.status,
    options: FRAMING_ADMIN_STATUS
  }
]
