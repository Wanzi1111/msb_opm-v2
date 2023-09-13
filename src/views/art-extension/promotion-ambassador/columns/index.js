export default [
  {
    fixed: true,
    prop: 'spreadUserName',
    label: '姓名-等级',
    minWidth: 150,
    slot: 'info',
    align: 'center'
  },
  {
    prop: 'spreadUserId',
    label: 'ID',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'phone',
    label: '手机号-微信号',
    slot: 'phone',
    minWidth: 130,
    align: 'center'
  },
  {
    prop: 'qianyueTime',
    label: '报名时间-审核时间-签约时间',
    slot: 'qianyueTime',
    minWidth: 200,
    align: 'center'
  },
  {
    prop: 'statusInfo',
    label: '状态',
    minWidth: 120,
    align: 'center',
    render: (h, dat) => {
      let tag
      switch (dat) {
        case '已审核':
          tag = h('el-tag', { props: { type: 'success' }}, '已审核')
          break
        case '已关闭':
          tag = h('el-tag', { props: { type: 'danger' }}, '已关闭')
          break
        case '正常':
          tag = h('el-tag', { props: { type: 'info' }}, '正常')
          break
        case '已淘汰':
          tag = h('el-tag', { props: { type: 'warning' }}, '已淘汰')
          break
      }
      return tag
    }
  },
  {
    prop: 'guanbiTime',
    label: '关停时间-关停原因',
    slot: 'guanbiTime',
    minWidth: 160,
    align: 'center'
  },
  {
    prop: 'pid',
    label: '上级推荐大使ID',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'numberOfReferrals',
    label: '推荐人数',
    minWidth: 80,
    align: 'center'
  },
  {
    prop: 'oder',
    label: '订单(总-体-系)',
    slot: 'oder',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'withdrawalBalance',
    label: '未提现金额',
    minWidth: 160,
    render: (h, dat, row, index) => {
      return String(row.withdrawalBalance) ? String(row.withdrawalBalance) : '-'
    },
    align: 'center'
  },
  {
    props: 'audit_status',
    solt: 'audit_status',
    action: true,
    name: 'action',
    label: '操作',
    minWidth: 100,
    align: 'center',
    fixed: 'right'
  }
]

export const tableAction = ({ tableAction }) => ({
  action: (dat, row, index) => {
    const wechatObj = {
      type: 'button', // 按钮
      attr: {
        icon: 'el-icon-more',
        size: 'mini'
      },
      click: () => {},
      dropdown: true, // 设置了dropdown，组件本身的事件失效
      dropdownConfig: {
        attr: {
          trigger: 'click'
        },
        command: (e, dat, row, index) => tableAction(dat, row, index, e),
        item: [
          {
            label: row.addWechat === 1 ? '未加v' : '已加v',
            attr: {
              command: 'addWeChat'
            }
          }
        ]
      }
    }
    switch (row.statusInfo) {
      case '已报名':
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
                trigger: 'click'
              },
              command: (e, dat, row, index) => tableAction(dat, row, index, e),
              item: [
                {
                  label: '审核',
                  attr: {
                    command: 'toExamine'
                  }
                },
                {
                  label: row.addWechat === 1 ? '未加v' : '已加v',
                  attr: {
                    command: 'addWeChat'
                  }
                }
              ]
            }
          }
        ]
      case '已审核':
        return [wechatObj]
      case '已淘汰':
        return [wechatObj]
      case '考核中':
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
                trigger: 'click'
              },
              command: (e, dat, row, index) => tableAction(dat, row, index, e),
              item: [
                {
                  label: '编辑',
                  attr: {
                    command: 'editRow'
                  }
                },
                {
                  label: '关闭',
                  attr: {
                    command: 'closeRow'
                  }
                },
                {
                  label: row.addWechat === 1 ? '未加v' : '已加v',
                  attr: {
                    command: 'addWeChat'
                  }
                }
              ]
            }
          }
        ]
      case '正常':
        // eslint-disable-next-line no-case-declarations
        const cls = [
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
                trigger: 'click'
              },
              command: (e, dat, row, index) => tableAction(dat, row, index, e),
              item: [
                {
                  label: '编辑',
                  attr: {
                    command: 'editRow'
                  }
                },
                {
                  label: '关闭',
                  attr: {
                    command: 'closeRow'
                  }
                },
                {
                  label: row.addWechat === 1 ? '未加v' : '已加v',
                  attr: {
                    command: 'addWeChat'
                  }
                }
              ]
            }
          }
        ]
        if ([1, 2].includes(row.level)) {
          cls[0].dropdownConfig.item.push({
            label: `${+row.pidStatus ? '关闭' : '开启'}二级`, // pidStatus 1:开启 0:关闭。此处渲染取反
            attr: {
              command: 'ediSecondLevel'
            }
          },)
        }
        return cls
      case '已关闭':
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
                trigger: 'click'
              },
              command: (e, dat, row, index) => tableAction(dat, row, index, e),
              item: [
                {
                  label: '恢复',
                  attr: {
                    command: 'recovery'
                  }
                },
                {
                  label: row.addWechat === 1 ? '未加v' : '已加v',
                  attr: {
                    command: 'addWeChat'
                  }
                }
              ]
            }
          }
        ]
    }
  }
})

