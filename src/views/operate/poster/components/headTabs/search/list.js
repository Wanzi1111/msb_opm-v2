import { areas } from '../../../enum'
import moment from 'moment'

const arr = [...areas]
arr.unshift({ value: -1, label: '全部' })

export const defaultSearchVal = {
  valueTime: [moment(moment().add(-7, 'days').startOf('day')).format('YYYY-MM-DD HH:mm:ss'), moment(moment().endOf('day')).format('YYYY-MM-DD HH:mm:ss')],
  del: 0
}

export default [
  {
    prop: 'valueTime',
    label: '选择时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    // defaultVal: defaultSearchVal.valueTime,
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'del',
    label: '海报状态',
    type: 'select',
    attr: {
      clearable: true
    },
    // defaultVal: defaultSearchVal.del,
    options: [
      {
        label: '启用', value: 0
      },
      {
        label: '停用', value: 1
      },
      {
        label: '全部', value: -1
      }
    ]
  },
  {
    prop: 'poster_id',
    label: '海报位置',
    type: 'select',
    attr: {
      clearable: true,
      filterable: true
    }
  },
  {
    prop: 'area',
    label: '用户区域',
    type: 'select',
    options: arr,
    attr: {
      clearable: true,
      filterable: true
    }
  }
]
