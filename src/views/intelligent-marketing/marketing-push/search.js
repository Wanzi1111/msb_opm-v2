import $store from '@/store'

const { getters: { baseData: { marketing_push_status, marketing_intrigger_type_list }}} = $store

export default [
  {
    prop: 'oneTypeId',
    label: '人群分类',
    type: 'cascader',
    layer: 'middle',
    attr: {
      placeholder: '全部',
      clearable: true
      // props: {
      //   emitPath: false
      // }
    }
  },
  {
    prop: 'operatioinUserName',
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
    label: '计划查询',
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
          label: '计划名称',
          value: 'planName'
        },
        {
          label: '计划ID',
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
  },
  {
    prop: 'createTime',
    label: '创建日期',
    type: 'datePicker',
    layer: 'middle',
    attr: {
      placeholder: '全部',
      clearable: true,
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  },
  {
    prop: 'status',
    label: '触发状态',
    type: 'select',
    layer: 'middle',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [...marketing_push_status]
  },
  {
    prop: 'triggerType',
    label: '触发条件',
    type: 'select',
    layer: 'middle',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [...marketing_intrigger_type_list]
  }
  // {
  //   prop: 'status',
  //   label: '启用状态',
  //   layer: 'middle',
  //   type: 'checkbox', // 选择器,
  //   defaultVal: ['1'],
  //   options: [
  //     { label: '不查看停用', value: '1' }
  //   ]
  // }
]
