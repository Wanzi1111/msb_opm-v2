/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-18 14:35:54
 * @LastEditTime: 2022-04-28 14:32:12
 * @LastEditors: ZhangYeLei
 */

const opTypeMap = {
  'RULES_EDIT': '编辑规则',
  'STATUS_CHANGE': '变更状态变更状态',
  'GROUP_CREATE': '新建分群'
}

export default [
  {
    prop: 'createTime',
    label: '日期',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'cname',
    label: '变更人',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'opType',
    label: '变更类型',
    align: 'center',
    minWidth: 120,
    render: (_, data) => opTypeMap[data]
  },
  {
    prop: 'opContent',
    label: '具体内容',
    align: 'center',
    minWidth: 240,
    showOverflowTooltip: true
  }
]
