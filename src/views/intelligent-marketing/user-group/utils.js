/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-22 10:30:42
 * @LastEditTime: 2022-05-26 13:52:49
 * @LastEditors: ZhangYeLei
 */
// 多处用到，慎重改动
export const transferData = (tree) => {
  if (tree.length) {
    tree.map(v => {
      v.label = v.name
      v.value = v.id + ''
      if (v.childList.length) {
        v.children = transferData(v.childList)
      }
      return v
    })
  }
  return tree
}

export const transferData2 = (tree) => {
  if (tree.length) {
    tree.map(v => {
      v.label = v.label || v.propsName
      v.value = v.code || (v.id + '')
      if (v.dictList?.length) {
        v.dictList.forEach(v => {
          v.label = v.val
          v.value = v.key
        })
      }
      if (v.ops?.length) {
        v.ops.forEach(v => {
          v.label = v.name
          v.value = v.code
        })
      }
      return v
    })
  }
  return tree
}

export const transferData3 = (list) => {
  if (list.length) {
    list.forEach(v => {
      v.label = v.eventName
      v.value = v.id + ''
    })
  }
  return list
}

export const transferData4 = (list) => {
  if (list.length) {
    list.forEach(v => {
      v.label = v.val
      v.value = v.key
    })
  }
  return list
}

export const transferAllPropData = (type, list) => {
  if (list.length) {
    list.forEach(v => {
      v.label = v.propsName || v.name
      v.value = `${v.type}-${v.id}`
      if (['userProp', 'event'].includes(v.type)) {
        v.disabled = !v.status
        if (v.type === 'userProp') {
          if (v.ops?.length) {
            v.ops.forEach(v => {
              v.label = v.name
              v.value = v.code
            })
          }
        }
      }
      if (type === 'event' && v.type === 'event') {
        v.label = `${v.name} - ${v.ename}`
      }
      if (v.childList?.length) {
        v.childList = transferAllPropData(type, v.childList)
        // delete v.v.childList
      }
    })
  }
  return list
}
