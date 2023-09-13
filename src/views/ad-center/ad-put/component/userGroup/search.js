export default [
  {
    prop: 'groupTreeId',
    label: '分类',
    type: 'cascader',
    layer: 'middle',
    attr: {
      placeholder: '全部',
      clearable: true,
      props: {
        emitPath: false
      }
    }
  },
  {
    prop: 'userSearch',
    label: ' ',
    type: 'inputSelect',
    layer: 'middle',
    attr: {
      placeholder: '请输入内容',
      clearable: true
    },
    inputSelectProp: {
      prop: 'userSearchSelect',
      options: [
        {
          label: '分群ID',
          value: 'groupCode'
        },
        {
          label: '分群名称',
          value: 'groupName'
        }
      ],
      style: {
        width: '120px'
      }
    }
  },
  {
    prop: 'userSearchSelect',
    defaultVal: 'groupCode',
    hide: true,
    visible: false
  }
]
