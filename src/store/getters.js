/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zhangjiawen
 * @Date: 2020-10-29 20:55:04
 * @LastEditors: ZhangYeLei
 * @LastEditTime: 2022-05-26 17:11:36
 */

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  adConfig: state => state.app.adConfig,
  mallConfig: state => state.app.mallConfig,
  frameType: state => state.framingAdmin.frameType,
  operatConfig: state => state.app.operatConfig,
  bizLine: state => state.app.bizLine,
  labelData: state => state.app.labelData,
  btnName: state => state.app.btnName,
  loadings: state => state.loading.loadings,
  baseData: state => state.global.baseData,
  baseDataMap: state => state.global.baseDataMap,
  codeScreenshot: state => state.global.codeScreenshot,
  activityConfig: state => state.app.activityConfig,
  artConfig: state => state.app.artConfig,
  keys: state => state.user.keys
}
export default getters
