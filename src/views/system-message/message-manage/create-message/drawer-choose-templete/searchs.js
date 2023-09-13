// import $store from '@/store'

export default [
  {
    prop: 'messageType',
    label: '消息类型',
    type: 'select',
    layer: 'large',
    // defaultVal: 1,
    options: [
      { label: '通知消息', value: 'TONGZHI' },
      { label: '营销消息', value: 'YINNGXIAO' }
    ],
    // options: [...$store?.state?.intelligentMarketing?.pushDinc?.listMessageType],
    attr: { placeholder: '请选择消息类型' }
  },
  {
    prop: 'messageId',
    label: 'ID',
    type: 'input',
    layer: 'large',
    attr: {
      placeholder: '请输入消息id',
      clearable: true
    }
  },
  {
    prop: 'messageTitle',
    label: '标题',
    type: 'input',
    layer: 'large',
    attr: {
      placeholder: '请输入消息标题',
      clearable: true
    }
  }
]
