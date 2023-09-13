import moment from 'moment'
import $store from '@/store'
import { desensitizationName, desensitizationPhone, desensitizationAddress } from '@/utils'

export default [
  // {
  //   width: 55,
  //   fixed: true,
  //   type: 'selection'
  // },
  {
    prop: 'user_id',
    label: '用户信息',
    align: 'center',
    width: 120
    // render(h, _, rowData) {
    //   return
    // }
  },
  {
    prop: 'goods_name',
    label: '商品名称',
    align: 'center',
    minWidth: 180
  },
  {
    prop: 'goods_epc',
    label: '商品编码',
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'ctime',
    label: '收货信息',
    align: 'center',
    minWidth: 300,
    render: (
      h,
      data,
      {
        consignee_name,
        consignee_phone,
        province,
        city,
        area,
        street,
        address_detail
      }
    ) => {
      return h('div', {}, [
        h(
          'div',
          {},
          `${desensitizationName(consignee_name)} ${desensitizationPhone(
            consignee_phone
          )}`
        ),
        h(
          'div',
          {},
          `${province} ${city} ${area} ${street} ${desensitizationAddress(
            address_detail,
            3
          )}`
        )
      ])
    }
  },
  {
    prop: 'express_center_id',
    label: '物流中台ID',
    minWidth: 180,
    align: 'center',
    render: (h, dat, row, index) => {
      return dat || '--'
    }
  },
  {
    prop: 'status',
    label: '物流状态',
    minWidth: 120,
    align: 'center',
    render: (h, status, row) => {
      const tagTypeMap = {
        2: 'info',
        3: '',
        4: 'danger',
        5: 'success',
        6: 'warning',
        7: 'danger'
      }

      return status
        ? h(
          'el-tag',
          { props: { type: tagTypeMap[status] }},
            $store?.state?.global?.baseDataMap?.express_status_map?.[status] || '失败'
        )
        : status
    }
  },
  {
    prop: 'response',
    label: '异常原因',
    align: 'center',
    minWidth: 180,
    render: (h, dat, row, index) => {
      return dat || '--'
    }
  },
  {
    prop: 'exchangePrice',
    label: '物流时效',
    minWidth: 180,
    align: 'center',
    render: (h, dat, { ctime, center_time, sign_time }) => {
      return h('div', {}, [
        h(
          'div',
          {},
          `创建：${ctime ? moment(+ctime).format('YYYY-MM-DD HH:mm:ss') : '--'}`
        ),
        h(
          'div',
          {},
          `审核：${
            center_time
              ? moment(+center_time).format('YYYY-MM-DD HH:mm:ss')
              : '--'
          }`
        ),
        h(
          'div',
          {},
          `签收：${
            sign_time ? moment(+sign_time).format('YYYY-MM-DD HH:mm:ss') : '--'
          }`
        )
      ])
    }
  },
  {
    prop: 'utime',
    label: '操作',
    action: true,
    name: 'action',
    align: 'center',
    fixed: 'right',
    width: 80
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    action: (_, row) => {
      let action = [
        {
          label: '物流进度',
          attr: {
            command: 'logisProcess'
          }
        }
      ]
      if (row.status === 2) {
        action = [
          {
            label: '立即推单',
            attr: {
              command: 'pass'
            }
          }
          // {
          //   label: '取消',
          //   attr: {
          //     command: 'cancel'
          //   }
          // }
          // ...action
        ]
      } else if (row.status === 3) {
        action = [
          // {
          //   label: '修改地址',
          //   attr: {
          //     command: 'modifyLogis'
          //   }
          // },
          ...action
        ]
      } else if (row.status === 4) {
        action = [
          {
            label: '立即推单',
            attr: {
              command: 'pass'
            }
          },
          ...action
        ]
      }
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini'
          },
          click: () => {},
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'hover'
            },
            command: (type, dat, row, index) => handleTableAction(type, row),
            item: action
          }
        }
      ]
    }
  }
}
