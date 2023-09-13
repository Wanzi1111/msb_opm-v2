const valiPass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('该字段不能为空！'))
  } else if (value && /[^\a-\z\A-\Z0-9]/g.test(value)) {
    callback(new Error('仅支持数字、英文字母'))
  } else {
    callback()
  }
}
export default [
  {
    prop: 'liveName',
    label: '直播名称',
    type: 'input',
    rules: [
      { required: true, message: '请填写直播名称' },
      { max: 20, message: '20个字以内' }
    ]
  },
  {
    prop: 'liveIntroduce',
    label: '直播简介',
    type: 'textarea',
    attr: {
      placeholder: '请输入直播简介',
      maxlength: 40,
      showWordLimit: true
    }
  },
  {
    prop: 'liveActivityId',
    label: '直播活动ID',
    type: 'input',
    attr: {
      placeholder: '请输入直播活动ID'
    },
    rules: [
      { required: true, validator: valiPass, trigger: 'blur' }
    ]
  },
  {
    prop: 'channelId',
    label: '渠道ID',
    type: 'input',
    attr: {
      placeholder: '请输入渠道ID',
      maxlength: 40
    },
    rules: [
      { required: true, validator: valiPass, trigger: 'blur' }
    ]
  },
  {
    prop: 'openTime',
    label: '开始时间',
    type: 'dateTimePicker', // 日期选择器,
    attr: {
      type: 'datetime',
      placeholder: '请选择投放开始时间',
      valueFormat: 'timestamp'
    },
    rules: [
      { required: true, message: '开始时间不能为空' }
    ]
  },
  {
    prop: 'closeTime',
    label: '结束时间',
    type: 'dateTimePicker', // 日期选择器,
    attr: {
      type: 'datetime',
      // defaultTime: '23:59:59',
      placeholder: '请选择投放结束时间',
      valueFormat: 'timestamp'
    },
    rules: [
      { required: true, message: '结束时间不能为空' }
    ]
  },
  {
    prop: 'prepareRemind',
    label: '预约开播',
    type: 'switch'
  },
  {
    prop: 'remindTime',
    label: '预约时间',
    type: 'dateTimePicker', // 日期选择器,
    attr: {
      type: 'datetime',
      // defaultTime: '23:59:59',
      placeholder: '请选择预约开播时间',
      valueFormat: 'timestamp'
    },
    rules: [
      { required: true, message: '预约开播时间不能为空' }
    ]
  },
  {
    prop: 'appCoverUrl',
    label: 'APP首页封面',
    type: 'upload-media', // 上传,
    mediaRules: {
      width: 500,
      height: 696,
      time: 60,
      size: 2,
      media: 'img',
      type: 'GIF,PNG,JPG'
    },
    rules: [
      { required: true, message: '请添封面' }
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '支持JPG、PNG、GIF图片格式，尺寸：500*696像素，质量大小：2M以内'
    }
  },
  {
    prop: 'id',
    label: '商品信息',
    type: 'select',
    attr: { placeholder: '请选择商品信息' },
    options: [],
    rules: [
      // { required: true, message: '请填写商品名称' },
      { max: 10, message: '长度在10个字符内', trigger: 'blur' }
    ]
  },
  {
    prop: 'name',
    label: '商品名称',
    type: 'input',
    attr: { placeholder: '请填写商品名称' },
    rules: [
      // { required: true, message: '请填写商品名称' },
      { max: 20, message: '长度在20个字符内', trigger: 'blur' }
    ]
  },
  {
    prop: 'goodsIntroduction',
    label: '商品简介',
    type: 'textarea',
    attr: {
      placeholder: '请输入商品简介',
      maxlength: 20,
      showWordLimit: true
    },
    rules: [
      // { required: true, message: '请填写商品简介' }
    ]
  },
  {
    prop: 'original',
    label: '原价',
    type: 'input', // 选择器,
    attr: {
      placeholder: '请输入商品原价'
    }
  },
  {
    prop: 'price',
    label: '现价',
    type: 'input', // 选择器,
    attr: {
      placeholder: '请输入商品现价'
    },
    rules: [
      // { required: true, message: '请输入商品现价' }
    ]
  },
  {
    prop: 'goodsUrl',
    label: '商品图片',
    type: 'upload-media', // 上传,
    mediaRules: {
      width: 300,
      height: 300,
      time: 60,
      size: 2,
      media: 'img',
      type: 'GIF,PNG,JPG'
    },
    rules: [
      // { required: true, message: '请添商品图片' }
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '支持JPG、PNG、GIF图片格式，尺寸：300*300像素，质量大小：2M以内'
    }
  },
  {
    prop: 'pushTerminal',
    label: '推送终端',
    type: 'radio', // 多选框checkbox 单选radio 业务原因，前期单选，后期改成多选
    visible: true,
    options: [
      {
        value: 0, label: 'APP内'
      }
      // {
      //   value: 1, label: '微信小程序'
      // }
    ],
    defaultVal: 0,
    rules: [
      { required: true, message: '推送终端不能为空' }
    ]
  },
  {
    prop: 'slotButton',
    slot: 'slotButton'
  },
  {
    prop: 'appUserType',
    label: '用户类型',
    type: 'checkbox',
    options: [
      { label: '全量用户', value: 'allUser' },
      { label: '游客', value: 'visitor' },
      { label: '已注册未购课', value: 'registerNotBuy' },
      { label: '已购课用户', value: 'vipUser' }
    ],
    rules: [
      { required: true, message: '用户类型不能为空' }
    ]
  }
]
export const actions = (params) => {
  return {
    submit: {
      label: '提交',
      attr: {
        icon: 'el-icson-upload'
      }
    },
    back: {
      label: '返回',
      params
    }
  }
}
