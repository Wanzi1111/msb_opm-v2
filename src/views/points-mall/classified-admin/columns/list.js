/**
 * @author: pengtaoqi
 * @description:
 * @date: 2020/12/15
 */
// import sortButton from '../components/sortButton/index.vue' // 排序组件

import moment from 'moment'
export default () => {
  return [
    {
      align: 'center',
      minWidth: 30
    },
    {
      prop: 'categoryName',
      label: '分类名称',
      align: 'center',
      minWidth: 240
    },
    {
      prop: 'goodsNum',
      label: '商品数量',
      align: 'center'
    },
    // {
    //   prop: 'sort',
    //   label: '排序',
    //   width: 120,
    //   align: 'center',
    //   render: (h, dat, row) => {
    //     return h(sortButton, { props: { row }})
    //   }
    // },
    {
      label: '创建时间',
      align: 'center',
      minWidth: 160,
      render: (h, dat, row) => {
        return moment.unix(row.ctime / 1000).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      prop: 'sort',
      action: true,
      name: 'sort',
      label: '排序',
      align: 'center'
    },
    {
      action: true,
      name: 'action',
      width: 280,
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
}
export const actions = ({ deleteGood, editClassified, dragup, dragdown, sortClassified, add, goods }) => {
  return {
    sort: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '上移',
          click: dragup,
          attr: {
            size: 'mini',
            type: 'text'
          }
        },
        {
          type: 'button',
          label: '下移',
          click: dragdown,
          attr: {
            size: 'mini',
            type: 'text'
          }
        }
      ]
    },
    action: (dat, row, index) => {
      const { parentId } = row
      return [
        {
          type: 'button',
          label: '排序',
          click: (dat, row) => {
            sortClassified(dat, row)
          },
          attr: {
            size: 'mini',
            icon: 'el-icon-sort',
            type: 'primary',
            plain: true
          }
        },
        {
          type: 'button',
          label: !+parentId ? '新增' : '商品',
          click: !+parentId ? add : goods,
          attr: {
            size: 'mini',
            icon: !+parentId ? 'el-icon-circle-plus' : 'el-icon-goods',
            type: !+parentId ? 'success' : 'info',
            plain: true
          }
        },
        {
          type: 'button',
          label: '编辑',
          click: editClassified,
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'primary'
          }
        },
        {
          type: 'button',
          label: '删除',
          click: deleteGood,
          attr: {
            size: 'mini',
            icon: 'el-icon-view',
            type: 'info'
          }
        }
      ]
    }
  }
}
