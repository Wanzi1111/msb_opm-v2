import { cateUpdateSortId } from '@/api/points-mall/mall-admin'

export default ({ getSortList, parentId }) => {
  return [
    // {
    //   align: 'center',
    //   width: 60,
    //   type: 'selection',
    //   fixed: true
    // },
    {
      prop: 'epc',
      label: '商品编码',
      align: 'center',
      width: 120
    },
    {
      action: true,
      name: 'img',
      prop: 'img',
      label: '商品图片',
      align: 'center',
      minWidth: 70
    },
    {
      prop: 'epcReferName',
      label: '商品标题',
      align: 'center',
      slot: 'goodslotname',
      minWidth: 140
    },
    {
      prop: 'price',
      label: '售价/课时',
      align: 'center',
      render: (h, dat, item) => {
        return h('el-tag', {}, `${dat || 0}${item.type === 'CLASS' ? '课时' : '元'}`)
      }
    },
    {
      prop: 'imGoodsPaymentList',
      slot: 'imGoodsPaymentList',
      label: '兑换价',
      align: 'center'
    },
    {
      prop: 'sales',
      label: '销量',
      // sortable: 'custom',
      align: 'center'
    },
    {
      label: '可售库存',
      prop: 'excessInventory',
      // sortable: 'custom',
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
      prop: 'sortNumber',
      label: '排序',
      width: 130,
      // sortable: 'custom',
      align: 'center',
      render: (h, dat, row) => {
        return h('el-input', {
          props: {
            value: row.currentCategoryRelation.sortNumber
          },
          attrs: {
            placeholder: '请输入数字'
          },
          on: {
            input: e => {
              row.currentCategoryRelation.sortNumber = e
            },
            blur: () => {
              const {
                currentCategoryRelation: { id, sortNumber }
              } = row
              if (!sortNumber || !/^\d*$/.test(sortNumber)) {
                return
              }
              cateUpdateSortId({
                id,
                sortId: sortNumber || '0',
                isParent: !+parentId
              })
                .then(() => {
                  getSortList()
                })
                .catch(() => {
                  getSortList()
                })
            }
          }
        })
      }
    }
  ]
}

export const actions = () => ({
  img: [
    { type: 'img' }
  ]
})
