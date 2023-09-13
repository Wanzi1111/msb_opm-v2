/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-18 14:16:24
 * @LastEditTime: 2022-05-05 14:42:54
 * @LastEditors: ZhangYeLei
 */
export default [
  {
    prop: 'groupTreeId',
    label: '人群分类',
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
    prop: 'cname',
    label: '创建人',
    type: 'input',
    layer: 'middle',
    attr: {
      placeholder: '请输入创建人',
      clearable: true
    }
  },
  {
    prop: 'userSearch',
    label: '人群查询',
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
          label: '人群名称',
          value: 'groupName'
        },
        {
          label: '人群ID',
          value: 'groupCode'
        }
      ]
    }
  },
  {
    prop: 'userSearchSelect',
    defaultVal: 'groupName',
    hide: true,
    visible: false
  },
  {
    prop: 'createTime',
    label: '创建日期',
    type: 'dateTimePicker',
    layer: 'middle',
    attr: {
      placeholder: '全部',
      clearable: true,
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'hasStop',
    label: '分群状态',
    // layer: 'middle',
    type: 'checkbox', // 选择器,
    defaultVal: ['0'],
    options: [
      { label: '不查看停用', value: '0' }
    ]
  }
]
