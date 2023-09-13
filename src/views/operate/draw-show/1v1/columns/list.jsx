/**
 * @author: liwei
 * @description:
 * @date: 2020/5/7
 */

import moment from 'moment'

let videoView = () => {}
export function setActions(actions) {
  ({ videoView = videoView } = actions)
}
export default [
  {
    type: 'selection',
    width: 50,
    align: 'center'
  },
  {
    prop: 'id',
    label: '审查id',
    align: 'center'
  },
  {
    prop: 'authorId',
    fixed: true,
    label: 'uid',
    slot: 'authorId',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'subject',
    label: '视频科目',
    align: 'center',
    render: (h, dat, row) => {
      return <el-tag type='primary'>小画家作品秀</el-tag>
    }
  },
  {
    // action: true,
    prop: 'videoUrl',
    // name: 'videoUrl',
    label: '视频封面',
    minWidth: 80,
    align: 'center',
    render: (h, dat, row) => {
      return (
        <img
          style='cursor : pointer;height: 80px; width: 100%;object-fit: contain'
          onclick={() => {
            videoView(row)
          }}
          src={row.coverUrl}
        />
      )
    }
  },
  {
    prop: 'uploadTime', // rtime 推荐时间
    label: '上传时间',
    minWidth: 160,
    align: 'center',
    render: (h, dat) => {
      return moment(Number(dat)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'status',
    label: '审核状态',
    align: 'center',
    render: (h, dat) => {
      let tag
      switch (dat) {
        case 1:
          tag = h('el-tag', '待审核')
          break
        case 2:
          tag = h('el-tag', { props: { type: 'success' }}, '审核通过')
          break
        case 3:
          tag = h('el-tag', { props: { type: 'info' }}, '审核驳回')
          break
        case 4:
          tag = h('el-tag', { props: { type: 'success' }}, '推荐')
          break
        default:
          tag = h('el-tag', { props: { type: 'info' }}, '-')
          break
      }
      return tag
    }
  },
  {
    prop: 'utime',
    label: '最后操作时间',
    minWidth: 160,
    align: 'center',
    render: (h, dat) => {
      return moment(Number(dat)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'opUserName',
    label: '操作人',
    align: 'center'
  },
  {
    fixed: 'right',
    action: true,
    name: 'action',
    prop: 'action',
    label: '操作',
    align: 'center',
    width: 260
  }
]

export const actions = ({ tableAction }) => {
  return {
    // 0-待审核 1-审核成功 2-审核失败 3-需人工审核
    action: (dat, row, index) => {
      let action = []
      if (row.status === 1 || row.status === 3) { // 审核驳回，待审核
        action = [
          {
            type: 'button',
            label: '编辑',
            click: (dat, row, index) =>
              tableAction(dat, row, index, 'examine'),
            attr: {
              size: 'mini',
              command: 'edit',
              icon: 'el-icon-edit'
            }
          },
          {
            type: 'popconfirm', // popconfirm时 可设置button与popconfirm两个元素的任何属性
            label: '删除', // button 属性
            confirm: (dat, row, index) => tableAction(dat, row, index, 'delete'), // popconfirm Events 确认事件
            attr: {
              size: 'mini', // button 属性
              icon: 'el-icon-warning-outline', // button 属性
              plain: true,
              popIcon: 'el-icon-info', // popconfirm时 属性
              iconColor: 'red', // popconfirm时 属性
              type: 'danger', // popconfirm时 属性
              confirmButtonText: '确定', // popconfirm时 属性
              cancelButtonText: '取消', // popconfirm时 属性
              title: '确定删除这条数据吗'// popconfirm时 属性
            }
          }
        ]
      } else {
        action = [
          {
            type: 'button',
            label: '编辑',
            click: (dat, row, index) =>
              tableAction(dat, row, index, 'examine'),
            attr: {
              size: 'mini',
              command: 'edit',
              icon: 'el-icon-edit'
            }
          }
        ]
      }
      return action
    }
  }
}
