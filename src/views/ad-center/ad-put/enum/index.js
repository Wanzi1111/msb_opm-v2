// 用户定向的字典
const directionalEnum = {
  // 小熊美术-学生端App
  1: {
    // 语言版本
    languageVersion: [
      { label: '中文版', value: '0' },
      { label: '英文版', value: '1' },
      { label: '其他', value: '2' }
    ],
    // 付费类型
    userType: [
      { label: '付费', value: '1' },
      { label: '未付费', value: '2' }
    ],
    // 级别
    userLevel: [
      { label: 'S1', value: '1' },
      { label: 'S2', value: '2' },
      { label: 'S3', value: '3' }
    ],
    // 上课状态
    classStatus: [
      { label: '不限', value: '0' },
      { label: '待上课', value: '1' },
      { label: '上课中', value: '2' },
      { label: '已结课', value: '3' }
    ],
    // 用户区域
    userArea: [
      { label: '不限', value: '0' },
      { label: '国内', value: '1' },
      { label: '港澳台', value: '3' },
      { label: '海外', value: '2' }
    ]
  },
  // 美术宝书法-学生端App
  2: {
    // 付费类型
    userType: [
      { label: '付费', value: '1' },
      { label: '未付费', value: '2' }
    ]
  },
  // 小熊音乐-学生端App
  3: {
    // 付费类型
    userType: [
      { label: '不限', value: '0' },
      { label: '付费', value: '1' },
      { label: '未付费', value: '2' }
    ],
    // 用户区域
    sideType: [
      { label: '不限', value: '0' },
      { label: '国内', value: '1' },
      { label: '海外', value: '2' }
    ],
    weekShare: [
      { label: '不限', value: '0' },
      { label: '当期已参与', value: '1' },
      { label: '当期未参与', value: '2' }
    ]
  },
  // 美术宝1对1-学生端App
  4: {
    // 付费类型
    userType: [
      { label: '不限', value: '0' },
      { label: '游客', value: '3' },
      { label: '注册', value: '4' },
      { label: '1对1付费', value: '5' },
      { label: '班课付费', value: '6' }
    ],
    // 用户区域
    sideType: [
      { label: '不限', value: '0' },
      { label: '国内', value: '1' },
      { label: '海外', value: '2' }
    ],
    // 赠课类型
    givenType: [
      { label: '不限', value: '0' },
      { label: '新生半月', value: '1' },
      { label: '老生半月', value: '2' },
      { label: '老生月月', value: '3' },
      { label: '1对1无赠课', value: '5' },
      { label: '班课新生半月', value: '7' },
      // { label: '班课老生月月', value: '6' },
      { label: '班课老生月月-8节', value: '6' },
      { label: '班课老生月月-无限', value: '8' },
      { label: '班课无赠课', value: '4' }
    ],
    // 周周分享
    weekShare: [
      { label: '不限', value: '0' },
      { label: '当期已参与', value: '1' },
      { label: '当期未参与', value: '2' }
    ],
    weekShareFlag: [
      { label: '不限', value: '0' },
      { label: '有权限', value: '1' },
      { label: '无权限', value: '2' }
    ],
    // 赠课活动
    giveActivity: [
      { label: '不限', value: '0' },
      { label: '当期已参与', value: '1' },
      { label: '当期未参与', value: '2' }
    ],
    giveActivityFlag: [
      { label: '不限', value: '0' },
      { label: '有权限', value: '1' },
      { label: '无权限', value: '2' }
    ],
    goldShareFlag: [
      { label: '不限', value: '0' },
      { label: '有权限', value: '1' },
      { label: '无权限', value: '2' }
    ]
  },
  // 小熊艺术-学生端App
  5: {
    // 语言版本
    languageVersion: [
      { label: '不限', value: '3' },
      { label: '中文', value: '0' },
      { label: '英文', value: '1' }
    ],
    weekShare: [
      { label: '不限', value: '0' },
      { label: '当期已参与', value: '1' },
      { label: '当期未参与', value: '2' }
    ]
  },
  // 美术宝1对1-教师端App
  6: {
    // 授课类型
    awardedType: [
      { label: '不限', value: '0' },
      { label: '1对1', value: '1' },
      { label: '班课', value: '2' }
    ]
  }
}

const otherTypeLabels = [
  { value: '0', label: '跳转url' },
  { value: '1', label: '客户端跳转' },
  { value: '2', label: '小程序跳转' },
  { value: '5', label: '无跳转' }
]

// 新增投放类型map
const typeList = new Map([
  ['小熊美术-学生端App', 1],
  ['美术宝书画院-学生端App', 2],
  ['小熊音乐-学生端App', 3],
  ['美术宝1对1-学生端App', 4],
  ['美术宝1对1-微信公众号', 4],
  ['小熊艺术-学生端App', 5],
  ['小熊艺术-微信公众号', 5],
  ['美术宝1对1-教师端App', 6],
  ['小熊音乐-学生端小程序', 3],
  ['Artworld-用户端App', 7],
  ['美术宝1对1-PC端', 8]
])

const rules = {
  publishName: [{ required: true, message: '请输入主题名称', trigger: 'blur' }],
  otherType: [{ required: true, message: '请选择跳转类型', trigger: 'change' }],
  otherUrl: [{ required: true, message: '请输入跳转页面', trigger: 'blur' }]
}

export {
  directionalEnum,
  otherTypeLabels,
  typeList,
  rules
}
