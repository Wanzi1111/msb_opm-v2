import moment from 'moment'

function handleLabel(val) {
  const labelData = JSON.parse(localStorage.getItem('dataLabel'))
  const str = val.split(',')
  const arr = []

  str.map(item => {
    labelData && labelData.map((list, idx) => {
      if (+item === +list.label) {
        arr.push(list.value)
      }
    })
  })
  return arr.join(',')
}
export default [
  {
    fixed: true,
    prop: 'id',
    label: '序号',
    align: 'center',
    minWidth: 80
  },

  {
    prop: 'username',
    label: '评价人',
    align: 'center',
    minWidth: 120,
    render: (h, dat, row, index) => {
      return (
        <div>
          <p>
            {dat}({row.age}岁)
          </p>
          <p>{row.userPhone}</p>
          <p>uid:{row.uid}</p>
        </div>
      )
    }
  },
  {
    prop: 'datetime',
    label: '上课时间',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'lessonType',
    label: '课程类型',
    minWidth: 'center',
    render: (h, dat, row, index) => {
      return ['试听课', '正式课'][dat - 1]
    }
  },
  {
    prop: 'teacherName',
    label: '上课老师',
    align: 'center',
    minWidth: 120,
    render: (h, dat, row, index) => {
      return (
        <div>
          <p>{row.teacherName || '无'}</p>
          <p>ID:{row.tid || '无'}</p>
        </div>
      )
    }
  },
  {
    prop: 'salesName',
    label: '责任人',
    align: 'center',
    minWidth: 120,
    showOverflowTooltip: true,
    render: (h, dat, row, index) => {
      const {
        lessonType,
        saleMobile,
        moniterName,
        teacherMobile,
        teacherMoniter,
        teacherMoniterMobile
      } = row
      const responsible =
        lessonType === 1
          ? `课程顾问：${dat} ${saleMobile || ''}`
          : `班主任：${moniterName || ''} ${teacherMobile || ''}`
      const teacherMaster = teacherMoniter ? ` / 教管：${teacherMoniter || ''} ${teacherMoniterMobile || ''}` : ''
      const composeString = `${responsible} ${teacherMaster}`
      return composeString
    }
  },
  {
    prop: 'stcommentStar',
    label: '评价分数',
    align: 'center',
    minWidth: 80,
    render: (h, dat, row, index) => {
      return `${dat}星`
    }
  },
  // 新加
  {
    prop: 'likeTeachersLesson',
    label: '是否继续上课',
    align: 'center',
    minWidth: 100,
    render: (h, dat) => {
      return +dat === 1 ? (
        <span style='color:green;'>愿意</span>
      ) : +dat === 2 ? (
        <span style='color:red;'>不愿意</span>
      ) : (
        <span>未勾选</span>
      )
    }
  },
  // 新加
  {
    prop: 'stcommentLabel',
    label: '评价标签',
    align: 'center',
    showOverflowTooltip: true,
    minWidth: 120,
    render: (h, dat, row, index) => {
      return handleLabel(dat)
      // <el-popover
      //   placement="top-start"
      //   title="评价标签"
      //   width="200"
      //   trigger="hover"
      //   content="handleLabel(dat)"
      // >
      //   <p>{handleLabel(dat)}</p>

      //   <p
      //     slot="reference"
      //     style="overflow:text-overflow: ellipsis; hidden;display: -webkit-box;-webkit-line-clamp: 2; -webkit-box-orient: vertical;margin: 0;  "
      //   >
      //     {handleLabel(dat)}
      //   </p>
      // </el-popover>
    }
  },
  {
    prop: 'stcommentStarDesc',
    label: '评价内容',
    align: 'center',
    minWidth: 120,
    showOverflowTooltip: true,
    render: (h, dat, row, index) => {
      const txt = (dat || '').replace(/\s+/g, '')
      const clearBr = str => {
        str = str.replace(/<\/?.+?>/g, '')
        str = str.replace(/[\r\n]/g, '')
        return str
      }
      return clearBr(txt)
    }
  },
  {
    prop: 'createTime',
    label: '评价时间',
    align: 'center',
    minWidth: 100,
    render: (h, dat, row, index) => {
      return moment(dat).format('YYYY-MM-DD HH:mm:ss')
    }
  },

  {
    prop: 'del',
    label: '是否有效',
    align: 'center',
    minWidth: 100,
    render: (h, dat, row, index) => ['是', '否', ''][dat] || ''
  }
  // {
  //   action: true,
  //   name: 'action',
  //   fixed: 'right',
  //   prop: 'action',
  //   width: 120,
  //   label: '操作',
  //   align: 'center'
  // }
]
export const actions = ({ setInvaild }) => {
  return {
    action: (dat, row, index) => {
      let putBtn = {}
      if (!row.del) {
        putBtn = {
          label: '设为无效',
          attr: {
            size: 'mini',
            icon: 'el-icon-success',
            type: 'success'
          }
        }
      } else {
        putBtn = {
          label: '取消无效',
          attr: {
            size: 'mini',
            icon: 'el-icon-warning',
            type: 'danger'
          }
        }
      }
      return [
        {
          type: 'button',
          click: setInvaild,
          ...putBtn
        }
      ]
    }
  }
}
