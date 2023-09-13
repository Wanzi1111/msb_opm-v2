/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zhangjiawen
 * @Date: 2020-11-03 17:08:23
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-11-30 15:21:17
 */

import allEnum from '@/utils/enum'

export default [
  {
    prop: 'clientType',
    label: '客户端',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择客户端'
    },
    options: [],
    defaultVal: '',
    rules: [{ required: true, message: '客户端不能为空' }]
  },
  {
    prop: 'classifyId',
    label: '分类',
    type: 'select', // 选择器,
    recovery: true,
    attr: {
      placeholder: '请选择分类'
    }
  },
  {
    prop: 'time',
    label: '时间范围',
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
    prop: 'group',
    label: '运营组',
    type: 'input', // 文本,
    attr: {
      placeholder: '运营组名称或ID'
    },
    options: []
    // options: store.getters.adConfig.clientType,
  },
  {
    prop: 'position',
    label: '运营位',
    type: 'input', // 文本,
    attr: {
      placeholder: '运营位名称或ID'
    }
    // options: store.getters.adConfig.clientType,
  }, //
  {
    prop: 'userType',
    label: '用户类型',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择用户类型'
    },
    options: allEnum.user_type,
    defaultVal: ''
  },
  {
    prop: 'userState',
    label: '用户状态',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择用户状态'
    },
    defaultVal: ''
  }
]
