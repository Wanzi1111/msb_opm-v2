/**
 * advert/tasks/columns/list.js
 */
export const TASKSBUTTONS = {
  0: 'el-icon-circle-check',
  1: 'el-icon-circle-close'
}

export const TASKSTYPE = {
  0: 'success',
  1: 'danger'
}

// const STATE = function (h, dat) {
//   h('el-tag', {
//     props: {
//       type: TYPEOBJ[dat].type
//     }
//   }, TYPEOBJ[dat].name)
// }

export const LABELSTATE = {
  0: '启用',
  1: '禁用'
}

// 直播管理 用户身份
const USER_STATUS_LABEL = [
  { 'name': '游客', 'value': 0 },
  { 'name': '仅注册未购买用户', 'value': 1 },
  { 'name': '已购买体验课用户', 'value': 2 }
  // { 'name': '已购买系统课用户', 'value': 3 }
]

/**
 * 直播管理 start
 */
const TRIAL_TYPE_LABEL = [
  { 'name': '19单周体验课', 'value': 2 },
  { 'name': '双周体验课', 'value': 0 },
  { 'name': '9.9单周体验课', 'value': 1 }
]

const live_coures_type_label = [
  {
    'label': 'M1',
    'value': 'M1'
  },
  {
    'label': 'M2',
    'value': 'M2'
  },
  {
    'label': 'M3',
    'value': 'M3'
  }
]

const live_coures_type_label_ms = [
  {
    'label': 'S1',
    'value': 'S1'
  },
  {
    'label': 'S2',
    'value': 'S2'
  },
  {
    'label': 'S3',
    'value': 'S3'
  }
]

const COURSE_INFOR = [
  // { 'label': '招生排期', 'value': 'tnManagementId' },
  // { 'label': '招生排期', 'value': 'fnManagementId' },
  { 'label': '课程级别', 'value': 'tnSup' },
  { 'label': '课程级别', 'value': 'fnSup' },
  { 'label': '课程级别', 'value': 'onSup' },
  { 'label': '系统课转化', 'value': 'tnUserStatus' },
  { 'label': '系统课转化', 'value': 'fnUserStatus' },
  { 'label': '系统课转化', 'value': 'onUserStatus' }
]

const BUSINESS_TYPE = [
  { 'label': '美术宝1v1', 'value': '101' },
  { 'label': '小熊艺术', 'value': '103' },
  { 'label': '小熊书法', 'value': '104' },
  { 'label': '小熊音乐', 'value': '105' }
]

const live_system_status = [
  {
    'label': '已购年课',
    'value': 0
  },
  {
    'label': '已购半年课',
    'value': 2
  },
  {
    'label': '未转化',
    'value': 1
  }
]

const live_system_status_ms = [
  {
    'label': '已购系统课',
    'value': 0
  },
  {
    'label': '未购系统课',
    'value': 1
  }
]

const live_recruit_students = {
  0: '待开始',
  1: '招生中',
  2: '待开课',
  3: '上课中',
  4: '已结课'
}

const trtal_type_label_all = [
  { 'name': '29元体验课', 'value': 2 },
  { 'name': '49元体验课', 'value': 0 }
]

const course_infor_all = [
  // { 'label': '招生排期', 'value': 'tnManagementId' },
  // { 'label': '招生排期', 'value': 'fnManagementId' },
  { 'label': '课程级别', 'value': 'tnSup' },
  { 'label': '课程级别', 'value': 'fnSup' },
  { 'label': '系统课转化', 'value': 'tnUserStatus' },
  { 'label': '系统课转化', 'value': 'fnUserStatus' }
]

/**
 * 直播管理 end
 */

/**
  * 裱框管理 start
  */
const FRAMING_ADMIN_SELECT = [
  { label: '全部', value: 0 },
  { label: '纯色裱框', value: 1 },
  { label: '纹理裱框', value: 2 },
  { label: '场景裱框', value: 3 },
  { label: '大片裱框', value: 4 }
]

const FRAMING_ADMIN_STATUS = [
  { label: '全部', value: -1 },
  { label: '上架', value: 1 },
  { label: '下架', value: 0 }
]

const FRAMING_ADMIN_PICTUREBOX = [
  { label: '白色相框', value: 1 },
  { label: '黑色相框', value: 2 },
  { label: '木质相框', value: 3 }
]

/**
  * 裱框管理 end
  */
export {
  FRAMING_ADMIN_SELECT,
  FRAMING_ADMIN_STATUS,
  FRAMING_ADMIN_PICTUREBOX,
  USER_STATUS_LABEL,
  TRIAL_TYPE_LABEL,
  COURSE_INFOR,
  BUSINESS_TYPE
  // TRIAL_COURSE_TYPE_LABEI_MS,
  // SYSTEM_STATUS_MS
}

/**
 * 运营维护-活动审核管理 start
 */
const review_activity_names = [ // 活动名称
  { label: '双旦活动', value: '5' },
  { label: '教师节', value: '4' },
  { label: '母亲节', value: '1' },
  { label: '儿童节', value: '2' },
  { label: '童话航天梦', value: '3' }
]

const review_activity_reject = [ // 审核驳回 驳回内容
  { label: '您上传的作品不清晰，请您重新拍摄上传。', value: '您上传的作品不清晰，请您重新拍摄上传。' },
  { label: '新年相关创意未在画作中突出展示，请您重新上传，上传审核通过后即得600金币哦～', value: '新年相关创意未在画作中突出展示，请您重新上传，上传审核通过后即得600金币哦～' },
  { label: '为了更好地展示宝贝作品，画面请勿出现作品以外的人物或物品。', value: '为了更好地展示宝贝作品，画面请勿出现作品以外的人物或物品。' },
  { label: '请您去掉宝贝作品边框后，重新上传。', value: '请您去掉宝贝作品边框后，重新上传。' },
  { label: '宝贝画的特别好，请您调整拍摄角度，作品方向为正，重新上传哦～。', value: '宝贝画的特别好，请您调整拍摄角度，作品方向为正，重新上传哦～。' },
  { label: '您上传的不是宝贝的绘画作品，请您重新上传。', value: '您上传的不是宝贝的绘画作品，请您重新上传。' },
  { label: '其他', value: '其他' }
]
/**
 * 运营维护-活动审核管理 end
 */

/**
 * 转介绍截图审批页  start
*/
const screenshot_approval_statistic = [
  { label: '全部', type: 'info', value: '0', videoCount: 389 },
  { label: '审核驳回', type: 'warning', value: '1', videoCount: 389 },
  { label: '审核成功', type: 'success', value: '2', videoCount: 389 },
  { label: '审核异常', type: 'warning', value: '3', videoCount: 389 }
]

const screenshot_approval_tab_list = [ // 转截图tab
  { label: '1v1美术', key: 'OneByOne' }
  // { label: '小熊美术', key: 'Arts' }
]

const screenshot_approval_activity_type = [ // 转介绍截图审批，活动类型字典
  { label: '首单后分享（5元红包）', value: 'AFTER_FIRST_ORDER_SHARE' },
  { label: '周周分享（小熊币）', value: 'SHARE_TASK' }
]

/**
 * 转介绍截图审批页  end
*/

/**
 * 营销玩法  begin
*/

const activity_status = [
  { label: '进行中', value: '1' },
  { label: '未开始', value: '2' },
  { label: '活动已结束', value: '3' },
  { label: '失效', value: '4' }
]

const activity_business_type = [
  { label: '美术宝1V1', value: '1' },
  { label: '小熊美术', value: '2' },
  { label: '美术宝写字', value: '3' },
  { label: '小熊音乐', value: '4' },
  { label: '书画院', value: '5' }
]

const activity_model_type = [
  { label: '人员模式', value: 'PERSON' },
  { label: '次数模式', value: 'TIMES' }
]

/**
 * 营销玩法  end
*/
// 小熊作品审核 start
const square_examine_type_enum = [
  { label: '自动审核通过', value: 0, type: 'success' },
  { label: '馆藏', value: 2, type: 'warnig' },
  { label: '前30', value: 1, type: 'primary' }
]
// 小熊作品审核 end

/**
 * 广告中心-运营位管理 start
 */

const user_type = [ // 付费类型
  { label: '不限', value: '0' },
  { label: '游客', value: '3' },
  { label: '注册', value: '4' },
  { label: '1对1付费', value: '5' },
  { label: '班课付费', value: '6' }
]

const user_area = [ // 用户区域
  { label: '不限', value: '0' },
  { label: '国内', value: '1' },
  { label: '海外', value: '2' }
]

const user_state_1v1 = [ // 用户状态 1v1
  { label: '不限', value: '0' },
  { label: '未付费', value: '1' },
  { label: '已付费', value: '2' }
]

const given_type = [ // 赠课类型
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
]

const week_share = [ // 周周分享
  { label: '不限', value: '0' },
  { label: '当期已参与', value: '1' },
  { label: '当期未参与', value: '2' }
]

const weekShare_flag = [ // 周周分享参加权限
  { label: '不限', value: '0' },
  { label: '有权限', value: '1' },
  { label: '无权限', value: '2' }
]

const give_activity = [ // 赠课活动
  { label: '不限', value: '0' },
  { label: '当期已参与', value: '1' },
  { label: '当期未参与', value: '2' }
]

const giveActivity_flag = [ // 赠课活动参加权限
  { label: '不限', value: '0' },
  { label: '有权限', value: '1' },
  { label: '无权限', value: '2' }
]

// const gold_share_flag = [ // 瓜分金币参加权限
//   { label: '不限', value: '0' },
//   { label: '有权限', value: '1' },
//   { label: '无权限', value: '2' }
// ]

const user_state = [ // 用户定向
  { label: '不限', value: '0' },
  { label: '未付费', value: '1' },
  { label: '已购美术体验课', value: '2' },
  { label: '已购美术系统课', value: '3' },
  { label: '已购书法体验课', value: '4' },
  { label: '已购书法系统课', value: '5' }
]

const languageVersionObj = [ // 语言版本
  { label: '不限', value: '3' },
  { label: '中文', value: '0' },
  { label: '英文', value: '1' }
]

/**
 * 广告中心-运营位管理 end
 */

/**
 * 积分商城-物流单管理 start
 */
const express_status = [
  { label: '待发货', value: '2' },
  { label: '已发货', value: '3' },
  { label: '已完成', value: '5' },
  { label: '物流无效', value: '6' },
  { label: '已撤回', value: '7' },
  { label: '下单失败（系统）', value: 'system' },
  { label: '下单失败（人工）', value: 'artificial' }
]
/**
 * 积分商城-物流单管理 end
 */
/**
 * 积分商城-营销活动 start
 */
const marketing_activity_goods_type = [ // 商品类型
  { label: '实物', value: 'INKIND' },
  { label: '轻课', value: 'THIRD_COURSE' },
  { label: '卡密', value: 'CARD_CODE' }
]

const marketing_activity_line = [
  { label: '美术宝1对1', value: '1' },
  { label: '小熊艺术', value: '2' }
]
/**
 * 积分商城-营销活动 end

/**
 * 智能营销 start
 */
const marketing_intrigger_type_list = [ // 触发时机
  { label: '即时', value: '1' },
  { label: '定时-单次', value: '2' },
  { label: '定时-重复', value: '3' },
  { label: '触发型-完成A', value: '4' },
  { label: '触发型-完成A未完成B', value: '5' }
]

const marketing_week_list = [ // 时段
  { label: '每天', value: 0 },
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
  { label: '周四', value: 4 },
  { label: '周五', value: 5 },
  { label: '周六', value: 6 },
  { label: '周日', value: 7 }
]

const marketing_do_not_disturb_list = [ // 勿扰
  { label: '关闭', value: '0' },
  { label: '开启', value: '1' }
]

const marketing_trigger_limit = [ // 触发限制
  { label: '此计划仅触发1次', value: '0' },
  { label: '可触发多次', value: '1' }
]

const marketing_trigger_limit_list = [ // 触发限制
  { label: '天内', value: '4' }
]

const marketing_trigger_time_delay = [ // 触发时机-完成A未完成B
  { label: '立即触达', value: '1' },
  { label: '延迟触达', value: '2' }
]

const marketing_trigger_time_delay_list = [ // 触发时机-延迟触发
  { label: '秒', value: '1' },
  { label: '分钟', value: '2' },
  { label: '小时', value: '3' },
  { label: '天', value: '4' }
]

const marketing_push_status = [ // push 状态
  { label: '已停用', value: '0' },
  { label: '运行中', value: '1' },
  { label: '已结束', value: '2' }
]

/**
 * 智能营销 end
 */

/**
 * 社群券码列表 start
 */
const community_coupon_code_status = [ // push 状态
  { label: '已停用', value: '0' },
  { label: '启用中', value: '1' },
  { label: '已结束', value: '2' }
]
/**
 * 社群券码列表 end
 */

export default {
  screenshot_approval_statistic,
  screenshot_approval_tab_list,
  live_system_status,
  live_system_status_ms,
  live_coures_type_label,
  live_coures_type_label_ms,
  review_activity_names,
  review_activity_reject,
  screenshot_approval_activity_type,
  live_recruit_students,
  course_infor_all,
  trtal_type_label_all,
  activity_status,
  activity_model_type,
  activity_business_type,
  square_examine_type_enum,
  user_area,
  user_type,
  user_state,
  given_type,
  user_state_1v1,
  week_share,
  weekShare_flag,
  give_activity,
  giveActivity_flag,
  languageVersionObj,
  express_status,
  marketing_activity_goods_type,
  marketing_activity_line,
  marketing_intrigger_type_list,
  marketing_week_list,
  marketing_do_not_disturb_list,
  marketing_trigger_limit,
  marketing_trigger_limit_list,
  marketing_trigger_time_delay,
  marketing_trigger_time_delay_list,
  marketing_push_status,
  community_coupon_code_status
}
