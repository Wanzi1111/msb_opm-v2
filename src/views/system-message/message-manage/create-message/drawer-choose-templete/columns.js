export const tempColumns = [
  {
    prop: 'messageType',
    label: '消息类型',
    align: 'center',
    minWidth: 80,
    render: (_, messageType) => ['', '通知', '营销'][~~messageType]
  },
  {
    prop: 'templateId',
    label: '模板/场景ID',
    align: 'center',
    minWidth: 80,
    render: (_, __, { templateId, scenarioId }) => scenarioId || templateId
  },
  {
    prop: 'templateTitle',
    label: '标题',
    align: 'center',
    minWidth: 120,
    render: (_, __, { templateTitle, scenarioName }) => scenarioName || templateTitle
  },
  {
    prop: 'messageContent',
    label: '模板内容',
    align: 'center',
    showOverflowTooltip: true,
    minWidth: 140
  },
  {
    prop: 'desc',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right',
    action: true,
    name: 'action'
  }
]

export const tableAction = ({ handleCheck }) => {
  return {
    action: (dat, row, index) => {
      if (!row.checked) {
        return [
          {
            type: 'button',
            label: '选 中',
            click: () => handleCheck('check', [row]),
            attr: {
              plain: true,
              type: 'primary'
            }
          }
        ]
      } else {
        return [
          {
            type: 'button',
            label: '取消选中',
            click: () => handleCheck('uncheck', row),
            attr: {
              plain: true,
              type: 'warning'
            }
          }
        ]
      }
    }
  }
}
