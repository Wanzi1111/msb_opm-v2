/*
 * @Descripttion:
 * @version:
 * @Author: gaoleifang
 * @Date: 2020-08-26 15:31:45
 * @LastEditors: gaoleifang
 * @LastEditTime: 2020-09-24 15:37:10
 */
/**
 * @author: liwei
 * @description:
 * @date: 2020/5/7
 */

export default [
  {
    prop: 'uid',
    label: 'uid',
    type: 'input',
    attr: {
      placeholder: '请输入视频编号/作者（昵称，ID）'
    }
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
    prop: 'subject',
    label: '视频科目',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    }
  }
]

