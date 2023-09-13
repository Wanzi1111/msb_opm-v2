import moment from 'moment'
import { Tag } from 'element-ui'

const EVALUATION_TAG_DEFAULT = [
  {
    label: '全部',
    value: 0
  }
]
const EVALUATION_TAG_2 = [
  {
    label: '点评亲切',
    value: '点评亲切'
  },
  {
    label: '专业度高',
    value: '专业度高'
  },
  {
    label: '有具体建议',
    value: '有具体建议'
  },
  {
    label: '孩子喜欢',
    value: '孩子喜欢'
  }
]
const EVALUATION_TAG_1 = [
  {
    label: '点评有噪音',
    value: '点评有噪音'
  },
  {
    label: '点评无重点',
    value: '点评无重点'
  },
  {
    label: '点评不明确',
    value: '点评不明确'
  },
  {
    label: '语调平平',
    value: '语调平平'
  }
]
const EVALUATION_TAG_0 = [
  {
    label: '点评太笼统',
    value: '点评太笼统'
  },
  {
    label: '专业度低',
    value: '专业度低'
  },
  {
    label: '语气生硬',
    value: '语气生硬'
  },
  {
    label: '噪音严重',
    value: '噪音严重'
  }
]

const SearchsConfig = [
  {
    prop: 'user_num',
    label: '用户UID',
    type: 'inputNumber', // 选择器,
    attr: {
      placeholder: '请输入用户UID',
      min: -2147483648,
      max: 2147483648,
      controlsPosition: 'right',
      class: 'input-number-left'
    }
  },
  {
    prop: 'course_type',
    label: '课程属性',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部'
    },
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '体验课',
        value: 1
      },
      {
        label: '系统课',
        value: 2
      }
    ]
  },
  {
    prop: 'feedback_type',
    label: '评价等级',
    type: 'select', // 选择器,
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '满意',
        value: 2
      },
      {
        label: '一般',
        value: 1
      },
      {
        label: '不满意',
        value: 0
      }
    ]
  },
  // {
  //   prop: 'content',
  //   label: '评价内容',
  //   type: 'select', // 选择器,
  //   attr: {
  //     placeholder: '全部'
  //   },
  //   options: [
  //     {
  //       label: '全部',
  //       value: ''
  //     },
  //     {
  //       label: '有',
  //       value: 1
  //     },
  //     {
  //       label: '无',
  //       value: 0
  //     }
  //   ]
  // },
  {
    prop: 'tag',
    label: '评价标签',
    type: 'select', // 选择器,
    // defaultVal: 0,
    attr: {
      placeholder: '全部',
      multiple: true,
      clearable: true,
      collapseTags: true
    },
    options: [
      // ...EVALUATION_TAG_DEFAULT,
      ...EVALUATION_TAG_0,
      ...EVALUATION_TAG_1,
      ...EVALUATION_TAG_2
    ]
  },
  {
    prop: 'task_time',
    label: '上课时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59']
    },
    actions: {}
  }
]

const ColumnsConfig = [
  {
    fixed: true,
    prop: 'id',
    label: '序号',
    align: 'center',
    minWidth: 80,
    type: 'selection',
    selectable: (row) => !row.state
  },
  {
    prop: 'teacher_name',
    label: '老师姓名-ID',
    align: 'center',
    minWidth: 120,
    render: (h, dat, row, index) =>
      // <div>
      //   <div>{dat || '无'}</div>
      //   <div>ID:{row.sale_id || '无'}</div>
      // </div>
      h('div', {}, [
        h('div', {}, dat || '无'),
        h('div', {}, dat || `ID: ${row.sale_id || '无'}`),
      ])
  },
  {
    prop: 'username',
    label: '学生姓名-UID',
    align: 'center',
    minWidth: 120,
    render: (h, dat, row, index) =>
      // <div>
      //   <div>{dat || '无'}</div>
      //   <div>UID:{row.user_num || '无'}</div>
      // </div>
      h('div', {}, [
        h('div', {}, dat || '无'),
        h('div', {}, dat || `UID: ${row.user_num || '无'}`),
      ])
  },
  {
    prop: 'master_name',
    label: '班主任-电话',
    align: 'center',
    minWidth: 120,
    render: (h, dat, row, index) =>
      // <div>
      //   <div>{dat || '无'}</div>
      //   <div>电话:{row.master_mobile || '无'}</div>
      // </div>
      h('div', {}, [
        h('div', {}, dat || '无'),
        h('div', {}, dat || `电话: ${row.master_mobile || '无'}`),
      ])
  },
  {
    prop: 'course_type_text',
    label: '课程属性',
    align: 'center',
    minWidth: 120,
    render: (h, dat, row, index) => dat || '无'
  },
  {
    prop: 'lesson_type_text',
    label: '课程类型',
    align: 'center',
    minWidth: 120,
    showOverflowTooltip: true,
    render: (h, dat, row, index) => dat || '无'
  },
  {
    prop: 'feedback_type',
    label: '评价等级',
    align: 'center',
    minWidth: 80,
    render: (h, dat, row, index) => !!dat || dat === 0 ? <Tag type={['danger', 'warning', 'success'][~~dat]}>{row.feedback_type_text}</Tag> : null
  },
  {
    prop: 'tag',
    label: '评价标签',
    align: 'center',
    showOverflowTooltip: true,
    minWidth: 120
  },
  {
    prop: 'content',
    label: '评价内容',
    align: 'center',
    minWidth: 120,
    showOverflowTooltip: true
  },
  {
    prop: 'ctime',
    label: '评价时间',
    align: 'center',
    minWidth: 100,
    render: (h, dat, row, index) => dat ? moment(Number(dat)).format('YYYY-MM-DD HH:mm:ss') : '无'
  },
  {
    action: true,
    name: 'action',
    fixed: 'right',
    prop: 'action',
    width: 120,
    label: '操作',
    align: 'center'
  }
]

const Actions = ({ setInvaild }) => {
  return {
    action: (dat, row, index) => {
      let putBtn = {}
      if (!row.state) {
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

export {
  EVALUATION_TAG_DEFAULT, // 评级标签
  EVALUATION_TAG_0,
  EVALUATION_TAG_1,
  EVALUATION_TAG_2,
  SearchsConfig, // 搜索框配置
  ColumnsConfig, // 表格配置
  Actions // 表格事件
}
