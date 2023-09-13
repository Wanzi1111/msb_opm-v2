import { goodsType } from '../../../enum'
export default [
  {
    prop: 'goodsType',
    label: '奖品类型',
    type: 'select',
    options: goodsType,
    attr: { placeholder: '活动类型' },
    rules: [{ required: true, message: '请选择' }]
  },
  {
    prop: 'goodsName',
    label: '奖品名称',
    type: 'input',
    attr: { placeholder: '请填写奖品名称' },
    rules: [{ required: true, message: '请填写奖品名称' }]
  },
  {
    prop: 'goodsId',
    label: '商品ID',
    slot: 'goodsId'
  },
  {
    prop: 'goodsImg',
    label: '奖品图片',
    type: 'upload-media', // 上传,
    mediaRules: {
      time: 60,
      size: 5,
      media: 'img',
      type: 'PNG,JPG'
    },
    rules: [{ required: true, message: '请添加奖品图片' }],
    note: true,
    noteConfig: {
      type: 'text',
      text: '建议尺寸：750X1300最大不可超过 5M ，支持png/jpg，对应C端活动入口图'
    },
    attr: {
      multiple: true
    }
  },
  {
    prop: 'prizeProbability',
    label: '奖品概率',
    type: 'input',
    attr: { placeholder: '请输入数字，支持输入小数点' },
    rules: [{ required: true, message: '请输入数字，支持输入小数点' }]
  }
]

export const actions = ({ quit }) => ({
  submit: {
    label: '提交',
    attr: {
      icon: 'el-icon-check'
    }
  },
  back: {
    hide: true
  },
  quit: {
    label: '取消',
    click: quit,
    type: 'button'
  }
})
