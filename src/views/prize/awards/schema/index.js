/*
 * @Author: yelei
 * @Date: 2020-11-06 16:17:56
 * @LastEditors: yelei
 * @LastEditTime: 2020-11-07 19:05:50
 * @Description: 奖品管理枚举
 */

export const PRIZE_TYPE_ENUM = [
  { label: '试听奖励', value: 1 },
  { label: '分享海报奖励', value: 2 },
  { label: '排行榜奖励', value: 3 },
  { label: '月度转介绍活动', value: 4 },
  { label: '集卡赢好礼', value: 5 },
  { label: '双十一活动', value: 7 }
]

export const EXPRESS_STATUS_ENUM = [
  { label: '待领取', value: 1, name: 'pending' },
  { label: '待回填', value: 2, name: 'backfilled' },
  { label: '已下单', value: 3, name: 'orderplaced' },
  { label: '下单失败', value: 4, name: 'orderfail' }
]
