/*
 * @Author: shasen
 * @Date: 2020-01-06 19:12:36
 * @Last Modified by: shasen
 * @Last Modified time: 2020-02-06 12:39:09
 */
import moment from 'moment'

let pickerMinDate = ''
export default [
  {
    prop: 'classTime',
    label: '选择时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [
      moment()
        .subtract(7, 'days')
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
  }
]
