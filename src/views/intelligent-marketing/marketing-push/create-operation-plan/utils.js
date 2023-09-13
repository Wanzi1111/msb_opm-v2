
/**
 * 转换时间为秒
 * @param {number} time 时间
 * @param {string} type 1秒 2分钟 3小时 4天
 */
export const transferTimeToSecond = (time, type) => [1, 1, 60, 60 * 60, 24 * 60 * 60][type] * +time

// transferTimeToSecond的反向解析
export const transferSecondTime = (time) => {
  if (time >= 24 * 60 * 60) {
    return { time: time / (24 * 60 * 60), opt: '4' }
  } else if (time >= 60 * 60) {
    return { time: time / (60 * 60), opt: '3' }
  } else if (time >= 60) {
    return { time: time / 60, opt: '2' }
  } else {
    return { time, opt: '1' }
  }
}

