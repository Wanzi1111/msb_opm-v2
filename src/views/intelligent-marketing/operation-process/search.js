import $store from '@/store'

export default [
  {
    prop: 'groupName',
    label: '人群名称',
    type: 'input',
    attr: {
      placeholder: '请输入人群名称',
      clearable: true
    }
  },
  {
    prop: 'couponCode',
    label: '券码ID',
    type: 'input',
    attr: {
      placeholder: '请输入券码ID',
      clearable: true
    }
  },
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: $store?.state?.communityCouponCodeManage?.baseData.business
  },
  {
    prop: 'status',
    label: '券码状态',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: $store?.getters?.baseData?.community_coupon_code_status
  },
  {
    prop: 'sendType',
    label: '发放方式',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: $store?.state?.communityCouponCodeManage?.baseData.sendWay
  },
  {
    prop: 'time',
    label: '查询日期',
    type: 'datePicker',
    layer: 'middle',
    attr: {
      placeholder: '全部',
      clearable: true,
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  }
]
