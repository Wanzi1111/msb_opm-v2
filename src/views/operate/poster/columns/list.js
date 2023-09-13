import sortButton from '../components/sortButton/index.vue'
import scaleInput from '../components/scaleInput/index.vue'
import { areas } from '../enum'
const em = []
areas.forEach(e => {
  em.push(e.label)
})
export default ({ getList, value }) => {
  return [
    {
      prop: 'id',
      label: 'ID',
      align: 'center',
      width: 60,
      fixed: true
    },
    {
      prop: 'posterName',
      label: '海报名称',
      align: 'center',
      minWidth: 110
    },
    {
      action: true,
      name: 'posterUrl',
      prop: 'posterUrl',
      label: '海报图片',
      align: 'center'
    },
    {
      prop: 'copywriting1',
      label: '文案1',
      align: 'center',
      showOverflowTooltip: true,
      minWidth: 200
    },
    {
      prop: 'copywriting2',
      label: '文案2',
      align: 'center',
      showOverflowTooltip: true,
      minWidth: 200
    },
    {
      prop: 'copywriting3',
      label: '文案3',
      align: 'center',
      showOverflowTooltip: true,
      minWidth: 200
    },
    {
      prop: 'num',
      label: '带R',
      align: 'center',
      minWidth: 110,
      render: (h, dat, row) => {
        return h('div', {}, [
          h('div', {}, `国内带R：${row.chinaNum}`),
          h('div', {}, `国外带R：${row.noChinaNum}`)
        ])
      }
    },
    {
      prop: 'area',
      label: '用户地区',
      align: 'center',
      width: 100,
      render: (h, dat, row) => {
        return h('el-tag', em[dat])
      }
    },
    {
      prop: 'sort',
      label: '排序',
      width: 120,
      align: 'center',
      render: (h, dat, row) => {
        return h(sortButton, { props: { row }})
      }
    },
    {
      prop: 'del',
      label: '海报状态',
      width: 120,
      align: 'center',
      render: (h, dat, row) => {
        const status = Number(dat)
        let content = '已停用'
        if (status === 0) {
          content = '投放中'
        }
        return h('el-tag', content)
      }
    },
    {
      prop: 'scale',
      label: '投放比例',
      width: 160,
      align: 'center',
      render: (h, dat, row) => {
        return h(scaleInput, {
          props: { row, getList }
        })
      }
    },
    {
      action: true,
      name: 'action',
      width: 210,
      prop: 'action',
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
}
export const actions = ({ copyPsoter, updatePsoter, deletePoster }) => {
  return {
    posterUrl: [
      {
        type: 'img'
      }
    ],
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '复制',
          click: copyPsoter,
          attr: {
            size: 'mini',
            icon: 'el-icon-copy-document',
            type: 'primary',
            plain: true
          }
        },
        {
          type: 'button',
          label: '修改',
          click: updatePsoter,
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'primary',
            plain: true
          }
        },
        {
          type: 'popconfirm', // popconfirm时 可设置button与popconfirm两个元素的任何属性
          label: `${row.del === '0' ? '停用' : '启用'}`, // button 属性
          confirm: (dat, row) => deletePoster(~~!+row.del, row), // popconfirm Events 确认事件
          attr: {
            size: 'mini', // button 属性
            icon: 'el-icon-warning-outline', // button 属性
            plain: true,
            popIcon: 'el-icon-info', // popconfirm时 属性
            iconColor: 'red', // popconfirm时 属性
            type: row.del === '0' ? 'danger' : 'success', // popconfirm时 属性
            confirmButtonText: '确定', // popconfirm时 属性
            cancelButtonText: '取消', // popconfirm时 属性
            title: `确定${row.del === '0' ? '停用' : '启用'}这条数据吗`// popconfirm时 属性
          }
        }
        // {
        //   type: 'button', // popconfirm时 可设置button与popconfirm两个元素的任何属性
        //   label: `${row.del === '0' ? '停用' : '启用'}`, // button 属性
        //   click: (dat, row) => deletePoster(~~!+row.del, row),
        //   attr: {
        //     icon: 'el-icon-view',
        //     size: 'mini',
        //     plain: !!row.del,
        //     type: row.del === '0' ? 'danger' : 'success'
        //   }
        // }
      ]
    }
  }
}
