
const rules = {
  businessType: [{ required: true, message: '请输入主题名称', trigger: 'blur' }],
  activityTypeId: [{ required: true, message: '请选择分类类型', trigger: 'change' }],
  activityName: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
  jumpUrl: [{ required: true, message: '请输入跳转页面', trigger: 'blur' }],
  activityCoverUrl: [{ required: true, message: '请上传图标', trigger: 'blur' }]
}

export {
  rules
}
