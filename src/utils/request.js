import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'
import { encode } from 'js-base64'
import { getBIToken } from '@/api/intelligentMarketing'

let isRefreshing = false // 标记是否正在刷新 token
let requests = [] // 存储待重发请求的数组
// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const url = config.url
    store.dispatch('loading/setLoad', {
      key: url.replace(/\//g, '_'),
      status: true
    })
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken('token')
    // }

    // BI
    if (url.startsWith('/big_data')) {
      // 获取BItoken接口不需要传token
      if (!url.includes('/oauth2/getToken')) {
        // BI专属token
        config.headers['Authorization'] = getToken('BIToken')
      }
    // 其他服务
    // 登录接口不需要传token
    } else if (!url.includes('/sso/api/v1/token/get')) {
      // ums的token，一并给其他服务都带了
      config.headers['Authorization'] = getToken('token')
    }

    config.headers['userName'] = encode(getToken('cname') || '') || ''
    config.headers['userId'] = getToken('userId') || ''

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const url = response.config.url
    store.dispatch('loading/setLoad', {
      key: url.replace(/\//g, '_'),
      status: false
    })
    const res = response.data

    // console.log('url, res', url, res)
    // if the custom code is not 20000, it is judged as an error.
    // aliyuncs.com
    if (response.status === 200) {
      // 200: 正常状态码

      const isSignature =
        response.config.url.includes('/api/oss/getSignature')
      const isAli = response.config.url.indexOf('aliyuncs.com') >= 0
      // 判断是否为阿里请求或者获取上传地址请求,是的话，只用判断HTTP状态码200就是正常
      if (isSignature || isAli) {
        return res
      // sso登录
      } else if (url === '/sso/api/v1/token/get' && res.result === 'success') {
        return res
      } else if (
        res.status === 0 ||
        res.code === 0 ||
        response.request.responseType === 'blob' ||
        (url.startsWith('/big_data') && res.code === 200) || // 大数据接口规范
        (url.startsWith('/ai_api') && res.data) // 小熊graphql接口返回规范
      ) {
        // 业务代码判断response.data.status === 0为正常
        return res
      } else if (url.startsWith('/big_data') && res.code === 500) {
        // 大数据接口token过期，需要重新获取token
        if (res.message?.startsWith('Access token expired') || res.message === '无权限访问' || res.message === 'Full authentication is required to access this resource') {
          const { config } = response
          if (!isRefreshing) {
            isRefreshing = true
            return getBIToken().then(res => {
              const { accessToken } = res.result
              const BIToken = `Bearer ${accessToken}`
              setToken('BIToken', BIToken)
              config.headers.Authorization = BIToken
              // token 刷新后将数组的方法重新执行
              requests.forEach((cb) => cb(BIToken))
              requests = [] // 重新请求完清空
              return service(config)
            }).catch(err => {
              console.log('抱歉，您的登录状态已失效，请重新登录！')
              return Promise.reject(err)
            }).finally(() => {
              isRefreshing = false
            })
          } else {
            // 返回未执行 resolve 的 Promise
            return new Promise(resolve => {
              // 用函数形式将 resolve 存入，等待刷新后再执行
              requests.push(token => {
                config.headers.Authorization = token
                resolve(service(config))
              })
            })
          }
        } else {
          // 大数据接口某些业务逻辑错误code也为500
          Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        // 业务逻辑错误
        Message.closeAll()
        Message({
          message: res.msg || res.message || res.errors || res.info || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      // 500: 服务器错误
      Message.closeAll()
      Message({
        message: res.msg || res.message || res.errors || res.info || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(new Error(res.message || res.errors || res.info || 'Error'))
  },
  error => {
    const url = error.config ? error.config.url : ''
    store.dispatch('loading/setLoad', {
      key: url.replace(/\//g, '_'),
      status: false
    })
    if (error.response && error.response.status === 401) {
      // 401: 用户信息失效
      MessageBox.confirm(
        '您的账户已失效，您可以取消以停留在此页，或重新登录',
        '账户失效',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      // 500: 服务器错误
      Message.closeAll()
      if (error.message !== '请求取消') {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
