/*
 * @Descripttion: search
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-25 17:20:29
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-10 11:19:08
 */
// import store from '@/store'
// const options = [
//   { value: '', label: '全部' }
//   // ...store.getters.bizLine.surveyTypeList
// ]
// if (store.getters.bizLine) {
//   options.push(...store.getters.bizLine.surveyTypeList)
// }

export default [
  {
    prop: 'surveyTypeCode',
    label: '问卷类型',
    type: 'select', // 选择器,
    options: [],
    attr: {
      placeholder: '全部'
    }
  },
  {
    prop: 'surveyNo',
    label: '问卷ID',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'date',
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
  },
  {
    prop: 'surveyTitle',
    label: '问卷标题',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入关键词'
    }
  }
]
