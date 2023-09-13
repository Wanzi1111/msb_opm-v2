import moment from 'moment'

export const defaultValObj = {
  time: [
    moment()
      .subtract(1, 'week')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss'),
    moment()
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss')
  ]
}

const provinceList = [
  {
    lable: '北京市',
    value: '北京市'
  },
  {
    lable: '天津市',
    value: '天津市'
  },
  {
    lable: '上海市',
    value: '上海市'
  },
  {
    lable: '重庆市',
    value: '重庆市'
  },
  {
    lable: '香港"',
    value: '香港'
  },
  {
    lable: '澳门"',
    value: '澳门'
  },
  {
    lable: '河北省',
    value: '河北省'
  },
  {
    lable: '山西省',
    value: '山西省'
  },
  {
    lable: '内蒙古',
    value: '内蒙古'
  },
  {
    lable: '辽宁省',
    value: '辽宁省'
  },
  {
    lable: '吉林省',
    value: '吉林省'
  },
  {
    lable: '黑龙江',
    value: '黑龙江'
  },
  {
    lable: '江苏省',
    value: '江苏省'
  },
  {
    lable: '浙江省',
    value: '浙江省'
  },
  {
    lable: '安徽省',
    value: '安徽省'
  },
  {
    lable: '福建省',
    value: '福建省'
  },
  {
    lable: '江西省',
    value: '江西省'
  },
  {
    lable: '山东省',
    value: '山东省'
  },
  {
    lable: '河南省',
    value: '河南省'
  },
  {
    lable: '湖北省',
    value: '湖北省'
  },
  {
    lable: '湖南省',
    value: '湖南省'
  },
  {
    lable: '广东省',
    value: '广东省'
  },
  {
    lable: '广西壮族自治区',
    value: '广西壮族自治区'
  },
  {
    lable: '海南省',
    value: '海南省'
  },
  {
    lable: '四川省',
    value: '四川省'
  },
  {
    lable: '贵州省',
    value: '贵州省'
  },
  {
    lable: '云南省',
    value: '云南省'
  },
  {
    lable: '陕西省',
    value: '陕西省'
  },
  {
    lable: '甘肃省',
    value: '甘肃省'
  },
  {
    lable: '青海省',
    value: '青海省'
  },
  {
    lable: '西藏自治区',
    value: '西藏自治区'
  },
  {
    lable: '宁夏回族自治区',
    value: '宁夏回族自治区'
  },
  {
    lable: '新疆维吾尔族自治区',
    value: '新疆维吾尔族自治区'
  },
  {
    lable: '台湾省',
    value: '台湾省'
  }
]

export default [
  {
    prop: 'userId',
    label: '用户ID',
    type: 'input',
    attr: {
      placeholder: '请输入用户昵称/ID'
    }
  },
  {
    prop: 'epc',
    label: '商品名称/编码',
    type: 'input',
    attr: {
      placeholder: '请输入商品名称/编码'
    }
  },
  {
    prop: 'phone',
    label: '收货人手机号',
    type: 'input',
    attr: {
      placeholder: '请输入收货人手机号'
    }
  },
  {
    prop: 'province',
    label: '收货地址',
    type: 'select',
    attr: {
      placeholder: '请输入收货地址'
    },
    options: provinceList
  },
  {
    prop: 'time',
    label: '日期',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: defaultValObj.time,
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  }
]
