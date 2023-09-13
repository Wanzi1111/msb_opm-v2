import imgPreview from '../component/imgPreview'
// import adDetail from '../component/adDetail'
import store from '@/store'

const defList = [
  {
    type: 'selection',
    width: '40',
    align: 'center',
    fixed: 'left'
  },
  {
    align: 'center',
    width: 50,
    type: 'expand',
    fixed: 'left',
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
    width: 260
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
    slot: 'click',
    label: '点击数据',
    align: 'left'
  },
  {
    prop: 'uvCount',
    slot: 'exposure',
    label: '浏览数据',
    align: 'left'
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
    action: true,
    name: 'enabled',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right'
  }
]

// 小熊美术
const bearList = [
  {
    type: 'selection',
    width: '40',
    align: 'center',
    fixed: 'left'
  },
  {
    align: 'center',
    width: 50,
    fixed: 'left',
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
    width: 260
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
    slot: 'click',
    label: '点击数据',
    align: 'left'
  },
  {
    prop: 'uvCount',
    slot: 'exposure',
    label: '浏览数据',
    align: 'left'
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
    action: true,
    name: 'enabled',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right'
  }
]

// 书画院
const writeList = [
  {
    type: 'selection',
    width: '40',
    align: 'center',
    fixed: 'left'
  },
  {
    align: 'center',
    width: 50,
    fixed: 'left',
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
    width: 260
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
    slot: 'click',
    label: '点击数据',
    align: 'left'
  },
  {
    prop: 'uvCount',
    slot: 'exposure',
    label: '浏览数据',
    align: 'left'
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
    action: true,
    name: 'enabled',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right'
  }
]

// 小熊音乐
const musicList = [
  {
    type: 'selection',
    width: '40',
    align: 'center',
    fixed: 'left'
  },
  {
    align: 'center',
    width: 50,
    fixed: 'left',
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
    width: 260
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
    prop: 'allErt',
    label: 'CTR',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：${row.allErt || 0}`),
        h('div', {}, `pad端：${row.allErtPad || 0}`)
      ])
    }
  },
  {
    prop: 'clickCount',
    label: '点击数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvCount || 0} PV ${row.clickCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvPadCount || 0} PV ${row.clickPadCount || 0}`)
      ])
    }
  },
  {
    prop: 'uvCount',
    label: '浏览数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvExposureCount || 0} PV ${row.exposureCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvExposurePadCount || 0} PV ${row.exposurePadCount || 0}`)
      ])
    }
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
    showOverflowTooltip: true,
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
    action: true,
    name: 'enabled',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right'
  }
]

// 一对一
const oneByOne = [
  {
    type: 'selection',
    width: '40',
    align: 'center',
    fixed: 'left'
  },
  {
    align: 'center',
    width: 50,
    type: 'expand',
    fixed: 'left',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row, ctr: true, showPadData: true }})
      // return h(adDetail, { props: { list: row.sonPublish }})
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
    width: 260
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
    prop: 'allErt',
    label: 'CTR',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：${row.allErt || 0}`),
        h('div', {}, `pad端：${row.allErtPad || 0}`)
      ])
    }
  },
  {
    prop: 'clickCount',
    label: '点击数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvCount || 0} PV ${row.clickCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvPadCount || 0} PV ${row.clickPadCount || 0}`)
      ])
    }
  },
  {
    prop: 'uvCount',
    label: '浏览数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvExposureCount || 0} PV ${row.exposureCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvExposurePadCount || 0} PV ${row.exposurePadCount || 0}`)
      ])
    }
  },
  {
    prop: 'userType',
    label: '用户状态',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '付费', '未付费', '游客', '注册', '1对1付费', '班课付费']
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
    showOverflowTooltip: true,
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
    action: true,
    name: 'enabled',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right'
  }
]

// 小熊艺术
const artList = [
  {
    type: 'selection',
    width: '40',
    align: 'center',
    fixed: 'left'
  },
  {
    align: 'center',
    width: 50,
    fixed: 'left',
    type: 'expand',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row, ctr: true, showPadData: true }})
    }
  },
  {
    prop: 'id',
    label: '投放ID',
    align: 'center'
  },
  {
    prop: 'publishName',
    label: '投放主题',
    align: 'center',
    width: 200
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
    prop: 'allErt',
    label: 'CTR',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：${row.allErt || 0}`),
        h('div', {}, `pad端：${row.allErtPad || 0}`)
      ])
    }
  },
  {
    prop: 'clickCount',
    label: '点击数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvCount || 0} PV ${row.clickCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvPadCount || 0} PV ${row.clickPadCount || 0}`)
      ])
    }
  },
  {
    prop: 'uvCount',
    label: '浏览数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvExposureCount || 0} PV ${row.exposureCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvExposurePadCount || 0} PV ${row.exposurePadCount || 0}`)
      ])
    }
  },
  {
    prop: 'subjectStatus',
    label: '用户状态及购课状态',
    align: 'center',
    showOverflowTooltip: true,
    width: 200,
    render: (h, dat, row, index) => {
      const datList = dat.split(',').reduce((content, item) => { return [...content, ...item.split('').filter(one => !content.includes(one))] }, [])
      let str = ''
      try {
        datList.forEach((item, index) => {
          index === 0 ? str += store.getters.artConfig.subjectStatusListMap.get(item) : str += ('、' + store.getters.artConfig.subjectStatusListMap.get(item))
        })
      } catch (e) {
        return '-'
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
    prop: 'weekShare',
    label: '周周分享',
    align: 'center',
    render: (h, dat, row, index) => {
      const arrUser = ['不限', '当期已参与', '当期未参与']
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
    action: true,
    name: 'enabled',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right'
  }
]

// Artworld
const artworldList = [
  {
    type: 'selection',
    width: '40',
    align: 'center',
    fixed: 'left'
  },
  {
    align: 'center',
    width: 50,
    type: 'expand',
    fixed: 'left',
    render: (h, dat, row) => {
      return h(imgPreview, { props: { row: row, ctr: true, showPadData: true }})
      // return h(adDetail, { props: { list: row.sonPublish }})
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
    width: 260
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
    prop: 'allErt',
    label: 'CTR',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：${row.allErt || 0}`),
        h('div', {}, `pad端：${row.allErtPad || 0}`)
      ])
    }
  },
  {
    prop: 'clickCount',
    label: '点击数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvCount || 0} PV ${row.clickCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvPadCount || 0} PV ${row.clickPadCount || 0}`)
      ])
    }
  },
  {
    prop: 'uvCount',
    label: '浏览数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvExposureCount || 0} PV ${row.exposureCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvExposurePadCount || 0} PV ${row.exposurePadCount || 0}`)
      ])
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
    action: true,
    name: 'enabled',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right'
  }
]
export default (type) => {
  console.log('type', type)
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
    case 7:
      return artworldList
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

export const actionsList = ({ tableAction }) => {
  return {
    enabled: (dat, row, index) => {
      const action = [
        {
          label: '编辑',
          attr: {
            command: 'edit'
          }
        },
        {
          label: '复用',
          attr: {
            command: 'copy'
          }
        }
      ]
      if (row.publishStatus !== 1) {
        const ableList = [3, 2]
        action.push({
          label: ableList.includes(row.publishStatus) ? '开启' : '结束',
          attr: {
            command: 'close'
          }
        })
      }
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini'
          },
          click: () => {},
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'click'
            },
            command: (type, dat, row, index) => tableAction(dat, row, index, type),
            item: action
          }
        }
      ]
    }
  }
}

// 用户定向-分群列表
export const userGroupColumns = [
  {
    prop: 'id',
    label: 'id',
    align: 'center',
    width: 80
  },
  {
    prop: 'groupCode',
    label: '分群ID',
    align: 'center',
    width: 100,
    slot: 'groupCode'
  },
  {
    prop: 'groupName',
    label: '分群名称',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'userNum',
    label: '符合人数',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'desc',
    label: '描述',
    align: 'center',
    minWidth: 200,
    showOverflowTooltip: true
  },
  {
    prop: 'refreshWay',
    label: '刷新机制',
    align: 'center',
    minWidth: 120,
    render: (h, dat) => h('el-tag', { props: { type: dat ? 'success' : '', effect: 'plain' }}, ['手动刷新', '自动刷新'][~~dat])
  },
  {
    prop: 'checked',
    label: '选中状态',
    minWidth: 100,
    align: 'center',
    fixed: 'right',
    action: true,
    name: 'tag',
    render: (h, dat) => h('el-tag', { props: { type: dat ? 'success' : 'info' }}, dat ? '已选中' : '未选中')
  },
  {
    prop: 'desc',
    label: '操作',
    minWidth: 100,
    align: 'center',
    fixed: 'right',
    action: true,
    name: 'action'
  }
]

export const userGroupAction = ({ handleUserGroupAction }) => {
  return {
    action: (dat, row, index) => {
      if (!row.checked) {
        return [
          {
            type: 'button',
            label: '选 中',
            click: () => handleUserGroupAction('check', row.id),
            attr: {
              plain: true
            }
          }
        ]
      } else {
        return [
          {
            type: 'button',
            label: '取消选中',
            click: () => handleUserGroupAction('uncheck', row.id),
            attr: {
              plain: true,
              type: 'danger'
            }
          }
        ]
      }
    }
  }
}
