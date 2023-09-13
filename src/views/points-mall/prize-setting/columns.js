import { goodsType } from './enum'
export default [
  {
    prop: 'id',
    label: '序号',
    align: 'center'
  },
  {
    prop: 'goodsType',
    label: '奖品类型',
    align: 'center',
    render: (h, dat, row) => {
      const { label } = goodsType.filter(e => e.value === dat)[0] || {
        label: '-'
      }
      return h('el-tag', {}, row.type === 'GOODS' ? label : '金币')
    }
  },
  {
    prop: 'goodsName',
    label: '奖品名称',
    align: 'center'
  },
  {
    prop: 'goodsImg',
    label: '奖品图片',
    align: 'center',
    action: true,
    name: 'img'
  },
  {
    prop: 'winPrizeProbability',
    label: '奖品概率',
    slot: 'winPrizeProbability',
    align: 'center'
  },
  {
    prop: 'inventory',
    label: '奖品库存',
    align: 'center'
  },
  {
    prop: 'action',
    label: '操作',
    action: true,
    name: 'action',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleUpdate, handleDelete }) => {
  return {
    img: [
      {
        type: 'img'
      }
    ],
    action: (_, row) => {
      return [
        {
          type: 'button', // 按钮
          label: '更新',
          attr: {
            type: 'text'
          },
          click: () => handleUpdate(row)
        },
        {
          type: 'popconfirm', // popconfirm时 可设置button与popconfirm两个元素的任何属性
          label: '删除', // button 属性
          confirm: (dat, row, index) => handleDelete(row), // popconfirm Events 确认事件
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
    }
  }
}
