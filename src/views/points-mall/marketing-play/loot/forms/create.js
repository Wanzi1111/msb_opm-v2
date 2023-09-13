import store from '@/store'

export default [
  {
    prop: 'activityTitle',
    label: '活动名称',
    type: 'input',
    attr: { placeholder: '请活动名称' },
    rules: [
      { required: true, message: '请填写活动名称' },
      { max: 20, message: '长度在20个字符内', trigger: 'blur' }
    ]
  },
  {
    prop: 'goodsId',
    slot: 'good',
    label: '奖品选择',
    rules: [
      { required: true, message: '请选择奖品选择' }
    ]
  },
  {
    prop: 'goodsEpc',
    visible: true,
    colAttr: {
      style: {
        width: '600px',
        height: '25px', // 防止隐藏字段渲染一个空行
        marginLeft: '98px'
      }
    },
    rules: [
      { required: true, message: '奖品不能为空' }
    ]
  },
  {
    prop: 'activityImg',
    label: '活动图片',
    type: 'upload-media', // 上传,
    mediaRules: {
      time: 60,
      size: 1,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    rules: [
      { required: true, message: '请添加图标' }
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议686*386像素,支持GIF、PNG、JPG和JPEG格式,大小不超过1MB,不区分大小写'
    }
  },
  {
    prop: 'homePageImg',
    label: '首页展示图',
    type: 'upload-media', // 上传,
    mediaRules: {
      time: 60,
      size: 1,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    rules: [
      { required: true, message: '请添加首页展示图' }
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议686*386像素,支持GIF、PNG、JPG和JPEG格式,大小不超过1MB,不区分大小写'
    }
  },
  {
    prop: 'activityCtime',
    label: '开始时间',
    type: 'datePickerDatetime', // 日期时间选择器,
    layer: 'large',
    attr: {
      placeholder: '请选择日期'
    },
    rules: [
      { required: true, message: '请输选择时间' }
    ]
  },
  // {
  //   prop: 'totalNumber',
  //   label: '参与人数',
  //   type: 'input',
  //   attr: {
  //     placeholder: '请填写参与人数',
  //     type: 'number'
  //   },
  //   rules: [
  //     {
  //       validator: (rule, value, callback) => {
  //         if (value < 2) {
  //           callback(new Error('范围在2-200'))
  //         } else if (value > 200) {
  //           callback(new Error('范围在2-200'))
  //         } else {
  //           callback()
  //         }
  //       }, trigger: 'blur'
  //     }
  //   ]
  // },
  {
    prop: 'config',
    slot: 'configTotalNumber'
  },
  {
    prop: 'activityUserTotalNum',
    visible: true,
    colAttr: {
      style: {
        width: '600px',
        height: '25px', // 防止隐藏字段渲染一个空行
        marginLeft: '98px'
      }
    },
    defaultVal: '',
    rules: [
      {
        validator: (rule, value, callback) => {
          if (value < 2) {
            callback(new Error('范围在2-8000'))
          } else if (value > 8000) {
            callback(new Error('范围在2-8000'))
          } else {
            callback()
          }
        }, trigger: 'blur'
      }
    ]
  },
  {
    prop: 'activityModelType',
    label: '活动模式',
    type: 'radio',
    rules: [
      { required: true, message: '请选择活动模式' }
    ],
    options: store.getters.baseData.activity_model_type
  },
  {
    prop: 'config',
    slot: 'configGood'
  },
  {
    prop: 'configGoods',
    visible: true,
    colAttr: {
      style: {
        width: '600px',
        height: '25px', // 防止隐藏字段渲染一个空行
        marginLeft: '98px'
      }
    },
    defaultVal: {
      joinOneCoin: '',
      oneExchangePriceChecked: '',
      joinBearCoin: '',
      bearExchangePriceChecked: ''
    },
    rules: [
      {
        validator: (rule, value, callback) => {
          if (!value.oneExchangePriceChecked && !value.bearExchangePriceChecked) {
            callback(new Error('夺宝配置不可为空 1'))
            return
          }
          if (value.oneExchangePriceChecked && !value.joinOneCoin) {
            callback(new Error('金币数量不能为空 2'))
            return
          }
          if (value.bearExchangePriceChecked && !value.joinBearCoin) {
            callback(new Error('金币数量不能为空 3'))
            return
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  },
  {
    prop: 'lootFrequency',
    label: '夺宝场次',
    type: 'input',
    attr: {
      placeholder: '请输入数字，不可输入0',
      type: 'number'
    },
    rules: [
      {
        validator: (rule, value, callback) => {
          if (value < 1) {
            callback(new Error('不能小于1'))
          } else {
            callback()
          }
        }, trigger: 'blur'
      },
      { required: true, message: '请输入夺宝场次' }
    ]
  },
  {
    prop: 'activityDesc',
    label: '活动规则',
    type: 'tinymce', // 富文本,
    attr: {
      width: '600px',
      toolbar: [
        'code undo redo | formatselect fontselect fontsizeselect',
        'bold italic underline strikethrough | alignleft aligncenter alignright outdent indent | bullist numlist indent2em lineheight | formatpainter fullscreen',
        'blockquote hr image media'
      ],
      menubar: ''
    }
  }
]

export const actions = {
  submit: {
    label: '提交',
    attr: {
      icon: 'el-icon-check'
    }
  }
}
