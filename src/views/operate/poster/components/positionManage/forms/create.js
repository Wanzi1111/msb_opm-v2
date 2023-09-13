export default [
  {
    prop: 'line',
    label: '业务线',
    type: 'select', // 输入框,
    attr: {
      placeholder: '请选择业务线'
    },
    options: [
      { label: '美术宝1对1', value: '1' },
      { label: '小熊艺术', value: '2' },
      { label: '书画院', value: '3' },
      { label: '音乐宝陪练', value: '4' }
    ],
    rules: [{ required: true, message: '请选择业务线' }]
  },
  {
    prop: 'sub_line',
    label: '用户类型',
    type: 'select', // 输入框,
    attr: {
      placeholder: '请输入概要'
    },
    options: [],
    rules: [{ required: true, message: '用户类型不能为空' }]
  },
  {
    prop: 'individualization',
    label: '个性化海报',
    type: 'radio', // 输入框,
    attr: {
      border: true,
      placeholder: '请输入概要'
    },
    options: [
      { label: '不是', value: '0' },
      { label: '是', value: '1' }
    ],
    rules: [{ required: true, message: '个性化海报不能为空' }]
  },
  {
    prop: 'position',
    label: '位置名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入排序',
      min: 1
    },
    rules: [{ required: true, message: '请输入位置名称' }]
  },
  {
    prop: 'showType',
    label: '海报展示类型',
    type: 'radio', // 输入框,
    attr: {
      border: true,
      placeholder: '请输入概要'
    },
    options: [
      { label: '轮播', value: 1 },
      { label: '单张', value: 2 }
    ],
    rules: [{ required: true, message: '海报展示类型不能为空' }]
  }
]

export const actions = ({ back }) => {
  return {
    back: {
      hide: true
    },
    uback: {
      label: '取消',
      click: back,
      type: 'button',
      attr: {
        icon: 'el-icon-back'
      }
    }
  }
}
