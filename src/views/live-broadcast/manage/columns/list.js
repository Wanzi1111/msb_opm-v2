import { parseTime } from '@/utils/index'
let videoView = () => { }
export function setActions(actions) {
  ({ videoView = videoView } = actions)
}
export default [
  // {
  //   type: 'selection',
  //   width: 50,
  //   align: 'center',
  //   reserveSelection: true
  // },
  {
    fixed: true,
    prop: 'liveRoomId',
    label: '直播间ID',
    minWidth: 130,
    align: 'center'
  },
  {
    action: true,
    name: 'appCoverUrl',
    prop: 'appCoverUrl',
    label: '直播封面',
    align: 'center'
  },
  {
    prop: 'liveName',
    label: '直播名称',
    slot: 'liveName',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'openTime',
    label: '开播时间',
    minWidth: 170,
    align: 'center',
    render: (h, dat) => {
      const op = parseTime(dat)
      return op
    }
  },
  {
    prop: 'liveActivityId',
    minWidth: 170,
    label: '直播活动ID',
    align: 'center'
  },
  {
    prop: 'liveAdvertisement',
    label: 'UV',
    minWidth: 70,
    align: 'center',
    render: (h, dat) => dat && dat.uv
  },
  {
    prop: 'liveAdvertisement',
    label: 'PV',
    minWidth: 70,
    align: 'center',
    render: (h, dat) => dat && dat.pv
  },
  {
    prop: 'liveAdvertisement',
    label: '观看总时长',
    minWidth: 100,
    align: 'center',
    render: (h, dat) => dat && dat.totalTime
  },
  {
    prop: 'liveAdvertisement',
    label: '观看平均时长',
    minWidth: 120,
    align: 'center',
    render: (h, dat) => dat && dat.avgTime
  },
  {
    prop: 'pushTerminal',
    label: '推送终端',
    align: 'center',
    render: (h, dat) => {
      return h('el-tag', { props: { type: !dat ? 'success' : '', effect: 'dark' }}, !dat ? 'APP' : '微信')
    }
  },
  {
    prop: 'liveStatus',
    label: '直播状态',
    fixed: 'right',
    align: 'center',
    render: (h, dat) => {
      let tag
      switch (dat) {
        case 1:
          tag = h('el-tag', { props: { type: 'danger' }}, '直播中')
          break
        case 2:
          tag = h('el-tag', { props: { type: 'info' }}, '直播前')
          break
        case 3:
          tag = h('el-tag', '回放中')
          break
        case 4:
          tag = h('el-tag', { props: { type: 'success' }}, '已结束')
          break
        default:
          tag = h('el-tag', { props: { type: 'info' }}, '已关闭')
          break
      }
      return tag
    }
  },
  {
    prop: 'shelfStatus',
    label: '上架状态',
    fixed: 'right',
    align: 'center',
    render: (h, dat) => {
      let tag
      switch (dat) {
        case 0:
          tag = h('el-tag', { props: { type: 'success' }}, '已上架')
          break
        case 1:
          tag = h('el-tag', { props: { type: 'warning' }}, '已下架')
          break
      }
      return tag
    }
  },
  {
    fixed: 'right',
    action: true,
    name: 'action',
    prop: 'action',
    width: 80,
    label: '操作',
    align: 'center'
  }
]

export const actions = ({ tableAction }) => {
  return {
    appCoverUrl: [
      {
        type: 'img'
      }
    ],
    action: (dat, row, index) => {
      const status = !row.shelfStatus
      const { liveStatus, del, isRecommeded } = row

      let actionList = [
        {
          type: 'button',
          label: '上架',
          attr: {
            command: 'shelf'
          }
        },
        {
          type: 'button',
          label: '推荐',
          attr: {
            command: 'recommed'
          }
        }
        // {
        //   type: 'button',
        //   label: '弃用',
        //   attr: {
        //     command: 'disuse'
        //   }
        // }
        // {
        //   type: 'button',
        //   label: '数据统计',
        //   attr: {
        //     command: 'statistics'
        //   }
        // }
      ]
      /**
       *  直播前：编辑、上/下架、推荐
          直播中：上/下架、推荐
          回放中：上/下架、推荐
          已结束：下架
       */

      if ([1, 2, 3].includes(liveStatus)) {
        if (status) {
          actionList[0] = {
            type: 'button',
            label: '下架',
            attr: {
              command: 'shelf'
            }
          }
        }
        if (liveStatus === 2) {
          actionList.unshift({
            type: 'button',
            label: '编辑',
            attr: {
              command: 'examine'
            }
          })
        }
        if (isRecommeded) {
          actionList[actionList.length - 1] = {
            type: 'button',
            label: '取消推荐',
            attr: {
              command: 'noRecommed'
            }
          }
        }
      } else {
        if (status) {
          actionList = [{
            type: 'button',
            label: '下架',
            attr: {
              command: 'shelf'
            }
          }]
        } else {
          actionList = []
        }
      }

      if (del) {
        actionList = []
      }

      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini'
          },
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'hover'
            },
            command: (type, _, row) => tableAction(type, row),
            item: actionList
          }
        }
      ]
    }
  }
}
