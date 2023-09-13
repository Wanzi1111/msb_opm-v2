export default [
  {
    prop: 'userSearch',
    label: '任务查询',
    type: 'inputSelect',
    layer: 'middle',
    attr: {
      placeholder: '请输入任务',
      clearable: true
    },
    inputSelectProp: {
      prop: 'userSearchSelect',
      options: [
        {
          label: '任务名称',
          value: 'taskName'
        },
        {
          label: '任务ID',
          value: 'taskId'
        }
      ]
    }
  },
  {
    prop: 'userSearchSelect',
    defaultVal: 'taskName',
    hide: true,
    visible: false
  },
  {
    prop: 'taskStatus',
    label: '任务状态',
    layer: 'middle',
    type: 'select',
    attr: {
      placeholder: '请输入任务状态',
      clearable: true
    }
  }
  // {
  //   prop: 'status',
  //   label: '启用状态',
  //   layer: 'middle',
  //   type: 'checkbox', // 选择器,
  //   defaultVal: ['1'],
  //   options: [
  //     { label: '不查看暂停', value: '1' }
  //   ]
  // }
]
