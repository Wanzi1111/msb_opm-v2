/**
 * @author: pengtaoqi
 * @description:
 * @date: 2020/12/15
 */

// import { categoryList } from '@/api/goods/category'

export default [
  // {
  //   prop: 'productChildType',
  //   label: '商品类型',
  //   type: 'cascader',
  //   attr: {
  //     clearable: true,
  //     placeholder: '全部',
  //     collapseTags: true,
  //     props: {
  //       lazy: true,
  //       multiple: true,
  //       expandTrigger: 'hover',
  //       lazyLoad(node, resolve) {
  //         const { level } = node
  //         categoryList({
  //           pcode: level === 1 ? node.value : 0,
  //           level: level + 1,
  //           status: 1,
  //           pageAble: 'false'
  //         }).then(res => {
  //           const data = res.data || {}
  //           const list = data.rows || []
  //           const nodes = []
  //           list.map(item => {
  //             if (level === 0 && item.code === '09') {
  //               nodes.push({
  //                 value: item.code,
  //                 label: item.typeName,
  //                 leaf: level === 1
  //               })
  //             } else if (level !== 0) {
  //               nodes.push({
  //                 value: item.code,
  //                 label: item.typeName,
  //                 leaf: level === 1
  //               })
  //             }
  //           })
  //           resolve(nodes)
  //         })
  //       }
  //     }
  //   }
  // },
  {
    prop: 'goodsName',
    label: '商品名称',
    type: 'input',
    attr: {
      clearable: true,
      placeholder: '请输入商品名称'
    }
  }
]

