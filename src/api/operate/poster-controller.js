import request from '@/utils/request'

// 获取海报搜索栏枚举
export function getPosterAll(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/getPosterAll',
    method: 'post',
    params
  })
}

// 获取海报列表
export function getPosterListAll(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/getPosterListAll',
    method: 'post',
    params
  })
}

// 海报排序
export function setPosterSort(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/setPosterSort',
    method: 'post',
    params
  })
}

// 获取海报样式
export function getPosterConfigure(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/getPosterConfigure',
    method: 'post',
    params
  })
}

// 添加海报列表
export function addPosterListNew(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/addPosterListNew',
    method: 'post',
    params
  })
}

// 修改海报列表
export function modifyPosterListNew(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/modifyPosterListNew',
    method: 'post',
    params
  })
}

// 修改页-获取海报详情
export function getPosterList(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/getPosterList',
    method: 'post',
    params
  })
}

// 删除海报
export function modifyPosterListDel(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/modifyPosterListDel',
    method: 'post',
    params
  })
}
// 海报展示比例

export function modifyPosterScale(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/modifyPosterScale',
    method: 'post',
    params
  })
}
// 添加海报位置
export function addPoster(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/addPoster',
    method: 'post',
    params
  })
}

// 修改海报位置
export function modifyPoster(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/modifyPoster',
    method: 'post',
    params
  })
}

// 测试海报
export function testPosterListNew(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/testPosterListNew',
    method: 'post',
    params
  })
}

// 修改海报位置状态
export function modifyPosterDel(params) {
  return request({
    url: '/k8s/api/poster/api/v1/recommend/poster/modifyPosterDel',
    method: 'post',
    params
  })
}
