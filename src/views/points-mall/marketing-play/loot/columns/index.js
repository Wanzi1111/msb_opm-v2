import moment from 'moment'
import store from '@/store'

export default () => {
  return [
    {
      prop: 'id',
      label: '活动ID',
      align: 'center',
      width: 120
    },
    {
      prop: 'activityTitle',
      label: '活动标题',
      align: 'center',
      minWidth: 140
    },
    {
      prop: 'joinOneCoin',
      label: '美术宝1V1夺宝价格',
      align: 'center',
      minWidth: 130
    },
    {
      prop: 'joinBearCoin',
      label: '小熊艺术夺宝价格',
      align: 'center',
      minWidth: 130
    },
    {
      prop: 'activityCtime',
      label: '活动时间',
      align: 'center',
      minWidth: 260,
      render: (h, dat, row, index) => {
        return (dat && +dat !== 0 ? moment(parseInt(dat)).format('YYYY-MM-DD HH:mm:ss') : '') +
          ' - ' +
          (row.activityEtime && +row.activityEtime !== 0 ? moment(parseInt(row.activityEtime)).format('YYYY-MM-DD HH:mm:ss') : '')
      }
    },
    {
      prop: 'activityModelType',
      label: '活动模式',
      align: 'center',
      minWidth: 130,
      render: (h, dat, row, index) => store.getters.baseDataMap.activity_model_type_map[dat]
    },
    {
      prop: 'currentActivityCodeNo',
      label: '当前场次/总场次',
      align: 'center',
      minWidth: 130,
      render: (h, dat, row, index) => {
        return `${row.currentActivityCodeNo || 0}/${row.activityCodeNo || 0}`
      }
    },
    {
      prop: 'publishName',
      label: '报名人数/总人数',
      align: 'center',
      minWidth: 130,
      render: (h, dat, row, index) => {
        return `${row.userJoinNum || 0}/${row.activityUserTotalNum || 0}`
      }
    },
    {
      prop: 'userList',
      label: '获奖名单',
      align: 'center',
      minWidth: 160,
      action: true,
      name: 'userList'
    },
    {
      prop: 'activityStatus',
      label: '状态',
      align: 'center',
      width: 150,
      render: (h, dat) => {
        let tag
        switch (dat) {
          case 'NOTSTART':
            tag = h('el-tag', { props: { type: 'info' }}, '未开始')
            break
          case 'RUNNING':
            tag = h('el-tag', { props: { type: 'success' }}, '进行中')
            break
          case 'END':
            tag = h('el-tag', { props: { type: 'danger' }}, '活动已结束')
            break
          case 'DEL':
            tag = h('el-tag', { props: { type: 'error' }}, '已删除')
            break
          case 'INVALID':
            tag = h('el-tag', { props: { type: 'warning' }}, '失效')
            break
        }
        return tag
      }
    },
    {
      action: true,
      name: 'action',
      width: 230,
      prop: 'action',
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
}
export const actions = ({ copy, invalid, deleteMarking, edit, viewAwardUser }) => {
  return {
    userList: (dat) => {
      return dat?.length
        ? [
          {
            type: 'button',
            label: dat[0].userId,
            click: () => viewAwardUser(dat),
            attr: {
              size: 'mini',
              plain: true,
              type: 'primary'
            }
          }
        ]
        : [
          {
            type: 'span',
            label: '--'
          }
        ]
    },
    action: (dat, row, index) => {
      switch (row.activityStatus) {
        case 'NOTSTART':
          return [
            {
              type: 'button',
              label: '编辑',
              click: edit,
              attr: {
                icon: 'el-icon-edit',
                size: 'mini',
                type: 'primary'
              }
            },
            {
              type: 'button',
              label: '失效',
              click: invalid,
              attr: {
                icon: 'el-icon-warning-outline',
                size: 'mini',
                type: 'warning'
              }
            },
            {
              type: 'button',
              label: '删除',
              click: deleteMarking,
              attr: {
                icon: 'el-icon-delete',
                size: 'mini',
                type: 'button'
              }
            }
          ]
        case 'RUNNING':
          // return row.signNumber ? [
          //   {
          //     type: 'span',
          //     label: '失效',
          //     click: () => {},
          //     attr: {
          //       size: 'mini',
          //       type: 'button'
          //     }
          //   }
          // ] : [
          //   {
          //     type: 'button',
          //     label: '失效',
          //     click: invalid,
          //     attr: {
          //       size: 'mini',
          //       type: 'button'
          //     }
          //   }
          // ]
          return [
            {
              type: 'button',
              label: '失效',
              click: invalid,
              attr: {
                icon: 'el-icon-warning-outline',
                size: 'mini',
                type: 'warning'
              }
            }
          ]
        case 'END':
          return [
            {
              type: 'button',
              label: '复制',
              click: copy,
              attr: {
                icon: 'el-icon-copy-document',
                size: 'mini',
                type: 'info'
              }
            },
            {
              type: 'button',
              label: '删除',
              click: deleteMarking,
              attr: {
                icon: 'el-icon-delete',
                size: 'mini',
                type: 'danger'
              }
            }
          ]
        case 'INVALID':
          return [
            {
              type: 'button',
              label: '复制',
              click: copy,
              attr: {
                icon: 'el-icon-copy-document',
                size: 'mini',
                type: 'info'
              }
            },
            {
              type: 'button',
              label: '删除',
              click: deleteMarking,
              attr: {
                icon: 'el-icon-delete',
                size: 'mini',
                type: 'danger'
              }
            }
          ]
      }
    }
  }
}
