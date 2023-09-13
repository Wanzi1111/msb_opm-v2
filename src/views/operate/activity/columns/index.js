import imgPreview from '../component/imgPreview/index.vue'

const defList = [
  {
    align: 'center',
    width: 50,
    type: 'expand',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row }})
    }
  },
  {
    prop: 'id',
    label: '投放ID',
    align: 'center',
    width: 150
  },
  {
    prop: 'publishName',
    label: '投放主题',
    align: 'center',
    minWidth: 260
  },
  {
    prop: 'publishStatus',
    label: '投放状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arr = ['投放中', '待投放', '投放结束', '已关闭']
      return arr[row.publishStatus]
    }
  },
  {
    prop: 'clickCount',
    label: 'PV',
    align: 'center'
  },
  {
    prop: 'uvCount',
    label: 'UV',
    align: 'center'
  },
  {
    prop: 'userType',
    label: '用户定向',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['所有', '付费', '未付费', '已退费']
      let arrSide = ''
      if (row.sideType === '1') {
        arrSide = '国内'
      } else if (row.sideType === '2') {
        arrSide = '国外'
      } else {
        arrSide = '全部'
      }
      return `${arrUser[dat] || '所有'}/${arrSide}`
    }
  },
  {
    prop: 'createTime',
    label: '投放时间',
    align: 'center',
    width: 320,
    render: (h, dat, row, index) => {
      // return moment(dat).format('YYYY-MM-DD HH:mm:ss')
      if (row.endTime) {
        return `${row.startTime} - ${row.endTime}`
      }
      return `${row.startTime} - 不限`
    }
  },
  // {
  //   prop: 'action',
  //   label: '素材',
  //   action: true,
  //   name: 'action',
  //   align: 'center',
  //   width: 100
  // },
  {
    prop: 'enabled',
    slot: 'setting',
    label: '操作',
    width: 130,
    align: 'center',
    fixed: 'right'
  }
]

// 小熊美术
const bearList = [
  {
    align: 'center',
    width: 50,
    type: 'expand',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row }})
    }
  },
  {
    prop: 'id',
    label: '投放ID',
    align: 'center',
    width: 150
  },
  {
    prop: 'publishName',
    label: '投放主题',
    align: 'center',
    minWidth: 260
  },
  {
    prop: 'publishStatus',
    label: '投放状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arr = ['投放中', '待投放', '投放结束', '已关闭']
      return arr[row.publishStatus]
    }
  },
  {
    prop: 'clickCount',
    label: 'PV',
    align: 'center'
  },
  {
    prop: 'uvCount',
    label: 'UV',
    align: 'center'
  },
  {
    prop: 'userType',
    label: '用户状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['所有', '付费', '未付费', '已退费']
      let datList = []
      let str = ''
      try {
        datList = JSON.parse(`[${dat}]`)
        datList.forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  // {
  //   prop: 'userLevel',
  //   label: '学生级别',
  //   align: 'center',
  //   render: (h, dat, row, index) => {
  //     const arrUser = ['默认', 'S1', 'S2', 'S3']
  //     let str = ''
  //     try {
  //       JSON.parse(`[${dat}]`).forEach((item, index) => {
  //         index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
  //       })
  //     } catch (e) {
  //       console.warn(e)
  //       return arrUser[0]
  //     }
  //     return str
  //   }
  // },
  {
    prop: 'classStatus',
    label: '上课状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['全部', '待上课', '上课中', '已结课']
      let str = ''
      try {
        JSON.parse(`[${dat}]`).forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  {
    prop: 'createTime',
    label: '投放时间',
    align: 'center',
    width: 320,
    render: (h, dat, row, index) => {
      // return moment(dat).format('YYYY-MM-DD HH:mm:ss')
      if (row.endTime) {
        return `${row.startTime} - ${row.endTime}`
      }
      return `${row.startTime} - 不限`
    }
  },
  // {
  //   prop: 'action',
  //   label: '素材',
  //   action: true,
  //   name: 'action',
  //   align: 'center',
  //   width: 100
  // },
  {
    prop: 'enabled',
    slot: 'setting',
    label: '操作',
    width: 130,
    align: 'center',
    fixed: 'right'
  }
]

const writeList = [
  {
    align: 'center',
    width: 50,
    type: 'expand',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row }})
    }
  },
  {
    prop: 'id',
    label: '投放ID',
    align: 'center',
    width: 150
  },
  {
    prop: 'publishName',
    label: '投放主题',
    align: 'center',
    minWidth: 260
  },
  {
    prop: 'publishStatus',
    label: '投放状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arr = ['投放中', '待投放', '投放结束', '已关闭']
      return arr[row.publishStatus]
    }
  },
  {
    prop: 'clickCount',
    label: 'PV',
    align: 'center'
  },
  {
    prop: 'uvCount',
    label: 'UV',
    align: 'center'
  },
  {
    prop: 'userType',
    label: '用户状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '付费', '未付费', '已退费']
      let datList = []
      let str = ''
      try {
        datList = JSON.parse(`[${dat}]`)
        datList.forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  {
    prop: 'createTime',
    label: '投放时间',
    align: 'center',
    width: 320,
    render: (h, dat, row, index) => {
      // return moment(dat).format('YYYY-MM-DD HH:mm:ss')
      if (row.endTime) {
        return `${row.startTime} - ${row.endTime}`
      }
      return `${row.startTime} - 不限`
    }
  },
  {
    prop: 'enabled',
    slot: 'setting',
    label: '操作',
    width: 130,
    align: 'center',
    fixed: 'right'
  }
]

// 小熊音乐
const musicList = [
  {
    align: 'center',
    width: 50,
    type: 'expand',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row }})
    }
  },
  {
    prop: 'id',
    label: '投放ID',
    align: 'center',
    width: 150
  },
  {
    prop: 'publishName',
    label: '投放主题',
    align: 'center',
    minWidth: 260
  },
  {
    prop: 'publishStatus',
    label: '投放状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arr = ['投放中', '待投放', '投放结束', '已关闭']
      return arr[row.publishStatus]
    }
  },
  {
    prop: 'clickCount',
    label: 'PV',
    align: 'center'
  },
  {
    prop: 'uvCount',
    label: 'UV',
    align: 'center'
  },
  {
    prop: 'userType',
    label: '用户状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '付费', '未付费', '已退费']
      let datList = []
      let str = ''
      try {
        datList = JSON.parse(`[${dat}]`)
        datList.forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  {
    prop: 'sideType',
    label: '区域',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '国内', '国外']
      let datList = []
      let str = ''
      try {
        datList = JSON.parse(`[${dat}]`)
        datList.forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  {
    prop: 'createTime',
    label: '投放时间',
    align: 'center',
    width: 320,
    render: (h, dat, row, index) => {
      // return moment(dat).format('YYYY-MM-DD HH:mm:ss')
      if (row.endTime) {
        return `${row.startTime} - ${row.endTime}`
      }
      return `${row.startTime} - 不限`
    }
  },
  {
    prop: 'enabled',
    slot: 'setting',
    label: '操作',
    width: 130,
    align: 'center',
    fixed: 'right'
  }
]

const oneByOne = [
  {
    align: 'center',
    width: 50,
    type: 'expand',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row }})
    }
  },
  {
    prop: 'id',
    label: '投放ID',
    align: 'center',
    width: 150
  },
  {
    prop: 'publishName',
    label: '投放主题',
    align: 'center',
    minWidth: 260
  },
  {
    prop: 'publishStatus',
    label: '投放状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arr = ['投放中', '待投放', '投放结束', '已关闭']
      return arr[row.publishStatus]
    }
  },
  {
    prop: 'clickCount',
    label: 'PV',
    align: 'center'
  },
  {
    prop: 'uvCount',
    label: 'UV',
    align: 'center'
  },
  {
    prop: 'userType',
    label: '用户状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '付费', '未付费', '已退费']
      let datList = []
      let str = ''
      try {
        datList = JSON.parse(`[${dat}]`)
        datList.forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  {
    prop: 'sideType',
    label: '区域',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '国内', '国外']
      let datList = []
      let str = ''
      try {
        datList = JSON.parse(`[${dat}]`)
        datList.forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  {
    prop: 'givenType',
    label: '赠课状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '新生半月', '老生半月', '老生月月', '班课无赠课', '1对1无赠课', '班课老生月月-8节', '班课新生半月', '班课老生月月-无限']
      let datList = []
      let str = ''
      try {
        datList = JSON.parse(`[${dat}]`)
        datList.forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  {
    prop: 'createTime',
    label: '投放时间',
    align: 'center',
    width: 320,
    render: (h, dat, row, index) => {
      // return moment(dat).format('YYYY-MM-DD HH:mm:ss')
      if (row.endTime) {
        return `${row.startTime} - ${row.endTime}`
      }
      return `${row.startTime} - 不限`
    }
  },
  {
    prop: 'enabled',
    slot: 'setting',
    label: '操作',
    width: 130,
    align: 'center',
    fixed: 'right'
  }
]

// 小熊艺术
const artList = [
  {
    align: 'center',
    width: 50,
    type: 'expand',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row }})
    }
  },
  {
    prop: 'id',
    label: '投放ID',
    align: 'center',
    width: 150
  },
  {
    prop: 'publishName',
    label: '投放主题',
    align: 'center',
    minWidth: 260
  },
  {
    prop: 'publishStatus',
    label: '投放状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arr = ['投放中', '待投放', '投放结束', '已关闭']
      return arr[row.publishStatus]
    }
  },
  {
    prop: 'clickCount',
    label: 'PV',
    align: 'center'
  },
  {
    prop: 'uvCount',
    label: 'UV',
    align: 'center'
  },
  {
    prop: 'userType',
    label: '用户状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '未付费', '已购美术体验课', '已购美术系统课', '已购书法体验课', '已购书法系统课']
      let datList = []
      let str = ''
      try {
        datList = JSON.parse(`[${dat}]`)
        datList.forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  // {
  //   prop: 'userLevel',
  //   label: '学生级别',
  //   align: 'center',
  //   render: (h, dat, row, index) => {
  //     const arrUser = ['默认', 'S1', 'S2', 'S3']
  //     let str = ''
  //     try {
  //       JSON.parse(`[${dat}]`).forEach((item, index) => {
  //         index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
  //       })
  //     } catch (e) {
  //       console.warn(e)
  //       return arrUser[0]
  //     }
  //     return str
  //   }
  // },
  {
    prop: 'classStatus',
    label: '上课状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['全部', '待上课', '上课中', '已结课']
      let str = ''
      try {
        JSON.parse(`[${dat}]`).forEach((item, index) => {
          index === 0 ? str += arrUser[item] : str += ('、' + arrUser[item])
        })
      } catch (e) {
        console.warn(e)
        return arrUser[0]
      }
      return str
    }
  },
  {
    prop: 'createTime',
    label: '投放时间',
    align: 'center',
    width: 320,
    render: (h, dat, row, index) => {
      // return moment(dat).format('YYYY-MM-DD HH:mm:ss')
      if (row.endTime) {
        return `${row.startTime} - ${row.endTime}`
      }
      return `${row.startTime} - 不限`
    }
  },
  // {
  //   prop: 'action',
  //   label: '素材',
  //   action: true,
  //   name: 'action',
  //   align: 'center',
  //   width: 100
  // },
  {
    prop: 'enabled',
    slot: 'setting',
    label: '操作',
    width: 130,
    align: 'center',
    fixed: 'right'
  }
]

export default (type) => {
  switch (type) {
    case 1:
      return bearList
    case 2:
      return writeList
    case 3:
      return musicList
    case 4:
      return oneByOne
    case 5:
      return artList
    default:
      return defList
  }
}

export const actions = ({ viewImg }) => {
  return {
    type: (dat, row, index) => {
      if (row.type) {
        return [
          {
            type: 'tag',
            label: '视频',
            attr: {
              type: 'success'
            }
          }
        ]
      } else {
        return [
          {
            type: 'tag',
            label: '图片',
            attr: {
              type: ''
            }
          }
        ]
      }
    },
    action: [
      {
        type: 'button',
        label: '素材预览',
        click: viewImg,
        attr: {
          size: 'mini',
          icon: 'el-icon-view',
          type: 'primary'
        }
      }
    ]
  }
}
