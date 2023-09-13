/*
 * @Descripttion: search
 * @version: 1.0.0
 * @Author: zhangjianwen
 * @Date: 2020-12-04 15:14:45
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-12-04 15:26:05
 */
export default [
  {
    prop: 'clientType',
    label: '问卷来源',
    type: 'select', // 选择器,
    options: [],
    attr: {
      placeholder: '全部来源'
    }
  },
  {
    prop: 'time',
    label: '创建日期',
    type: 'dateTimePicker', // 日期时间选择器,
    options: [],
    layer: 'large',
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  }
]
