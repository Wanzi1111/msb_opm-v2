// import { lineList } from '@/views/operate/manage'
// console.log('lineList', lineList)
const lineList = [{ value: '1', label: '美术宝1对1' }, { value: '2', label: '小熊艺术' }]

export default [
  {
    prop: 'del',
    label: '状态',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部'
    },
    options: [
      { label: '正常', value: 0 },
      { label: '停用', value: 1 }
    ]
  }
]

export const lessonManageSearchs = [
  {
    prop: 'line',
    label: '业务线',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择',
      disabled: true
    },
    options: lineList
  },
  {
    prop: 'activityId',
    label: '活动名称',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择'
    },
    options: []
  },
  {
    prop: 'del',
    label: '状态',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部'
    },
    options: [
      { label: '正常', value: 0 },
      { label: '停用', value: 1 }
    ]
  }
]
