/**
 * @author: Liwei
 * @description: 课后评价
 * @date: 2020/3/21
 */
import request from '@/utils/request'

/**
 * 课后评价列表
 * @param params
 * @returns {AxiosPromise}
 */
export function classList(params) {
  return request({
    url: '/api/pc/operate/list',
    method: 'post',
    params: params,
    timeout: 10000
  })
}

/**
 * 课后评价统计
 * @param params
 * @returns {AxiosPromise}
 */
export function statistics(params) {
  return request({
    url: '/api/pc/operate/statistics',
    method: 'post',
    params: params,
    timeout: 20000
  })
}
/**
 * 新版1V1课后评价统计
 * @param params
 * @returns {AxiosPromise}
 */
export function listLessonComment(params) {
  return request({
    url: '/msb_api/app/listLessonComment',
    method: 'post',
    params: params,
    timeout: 20000
  })
}
/**
 * 新版1V1评价率
 * @param params
 * @returns {AxiosPromise}
 */
export function commentRatio(params) {
  return request({
    url: '/msb_api/app/commentRatio',
    method: 'post',
    params: params,
    timeout: 20000
  })
}
/**
 * 评价设为无效
 * @param params
 * @returns {AxiosPromise}
 */
export function invalidComment(params) {
  return request({
    url: '/msb_api/app/invalidComment',
    method: 'post',
    params: params,
    timeout: 20000
  })
}
/**
 * 获取评价列表
 * @param params
 * @returns {AxiosPromise}
 */
export function listCommentLabel(params) {
  return request({
    url: '/msb_api/app/listCommentLabel',
    method: 'post',
    params: params,
    timeout: 20000
  })
}
/**
 * 一对一导出
 * @param params
 * @returns {AxiosPromise}
 */
export function exportEvaluate(params) {
  return request({
    url: '/api/pc/operate/exportEvaluate',
    method: 'get',
    params: params,
    responseType: 'blob' // 导出文件必添加、不然request会报错
  })
}

/**
 * 小班课 - 统计接口
 * @returns {AxiosPromise}
 */
export function xbkStatistics(data) {
  return request({
    url: '/xbk/crCommentDetail/statistics',
    method: 'post',
    data: data,
    timeout: 20000
  })
}

/**
 * 小班课 - 列表查询
 * @param params
 * @returns {AxiosPromise}
 */
export function listCommentDetail(data) {
  return request({
    url: '/xbk/crCommentDetail/listCommentDetail',
    method: 'post',
    data: data,
    timeout: 10000
  })
}

/**
 * 小班课导出
 * @param params
 * @returns {AxiosPromise}
 */
export function xbkExport(params) {
  return request({
    url: '/xbk/crCommentDetail/export',
    method: 'get',
    params: params,
    responseType: 'blob' // 导出文件必添加、不然request会报错
  })
}

/**
 * 小熊美术课后统计 列表
 */
export function getAIList({ searchQuery, paginationQuery }) {
  const sort = JSON.stringify(JSON.stringify({ ctime: 'desc' }))
  const queryParams = JSON.stringify(JSON.stringify(searchQuery))
  const { page, limit } = paginationQuery
  return request({
    url: '/ai_api/graphql/v1/toss',
    method: 'post',
    timeout: 10000,
    headers: { authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0NTU4MTQ4NzA4OTg3MDg0ODAiLCJzdWIiOiI0NTU4MTQ4NzA4OTg3MDg0ODAiLCJpYXQiOjE2MDMyNjkwMjksImF1ZCI6ImFkbWluIiwiZXhwIjoxNjExOTA5MDI5fQ.vMKSckdqDJppBf8xluhozhNeyNkp78klOuS_T0w1v-qth0Us7h18fTOkfbd42ognuCYqnE3h46q1dKYZrN5asA' },
    data: {
      query: `
        {
          StudentFeedBackZhongTaiStatisticsPage(
          sort: ${sort},
          query: ${queryParams},
          page: ${page},
          size: ${limit} ){
            empty
            first
            last
            number
            size
            numberOfElements
            totalElements
            totalPages
            content {
              id
              sale_id
              teacher_name
              username
              user_num
              master_name
              master_mobile
              feedback_type
              course_type_text
              feedback_type_text
              lesson_type_text
              state_text
              tag
              content
              state
              ctime
            }
          }
        }
      `
    }
  })
}

/**
 * 小熊美术课后统计 数据统计
 */
export function getAIStatistics(params) {
  const queryParams = JSON.stringify(JSON.stringify(params))
  return request({
    url: '/ai_api/graphql/v1/toss',
    method: 'post',
    timeout: 10000,
    headers: { authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0NTU4MTQ4NzA4OTg3MDg0ODAiLCJzdWIiOiI0NTU4MTQ4NzA4OTg3MDg0ODAiLCJpYXQiOjE2MDMyNjkwMjksImF1ZCI6ImFkbWluIiwiZXhwIjoxNjExOTA5MDI5fQ.vMKSckdqDJppBf8xluhozhNeyNkp78klOuS_T0w1v-qth0Us7h18fTOkfbd42ognuCYqnE3h46q1dKYZrN5asA' },
    data: {
      query: `
        {
          StudentFeedBackZhongTaiSumStatistics(
          query: ${queryParams}){
            bad
            join_percent
            good
            same
            total_num
          }
        }
      `
    }
  })
}

/**
 * 小熊美术课后统计 导出
 */
export function handleAIExport(params) {
  const queryParams = JSON.stringify({ id: params })
  return request({
    url: '/ai_api/graphql/export',
    method: 'post',
    timeout: 20000,
    headers: { authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0NTU4MTQ4NzA4OTg3MDg0ODAiLCJzdWIiOiI0NTU4MTQ4NzA4OTg3MDg0ODAiLCJpYXQiOjE2MDMyNjkwMjksImF1ZCI6ImFkbWluIiwiZXhwIjoxNjExOTA5MDI5fQ.vMKSckdqDJppBf8xluhozhNeyNkp78klOuS_T0w1v-qth0Us7h18fTOkfbd42ognuCYqnE3h46q1dKYZrN5asA' },
    responseType: 'blob', // 导出文件必添加、不然request会报错
    data: {
      apiName: 'StudentFeedBackZhongTaiStatisticsPage',
      header: {
        sale_id: '老师id',
        teacher_name: '老师姓名',
        username: '用户姓名',
        user_num: '用户编号',
        master_name: '班主任姓名',
        master_mobile: '班主任电话',
        course_type_text: '课程属性',
        feedback_type_text: '评价等级',
        tag: '评价标签',
        content: '评价内容',
        state_text: '状态',
        lesson_type_text: '课程类型'
      },
      fileName: '反馈点评',
      query: queryParams
    }
  })
}

/**
 * 小熊美术课后统计 设置有/无效
 */
export function updateAIState(params) {
  return request({
    url: '/ai_api/api/ts/v1/teaching/student/comment/feedback/updateState',
    method: 'post',
    params,
    timeout: 10000
  })
}
