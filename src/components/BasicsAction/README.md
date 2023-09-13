
# BasicsAction

公共基础操作条使用说明

1.引入使用  
```
template
  <basics-action :actions="actions" />
script
  import BasicsAction from '@/components/BasicsAction'
  import actions from './actions/actions'

  components: { BasicsAction },
  data
    actions({function})
  created
  this.$nextTick
    this.$refs.actions.set
  mounted
    this.$refs.actions.set
  methods
    this.$refs.actions.set
```
2.参数说明  
...

3.父页面调用函数
    this.$refs.actions.set({
      type: 'label',
      data: { prop: 值 }
    })