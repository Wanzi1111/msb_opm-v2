<template>
  <div style="padding: 0 85px 0 55px">
    <basics-table
      :list="list"
      :columns="columns"
      :action-function="tableActions"
    />
  </div>
</template>

<script>
import columns, { actions } from './columns'

export default {
  name: 'AdDetail',
  props: {
    list: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      columns,
      tableActions: actions(this.handleTableActions)
    }
  },
  watch: {},
  mounted() {},
  methods: {
    handleTableActions(type, row) {
      const emitType = {
        close: false,
        open: true,
        viewDetail: 'detail'
      }
      this.$bus.$emit('changeStatus', row, emitType[type])
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
