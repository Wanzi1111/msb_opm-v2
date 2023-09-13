/**
 * @author: liwei
 * @description:
 * @date: 2020/5/7
 */

import moment from 'moment'
export const list = [
  {
    prop: 'worksId',
    label: '作品ID',
    align: 'center'
  },
  {
    prop: 'worksType',
    label: '标签',
    slot: 'worksType',
    align: 'center'
  },
  {
    prop: 'authorId',
    label: '用户信息',
    slot: 'authorId',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'worksImage',
    label: '作品',
    minWidth: 80,
    align: 'center',
    action: true,
    name: 'worksImage'
  },
  {
    prop: 'workTime', // rtime 推荐时间
    label: '上传时间',
    minWidth: 100,
    align: 'center',
    render: (h, dat) => dat && moment.unix(dat).format('YYYY-MM-DD')
  },
  // {
  //   prop: 'likeCount',
  //   label: '点赞量',
  //   align: 'center',
  //   render: (h, dat, row) => {
  //     return h('el-tag', { props: { type: !~~dat ? 'danger' : 'success' }}, dat || 0)
  //   }
  // },
  {
    fixed: 'right',
    action: true,
    name: 'action',
    prop: 'action',
    label: '操作',
    align: 'center',
    minWidth: 100
  }
]
export default [
  {
    prop: 'worksId',
    label: '作品ID',
    align: 'center'
  },
  {
    prop: 'works_from_type',
    label: '课程类型',
    align: 'center',
    width: 80,
    render: (h, dat, row) => {
      return dat === 2
        ? h('el-tag', { props: { type: 'success' }}, '小熊')
        : h('el-tag', { props: { type: 'primary' }}, '小熊') // 本期只要小熊才这么写的
    }
  },
  {
    prop: 'authorId',
    label: '用户信息',
    slot: 'authorId',
    align: 'center',
    minWidth: 100
  },
  // {
  //   prop: 'mobile',
  //   label: '手机号',
  //   minWidth: 110,
  //   align: 'center'
  // },
  {
    prop: 'worksImage',
    label: '作品',
    minWidth: 80,
    align: 'center',
    action: true,
    name: 'worksImage'
  },
  {
    prop: 'worksScore',
    label: '作品评分',
    minWidth: 80,
    align: 'center'
  },
  {
    prop: 'ctime', // rtime 推荐时间
    label: '上传时间',
    minWidth: 100,
    align: 'center',
    render: (h, dat) => dat && moment.unix(dat / 1000).format('YYYY-MM-DD')
  },
  // {
  //   prop: 'likeCount',
  //   label: '点赞量',
  //   align: 'center',
  //   render: (h, dat, row) => {
  //     return h('el-tag', { props: { type: !~~dat ? 'danger' : 'success' }}, dat || 0)
  //   }
  // },
  // {
  //   prop: 'topCount',
  //   label: '被推荐次数',
  //   align: 'center',
  //   render: (h, dat, row) => {
  //     return h('el-tag', { props: { type: !~~dat ? 'danger' : 'success' }}, dat || 0)
  //   }
  // },
  {
    fixed: 'right',
    action: true,
    name: 'action',
    prop: 'action',
    label: '操作',
    align: 'center',
    minWidth: 100
  }
]

export const actions = ({ tableAction }) => {
  return {
    worksImage: [
      { type: 'img' }
    ],
    action: (dat, row, index) => {
      let action = []
      action = [
        {
          label: `${row.level !== 1 ? '推荐' : '取消推荐'}`,
          type: 'button',
          click: (dat, row) => tableAction(row, 1, !(row.level === 1)),
          attr: {
            type: 'primary',
            size: 'mini',
            plain: row.level !== 1
          }
        },
        {
          label: `${row.level !== 2 ? '优秀作品' : '取消优秀'}`,
          type: 'button',
          click: (dat, row) => tableAction(row, 2, !(row.level === 2)),
          attr: {
            type: 'warning',
            size: 'mini',
            plain: row.level !== 2
          }
        }
      ]
      return action
    }
  }
}
export const action1 = ({ tableAction }) => {
  return {
    worksImage: [
      { type: 'img' }
    ],
    action: (dat, row, index, key) => {
      let action = []
      action = [
        // {
        //   label: `${!row.display ? '展示' : '不展示'}`,
        //   type: 'button',
        //   click: (dat, row) => tableAction(row, 6, ~~!row.display),
        //   attr: {
        //     icon: 'el-icon-view',
        //     size: 'mini',
        //     plain: !!row.display,
        //     type: 'info'
        //   }
        // },
        {
          label: `${!row.roomShow ? '馆藏' : '取消馆藏'}`,
          type: 'button',
          click: (dat, row) => tableAction(row, 2, ~~!row.roomShow, index),
          attr: {
            type: 'warning',
            size: 'mini',
            plain: !row.roomShow
          }
        },
        {
          label: `${!row.recommend ? '推荐' : '取消推荐'}`,
          type: 'button',
          click: (dat, row) => tableAction(row, 1, ~~!row.recommend, index),
          attr: {
            type: 'primary',
            size: 'mini',
            plain: !row.recommend
          }
        }
      ]
      return action
    }
  }
}

// export const action1 = ({ tableAction, status}) => {
//   return {
//     videoCoverUrl: [
//       { type: 'img' }
//     ],
//     action: (dat, row, index) => {
//       let action = []
//       switch (status) {
//         case '1':
//           action = [
//             {
//               label: '取消前30',
//               type: 'button',
//               click: (dat, row) =>
//                 tableAction(row, 1, 0, true),
//               attr: {
//                 type: 'primary',
//                 size: 'mini',
//                 // command: 'examine',
//                 icon: 'el-icon-s-check'
//               }
//             }
//           ]
//           break
//         case '2':
//           action = [
//             {
//               type: 'button',
//               label: '取消馆藏',
//               click: (dat, row) =>
//                 tableAction(row, 2, 0, true),
//               attr: {
//                 size: 'mini',
//                 type: 'warning'
//               }
//             }
//           ]
//           break
//         case '0':
//         default:
//           action = [
//             {
//               label: `${!row.display ? '展示' : '不展示'}`,
//               type: 'button',
//               click: (dat, row) => tableAction(row, 6, ~~!row.display),
//               attr: {
//                 icon: 'el-icon-view',
//                 size: 'mini',
//                 plain: !!row.display,
//                 type: 'info'
//               }
//             },
//             {
//               label: `${!row.roomShow ? '馆藏' : '取消馆藏'}`,
//               type: 'button',
//               click: (dat, row) => tableAction(row, 2, ~~!row.roomShow),
//               attr: {
//                 type: 'warning',
//                 size: 'mini',
//                 plain: !row.roomShow,
//                 icon: 'el-icon-s-platform'
//               }
//             },
//             {
//               label: `${!row.roomShow ? '前30' : '取消前30'}`,
//               type: 'button',
//               click: (dat, row) => tableAction(row, 1, ~~!row.roomShow),
//               attr: {
//                 type: 'primary',
//                 size: 'mini',
//                 plain: !row.roomShow,
//                 icon: 'el-icon-s-marketing'
//               }
//             }
//           ]
//           break
//       }
//       return action
//     }
//   }
// }
