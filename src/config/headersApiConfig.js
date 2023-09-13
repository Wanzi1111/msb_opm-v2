/**
 *  请求头需要加Authorization参数的接口
 */

// AuthorizationApi : headers里需要Authorization的API数字字典集合
const authorizationApi = [
  '/k8s/api/store/api/v1/store/task/list',
  '/k8s/api/store/api/v1/store/task/sortList',
  '/k8s/api/store/api/v1/store/task/saveSortList',
  '/k8s/api/store/api/v1/store/task/operate',
  '/k8s/api/store/api/v1/store/task/setHomePage',
  '/k8s/api/store/api/v1/store/task/save',
  '/k8s/api/store/api/v1/store/task/info',
  '/k8s/api/recommend/api/v1/referral/statistic',
  '/k8s/api/recommend/api/v1/referral/queryList',
  '/k8s/api/recommend/api/v1/referral/querySize',
  '/k8s/api/recommend/api/v1/ScreenShot/audit',
  '/k8s/api/poster/api/v1/recommend/poster/getPosterAll',
  '/k8s/api/poster/api/v1/recommend/poster/getPosterListAll',
  '/k8s/api/poster/api/v1/recommend/poster/setPosterSort',
  '/k8s/api/poster/api/v1/recommend/poster/getPosterConfigure',
  '/k8s/api/poster/api/v1/recommend/poster/addPosterListNew',
  '/k8s/api/poster/api/v1/recommend/poster/modifyPosterListNew',
  '/k8s/api/poster/api/v1/recommend/poster/getPosterList',
  '/k8s/api/poster/api/v1/recommend/poster/modifyPosterListDel',
  '/k8s/api/poster/api/v1/recommend/poster/addPoster',
  '/k8s/api/poster/api/v1/recommend/poster/modifyPosterScale',
  '/k8s/api/poster/api/v1/recommend/poster/modifyPoster',
  '/k8s/api/poster/api/v1/recommend/poster/testPosterListNew',
  '/k8s/api/recommend/api/v1/admin/getConfigTaskList',
  '/k8s/api/recommend/api/v1/admin/saveWeeklyCoinConfig',
  '/k8s/api/recommend/api/v1/admin/getWeeklyCoinConfig',
  '/k8s/api/recommend/api/v1/admin/updateTaskListDelStatus',
  '/k8s/api/poster/api/v1/recommend/poster/modifyPosterDel'
]
// AuthorizationToken: headers 中携带的 Authorization /k8s 令牌
const authorizationToken = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZG1pbiIsInN1YiI6ImFkbWluIiwiaWF0IjoxNjAwOTMwOTM1LCJhdWQiOiJhZG1pbiIsImV4cCI6MTY4NzMzMDkzNX0.xP7oyOQmCtKtteisDtptZnY0U8E1VAbpGc3lOcQpcljQWjL1DOKOG07ncgEBpHKryy-vxiFHc3szx2gJnArQAA'

export {
  authorizationApi,
  authorizationToken
}
