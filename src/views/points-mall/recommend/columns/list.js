import { updateSortId } from '@/api/points-mall/recommend'

export default ({ getList, showActivityImg }) => {
  const content = [
    {
      align: 'center',
      type: 'selection',
      width: 60,
      fixed: true
    },
    {
      prop: 'epc',
      label: '商品编码',
      align: 'center',
      minWidth: 110,
      render: (h, dat, item) => {
        return h(
          'el-tag',
          { props: { type: 'primary', effect: 'plain' }},
          dat
        )
      }
    },
    {
      action: true,
      name: 'img',
      prop: 'img',
      label: '商品图片',
      align: 'center'
    },
    {
      prop: 'goodsThumbnail',
      label: '活动图片',
      align: 'center',
      action: true,
      name: 'goodsThumbnail'
      // render: (h, dat, item) => {
      //   return h('el-image', { props: { src: dat, alt: '未添加图片' }})
      // }
    },
    {
      prop: 'title',
      label: '商品标题',
      align: 'center',
      slot: 'goodslotname',
      minWidth: 110
      // render: (h, dat, item) => {
      //   const title = item.type === 'CARD_CODE' ? '[虚拟]' : item.type === 'CLASS' ? '[课时]' : '[实物]'
      //   return h('el-tag', { props: { type: 'primary', effect: 'plain' }}, `${title}${dat}`)
      // }
    },
    {
      prop: 'price',
      label: '售价',
      align: 'center',
      minWidth: 110,
      render: (h, dat, item) => {
        return h('el-tag', {}, `${dat || 0}元`)
      }
    },
    {
      prop: 'imGoodsPaymentList',
      slot: 'imGoodsPaymentList',
      label: '兑换价',
      align: 'center',
      minWidth: 150
    },
    {
      prop: 'sales',
      label: '销量',
      sortable: 'custom',
      align: 'center',
      render: (h, dat, item) => {
        return h(
          'el-tag',
          { props: { type: 'warning', effect: 'plain' }},
          dat || 0
        )
      }
    },
    {
      prop: 'excessInventory',
      label: '库存',
      sortable: 'custom',
      slot: 'excessInventory',
      align: 'center',
      render: (h, dat, item) => {
        return h(
          'el-tag',
          { props: { type: 'danger', effect: 'plain' }},
          dat || 0
        )
      }
    },
    {
      prop: 'sortId',
      label: '排序',
      width: 100,
      sortable: 'custom',
      align: 'center',
      render: (h, dat, row) => {
        return h('el-input', {
          props: {
            value: dat
          },
          attrs: {
            placeholder: '请输入数字'
          },
          on: {
            input: e => {
              row.sortId = e
            },
            blur: () => {
              const { recommendGoodId, sortId } = row
              if (!sortId || !/^\d*$/.test(sortId)) {
                return
              }
              const res = updateSortId({ id: recommendGoodId, sortId })
              if (res.code === 0) {
                getList()
              }
            }
          }
        })
      }
    },
    {
      action: true,
      name: 'action',
      width: showActivityImg ? 180 : 80,
      prop: 'action',
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
  // showActivityImg 是否展示活动图片
  !showActivityImg ? content.splice(3, 1) : null
  return content
}
export const actions = ({ del, showActivityImg, imgUpload }) => {
  return {
    img: [
      {
        type: 'img'
      }
    ],
    goodsThumbnail: [
      {
        type: 'img'
      }
    ],
    action: (dat, row, index) => {
      const content = [
        {
          type: 'popconfirm', // popconfirm时 可设置button与popconfirm两个元素的任何属性
          label: '删除', // button 属性
          confirm: del, // popconfirm Events 确认事件
          attr: {
            size: 'mini', // button 属性
            disabled: row.status === 1, // button 属性
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
      showActivityImg ? content.splice(0, 0, {
        type: 'button', // popconfirm时 可设置button与popconfirm两个元素的任何属性
        label: '上传图片', // button 属性
        click: imgUpload,
        attr: {
          size: 'mini',
          icon: 'el-icon-edit',
          type: 'primary'
        }}) : null
      return content
    }
  }
}
