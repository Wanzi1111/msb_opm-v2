// import moment from 'moment'
// 配置试听
import { Message } from 'element-ui'
// 配置周周有礼
export const week = [
  {
    type: 'divider',
    attr: {
      title: '基本信息',
      subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
    }
  },
  {
    prop: 'name',
    label: '任务名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写任务名称',
      maxlength: 30
    },
    rules: [{ required: true, message: '任务名称不能为空' }]
  },
  {
    prop: 'task_time',
    label: '任务时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      pickerOptions: {
        // 判断选择是否为周一到周日
        firstDayOfWeek: 1,
        onPick: ({ maxDate, minDate }) => {
          console.log(minDate.getDay(), 'min')
          if (minDate.getDay() !== 1 && minDate.getDay() !== 0) {
            Message.error('请选择周一到周日这个时间段')
            return
          }
        }
      }
    },
    actions: {}
  },
  {
    type: 'divider',
    attr: {
      title: '落地页配置',
      subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
    }
  },
  {
    prop: 'headImg',
    label: '头图-1v1用户',
    type: 'upload-media',
    mediaRules: {
      width: 750, // 750
      height: 964, // 964
      size: 1,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750x964像素；图片大小不超过400KB'
    },
    attr: {
      disabled: false
    },
    rules: [{ required: true, message: '头图不能为空' }]
  },
  {
    prop: 'headImg2',
    label: '头图-小班课用户',
    type: 'upload-media',
    mediaRules: {
      width: 750, // 750
      height: 964, // 964
      size: 1,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750x964像素；图片大小不超过400KB'
    },
    attr: {
      disabled: false
    },
    rules: [{ required: true, message: '头图不能为空' }]
  },
  {
    prop: 'buttonUnreceive',
    label: '按钮图-未领取',
    type: 'upload-media',
    mediaRules: {
      width: 644,
      height: 163,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议644x163像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '按钮图不能为空' }]
  },
  {
    prop: 'buttonReceive',
    label: '按钮图-已领取',
    type: 'upload-media',
    mediaRules: {
      width: 644,
      height: 163,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议644x163像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '挽回弹窗不能为空' }]
  },
  {
    prop: 'retainPopUp',
    label: '挽回弹窗',
    type: 'upload-media',
    mediaRules: {
      width: 234,
      height: 186,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议234*186像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '挽回弹窗不能为空' }]
  },
  {
    prop: 'guideUpload',
    label: '引导上传弹窗',
    type: 'upload-media',
    mediaRules: {
      width: 670,
      height: 760,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议670*760像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '引导上传弹窗不能为空' }]
  },
  {
    prop: 'lessonActivityGuide',
    label: '赠课活动-引导周周有礼弹窗',
    type: 'upload-media',
    mediaRules: {
      width: 600,
      height: 886,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议600*886像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '赠课活动-引导周周有礼弹窗不能为空' }]
  },

  {
    prop: 'auditionGuide',
    label: '试听活动-引导周周有礼卡片',
    type: 'upload-media',
    mediaRules: {
      width: 750,
      height: 247,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750*247像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '试听活动-引导周周有礼卡片不能为空' }]
  },
  {
    prop: 'appGuide',
    label: 'APP-引导周周有礼弹窗',
    type: 'upload-media',
    mediaRules: {
      width: 580,
      height: 800,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议580*800像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: 'APP-引导周周有礼弹窗不能为空' }]
  },
  {
    prop: 'rules',
    label: '活动规则',
    type: 'textarea',
    attr: {
      autosize: { minRows: 4 },
      placeholder: '请输入活动说明',
      maxlength: 1000,
      showWordLimit: true
    },
    rules: [
      { required: true, message: '活动规则不能为空' }
    ]
  }
]
// export const listen = [
//   {
//     type: 'divider',
//     attr: {
//       title: '基本信息',
//       subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
//     }
//   },
//   {
//     prop: 'task_name',
//     label: '任务名称',
//     type: 'input', // 输入框,
//     attr: {
//       placeholder: '请填写任务名称',
//       maxlength: 20,
//       showWordLimit: true
//     },
//     rules: [{ required: true, message: '任务名称不能为空' }]
//   },
//   {
//     prop: 'task_time',
//     label: '任务时间',
//     type: 'dateTimePicker', // 日期时间选择器,
//     layer: 'large',
//     attr: {
//       type: 'datetimerange',
//       startPlaceholder: '开始时间',
//       endPlaceholder: '结束时间',
//       defaultTime: ['00:00:00', '23:59:59'],
//       valueFormat: 'yyyy-MM-dd HH:mm:ss'
//     }
//   },
//   {
//     prop: 'config_way',
//     label: '配置方式',
//     type: 'radio', // 输入框,
//     attr: {
//       border: true
//     },
//     options: [
//       { value: '0', label: '所有用户统一配置' },
//       { value: '1', label: '按赠课类型分别配置' }
//     ],
//     defaultVal: '0',
//     rules: [{ required: true, message: '配置方式不能为空' }]
//   },
//   {
//     prop: 'config_type',
//     label: ' ',
//     type: 'radioButton', // 输入框,
//     attr: {
//       border: true
//     },
//     options: [
//       { value: '0', label: '1对1付费用户' },
//       { value: '1', label: '小班课付费用户' },
//       { value: '2', label: '未付费用户' }
//     ],
//     defaultVal: '0'
//   },
//   // {
//   //   type: 'divider',
//   //   attr: {
//   //     title: '金币配置',
//   //     subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
//   //   }
//   // },
//   // {
//   //   prop: 'price_bite',
//   //   label: '是否奖励金币',
//   //   type: 'radio', // 输入框,
//   //   attr: {
//   //     border: true
//   //   },
//   //   options: [
//   //     { value: '0', label: '是' },
//   //     { value: '1', label: '否' }
//   //   ],
//   //   defaultVal: '0',
//   //   rules: [{ required: true, message: '是否奖励金币不能为空' }]
//   // },
//   // {
//   //   prop: 'price',
//   //   label: '奖励金币',
//   //   type: 'inputNum', // 输入框,
//   //   attr: {
//   //     border: true,
//   //     placeholder: '请输入奖励金币,限输入数字,不可超过5位数',
//   //     maxlength: 5
//   //   },
//   //   rules: [{ required: true, message: '是否奖励金币不能为空' }, { type: 'number', message: '不可输入非数字外其他字符' }]
//   // },
//   {
//     type: 'divider',
//     attr: {
//       title: '落地页配置',
//       subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
//     }
//   },
//   {
//     prop: 'head_picture',
//     label: '头图',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '头图不能为空' }]
//   },
//   {
//     prop: 'button_picture',
//     label: '按钮图',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '按钮图不能为空' }]
//   },
//   {
//     prop: 'back_picture',
//     label: '挽回弹窗',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '挽回弹窗不能为空' }]
//   },
//   {
//     prop: 'success_picture',
//     label: '分享成功弹窗',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '分享成功弹窗不能为空' }]
//   },
//   {
//     prop: 'activity_rule',
//     label: '落地页活动规则',
//     type: 'textarea', // 输入框,
//     attr: {
//       autosize: { minRows: 4 },
//       placeholder: '请输入落地页活动规则',
//       maxlength: 200
//     },
//     rules: [
//       { required: true, message: '落地页活动规则不能为空' }
//     ]
//   },
//   {
//     prop: 'rank_rule',
//     label: '排行榜活动规则',
//     type: 'textarea', // 输入框,
//     attr: {
//       autosize: { minRows: 4 },
//       placeholder: '请输入排行榜活动规则',
//       maxlength: 200
//     },
//     rules: [
//       { required: true, message: '排行榜活动规则不能为空' }
//     ]
//   }
// ]
// 配置赠课
// export const course = [
//   {
//     type: 'divider',
//     attr: {
//       title: '基本信息',
//       subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
//     }
//   },
//   {
//     prop: 'task_name',
//     label: '任务名称',
//     type: 'input', // 输入框,
//     attr: {
//       placeholder: '请填写任务名称',
//       maxlength: 20,
//       showWordLimit: true
//     },
//     rules: [{ required: true, message: '任务名称不能为空' }]
//   },
//   {
//     prop: 'task_time',
//     label: '任务时间',
//     type: 'dateTimePicker', // 日期时间选择器,
//     layer: 'large',
//     attr: {
//       type: 'datetimerange',
//       startPlaceholder: '开始时间',
//       endPlaceholder: '结束时间',
//       defaultTime: ['00:00:00', '23:59:59'],
//       valueFormat: 'yyyy-MM-dd HH:mm:ss'
//     }
//   },
//   {
//     prop: 'config_way',
//     label: '配置方式',
//     type: 'radio', // 输入框,
//     attr: {
//       border: true
//     },
//     options: [
//       { value: '0', label: '所有用户统一配置' },
//       { value: '1', label: '按赠课类型分别配置' }
//     ],
//     defaultVal: '0',
//     rules: [{ required: true, message: '配置方式不能为空' }]
//   },
//   {
//     prop: 'config_type',
//     label: ' ',
//     type: 'radioButton', // 输入框,
//     attr: {
//       border: true
//     },
//     options: [
//       { value: '0', label: '新生半月' },
//       { value: '1', label: '老生半月' },
//       { value: '2', label: '老生月月' },
//       { value: '3', label: '6月特享' },
//       { value: '4', label: '班课老生月月' },
//       { value: '5', label: '班课新生半月' }
//     ],
//     defaultVal: '0'
//   },
//   {
//     type: 'divider',
//     attr: {
//       title: '赠课规则',
//       subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
//     }
//   },
//   {
//     prop: 'price_course',
//     label: '奖励课时',
//     type: 'select',
//     attr: {
//       clearable: true,
//       placeholder: '请选择'
//     },
//     options: [{ label: '0.3/半月', value: '1' }, { label: '0.5/半月', value: '2' }],
//     rules: [{ required: true, message: '是否奖励金币不能为空' }]
//   },
//   {
//     type: 'divider',
//     attr: {
//       title: '落地页配置',
//       subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
//     }
//   },
//   {
//     prop: 'head_picture',
//     label: '头图',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '头图不能为空' }]
//   },
//   {
//     prop: 'button_picture_no',
//     label: '按钮图-未领取',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '按钮图不能为空' }]
//   },
//   {
//     prop: 'back_picture',
//     label: '挽回弹窗',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '挽回弹窗不能为空' }]
//   },
//   {
//     prop: 'lead_picture',
//     label: '引导上传弹窗',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '引导上传弹窗不能为空' }]
//   },
//   {
//     prop: 'week_picture',
//     label: '周周有礼-引导赠课活动弹窗',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: '周周有礼-引导赠课活动弹窗' }]
//   },
//   {
//     prop: 'app_picture',
//     label: 'APP-引导赠课活动弹窗',
//     type: 'upload-media',
//     mediaRules: {
//       width: 750,
//       height: 1334,
//       size: 0.390625,
//       media: 'img',
//       type: 'GIF,PNG,JPG,JPEG'
//     },
//     note: true,
//     noteConfig: {
//       type: 'text',
//       text: '尺寸：建议750x1334像素；图片大小不超过400KB'
//     },
//     rules: [{ required: true, message: 'APP-引导赠课活动弹窗不能为空' }]
//   },
//   {
//     prop: 'activity_rule',
//     label: '活动规则',
//     type: 'textarea', // 输入框,
//     attr: {
//       autosize: { minRows: 4 },
//       placeholder: '请输入活动规则',
//       maxlength: 200
//     },
//     rules: [
//       { required: true, message: '活动规则不能为空' }
//     ]
//   }
// ]
// 配置拼团
const noteConfig = {
  type: 'text',
  text: '只可上传单张，支持GIF、PNG、JPG和JPEN格式'
}
const noteConfig3 = {
  type: 'text',
  text: '最多可上传3张，支持GIF、PNG、JPG和JPEN格式'
}
const attr = {
  listType: 'picture-card',
  multiple: true,
  limit: 3
}
const attr_1 = {
  listType: 'picture-card',
  multiple: true,
  limit: 1
}
const message = '请上传图片'
const mediaRules = {
  size: 1,
  media: 'img',
  type: 'GIF,PNG,JPG,JPEG'
}
export const group = [
  {
    type: 'divider',
    attr: {
      title: '基本信息',
      subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
    }
  },
  {
    prop: 'title',
    label: '任务名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写任务名称',
      maxlength: 30
    },
    rules: [{ required: true, message: '任务名称不能为空' }]
  },
  {
    prop: 'task_time',
    label: '任务时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    rules: [{ required: true, message: '任务时间不能为空' }],
    attr: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59']
      // valueFormat: 'yyyy-MM-dd HH:mm:ss',
      // pickerOptions: {
      //   // 判断选择是否为周一到周日
      //   firstDayOfWeek: 1,
      //   onPick: ({ maxDate, minDate }) => {
      //     console.log(minDate.getDay(), 'min')
      //     if (minDate.getDay() !== 1 && minDate.getDay() !== 0) {
      //       Message.error('请选择周一到周日这个时间段')
      //       return
      //     }
      //   }
      // }
    },
    actions: {}
  },
  {
    prop: 'activeprice',
    label: '拼团价格(元)',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写拼团价格',
      maxlength: 30
    },
    rules: [{ required: true, message: '拼团价格' }]
  },
  {
    prop: 'successlimit',
    label: '成团人数(人)',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写成团人数',
      maxlength: 30
    },
    rules: [{ required: true, message: '成团人数' }]
  },
  {
    prop: 'successtime',
    label: '成团有效期(小时)',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写成团有效期',
      maxlength: 30
    },
    rules: [{ required: true, message: '成团有效期' }]
  },
  {
    prop: 'popup',
    label: '身份判断弹窗',
    type: 'upload-media',
    mediaRules,
    note: true,
    noteConfig,
    rules: [{ required: true, message }]
  },
  {
    prop: 'question_inner',
    label: '常见问题-国内',
    type: 'upload',
    rules: [{ required: true, message }],
    attr,
    note: true,
    noteConfig: noteConfig3
  },
  {
    prop: 'question_out',
    label: '常见问题-国外',
    type: 'upload',
    rules: [{ required: true, message }],
    attr,
    note: true,
    noteConfig: noteConfig3
  },
  {
    prop: 'team_inner',
    label: '拼团规则-国内',
    type: 'upload',
    rules: [{ required: true, message }],
    attr: attr_1,
    note: true,
    noteConfig: noteConfig
  },
  {
    prop: 'team_out',
    label: '拼团规则-国外',
    type: 'upload',
    rules: [{ required: true, message }],
    attr: attr_1,
    note: true,
    noteConfig: noteConfig
  },
  {
    prop: 'transfer_inner',
    label: '分享海报-国内',
    type: 'upload',
    rules: [{ required: true, message }],
    attr: attr_1,
    note: true,
    noteConfig: noteConfig
  },
  {
    prop: 'transfer_out',
    label: '分享海报-国外',
    type: 'upload',
    rules: [{ required: true, message }],
    attr: attr_1,
    note: true,
    noteConfig: noteConfig
  },
  {
    type: 'divider',
    attr: {
      title: '1对1-展示信息'
    }
  },
  {
    prop: 'head',
    label: '头图',
    type: 'upload-media',
    mediaRules,
    note: true,
    noteConfig,
    rules: [{ required: true, message }]
  },
  {
    prop: 'infoHead',
    label: '详情图片(团长)',
    type: 'upload',
    attr,
    note: true,
    noteConfig: noteConfig3,
    rules: [{ required: true, message }]
  },
  {
    prop: 'infoMember',
    label: '详情图片(团员)',
    type: 'upload',
    attr,
    note: true,
    noteConfig: noteConfig3,
    rules: [{ required: true, message }]
  },
  {
    prop: 'share',
    label: '分享海报模板',
    type: 'upload-media',
    mediaRules,
    note: true,
    noteConfig,
    rules: [{ required: true, message }]
  },
  {
    prop: 'appletText',
    label: '小程序卡片文案',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写小程序卡片文案',
      maxlength: 30
    },
    rules: [{ required: true, message: '小程序卡片文案' }]
  },
  {
    prop: 'appletImg',
    label: '小程序卡片图',
    type: 'upload-media',
    mediaRules,
    note: true,
    noteConfig,
    rules: [{ required: true, message }]
  },
  {
    type: 'divider',
    attr: {
      title: '班课-展示信息'
    }
  },
  {
    prop: 'classHead',
    label: '头图',
    type: 'upload-media',
    mediaRules,
    note: true,
    noteConfig,
    rules: [{ required: true, message }]
  },
  {
    prop: 'classInfoHead',
    label: '详情图片(团长)',
    type: 'upload',
    attr,
    note: true,
    noteConfig: noteConfig3,
    rules: [{ required: true, message }]
  },
  {
    prop: 'classInfoMember',
    label: '详情图片(团员)',
    type: 'upload',
    attr,
    note: true,
    noteConfig: noteConfig3,
    rules: [{ required: true, message }]
  },
  {
    prop: 'classShare',
    label: '分享海报模板',
    type: 'upload-media',
    mediaRules,
    note: true,
    noteConfig,
    rules: [{ required: true, message }]
  },
  {
    prop: 'classAppletText',
    label: '小程序卡片文案',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写小程序卡片文案',
      maxlength: 30
    },
    rules: [{ required: true, message: '小程序卡片文案' }]
  },
  {
    prop: 'classAppletImg',
    label: '小程序卡片图',
    type: 'upload-media',
    mediaRules,
    note: true,
    noteConfig,
    rules: [{ required: true, message }]
  }
]

// 赠课活动
export const course = [
  {
    type: 'divider',
    attr: {
      title: '基本信息',
      subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
    }
  },
  {
    prop: 'activityTitle',
    label: '任务名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写任务名称',
      maxlength: 30
    },
    rules: [{ required: true, message: '任务名称不能为空' }]
  },
  {
    prop: 'task_time',
    label: '任务时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
      // pickerOptions: {
      //   // 判断选择是否为周一到周日
      //   firstDayOfWeek: 1,
      //   onPick: ({ maxDate, minDate }) => {
      //     console.log(minDate.getDay(), 'min')
      //     if (minDate.getDay() !== 1 && minDate.getDay() !== 0) {
      //       Message.error('请选择周一到周日这个时间段')
      //       return
      //     }
      //   }
      // }
    },
    actions: {}
  },
  {
    type: 'divider',
    attr: {
      title: '落地页配置',
      subtitle: '以下选项，不传时将使用长期配置中的对应项配置'
    }
  },
  {
    prop: 'headImg',
    label: '头图-1v1用户',
    type: 'upload-media',
    mediaRules: {
      width: 750, // 750
      height: 964, // 964
      size: 1,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750x964像素；图片大小不超过400KB'
    },
    attr: {
      disabled: false
    },
    rules: [{ required: true, message: '头图不能为空' }]
  },
  {
    prop: 'headImg2',
    label: '头图-小班课用户',
    type: 'upload-media',
    mediaRules: {
      width: 750, // 750
      height: 964, // 964
      size: 1,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750x964像素；图片大小不超过400KB'
    },
    attr: {
      disabled: false
    },
    rules: [{ required: true, message: '头图不能为空' }]
  },
  {
    prop: 'buttonUnreceive',
    label: '按钮图',
    type: 'upload-media',
    mediaRules: {
      width: 612,
      height: 114,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议612x114像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '按钮图不能为空' }]
  },
  {
    prop: 'retainPopUp',
    label: '挽回弹窗',
    type: 'upload-media',
    mediaRules: {
      width: 234,
      height: 186,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议234*186像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '挽回弹窗不能为空' }]
  },
  {
    prop: 'rules',
    label: '活动规则',
    type: 'textarea',
    attr: {
      autosize: { minRows: 4 },
      placeholder: '请输入活动说明',
      maxlength: 1000,
      showWordLimit: true
    },
    rules: [
      { required: true, message: '活动规则不能为空' }
    ]
  }
]

// 0元组队
export const teamForm = [
  {
    prop: 'activityTitle',
    label: '活动名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写活动名称',
      maxlength: 25
    },
    rules: [{ required: true, message: '活动名称不能为空' }]
  },
  {
    prop: 'LIST_PIC',
    label: '列表页图片',
    type: 'upload-media',
    mediaRules: {
      width: 1242,
      height: 572,
      size: 0.4,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议1242x572像素；图片大小不超过400KB'
    },
    attr: {
      disabled: false
    },
    rules: [{ required: true, message: '头图不能为空' }]
  },
  {
    prop: 'HEAD_PIC',
    label: '头图',
    type: 'radio',
    defaultVal: '1',
    options: [
      { label: '视频', value: '1' },
      { label: '图片', value: '2' }
    ]
  },
  {
    prop: 'headVideo',
    label: '头图视频',
    type: 'upload-media',
    mediaRules: {
      size: 5,
      media: 'media',
      type: 'mp4,m3u8'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '视频支持mp4、m3u8格式，大小不超过5M'
    },
    attr: {
      disabled: false
    },
    rules: [{ required: true, message: '头图视频不能为空' }]
  },
  {
    prop: 'headImg',
    label: '头图图片',
    type: 'upload-media',
    mediaRules: {
      width: 750,
      height: 730,
      size: 0.4,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750x730像素；图片大小不超过400KB'
    },
    attr: {
      disabled: false
    },
    visible: false,
    rules: [{ required: true, message: '头图不能为空' }]
  },
  {
    prop: 'CONTENT_PIC',
    label: '活动详情图',
    type: 'upload',
    attr: {
      listType: 'picture-card',
      multiple: true,
      limit: 3
    },
    mediaRules: {
      width: 750, // 750
      size: 0.4,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '最多上传3张，支持GIF、PNG、JPG、JPEG格式，建议宽度750，图片大小不超过400KB'
    },
    rules: [{ required: true, message: '按钮图不能为空' }]
  },
  {
    prop: 'BUTTOM_UNLOCK_PIC',
    label: '发起组队按钮',
    type: 'upload-media',
    mediaRules: {
      width: 330,
      height: 96,
      size: 0.8,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议330x96像素；图片大小不超过800KB'
    },
    rules: [{ required: true, message: '按钮图不能为空' }]
  },
  {
    prop: 'BUTTOM_HELP_PIC',
    label: '邀友助力按钮',
    type: 'upload-media',
    mediaRules: {
      width: 680,
      height: 90,
      size: 0.8,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议680*90像素；图片大小不超过800KB'
    },
    rules: [{ required: true, message: '挽回弹窗不能为空' }]
  },
  {
    prop: 'BUTTOM_HELP_SUCCESS_PIC',
    label: '助力成功按钮',
    type: 'upload-media',
    mediaRules: {
      width: 670,
      height: 96,
      size: 0.8,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议670*96像素；图片大小不超过800KB'
    },
    rules: [{ required: true, message: '挽回弹窗不能为空' }]
  },
  {
    prop: 'POSTER_BACKGROUND_PIC',
    label: '分享海报',
    type: 'upload-media',
    mediaRules: {
      width: 537,
      height: 956,
      size: 0.8,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议537*956像素；图片大小不超过800KB'
    },
    rules: [{ required: true, message: '挽回弹窗不能为空' }]
  },
  {
    prop: 'SHARE_SQUARE_PIC',
    label: '小程序转发图',
    type: 'upload-media',
    mediaRules: {
      width: 420,
      height: 336,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议420*336像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '挽回弹窗不能为空' }]
  },
  {
    prop: 'HELP_COURSE_PIC',
    label: '助力弹窗引导图',
    type: 'upload-media',
    mediaRules: {
      width: 410,
      height: 321,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议410*321像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '挽回弹窗不能为空' }]
  },
  {
    prop: 'helpText',
    label: '小程序转发文案-进行中',
    type: 'textarea',
    attr: {
      autosize: { minRows: 2 },
      placeholder: '请输入文案',
      maxlength: 22,
      showWordLimit: true
    },
    rules: [
      { required: true, message: '文案不能为空' }
    ]
  },
  {
    prop: 'helpSuccessText',
    label: '小程序转发文案-成功后',
    type: 'textarea',
    attr: {
      autosize: { minRows: 2 },
      placeholder: '请输入文案',
      maxlength: 22,
      showWordLimit: true
    },
    rules: [
      { required: true, message: '文案不能为空' }
    ]
  },
  {
    prop: 'natureChannel',
    label: '1对1自然流量渠道',
    type: 'input',
    attr: {
      placeholder: '请输入渠道编码'
    },
    rules: [
      { required: true, message: '渠道不能为空' }
    ]
  },
  {
    prop: 'oneTransferChannel',
    label: '1对1转介绍付费渠道',
    type: 'input',
    attr: {
      placeholder: '请输入渠道编码'
    },
    rules: [
      { required: true, message: '渠道不能为空' }
    ]
    // note: true,
    // noteConfig: {
    //   type: 'text',
    //   text: '美术宝1对1-0元组队'
    // }
  },
  {
    prop: 'oneNatureChannel',
    label: '1对1转介绍非付费渠道',
    type: 'input',
    attr: {
      placeholder: '请输入渠道编码'
    },
    rules: [
      { required: true, message: '渠道不能为空' }
    ]
  },
  {
    prop: 'xbkTransferChannel',
    label: '小班课转介绍付费渠道',
    type: 'input',
    attr: {
      placeholder: '请输入渠道编码'
    },
    rules: [
      { required: true, message: '渠道不能为空' }
    ]
  },
  {
    prop: 'xbkNatureChannel',
    label: '小班课转介绍非付费渠道',
    type: 'input',
    attr: {
      placeholder: '请输入渠道编码'
    },
    rules: [
      { required: true, message: '渠道不能为空' }
    ]
  },
  {
    prop: 'oneNatureChannel_xx',
    label: '小熊发起人渠道',
    type: 'input',
    attr: {
      placeholder: '请输入渠道编码'
    },
    visible: false,
    rules: [
      { required: true, message: '渠道不能为空' }
    ]
  },
  {
    prop: 'oneTransferChannel_xx',
    label: '小熊转介绍参与人渠道',
    type: 'input',
    attr: {
      placeholder: '请输入渠道编码'
    },
    visible: false,
    rules: [
      { required: true, message: '渠道不能为空' }
    ]
  }
]

export const actions = ({ back }) => {
  return {
    back: {
      hide: true
    },
    uback: {
      label: '返回',
      click: back,
      type: 'button',
      attr: {
        icon: 'el-icon-back'
      }
    }
  }
}
