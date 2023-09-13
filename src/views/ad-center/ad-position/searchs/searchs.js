export default [
  {
    prop: 'id',
    label: '广告位ID',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'advertType',
    label: '广告分类',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: []
  },
  {
    prop: 'advertName',
    label: '广告位名称',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'newAdvertSize',
    label: '广告尺寸',
    type: 'select',
    options: [],
    attr: {
      placeholder: '请选择'
    }
  }
  // {
  //   prop: 'enabled',
  //   label: '启用状态',
  //   type: 'select',
  //   defaultVal: '0',
  //   attr: {
  //     clearable: true,
  //     placeholder: '全部'
  //   },
  //   options: [{ label: '启用中', value: '0' }, { label: '已关闭', value: '1' }]
  // }
]
