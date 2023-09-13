<template>
  <div style="cursor:pointer" @click="handleClick">
    <span v-if="isShow">{{ row.scale }}</span>
    <div v-else>
      <el-input ref="scaleInput" v-model="scaleValue" style="width: 50%" />
      <el-popconfirm
        v-if="showButton"
        title="是否确认要修改，修改后C端数据立即刷新"
        @confirm="deletePoster"
        @cancel="deleteCancel"
      >
        <el-button slot="reference">修改</el-button>
      </el-popconfirm>
    </div>

  </div>
</template>

<script>

import { modifyPosterScale } from '@/api/operate/poster-controller'

export default {
  name: 'ScaleInput',
  props: {
    row: {
      default: () => ({}),
      type: Object
    },
    getList: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isShow: true,
      scaleValue: this.row.scale,
      showButton: false
    }
  },
  methods: {
    handleClick() {
      this.isShow = false
      this.showButton = true
      this.$nextTick(() => {
        this.$refs.scaleInput.focus()
      })
    },
    // 处理缩放比例
    scaleChange(event, row) {
      const reg = /^[1-9][0-9]*$/
      if (!reg.test(event.target.value)) {
        this.$message.error('只能输入数字')
        return
      }
      if (!event.target.value) {
        this.$message.error('投放比例不能为空')
        return
      }
    },
    deletePoster() {
      const { id, posterId: poster_id } = this.row
      const params = {
        id: id,
        scale: Number(this.scaleValue)
      }
      modifyPosterScale(params).then(res => {
        if (res.code === 0) {
          this.$message.success('成功')
          this.getList({ poster_id })
          this.isShow = true
        }
      })
    },
    deleteCancel() {
      this.isShow = true
    }
  }
}
</script>

<style>

</style>
