export default [
  {
    prop: 'userSearch',
    label: '课程查询',
    type: 'inputSelect',
    layer: 'large',
    attr: {
      placeholder: '请输入',
      clearable: true
    },
    inputSelectProp: {
      prop: 'userSearchSelect',
      options: [
        {
          label: '课程名称',
          value: 'planName'
        },
        {
          label: '课程ID',
          value: 'planId'
        }
      ]
    }
  },
  {
    prop: 'userSearchSelect',
    defaultVal: 'planName',
    hide: true,
    visible: false
  }
]
