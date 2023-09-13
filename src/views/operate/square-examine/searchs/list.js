/*
 * @Descripttion:
 * @version:
 * @Author: gaoleifang
 * @Date: 2020-08-26 15:31:45
 * @LastEditors: ZhangYeLei
 * @LastEditTime: 2022-04-14 15:36:58
 */
/**
 * @author: liwei
 * @description:
 * @date: 2020/5/7
 */
export const search1 = [
  {
    prop: 'startTime',
    label: '开始时间',
    type: 'dateTimePicker', // 日期选择器,
    attr: {
      type: 'datetime',
      placeholder: '请选择开始时间'
    },
    rules: [
      { required: true, message: '开始时间不能为空' }
    ]
  },
  {
    prop: 'endTime',
    label: '结束时间',
    type: 'dateTimePicker', // 日期选择器,
    attr: {
      type: 'datetime',
      defaultTime: '23:59:59',
      placeholder: '请选择结束时间'
    },
    rules: [
      { required: true, message: '结束时间不能为空' }
    ]
  },
  {
    prop: 'display',
    label: '是否展示',
    type: 'select',
    attr: {
      clearable: true
    },
    options: [
      {
        label: '否', value: 0
      },
      {
        label: '是', value: 1
      }
    ]
  },
  {
    prop: 'roomShow',
    label: '馆藏作品',
    type: 'select',
    attr: {
      clearable: true
    },
    options: [
      {
        label: '否', value: 0
      },
      {
        label: '是', value: 1
      }
    ]
  },
  {
    prop: 'uid',
    label: 'UID',
    type: 'input',
    attr: {
      clearable: true,
      placeholder: '请输入UID'
    }
  },
  {
    prop: 'workId',
    label: '作品ID',
    type: 'input',
    attr: {
      clearable: true,
      placeholder: '请输入作品ID'
    }
  },
  {
    prop: 'workType',
    label: '作品类型',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      {
        label: '全部', value: 0
      },
      {
        label: '推荐', value: '1'
      },
      {
        label: '馆藏', value: '2'
      }
    ]
  }
]

export default [
  {
    prop: 'time',
    label: '选择时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00'],
      valueFormat: 'yyyy-MM-dd'
    }
  },
  {
    prop: 'termContId',
    label: '关键词',
    slot: 'termContId'
  },
  {
    prop: 'likeCountType',
    label: '点赞量',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      {
        label: '50以下', value: 1
      },
      {
        label: '50-200', value: 2
      },
      {
        label: '200-500', value: 3
      },
      {
        label: '500以上', value: 4
      }
    ]
  },
  {
    prop: 'worksFromType',
    label: '课程类型',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      {
        label: '美术', value: 2
      },
      {
        label: '书法', value: 4
      }
    ]
  },
  // {
  //   prop: 'tag',
  //   label: '作品标签',
  //   type: 'select',
  //   attr: {
  //     clearable: true,
  //     placeholder: '全部'
  //   },
  //   options: [
  //     {
  //       label: '儿创', value: 0
  //     },
  //     {
  //       label: '卡漫', value: 1
  //     },
  //     {
  //       label: '彩铅', value: 2
  //     },
  //     {
  //       label: '国画', value: 3
  //     },
  //     {
  //       label: '色彩', value: 4
  //     },
  //     {
  //       label: '造型', value: 5
  //     },
  //     {
  //       label: '其它', value: 6
  //     }
  //   ]
  // },
  {
    prop: 'level',
    label: '作品类型',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      {
        label: '优秀作品', value: 2
      },
      {
        label: '推荐作品', value: 1
      }
    ]
  },
  {
    prop: 'worksScoreType',
    label: '作品评分',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      {
        label: '0.5以下', value: 1
      },
      {
        label: '0.5~0.7', value: 2
      },
      {
        label: '0.70~0.87', value: 3
      },
      {
        label: '0.87~0.90', value: 4
      },
      {
        label: '0.90以上', value: 5
      }
    ]
  }
  // {
  //   prop: 'viewStatus',
  //   label: '是否展示',
  //   type: 'select',
  //   attr: {
  //     clearable: true
  //   },
  //   options: [
  //     {
  //       label: '否', value: 0
  //     },
  //     {
  //       label: '是', value: 1
  //     }
  //   ]
  // },
  // {
  //   prop: 'topCountType',
  //   label: '推荐次数',
  //   type: 'select',
  //   attr: {
  //     clearable: true,
  //     placeholder: '全部'
  //   },
  //   options: [
  //     {
  //       label: '10以下', value: 1
  //     },
  //     {
  //       label: '10-50', value: 2
  //     },
  //     {
  //       label: '50-100', value: 3
  //     },
  //     {
  //       label: '100以上', value: 4
  //     }
  //   ]
  // }
]

