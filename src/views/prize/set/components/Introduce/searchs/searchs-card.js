/**
 * @author: huzhifu
 * @description:
 * @date: 2020/9/7
 */
export default [
  {
    prop: 'cardStatus',
    label: '下发状态',
    type: 'select', // 选择器,
    options: [
      { label: '全部', value: 0 },
      { label: '未发放', value: 1 },
      { label: '已下发', value: 2 },
      { label: '待补发', value: 3 },
      { label: '已过期', value: 4 }
    ],
    attr: {
      placeholder: '请选择下发状态'
    }
  },
  {
    prop: 'cardNo',
    label: '卡号',
    type: 'input',
    attr: {
      placeholder: '请输入卡号'
    }
  }
]

