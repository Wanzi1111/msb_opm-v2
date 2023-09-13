let videoView = () => { }
export function setActions(actions) {
  ({ videoView = videoView } = actions)
}
export default (rowKey) => {
  return [
    {
      fixed: true,
      type: 'selection',
      width: 50,
      align: 'center',
      reserveSelection: true
    },
    {
      prop: 'teamName',
      label: '班级',
      align: 'center',
      minWidth: 100
    },
    {
      prop: 'teamNumber',
      label: '班级人数',
      align: 'center'
    },
    {
      prop: 'courseCycle',
      label: '课程周期',
      align: 'center'
    }

  ]
}
