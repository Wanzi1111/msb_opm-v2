/**
 * Created by PanJiaChen on 16/11/18.
 */

(function () {
  // eslint-disable-next-line no-extend-native
  Date.prototype.addDays = function(d) {
    this.setDate(this.getDate() + d)
    return this
  }
})()

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
3600
/**
 * 秒数转时间
 * @param {number} time <= 24*60*60 一天内
 */
export function formatTime2 (time) {
  if (time < 0) {
    return 0
  }
  const formatZero = (num) => num > 9 ? num : '0' + num
  var mm = Math.floor(time / 60)
  var s = time % 60
  var h = Math.floor(mm / 60)
  var m = mm % 60
  return formatZero(h) + ':' + formatZero(m) + ':' + formatZero(s)
}

/**
 * 日期转时间戳 timestamp
 * @param {*} strtime
 */
export function timestamp (strtime) {
  // var date = new Date(strtime)
  var date = new Date(strtime.replace(/-/g, '/'))
  const { time1, time2, time3 } = { time1: date.getTime(), time2: date.valueOf(), time3: Date.parse(date) }
  // time1 精确到毫秒:1398250549123
  // time2 精确到毫秒:1398250549123
  // time3 只能精确到秒，毫秒将用0来代替:1398250549000
  console.log(time1, time2, time3)// 1398250549012 1398250549012 1398250549000
  return time1
}
/**
 * JS 计算两个时间间隔多久（时分秒）
 * @param startTime "2019-10-23 15:27:23"
 * @param endTime "2019-10-23 15:27:55"
 * @return 1天2时3分5秒
 */
export function twoTimeInterval (startTime, endTime) {
  // 开始时间
  const d1 = startTime.replace(/\-/g, '/')
  const date1 = new Date(d1)
  // 结束时间
  const d2 = endTime.replace(/\-/g, '/')
  const date2 = new Date(d2)
  // 时间相差秒数
  const dateDiff = date2.getTime() - date1.getTime()
  // 计算出相差天数
  const days = Math.floor(dateDiff / (24 * 3600 * 1000))
  // 计算出小时数
  const residue1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(residue1 / (3600 * 1000))
  // 计算相差分钟数
  const residue2 = residue1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(residue2 / (60 * 1000))
  // 计算相差秒数
  const residue3 = residue2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(residue3 / 1000)
  // returnVal console.log(returnVal) 2天2时59分59秒
  const returnVal =
    ((days === 0) ? '' : days + '天') +
    ((hours === 0) ? '' : hours + '时') +
    ((minutes === 0) ? '' : minutes + '分') +
    ((seconds === 0) ? '' : seconds + '秒')
  // console.log(returnValHours)
  const returnValHours = ((days * 24) + hours)
  console.log(returnVal)
  return returnValHours
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength (str) {
  // returns the byte length of an utf8 string
  var len = 0
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i)
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge (target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr (arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function createBlob (name, data) {
  const blob = new Blob([data])
  const linkNode = document.createElement('a')
  linkNode.download = name // a标签的download属性规定下载文件的名称
  linkNode.style.display = 'none'
  linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
  document.body.appendChild(linkNode)
  linkNode.click() // 模拟在按钮上的一次鼠标单击
  URL.revokeObjectURL(linkNode.href) // 释放URL 对象
  document.body.removeChild(linkNode)
}

/**
 * 判断是否是mp4
 * @param {Array<File>} files
 * @returns {String} 秒
 */
export function videoType (files) {
  if (files[0].name.toLocaleLowerCase().includes('.mp4')) {
    return 'mp4'
  } else {
    return 'm3u8'
  }
}

/**
 * 获取m3u8视频的时长
 * @param {Array<File>} files
 * @returns {Promise<Number>} 秒
 */
export function m3u8Duration (files) {
  let m3u8
  for (let i = 0; i < files.length; i++) {
    if (files[i].name.includes('.m3u8')) {
      m3u8 = files[i]
    }
  }
  const reader = new FileReader()
  reader.readAsText(m3u8)
  return new Promise((reslove, reject) => {
    reader.onload = function (evt) { // 读取完文件之后会回来这里
      var fileString = evt.target.result // 读取文件内容
      const splitStr = fileString.split('#EXTINF:')
      let duration = 0
      splitStr.map(item => {
        const itemDuration = isNaN(parseFloat(item.split(','))) ? 0 : parseFloat(item.split(','))
        duration += itemDuration
      })
      reslove(duration)
    }
    reader.onerror = function (err) {
      reject(err)
    }
  })
}

/**
 * 获取m3u8视频的大小
 * @param {Array<File>} files
 * @returns {Number} KB
 */
export function m3u8Size (files) {
  let size = 0
  for (let i = 0; i < files.length; i++) {
    size += files[i].size
  }
  return parseInt(size / 1024)
}

/**
 * 动态添加css
 * @param {String} url
 */
export function dynamicLoadCss (url) {
  const head = document.getElementsByTagName('head')[0]
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  head.appendChild(link)
}

/**
 * 浏览器新标签打开页面
 * @path: 要跳转的链接
 */
export function openBrowserTab (path, out = false) {
  if (!path) {
    console.log('请填写跳转路径')
    return
  }
  window.open(path, '_blank')
}

export function getFileType (fileUrl) {
  if (!fileUrl) {
    throw new Error('请传入正确的文件路径！')
  }
  const fileIndex = fileUrl.lastIndexOf('.')
  const fileType = fileUrl.substring(fileIndex)
  if (/(gif|jpg|png|jpeg)/i.test(fileType)) {
    return 'img'
  } else if (/(mp4|m3u8)/i.test(fileType)) {
    return 'video'
  }
}

// 脱敏 姓名（只留姓）
export function desensitizationName (name) {
  return name?.length
    ? name.slice(0, 1) + new Array(name.slice(1).length > 0 ? name.slice(1).length : 0)
      .fill('*')
      .toString()
      .replace(/,/g, '')
    : ''
}

// 脱敏 手机号
export function desensitizationPhone (phone) {
  const strPhone = phone + ''
  if (strPhone.length >= 11) {
    return strPhone?.length ? strPhone.slice(0, 3) + '****' + strPhone.slice(7) : ''
  } else if (strPhone.length >= 7) {
    return strPhone?.length ? strPhone.slice(0, 2) + '***' + strPhone.slice(5) : ''
  }
  return phone
}

/**
 * 脱敏地址
 * @param {string} address 地址
 * @param {number} len 保留长度
 * @returns 脱敏后的地址
 */
export function desensitizationAddress (address, len) {
  if (!address?.length) return ''
  if (address?.length < len) return address
  const addressPrefix = address.slice(0, len)
  const addressSuffix = new Array(address.length - len)
    .fill('*')
    .toString()
    .replace(/,/g, '')
  return addressPrefix + addressSuffix
}

export const transformMap = (list) => {
  const map = {}
  list.forEach(v => {
    map[v.value] = v.label
  })
  return map
}
