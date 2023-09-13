export const searchs = (searc) => {
  return [
    {
      prop: 'type',
      label: '商品类型',
      type: 'select',
      attr: {
        placeholder: '全部类型'
      },
      defaultVal: '',
      options: []
    },
    {
      prop: 'categoryIds',
      type: 'cascader',
      label: '商品分类',
      attr: {
        collapseTags: true,
        props: {
          multiple: true,
          value: 'id',
          label: 'categoryName',
          children: 'childs'
        }
      },
      rules: [{ required: true, message: '必选, 不能为空', trigger: 'blur' }]
    },
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      defaultVal: 'PUTAWAY',
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '下架',
          value: 'REMOVE'
        },
        {
          label: '上架',
          value: 'PUTAWAY'
        }
      ]
    },
    // {
    //   prop: 'businessType',
    //   label: '业务类型',
    //   type: 'select', // 选择器,
    //   options: [],
    //   attr: {
    //     placeholder: '请选择业务类型'
    //   }
    // },
    {
      prop: 'epcReferName',
      label: '标题/编码',
      type: 'input',
      attr: {
        placeholder: '请输入商品标题/编码'
      }
    },
    {
      prop: 'goldCoin',
      label: '金币区间',
      slot: 'goldCoin'
    },
    {
      prop: 'startCoion',
      slot: 'startCoion'
    },
    {
      prop: 'endCoion',
      slot: 'endCoion'
    }
  ]
}
