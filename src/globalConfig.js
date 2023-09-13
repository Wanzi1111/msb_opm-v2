/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zhangjiawen
 * @Date: 2020-10-29 20:55:04
 * @LastEditors: ZhangYeLei
 * @LastEditTime: 2022-05-25 11:46:03
 */

import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
  const activityPath = [
    '/activity-center/activity'
  ]
  const adConfigPath = [
    '/ad-center/ad-position-new',
    '/points-mall/create-marketing',
    '/ad-center/ad-put'
  ]
  const opConfigPath = [
    '/ad-center/Operat',
    '/ad-center/Operat/operationPosition',
    '/ad-center/ad-position-new',
    '/ad-center/ad-put'
  ]
  const mallConfigPath = [
    '/points-mall/mall-admin',
    '/points-mall/create-marketing',
    '/points-mall/classified-admin',
    '/points-mall/order-admin',
    '/points-mall/create-good',
    '/points-mall/recommend'
  ]
  const screenshotConfigPath = [
    '/examine/screenshot-approval'
  ]
  const framingPath = ['/app-content/framing-admin']
  const userGroupPath = ['/intelligent-marketing/user-group', '/intelligent-marketing/user-group-detail']
  const marketingPushPath = ['/intelligent-marketing/marketing-push', '/intelligent-marketing/operation-plan', '/intelligent-marketing/marketing-push-detail']
  const marketingPushCall = ['/intelligent-marketing/marketing-call', '/intelligent-marketing/create-marketing-call-plan', '/intelligent-marketing/marketing-push-detail']
  const ivrManage = ['/intelligent-marketing/ivr-manage']
  const adCenterUserGroup = ['/ad-center/ad-put/add']
  const systemMessage = ['/system-message/message-manage', '/system-message/create-message']
  const pointsMallOrder = ['/points-mall/point-order']
  const communityCouponCodeManage = ['/community-coupon-code-manage/list', '/community-coupon-code-manage/detail']

  if (activityPath.includes(to.path)) {
    await store.dispatch('app/getActivityConfig')
  }
  if (adConfigPath.includes(to.path)) {
    await store.dispatch('app/getAdConfig')
    await store.dispatch('app/getArtConfig')
  }
  if (opConfigPath.includes(to.path)) {
    await store.dispatch('app/getOperatConfig')
  } else if (mallConfigPath.includes(to.path)) {
    await store.dispatch('app/getMallConfig')
  } else if (framingPath.includes(to.path)) {
    await store.dispatch('framingAdmin/getListFrameTypeAll')
  } else if (screenshotConfigPath.includes(to.path)) {
    await store.dispatch('global/codeScreenshotApproval')
  } else if (userGroupPath.includes(to.path)) {
    await store.dispatch('intelligentMarketing/getBIToken')
    await store.dispatch('intelligentMarketing/getRootList')
  } else if (marketingPushPath.includes(to.path)) {
    await store.dispatch('intelligentMarketing/getBIToken')
    await store.dispatch('intelligentMarketing/getPushDinc')
  } else if (marketingPushCall.includes(to.path)) {
    await store.dispatch('intelligentMarketing/getBIToken')
    await store.dispatch('intelligentMarketing/getMarketingCallDict')
    await store.dispatch('intelligentMarketing/getRootList')
  } else if (adCenterUserGroup.includes(to.path)) {
    await store.dispatch('intelligentMarketing/getBIToken')
  } else if (systemMessage.includes(to.path)) {
    await store.dispatch('message/getMessageDict')
    await store.dispatch('intelligentMarketing/getPushDinc')
  } else if (ivrManage.includes(to.path)) {
    await store.dispatch('intelligentMarketing/getIvrDict')
  } else if (pointsMallOrder.includes(to.path)) {
    await store.dispatch('pointsMallOrder/getPointMallOrderBaseData')
  } else if (communityCouponCodeManage.includes(to.path)) {
    await store.dispatch('communityCouponCodeManage/handleBaseData')
  }
  next()
})
