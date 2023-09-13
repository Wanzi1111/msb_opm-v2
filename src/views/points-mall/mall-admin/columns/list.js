
/**
 * @author: pengtaoqi
 * @description:
 * @date: 2020/12/15
 */
import moment from 'moment'
export default () => {
  return [
    {
      align: 'center',
      width: 60,
      type: 'selection',
      fixed: true
    },
    {
      prop: 'epc',
      label: '商品编码',
      align: 'center',
      width: 120
    },
    {
      prop: 'img',
      label: '商品图片',
      align: 'center',
      minWidth: 60,
      action: true,
      name: 'img'
    },
    {
      prop: 'epcReferName',
      label: '商品标题',
      align: 'center',
      // minWidth: 100,
      slot: 'goodslotname'
    },
    {
      prop: 'price',
      label: '售卖信息',
      align: 'center',
      // width: 160,
      slot: 'price'
      // render(h, dat, row) {
      //   return row.price + '元'
      // }
    },
    {
      prop: 'imGoodsPaymentList',
      slot: 'imGoodsPaymentList',
      label: '兑换价',
      width: 150,
      align: 'center'
    },
    {
      prop: 'sales',
      label: '销量',
      sortable: 'custom',
      align: 'center'
    },
    {
      label: '库存',
      prop: 'excessInventory',
      sortable: 'custom',
      align: 'center',
      slot: 'excessInventory'
    },
    {
      prop: 'timingTime',
      label: '上架时间',
      align: 'center',
      width: 120,
      render: (h, dat, row, index) => {
        if (Number(dat)) {
          return moment(Number(dat)).format('YYYY-MM-DD HH:mm:ss')
        }
        return '---'
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
export const actions = ({ updownShelf, edit, deleteGood }) => {
  return {
    action: (dat, row, index) => {
      let showBtn = {}
      if (row.status !== 'REMOVE') {
        showBtn = {
          label: '下架',
          attr: {
            size: 'mini',
            icon: 'el-icon-bottom',
            type: 'danger'
          }
        }
      } else {
        showBtn = {
          label: '上架',
          attr: {
            size: 'mini',
            icon: 'el-icon-top',
            type: 'successs'
          }
        }
      }
      return [
        {
          type: 'button',
          click: updownShelf,
          ...showBtn
        },
        {
          type: 'button',
          label: '编辑',
          click: edit,
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
            icon: 'el-icon-delete',
            type: 'info'
          }
        }
      ]
    },
    img: (dat, row, index) => {
      const showimg = {}
      showimg.type = 'img'
      if (!row.img) {
        row.img = require('@/assets/images/mall.png')
      }
      return [
        showimg
      ]
    }
  }
}
