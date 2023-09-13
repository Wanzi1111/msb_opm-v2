import moment from 'moment'

const defaultList = [
  {
    prop: 'id',
    label: '投放ID',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'time',
    label: '统计时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [`${moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`],
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'advertName',
    label: '广告位名称',
    type: 'input',
    attr: {
      // clearable: true,
      placeholder: '请输入广告名称'
    }
  },
  // {
  //   prop: 'awardedType',
  //   label: '授课类型',
  //   type: 'select',
  //   attr: {
  //     clearable: true,
  //     placeholder: '全部'
  //   },
  //   options: [{ label: '不限', value: '0' }, { label: '1对1', value: '1' }, { label: '班课', value: '2' }]
  // },
  {
    prop: 'publishName',
    label: '投放主题',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'sideType',
    label: '区域',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '国内', value: '1' }, { label: '国外', value: '2' }]
  },
  {
    prop: 'publishStatus',
    defaultVal: '0',
    label: '投放状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '投放中', value: '0' }, { label: '待投放', value: '1' }, { label: '投放结束', value: '2' }, { label: '已关闭', value: '3' }]
  }
]

const BearList = [
  {
    prop: 'userType',
    label: '付费类型',
    type: 'select',
    // defaultVal: '0',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '已付费', value: '1' }, { label: '未付费', value: '2' }, { label: '已退费', value: '3' }]
  },
  {
    prop: 'classStatus',
    label: '上课状态',
    type: 'select',
    // defaultVal: '0',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '待上课', value: '1' }, { label: '上课中', value: '2' }, { label: '已结课', value: '3' }]
  }
  // {
  //   prop: 'userLevel',
  //   label: '学生级别',
  //   type: 'select',
  //   // defaultVal: '0',
  //   attr: {
  //     clearable: true,
  //     placeholder: '全部'
  //   },
  //   options: [{ label: 'S1', value: '1' }, { label: 'S2', value: '2' }, { label: 'S3', value: '3' }]
  // }
]

const writeList = [
  {
    prop: 'userType',
    label: '付费类型',
    type: 'select',
    // defaultVal: '0',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '已付费', value: '1' }, { label: '未付费', value: '2' }]
  }
]

const musicList = [
  {
    prop: 'userType',
    label: '付费类型',
    type: 'select',
    // defaultVal: '0',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '已付费', value: '1' }, { label: '未付费', value: '2' }]
  }
]

const oneByOneStudent = [
  {
    prop: 'id',
    label: '投放ID',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'publishName',
    label: '投放主题',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'time',
    label: '统计时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [`${moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`],
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'advertName',
    label: '广告位名称',
    type: 'input',
    attr: {
      // clearable: true,
      placeholder: '请输入广告名称'
    }
  },
  {
    prop: 'userType',
    label: '付费类型',
    type: 'select',
    // defaultVal: '0',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '不限', value: '0' }, { label: '游客', value: '3' }, { label: '注册', value: '4' }, { label: '1对1付费', value: '5' }, { label: '班课付费', value: '6' }]
    // options: [{ label: '已付费', value: '1' }, { label: '未付费', value: '2' }]
  },
  {
    prop: 'sideType',
    label: '区域',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '国内', value: '1' }, { label: '国外', value: '2' }]
  },
  {
    prop: 'givenType',
    label: '赠课状态',
    type: 'select',
    // defaultVal: '0',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '新生半月', value: '1' }, { label: '老生半月', value: '2' }, { label: '老生月月', value: '3' }, { label: '班课无赠课', value: '4' }, { label: '1对1无赠课', value: '5' }, { label: '班课老生月月-8节', value: '6' }, { label: '班课老生月月-无限', value: '8' }, { label: '班课新生半月', value: '7' }]
  },
  {
    prop: 'publishStatus',
    defaultVal: '0',
    label: '投放状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '投放中', value: '0' }, { label: '待投放', value: '1' }, { label: '投放结束', value: '2' }, { label: '已关闭', value: '3' }]
  }
]

const oneByOneTeacher = [
  {
    prop: 'id',
    label: '投放ID',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'publishName',
    label: '投放主题',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'time',
    label: '统计时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [`${moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`],
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'advertName',
    label: '广告位名称',
    type: 'input',
    attr: {
      // clearable: true,
      placeholder: '请输入广告名称'
    }
  },
  {
    prop: 'awardedType',
    label: '授课类型',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '不限', value: '0' }, { label: '1对1', value: '1' }, { label: '班课', value: '2' }]
  },
  {
    prop: 'publishStatus',
    defaultVal: '0',
    label: '投放状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '投放中', value: '0' }, { label: '待投放', value: '1' }, { label: '投放结束', value: '2' }, { label: '已关闭', value: '3' }]
  }
]

const artList = [
  {
    prop: 'id',
    label: '投放ID',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'publishName',
    label: '投放主题',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'time',
    label: '统计时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [`${moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`],
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'advertName',
    label: '广告位名称',
    type: 'input',
    attr: {
      // clearable: true,
      placeholder: '请输入广告名称'
    }
  },
  {
    prop: 'putTarget',
    label: '用户状态及购课状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      { label: '不限', value: '0' },
      { label: '未付费', value: '1' },
      { label: '已购美术', value: '2' },
      { label: '已购书法', value: '3' },
      { label: '已购舞蹈', value: '5' }
    ]
  },
  // {
  //   prop: 'userLevel',
  //   label: '学生级别',
  //   type: 'select',
  //   // defaultVal: '0',
  //   attr: {
  //     clearable: true,
  //     placeholder: '全部'
  //   },
  //   options: [{ label: 'S1', value: '1' }, { label: 'S2', value: '2' }, { label: 'S3', value: '3' }]
  // },
  {
    prop: 'publishStatus',
    defaultVal: '0',
    label: '投放状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '投放中', value: '0' }, { label: '待投放', value: '1' }, { label: '投放结束', value: '2' }, { label: '已关闭', value: '3' }]
  }
]

const artworldList = [
  {
    prop: 'id',
    label: '投放ID',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'time',
    label: '统计时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [`${moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`],
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'advertName',
    label: '广告位名称',
    type: 'input',
    attr: {
      // clearable: true,
      placeholder: '请输入广告名称'
    }
  },
  {
    prop: 'publishName',
    label: '投放主题',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'publishStatus',
    defaultVal: '0',
    label: '投放状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [{ label: '投放中', value: '0' }, { label: '待投放', value: '1' }, { label: '投放结束', value: '2' }, { label: '已关闭', value: '3' }]
  }
]
export default (type) => {
  const newList = [...defaultList]
  switch (type) {
    case 1:
      newList.splice(newList.length - 1, 1)
      return newList.concat(BearList)
    case 2:
      newList.splice(newList.length - 1, 1)
      return newList.concat(writeList)
    case 3:
      return defaultList.concat(musicList)
    case 4:
      return oneByOneStudent
    case 5:
      return artList
    case 6:
      return oneByOneTeacher
    case 7:
      return artworldList
    default:
      return defaultList
  }
}

